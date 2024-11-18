

---

# LevClicker Documentation

## Overview

**LevClicker** is a clicker game where players collect "levs," the official currency of Bulgaria. Inspired by the popular **Cookie Clicker**, this game showcases modern web development practices, including DOM manipulation, reusable HTML templates, and responsive design. With each click, players earn levs, unlock upgrades, and progress through an engaging and rewarding experience. The game also supports scaling upgrades (1x, 10x, 100x), adding depth to the gameplay.

- **Live Version**: [LevClicker Game](https://momchil2k17.github.io/lev-clicker/)
- **Source Code**: [LevClicker Repository](https://github.com/Momchil2k17/levclicker)

---

## Project Structure

The project consists of three main components:

1. **Main Page (`index.html`)**
   - Defines the structure of the game.
   - Includes an HTML template system to streamline adding new upgrades and scaling features.

2. **Game Logic (`script.js`)**
   - Handles player interactions, upgrade logic, and dynamic updates to the game.
   - Implements scaling upgrades (1x, 10x, 100x) for smoother progression.
   - Utilizes a reusable template to manage upgrades efficiently.

3. **Styling (`style.css`)**
   - Provides a responsive layout and animations to create a polished and immersive interface.

---

## Features

### Core Gameplay

1. **Click to Earn Lev**
   - Players collect levs by clicking a central button.
   - Each click increases the total lev count, displayed prominently on-screen.

2. **Upgrade System**
   - Unlock upgrades to increase the click value or generate levs automatically.
   - Supports scaling options: 1x (single purchase), 10x, and 100x purchases for faster progression.
   - Uses a template-based approach to simplify adding new upgrades.

3. **Real-Time Feedback**
   - Dynamic counters update instantly, providing a satisfying sense of progression.
   - Buttons and upgrades respond visually and audibly to player actions.

### Design and Accessibility

1. **Effortless Scaling with Templates**
   - The game uses DOM manipulation with an HTML template for upgrades.
   - Adding or modifying upgrades is streamlined, making the codebase scalable and maintainable.

2. **Responsive Design**
   - Optimized for both desktop and mobile devices.
   - Ensures a consistent experience across different screen sizes.

3. **Inspired by Cookie Clicker**
   - Incorporates elements of strategy and progression from the classic Cookie Clicker game.

---

## How to Play

### Option 1: Play Online
Access the game directly through the live version:  
[LevClicker Game](https://momchil2k17.github.io/lev-clicker/)

### Option 2: Clone and Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Momchil2k17/levclicker.git
   cd levclicker
   ```

2. Open the `index.html` file in your web browser:
   ```bash
   open index.html
   ```

3. Start clicking to earn levs and enjoy the game!

---

## Technical Details

### Game Logic (`script.js`)

1. **Event-Driven Programming**
   - Handles click events and upgrades dynamically.
   - Ensures a smooth gameplay experience.

2. **Scaling Upgrades**
   - Implements 1x, 10x, and 100x purchase options, allowing players to progress more efficiently.
   - Calculates costs and rewards dynamically based on the scale of the purchase.

3. **HTML Templates for Upgrades**
   - Uses reusable HTML templates to define and render upgrades.
   - Simplifies adding new upgrades by reducing redundant code.

4. **Dynamic DOM Updates**
   - All counters, buttons, and upgrades update in real-time, providing immediate feedback.

### Styling (`style.css`)

1. **Modern Animations**
   - Smooth transitions for button clicks and upgrades.
   - Visually engaging progress bars and counters.

2. **Responsive Design**
   - Media queries ensure the game adapts beautifully to all screen sizes.

---

## Potential Enhancements

### Feature Ideas

1. **Global Leaderboards**
   - Introduce a ranking system to compare scores with other players.

2. **Daily Challenges**
   - Add special tasks or goals for players to complete each day.

3. **Custom Themes**
   - Provide options for dark mode, festive themes, or regional designs.

4. **Localization**
   - Translate the interface to support multiple languages.

---

## Licensing

This project is distributed under the license specified in the `LICENSE` file. Ensure compliance with the terms before modifying or redistributing the code.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository:  
   [LevClicker Repository](https://github.com/Momchil2k17/levclicker)

2. Create a feature branch for your updates.

3. Submit a pull request with a clear description of your changes.

---

## Credits

- **Developer**: Momchil Yankov
- **Inspiration**: The game was inspired by the classic **Cookie Clicker**.

---

