export const KNOB_KEYS = ['gain','bass','middle','treble','presence'];
export const EFFECT_TYPES = ['overdrive','distortion','fuzz','compression','gate','chorus','rotary','delay','reverb'];
export const FAMILIES = ['clean','pushed','crunch','lead','high-gain'];
export const PICKUPS = ['single','humbucker','p90','active','mixed'];
export const MAX_BACKUP_BYTES = 16 * 1024 * 1024;
export const clamp = n => Math.round(Math.max(0,Math.min(10,Number(n)||0))*10)/10;
export const cleanText = (v,max=500) => typeof v==='string' ? v.slice(0,max).trim() : '';
export const safeUrl = v => {try{const u=new URL(v);return u.protocol==='https:'?u.href:''}catch{return ''}};
export const effectType = name => /fuzz/i.test(name)?'fuzz':/distortion/i.test(name)?'distortion':/overdrive/i.test(name)?'overdrive':/compress/i.test(name)?'compression':/gate/i.test(name)?'gate':/chorus/i.test(name)?'chorus':/rotary/i.test(name)?'rotary':/delay/i.test(name)?'delay':'reverb';
export function validateTone(value){
  if(!value || typeof value!=='object' || !cleanText(value.title,100) || !FAMILIES.includes(value.family)) throw new Error('The tone profile is incomplete. Try a more specific song and section.');
  const base={};
  for(const k of KNOB_KEYS){if(typeof value.base?.[k]!=='number'||!Number.isFinite(value.base[k])||value.base[k]<0||value.base[k]>10)throw new Error('The tone contains invalid control values.');base[k]=clamp(value.base[k]);}
  if(!Array.isArray(value.effects)||value.effects.length>9)throw new Error('The effect chain is invalid.');
  const effects=value.effects.map(e=>{if(!EFFECT_TYPES.includes(e.type))throw new Error('The effect type is unsupported.');return {type:e.type,name:cleanText(e.name,80)||e.type,settings:cleanText(e.settings,600),optional:!!e.optional}});
  return {id:cleanText(value.id,100)||'custom',title:cleanText(value.title,100),artist:cleanText(value.artist,100),section:cleanText(value.section,100),style:cleanText(value.style,80),family:value.family,base,pickup:cleanText(value.pickup,160),effects,tip:cleanText(value.tip,1000),sources:validateSources(value.sources),research:validateGrounding(value.research),origin:['research','library'].includes(value.origin)?value.origin:'custom'};
}
export function validateGrounding(v){if(!v||typeof v!=='object')return null;const sources=validateSources(v.sources);return {rawText:cleanText(v.rawText,40000),searchEntryPoint:cleanText(v.searchEntryPoint,40000),sources,supports:(Array.isArray(v.supports)?v.supports:[]).slice(0,30).map(s=>({text:cleanText(s.text,2000),sourceIndices:(Array.isArray(s.sourceIndices)?s.sourceIndices:[]).filter(i=>Number.isInteger(i)&&i>=0&&i<sources.length)}))};}
export function validateSources(sources){return Array.isArray(sources)?sources.slice(0,12).filter(s=>safeUrl(s?.url)).map(s=>({title:cleanText(s.title,140)||new URL(s.url).hostname,url:safeUrl(s.url),supports:cleanText(s.supports,700)})):[];}
export function validateAmp(a){
  if(!a||!cleanText(a.name,120)||!Array.isArray(a.controls)||!a.controls.length)throw new Error('Amp controls are missing.');
  const controls=[...new Set(a.controls.filter(k=>KNOB_KEYS.includes(k)))];
  if(!controls.length)throw new Error('No supported amp controls found.');
  const channels={};for(const f of FAMILIES)channels[f]=cleanText(a.channels?.[f],160)||f;
  return {id:cleanText(a.id,100)||'custom-amp',name:cleanText(a.name,120),controls,channels,builtin:[...new Set((Array.isArray(a.builtin)?a.builtin:[]).filter(t=>EFFECT_TYPES.includes(t)))],menuControls:(Array.isArray(a.menuControls)?a.menuControls:[]).filter(k=>controls.includes(k)),cleanNoGain:a.cleanNoGain===true,notes:cleanText(a.notes,1200),sources:validateSources(a.sources),research:validateGrounding(a.research)};
}
export function validateRig(r){
  if(!r||!PICKUPS.includes(r.pickup))throw new Error('Invalid guitar pickup type.');
  return {guitar:cleanText(r.guitar,120)||'My guitar',pickup:r.pickup,amp:validateAmp(r.amp),pedals:(Array.isArray(r.pedals)?r.pedals:[]).slice(0,16).filter(p=>EFFECT_TYPES.includes(p?.type)).map(p=>({name:cleanText(p.name,100)||p.type,type:p.type,research:validateGrounding(p.research)})),guitarSources:validateSources(r.guitarSources),guitarResearch:validateGrounding(r.guitarResearch)};
}
export function adaptTone(tone,rig){
  const values={...tone.base}; const notes=[];
  const expectsSingle=/single/i.test(tone.pickup); const expectsHum=/humbucker/i.test(tone.pickup);
  if((rig.pickup==='humbucker'||rig.pickup==='active') && expectsSingle){values.gain-=rig.pickup==='active'?1.2:.8;values.bass-=.4;values.treble+=.4;notes.push('Gain and bass are reduced slightly for your hotter pickups. This is a rule-based estimate; adjust by ear.');}
  else if(rig.pickup==='single' && expectsHum){values.gain+=.7;values.bass+=.3;values.treble-=.4;notes.push('Gain and bass are raised slightly for single-coils. They will keep more of their natural attack than a humbucker.');}
  if(rig.pickup==='mixed')notes.push('For a mixed pickup guitar, choose the suggested pickup first. No output correction has been applied.');
  const controls=rig.amp.controls.filter(k=>!(rig.amp.cleanNoGain&&tone.family==='clean'&&k==='gain'));
  const effects=tone.effects.map(e=>({...e,available:rig.amp.builtin.includes(e.type)||rig.pedals.some(p=>p.type===e.type),device:rig.pedals.find(p=>p.type===e.type)?.name||(rig.amp.builtin.includes(e.type)?'Amp effect':'Effect needed')}));
  const missing=effects.filter(e=>!e.available&&!e.optional);
  let channel=rig.amp.channels[tone.family]||tone.family;
  if(missing.some(e=>['distortion','fuzz','overdrive'].includes(e.type)) && tone.family==='clean'){
    values.gain=Math.max(values.gain,6);channel=rig.amp.channels.crunch||'Drive channel';
    if(!controls.includes('gain')&&rig.amp.controls.includes('gain'))controls.unshift('gain');
    notes.push('Your rig has no matching drive pedal. A driven amp channel is suggested as a rough substitute; it will not reproduce the pedal’s character.');
  }
  if(missing.length)notes.push(`Missing effects: ${missing.map(e=>e.name).join(', ')}. These settings alone cannot recreate their contribution.`);
  for(const k of KNOB_KEYS)values[k]=clamp(values[k]);
  if(rig.amp.menuControls.length)notes.push(`${rig.amp.menuControls.join(', ')}: use the amp’s edit menu.`);
  if(rig.amp.notes)notes.push(rig.amp.notes);
  notes.push('These values are fractions of control travel, not calibrated measurements. Set listening volume separately, then fine-tune with the same riff.');
  return {values,controls,channel,effects,notes,pickup:tone.pickup,guitarTone:expectsSingle?8.5:9};
}
export function validateBackup(input){
  if(input?.format!=='tonezero-backup'||input.version!==1||!Array.isArray(input.saved)||input.saved.length>200)throw new Error('Choose a ToneZero backup with up to 200 saved tones.');
  const rig=validateRig(input.rig);
  const ids=new Set();
  const saved=input.saved.map(s=>{
    const id=cleanText(s.id,100);if(!id||ids.has(id))throw new Error('The backup contains missing or duplicate tone IDs.');ids.add(id);
    const tone=validateTone(s.tone), savedRig=validateRig(s.rig); const result=adaptTone(tone,savedRig);
    if(!s.values||typeof s.values!=='object')throw new Error('A saved tone has no settings.');
    const values={}; for(const k of KNOB_KEYS){if(!Number.isFinite(s.values[k])||s.values[k]<0||s.values[k]>10)throw new Error('A saved setting is invalid.');values[k]=clamp(s.values[k]);}
    return {id:cleanText(s.id,100),tone,rig:savedRig,values,guitarTone:clamp(s.guitarTone??result.guitarTone),created:cleanText(s.created,60),note:cleanText(s.note,1000)};
  });return {rig,saved};
}
export function backupParts(rig,saved,maxBytes=MAX_BACKUP_BYTES){
  const encode=items=>JSON.stringify({format:'tonezero-backup',version:1,rig,saved:items},null,2);
  const size=s=>new TextEncoder().encode(s).byteLength;
  const parts=[];let items=[];
  for(const item of saved){const next=[...items,item];if(size(encode(next))>maxBytes){if(items.length)parts.push(encode(items));items=[item];if(size(encode(items))>maxBytes)throw new Error('A tone is too large to export. Remove excessive research text.')}else items=next;}
  const tail=encode(items);if(size(tail)>maxBytes)throw new Error('The rig is too large to export.');if(items.length||!parts.length)parts.push(tail);return parts;
}
export function validateResearch(value,kind){
  if(!value||typeof value!=='object'||!cleanText(value.summary,2000))throw new Error('The research response was incomplete.');
  if(value.found===false)throw new Error(cleanText(value.summary,500)||'No reliable match. Include the manufacturer and model year.');
  let profile;
  if(kind==='song')profile=validateTone({...value.profile,origin:'research'});
  else if(kind==='amp')profile=validateAmp(value.profile);
  else if(kind==='guitar'){
    if(!cleanText(value.profile?.name,120)||!PICKUPS.includes(value.profile?.pickup))throw new Error('Guitar specifications were incomplete.');
    profile={name:cleanText(value.profile.name,120),pickup:value.profile.pickup,specs:(Array.isArray(value.profile.specs)?value.profile.specs:[]).slice(0,10).map(s=>({label:cleanText(s.label,80),value:cleanText(s.value,300)}))};
  }else if(kind==='pedal'){
    if(!cleanText(value.profile?.name,120)||!EFFECT_TYPES.includes(value.profile?.type))throw new Error('The pedal type is not supported.');profile={name:cleanText(value.profile.name,120),type:value.profile.type};
  }else throw new Error('Unknown research type.');
  return {summary:cleanText(value.summary,2000),caveats:cleanText(value.caveats,1500),profile};
}
