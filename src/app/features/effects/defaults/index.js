export default {
  autoFilter: {
    frequency: 1,
    type: "sine",
    depth: 1,
    baseFrequency: 200,
    octaves: 2.6,
    filter: {
      type: "lowpass",
      rolloff: -12,
      Q: 1
    }
  },
  reverb: {
    preDelay: 0.01,
    decay: 1.5,
    wet: 0.0
  }
};
