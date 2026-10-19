// Random Games Display Script
// Displays random games in the .n159 grid based on screen width
// Refreshes every 10 minutes

class RandomGamesDisplay {
  constructor() {
    this.games = [];
    this.refreshInterval = null;
    this.init();
  }

  // Initialize the display
  async init() {
    try {
      await this.loadGames();
      this.displayRandomGames();
      this.startRefreshTimer();
      window.addEventListener('resize', () => this.displayRandomGames());
    } catch (error) {
      console.error('Error initializing random games display:', error);
    }
  }

  // Load games from JSON
  async loadGames() {
    try {
      let response;
      try {
        response = await fetch('/assest/data/games.json');
        if (!response.ok) throw new Error('Not found');
      } catch (error) {
        response = await fetch('assest/data/games.json');
      }
      this.games = await response.json();
      console.log(`Loaded ${this.games.length} games`);
    } catch (error) {
      console.error('Error loading games:', error);
      throw error;
    }
  }

  // Get number of games to display based on screen width
  getGameCount() {
    const width = window.innerWidth;

    // Based on your CSS media queries
    if (width < 564) return 3;
    if (width < 684) return 3;
    if (width < 834) return 4;
    if (width < 954) return 5;
    if (width < 1074) return 6;
    if (width < 1224) return 7;
    if (width < 1344) return 8;
    if (width < 1464) return 8;
    if (width < 1584) return 10;
    if (width < 1704) return 11;
    if (width < 1824) return 12;
    if (width < 1944) return 13;
    if (width < 2064) return 14;
    if (width < 2184) return 15;
    if (width < 2304) return 16;
    return 19; // For screens >= 2304px
  }

  // Get random games
  getRandomGames(count) {
    const shuffled = [...this.games].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  // Create a game element
  createGameElement(game) {
    const gameDiv = document.createElement('div');
    gameDiv.className = 'us-grid-game';

    const a = document.createElement('a');
    a.href = game.href;
    a.title = game.title;
    a.className = 'us-game-link';

    const wrapImage = document.createElement('div');
    wrapImage.className = 'us-wrap-image';

    const img = document.createElement('img');
    img.src = game.img;
    img.alt = game.title;
    img.title = game.title;
    img.loading = 'lazy';
    
    // Create srcset with @2x version
    const imageName = game.img.replace(/\.(webp|png|jpg|jpeg)$/, '');
    img.srcset = `${game.img} 1x, ${imageName}@2x.webp 2x`;

    const gameTitle = document.createElement('div');
    gameTitle.className = 'us-game-title';

    const titleSpan = document.createElement('span');
    titleSpan.className = 'text-overflow';
    titleSpan.textContent = game.title;

    const vignette = document.createElement('div');
    vignette.className = 'GameThumb_gradientVignette__Q04oZ';

    gameTitle.appendChild(titleSpan);
    wrapImage.appendChild(img);
    wrapImage.appendChild(gameTitle);
    a.appendChild(wrapImage);
    a.appendChild(vignette);
    gameDiv.appendChild(a);

    return gameDiv;
  }

  // Display random games in the grid
  displayRandomGames() {
    const grid = document.querySelector('.n159');
    if (!grid) {
      console.warn('Random games container not found');
      return;
    }

    const gameCount = this.getGameCount();
    const randomGames = this.getRandomGames(gameCount);

    const existingGames = grid.querySelectorAll('div.us-grid-game');
    existingGames.forEach(element => element.remove());

    randomGames.forEach((game, index) => {
      const gameElement = this.createGameElement(game);
      gameElement.style.animationDelay = `${index * 0.05}s`;
      grid.appendChild(gameElement);
    });

    console.log(`Displayed ${randomGames.length} random games`);
  }

  // Start the 10-minute refresh timer
  startRefreshTimer() {
    // Refresh every 10 minutes (600000 milliseconds)
    this.refreshInterval = setInterval(() => {
      console.log('Refreshing random games...');
      this.displayRandomGames();
    }, 600000); // 10 minutes

    console.log('Refresh timer started - will refresh every 10 minutes');
  }

  // Stop the refresh timer (useful for cleanup)
  stopRefreshTimer() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      console.log('Refresh timer stopped');
    }
  }

  // Manual refresh method (can be called from console or buttons)
  refresh() {
    console.log('Manual refresh triggered');
    this.displayRandomGames();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.randomGamesDisplay = new RandomGamesDisplay();
  });
} else {
  window.randomGamesDisplay = new RandomGamesDisplay();
}
