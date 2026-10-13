const welcomeScreen = document.getElementById('welcome-screen');
const inviteScreen = document.getElementById('invite-screen');
const successScreen = document.getElementById('success-screen');
const startButton = document.getElementById('start-button');
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const replayButton = document.getElementById('replay-button');
const attemptCounter = document.getElementById('attempt-counter');
const teaseMessage = document.getElementById('tease-message');
const confettiLayer = document.getElementById('confetti-layer');
const buttonArea = document.getElementById('button-area');

let attempts = 0;
let yesScale = 1;
const messages = [
  'Tes sûr de toi ?',
  'Réfléchis bien stp',
  'Je temmerde Bealy',
  'Là tu forces chef',
  'Le NON va disparaître mec',
  'Tas toujours pas fini',
  'Abuse pas stp',
  'WCH MGL DIS OUI YA QUOI'
];

startButton.addEventListener('click', () => {
  welcomeScreen.classList.add('hidden');
  inviteScreen.classList.remove('hidden');
});

noButton.addEventListener('click', () => {
  attempts += 1;
  attemptCounter.textContent = `TENTATIVES : ${attempts}`;
  teaseMessage.textContent = messages[Math.min(attempts - 1, messages.length - 1)];

  yesScale = Math.min(1 + attempts * 0.16, 2.15);
  yesButton.style.transform = `scale(${yesScale})`;
  yesButton.style.fontSize = `${13 + Math.min(attempts * 1.2, 12)}px`;
  noButton.style.transform = `scale(${Math.max(1 - attempts * 0.13, 0.18)}) rotate(${attempts % 2 ? -7 : 7}deg)`;
  noButton.style.opacity = String(Math.max(1 - attempts * 0.13, 0.25));

  // Après plusieurs refus, le bouton devient difficile à attraper, mais reste accessible au toucher.
  if (attempts >= 4 && attempts % 2 === 0) {
    const maxX = Math.max(0, buttonArea.clientWidth / 2 - noButton.offsetWidth / 2 - 4);
    const moveX = (Math.random() * 2 - 1) * Math.min(maxX, 90);
    noButton.style.position = 'relative';
    noButton.style.left = `${moveX}px`;
  }

  if (attempts >= 8) {
    noButton.textContent = 'NON…? 🫠';
    noButton.style.opacity = '.15';
  }
  if (attempts >= 10) {
    noButton.style.display = 'none';
    teaseMessage.textContent = 'Le bouton NON a quitté la partie. Il ne reste plus qu’une option… 😇';
  }
});

yesButton.addEventListener('click', () => {
  inviteScreen.classList.add('hidden');
  successScreen.classList.remove('hidden');
  launchConfetti();
});

replayButton.addEventListener('click', () => {
  attempts = 0;
  yesScale = 1;
  attemptCounter.textContent = 'TENTATIVES : 0';
  teaseMessage.textContent = 'Alors, monsieur… tu acceptes ? 👀';
  yesButton.style.transform = '';
  yesButton.style.fontSize = '';
  noButton.style.transform = '';
  noButton.style.opacity = '';
  noButton.style.left = '';
  noButton.style.position = '';
  noButton.style.display = '';
  noButton.textContent = 'NON 💀';
  successScreen.classList.add('hidden');
  welcomeScreen.classList.remove('hidden');
});

function launchConfetti() {
  const pieces = ['💖', '💗', '✨', '💜', '🎉', '⭐'];
  for (let i = 0; i < 42; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 1.2}s`;
    piece.style.fontSize = `${14 + Math.random() * 18}px`;
    confettiLayer.appendChild(piece);
    window.setTimeout(() => piece.remove(), 4300);
  }
}
