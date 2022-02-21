export const tracks = {
  OSC01: {
    id: 'OSC01',
    type: 'osc',
    name: '',
    instrument: {
      synth: 'Oscillator',
      options: {
        volume: -8,
        noise: {
          type: 'white',
          playbackRate: 5
        },
        envelope: {
          attack: 0.001,
          decay: 0.222,
          sustain: 0.26,
          release: 0.188
        }
      }
    },
    effects: {
      Filter: {
        type: 'lowpass',
        frequency: 1100,
        rolloff: -12,
        Q: 1,
        gain: 12
      },
      Tremolo: {
        frequency: 9,
        depth: 1
      }
    }
  }
};
