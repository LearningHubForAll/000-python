// Game State
let gameState = {
    score: 0,
    lives: 3,
    isPlaying: false,
    isPaused: false,
    spawnInterval: null,
    difficulty: 1,
    itemSpeed: 3000,
    spawnRate: 1500
};

// Game Elements
const elements = {
    gameContainer: document.getElementById('gameContainer'),
    gameArea: document.getElementById('gameArea'),
    basket: document.getElementById('basket'),
    startScreen: document.getElementById('startScreen'),
    gameOverScreen: document.getElementById('gameOverScreen'),
    startButton: document.getElementById('startButton'),
    restartButton: document.getElementById('restartButton'),
    scoreDisplay: document.getElementById('score'),
    livesDisplay: document.getElementById('lives'),
    finalScoreDisplay: document.getElementById('finalScore'),
    dynamicIsland: document.getElementById('dynamicIsland'),
    islandText: document.getElementById('islandText')
};

// Item Types
const itemTypes = {
    good: ['🍎', '🍊', '🍋', '🍇', '🍓', '🍒'],
    bad: ['💣', '☠️', '🔥'],
    star: ['⭐']
};

// Basket Position
let basketPosition = {
    x: window.innerWidth / 2,
    isDragging: false
};

// Initialize Game
function init() {
    elements.startButton.addEventListener('click', startGame);
    elements.restartButton.addEventListener('click', restartGame);
    setupBasketControls();
    centerBasket();
}

// Center Basket
function centerBasket() {
    basketPosition.x = window.innerWidth / 2;
    elements.basket.style.left = `${basketPosition.x}px`;
}

// Setup Basket Controls (Touch and Mouse)
function setupBasketControls() {
    let startX = 0;
    let currentX = 0;

    // Touch Events
    elements.basket.addEventListener('touchstart', (e) => {
        if (!gameState.isPlaying) return;
        basketPosition.isDragging = true;
        startX = e.touches[0].clientX;
        currentX = basketPosition.x;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!basketPosition.isDragging || !gameState.isPlaying) return;
        const touchX = e.touches[0].clientX;
        const deltaX = touchX - startX;
        basketPosition.x = Math.max(40, Math.min(window.innerWidth - 40, currentX + deltaX));
        elements.basket.style.left = `${basketPosition.x}px`;
    }, { passive: true });

    document.addEventListener('touchend', () => {
        basketPosition.isDragging = false;
    }, { passive: true });

    // Mouse Events for Desktop
    elements.basket.addEventListener('mousedown', (e) => {
        if (!gameState.isPlaying) return;
        basketPosition.isDragging = true;
        startX = e.clientX;
        currentX = basketPosition.x;
    });

    document.addEventListener('mousemove', (e) => {
        if (!basketPosition.isDragging || !gameState.isPlaying) return;
        const deltaX = e.clientX - startX;
        basketPosition.x = Math.max(40, Math.min(window.innerWidth - 40, currentX + deltaX));
        elements.basket.style.left = `${basketPosition.x}px`;
    });

    document.addEventListener('mouseup', () => {
        basketPosition.isDragging = false;
    });

    // Also allow movement by clicking/tapping anywhere
    elements.gameArea.addEventListener('click', (e) => {
        if (!gameState.isPlaying) return;
        basketPosition.x = e.clientX;
        elements.basket.style.left = `${basketPosition.x}px`;
    });
}

// Start Game
function startGame() {
    gameState = {
        score: 0,
        lives: 3,
        isPlaying: true,
        isPaused: false,
        difficulty: 1,
        itemSpeed: 3000,
        spawnRate: 1500
    };

    elements.startScreen.classList.add('hidden');
    elements.gameOverScreen.classList.add('hidden');
    updateScore();
    updateLives();
    centerBasket();

    // Animate Dynamic Island
    animateDynamicIsland('🎮', '▶️');

    // Start spawning items
    startSpawning();

    // Increase difficulty over time
    setInterval(() => {
        if (gameState.isPlaying && !gameState.isPaused) {
            gameState.difficulty += 0.1;
            gameState.itemSpeed = Math.max(1500, gameState.itemSpeed - 50);
            gameState.spawnRate = Math.max(800, gameState.spawnRate - 20);
        }
    }, 5000);
}

// Restart Game
function restartGame() {
    // Clear all falling items
    document.querySelectorAll('.falling-item').forEach(item => item.remove());
    startGame();
}

// Start Spawning Items
function startSpawning() {
    if (gameState.spawnInterval) {
        clearInterval(gameState.spawnInterval);
    }

    gameState.spawnInterval = setInterval(() => {
        if (gameState.isPlaying && !gameState.isPaused) {
            spawnItem();
        }
    }, gameState.spawnRate);
}

