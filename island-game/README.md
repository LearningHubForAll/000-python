# 🏝️ Island Catcher - Dynamic Island Web Game

A fun and interactive web game that simulates and interacts with the iPhone Dynamic Island feature. Catch falling items from the Dynamic Island while avoiding dangerous objects!

## 🎮 Game Features

- **Dynamic Island Simulation**: Visual simulation of iPhone's Dynamic Island that responds to game events
- **Touch Controls**: Optimized for mobile devices with smooth touch and drag controls
- **Progressive Difficulty**: Game gets harder as you play longer
- **Visual Effects**: Particle effects, catch animations, and Dynamic Island interactions
- **Responsive Design**: Works on all screen sizes, optimized for iPhone
- **Score Tracking**: Keep track of your high scores

## 🕹️ How to Play

1. **Start the Game**: Tap the "Start Game" button
2. **Move the Basket**:
   - On mobile: Touch and drag the basket 🧺
   - On desktop: Click and drag with mouse or click anywhere to move
3. **Catch Items**:
   - 🍎 🍊 🍋 Good fruits = +10 points
   - ⭐ Star = +50 points bonus
   - 💣 ☠️ 🔥 Bad items = -1 life
4. **Survive**: You have 3 lives. Don't catch the bad items!
5. **Watch the Island**: The Dynamic Island shows your current status and events

## 📱 iPhone Optimization

The game is specially optimized for iPhone with:
- Safe area support for notched devices
- Dynamic Island dimension matching for iPhone 14 Pro and later
- Touch-optimized controls with no accidental scrolling
- Fullscreen viewport experience
- "Add to Home Screen" support for app-like experience

## 🚀 How to Run

### Option 1: Direct File Opening
1. Clone or download this repository
2. Navigate to the `island-game` directory
3. Open `index.html` in a web browser

### Option 2: Local Web Server (Recommended)
```bash
# Using Python 3
cd island-game
python3 -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Option 3: iPhone Testing
1. Upload the files to a web server or use a local network server
2. Access from your iPhone's Safari browser
3. Tap the Share button → "Add to Home Screen" for the best experience

## 🎯 Game Mechanics

### Scoring
- **Good Fruits** (🍎 🍊 🍋 🍇 🍓 🍒): +10 points each
- **Star** (⭐): +50 points
- **Bad Items** (💣 ☠️ 🔥): -1 life (no points)

### Item Spawn Rates
- Good items: 70% chance
- Bad items: 20% chance
- Star bonus: 10% chance

### Difficulty Progression
- Falling speed increases every 5 seconds
- Spawn rate increases over time
- Maximum difficulty caps ensure playability

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Animations, transitions, and responsive design
- **Vanilla JavaScript**: Game logic and interactions (no frameworks)

### Browser Compatibility
- iOS Safari 14+
- Chrome 90+
- Firefox 88+
- Edge 90+

### File Structure
```
island-game/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── game.js         # Game logic and interactions
└── README.md       # This file
```

## 🎨 Customization

You can easily customize the game by modifying:

### Add New Items
Edit `itemTypes` in `game.js`:
```javascript
const itemTypes = {
    good: ['🍎', '🍊', 'YOUR_EMOJI'],
    bad: ['💣', 'YOUR_EMOJI'],
    star: ['⭐']
};
```

### Change Difficulty
Modify game parameters in `game.js`:
```javascript
gameState = {
    itemSpeed: 3000,  // Fall duration in ms
    spawnRate: 1500,  // Time between spawns
    difficulty: 1     // Difficulty multiplier
};
```

### Customize Colors
Edit the CSS variables and gradients in `styles.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## 🎬 Dynamic Island Interactions

The game showcases Dynamic Island interactions:

| Event | Island Display | Duration |
|-------|---------------|----------|
| Game Start | 🎮 ▶️ | 1.5s |
| Catch Good Item | ✅ +10 | 1.5s |
| Catch Star | ⭐ +50! | 1.5s |
| Catch Bad Item | ❌ -1 ❤️ | 1.5s |
| Game Over | 💀 Game Over | 1.5s |
| Idle | 🎮 (pulsing) | Continuous |

## 📊 Future Enhancements

Potential features to add:
- [ ] Sound effects and background music
- [ ] Multiple difficulty levels selection
- [ ] Power-ups (slow-mo, shield, magnet)
- [ ] Leaderboard with local storage
- [ ] Different game modes (time attack, endless)
- [ ] Combo system for consecutive catches
- [ ] Achievement system

## 🤝 Contributing

Feel free to fork this project and add your own features! Some ideas:
- New item types with special effects
- Different basket styles
- Multiplayer mode
- Integration with actual Live Activities API

## 📝 License

This project is open source and available under the MIT License.

## 🎓 Learning Resources

This game demonstrates:
- Mobile-first responsive web design
- Touch event handling
- CSS animations and transitions
- Game loop implementation
- Collision detection
- DOM manipulation
- Event-driven programming

## 📞 Support

If you encounter any issues or have suggestions:
1. Check that you're using a modern browser
2. Ensure JavaScript is enabled
3. Try clearing your browser cache
4. Test on a different device

## 🌟 Credits

Created as a fun demonstration of web-based mobile game development with iPhone Dynamic Island simulation.

Enjoy playing Island Catcher! 🎮🏝️
