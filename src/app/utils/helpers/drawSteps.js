export default (sequencer, stepTotal, step) => {
  const elements = document.getElementsByClassName(`${sequencer}__step`);

  for (let i = 0; i < elements.length; i++) {
    const currentStep = (i - step) % stepTotal === 0;
    if (currentStep) {
      elements[i].setAttribute('data-step-playback-status', 'current');
    } else {
      elements[i].setAttribute('data-step-playback-status', 'idle');
    }
  }
};
