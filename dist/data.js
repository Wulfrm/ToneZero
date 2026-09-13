// Original estimated recipes; source links support context, never exact settings.
export const TONES = [
  {
    "id": "come-as-you-are",
    "title": "Come As You Are",
    "artist": "Nirvana",
    "section": "Intro / verse",
    "style": "Clean chorus",
    "family": "clean",
    "base": {
      "gain": 2.5,
      "bass": 5.5,
      "middle": 4.5,
      "treble": 5.5,
      "presence": 4
    },
    "pickup": "Bridge humbucker; reduce guitar tone slightly if sharp",
    "effects": [
      {
        "type": "chorus",
        "name": "chorus",
        "optional": false,
        "settings": "Rate (Hz): 0.8 · Depth / 10: 7 · Mix / 10: 4.5"
      },
      {
        "type": "reverb",
        "name": "room reverb",
        "optional": false,
        "settings": "Decay (s): 1.4 · Mix / 10: 1"
      }
    ],
    "tip": "The slow, deep chorus is the defining ingredient. Keep the riff clear and add distortion separately for heavier sections.",
    "sources": [
      {
        "title": "Electro-Harmonix Small Clone",
        "url": "https://shop.ehx.com/item/clone/guitar-effects-pedals-fuzz-distortion-overdrive//",
        "supports": "EHX identifies Small Clone as an analog chorus popularized by Kurt Cobain. This does not verify recipe settings or a specific recording chain."
      }
    ],
    "origin": "library"
  },
  {
    "id": "under-the-bridge",
    "title": "Under the Bridge",
    "artist": "Red Hot Chili Peppers",
    "section": "Intro",
    "style": "Warm clean",
    "family": "clean",
    "base": {
      "gain": 3,
      "bass": 4,
      "middle": 6,
      "treble": 6.5,
      "presence": 5
    },
    "pickup": "Neck single-coil",
    "effects": [
      {
        "type": "compression",
        "name": "light compression",
        "optional": false,
        "settings": "Sustain / 10: 3 · Mix / 10: 5"
      },
      {
        "type": "reverb",
        "name": "spring reverb",
        "optional": false,
        "settings": "Decay (s): 1.7 · Mix / 10: 1.5"
      }
    ],
    "tip": "Raise gain until hard-picked notes only just roughen. Let the chord embellishments stay separate.",
    "sources": [
      {
        "title": "Fender John Frusciante Stratocaster",
        "url": "https://www.fender.com/products/limited-edition-masterbuilt-john-frusciante-stratocaster",
        "supports": "General Stratocaster association and single-coil setup; not evidence for the exact Under the Bridge session guitar or amp."
      }
    ],
    "origin": "library"
  },
  {
    "id": "slow-dancing",
    "title": "Slow Dancing in a Burning Room",
    "artist": "John Mayer",
    "section": "Intro / rhythm",
    "style": "Edge of breakup",
    "family": "pushed",
    "base": {
      "gain": 3.5,
      "bass": 5.5,
      "middle": 5,
      "treble": 6,
      "presence": 4
    },
    "pickup": "Neck-and-middle single-coils, or neck single-coil",
    "effects": [
      {
        "type": "overdrive",
        "name": "low-gain overdrive",
        "optional": false,
        "settings": "Drive / 10: 1.5 · Tone / 10: 4.5 · Output: unity"
      },
      {
        "type": "reverb",
        "name": "spring reverb",
        "optional": false,
        "settings": "Decay (s): 2 · Mix / 10: 2"
      }
    ],
    "tip": "Use a light touch for clean notes and dig in for grit. Reduce gain by about one point with hotter humbuckers.",
    "sources": [],
    "origin": "library"
  },
  {
    "id": "back-in-black",
    "title": "Back in Black",
    "artist": "AC/DC",
    "section": "Main rhythm riff",
    "style": "Classic crunch",
    "family": "crunch",
    "base": {
      "gain": 4.5,
      "bass": 4.5,
      "middle": 7,
      "treble": 6,
      "presence": 5.5
    },
    "pickup": "Bridge humbucker",
    "effects": [
      {
        "type": "reverb",
        "name": "room reverb",
        "optional": false,
        "settings": "Decay (s): 1 · Mix / 10: 0.5"
      }
    ],
    "tip": "Use less distortion than expected: the gaps, pick attack and full mids make the riff punch.",
    "sources": [
      {
        "title": "Marshall Angus Young artist page",
        "url": "https://www.marshall.com/pr/en/all/endorsers/angus-young",
        "supports": "Marshall associates Angus with its JTM45 and 1960 cabinets; not a Back in Black session-settings source."
      }
    ],
    "origin": "library"
  },
  {
    "id": "sweet-child",
    "title": "Sweet Child O' Mine",
    "artist": "Guns N' Roses",
    "section": "Opening lead melody",
    "style": "Singing rock lead",
    "family": "lead",
    "base": {
      "gain": 6,
      "bass": 4.5,
      "middle": 7,
      "treble": 5.5,
      "presence": 4.5
    },
    "pickup": "Neck humbucker",
    "effects": [
      {
        "type": "delay",
        "name": "digital delay",
        "optional": false,
        "settings": "Time (ms): 300 · Feedback / 10: 1.5 · Mix / 10: 1.5"
      },
      {
        "type": "reverb",
        "name": "plate reverb",
        "optional": false,
        "settings": "Decay (s): 1.8 · Mix / 10: 1.5"
      }
    ],
    "tip": "Keep the neck pickup clear by trimming bass before adding treble. Change to the bridge pickup for more bite in later leads.",
    "sources": [
      {
        "title": "Marshall Slash guitar hero profile",
        "url": "https://www.marshall.com/us/es/backstage/guitar-heroes/slash",
        "supports": "General career association with Marshall heads including Silver Jubilee. Do not claim Sweet Child was recorded with a Silver Jubilee."
      }
    ],
    "origin": "library"
  },
  {
    "id": "teen-spirit",
    "title": "Smells Like Teen Spirit",
    "artist": "Nirvana",
    "section": "Chorus",
    "style": "Grunge distortion",
    "family": "clean",
    "base": {
      "gain": 2.5,
      "bass": 5,
      "middle": 5.5,
      "treble": 6.5,
      "presence": 5
    },
    "pickup": "Bridge humbucker",
    "effects": [
      {
        "type": "distortion",
        "name": "distortion",
        "optional": false,
        "settings": "Drive / 10: 6.5 · Tone / 10: 5.5 · Output: unity"
      },
      {
        "type": "reverb",
        "name": "room reverb",
        "optional": false,
        "settings": "Decay (s): 1 · Mix / 10: 0.5"
      }
    ],
    "tip": "Let the pedal supply most of the distortion over a clean or slightly gritty amp. Too much combined gain blurs the chord rhythm.",
    "sources": [],
    "origin": "library"
  },
  {
    "id": "enter-sandman",
    "title": "Enter Sandman",
    "artist": "Metallica",
    "section": "Heavy rhythm riff",
    "style": "Tight metal",
    "family": "high-gain",
    "base": {
      "gain": 6.5,
      "bass": 6,
      "middle": 3.5,
      "treble": 6.5,
      "presence": 5.5
    },
    "pickup": "Bridge humbucker",
    "effects": [
      {
        "type": "gate",
        "name": "noise gate",
        "optional": false,
        "settings": "Threshold: Raise only until idle hiss stops; preserve note tails"
      },
      {
        "type": "reverb",
        "name": "room reverb",
        "optional": false,
        "settings": "Decay (s): 0.8 · Mix / 10: 0.5"
      }
    ],
    "tip": "Palm-mute close to the bridge. If the low end flubs, reduce bass and gain before lowering mids further.",
    "sources": [],
    "origin": "library"
  },
  {
    "id": "master-of-puppets",
    "title": "Master of Puppets",
    "artist": "Metallica",
    "section": "Main rhythm riff",
    "style": "Fast thrash",
    "family": "high-gain",
    "base": {
      "gain": 6,
      "bass": 4.5,
      "middle": 4,
      "treble": 7,
      "presence": 6
    },
    "pickup": "Bridge humbucker",
    "effects": [
      {
        "type": "gate",
        "name": "noise gate",
        "optional": false,
        "settings": "Threshold: Just enough to stop idle noise"
      },
      {
        "type": "overdrive",
        "name": "overdrive boost",
        "optional": false,
        "settings": "Drive / 10: 0.5 · Tone / 10: 5.5 · Output: Start at unity, then add a small boost only if needed"
      }
    ],
    "tip": "Prioritize tight downstrokes. A modest gain setting keeps rapid palm-muted notes distinct; leave delay off.",
    "sources": [],
    "origin": "library"
  },
  {
    "id": "comfortably-numb",
    "title": "Comfortably Numb",
    "artist": "Pink Floyd",
    "section": "Closing solo",
    "style": "Sustaining fuzz lead",
    "family": "clean",
    "base": {
      "gain": 3,
      "bass": 4.5,
      "middle": 6.5,
      "treble": 5.5,
      "presence": 4.5
    },
    "pickup": "Bridge single-coil; roll tone down slightly if harsh",
    "effects": [
      {
        "type": "fuzz",
        "name": "Muff-style fuzz",
        "optional": false,
        "settings": "Sustain / 10: 6.5 · Tone / 10: 4.5 · Output: unity"
      },
      {
        "type": "delay",
        "name": "digital delay",
        "optional": false,
        "settings": "Time (ms): 380 · Feedback / 10: 2.5 · Mix / 10: 2.3"
      },
      {
        "type": "reverb",
        "name": "plate reverb",
        "optional": false,
        "settings": "Decay (s): 2.4 · Mix / 10: 1.5"
      }
    ],
    "tip": "Build sustain with fuzz while leaving the amp relatively clean. Keep echoes below the dry note and focus on controlled bends.",
    "sources": [
      {
        "title": "BOSS popular delay artists",
        "url": "https://articles.boss.info/popular-delay-pedal-artists-and-their-iconic-sounds/",
        "supports": "General David Gilmour delay context, not the suggested 380 ms closing-solo recipe."
      }
    ],
    "origin": "library"
  },
  {
    "id": "streets",
    "title": "Where the Streets Have No Name",
    "artist": "U2",
    "section": "Opening guitar pattern",
    "style": "Rhythmic delay",
    "family": "pushed",
    "base": {
      "gain": 3,
      "bass": 4,
      "middle": 5.5,
      "treble": 7,
      "presence": 6
    },
    "pickup": "Bridge single-coil, or bridge-and-middle for less edge",
    "effects": [
      {
        "type": "delay",
        "name": "digital delay",
        "optional": false,
        "settings": "Time (ms): 350 · Feedback / 10: 3.5 · Mix / 10: 4 · Note: Starting estimate; tap to the performance, then choose dotted-eighth subdivision"
      },
      {
        "type": "reverb",
        "name": "hall reverb",
        "optional": false,
        "settings": "Decay (s): 2.8 · Mix / 10: 2"
      }
    ],
    "tip": "Set delay timing before EQ. Let the repeats complete the pattern, then reduce gain if the rhythmic echoes lose definition.",
    "sources": [
      {
        "title": "BOSS complete guide to delay pedals",
        "url": "https://articles.boss.info/the-complete-guide-to-delay-pedals/",
        "supports": "Uses The Edge and Where the Streets Have No Name as examples of rhythmic delay; numerical recommendation remains an estimate."
      }
    ],
    "origin": "library"
  },
  {
    "id": "purple-rain",
    "title": "Purple Rain",
    "artist": "Prince and the Revolution",
    "section": "Opening clean chords",
    "style": "Wide clean chorus",
    "family": "clean",
    "base": {
      "gain": 2,
      "bass": 5,
      "middle": 5.5,
      "treble": 6,
      "presence": 4.5
    },
    "pickup": "Neck single-coil or combined pickups",
    "effects": [
      {
        "type": "chorus",
        "name": "chorus",
        "optional": false,
        "settings": "Rate (Hz): 0.7 · Depth / 10: 4.5 · Mix / 10: 3.5"
      },
      {
        "type": "reverb",
        "name": "hall reverb",
        "optional": false,
        "settings": "Decay (s): 3.2 · Mix / 10: 2.8"
      }
    ],
    "tip": "Strum gently and let chords ring. Reduce modulation depth if the chord pitch feels unstable.",
    "sources": [],
    "origin": "library"
  },
  {
    "id": "little-wing",
    "title": "Little Wing",
    "artist": "The Jimi Hendrix Experience",
    "section": "Intro",
    "style": "Expressive edge of breakup",
    "family": "pushed",
    "base": {
      "gain": 3.5,
      "bass": 4.5,
      "middle": 6,
      "treble": 6,
      "presence": 4.5
    },
    "pickup": "Neck single-coil",
    "effects": [
      {
        "type": "rotary",
        "name": "rotary speaker",
        "optional": true,
        "settings": "Rate (Hz): 0.7 · Depth / 10: 4 · Mix / 10: 2.5"
      },
      {
        "type": "reverb",
        "name": "spring reverb",
        "optional": false,
        "settings": "Decay (s): 1.8 · Mix / 10: 1.7"
      }
    ],
    "tip": "Use the guitar volume around 8-9 and vary pick attack. Treat the rotary effect as a subtle color.",
    "sources": [],
    "origin": "library"
  },
  {
    "id": "pride-and-joy",
    "title": "Pride and Joy",
    "artist": "Stevie Ray Vaughan and Double Trouble",
    "section": "Rhythm",
    "style": "Texas blues crunch",
    "family": "pushed",
    "base": {
      "gain": 4.5,
      "bass": 4.5,
      "middle": 6.5,
      "treble": 6,
      "presence": 5
    },
    "pickup": "Neck single-coil",
    "effects": [
      {
        "type": "reverb",
        "name": "spring reverb",
        "optional": false,
        "settings": "Decay (s): 1.7 · Mix / 10: 1.5"
      },
      {
        "type": "overdrive",
        "name": "mid-forward overdrive",
        "optional": true,
        "settings": "Drive / 10: 2 · Tone / 10: 4.5 · Output: unity, with a small increase for leads"
      }
    ],
    "tip": "Start with the overdrive off for rhythm. Strong dynamics and muting matter more than extra saturation.",
    "sources": [],
    "origin": "library"
  },
  {
    "id": "everlong",
    "title": "Everlong",
    "artist": "Foo Fighters",
    "section": "Main rhythm",
    "style": "Alternative rock drive",
    "family": "crunch",
    "base": {
      "gain": 6,
      "bass": 5,
      "middle": 6,
      "treble": 6.5,
      "presence": 5
    },
    "pickup": "Bridge humbucker",
    "effects": [
      {
        "type": "reverb",
        "name": "room reverb",
        "optional": false,
        "settings": "Decay (s): 1 · Mix / 10: 0.7"
      }
    ],
    "tip": "Keep gain moderate so the moving notes remain audible. Avoid a big reverb tail under the busy strumming.",
    "sources": [],
    "origin": "library"
  },
  {
    "id": "cherub-rock",
    "title": "Cherub Rock",
    "artist": "The Smashing Pumpkins",
    "section": "Heavy rhythm",
    "style": "Dense fuzz wall",
    "family": "clean",
    "base": {
      "gain": 3,
      "bass": 5,
      "middle": 5.5,
      "treble": 6,
      "presence": 4.5
    },
    "pickup": "Bridge pickup; humbucker or a hot single-coil",
    "effects": [
      {
        "type": "fuzz",
        "name": "Muff-style fuzz",
        "optional": false,
        "settings": "Sustain / 10: 7.5 · Tone / 10: 5 · Output: unity"
      },
      {
        "type": "reverb",
        "name": "room reverb",
        "optional": false,
        "settings": "Decay (s): 1.2 · Mix / 10: 0.7"
      }
    ],
    "tip": "Use the fuzz for thickness and preserve some mids for a single guitar. The record's layered sound will be larger than one amp.",
    "sources": [
      {
        "title": "Electro-Harmonix: Mike, Billy, and the Op-Amp Big Muff Pi",
        "url": "https://www.ehx.com/blog/mike-billy-and-the-op-amp-big-muff-pi/",
        "supports": "Billy Corgan demonstrates recreating Siamese Dream sounds with the Op-Amp Big Muff; does not verify the numeric recipe."
      }
    ],
    "origin": "library"
  },
  {
    "id": "wicked-game",
    "title": "Wicked Game",
    "artist": "Chris Isaak",
    "section": "Lead melody",
    "style": "Ambient clean",
    "family": "clean",
    "base": {
      "gain": 2,
      "bass": 4.5,
      "middle": 5,
      "treble": 6.5,
      "presence": 4.5
    },
    "pickup": "Neck single-coil",
    "effects": [
      {
        "type": "delay",
        "name": "digital delay",
        "optional": false,
        "settings": "Time (ms): 440 · Feedback / 10: 2.5 · Mix / 10: 2.5"
      },
      {
        "type": "reverb",
        "name": "hall reverb",
        "optional": false,
        "settings": "Decay (s): 4 · Mix / 10: 3.5"
      },
      {
        "type": "compression",
        "name": "light compression",
        "optional": true,
        "settings": "Sustain / 10: 2.5 · Mix / 10: 4"
      }
    ],
    "tip": "Use a gentle tremolo-arm dip if available. Keep the dry attack audible through the long reverb.",
    "sources": [],
    "origin": "library"
  }
];
export const AMPS = [
  {
    "id": "generic",
    "name": "Generic amp",
    "controls": [
      "gain",
      "bass",
      "middle",
      "treble",
      "presence"
    ],
    "channels": {
      "clean": "Clean",
      "pushed": "Clean / edge of breakup",
      "crunch": "Crunch",
      "lead": "Lead",
      "high-gain": "High gain"
    },
    "builtin": [
      "reverb"
    ],
    "menuControls": [],
    "notes": "Generic controls: remove any knobs your amp does not have in My rig. Channel names are suggestions."
  },
  {
    "id": "boss-katana-50-gen3",
    "name": "BOSS Katana-50 Gen 3",
    "controls": [
      "gain",
      "bass",
      "middle",
      "treble"
    ],
    "channels": {
      "clean": "CLEAN",
      "pushed": "PUSHED",
      "crunch": "CRUNCH",
      "lead": "LEAD",
      "high-gain": "BROWN"
    },
    "builtin": [
      "overdrive",
      "distortion",
      "fuzz",
      "compression",
      "gate",
      "chorus",
      "rotary",
      "delay",
      "reverb"
    ],
    "menuControls": [],
    "cleanNoGain": false,
    "notes": "Match a 0-10 starting value to approximately the same fraction of knob travel. Katana Tone Studio amp controls may display a different numeric range. On older Katana generations, PUSHED is absent; use CLEAN with more gain or CRUNCH with less gain as an approximation. Do not imply the 50 has an effects loop. Five sections: Booster, Mod, FX, Delay, Reverb; detailed effect types and parameters are edited in Tone Studio.",
    "sources": [
      {
        "title": "BOSS Katana-50 Gen 3 product specifications",
        "url": "https://www.boss.info/us/products/katana-50_gen_3/",
        "supports": "Exact panel control list, six amp characters, five effect sections and Tone Studio editing."
      }
    ]
  },
  {
    "id": "fender-mustang-lt25",
    "name": "Fender Mustang LT25",
    "controls": [
      "gain",
      "bass",
      "treble",
      "middle"
    ],
    "channels": {
      "clean": "TWIN CLEAN or DELUXE CLN",
      "pushed": "DELUXE CLN with more gain, or 60S UK CLN",
      "crunch": "70S ROCK",
      "lead": "80S ROCK",
      "high-gain": "90S ROCK or METAL 2000"
    },
    "builtin": [
      "overdrive",
      "distortion",
      "fuzz",
      "compression",
      "gate",
      "chorus",
      "rotary",
      "delay",
      "reverb"
    ],
    "menuControls": [
      "middle"
    ],
    "cleanNoGain": false,
    "notes": "Press the encoder to edit a preset, select the amplifier, then scroll to MIDDLE. Volume is preset level; Master sets listening loudness. Model choices are starting recommendations, not claims about original rigs. One effect per category: STOMP, MOD, DELAY, REV. Compression and overdrive may compete for the same STOMP slot; prioritize the effect identified as essential to the recipe.",
    "sources": [
      {
        "title": "Fender Mustang LT25 Expanded Owner's Manual",
        "url": "https://www.fmicassets.com/Damroot/Original/10001/OM_2311100000_Mustang_LT25_English.pdf",
        "supports": "Physical and encoder controls, Middle editing (printed page 5), amp labels (printed page 8), and one effect per category (printed page 9)."
      }
    ]
  },
  {
    "id": "marshall-dsl40cr",
    "name": "Marshall DSL40CR",
    "controls": [
      "gain",
      "bass",
      "middle",
      "treble",
      "presence"
    ],
    "channels": {
      "clean": "CLASSIC GAIN / CLEAN",
      "pushed": "CLASSIC GAIN / CLEAN with more gain, or CRUNCH with less gain",
      "crunch": "CLASSIC GAIN / CRUNCH",
      "lead": "ULTRA GAIN / OD1",
      "high-gain": "ULTRA GAIN / OD1; try OD2 only if more saturation is needed"
    },
    "builtin": [
      "reverb"
    ],
    "menuControls": [],
    "cleanNoGain": false,
    "notes": "Start Tone Shift off and Resonance around 4-5 as an original practical recommendation. Bass/Middle/Treble are shared; adjust the selected channel gain separately. Presence is separate from preamp Treble, so do not merge the two controls. Built-in digital reverb. Chorus, fuzz, compression and delay need external effects. Series effects loop available.",
    "sources": [
      {
        "title": "Marshall DSL40 Combo official specifications",
        "url": "https://www.marshall.com/us/en/product/dsl40-combo",
        "supports": "Classic and Ultra Gain modes, Gain/Bass/Middle/Treble/Presence/Resonance, reverb and series loop."
      }
    ]
  },
  {
    "id": "orange-crush-35rt",
    "name": "Orange Crush 35RT",
    "controls": [
      "bass",
      "middle",
      "treble",
      "gain"
    ],
    "channels": {
      "clean": "CLEAN",
      "pushed": "DIRTY with low gain",
      "crunch": "DIRTY",
      "lead": "DIRTY",
      "high-gain": "DIRTY"
    },
    "builtin": [
      "reverb"
    ],
    "menuControls": [],
    "cleanNoGain": true,
    "notes": "The Clean control is channel volume, not a clean gain control. Use Clean Volume or Dirty Volume for listening level. A clean-channel recipe should not display an actionable Gain knob. Built-in reverb; modulation, delay, compression and fuzz require external effects. Buffered effects loop available.",
    "sources": [
      {
        "title": "Orange Crush 35RT official specifications and manual link",
        "url": "https://orangeamps.com/en-us/products/crush-35rt",
        "supports": "Clean Volume, Dirty Gain, three-band EQ, Dirty Volume, channel switch, reverb, tuner and buffered effects loop."
      }
    ]
  }
];
export const GUITARS = [
  {
    "name": "Single-coil guitar",
    "pickup": "single",
    "description": "Strat / Tele style, passive single-coils"
  },
  {
    "name": "Humbucker guitar",
    "pickup": "humbucker",
    "description": "Les Paul / SG style, passive humbuckers"
  },
  {
    "name": "P-90 guitar",
    "pickup": "p90",
    "description": "Passive P-90 pickups"
  },
  {
    "name": "Active-pickup guitar",
    "pickup": "active",
    "description": "Powered active pickups"
  },
  {
    "name": "Mixed-pickup guitar",
    "pickup": "mixed",
    "description": "HSS / HSH, or switchable coil split"
  }
];
export const DEFAULT_RIG = {guitar:'Single-coil guitar',pickup:'single',amp:AMPS[0],pedals:[],guitarSources:[]};
