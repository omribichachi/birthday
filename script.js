const yesButton = document.querySelector('#yes-button');
const noButton = document.querySelector('#no-button');
const firstScreen = document.querySelector('#first-screen');
const nextScreen = document.querySelector('#next-screen');
const answerHint = document.querySelector('#answer-hint');
const greetingButton = document.querySelector('#greeting-button');
const greetingScreen = document.querySelector('#greeting-screen');
const kissesButton = document.querySelector('#kisses-button');
const kissesScreen = document.querySelector('#kisses-screen');
const heartsButton = document.querySelector('#hearts-button');
const heartScreen = document.querySelector('#heart-screen');
const floatingHearts = document.querySelector('#floating-hearts');
const heartPrompt = document.querySelector('#heart-prompt');
const heartComplete = document.querySelector('#heart-complete');
const completeHeartButton = document.querySelector('#complete-heart-button');
const completeHeartInline = document.querySelector('#complete-heart-inline');
const completionStatus = document.querySelector('#completion-status');
const halfHeartFrame = document.querySelector('#half-heart-frame');
const screens = [firstScreen, nextScreen, greetingScreen, kissesScreen, heartScreen];
let promptTimer;
let completionTimer;
let completionStarted = false;

// A small, fixed number of particles keeps the effect light on phones.
for (let i = 0; i < 16; i += 1) {
  const heart = document.createElement('span');
  heart.textContent = i % 3 === 0 ? '♡' : '♥';
  heart.style.setProperty('--left', `${(i * 37 + 7) % 100}%`);
  heart.style.setProperty('--size', `${18 + (i % 4) * 8}px`);
  heart.style.setProperty('--duration', `${8 + (i % 5)}s`);
  heart.style.setProperty('--delay', `${-i * 1.7}s`);
  floatingHearts.append(heart);
}

function showScreen(screen) {
  clearTimeout(promptTimer);
  clearTimeout(completionTimer);
  screens.forEach(item => { item.hidden = item !== screen; });
  if (heartPrompt.open) heartPrompt.close();
  if (heartComplete.open) heartComplete.close();
  floatingHearts.hidden = screen !== kissesScreen && screen !== heartScreen;
  screen.querySelector('h1').focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'instant' });
}

yesButton.addEventListener('click', () => {
  yesButton.remove();
  answerHint.textContent = 'נסי שוב… נשארה עוד תשובה אחת ♡';
  noButton.focus();
});

noButton.addEventListener('click', () => {
  showScreen(nextScreen);
});

greetingButton.addEventListener('click', () => {
  showScreen(greetingScreen);
});

kissesButton.addEventListener('click', () => showScreen(kissesScreen));

heartsButton.addEventListener('click', () => {
  showScreen(heartScreen);
  completionStarted = false;
  completionStatus.hidden = true;
  completeHeartInline.hidden = true;
  halfHeartFrame.classList.remove('heart-is-complete');
  promptTimer = setTimeout(() => {
    if (!heartScreen.hidden) heartPrompt.showModal();
  }, 2500);
});

function completeHeart() {
  if (completionStarted || heartScreen.hidden) return;
  completionStarted = true;
  clearTimeout(promptTimer);
  if (heartPrompt.open) heartPrompt.close();
  completeHeartInline.hidden = true;
  completionStatus.hidden = false;
  completionStatus.textContent = 'מחכה לחצי שלך… ♡';
  document.querySelector('#heart-title').focus({ preventScroll: true });
  completionTimer = setTimeout(() => {
    if (heartScreen.hidden) return;
    completionStatus.textContent = 'עכשיו הלב שלם ❤️';
    halfHeartFrame.classList.add('heart-is-complete');
    heartComplete.showModal();
  }, 2000);
}

completeHeartButton.addEventListener('click', completeHeart);
completeHeartInline.addEventListener('click', completeHeart);

// Closing the first popup still leaves a way to continue the surprise.
heartPrompt.addEventListener('close', () => {
  if (!completionStarted && !heartScreen.hidden) {
    completeHeartInline.hidden = false;
    completeHeartInline.focus({ preventScroll: true });
  }
});

document.querySelectorAll('.dialog-close').forEach(button => {
  button.addEventListener('click', () => button.closest('dialog').close());
});
document.querySelector('#close-complete-button').addEventListener('click', () => heartComplete.close());
