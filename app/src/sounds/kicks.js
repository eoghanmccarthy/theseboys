//https://howtomakeelectronicmusic.com/eq-frequency-chart-for-electronic-music/#prettyPhoto/0/
//https://blog.landr.com/eq-kick-and-bass/
//https://github.com/Tonejs/Tone.js/issues/416

export const tracks = {
  kick01: {
    id: 'kick01',
    type: 'kick',
    name: 'SUB KICK',
    notes: ['G1'],
    instrument: {
      synth: 'MembraneSynth',
      options: {
        pitchDecay: 0.01,
        octaves: 6,
        oscillator: {
          type: 'square4'
        },
        envelope: {
          attack: 0.001,
          decay: 0.45,
          sustain: 0.1,
          release: 0.3
        }
      }
    },
    effects: {
      Reverb: { decay: 0.2, preDelay: 0.2, wet: 0.05 },
      Distortion: { distortion: 0.6, oversample: '4x', wet: 0.22 },
      Compressor: {
        threshold: -26,
        knee: 20,
        ratio: 4.2,
        attack: 0.024,
        release: 0.132
      },
      Limiter: { threshold: -48 },
      EQ3: {
        Q: 1,
        low: -3,
        mid: -48,
        high: -60,
        lowFrequency: 100,
        highFrequency: 120
      }
    },
    controls: {
      equaliser: { span: '1 / span 5', effects: ['EQ3'] },
      compressor: { span: '6 / span 4', effects: ['Compressor'] },
      limiter: { span: '10 / span 1', effects: ['Limiter'] },
      effects: {
        span: '11 / span 2',
        effects: []
        //effects: ['Distortion', 'Reverb']
      }
    }
  },
  kick02: {
    id: 'kick02',
    type: 'kick',
    name: 'MID KICK',
    notes: ['C1'],
    instrument: {
      synth: 'MembraneSynth',
      options: {
        pitchDecay: 0.01,
        octaves: 6,
        oscillator: {
          type: 'square4'
        },
        envelope: {
          attack: 0.001,
          decay: 0.45,
          sustain: 0.1,
          release: 0.3
        }
      }
    },
    effects: {
      Compressor: {
        threshold: -21,
        knee: 20,
        ratio: 4.2,
        attack: 0.024,
        release: 0.132
      },
      Limiter: { threshold: -12 },
      EQ3: {
        Q: 1,
        low: -3,
        mid: -24,
        high: -60,
        lowFrequency: 160,
        highFrequency: 420
      }
    },
    controls: {
      eq3: { span: '1 / span 5', effects: ['EQ3'] },
      compressor: { span: '6 / span 4', effects: ['Compressor'] },
      limiter: { span: '10 / span 1', effects: ['Limiter'] }
    }
  }
};
