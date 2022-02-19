import {
  BitCrusher,
  Chorus,
  Compressor,
  Distortion,
  EQ3,
  FeedbackDelay,
  Filter,
  Gain,
  Gate,
  Limiter,
  MembraneSynth,
  MetalSynth,
  NoiseSynth,
  Phaser,
  PitchShift,
  PolySynth,
  Reverb,
  StereoWidener,
  Synth
} from 'tone';
import { isString } from 'utils/typeCheck';

export const getSynth = (name, options = {}) => {
  if (!isString(name)) {
    return;
  }

  const synths = {
    PolySynth: new PolySynth(Synth, options),
    MembraneSynth: new MembraneSynth(options),
    MetalSynth: new MetalSynth(options),
    NoiseSynth: new NoiseSynth(options),
    Synth: new Synth(options)
  };

  return synths[name];
};

export const getEffect = (name, options = {}) => {
  if (!isString(name)) {
    return;
  }

  const effects = {
    BitCrusher: new BitCrusher(options),
    //Chorus: new Chorus(options),
    Compressor: new Compressor(options),
    Distortion: new Distortion(options),
    EQ3: new EQ3(options),
    FeedbackDelay: new FeedbackDelay(options),
    Filter: new Filter(options),
    Gain: new Gain(options),
    Gate: new Gate(options),
    Limiter: new Limiter(options),
    Phaser: new Phaser(options),
    PitchShift: new PitchShift(options),
    Reverb: new Reverb(options),
    StereoWidener: new StereoWidener(options)
  };

  return effects[name];
};
