export default (sequencer, stepTotal, step) => {
  const elements = document.getElementsByClassName(`${sequencer}__step`);

  for (let i = 0; i < elements.length; i++) {
    const currentStep = (i - step) % stepTotal === 0;
    if (currentStep) {
      elements[i].classList.add('current');
      if (elements[i].classList.contains('on')) {
        elements[i].classList.add('playing');
      }
    } else {
      elements[i].classList.remove('current', 'playing');
    }
  }
};
