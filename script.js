const yesButton = document.querySelector('#yes-button');
const noButton = document.querySelector('#no-button');
const firstScreen = document.querySelector('#first-screen');
const nextScreen = document.querySelector('#next-screen');
const nextTitle = document.querySelector('#next-title');
const answerHint = document.querySelector('#answer-hint');
const greetingButton = document.querySelector('#greeting-button');
const greetingScreen = document.querySelector('#greeting-screen');
const greetingTitle = document.querySelector('#greeting-title');

yesButton.addEventListener('click', () => {
  yesButton.remove();
  answerHint.textContent = 'נסי שוב… נשארה עוד תשובה אחת ♡';
  noButton.focus();
});

noButton.addEventListener('click', () => {
  firstScreen.hidden = true;
  nextScreen.hidden = false;
  nextTitle.focus();
});

greetingButton.addEventListener('click', () => {
  nextScreen.hidden = true;
  greetingScreen.hidden = false;
  greetingTitle.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'instant' });
});
