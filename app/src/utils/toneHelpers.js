import Tone from 'tone';
import { isString } from 'utils/helpers/typeCheck';

export const getSynth = (name, options = {}) => {
  if (!isString(name)) {
    return;
  }

  const synths = {
    PolySynth: new Tone.PolySynth(options),
    MembraneSynth: new Tone.MembraneSynth(options),
    MetalSynth: new Tone.MetalSynth(options),
    NoiseSynth: new Tone.NoiseSynth(options),
    Synth: new Tone.Synth(options)
  };

  return synths[name];
};

export const getEffect = (name, options = {}) => {
  if (!isString(name)) {
    return;
  }

  const effects = {
    BitCrusher: new Tone.BitCrusher(options),
    Compressor: new Tone.Compressor(options),
    Distortion: new Tone.Distortion(options),
    EQ3: new Tone.EQ3(options),
    FeedbackDelay: new Tone.FeedbackDelay(options),
    Filter: new Tone.Filter(options),
    Gain: new Tone.Gain(options),
    Limiter: new Tone.Limiter(options),
    Phaser: new Tone.Phaser(options),
    PitchShift: new Tone.PitchShift(options),
    Reverb: new Tone.Reverb(options),
    StereoWidener: new Tone.StereoWidener(options)
  };

  return effects[name];
};
