export default (name, track, step) =>
  document.querySelector(`.${name}__step.track-${track}-step-${step}`).classList.contains('on');