// Spawn Item
function spawnItem() {
    const item = document.createElement('div');
    item.className = 'falling-item';

    // Determine item type (70% good, 20% bad, 10% star)
    const rand = Math.random();
    let itemType, emoji, points;

    if (rand < 0.7) {
        itemType = 'good';
        emoji = itemTypes.good[Math.floor(Math.random() * itemTypes.good.length)];
        points = 10;
    } else if (rand < 0.9) {
        itemType = 'bad';
        emoji = itemTypes.bad[Math.floor(Math.random() * itemTypes.bad.length)];
        points = -1;
    } else {
        itemType = 'star';
        emoji = itemTypes.star[0];
        points = 50;
    }

    item.textContent = emoji;
    item.dataset.type = itemType;
    item.dataset.points = points;

    // Random horizontal position (avoid edges)
    const minX = 40;
    const maxX = window.innerWidth - 80;
    const randomX = Math.random() * (maxX - minX) + minX;
    item.style.left = `${randomX}px`;
    item.style.top = '80px';

    // Animation duration based on difficulty
    item.style.animationDuration = `${gameState.itemSpeed}ms`;

    elements.gameArea.appendChild(item);

    // Check for collision during fall
    const checkCollision = setInterval(() => {
        if (!gameState.isPlaying || !document.body.contains(item)) {
            clearInterval(checkCollision);
            return;
        }

        const itemRect = item.getBoundingClientRect();
        const basketRect = elements.basket.getBoundingClientRect();

        // Check collision
        if (isColliding(itemRect, basketRect)) {
            clearInterval(checkCollision);
            handleCatch(item, itemType, points);
        }

        // Check if item missed (reached bottom)
        if (itemRect.top > window.innerHeight) {
            clearInterval(checkCollision);
            if (itemType === 'good' || itemType === 'star') {
                // Missed good item
                handleMiss(item);
            } else {
                // Bad item missed (good for player)
                item.remove();
            }
        }
    }, 50);

    // Remove item after animation completes
    setTimeout(() => {
        if (document.body.contains(item)) {
            item.remove();
        }
    }, gameState.itemSpeed + 500);
}

// Check Collision
function isColliding(rect1, rect2) {
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

// Handle Catch
function handleCatch(item, itemType, points) {
    const itemRect = item.getBoundingClientRect();

    // Create catch effect
    createCatchEffect(itemRect.left + itemRect.width / 2, itemRect.top + itemRect.height / 2);

    if (itemType === 'good') {
        gameState.score += points;
        createParticle('✨', itemRect.left, itemRect.top);
        updateScore();
        animateDynamicIsland('✅', '+10');
    } else if (itemType === 'star') {
        gameState.score += points;
        createParticle('💫', itemRect.left, itemRect.top);
        updateScore();
        animateDynamicIsland('⭐', '+50!');
        // Bonus animation
        elements.basket.style.transform = 'translateX(-50%) scale(1.2)';
        setTimeout(() => {
            elements.basket.style.transform = 'translateX(-50%) scale(1)';
        }, 200);
    } else if (itemType === 'bad') {
        gameState.lives--;
        createParticle('💥', itemRect.left, itemRect.top);
        updateLives();
        animateDynamicIsland('❌', '-1 ❤️');

        // Shake basket
        elements.basket.style.animation = 'shake 0.5s';
        setTimeout(() => {
            elements.basket.style.animation = '';
        }, 500);

        if (gameState.lives <= 0) {
            gameOver();
        }
    }

    item.remove();
}

// Handle Miss
function handleMiss(item) {
    item.remove();
    // No penalty for missing good items, just remove them
}

// Create Catch Effect
function createCatchEffect(x, y) {
    const effect = document.createElement('div');
    effect.className = 'catch-effect';
    effect.style.left = `${x - 50}px`;
    effect.style.top = `${y - 50}px`;
    document.body.appendChild(effect);

    setTimeout(() => {
        effect.remove();
    }, 600);
}

// Create Particle
function createParticle(emoji, x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = emoji;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Animate Dynamic Island
function animateDynamicIsland(emoji, text) {
    elements.islandText.textContent = emoji;
    elements.dynamicIsland.classList.add('expanded');

    setTimeout(() => {
        elements.islandText.textContent = text;
    }, 200);

    setTimeout(() => {
        elements.islandText.textContent = '🎮';
        elements.dynamicIsland.classList.remove('expanded');
    }, 1500);
}

// Update Score
function updateScore() {
    elements.scoreDisplay.textContent = gameState.score;
}

// Update Lives
function updateLives() {
    const hearts = '❤️'.repeat(Math.max(0, gameState.lives));
    elements.livesDisplay.textContent = hearts || '💔';
}

// Game Over
function gameOver() {
    gameState.isPlaying = false;
    if (gameState.spawnInterval) {
        clearInterval(gameState.spawnInterval);
    }

    // Clear all falling items
    document.querySelectorAll('.falling-item').forEach(item => item.remove());

    elements.finalScoreDisplay.textContent = gameState.score;
    elements.gameOverScreen.classList.remove('hidden');
    animateDynamicIsland('💀', 'Game Over');
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(-50%) translateX(0); }
        25% { transform: translateX(-50%) translateX(-10px); }
        75% { transform: translateX(-50%) translateX(10px); }
    }
`;
document.head.appendChild(style);

// Prevent scrolling on mobile
document.body.addEventListener('touchmove', (e) => {
    if (gameState.isPlaying) {
        e.preventDefault();
    }
}, { passive: false });

// Handle orientation change
window.addEventListener('resize', () => {
    if (!basketPosition.isDragging) {
        centerBasket();
    }
});

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
