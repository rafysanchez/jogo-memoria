const emojis = ['🎮', '🎲', '🎯', '🎨', '🎭', '🎪', '🎢', '🎡'];
const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const movesElement = document.getElementById('moves');
const restartButton = document.getElementById('restart');

let cards = [];
let flippedCards = [];
let score = 0;
let moves = 0;
let canFlip = true;

function createCard(emoji) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="front">${emoji}</div>
    <div class="back">?</div>
  `;
  return card;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function initializeGame() {
  gameBoard.innerHTML = '';
  cards = [];
  flippedCards = [];
  score = 0;
  moves = 0;
  canFlip = true;
  scoreElement.textContent = score;
  movesElement.textContent = moves;

  // Create pairs of cards
  const cardEmojis = [...emojis, ...emojis];
  shuffleArray(cardEmojis);

  cardEmojis.forEach(emoji => {
    const card = createCard(emoji);
    cards.push(card);
    gameBoard.appendChild(card);

    card.addEventListener('click', () => flipCard(card));
  });
}

function flipCard(card) {
  if (!canFlip || flippedCards.includes(card) || card.classList.contains('matched')) {
    return;
  }

  card.classList.add('flip');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesElement.textContent = moves;
    canFlip = false;

    const [card1, card2] = flippedCards;
    const emoji1 = card1.querySelector('.front').textContent;
    const emoji2 = card2.querySelector('.front').textContent;

    if (emoji1 === emoji2) {
      score += 10;
      scoreElement.textContent = score;
      card1.classList.add('matched');
      card2.classList.add('matched');
      flippedCards = [];
      canFlip = true;

      // Check if game is complete
      if (document.querySelectorAll('.matched').length === cards.length) {
        setTimeout(() => {
          alert(`Congratulations! You won with ${score} points in ${moves} moves!`);
        }, 500);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        flippedCards = [];
        canFlip = true;
      }, 1000);
    }
  }
}

restartButton.addEventListener('click', initializeGame);
initializeGame();