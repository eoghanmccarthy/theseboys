import PropTypes from 'prop-types';

export const channelTypes = PropTypes.shape({
  pan: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
  mute: PropTypes.bool.isRequired
}).isRequired;

export const synthTypes = PropTypes.oneOf([
  'AMSynth',
  'DuoSynth',
  'FMSynth',
  'MembraneSynth',
  'MetalSynth',
  'NoiseSynth',
  'PluckSynth',
  'PolySynth',
  'Synth'
]).isRequired;

export const instrumentTypes = PropTypes.shape({
  synth: synthTypes,
  options: PropTypes.object.isRequired
}).isRequired;

export const notesTypes = PropTypes.arrayOf(PropTypes.string);

export const stepsTypes = PropTypes.arrayOf(PropTypes.array.isRequired).isRequired;
