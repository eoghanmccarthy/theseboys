export const BPM_MIN = 60;
export const BPM_MAX = 240;
export const DECIBEL_MIN = -60;
export const DECIBEL_MAX = 20;
export const FREQUENCY_MIN = 20;
export const FREQUENCY_MAX = 20000;
export const EQ3_MIN = -60;
export const EQ3_MAX = 20;
export const VOL_MIN = -60;
export const VOL_MAX = 20;
export const WET_STEP = 0.01;
export const WET_DECIMALS = 2;
export const WET_MIN = 0;
export const WET_MAX = 1;
export const SCALE_A_MAJOR = ['A3', 'B3', 'D4', 'E4', 'F#4', 'A4', 'B4', 'D5'];
export const SCALE_A_MINOR = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5'];
export const SCALE_C_MAJOR = ['C4', 'D4', 'F4', 'G4', 'A4', 'C5', 'D5', 'F5'];
export const SCALE_G_MAJOR = ['G3', 'A3', 'C4', 'D4', 'E4', 'G4', 'A4', 'C5'];
export const CHANNEL_DEFAULT = { pan: 0, volume: 0, mute: false };
export const NOTES_DEFAULT = ['C1'];
export const STEP_COUNT_DEFAULT = 16;
export const STEPS_DEFAULT = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
export const TRACK_DEFAULT = {
  channel: CHANNEL_DEFAULT,
  notes: NOTES_DEFAULT,
  stepCount: STEP_COUNT_DEFAULT,
  steps: STEPS_DEFAULT,
  instrument: {
    synth: 'SYNTH',
    options: {}
  },
  effects: {},
  controls: {}
};
