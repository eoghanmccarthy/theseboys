export default (name, track, step) =>
  document
    .querySelector(`.${name}__step.track-${track}-step-${step}`)
    .getAttribute('data-step-status') === 'on';
