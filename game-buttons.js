/* =========================================================
   game-buttons.js
   Yeh script Controls, Share, Refresh, Fullscreen (desktop)
   aur mobile Play Now / Exit (auto-pause) buttons ko
   working banati hai.

   Like / Dislike buttons ko is script me touch NAHI kiya gaya
   (jaisa aap ne bola, wo pehle se working hain).

   Isko apne page ke </body> se pehle <script src="game-buttons.js"></script>
   ke through include kar dein.
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     0) CONFIG — HAR GAME KE ALAG CONTROLS

     Key = game ka "slug" (uski folder ka naam, e.g.
     "games/drive-mad/index.html" ka slug hai "drive-mad").

     Jitne bhi games aap ki site par hain, unka slug yahan
     add karte jayein — naya game add karna ho to sirf ek
     naya entry is object me add karein, JS ka baaqi hissa
     khud-ba-khud sambhal lega.

     NOTE: Agar kisi entry ke andar list me "Desktop" ya
     "Mobile" jaisa koi section-label word ho (bina ":" ke,
     sirf ek word), to wo Controls modal me heading ki
     tarah (bara, bold, bina bullet ke) dikhaya jayega —
     neeche "isHeadingLabel()" helper aur CSS ".gb-controls-
     heading" dekhein.
     --------------------------------------------------------- */
  const CONTROLS_MAP = {
    
  "2048": [
    "Desktop",
    "Up Arrow (↑) = Slide all tiles upward across the grid.",
    "Down Arrow (↓) = Slide all tiles downward across the grid.",
    "Left Arrow (←) = Slide all tiles to the left across the grid.",
    "Right Arrow (→) = Slide all tiles to the right across the grid.",
    "Mobile",
    "Swipe Up = Slide all tiles upward across the grid.",
    "Swipe Down = Slide all tiles downward across the grid.",
    "Swipe Left = Slide all tiles to the left across the grid.",
    "Swipe Right = Slide all tiles to the right across the grid."
  ],
  "11-11": [
    "Desktop",
    "Left Click = Interact with the buttons.",
    "Mouse Movement = Move the cursor over a shape.",
    "Drag = Hold the left mouse button and drag a shape onto the grid.",
    "Release Left Click = Drop the shape onto the grid.",
    "Mobile",
    "Tap = Interact with the buttons.",
    "Drag = Touch and hold a shape, then drag it onto the grid.",
    "Release Finger = Drop the shape onto the grid."
  ],
  "10-minutes-till-dawn": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Left Mouse Button (Hold) = Shoot."
  ],
  "1010-color-match": [
    "Desktop",
    "Left Click = Select, drag, and drop shapes onto the grid.",
    "Mobile",
    "Drag = Drag and drop shapes onto the grid."
  ],
  "12-mini-battles-2": [
    "Desktop",
    "A = Player 1 Action.",
    "L = Player 2 Action."
  ],
  "12-minibattles": [
    "Desktop",
    "A = Action key for Player 1.",
    "L = Action key for Player 2."
  ],
  "18-wheeler-cargo-simulator": [
    "Desktop",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right."
  ],
  "18-wheeler-cargo-simulator-2": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Space = Brake.",
    "C = Toggle the camera view."
  ],
  "18-wheeler-truck-parking": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake / Reverse.",
    "Down Arrow (↓) = Brake / Reverse.",
    "A = Turn left.",
    "Left Arrow (←) = Turn left.",
    "D = Turn right.",
    "Right Arrow (→) = Turn right.",
    "Spacebar = Brake."
  ],
  "18-wheeler-truck-parking-2": [
    "Desktop",
    "W = Drive forward.",
    "Up Arrow (↑) = Drive forward.",
    "S = Reverse.",
    "Down Arrow (↓) = Reverse.",
    "A = Turn left.",
    "Left Arrow (←) = Turn left.",
    "D = Turn right.",
    "Right Arrow (→) = Turn right.",
    "Space = Brake."
  ],
  "1v1-lol": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Jump.",
    "C = Crouch.",
    "Z = Switch building platforms.",
    "X = Switch building platforms.",
    "C = Switch building platforms.",
    "V = Switch building platforms.",
    "Y = Switch building platforms.",
    "F = Switch weapons.",
    "1 = Switch weapons.",
    "2 = Switch weapons.",
    "R = Reload weapon / Rotate structure.",
    "G = Edit structure.",
    "E = Interact / Use item.",
    "Q = Switch weapon / Pickaxe.",
    "Left Mouse Button = Shoot / Place structure.",
    "Right Mouse Button = Aim down sights / Zoom."
  ],
  "2048-cupcakes": [
    "Desktop",
    "Up Arrow (↑) = Move cupcakes upward across the grid.",
    "Down Arrow (↓) = Move cupcakes downward across the grid.",
    "Left Arrow (←) = Move cupcakes left across the grid.",
    "Right Arrow (→) = Move cupcakes right across the grid.",
    "Mobile",
    "Swipe Up = Move tiles upward.",
    "Swipe Down = Move tiles downward.",
    "Swipe Left = Move tiles left.",
    "Swipe Right = Move tiles right."
  ],
  "2048-fusion": [
    "Desktop",
    "W = Move tiles upward.",
    "A = Move tiles left.",
    "S = Move tiles downward.",
    "D = Move tiles right.",
    "Up Arrow (↑) = Move tiles upward.",
    "Down Arrow (↓) = Move tiles downward.",
    "Left Arrow (←) = Move tiles left.",
    "Right Arrow (→) = Move tiles right.",
    "Mobile",
    "Swipe Up = Slide tiles upward.",
    "Swipe Down = Slide tiles downward.",
    "Swipe Left = Slide tiles left.",
    "Swipe Right = Slide tiles right."
  ],
  "2048-multitask": [
    "Desktop",
    "Up Arrow (↑) = Move tiles upward.",
    "Down Arrow (↓) = Move tiles downward.",
    "Left Arrow (←) = Move tiles left.",
    "Right Arrow (→) = Move tiles right.",
    "W = Move tiles upward.",
    "A = Move tiles left.",
    "S = Move tiles downward.",
    "D = Move tiles right.",
    "Mobile",
    "Swipe Up = Move tiles upward.",
    "Swipe Down = Move tiles downward.",
    "Swipe Left = Move tiles left.",
    "Swipe Right = Move tiles right."
  ],
  "3-pandas-in-japan": [
    "Desktop",
    "Left Click = Select a panda.",
    "Left Click = Direct the selected panda to walk or jump to a specific spot.",
    "Left Click = Activate the selected panda's special ability.",
    "Left Click = Interact with levers, buttons, and other puzzle objects.",
    "Mobile",
    "Tap = Select a panda.",
    "Tap = Guide the selected panda to walk or jump to a specific spot.",
    "Tap = Activate the selected panda's special ability.",
    "Tap = Interact with switches and other puzzle objects."
  ],
  "3d-arena-racing": [
    "Desktop",
    "Left Click = Select a panda.",
    "Left Click = Direct the selected panda to walk or jump to a specific location.",
    "Left Click = Activate the selected panda's special ability.",
    "Left Click = Interact with levers, buttons, and other puzzle objects.",
    "Mobile",
    "Tap = Select a panda.",
    "Tap = Direct the selected panda to walk or jump to a specific location.",
    "Tap = Activate the selected panda's special ability.",
    "Tap = Interact with levers, buttons, and other puzzle objects."
  ],
  "3d-bowling": [
    "Desktop",
    "Left Click = Hold and drag to aim the throw.",
    "Left Click = Release to throw the ball."
  ],
  "3d-car-simulator": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "1 = Switch to the rally car.",
    "2 = Switch to the police car.",
    "3 = Switch to the muscle car.",
    "Spacebar = Activate the handbrake.",
    "C = Cycle through different camera angles.",
    "Shift = Shift or adjust the vehicle.",
    "R = Reset the entire game simulation.",
    "G = Reset the position of the current car.",
    "E = Turn the police vehicle lights and sirens on or off."
  ],
  "3d-free-kick": [
    "Desktop",
    "Left Click = Click and drag to aim the shot, adjusting its speed, direction, and height.",
    "Left Click = Swipe again while the ball is in the air to apply spin and curve its trajectory.",
    "Mobile",
    "Swipe = Launch the ball toward the goal.",
    "Swipe = Swipe again while the ball is in the air to bend or curve its trajectory."
  ],
  "3d-moto-simulator-2": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "1 = Change to Bike 1.",
    "2 = Change to Bike 2.",
    "3 = Change to Bike 3.",
    "Spacebar = Use the handbrake.",
    "Shift = Activate nitro boost.",
    "C = Change the camera view.",
    "R = Reset the game.",
    "G = Reset the bike.",
    "E = Turn the police lights on or off."
  ],
  "4th-and-goal-2022": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Space = Snap the ball.",
    "A = Pass or perform actions.",
    "S = Pass or perform actions.",
    "D = Pass or perform actions.",
    "W = Sprint or boost.",
    "Mouse Movement = Navigate menus."
  ],
  "4wd-off-road-driving-sim": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Brake.",
    "C = Change the camera view."
  ],
  "4x4-offroad": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Balance the vehicle.",
    "Left Arrow (←) = Balance the vehicle to the left.",
    "Right Arrow (→) = Balance the vehicle to the right.",
    "Space = Brake.",
    "R = Repair the vehicle.",
    "C = Change the camera view."
  ],
  "8-ball-pool": [
    "Desktop",
    "Mouse Movement = Aim the cue.",
    "Drag Power Bar = Adjust shot strength.",
    "Release Mouse = Take the shot.",
    "Cue Ball Icon = Apply top spin, backspin, or side spin.",
    "Mobile",
    "Drag = Aim shots.",
    "Pull Back = Set shot power.",
    "Release = Strike the cue ball.",
    "Cue Ball UI = Add spin and control the cue ball's position."
  ],
  "99-balls": [
    "Desktop",
    "Mouse Movement = Aim.",
    "Left Click = Press and release to shoot balls."
  ],
  "99-nights-in-the-forest": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Mouse Movement = Look around / Aim.",
    "Left Mouse Button = Attack / Use weapon.",
    "E = Interact with objects.",
    "Shift = Sprint.",
    "Spacebar = Jump.",
    "Tab = Open the inventory.",
    "Esc = Pause the game."
  ],
  "a-dance-of-fire-and-ice": [
    "Desktop",
    "Left Click = Tap on every beat to move the orbs along the path.",
    "Mobile",
    "Tap = Tap on every beat to move the orbs along the path."
  ],
  "a-pretty-odd-bunny": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Jump.",
    "Up Arrow (↑) = Jump.",
    "S = Crouch.",
    "Down Arrow (↓) = Crouch.",
    "Mobile",
    "On-screen Buttons = Move, jump, and crouch."
  ],
  "a-small-world-cup": [
    "Desktop",
    "Left Click = Drag to aim and release to shoot. Short drags create soft shots, while longer drags add more power.",
    "W = Drive forward.",
    "A = Steer left.",
    "D = Steer right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "R = Restart the current match or challenge.",
    "M = Turn sound on or off.",
    "Esc = Pause the game and open the settings.",
    "P = Pause the game and open the settings.",
    "Mobile",
    "Drag = Drag to aim and release to shoot. Short drags create soft shots, while longer drags add more power."
  ],
  "achievement-unlocked": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Spacebar = Jump.",
    "Shift = Crouch.",
    "Z = Switch building platforms.",
    "X = Switch building platforms.",
    "C = Switch building platforms.",
    "V = Switch building platforms.",
    "1 = Switch weapons / items.",
    "2 = Switch weapons / items.",
    "3 = Switch weapons / items.",
    "4 = Switch weapons / items.",
    "5 = Switch weapons / items.",
    "R = Reload weapon / Rotate structure.",
    "G = Edit structure.",
    "E = Interact / Use item.",
    "Q = Switch to the pickaxe.",
    "Left Mouse Button = Shoot weapon / Place structure.",
    "Right Mouse Button = Aim down sights / Zoom."
  ],
  "adam-and-eve-5-part-1": [
    "Desktop",
    "Left Click = Click objects and interact with the environment."
  ],
  "adam-and-eve-5-part-2": [
    "Desktop",
    "Left Mouse Button = Click objects to interact and guide Adam.",
    "Mobile",
    "Tap = Interact with objects and guide Adam."
  ],
  "adam-and-eve-6": [
    "Desktop",
    "Left Click = Interact with objects and solve puzzles.",
    "Mobile",
    "Tap = Interact with items and the environment."
  ],
  "adam-and-eve-7": [
    "Desktop",
    "Left Mouse Button = Click on characters, environments, and objects to trigger actions, solve puzzles, and guide Adam forward.",
    "Mobile",
    "Tap = Press on characters, environments, and objects to interact with them and progress through each scene."
  ],
  "adventure-drivers": [
    "Desktop",
    "Up Arrow (↑) = Accelerate and drive forward.",
    "Down Arrow (↓) = Reverse and drive backward.",
    "Left Arrow (←) = Tilt the vehicle backward or flip backward.",
    "Right Arrow (→) = Tilt the vehicle forward or flip forward.",
    "W = Accelerate and drive forward.",
    "A = Tilt the vehicle backward or flip backward.",
    "S = Reverse and drive backward.",
    "D = Tilt the vehicle forward or flip forward.",
    "Space = Activate the nitro boost.",
    "Enter = Use weapons or active gadgets.",
    "Left Click = Navigate menus and select in-game buttons."
  ],
  "agar-io": [
    "Desktop",
    "Mouse Movement = Move and guide the direction of your cell.",
    "Scroll Wheel Up = Zoom in.",
    "Scroll Wheel Down = Zoom out.",
    "Spacebar = Split your cell evenly into two pieces.",
    "W = Eject a small amount of mass from your cell."
  ],
  "agarpaper-io": [
    "Desktop",
    "Mouse Movement = Guide and navigate your creature across the arena.",
    "W = Eject mass to communicate or trigger strategic items.",
    "Space = Divide your creature into halves to launch forward or accelerate."
  ],
  "age-of-war": [
    "Desktop",
    "Left Click = Select units, build turrets, upgrade units, purchase turrets, evolve ages, and activate special abilities.",
    "Mouse Movement = Hover over units and turrets to view their information and costs."
  ],
  "air-hockey-championship-deluxe": [
    "Desktop",
    "Mouse Movement = Move the paddle in single-player mode.",
    "W = Move the Player 1 paddle upward.",
    "A = Move the Player 1 paddle left.",
    "S = Move the Player 1 paddle downward.",
    "D = Move the Player 1 paddle right.",
    "Up Arrow (↑) = Move the Player 2 paddle upward.",
    "Down Arrow (↓) = Move the Player 2 paddle downward.",
    "Left Arrow (←) = Move the Player 2 paddle left.",
    "Right Arrow (→) = Move the Player 2 paddle right."
  ],
  "alien-hominid": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "A = Jump.",
    "S = Shoot or perform a melee attack.",
    "Down Arrow (↓) = Duck, slide, or dig.",
    "S + Up Arrow (↑) = Shoot upward.",
    "Shift = Roll or dig (context-dependent).",
    "Spacebar = Throw a grenade."
  ],
  "amazing-rope-vice-spider-vegas": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "T = Open the nearby garage.",
    "Q = Shoot a web.",
    "Right Mouse Button = Use the laser.",
    "Left Mouse Button = Attack or shoot.",
    "Spacebar = Jump.",
    "Left Shift = Run.",
    "X = Switch weapons.",
    "F = Enter or open a vehicle.",
    "R = Open the nearby shop.",
    "G = Throw a grenade.",
    "Z = Change the grenade type.",
    "C = Change the vehicle camera view.",
    "Garbage Truck Controls",
    "Z = Raise the pitchfork.",
    "X = Lower the pitchfork.",
    "Q = Start dumping.",
    "E = Stop dumping.",
    "Spacebar = Lift the container."
  ],
  "amidst-the-sky": [
    "Desktop",
    "Up Arrow (↑) = Move upward, jump, or interact.",
    "Down Arrow (↓) = Move downward or interact.",
    "Left Arrow (←) = Move left or interact.",
    "Right Arrow (→) = Move right or interact.",
    "W = Move upward, jump, or interact.",
    "A = Move left or interact.",
    "S = Move downward or interact.",
    "D = Move right or interact.",
    "P = Pause the game.",
    "M = Mute the audio.",
    "R = Restart the game from the most recent checkpoint.",
    "Shift = Activate unlockable item 1.",
    "K = Activate unlockable item 1.",
    "G = Activate unlockable item 1.",
    "V = Activate unlockable item 1.",
    "C = Activate unlockable item 2.",
    "J = Activate unlockable item 2.",
    "Alt = Activate unlockable item 2.",
    "F = Activate unlockable item 2.",
    "Ctrl = Activate unlockable item 2."
  ],
  "among-us": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "E = Use, vent, or sabotage.",
    "Spacebar = Use, vent, or sabotage.",
    "R = Report a body.",
    "Q = Kill.",
    "Tab = Open the map.",
    "Esc = Close the map or menus.",
    "Left Mouse Button = Interact with menus, interface elements, and tasks, or move when using the mouse-only control style."
  ],
  "angry-birds": [
    "Desktop",
    "Left Click = Pull back the slingshot.",
    "Left Click = Release to launch the bird.",
    "Left Click = Activate the bird's ability during flight.",
    "R = Restart the level."
  ],
  "angry-gran-run": [
    "Desktop",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Slide.",
    "Left Arrow (←) = Turn corners left.",
    "Right Arrow (→) = Turn corners right.",
    "A = Move left.",
    "D = Move right."
  ],
  "ape-sling": [
    "Desktop",
    "Mouse Movement = Aim and choose the launch direction.",
    "Left Click = Launch Bongo from the trampoline.",
    "Drag = Adjust the angle and power of your jump.",
    "Hold & Release = Launch Bongo with the desired power.",
    "Mobile",
    "Tap = Launch Bongo from the trampoline.",
    "Drag = Aim and adjust the angle and power of your jump.",
    "Hold & Release = Launch Bongo with the desired power."
  ],
  "apple-shooter": [
    "Desktop",
    "Left Click = Hold and drag to adjust the angle and power of the shot.",
    "Left Click = Release to shoot the arrow."
  ],
  "apple-worm": [
    "Desktop",
    "W = Move the worm upward.",
    "A = Move the worm left.",
    "S = Move the worm downward.",
    "D = Move the worm right.",
    "Up Arrow (↑) = Move the worm upward.",
    "Down Arrow (↓) = Move the worm downward.",
    "Left Arrow (←) = Move the worm left.",
    "Right Arrow (→) = Move the worm right.",
    "R = Restart the active level.",
    "Mobile",
    "Tap = Use the on-screen directional buttons to change directions and navigate.",
    "Tap = Press the retry button to restart the current level."
  ],
  "aqua-thrills": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Space Bar = Smash opponents."
  ],
  "aquapark-io": [
    "Desktop",
    "A = Steer left.",
    "D = Steer right.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Left Click = Hold and drag left or right to navigate.",
    "Mobile",
    "Drag = Hold and drag to steer your character across the water slide."
  ],
  "arcane-archer": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Auto Fire = Fire arrows automatically while standing still.",
    "Pause / Settings = Adjust the audio and quality settings, if available.",
    "Mobile",
    "Drag = Move your archer.",
    "Release Touch = Fire arrows.",
    "Pause / Settings = Adjust the audio and quality settings, if available."
  ],
  "archery-world-tour": [
    "Desktop",
    "Left Click = Click and hold to draw the bow.",
    "Mouse Movement = Aim.",
    "Left Click = Release to shoot the arrow.",
    "Mobile",
    "Tap = Touch and hold to draw the bow.",
    "Drag = Aim.",
    "Tap = Lift your finger to release the arrow."
  ],
  "arena-noob-vs-pro": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Shoot."
  ],
  "arithmetica": [
    "Desktop",
    "Left Mouse Button = Click the correct number to solve the math equation.",
    "Mobile",
    "Tap = Select the correct number answer."
  ],
  "arras-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "E = Toggle continuous automatic primary weapon fire.",
    "C = Toggle automatic turret spinning.",
    "R = Toggle the AI drone targeting override.",
    "N = Skip to the next combat level.",
    "M = Maximize your current character attributes.",
    "V = Invert the tank's facing direction.",
    "T = Open the class upgrade map.",
    "O = Self-destruct your vehicle during invincibility.",
    "B = Swap the primary and secondary mouse button functions.",
    "Space = Fire the primary weapon.",
    "Shift = Use the secondary fire or repel drones.",
    "Mouse Movement = Aim weapons and utility systems.",
    "Left Click = Fire the primary weapon or send drones toward the cursor.",
    "Right Click = Repel drones, control scope cameras, or fire auxiliary weapons.",
    "Mobile",
    "Drag = Use the left touch stick to move the tank.",
    "Drag = Use the right touch stick to aim and fire weapons."
  ],
  "aspiring-artist": [
    "Desktop",
    "Left Mouse Button = Select canvas options, buy upgrades, interact with menu items, and navigate the game interface."
  ],
  "athletics-hero": [
    "Desktop",
    "Left Click = Interact, build momentum, and time your actions during each event.",
    "Mobile",
    "Tap = Control your athlete and execute movements."
  ],
  "awesome-tanks": [
    "Desktop",
    "W = Move the tank forward.",
    "A = Move the tank left.",
    "S = Reverse the tank.",
    "D = Move the tank right.",
    "Up Arrow (↑) = Move the tank forward.",
    "Down Arrow (↓) = Reverse the tank.",
    "Left Arrow (←) = Move the tank left.",
    "Right Arrow (→) = Move the tank right.",
    "Mouse Movement = Aim the turret.",
    "Left Click = Fire.",
    "1–8 = Select weapons.",
    "Mobile",
    "Drag (Left Side) = Move the tank using the virtual joystick.",
    "Drag (Right Side) = Aim and fire using the virtual joystick."
  ],
  "awesome-tanks-2": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "R = Drop mines.",
    "Space = Switch weapons.",
    "1 = Switch weapons.",
    "2 = Switch weapons.",
    "3 = Switch weapons.",
    "4 = Switch weapons.",
    "5 = Switch weapons.",
    "6 = Switch weapons.",
    "7 = Switch weapons.",
    "8 = Switch weapons.",
    "9 = Switch weapons.",
    "Scroll Wheel = Switch weapons.",
    "Mouse Movement = Aim.",
    "Left Click = Shoot."
  ],
  "axis-football-league": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Spacebar = Speed boost, kick, or snap the ball.",
    "Left Mouse Button = Change or switch players, or pass when on offense."
  ],
  "b-cubed": [
    "Desktop",
    "W = Move the cube upward.",
    "A = Move the cube left.",
    "S = Move the cube downward.",
    "D = Move the cube right.",
    "Up Arrow (↑) = Move the cube upward.",
    "Down Arrow (↓) = Move the cube downward.",
    "Left Arrow (←) = Move the cube left.",
    "Right Arrow (→) = Move the cube right.",
    "Mobile",
    "Swipe Up = Move the cube upward.",
    "Swipe Down = Move the cube downward.",
    "Swipe Left = Move the cube left.",
    "Swipe Right = Move the cube right."
  ],
  "backflipper": [
    "Desktop",
    "Left Click = Click and hold to charge the jump power.",
    "Left Click = Release to jump and perform a backflip.",
    "Left Click = Hold or click again while airborne to control rotation speed or stabilize the landing.",
    "Mobile",
    "Tap = Press and hold to build up jump power.",
    "Tap = Release your finger to launch into the air.",
    "Tap = Tap or hold while airborne to control rotation and prepare for a feet-first landing."
  ],
  "backrooms": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Shift = Run.",
    "R = Use the flashlight.",
    "Mouse Movement = Look around and control the camera."
  ],
  "backrooms-2d": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Space = Interact with objects.",
    "Esc = Pause the game.",
    "Shift = Sprint.",
    "Mobile",
    "Swipe Up = Move upward.",
    "Swipe Down = Move downward.",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Tap = Interact with objects."
  ],
  "bacon-may-die": [
    "Desktop",
    "Player 1",
    "Up Arrow (↑) = Move upward and fight.",
    "Down Arrow (↓) = Move downward and fight.",
    "Left Arrow (←) = Move left and fight. Hold to shoot.",
    "Right Arrow (→) = Move right and fight. Hold to shoot.",
    "Player 2",
    "W = Move upward and fight.",
    "A = Move left and fight. Hold to shoot.",
    "S = Move downward and fight.",
    "D = Move right and fight. Hold to shoot."
  ],
  "bad-egg": [
    "Desktop",
    "Left Click = Click and drag to move the player.",
    "Up Arrow (↑) = Increase power.",
    "Down Arrow (↓) = Decrease power.",
    "Left Arrow (←) = Change the angle to the left.",
    "Right Arrow (→) = Change the angle to the right.",
    "A = Move left.",
    "D = Move right.",
    "W = Jump.",
    "Space = Shoot."
  ],
  "bad-ice-cream": [
    "Desktop",
    "Single Player",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Create or break ice.",
    "F = Create or break ice.",
    "Two Players",
    "Player 1",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "F = Create or break ice.",
    "Player 2",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Create or break ice."
  ],
  "bad-ice-cream-2": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Space = Create or break ice.",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "F = Create or break ice.",
    "Enter = Confirm selections.",
    "Left Click = Confirm selections."
  ],
  "bad-ice-cream-3": [
    "Desktop",
    "Player 1",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Freeze or break ice.",
    "Player 2",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Q = Freeze or break ice."
  ],
  "bad-monday-simulator": [
    "Desktop",
    "Up Arrow (↑) = Move your SOUL upward.",
    "Down Arrow (↓) = Move your SOUL downward.",
    "Left Arrow (←) = Move your SOUL left.",
    "Right Arrow (→) = Move your SOUL right."
  ],
  "baldis-basics": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Left Shift = Run.",
    "Spacebar = Look behind or jump (depending on the version or mode).",
    "E = Interact.",
    "Q = Use an item.",
    "1 = Select inventory item 1.",
    "2 = Select inventory item 2.",
    "3 = Select inventory item 3.",
    "4 = Select inventory item 4.",
    "5 = Select inventory item 5.",
    "Esc = Pause the game.",
    "Mouse Movement = Look around.",
    "Left Mouse Button = Interact.",
    "Right Mouse Button = Use an item.",
    "Scroll Wheel Up = Cycle to the previous inventory item.",
    "Scroll Wheel Down = Cycle to the next inventory item."
  ],
  "baldis-basics-field-trip": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Mouse Movement = Look around.",
    "Shift = Sprint.",
    "Left Click = Interact with or pick up items.",
    "R = Discard or drop logs.",
    "Esc = Hold for 1 second to close the game or exit."
  ],
  "ball-sort-halloween": [
    "Desktop",
    "Left Mouse Button = Select and move balls.",
    "Mobile",
    "Tap = Select and move balls."
  ],
  "ball-sort-soccer": [
    "Desktop",
    "Left Click = Select a tube to pick up or place a ball.",
    "Mobile",
    "Tap = Select a tube to pick up or place a ball."
  ],
  "ballistic": [
    "Desktop",
    "Left Mouse Button (Hold) = Aim the launch trajectory.",
    "Left Mouse Button (Release) = Fire the balls.",
    "Mobile",
    "Drag = Aim the launch trajectory.",
    "Release Touch = Fire the balls."
  ],
  "bank-robbery-2": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Left Click = Shoot.",
    "Right Click = Aim (iron sight).",
    "Scroll Wheel = Switch weapons.",
    "1–7 = Switch weapons.",
    "Left Shift = Run.",
    "C = Crouch.",
    "E = Interact."
  ],
  "basket-and-ball": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Space = Bounce down, launch the ball, or use time stopping in the shootout challenge.",
    "Enter = Use the time stop bonus.",
    "Esc = Skip level previews, pause the game, navigate back in menus, or quit the game from the Main Menu.",
    "Mobile",
    "Drag = Move left and right using the virtual joystick.",
    "Tap = Bounce down, launch the ball, or use on-screen bonus buttons."
  ],
  "basket-battle": [
    "Desktop",
    "Left Mouse Button = Aim, shoot, and defend (block).",
    "Mouse Movement = Move the character and adjust the shot trajectory."
  ],
  "basket-bros-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "D = Move right.",
    "G = Shoot or perform an action.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "L = Shoot or perform an action."
  ],
  "basket-champs": [
    "Desktop",
    "Left Mouse Button (Hold) = Charge power.",
    "Mouse Movement = Adjust the aim.",
    "Left Mouse Button (Release) = Shoot.",
    "Pause Button = Open the pause menu.",
    "Sound Button = Access the audio settings.",
    "Mobile",
    "Tap and Hold = Set power.",
    "Drag = Adjust the aim.",
    "Release Touch = Throw.",
    "Pause Button = Open the pause menu.",
    "Sound Button = Access the audio settings."
  ],
  "basket-monsterz": [
    "Desktop",
    "Mouse Movement = Aim.",
    "Left Click = Release the ball."
  ],
  "basket-random": [
    "Desktop",
    "W = Control Player 1.",
    "Up Arrow (↑) = Control Player 2.",
    "Left Mouse Button = Alternative control option.",
    "Mobile",
    "Tap (Left Side) = Control Player 1.",
    "Tap (Right Side) = Control Player 2."
  ],
  "basket-slam-dunk-2": [
    "Desktop",
    "Left Click = Jump and perform actions.",
    "Mobile",
    "Tap = Jump and perform actions."
  ],
  "basket-swooshes": [
    "Desktop",
    "Mouse Movement = Aim.",
    "Left Mouse Button = Shoot.",
    "Mobile",
    "Drag = Aim.",
    "Release Touch = Shoot."
  ],
  "basket-swooshes-plus": [
    "Desktop",
    "Left Click = Drag to aim the basketball.",
    "Left Click = Release to shoot.",
    "Mobile",
    "Drag = Aim the shot.",
    "Release Finger = Throw the basketball."
  ],
  "basketball-clash": [
    "Mobile",
    "Swipe Left = Aim left.",
    "Swipe Right = Aim right.",
    "Swipe Up = Shoot."
  ],
  "basketball-frvr": [
    "Desktop",
    "Left Click = Click and drag to aim the basketball and adjust the shot trajectory.",
    "Left Click = Release to shoot the ball toward the hoop.",
    "Mobile",
    "Drag = Aim the basketball and adjust the shot trajectory.",
    "Release Finger = Lift your finger from the screen to shoot the ball."
  ],
  "basketball-io": [
    "Desktop",
    "Up Arrow (↑) = Move the player upward.",
    "Down Arrow (↓) = Move the player downward.",
    "Left Arrow (←) = Move the player left.",
    "Right Arrow (→) = Move the player right.",
    "W = Move the player upward.",
    "A = Move the player left.",
    "S = Move the player downward.",
    "D = Move the player right.",
    "Left Click = Click and drag to control movement and shot direction."
  ],
  "basketball-king": [
    "Mobile",
    "Tap and Hold = Select the ball.",
    "Swipe = Shoot toward the basket (hoop)."
  ],
  "basketball-league": [
    "Desktop",
    "Mouse Movement = Aim.",
    "Left Click = Shoot."
  ],
  "basketball-legends-2020": [
    "Desktop",
    "Player 1",
    "W = Move upward and jump.",
    "A = Move left and jump.",
    "S = Move downward and jump.",
    "D = Move right and jump.",
    "B = Shoot or perform an action.",
    "S = Pump or block.",
    "V = Perform a supershot.",
    "D (Double Tap) = Dash.",
    "Player 2",
    "Up Arrow (↑) = Move upward and jump.",
    "Down Arrow (↓) = Move downward and jump.",
    "Left Arrow (←) = Move left and jump.",
    "Right Arrow (→) = Move right and jump.",
    "L = Shoot or perform an action.",
    "Down Arrow (↓) = Pump or block.",
    "K = Perform a supershot.",
    "Left Arrow (←) (Double Tap) = Dash."
  ],
  "basketball-line": [
    "Desktop",
    "Left Click = Click and hold to draw.",
    "Left Click = Release to stop drawing.",
    "Mobile",
    "Drag = Draw lines.",
    "Release Finger = Stop drawing."
  ],
  "basketball-orbit": [
    "Desktop",
    "Left Mouse Button = Aim and shoot the basketball.",
    "Mobile",
    "Tap = Control the direction and shooting power.",
    "Swipe = Control the direction and shooting power."
  ],
  "basketball-serial-shooter": [
    "Desktop",
    "Left Click = Drag to aim your shot.",
    "Left Click = Release to shoot the ball.",
    "Mobile",
    "Swipe Up = Aim and shoot the ball.",
    "Swipe Down = Aim and shoot the ball.",
    "Swipe Left = Aim and shoot the ball.",
    "Swipe Right = Aim and shoot the ball."
  ],
  "basketball-skills": [
    "Desktop",
    "Left Mouse Button (Hold) = Aim and adjust the shooting power.",
    "Left Mouse Button (Release) = Shoot the basketball toward the hoop."
  ],
  "basketball-slam-dunk": [
    "Desktop",
    "Player 1",
    "W = Move upward / Jump.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "B = Shoot / Dunk.",
    "Player 2",
    "Up Arrow (↑) = Move upward / Jump.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "L = Shoot / Dunk."
  ],
  "basketball-stars": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "A = Move left.",
    "D = Move right.",
    "Up Arrow (↑) = Jump / Shoot.",
    "W = Jump / Shoot.",
    "Down Arrow (↓) = Pump / Block.",
    "S = Pump / Block.",
    "Double-tap Left Arrow (←) = Dash left.",
    "Double-tap Right Arrow (→) = Dash right.",
    "Double-tap A = Dash left.",
    "Double-tap D = Dash right.",
    "X = Steal.",
    "L = Steal.",
    "Z = Supershot.",
    "K = Supershot.",
    "Mobile",
    "Tap = Move and perform actions like shooting and blocking.",
    "Swipe Up = Dribble and perform specialized moves.",
    "Swipe Down = Dribble and perform specialized moves.",
    "Swipe Left = Dribble and perform specialized moves.",
    "Swipe Right = Dribble and perform specialized moves."
  ],
  "basketball-superstars": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Shoot, block, or contest shots.",
    "Hold Spacebar = Power up shots and dunks.",
    "Mobile",
    "Virtual Joystick = Move your player.",
    "Shoot Button = Shoot or perform dunks near the rim.",
    "Steal Button = Steal the ball.",
    "Block Button = Block shots."
  ],
  "battle-wheels": [
    "Desktop",
    "Single Player",
    "Use the assigned left and right action keys displayed in-game to move and flip your vehicle.",
    "Player 1",
    "A = Move and flip your vehicle.",
    "D = Move and flip your vehicle.",
    "Player 2",
    "Left Arrow (←) = Move and flip your vehicle.",
    "Right Arrow (→) = Move and flip your vehicle.",
    "Mobile",
    "Tap Left Button = Move and flip your vehicle.",
    "Tap Right Button = Move and flip your vehicle."
  ],
  "battledudes-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space = Jump / Drift (when in vehicles).",
    "Shift = Sprint.",
    "R = Reload.",
    "G = Throw a grenade.",
    "E = Enter / Exit vehicles.",
    "1 = Switch weapon.",
    "2 = Switch weapon.",
    "3 = Switch weapon.",
    "4 = Switch weapon.",
    "M = Enlarge the map.",
    "Tab = Enlarge the map.",
    "Left Click = Shoot.",
    "Right Click = Open the emoji wheel / Perform the secondary action.",
    "Scroll Wheel = Switch weapons."
  ],
  "bearsus": [
    "Desktop",
    "A = Move or short hop left.",
    "D = Move or short hop right.",
    "Left Arrow (←) = Move or short hop left.",
    "Right Arrow (→) = Move or short hop right.",
    "Double-tap A = Attack 1.",
    "Double-tap Left Arrow (←) = Attack 1.",
    "Double-tap D = Attack 2.",
    "Double-tap Right Arrow (→) = Attack 2.",
    "Press A then D (or D then A) = Double jump.",
    "Press Left Arrow (←) then Right Arrow (→) (or vice versa) = Double jump.",
    "Press any movement key while double-jumping = Attack 3 (mid-air attack)."
  ],
  "betrayal-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "E = Interact with objects or tasks.",
    "Space = Use actions.",
    "M = Open the map.",
    "Esc = Close the open interface."
  ],
  "bicycle-stunts-3d": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake / Reverse.",
    "Down Arrow (↓) = Brake / Reverse.",
    "A = Tilt / Lean left.",
    "Left Arrow (←) = Tilt / Lean left.",
    "D = Tilt / Lean right.",
    "Right Arrow (→) = Tilt / Lean right.",
    "Space = Jump / Nitro (if applicable)."
  ],
  "big-shot-boxing": [
    "Desktop",
    "Right Arrow (→) = Jab.",
    "Left Arrow (←) = Cross.",
    "X = Uppercut.",
    "Z = Block.",
    "Left Click = Navigate menus and upgrades."
  ],
  "big-tall-small": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward or switch characters.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Switch characters.",
    "Enter = Switch characters.",
    "R = Restart the level.",
    "Esc = Go back.",
    "B = Go back."
  ],
  "big-tower-tiny-square": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Space = Jump.",
    "W = Jump.",
    "Up Arrow (↑) = Jump.",
    "Z = Jump.",
    "R = Respawn at the checkpoint.",
    "Mobile",
    "Tap Left Button = Move left.",
    "Tap Right Button = Move right.",
    "Tap Jump Button = Jump."
  ],
  "bike-trials-offroad-1": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake / Reverse.",
    "Down Arrow (↓) = Brake / Reverse.",
    "A = Lean backward / Balance.",
    "Left Arrow (←) = Lean backward / Balance.",
    "D = Lean forward / Balance.",
    "Right Arrow (→) = Lean forward / Balance.",
    "Space = Jump.",
    "R = Restart the level.",
    "Esc = Pause.",
    "P = Pause."
  ],
  "bike-trials-winter-1": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake / Reverse.",
    "Down Arrow (↓) = Brake / Reverse.",
    "A = Tilt / Lean left.",
    "Left Arrow (←) = Tilt / Lean left.",
    "D = Tilt / Lean right.",
    "Right Arrow (→) = Tilt / Lean right.",
    "Space = Jump."
  ],
  "bike-trials-winter-2": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake / Reverse.",
    "Down Arrow (↓) = Brake / Reverse.",
    "A = Lean backward.",
    "Left Arrow (←) = Lean backward.",
    "D = Lean forward.",
    "Right Arrow (→) = Lean forward.",
    "Mobile",
    "Right Side of Screen = Accelerate.",
    "Left Side of Screen = Brake / Reverse.",
    "Tilt Device Left = Lean backward.",
    "Tilt Device Right = Lean forward."
  ],
  "biker-street": [
    "Desktop",
    "W = Accelerate.",
    "A = Lean left.",
    "S = Brake / Reverse.",
    "D = Lean right.",
    "Up Arrow (↑) = Accelerate.",
    "Left Arrow (←) = Lean left.",
    "Down Arrow (↓) = Brake / Reverse.",
    "Right Arrow (→) = Lean right."
  ],
  "bitlife": [
    "Mobile",
    "Tap = Select options, make decisions, and interact with the interface.",
    "Tap the \"Age\" Button = Advance your character's life by one year.",
    "On-Screen Buttons = Navigate menus, activities, and life events."
  ],
  "block-blast": [
    "Desktop",
    "Left Click + Drag = Select, move, and place block shapes onto the grid.",
    "Mobile",
    "Drag = Select, move, and place block shapes onto the grid."
  ],
  "block-tanks": [
    "Desktop",
    "W = Move the tank forward.",
    "A = Move the tank left.",
    "S = Move the tank backward.",
    "D = Move the tank right.",
    "Mouse Movement = Aim and shoot.",
    "Q = Change weapons (configurable in settings).",
    "E = Change weapons (configurable in settings).",
    "Number Keys = Change weapons (configurable in settings)."
  ],
  "block-the-pig": [
    "Desktop",
    "Left Click = Place a block on an empty tile.",
    "Mobile",
    "Tap = Place a block on an empty tile."
  ],
  "block-world": [
    "Desktop",
    "Left Click = Click and drag to connect letters.",
    "Mobile",
    "Touch and Swipe = Drag your finger across the screen to trace and connect letters."
  ],
  "blockpost": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space = Jump.",
    "Shift = Run or sprint.",
    "R = Reload weapon.",
    "C = Crouch.",
    "1 = Switch to weapon 1.",
    "2 = Switch to weapon 2.",
    "3 = Switch to weapon 3.",
    "Tab = View the scoreboard.",
    "Esc = Open the menu or pause options.",
    "Mouse Movement = Aim and look around.",
    "Left Click = Shoot weapon.",
    "Right Click = Aim down sights."
  ],
  "blocky-cars": [
    "Desktop",
    "W = Drive forward / Move upward.",
    "A = Steer left / Move left.",
    "S = Reverse / Move downward.",
    "D = Steer right / Move right.",
    "Space = Jump (in Hero Mode).",
    "Left Click = Shoot / Primary attack.",
    "Right Click = Aim / Secondary attack.",
    "E = Interact (Repair, enter, or exit vehicles).",
    "C = Change the camera view.",
    "1 = Select weapon.",
    "2 = Select weapon.",
    "3 = Select weapon.",
    "4 = Select weapon.",
    "5 = Select weapon.",
    "R = Respawn.",
    "T = Open chat.",
    "Tab = Open the menu."
  ],
  "blocky-snakes": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake.",
    "Left Arrow (←) = Balance the motorcycle by leaning left.",
    "Right Arrow (→) = Balance the motorcycle by leaning right.",
    "W = Accelerate.",
    "S = Brake.",
    "A = Balance the motorcycle by leaning left.",
    "D = Balance the motorcycle by leaning right.",
    "Space = Boost speed.",
    "Mobile",
    "Swipe Up = Move upward.",
    "Swipe Down = Move downward.",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Tap = Boost speed."
  ],
  "blocky-trials": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake.",
    "Left Arrow (←) = Lean backward / Balance the motorcycle.",
    "Right Arrow (→) = Lean forward / Balance the motorcycle.",
    "Space = Apply the handbrake.",
    "W = Perform a wheelie (unlockable)."
  ],
  "bloons-td-battles-2": [
    "Desktop",
    "1 = Select Monkey Tower 1.",
    "2 = Select Monkey Tower 2.",
    "3 = Select Monkey Tower 3.",
    "4 = Select Monkey Tower 4.",
    "< = Upgrade the left path.",
    "> = Upgrade the right path.",
    "Tab = Change tower targeting.",
    "Backspace = Sell the selected tower.",
    "Esc = Open the settings or pause menu.",
    "Left Click = Select, place, and upgrade towers; interact with the UI.",
    "Right Click = Perform secondary interactions or cancel tower placement.",
    "Scroll Wheel = Perform secondary interactions or cancel tower placement.",
    "Mobile",
    "Tap = Select, place, or upgrade towers; navigate menus.",
    "Drag = Move and place towers.",
    "Pinch = Zoom the map.",
    "Drag with two fingers = Pan around the map."
  ],
  "bloons-tower-defense-1": [
    "Desktop",
    "Left Click = Select a tower from the menu.",
    "Left Click = Place the selected tower on the track.",
    "Left Click = Open the upgrade menu for a placed tower.",
    "Left Click = Purchase available upgrades for the selected tower.",
    "Mobile",
    "Tap = Select a tower from the menu.",
    "Tap = Place the selected tower on the track.",
    "Tap = Open the upgrade menu for a placed tower.",
    "Tap = Purchase available upgrades for the selected tower."
  ],
  "bloons-tower-defense-4": [
    "Desktop",
    "W = Select the assigned tower or item.",
    "E = Select the assigned tower or item.",
    "R = Select the assigned tower or item.",
    "T = Select the assigned tower or item.",
    "U = Select the assigned tower or item.",
    "I = Select the assigned tower or item.",
    "P = Select the assigned tower or item.",
    "A = Select the assigned tower or item.",
    "S = Select the assigned tower or item.",
    "D = Select the assigned tower or item.",
    "F = Select the assigned tower or item.",
    "G = Select the assigned tower or item.",
    "K = Select the assigned tower or item.",
    "B = Select the assigned tower or item.",
    "N = Select the assigned tower or item.",
    "M = Select the assigned tower or item.",
    "Backspace = Sell the selected tower.",
    "Esc = Deselect the selected tower.",
    "Left Click = Select towers, place defenses, and purchase upgrades.",
    "Right Click = Cancel tower placement."
  ],
  "bloxd-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space = Jump / Fly up.",
    "Shift = Run / Sprint.",
    "C = Crouch / Fly down.",
    "Z = Crouch / Fly down.",
    "Ctrl = Crouch / Fly down.",
    "Caps Lock = Crouch / Fly down.",
    "T = Open chat.",
    "Enter = Open chat.",
    "B = Open the utility/shop menu.",
    "O = Open the menu/settings.",
    "Esc = Open the menu/settings.",
    "Tab = Open the inventory.",
    "Q = Drop the selected item.",
    "1 = Switch to hotbar item 1.",
    "2 = Switch to hotbar item 2.",
    "3 = Switch to hotbar item 3.",
    "4 = Switch to hotbar item 4.",
    "5 = Switch to hotbar item 5.",
    "6 = Switch to hotbar item 6.",
    "7 = Switch to hotbar item 7.",
    "8 = Switch to hotbar item 8.",
    "9 = Switch to hotbar item 9.",
    "0 = Switch to hotbar item 0.",
    "P = Change the camera view.",
    "N = Open the skin changer.",
    "V = Zoom in.",
    "G = View the players list.",
    "/ (Forward Slash) = Start a command.",
    "Mouse Movement = Look around.",
    "Left Click = Mine, attack, interact, or remove placed blocks.",
    "Right Click = Place blocks, interact, or aim down sights (with guns).",
    "Scroll Wheel = Switch hotbar items or zoom the perspective.",
    "Middle Click = Select an item in Creative mode or switch blocks."
  ],
  "bloxorz": [
    "Desktop",
    "Up Arrow (↑) = Roll the block upward.",
    "Down Arrow (↓) = Roll the block downward.",
    "Left Arrow (←) = Roll the block left.",
    "Right Arrow (→) = Roll the block right.",
    "Spacebar = Toggle between individual blocks (when the block is split into two)."
  ],
  "blumgi-ball": [
    "Desktop",
    "Left Click + Drag + Release = Aim and shoot.",
    "Space = Teleport to the ball."
  ],
  "blumgi-bloom": [
    "Desktop",
    "Left Click = Click and drag to cut ropes.",
    "Drag = Cut ropes.",
    "Mobile",
    "Swipe = Cut ropes.",
    "Tap = Use on-screen buttons to pause, restart, or toggle sound."
  ],
  "blumgi-castle": [
    "Desktop",
    "A = Aim (Single Player) or shoot (Multiplayer).",
    "D = Aim.",
    "Left Arrow (←) = Aim.",
    "Right Arrow (→) = Aim.",
    "Space = Hold and release to shoot, or shoot in Multiplayer.",
    "E = Aim.",
    "R = Aim."
  ],
  "blumgi-paintball": [
    "Desktop",
    "W = Move upward / Jump.",
    "A = Move left.",
    "D = Move right.",
    "Up Arrow (↑) = Jump.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Space = Shoot / Use action.",
    "S = Shoot / Use action.",
    "Down Arrow (↓) = Shoot / Use action."
  ],
  "blumgi-rocket": [
    "Desktop",
    "W = Drive forward.",
    "S = Drive backward.",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Drive backward.",
    "Space = Activate rocket boost.",
    "D = Activate rocket boost (alternative)."
  ],
  "blumgi-slime": [
    "Desktop",
    "Spacebar = Charge and release to jump.",
    "Left Click = Charge and release to jump.",
    "A = Character 1 jump (2-Player mode).",
    "M = Character 2 jump (2-Player mode).",
    "Mobile",
    "Tap and Hold = Charge and release to jump."
  ],
  "blumgi-soccer": [
    "Desktop",
    "Left Arrow (←) = Adjust aim.",
    "Right Arrow (→) = Adjust aim.",
    "Space = Shoot.",
    "Left Click + Hold = Aim and set power.",
    "Left Click Release = Shoot.",
    "Mobile",
    "Tap + Hold = Aim and charge power.",
    "Release Finger = Shoot."
  ],
  "bob-the-robber-2": [
    "Desktop",
    "W = Use, interact, or collect loot.",
    "A = Move left.",
    "D = Move right.",
    "S = Hide in the shadows.",
    "Up Arrow (↑) = Use, interact, or collect loot.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Down Arrow (↓) = Hide in the shadows.",
    "Space = Punch or attack (when behind guards)."
  ],
  "bob-the-robber-4": [
    "Desktop",
    "W = Interact, look, or use a gadget.",
    "A = Move left.",
    "D = Move right.",
    "Up Arrow (↑) = Interact, look, or use a gadget.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Space = Knock out guards."
  ],
  "bomb-it-7": [
    "Desktop",
    "Player 1",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Place a bomb.",
    "Player 2",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Enter = Place a bomb."
  ],
  "booblehead-soccer-royale": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Space = Kick the ball.",
    "X = Perform a power kick."
  ],
  "bottle-flip-3d": [
    "Mobile",
    "Tap = Flip the bottle and navigate through the levels."
  ],
  "bouncy-basketball": [
    "Desktop",
    "Single Player",
    "Space = Jump or grab the ball.",
    "Release Space = Shoot or dunk.",
    "D = Jump or grab the ball.",
    "Release D = Shoot or dunk.",
    "Two Player",
    "Player 1",
    "D = Jump or grab the ball.",
    "Release D = Shoot or dunk.",
    "Player 2",
    "J = Jump or grab the ball.",
    "Release J = Shoot or dunk.",
    "Mobile",
    "Tap and Hold = Jump or grab the ball.",
    "Release = Shoot or dunk."
  ],
  "bouncy-dunk": [
    "Desktop",
    "Left Click + Drag = Move the paddle.",
    "Mobile",
    "Drag = Move the paddle.",
    "Release Touch = Stop moving the paddle."
  ],
  "bouncy-woods": [
    "Desktop",
    "Left Click + Drag = Aim.",
    "Left Click Release = Shoot / Fire the projectile.",
    "Mobile",
    "Drag = Aim.",
    "Release Finger = Shoot / Fire the projectile."
  ],
  "bowling-stars": [
    "Desktop",
    "Left Click = Control and throw the bowling ball.",
    "Mobile",
    "Tap = Control and throw the bowling ball."
  ],
  "boxing-physics-2": [
    "Desktop",
    "W = Player 1 action.",
    "Up Arrow (↑) = Player 2 action.",
    "Mobile",
    "Tap = Jump and punch."
  ],
  "boxing-random": [
    "Desktop",
    "Player 1",
    "W = Jump and punch.",
    "Player 2",
    "Up Arrow (↑) = Jump and punch."
  ],
  "boxing-stars": [
    "Desktop",
    "A = Perform a knockdown punch.",
    "S = Block attacks.",
    "D = Perform a knockback punch.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right."
  ],
  "boxrob": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Jump.",
    "Up Arrow (↑) = Jump.",
    "Left Click = Pick up or drop crates.",
    "Mobile",
    "On-screen Arrows = Move and jump.",
    "Tap = Pick up or drop crates."
  ],
  "boxrob2": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "W = Jump.",
    "Left Click = Pick up or drop boxes.",
    "Mobile",
    "Tap = Pick up or drop boxes."
  ],
  "boxrob3": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Jump.",
    "Up Arrow (↑) = Jump.",
    "Left Click = Pick up or release crates.",
    "Mobile",
    "On-Screen Buttons = Move and jump.",
    "Tap = Pick up or release crates."
  ],
  "braains-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Attack as a zombie."
  ],
  "brain-for-monster-truck": [
    "Desktop",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Mouse Movement = Draw paths."
  ],
  "brain-test-2-tricky-stories": [
    "Desktop",
    "Mouse Movement = Select, drag, and move objects around the screen.",
    "Left Click = Select and interact with objects.",
    "Drag = Move objects around the screen.",
    "Mobile",
    "Touch = Select, drag, and move objects around the screen."
  ],
  "brain-test-3-tricky-quests": [
    "Desktop",
    "Left Click = Click, drag, and interact with objects to solve puzzles.",
    "Mobile",
    "Tap = Select and interact with objects.",
    "Drag = Move items or solve puzzles that require dragging.",
    "Pinch = Use two-finger gestures in puzzles that specifically require them."
  ],
  "brain-test-tricky-puzzles": [
    "Desktop",
    "Mouse Movement = Select and interact with objects.",
    "Left Click = Click and drag objects.",
    "Mobile",
    "Tap = Select puzzle elements.",
    "Swipe = Move puzzle elements.",
    "Drag = Move puzzle elements."
  ],
  "breaking-the-bank": [
    "Desktop",
    "Left Click = Interact with objects and select actions."
  ],
  "bubble-pop-adventures": [
    "Desktop",
    "Mouse Movement = Aim the bubble shooter.",
    "Left Click = Shoot a bubble.",
    "Mobile",
    "Tap = Shoot a bubble."
  ],
  "bubble-shooter": [
    "Desktop",
    "Mouse Movement = Aim the bubble cannon.",
    "Left Click = Shoot the bubble.",
    "Mobile",
    "Drag = Move the aim.",
    "Lift Finger = Shoot the bubble."
  ],
  "bubble-trouble": [
    "Desktop",
    "Player 1",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Shoot.",
    "Player 2",
    "A = Move left.",
    "D = Move right.",
    "Q = Shoot.",
    "Gamepad",
    "Left Stick / D-Pad = Move.",
    "Action Button = Jump / Shoot (varies by platform implementation)."
  ],
  "bubble-trouble-3": [
    "Desktop",
    "Left Arrow (←) = Move left (Player 1).",
    "Right Arrow (→) = Move right (Player 1).",
    "Spacebar = Shoot (Player 1).",
    "A = Move left (Player 2).",
    "D = Move right (Player 2).",
    "Q = Shoot (Player 2)."
  ],
  "build-crush": [
    "Desktop",
    "- W = Move upward.",
    "- A = Move left.",
    "- S = Move downward.",
    "- D = Move right.",
    "- Space = Jump / Fly up.",
    "- Shift = Fly down.",
    "- F = Enter Free Flight Mode.",
    "- C = Load a random creation.",
    "- Left Click = Place blocks (Build Mode) / Select weapons (Crush Mode).",
    "- Right Click = Destroy blocks (Build Mode)."
  ],
  "bullet-force": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Spacebar = Jump.",
    "Shift = Sprint.",
    "C = Crouch.",
    "R = Reload.",
    "G = Throw grenade.",
    "F = Knife attack.",
    "E = Pick up weapon.",
    "2 = Switch weapon.",
    "Up Arrow (↑) = Activate killstreaks.",
    "Down Arrow (↓) = Activate killstreaks.",
    "Left Arrow (←) = Activate killstreaks.",
    "Right Arrow (→) = Activate killstreaks.",
    "Enter = Respawn.",
    "Tab = View scoreboard.",
    "P = Pause game.",
    "T = Chat.",
    "Mouse Movement = Aim and look around.",
    "Left Click = Shoot.",
    "Right Click = Aim down sights."
  ],
  "bullet-party-2": [
    "Desktop",
    "- W = Move upward.",
    "- A = Move left.",
    "- S = Move downward.",
    "- D = Move right.",
    "- Space = Jump.",
    "- Shift = Sprint.",
    "- C = Crouch.",
    "- R = Reload.",
    "- G = Throw a grenade.",
    "- F = Use knife.",
    "- E = Pick up weapon.",
    "- Tab = Open scoreboard.",
    "- T = Open chat.",
    "- P = Open pause menu.",
    "- Enter = Respawn.",
    "- Up Arrow (↑) = Use killstreak abilities.",
    "- Down Arrow (↓) = Use killstreak abilities.",
    "- Left Arrow (←) = Use killstreak abilities.",
    "- Right Arrow (→) = Use killstreak abilities.",
    "- 1 = Switch weapon.",
    "- 2 = Switch weapon.",
    "- Mouse Movement = Look and aim.",
    "- Left Click = Fire weapon.",
    "- Right Click = Aim.",
    "- Scroll Wheel = Switch weapons."
  ],
  "bumper-cars-soccer": [
    "Desktop",
    "W = Drive forward (Player 1).",
    "A = Steer left (Player 1).",
    "S = Reverse (Player 1).",
    "D = Steer right (Player 1).",
    "Up Arrow (↑) = Drive forward (Player 2).",
    "Down Arrow (↓) = Reverse (Player 2).",
    "Left Arrow (←) = Steer left (Player 2).",
    "Right Arrow (→) = Steer right (Player 2)."
  ],
  "bunny-hop": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space = Jump.",
    "Shift = Sprint / Walk (depending on game configuration).",
    "Esc = Open the pause menu.",
    "Mouse Movement = Look around and steer (essential for air-strafing/surfing).",
    "Left Click = Interact / Attack (in some modes).",
    "Gamepad",
    "Left Stick = Move.",
    "Right Stick = Look / Steer.",
    "A = Jump."
  ],
  "burger-bounty": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Left Click = Interact with menus, upgrades, and UI elements.",
    "Mobile",
    "Drag = Move the character.",
    "Tap = Interact with menus, upgrades, and UI elements."
  ],
  "burger-clicker": [
    "Desktop",
    "Left Click = Click the burger and purchase upgrades.",
    "Mobile",
    "Tap = Play the game on mobile devices."
  ],
  "burnin-rubber-5-xs": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Z = Fire the primary weapon.",
    "X = Fire the secondary weapon.",
    "Shift = Drift.",
    "Left Click = Fire the primary weapon.",
    "Right Click = Fire the secondary weapon."
  ],
  "burnout-drift-hilltop": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake or reverse.",
    "Down Arrow (↓) = Brake or reverse.",
    "A = Steer left.",
    "Left Arrow (←) = Steer left.",
    "D = Steer right.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Handbrake.",
    "Shift = Nitro boost.",
    "I = Start or stop the engine.",
    "L = Toggle the headlights.",
    "C = Change the camera view.",
    "Esc = Pause the game."
  ],
  "burnout-drift-seaport-max": [
    "Desktop",
    "W = Accelerate.",
    "A = Steer left.",
    "S = Brake or reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake or reverse.",
    "Space = Use the handbrake.",
    "C = Change the camera view.",
    "R = Reset the vehicle.",
    "Tab = Open the menu and tuning settings.",
    "Esc = Open the menu and tuning settings."
  ],
  "burrito-bison": [
    "Desktop",
    "Left Click = Launch (click and drag to set angle/power).",
    "Spacebar = Launch (click and drag to set angle/power).",
    "Left Click = Slam (activate during flight).",
    "Spacebar = Slam (activate during flight).",
    "Left Click = Activate special abilities (when the meter is full).",
    "Mobile",
    "Tap and Drag = Launch (drag on the slingshot).",
    "Tap = Slam (during flight).",
    "Tap = Activate special abilities (when the meter is full)."
  ],
  "burrito-bison-launcha-libre": [
    "Desktop",
    "Space Bar = Stomp (while airborne).",
    "Left Click = Stomp (while airborne).",
    "Left Click + Drag = Aim and set launch power.",
    "Mobile",
    "Drag = Aim and set launch power.",
    "Tap = Stomp (while airborne)."
  ],
  "bus-parking-3d": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake or reverse.",
    "Down Arrow (↓) = Brake or reverse.",
    "A = Steer left.",
    "Left Arrow (←) = Steer left.",
    "D = Steer right.",
    "Right Arrow (→) = Steer right.",
    "Space = Apply the handbrake.",
    "C = Change the camera view.",
    "Mobile",
    "Left side of the screen = Steer the vehicle.",
    "Right side of the screen = Accelerate, brake, or change the camera view."
  ],
  "candy-crush-saga": [
    "Desktop",
    "Left Click = Click and drag candies to swap them.",
    "Mouse Movement = Move candies in different directions to create matches.",
    "Drag = Move or combine special candies to activate their effects.",
    "Mobile",
    "Drag = Swipe candies to swap their positions.",
    "Touch Controls = Match candies and activate special candy effects using touch gestures.",
    "Drag = Combine special candies by swiping them together for stronger effects."
  ],
  "candy-jump": [
    "Desktop",
    "Left Click = Make the candy jump.",
    "Mobile",
    "Tap = Make the candy jump."
  ],
  "cannon-basketball": [
    "Desktop",
    "Mouse Movement = Aim the cannon.",
    "Left Click = Fire the cannon and launch a ball toward the basket.",
    "Left Click and Hold = Adjust shot power.",
    "Mobile",
    "Drag = Aim the cannon.",
    "Tap = Fire the cannon and launch a ball toward the basket."
  ],
  "cannon-basketball-2": [
    "Desktop",
    "Mouse Movement = Aim the cannon.",
    "Left Click = Shoot the basketball or interact with level mechanisms.",
    "Mobile",
    "Tap = Shoot the basketball or interact with level mechanisms."
  ],
  "cannon-basketball-3": [
    "Desktop",
    "Left Click + Drag = Aim the cannon.",
    "Left Click Release = Shoot.",
    "Drag farther from the cannon = Increase shot power.",
    "Drag to adjust the shooting angle.",
    "Mobile",
    "Drag = Aim the cannon.",
    "Release Touch or Tap the Fire Button = Shoot.",
    "Drag farther from the cannon = Increase shot power.",
    "Drag to adjust the shooting angle."
  ],
  "cannon-basketball-4": [
    "Desktop",
    "Mouse Movement = Aim the cannon.",
    "Left Click = Shoot the basketball.",
    "Mouse Distance from Cannon = Adjust shot power (farther distance increases power).",
    "Mobile",
    "Drag = Aim the cannon.",
    "Tap = Shoot the basketball."
  ],
  "cannon-strike": [
    "Desktop",
    "Left Click (Hold) = Aim.",
    "Left Click (Release) = Shoot.",
    "Mobile",
    "Drag = Aim.",
    "Lift your finger = Fire."
  ],
  "car-climb-racing": [
    "Desktop",
    "Right Arrow (→) = Accelerate.",
    "Left Arrow (←) = Brake or reverse.",
    "Up Arrow (↑) = Balance or tilt the vehicle forward in mid-air.",
    "Down Arrow (↓) = Balance or tilt the vehicle backward in mid-air.",
    "D = Accelerate.",
    "A = Brake or reverse."
  ],
  "car-drift-racers-2": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Brake.",
    "Mobile",
    "On-Screen Buttons = Steer, drive, and brake."
  ],
  "car-rush": [
    "Desktop",
    "Up Arrow (↑) = Accelerate and move forward.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right."
  ],
  "car-simulator-2": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake / Reverse.",
    "Down Arrow (↓) = Brake / Reverse.",
    "A = Steer left.",
    "Left Arrow (←) = Steer left.",
    "D = Steer right.",
    "Right Arrow (→) = Steer right.",
    "Space = Apply the handbrake.",
    "C = Change camera view.",
    "I = Start / Stop engine.",
    "L = Turn lights on / off.",
    "F = Enter / Exit vehicle."
  ],
  "car-simulator-arena": [
    "Desktop",
    "W = Accelerate.",
    "A = Turn left.",
    "S = Brake or reverse.",
    "D = Turn right.",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake or reverse.",
    "Left Arrow (←) = Turn left.",
    "Right Arrow (→) = Turn right.",
    "Shift = Activate Nitro.",
    "C = Change the camera.",
    "R = Respawn or reset the vehicle.",
    "Space = Use the handbrake."
  ],
  "cars-simulator": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Left Arrow (←) = Steer left.",
    "Down Arrow (↓) = Reverse.",
    "Right Arrow (→) = Steer right.",
    "Space Bar = Use the handbrake.",
    "Shift = Boost the car.",
    "C = Change the camera view.",
    "R = Reset the scene.",
    "E = Turn police lights on or off.",
    "X = Hide instructions.",
    "1 = Switch vehicle.",
    "2 = Switch vehicle.",
    "3 = Switch vehicle.",
    "Tab = Exit the main menu."
  ],
  "cars-thief": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Space = Apply the handbrake.",
    "F = Enter or exit the vehicle.",
    "C = Change the camera view.",
    "Shift = Activate nitro / speed boost."
  ],
  "cars-thief-tank-edition": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Left Arrow (←) = Steer left.",
    "Down Arrow (↓) = Reverse.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Use the handbrake or brake.",
    "Left Click = Fire weapons.",
    "Mouse Movement = Aim or look around.",
    "F = Enter or exit a vehicle.",
    "Shift = Sprint on foot.",
    "C = Change the camera view.",
    "Mobile",
    "Drag = Use the virtual joystick to move or steer.",
    "Tap = Shoot, interact, and exit vehicles."
  ],
  "cartoon-mini-racing": [
    "Desktop",
    "Player 1",
    "- W = Drive forward.",
    "- A = Steer left.",
    "- S = Reverse.",
    "- D = Steer right.",
    "- Shift = Nitro boost.",
    "- Spacebar = Handbrake.",
    "Player 2",
    "- Up Arrow (↑) = Drive forward.",
    "- Down Arrow (↓) = Reverse.",
    "- Left Arrow (←) = Steer left.",
    "- Right Arrow (→) = Steer right.",
    "- Numpad 0 = Nitro boost.",
    "- P = Handbrake."
  ],
  "case-clicker": [
    "Desktop",
    "Left Click = Open cases, select items, and navigate menus.",
    "Mouse Movement = Hover over items for details and navigate interface elements.",
    "Mobile",
    "Tap = Open cases, select items, and interact with menu buttons.",
    "Swipe = Scroll through inventory lists and navigate between tabs."
  ],
  "cat-gunner": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Space = Shoot.",
    "F = Dash.",
    "R = Switch weapons.",
    "G = Throw a grenade.",
    "Esc = Pause."
  ],
  "cat-gunner-super-zombie-shoot": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Space = Shoot.",
    "F = Dash.",
    "R = Switch weapons.",
    "G = Throw a grenade.",
    "Esc = Pause the game."
  ],
  "cat-trap": [
    "Desktop",
    "Left Click = Place a blocker on a tile.",
    "Mobile",
    "Tap = Place a blocker on a tile."
  ],
  "checkers": [
    "Desktop",
    "Left Click = Select and move pieces.",
    "Drag = Move a piece to a valid square.",
    "Auto Moves = Automatically highlight legal moves and possible captures.",
    "Mobile",
    "Tap = Select and move pieces on touch devices."
  ],
  "chicken-merge": [
    "Desktop",
    "Left Click = Click, drag, and drop to spawn, merge, and position chicken units.",
    "Mobile",
    "Tap = Select chickens or spawn buttons.",
    "Drag and Drop = Merge identical chickens and place them on defense lines."
  ],
  "choppy-orc": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Jump.",
    "Spacebar = Throw or retrieve axe.",
    "X = Throw or retrieve axe.",
    "J = Throw or retrieve axe.",
    "R = Restart level.",
    "M = Mute sound.",
    "Escape = Open menu.",
    "Gamepad",
    "D-pad = Move.",
    "Button A = Jump.",
    "Button X = Throw or retrieve axe.",
    "Button Start = Restart level.",
    "Button Y = Mute sound.",
    "Button Back = Open menu."
  ],
  "chrome-dino": [
    "Desktop",
    "Spacebar = Start the game and jump.",
    "Up Arrow (↑) = Start the game and jump.",
    "Down Arrow (↓) = Duck.",
    "Mobile",
    "Tap = Start the game and jump."
  ],
  "circlo0": [
    "Desktop",
    "Left Arrow (←) = Move the ball left.",
    "Right Arrow (→) = Move the ball right.",
    "A = Move the ball left.",
    "D = Move the ball right.",
    "R = Restart the level."
  ],
  "city-bike-stunt-2": [
    "Desktop",
    "Player 1",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "N = Activate nitro boost.",
    "C = Change the camera.",
    "Player 2",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "T = Activate nitro boost.",
    "Q = Change the camera.",
    "Other",
    "R = Restart the level."
  ],
  "city-car-driving-stunt-master": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Left Arrow (←) = Steer left.",
    "Down Arrow (↓) = Reverse.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Apply the handbrake.",
    "F = Activate the nitro boost.",
    "Q = Turn on the left turn signal.",
    "E = Turn on the right turn signal.",
    "L = Toggle the headlights.",
    "I = Start or stop the engine.",
    "C = Change the camera view.",
    "Esc = Open the pause menu."
  ],
  "city-coach-bus-sim": [
    "Desktop",
    "W = Accelerate.",
    "S = Brake or reverse.",
    "A = Steer left.",
    "D = Steer right.",
    "Mouse Movement = Change the camera view.",
    "Left Click = Navigate menus.",
    "Mobile",
    "Tap and Hold = Accelerate.",
    "Swipe Left = Steer left.",
    "Swipe Right = Steer right.",
    "Tap (Brake Button) = Slow down or stop.",
    "Tap (On-Screen Buttons) = Navigate menus or interact with game elements."
  ],
  "city-coach-bus-simulator-3d": [
    "Desktop",
    "W = Accelerate.",
    "S = Brake / Reverse.",
    "A = Steer left.",
    "D = Steer right."
  ],
  "city-rider": [
    "Desktop",
    "W = Accelerate.",
    "A = Steer left.",
    "S = Brake or reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake or reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Space = Use the handbrake.",
    "C = Change the camera view.",
    "R = Reset the car position."
  ],
  "clicker-heroes": [
    "Desktop",
    "1–9 = Activate corresponding hero skills.",
    "Shift = Upgrade 10 levels of a Hero or Ancient at once.",
    "Z = Upgrade 25 levels of a Hero or 1,000 levels of an Ancient at once.",
    "Ctrl = Upgrade 100 levels of a Hero or Ancient at once.",
    "Q = Buy the maximum number of levels (up to 9,999) of a Hero or Ancient at once.",
    "A = Toggle between Progression and Farm mode.",
    "T = Toggle between purchase modifiers.",
    "Left Click = Attack monsters, select menus, and upgrade heroes.",
    "Drag and Drop = Assign Auto Clickers to specific targets (monsters, hero levels, or skills)."
  ],
  "climb-over-it": [
    "Desktop",
    "Mouse Movement = Move the sledgehammer to swing, pull, push, and climb. The hammer's movement is physically simulated based on mouse movement.",
    "Mobile",
    "Touch / Drag = Drag on the screen to manipulate the position of the hammer for swinging, pulling, pushing, and climbing."
  ],
  "cluster-rush": [
    "Desktop",
    "- A = Move left.",
    "- D = Move right.",
    "- Left Arrow (←) = Move left.",
    "- Right Arrow (→) = Move right.",
    "- Space Bar = Jump.",
    "- J = Jump.",
    "- Hold Space Bar = Climb onto truck edges.",
    "- Hold J = Climb onto truck edges."
  ],
  "coffee-shop": [
    "Desktop",
    "Mouse Movement = Navigate menus and adjust prices.",
    "Left Click = Select options and confirm choices."
  ],
  "color-road": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Mobile",
    "Swipe Left = Move left.",
    "Swipe Right = Move right."
  ],
  "color-road-2": [
    "Desktop",
    "Left Click and Drag = Steer the ball left or right.",
    "Mobile",
    "Swipe Left = Steer the ball left.",
    "Swipe Right = Steer the ball right."
  ],
  "color-switch": [
    "Desktop",
    "Left Click = Make the ball jump and move upward through the obstacles.",
    "Mobile",
    "Tap = Make the ball jump and move upward through the obstacles."
  ],
  "color-tunnel": [
    "Desktop",
    "A = Rotate left.",
    "D = Rotate right.",
    "Left Arrow (←) = Rotate left.",
    "Right Arrow (→) = Rotate right.",
    "Mobile",
    "Swipe Left = Rotate the tunnel left.",
    "Swipe Right = Rotate the tunnel right.",
    "Tap (Left Side) = Rotate the tunnel left.",
    "Tap (Right Side) = Rotate the tunnel right."
  ],
  "color-tunnel-2": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "A = Move left.",
    "D = Move right.",
    "Mobile",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Drag = Move left or right."
  ],
  "connect-3": [
    "Desktop",
    "Left Click = Click and drag elements to swap positions.",
    "Mobile",
    "Drag = Touch an element and slide your finger to move it into position."
  ],
  "cookie-clicker": [
    "Desktop",
    "Left Click = Click the giant cookie to bake cookies.",
    "Left Click = Interact with menus, buy buildings, and unlock upgrades."
  ],
  "craftmine": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "W = Jump.",
    "Left Click = Dig and interact.",
    "Mobile",
    "On-screen Joysticks/Buttons = Move, mine, and interact."
  ],
  "crazy-ball-3d": [
    "Desktop",
    "Left Arrow (←) = Move left or navigate left.",
    "Right Arrow (→) = Move right or navigate right.",
    "A = Move left or navigate left.",
    "D = Move right or navigate right.",
    "Mouse Movement = Move or navigate."
  ],
  "crazy-cars": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Space = Brake.",
    "Esc = Pause the game.",
    "R = Reset the vehicle."
  ],
  "crazy-traffic-control": [
    "Mobile",
    "Tap = Change traffic light signals (e.g., switch between red and green)."
  ],
  "crazy-tunnel-3d": [
    "Desktop",
    "Left Arrow (←) = Move the ball left.",
    "Right Arrow (→) = Move the ball right.",
    "A = Move the ball left.",
    "D = Move the ball right.",
    "Mobile",
    "Swipe Left = Steer the ball left.",
    "Swipe Right = Steer the ball right.",
    "Drag = Steer the ball left or right."
  ],
  "creative-kill-chamber": [
    "Desktop",
    "Left Click = Interact with objects, characters, and environmental elements.",
    "Mouse Movement = Explore the screen to find interactive clues and puzzles.",
    "Mobile",
    "Tap = Interact with items, characters, and on-screen elements."
  ],
  "cricket-world-cup": [
    "Desktop",
    "Left Arrow (←) = Adjust batting aim left.",
    "Right Arrow (→) = Adjust batting aim right.",
    "A = Adjust batting aim left.",
    "D = Adjust batting aim right.",
    "Left Click = Hit the ball.",
    "Keyboard Shortcuts = Select the delivery type, aim, and bowling speed.",
    "Up Arrow (↑) = Move fielders upward.",
    "Down Arrow (↓) = Move fielders downward.",
    "Left Arrow (←) = Move fielders left.",
    "Right Arrow (→) = Move fielders right.",
    "Left Mouse Button = Hit the ball or perform fielding actions.",
    "Mobile",
    "Tap = Swing the bat, set direction, select the delivery type, set speed and line, or control fielders.",
    "Swipe Up = Swing the bat, set direction, select the delivery type, set speed and line, or control fielders.",
    "Swipe Down = Swing the bat, set direction, select the delivery type, set speed and line, or control fielders.",
    "Swipe Left = Swing the bat, set direction, select the delivery type, set speed and line, or control fielders.",
    "Swipe Right = Swing the bat, set direction, select the delivery type, set speed and line, or control fielders."
  ],
  "crossy-road": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Move forward.",
    "Down Arrow (↓) = Move backward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Mobile",
    "Tap = Move forward.",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Swipe Down = Move backward."
  ],
  "crowd-run-3d": [
    "Desktop",
    "Mouse Movement = Steer the crowd.",
    "Left Click = Jump over obstacles.",
    "Mobile",
    "Swipe Left = Steer the crowd left.",
    "Swipe Right = Steer the crowd right.",
    "Tap = Jump over obstacles."
  ],
  "cubefield": [
    "Desktop",
    "A = Move the ship left.",
    "D = Move the ship right.",
    "Left Arrow (←) = Move the ship left.",
    "Right Arrow (→) = Move the ship right.",
    "P = Pause the game.",
    "Q = Adjust the graphics quality.",
    "Mobile",
    "Swipe Left = Steer the ship left.",
    "Swipe Right = Steer the ship right."
  ],
  "cubes-king": [
    "Desktop",
    "Left Click = Place or drop the cube.",
    "Left Click + Drag = Swipe or move blocks (depending on the specific mechanic).",
    "Mobile",
    "Tap = Place or drop the cube.",
    "Swipe Up = Move blocks or rotate the view (depending on the specific mechanic).",
    "Swipe Down = Move blocks or rotate the view (depending on the specific mechanic).",
    "Swipe Left = Move blocks or rotate the view (depending on the specific mechanic).",
    "Swipe Right = Move blocks or rotate the view (depending on the specific mechanic)."
  ],
  "cubeshot-io": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Space = Jump.",
    "Left Shift = Sprint.",
    "Left Ctrl = Crouch.",
    "Left Click = Shoot.",
    "Right Click = Aim down sights (ADS).",
    "R = Reload the weapon.",
    "1 = Switch to weapon slot 1.",
    "2 = Switch to weapon slot 2.",
    "3 = Switch to weapon slot 3.",
    "E = Interact with or use objects.",
    "Tab = Open the scoreboard.",
    "Esc = Open the pause menu or settings."
  ],
  "cubito": [
    "Desktop",
    "Up Arrow (↑) = Roll the cube upward.",
    "Down Arrow (↓) = Roll the cube downward.",
    "Left Arrow (←) = Roll the cube left.",
    "Right Arrow (→) = Roll the cube right.",
    "Mobile",
    "Swipe Up = Roll the cube upward.",
    "Swipe Down = Roll the cube downward.",
    "Swipe Left = Roll the cube left.",
    "Swipe Right = Roll the cube right."
  ],
  "cubito-mayhem": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Left Shift = Crouch or walk.",
    "Right Shift = Crouch or walk.",
    "Esc = Pause the game and open the options menu.",
    "P = Pause the game and open the options menu.",
    "Mouse Movement = Aim.",
    "Left Click = Shoot."
  ],
  "curve-ball-3d": [
    "Desktop",
    "Mouse Movement = Move the paddle and position your shots.",
    "Mouse Cursor = Aim at specific areas of the goal.",
    "Mouse Movement (at Contact) = Apply spin to create curved shots.",
    "Left Click = Select menu options or start the game."
  ],
  "cut-the-rope": [
    "Desktop",
    "Left Click = Cut the rope and interact with the in-game interface.",
    "Drag = Cut the rope by dragging the mouse.",
    "Mobile",
    "Swipe = Cut the rope.",
    "Tap = Interact with the in-game interface."
  ],
  "cut-the-rope-holiday": [
    "Desktop",
    "Left Click and Drag = Swipe across ropes to cut them.",
    "Mouse Movement = Swipe to interact with ropes and other game elements.",
    "Mobile",
    "Swipe Up = Cut ropes.",
    "Swipe Down = Cut ropes.",
    "Swipe Left = Cut ropes.",
    "Swipe Right = Cut ropes.",
    "Tap = Interact with objects such as bubbles or buttons."
  ],
  "cut-the-rope-time-travel": [
    "Desktop",
    "Left Click and Drag = Cut ropes.",
    "Left Click = Interact with objects, buttons, and gadgets."
  ],
  "cyber-cars-punk-racing": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Left Arrow (←) = Steer left.",
    "Down Arrow (↓) = Reverse.",
    "Right Arrow (→) = Steer right.",
    "N = Activate nitro.",
    "C = Change the camera view.",
    "Two-Player Mode",
    "Player 1 = Use W, A, S, D to drive.",
    "Player 2 = Use Arrow Keys to drive.",
    "Each player has separate nitro controls.",
    "Mobile",
    "Tap = Use the on-screen steering, brake, and boost buttons."
  ],
  "dark-ninja": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Space = Jump.",
    "Left Click = Throw a shuriken.",
    "F = Throw a shuriken.",
    "Mobile",
    "Drag = Move the character using the on-screen joystick.",
    "Tap = Jump.",
    "Tap = Throw a shuriken."
  ],
  "dark-runner": [
    "Desktop",
    "Spacebar = Jump.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Slide or duck.",
    "Mobile",
    "Tap = Jump.",
    "Swipe Down = Slide or duck."
  ],
  "dashcraft-io": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Space = Activate boost.",
    "Shift = Drift.",
    "R = Reset the vehicle to the last checkpoint."
  ],
  "dead-again": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Mouse Movement = Aim.",
    "Left Click = Shoot.",
    "R = Reload.",
    "Space = Reload.",
    "Mobile",
    "Drag = Move using the virtual left stick.",
    "Drag = Aim using the virtual right stick.",
    "Automatic Firing = Enabled in some versions."
  ],
  "deadshot-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space = Jump.",
    "Shift = Slide.",
    "C = Crouch.",
    "R = Reload.",
    "1 = Switch to weapon 1.",
    "2 = Switch to weapon 2.",
    "3 = Switch to weapon 3.",
    "Left Click = Shoot.",
    "Right Click = Aim.",
    "Scroll Wheel = Switch weapons."
  ],
  "deal-or-no-deal": [
    "Desktop",
    "Left Click = Select and open a briefcase.",
    "Left Click = Accept or reject the Banker's offer."
  ],
  "death-chase": [
    "Desktop",
    "W = Move or drive forward.",
    "A = Move left or steer left.",
    "S = Move backward or reverse.",
    "D = Move right or steer right.",
    "Up Arrow (↑) = Move or drive forward.",
    "Down Arrow (↓) = Move backward or reverse.",
    "Left Arrow (←) = Move left or steer left.",
    "Right Arrow (→) = Move right or steer right.",
    "Spacebar = Jump or slam.",
    "Z = Fire a rocket.",
    "R = Restart the race."
  ],
  "death-chase-3": [
    "Desktop",
    "W = Accelerate.",
    "A = Balance left.",
    "S = Brake.",
    "D = Balance right.",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake.",
    "Left Arrow (←) = Balance left.",
    "Right Arrow (→) = Balance right.",
    "Spacebar = Jump.",
    "Z = Jump.",
    "Y = Jump.",
    "X = Launch weapons or use special abilities.",
    "R = Restart the level."
  ],
  "death-run-3d": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right."
  ],
  "deathcar-io": [
    "Desktop",
    "Mouse Movement = Steer your vehicle.",
    "Left Click = Activate boost.",
    "Right Click = Apply brakes."
  ],
  "deepest-sword": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "Left Arrow (←) = Control and position the sword to the left.",
    "Right Arrow (→) = Control and position the sword to the right.",
    "R = Restart the current run.",
    "0 = Perform a full reset.",
    "Esc = Pause the game.",
    "Left Click = Control and position the sword.",
    "Right Click = Control and position the sword."
  ],
  "deer-simulator": [
    "Desktop",
    "- W = Move upward.",
    "- A = Move left.",
    "- S = Move downward.",
    "- D = Move right.",
    "- Mouse Movement = Look around or aim.",
    "- Left Click = Attack or use a weapon.",
    "- Space Bar = Jump.",
    "- E = Interact.",
    "- Shift = Sprint.",
    "- Esc = Open the pause menu."
  ],
  "demolition-derby-crash-racing": [
    "Desktop",
    "W = Accelerate.",
    "A = Steer left.",
    "S = Brake or reverse.",
    "D = Steer right.",
    "Space = Activate nitro boost.",
    "Esc = Open the pause menu."
  ],
  "desert-car-racing-1": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake or slow down.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Mobile",
    "Tap = Accelerate and brake using the on-screen controls.",
    "Drag = Steer left or right.",
    "Swipe Left = Steer left.",
    "Swipe Right = Steer right."
  ],
  "detective-loupe-puzzle": [
    "Desktop",
    "Left Click = Select clues or evidence.",
    "Right Click = Use the magnifying glass.",
    "Mobile",
    "Tap = Select clues or evidence.",
    "Tap and Hold = Use the magnifying glass."
  ],
  "diebrary": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Left Click = Shoot the primary weapon.",
    "Space = Use your skill.",
    "P = Pause the game.",
    "Left Shift = Context-dependent utility key.",
    "Left Ctrl = Context-dependent utility key.",
    "Number Keys = Context-dependent utility keys.",
    "Right Click = Aim (if applicable).",
    "Gamepad",
    "Left Stick = Move.",
    "Right Stick = Aim.",
    "Face Buttons = Use abilities or perform actions."
  ],
  "dino-chrome-io": [
    "Desktop",
    "Space = Jump.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Duck.",
    "Mobile",
    "Tap = Jump.",
    "Swipe Down = Duck."
  ],
  "dinosaur-game": [
    "Desktop",
    "Space = Jump.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Duck.",
    "Mobile",
    "Tap = Jump."
  ],
  "dinosaurs-merge-master": [
    "Desktop",
    "Left Click = Move units, merge units, and select upgrades."
  ],
  "dog-simulator-3d": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space Bar = Jump.",
    "Left Click = Attack.",
    "Shift = Run.",
    "Mouse Movement = Look around."
  ],
  "doge-miner": [
    "Desktop",
    "Left Click = Mine coins.",
    "Mouse Movement = View upgrade information by hovering over upgrades.",
    "Left Click = Purchase upgrades and interact with the game interface.",
    "Mobile",
    "Tap = Mine coins.",
    "Tap = View upgrade information.",
    "Tap = Purchase upgrades and interact with the game interface."
  ],
  "doll-designer": [
    "Desktop",
    "Mouse Movement = Select, customize items, and navigate game elements.",
    "Mobile",
    "Tap = Select items, customize designs, and navigate game elements.",
    "Drag = Move and position accessories on the doll."
  ],
  "doodle-champion-island": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Interact with characters, objects, and activities, and perform most sports mini-game actions."
  ],
  "doodle-jump": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "A = Move left.",
    "Right Arrow (→) = Move right.",
    "D = Move right.",
    "Space = Shoot.",
    "Left Click = Shoot.",
    "Mobile",
    "Tilt Device = Move left or right.",
    "Tap = Shoot."
  ],
  "doom-2": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Ctrl = Shoot.",
    "Spacebar = Open or interact.",
    "Shift = Run.",
    "Alt = Strafe.",
    "1 = Switch to weapon 1.",
    "2 = Switch to weapon 2.",
    "3 = Switch to weapon 3.",
    "4 = Switch to weapon 4.",
    "5 = Switch to weapon 5.",
    "6 = Switch to weapon 6.",
    "7 = Switch to weapon 7.",
    "Tab = Open the automap.",
    "Esc = Open the pause menu.",
    "Mouse Movement = Aim.",
    "Left Click = Shoot."
  ],
  "dots-and-boxes": [
    "Desktop",
    "Left Click = Draw a line between two adjacent dots."
  ],
  "down-the-hill": [
    "Desktop",
    "Left Click = Draw a line between two adjacent dots."
  ],
  "dragon-world": [
    "Desktop",
    "W = Move the dragon upward.",
    "A = Move the dragon left.",
    "S = Move the dragon downward.",
    "D = Move the dragon right.",
    "Up Arrow (↑) = Move the dragon upward.",
    "Down Arrow (↓) = Move the dragon downward.",
    "Left Arrow (←) = Move the dragon left.",
    "Right Arrow (→) = Move the dragon right.",
    "Space = Fly upward.",
    "C = Fly downward.",
    "Left Shift = Sprint.",
    "Q = Jump.",
    "R = Dodge.",
    "T = Open the chat.",
    "M = Show the map.",
    "Esc = Open the pause menu.",
    "Tab = Open the pause menu.",
    "Left Click = Launch a fireball.",
    "Right Click = Perform a melee attack.",
    "Shift + Left Click = Use fire breath."
  ],
  "draw-the-hill": [
    "Desktop",
    "Left Click + Drag = Draw a path.",
    "Mobile",
    "Drag = Draw a path."
  ],
  "dreadhead-parkour": [
    "Desktop",
    "W = Jump.",
    "Up Arrow (↑) = Jump.",
    "Double Jump = Press the jump key twice.",
    "S = Slide or duck.",
    "Down Arrow (↓) = Slide or duck.",
    "Mobile",
    "Tap = Jump or double jump.",
    "Swipe Up = Jump or double jump.",
    "Swipe Down = Slide or roll."
  ],
  "drift-boss": [
    "Desktop",
    "Space = Hold to turn right.",
    "Release Space = Turn left.",
    "Left Click = Hold to turn right.",
    "Release Left Click = Turn left.",
    "Mobile",
    "Tap and Hold = Turn right.",
    "Release = Turn left."
  ],
  "drift-dudes": [
    "Desktop",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Mobile",
    "Tap Left Arrow = Steer left.",
    "Tap Right Arrow = Steer right."
  ],
  "drift-hunters": [
    "Desktop",
    "W = Accelerate.",
    "A = Steer left.",
    "S = Brake.",
    "D = Steer right.",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Space = Apply the handbrake.",
    "Left Shift = Shift up.",
    "Left Ctrl = Shift down.",
    "C = Change the camera view."
  ],
  "drive-mad": [
    "Desktop",
    "Right Arrow (→) = Accelerate forward.",
    "Left Arrow (←) = Brake or reverse.",
    "Mobile",
    "Tap and Hold Right Arrow = Accelerate.",
    "Tap and Hold Left Arrow = Brake or reverse."
  ],
  "drop-kick-world-cup": [
    "Desktop",
    "Mouse Movement = Move the player.",
    "Left Click = Kick the ball."
  ],
  "drop-kick-world-cup-2018": [
    "Desktop",
    "Mouse Movement = Move the player.",
    "Left Click = Kick the ball."
  ],
  "drunken-duel": [
    "Desktop",
    "W = Left player shoot.",
    "Up Arrow (↑) = Right player shoot.",
    "Mobile",
    "On-Screen Touch Controls = Shoot."
  ],
  "duck-life": [
    "Desktop",
    "Up Arrow (↑) = Move, jump, dive, or switch lanes depending on the mini-game.",
    "Down Arrow (↓) = Move, jump, dive, or switch lanes depending on the mini-game.",
    "Left Arrow (←) = Move, jump, dive, or switch lanes depending on the mini-game.",
    "Right Arrow (→) = Move, jump, dive, or switch lanes depending on the mini-game.",
    "Left Click = Jump, interact with menus, purchase seeds, select training modes, and start races.",
    "Drag = Steer while flying during specific training sections.",
    "Mobile",
    "Tap = Jump, interact with menus, purchase seeds, select training modes, and start races.",
    "Drag = Steer while flying during specific training sections."
  ],
  "duck-life-2": [
    "Desktop",
    "Up Arrow (↑) = Jump while running or swimming; fly upward while flying.",
    "Down Arrow (↓) = Dive while swimming; fly downward while flying.",
    "Left Arrow (←) = Move or navigate left.",
    "Right Arrow (→) = Move or navigate right.",
    "Left Click = Select options, navigate menus, and interact with the game interface."
  ],
  "duck-life-3": [
    "Desktop",
    "Mouse Movement = Navigate menus.",
    "Left Click = Interact with training mini-games.",
    "Keyboard = Perform specific actions during training and racing segments (depending on the mini-game)."
  ],
  "duck-life-4": [
    "Desktop",
    "Up Arrow (↑) = Jump, flap, or interact.",
    "W = Jump, flap, or interact.",
    "Down Arrow (↓) = Dive while swimming.",
    "S = Dive while swimming.",
    "Left Arrow (←) = Move left or guide the duck left.",
    "A = Move left or guide the duck left.",
    "Right Arrow (→) = Move right or guide the duck right.",
    "D = Move right or guide the duck right.",
    "Left Click = Navigate menus, feed the duck, and select options."
  ],
  "duck-life-5": [
    "Desktop",
    "W = Move upward during training mini-games.",
    "A = Move left during training mini-games.",
    "S = Move downward during training mini-games.",
    "D = Move right during training mini-games.",
    "Up Arrow (↑) = Move upward during training mini-games.",
    "Down Arrow (↓) = Move downward during training mini-games.",
    "Left Arrow (←) = Move left during training mini-games.",
    "Right Arrow (→) = Move right during training mini-games.",
    "Space = Jump or perform actions during challenges.",
    "Left Click = Navigate menus, select options, and interact with buttons, upgrades, and customization items."
  ],
  "duke-dashington-remastered": [
    "Desktop",
    "Up Arrow (↑) = Dash upward.",
    "Down Arrow (↓) = Dash downward.",
    "Left Arrow (←) = Dash left.",
    "Right Arrow (→) = Dash right.",
    "W = Dash upward.",
    "A = Dash left.",
    "S = Dash downward.",
    "D = Dash right.",
    "Esc = Open the pause menu.",
    "M = Mute music.",
    "N = Mute sounds.",
    "Mobile",
    "Tap = Dash in the desired direction (the character moves until hitting an obstacle or wall)."
  ],
  "dune-game": [
    "Desktop",
    "Left Click = Select, interact, navigate menus, and issue orders.",
    "Right Click = Cancel the current selection or return to the previous screen."
  ],
  "dunkbrush": [
    "Desktop",
    "Left Click + Drag = Draw a line.",
    "Mobile",
    "Drag = Draw a line."
  ],
  "dunkers": [
    "Desktop",
    "W = Move or jump.",
    "Space = Dunk or perform an action (depending on the game version or mode).",
    "Mobile",
    "Tap (Left Side) = Move back or steer.",
    "Tap (Right Side) = Grab the ball, dunk, or perform an action."
  ],
  "dunkers-2": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "Space = Jump.",
    "Space = Shoot (hold and release at the orange marker).",
    "Mobile",
    "Tap Left Side = Move backward.",
    "Tap Right Side = Jump and move forward (with arm swing)."
  ],
  "e-scooter": [
    "Desktop",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Mobile",
    "Tap = Steer and navigate through traffic.",
    "Drag = Steer and navigate through traffic."
  ],
  "eagle-ride": [
    "Desktop",
    "A = Steer left.",
    "D = Steer right.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Mobile",
    "Tap (Left Side) = Steer left.",
    "Tap (Right Side) = Steer right."
  ],
  "eagler-craft": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Space = Jump.",
    "Left Shift = Sneak.",
    "Left Ctrl = Sprint.",
    "E = Open the inventory.",
    "Q = Drop an item.",
    "1–9 = Select a hotbar slot.",
    "Esc = Open the menu.",
    "Tab = View the player list.",
    "T = Open the chat.",
    "Left Click = Attack or break blocks.",
    "Right Click = Place or use an item.",
    "Scroll Wheel = Switch hotbar items."
  ],
  "earn-to-die": [
    "Desktop",
    "W = Accelerate.",
    "A = Tilt backward.",
    "S = Brake or reverse.",
    "D = Tilt forward.",
    "Up Arrow (↑) = Accelerate.",
    "Left Arrow (←) = Tilt backward.",
    "Down Arrow (↓) = Brake or reverse.",
    "Right Arrow (→) = Tilt forward.",
    "Space Bar = Activate boost (when unlocked).",
    "X = Activate boost (when unlocked).",
    "Ctrl = Activate boost (when unlocked)."
  ],
  "eggy-car": [
    "Desktop",
    "D = Accelerate.",
    "Right Arrow (→) = Accelerate.",
    "A = Brake or reverse.",
    "Left Arrow (←) = Brake or reverse.",
    "Mobile",
    "Tap On-Screen Accelerate Pedal = Accelerate.",
    "Tap On-Screen Brake Pedal = Brake or reverse."
  ],
  "elastic-man": [
    "Desktop",
    "Left Click = Stretch and distort the face.",
    "Drag = Stretch and distort the face.",
    "Release = Rebound the face.",
    "Mobile",
    "Tap = Stretch and distort the face.",
    "Drag = Stretch and distort the face.",
    "Release = Rebound the face."
  ],
  "electron-dash": [
    "Desktop",
    "A = Move left.",
    "Left Arrow (←) = Move left.",
    "D = Move right.",
    "Right Arrow (→) = Move right.",
    "W = Jump.",
    "Up Arrow (↑) = Jump.",
    "Space = Jump."
  ],
  "eliza-mall-mania": [
    "Desktop",
    "Left Click = Select items.",
    "Drag = Equip or try on outfits.",
    "Scroll Wheel = Browse clothing categories.",
    "Mobile",
    "Tap = Select items.",
    "Swipe Left = Navigate through stores.",
    "Swipe Right = Navigate through stores.",
    "Long Press = Preview clothing pieces."
  ],
  "endless-truck": [
    "Desktop",
    "Spacebar = Jump.",
    "Left Arrow (←) = Flip or rotate left.",
    "Right Arrow (→) = Flip or rotate right.",
    "Mobile",
    "Tap = Jump.",
    "Drag = Flip or rotate."
  ],
  "endless-tunnel": [
    "Desktop",
    "Left Arrow (←) = Rotate left.",
    "Right Arrow (→) = Rotate right.",
    "A = Rotate left.",
    "D = Rotate right.",
    "Mobile",
    "Tap (Left) = Rotate left.",
    "Tap (Right) = Rotate right.",
    "Swipe Left = Rotate left.",
    "Swipe Right = Rotate right."
  ],
  "endless-war-3": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Mouse Movement = Aim.",
    "Left Click = Shoot.",
    "1 = Select weapon.",
    "2 = Select weapon.",
    "3 = Select weapon.",
    "4 = Select weapon.",
    "Q = Command.",
    "Space = Alternate attack.",
    "R = Reload.",
    "G = Drop weapon."
  ],
  "energy": [
    "Desktop",
    "Left Click = Rotate the tile.",
    "Mobile",
    "Tap = Rotate the tile."
  ],
  "eparkour-io": [
    "Desktop",
    "W = Jump.",
    "A = Move left.",
    "S = Crouch or slide.",
    "D = Move right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Crouch or slide.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Space = Jump.",
    "Shift = Sprint.",
    "R = Restart the level."
  ],
  "epic-basketball": [
    "Desktop",
    "Left Click + Drag = Aim the shot.",
    "Left Click Release = Shoot.",
    "Mobile",
    "Drag = Set the shooting angle.",
    "Release Touch = Launch the ball."
  ],
  "escape-road": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake or reverse.",
    "Down Arrow (↓) = Brake or reverse.",
    "A = Steer left.",
    "Left Arrow (←) = Steer left.",
    "D = Steer right.",
    "Right Arrow (→) = Steer right.",
    "Space = Handbrake, drift, or perform an action."
  ],
  "escape-road-2": [
    "Desktop",
    "W = Drive forward.",
    "Up Arrow (↑) = Drive forward.",
    "S = Reverse.",
    "Down Arrow (↓) = Reverse.",
    "A = Steer left.",
    "Left Arrow (←) = Steer left.",
    "D = Steer right.",
    "Right Arrow (→) = Steer right.",
    "Space = Apply the handbrake.",
    "Mobile",
    "Tap and Hold Left Side = Steer left.",
    "Tap and Hold Right Side = Steer right."
  ],
  "escaping-the-prison": [
    "Desktop",
    "W = Move upward during quick-time events.",
    "A = Move left during quick-time events.",
    "S = Move downward during quick-time events.",
    "D = Move right during quick-time events.",
    "Up Arrow (↑) = Move upward during quick-time events.",
    "Down Arrow (↓) = Move downward during quick-time events.",
    "Left Arrow (←) = Move left during quick-time events.",
    "Right Arrow (→) = Move right during quick-time events.",
    "M = Toggle or mute the sound (in some versions).",
    "Left Click = Select options, interact with tools, and make choices.",
    "Mobile",
    "Tap = Select options, interact with tools, and make choices."
  ],
  "eugenes-life": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Inflate and rise.",
    "Up Arrow (↑) = Inflate and rise.",
    "S = Descend or squeeze.",
    "Down Arrow (↓) = Descend or squeeze.",
    "Esc = Open the menu or restart the game."
  ],
  "ev-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Mouse Movement = Aim.",
    "Left Click = Shoot.",
    "Right Click = Aim or perform a secondary action.",
    "Space = Jump.",
    "Shift = Sprint.",
    "Q = Use an ability.",
    "E = Use an ability.",
    "R = Reload.",
    "Tab = View the scoreboard.",
    "1 = Switch weapons.",
    "2 = Switch weapons.",
    "3 = Switch weapons.",
    "Esc = Open the pause menu."
  ],
  "evo-city-driving": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Brake or reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Brake or reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Handbrake.",
    "C = Change the camera view.",
    "F = Activate nitro."
  ],
  "extreme-car-driving-simulator": [
    "Desktop",
    "W = Accelerate.",
    "A = Steer left.",
    "S = Brake or reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake or reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Space = Use the handbrake.",
    "F = Activate Nitro boost.",
    "C = Change the camera.",
    "I = Start the engine.",
    "M = Open the map."
  ],
  "extreme-car-parking": [
    "Desktop",
    "W = Accelerate.",
    "A = Steer left.",
    "S = Brake or reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Accelerate.",
    "Left Arrow (←) = Steer left.",
    "Down Arrow (↓) = Brake or reverse.",
    "Right Arrow (→) = Steer right.",
    "R = Restart the level."
  ],
  "extreme-off-road-cars": [
    "Desktop",
    "W = Accelerate.",
    "A = Steer left.",
    "S = Brake or reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake or reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Apply the handbrake.",
    "Left Click (Hold) = Move or adjust the camera view."
  ],
  "extreme-off-road-cars-3-cargo": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Brake or reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Left Arrow (←) = Steer left.",
    "Down Arrow (↓) = Brake or reverse.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Apply the handbrake.",
    "R = Reset the vehicle.",
    "C = Change the camera view."
  ],
  "extreme-pamplona": [
    "Desktop",
    "- Left Arrow (←) = Move left.",
    "- Right Arrow (→) = Move right.",
    "- Up Arrow (↑) = Jump.",
    "- Spacebar = Jump.",
    "- Down Arrow (↓) = Slide / Duck."
  ],
  "extreme-run-3d": [
    "Desktop",
    "A = Move left.",
    "Left Arrow (←) = Move left.",
    "D = Move right.",
    "Right Arrow (→) = Move right.",
    "W = Jump.",
    "Up Arrow (↑) = Jump.",
    "Space = Jump.",
    "S = Slide or crouch.",
    "Down Arrow (↓) = Slide or crouch.",
    "Mobile",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Swipe Up = Jump.",
    "Swipe Down = Slide or crouch."
  ],
  "extremeoffroadcars2": [
    "Desktop",
    "- W = Drive forward.",
    "- A = Steer left.",
    "- S = Brake or reverse.",
    "- D = Steer right.",
    "- Up Arrow (↑) = Drive forward.",
    "- Down Arrow (↓) = Brake or reverse.",
    "- Left Arrow (←) = Steer left.",
    "- Right Arrow (→) = Steer right.",
    "- Spacebar = Brake.",
    "- Z = Attach the winch (with Left Click).",
    "- Left Click = Attach the winch (with Z).",
    "- C = Pull the car using the winch.",
    "- X = Release the winch cable.",
    "- Shift = Toggle all-wheel drive."
  ],
  "factory-balls-forever": [
    "Desktop",
    "Left Click = Select tools, apply items to the ball, or remove masks.",
    "Mobile",
    "Tap = Select tools, apply items to the ball, or remove masks."
  ],
  "fairy-dressup": [
    "Desktop",
    "Left Click = Select, equip, or unequip items and colors.",
    "Left Click = Use UI buttons (Randomize, Save).",
    "Mobile",
    "Tap = Select, equip, or unequip items and colors.",
    "Tap = Use UI buttons (Randomize, Save)."
  ],
  "fall-guys-ultimate-knockout": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space = Jump.",
    "Ctrl = Dive.",
    "Shift = Grab.",
    "Tab = Show player names.",
    "1 = Use emote 1.",
    "2 = Use emote 2.",
    "3 = Use emote 3.",
    "4 = Use emote 4.",
    "Mouse Movement = Control the camera."
  ],
  "fallguys": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space = Jump.",
    "Ctrl = Dive.",
    "Shift = Grab.",
    "Tab = Show player names.",
    "1 = Use an emote.",
    "2 = Use an emote.",
    "3 = Use an emote.",
    "4 = Use an emote.",
    "Mouse Movement = Adjust the camera."
  ],
  "falling-fred": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "A = Move left.",
    "D = Move right.",
    "Mobile",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Drag = Move left or right."
  ],
  "fancy-pants": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "A = Move left.",
    "D = Move right.",
    "Up Arrow (↑) = Jump / Enter Doors.",
    "W = Jump / Enter Doors.",
    "Down Arrow (↓) = Duck / Roll.",
    "S = Duck / Roll.",
    "P = Pause.",
    "M = Mute.",
    "Gamepad",
    "Left Stick = Move.",
    "A / Cross Button = Jump / Enter Doors.",
    "Down on Left Stick = Duck / Roll.",
    "Start / Options Button = Pause."
  ],
  "fancy-pants-2": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Enter doors / Look up.",
    "Down Arrow (↓) = Duck / Slide / Roll down hills.",
    "S = Jump.",
    "Space = Pause.",
    "Mobile",
    "Virtual Joystick / D-pad = Move left, move right, duck, or look up.",
    "On-screen Action Buttons = Jump, slide, and interact with objects."
  ],
  "fancy-pants-3": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Enter doors.",
    "Down Arrow (↓) = Duck or slide.",
    "S = Jump.",
    "A = Attack (after unlocking the pencil).",
    "R = Quick reset.",
    "Spacebar = Pause.",
    "M = Toggle music.",
    "Mobile",
    "On-screen Movement Controls = Move.",
    "Jump Button = Jump (appears when unlocked).",
    "Attack Button = Attack (appears when unlocked)."
  ],
  "farm-match-seasons": [
    "Desktop",
    "- Left Click and Drag = Move icons across the board to swap and match farm items.",
    "Mobile",
    "- Tap and Swipe = Match items by swapping them on the board."
  ],
  "ferge-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space = Jump.",
    "Shift = Sprint.",
    "C = Crouch.",
    "R = Reload.",
    "1 = Switch weapons.",
    "2 = Switch weapons.",
    "3 = Switch weapons.",
    "4 = Switch weapons.",
    "Tab = View the scoreboard.",
    "Esc = Open the settings or pause menu.",
    "Left Click = Fire the weapon.",
    "Right Click = Aim down sights (ADS)."
  ],
  "fightz-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Number Keys = Select items or weapons.",
    "Mouse Movement = Aim.",
    "Left Click = Attack.",
    "Right Click = Activate speed boost."
  ],
  "fire-truck-rescue": [
    "Desktop",
    "W = Accelerate.",
    "S = Brake.",
    "A = Steer left.",
    "D = Steer right.",
    "Space = Use the handbrake.",
    "Shift = Activate the nitro boost.",
    "Left Click = Interact with menus and navigate options."
  ],
  "fireboy-and-watergirl-2": [
    "Desktop",
    "Up Arrow (↑) = Control Fireboy upward.",
    "Down Arrow (↓) = Control Fireboy downward.",
    "Left Arrow (←) = Control Fireboy left.",
    "Right Arrow (→) = Control Fireboy right.",
    "W = Control Watergirl upward.",
    "A = Control Watergirl left.",
    "S = Control Watergirl downward.",
    "D = Control Watergirl right.",
    "R = Restart the level.",
    "Space = Switch characters in solo mode.",
    "Mobile",
    "On-Screen Buttons = Move and jump.",
    "Swap Icon = Switch between characters in solo mode."
  ],
  "fireboy-and-watergirl-3": [
    "Desktop",
    "Fireboy",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Watergirl",
    "A = Move left.",
    "D = Move right.",
    "W = Jump."
  ],
  "fireboy-and-watergirl-4": [
    "Desktop",
    "Up Arrow (↑) = Move Fireboy upward.",
    "Down Arrow (↓) = Move Fireboy downward.",
    "Left Arrow (←) = Move Fireboy left.",
    "Right Arrow (→) = Move Fireboy right.",
    "W = Move Watergirl upward.",
    "A = Move Watergirl left.",
    "S = Move Watergirl downward.",
    "D = Move Watergirl right.",
    "R = Restart the level.",
    "Mobile",
    "On-Screen Buttons = Move and jump characters."
  ],
  "fireboy-and-watergirl-5-elements": [
    "Desktop",
    "Fireboy",
    "Up Arrow (↑) = Jump.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Watergirl",
    "W = Jump.",
    "A = Move left.",
    "D = Move right.",
    "General",
    "R = Restart the level."
  ],
  "fireboy-and-watergirl-6": [
    "Desktop",
    "Up Arrow (↑) = Jump (Fireboy).",
    "Down Arrow (↓) = Move downward (Fireboy).",
    "Left Arrow (←) = Move left (Fireboy).",
    "Right Arrow (→) = Move right (Fireboy).",
    "W = Jump (Watergirl).",
    "A = Move left (Watergirl).",
    "D = Move right (Watergirl).",
    "Left Click and Drag = Move and control fairies."
  ],
  "fireboy-and-watergirl-forest-temple": [
    "Desktop",
    "Fireboy",
    "- Up Arrow (↑) = Jump.",
    "- Left Arrow (←) = Move left.",
    "- Right Arrow (→) = Move right.",
    "Watergirl",
    "- W = Jump.",
    "- A = Move left.",
    "- D = Move right.",
    "General",
    "- R = Restart the level."
  ],
  "fishing-and-lines": [
    "Desktop",
    "Mouse Movement = Navigate and select balls.",
    "Left Click = Place or swap balls on the board."
  ],
  "fishing-frenzy": [
    "Desktop",
    "Left Arrow (←) = Move the boat left.",
    "Right Arrow (→) = Move the boat right.",
    "Down Arrow (↓) = Lower the fishing hook.",
    "Space = Throw a bubble bomb.",
    "Mobile",
    "Tap = Use the on-screen buttons to move the boat, cast the line, and catch fish.",
    "Swipe = Use the on-screen buttons to move the boat, cast the line, and catch fish."
  ],
  "five-nights-at-freddys-2": [
    "Desktop",
    "Ctrl = Flash the hallway flashlight.",
    "Space = Open or close the camera monitor.",
    "Ctrl + Left Click = Interact with the mask and camera buttons.",
    "Mouse Movement = Look around the office.",
    "Left Click = Interact with cameras, mask, vent lights, and flashlight buttons."
  ],
  "five-nights-at-freddys-3": [
    "Desktop",
    "Mouse Movement = Look around the office.",
    "Left Click = Open the cameras and maintenance systems.",
    "Space = Seal vents while using the vent camera system."
  ],
  "five-nights-at-freddys-4": [
    "Desktop",
    "Mouse Movement = Look toward the doors.",
    "Mouse Movement = Move to the bed to check Nightmare Freddy's minions.",
    "Left Click and Hold = Close the doors.",
    "Left Click and Hold = Use the flashlight."
  ],
  "flappy-bird": [
    "Desktop",
    "Space = Flap the wings.",
    "Left Click = Flap the wings or navigate menus.",
    "Mobile",
    "Tap = Flap the wings or navigate menus."
  ],
  "flappy-dunk": [
    "Desktop",
    "Space = Make the ball flap and fly upward.",
    "Left Click = Make the ball flap and fly upward.",
    "Mobile",
    "Tap = Make the ball flap and fly upward."
  ],
  "fleeing-the-complex": [
    "Desktop",
    "Left Click = Select choices, interact with objects, and navigate during quick-time events.",
    "Number Keys (1–4) = Select choices (in supported versions).",
    "Space = Pause / Resume (in supported versions).",
    "Mobile",
    "Tap = Select choices, interact with objects, and navigate during quick-time events."
  ],
  "flip-bottle": [
    "Desktop",
    "Left Click = Jump.",
    "Hold Left Click = Charge jump power.",
    "Release Left Click = Execute jump.",
    "Mobile",
    "Tap = Jump.",
    "Hold and Release = Charge jump power and jump."
  ],
  "flipper-dunk-3d": [
    "Desktop",
    "Left Click = Activate the flipper and launch the ball.",
    "Left Click = Adjust your timing for the next shot.",
    "Mobile",
    "Tap = Activate the flipper and launch the ball.",
    "Tap Again = Adjust your timing for the next shot."
  ],
  "flying-car-simulator": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "F = Switch between driving and flying.",
    "Spacebar = Brake.",
    "Shift = Activate Nitro."
  ],
  "fnaf-shooter": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "W + Shift = Run.",
    "Space = Jump.",
    "Mouse Movement = Look around.",
    "Left Click = Shoot.",
    "Right Click (Hold) = Aim.",
    "Scroll Wheel = Switch weapons.",
    "1 = Select weapon.",
    "2 = Select weapon.",
    "3 = Select weapon.",
    "4 = Select weapon.",
    "5 = Select weapon.",
    "6 = Select weapon.",
    "7 = Select weapon.",
    "R = Reload.",
    "G = Throw a grenade."
  ],
  "fnafsl": [
    "Desktop",
    "W = Move forward or crawl through ventilation shafts.",
    "S = Retreat backward through ventilation shafts / Bring up or close the monitor interface.",
    "A = Move left or wiggle the camera / Close the left door in Custom Night.",
    "D = Move right or wiggle the camera / Close the right door in Custom Night.",
    "Ctrl = Administer a controlled shock.",
    "Space = Activate the flash beacon.",
    "Mouse Movement = Pan and turn the camera perspective.",
    "Left Click = Press keypads, interact with environmental interfaces, and hold to wind up springlocks."
  ],
  "foot-chinko": [
    "Desktop",
    "Mouse Movement = Aim.",
    "Left Click = Kick ball.",
    "Mobile",
    "Drag = Aim.",
    "Tap = Kick ball."
  ],
  "football-bros": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Spacebar = Pass, dive, or perform a stiff arm depending on the situation."
  ],
  "football-legends": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Jump.",
    "Up Arrow (↑) = Jump.",
    "S = Slide or block.",
    "Down Arrow (↓) = Slide or block.",
    "X = Kick.",
    "L = Kick.",
    "Z = Perform a supershot.",
    "K = Perform a supershot."
  ],
  "football-masters": [
    "Desktop",
    "Player One",
    "W = Jump.",
    "S = Slide.",
    "A = Move left.",
    "D = Move right.",
    "L = Kick.",
    "K = Use the supershot.",
    "Player Two",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Slide.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "X = Kick.",
    "Z = Use the supershot."
  ],
  "football-run": [
    "Desktop",
    "Up Arrow (↑) = Jump or double jump.",
    "W = Jump or double jump.",
    "Down Arrow (↓) = Slide or drop down.",
    "S = Slide or drop down.",
    "Mobile",
    "Swipe Up = Jump or double jump.",
    "Swipe Down = Slide or drop down."
  ],
  "football-strike": [
    "Desktop",
    "Left Click (Hold & Drag) = Aim the shot.",
    "Left Click (Release) = Shoot.",
    "Left Click (Hold & Drag) = Make saves while defending.",
    "Mobile",
    "Swipe = Aim and shoot.",
    "Swipe = Make saves.",
    "Long Swipe = Increase shot power.",
    "Short Swipe = Increase shot finesse."
  ],
  "fortnite": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Spacebar = Jump.",
    "Shift + W = Sprint.",
    "1 = Activate Power-Up Skill.",
    "2 = Activate Power-Up Skill.",
    "3 = Activate Power-Up Skill.",
    "4 = Activate Power-Up Skill.",
    "Q = Use Skills or Actions / Auto Function (where available).",
    "E = Use Skills or Actions.",
    "R = Use Skills or Actions.",
    "F = Use Skills or Actions.",
    "B = Open Bag/Inventory.",
    "Alt = Zoom.",
    "C = Crouch.",
    "M = Open Map."
  ],
  "fortnite-made-in-china": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Mouse Movement = Aim.",
    "Left Click = Shoot.",
    "Space = Jump.",
    "Shift = Sprint.",
    "F = Interact or open doors.",
    "R = Reload."
  ],
  "fortride-open-world": [
    "Desktop",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Spacebar = Activate nitro boost.",
    "Shift = Drift / Handbrake.",
    "R = Reset vehicle position / Rotate building object before placing.",
    "Q = Cycle through available building blocks, ramps, and roads.",
    "E = Cycle through available building blocks, ramps, and roads.",
    "Left Click = Place selected building object.",
    "Right Click = Delete targeted building object."
  ],
  "fortz": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "W = Jump / Aim turret upward.",
    "S = Aim turret downward.",
    "F = Shoot / Place block.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump / Aim turret upward.",
    "Down Arrow (↓) = Aim turret downward.",
    "M = Shoot / Place block.",
    "Enter = Shoot / Place block."
  ],
  "four-color": [
    "Desktop",
    "Left Click = Select and play cards.",
    "Mobile",
    "Tap = Select and play cards."
  ],
  "fred-running": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Jump."
  ],
  "free-kick-classic": [
    "Desktop",
    "Left Click and Drag = Aim, set the shot's altitude, and adjust its power.",
    "Drag (while the ball is mid-air) = Apply spin and curve the ball's trajectory.",
    "Mobile",
    "Swipe/Flick = Launch the ball and control its direction, altitude, and power.",
    "Swipe (while the ball is mid-air) = Bend or curve the ball's trajectory to avoid defenders."
  ],
  "free-kick-shooter": [
    "Desktop",
    "Left Click (Hold & Drag) = Aim the shot and set the power.",
    "Left Click (Release) = Kick the ball.",
    "Mouse Movement = Apply curve or spin while the ball is in flight.",
    "Mobile",
    "Drag = Aim the shot and set the power.",
    "Swipe Forward = Kick the ball.",
    "Swipe Left = Curve the ball left while it is in flight.",
    "Swipe Right = Curve the ball right while it is in flight."
  ],
  "free-the-key": [
    "Controls##",
    "Desktop",
    "W / Up Arrow (↑) = Slide block up.",
    "A / Left Arrow (←) = Slide block left.",
    "S / Down Arrow (↓) = Slide block down.",
    "D / Right Arrow (→) = Slide block right.",
    "Spacebar = Select or grab a block.",
    "R = Restart the level.",
    "Enter = Select an option.",
    "Esc = Pause or go back.",
    "Mobile & Touch Devices",
    "Swipe Left / Right = Move horizontal block.",
    "Swipe Up / Down = Move vertical block.",
    "Tap Restart Icon = Reset the level."
  ],
  "friday-night-funkin": [
    "Desktop",
    "Up Arrow (↑) = Press to hit incoming musical notes.",
    "Down Arrow (↓) = Press to hit incoming musical notes.",
    "Left Arrow (←) = Press to hit incoming musical notes.",
    "Right Arrow (→) = Press to hit incoming musical notes.",
    "W = Press to hit incoming musical notes.",
    "A = Press to hit incoming musical notes.",
    "S = Press to hit incoming musical notes.",
    "D = Press to hit incoming musical notes.",
    "Enter = Pause the current game / Restart the song from the game over screen.",
    "P = Pause the current game.",
    "Escape = Exit out or head back to the prior menu.",
    "Backspace = Exit out or head back to the prior menu.",
    "+ = Turn the game volume up.",
    "- = Turn the game volume down.",
    "0 = Instantly mute the game audio.",
    "R = Instantly cause a game over during a track.",
    "Z = Restart the song from the game over screen."
  ],
  "fruit-ninja": [
    "Desktop",
    "Left Click (Hold) = Prepare to slice fruits.",
    "Mouse Movement (Drag) = Slice fruits by dragging the cursor across them.",
    "Mobile",
    "Swipe = Slice fruits by swiping your finger across the screen."
  ],
  "funny-shooter": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space = Jump.",
    "Shift = Run.",
    "R = Reload.",
    "G = Throw a grenade.",
    "1–7 = Switch weapons.",
    "Tab = Pause.",
    "Left Click = Shoot.",
    "Right Click = Aim.",
    "Scroll Wheel = Quickly switch weapons."
  ],
  "funny-shooter-2": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Shift = Run.",
    "Left Click = Shoot.",
    "Right Click = Aim.",
    "R = Reload the weapon.",
    "G = Throw a grenade.",
    "1 = Switch to weapon 1.",
    "2 = Switch to weapon 2.",
    "3 = Switch to weapon 3.",
    "4 = Switch to weapon 4.",
    "5 = Switch to weapon 5.",
    "6 = Switch to weapon 6.",
    "7 = Switch to weapon 7.",
    "Scroll Wheel = Quickly switch weapons.",
    "Tab = Pause the game."
  ],
  "funny-shooter-destroy-all": [
    "Desktop",
    "Mouse Movement = Look around / Aim.",
    "Left Click = Shoot.",
    "Right Click = Precision aim.",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Jump.",
    "Shift = Sprint.",
    "R = Reload.",
    "G = Throw grenade.",
    "1–7 = Weapon selection.",
    "F = Knife attack 1.",
    "Q = Knife attack 2.",
    "T = Inspect weapon.",
    "E = Interact / Drop weapon."
  ],
  "furious-racing-3d": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake.",
    "Left Arrow (←) = Turn left.",
    "Right Arrow (→) = Turn right.",
    "Space = Handbrake.",
    "X = Nitro boost.",
    "C = Switch camera view."
  ],
  "g-switch": [
    "Desktop",
    "Any Key = Switch gravity between the floor and ceiling.",
    "Left Click = Switch gravity between the floor and ceiling.",
    "C = Player 1 switches gravity.",
    "M = Player 2 switches gravity.",
    "Ctrl = Player 3 switches gravity.",
    "Right Arrow (→) = Player 4 switches gravity.",
    "A = Player 5 switches gravity.",
    "Numpad 3 = Player 6 switches gravity."
  ],
  "g-switch-2": [
    "Desktop",
    "Single Player",
    "Any Key = Switch gravity.",
    "Left Click = Switch gravity.",
    "Multiplayer",
    "Assigned Key (e.g., Z, M, C) = Switch gravity for your assigned character."
  ],
  "g-switch-3": [
    "Desktop",
    "Space = Switch gravity.",
    "Up Arrow (↑) = Assigned to an individual player in local multiplayer mode (varies by character selection).",
    "Down Arrow (↓) = Assigned to an individual player in local multiplayer mode (varies by character selection).",
    "Left Arrow (←) = Assigned to an individual player in local multiplayer mode (varies by character selection).",
    "Right Arrow (→) = Assigned to an individual player in local multiplayer mode (varies by character selection).",
    "Mobile",
    "Tap = Switch gravity."
  ],
  "g-switch-4": [
    "Desktop",
    "Any Key = Switch gravity.",
    "Left Click = Switch gravity.",
    "Mobile",
    "Tap = Switch gravity.",
    "Gamepad",
    "Any Button = Switch gravity."
  ],
  "gacha-life": [
    "Desktop",
    "Left Click = Select interactive tabs, configure styling choices, pick chat options with NPCs, and navigate game menus.",
    "Mouse Movement = Move characters or adjust items in Studio Mode by clicking and dragging the cursor around the canvas.",
    "Drag = Reposition active assets while designing scenes.",
    "Mobile",
    "Tap = Select cosmetic gear, move through text conversations, and scroll pages.",
    "Drag = Reposition active assets while designing scenes using the interface screen grid."
  ],
  "galaga": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Fire.",
    "Ctrl = Fire.",
    "X = Fire."
  ],
  "gartic-io": [
    "Desktop",
    "Mouse Movement = Draw when it is your turn.",
    "Keyboard = Type guesses in the chat box.",
    "Left Click = Select drawing tools and colors."
  ],
  "gartic-phone": [
    "Desktop",
    "Enter = Submit text, guesses, or drawings.",
    "Left Click (Hold & Drag) = Draw on the canvas.",
    "Left Click = Select colors, choose tools, navigate the interface, and click Done to submit your turn.",
    "Mobile",
    "Drag = Draw on the screen.",
    "Tap = Navigate menus and select options."
  ],
  "geometry-dash": [
    "Desktop",
    "Space = Jump or interact.",
    "Up Arrow (↑) = Jump or interact.",
    "W = Jump or interact.",
    "A = Move left (Platformer levels only).",
    "D = Move right (Platformer levels only).",
    "Esc = Pause or open the menu.",
    "R = Quick restart (if enabled).",
    "Left Click = Jump or interact. Hold to fly or move upward in supported game modes.",
    "Mobile",
    "Tap = Jump or interact.",
    "Tap and Hold = Fly or move upward (depending on the current game mode)."
  ],
  "geometry-dash-2": [
    "Desktop",
    "Spacebar = Jump or fly upward.",
    "Up Arrow (↑) = Jump or fly upward.",
    "W = Jump or fly upward.",
    "R = Quick reset (Practice mode/from checkpoint).",
    "Ctrl + R = Fully reset the level.",
    "Left Click = Jump, fly upward, or interact.",
    "Mobile",
    "Tap = Jump, fly upward, or interact."
  ],
  "get-on-top": [
    "Desktop",
    "- W = Jump or move up (Player 1).",
    "- A = Lean left (Player 1).",
    "- S = Crouch or move down (Player 1).",
    "- D = Lean right (Player 1).",
    "- Up Arrow (↑) = Jump or move up (Player 2).",
    "- Left Arrow (←) = Lean left (Player 2).",
    "- Down Arrow (↓) = Crouch or move down (Player 2).",
    "- Right Arrow (→) = Lean right (Player 2)."
  ],
  "getaway-shootout": [
    "Desktop",
    "Player 1",
    "W = Jump left.",
    "E = Jump right.",
    "R = Use power-up.",
    "Player 2",
    "I = Jump left.",
    "O = Jump right.",
    "P = Use power-up.",
    "Mobile",
    "Tap (Left Jump Button) = Jump left.",
    "Tap (Right Jump Button) = Jump right.",
    "Tap (Power-up Button) = Activate weapons or items."
  ],
  "getting-over-it": [
    "Desktop",
    "Mouse Movement = Control the hammer's direction and swing.",
    "Left Click = Grip or swing the hammer when held.",
    "Mobile",
    "Drag = Control the hammer's position and movement."
  ],
  "gigga-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Space = Shoot.",
    "E = Enable auto-fire.",
    "R = Disable auto-weapons.",
    "C = Auto-spin.",
    "N = Level up (Sandbox Mode).",
    "Left Click = Shoot.",
    "Mouse Movement = Aim."
  ],
  "gladihoppers": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Attack.",
    "Down Arrow (↓) = Attack.",
    "Left Arrow (←) = Attack.",
    "Right Arrow (→) = Attack.",
    "E = Throw Javelin.",
    "Spacebar = Switch Stances."
  ],
  "go-kart-go-ultra": [
    "Desktop",
    "Player 1",
    "- Up Arrow (↑) = Drive forward.",
    "- Down Arrow (↓) = Reverse.",
    "- Left Arrow (←) = Steer left.",
    "- Right Arrow (→) = Steer right.",
    "- Spacebar = Use item.",
    "- Shift = Jump / Drift.",
    "- Z = Look back.",
    "- Esc / P = Pause.",
    "- M = Mute sound.",
    "Player 2",
    "- W = Drive forward.",
    "- A = Steer left.",
    "- S = Reverse.",
    "- D = Steer right.",
    "- Q = Use item.",
    "- Tab = Jump / Drift.",
    "- E = Look back.",
    "- Esc / P = Pause.",
    "- M = Mute sound."
  ],
  "goalkeeper-challenge": [
    "Desktop",
    "Mouse Movement = Move the goalkeeper's gloves.",
    "Click and Drag = Move the gloves to intercept the ball.",
    "Mobile",
    "Tap = Move the goalkeeper's gloves.",
    "Swipe = Move the goalkeeper's gloves to intercept the ball."
  ],
  "gobble": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Mouse Movement = Move the underground mouth around the level."
  ],
  "gobdun": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "S = Defend / Super-Block.",
    "Down Arrow (↓) = Defend / Super-Block.",
    "Mobile",
    "Tap = Interact with the game environment.",
    "Swipe = Move and interact with the game environment."
  ],
  "gold-digger-frvr": [
    "Desktop",
    "Up Arrow (↑) = Move upward and direct mining.",
    "Down Arrow (↓) = Move downward and direct mining.",
    "Left Arrow (←) = Move left and direct mining.",
    "Right Arrow (→) = Move right and direct mining.",
    "Click and Hold = Guide the miner's movement and actions.",
    "Mobile",
    "Drag = Move the character and control digging direction.",
    "On-screen Buttons = Access inventory, shop, upgrades, and construction tools."
  ],
  "golf-orbit": [
    "Desktop",
    "Up Arrow (↑) = Move upward and direct mining.",
    "Down Arrow (↓) = Move downward and direct mining.",
    "Left Arrow (←) = Move left and direct mining.",
    "Right Arrow (→) = Move right and direct mining.",
    "Click and Hold = Guide the miner's movement and actions.",
    "Mobile",
    "Drag = Move the character and control digging direction.",
    "On-screen Buttons = Access inventory, shop, upgrades, and construction tools."
  ],
  "google-feud": [
    "Desktop",
    "Typing Keys = Enter guesses.",
    "Enter = Submit guess.",
    "Left Click = Navigate menus and select categories."
  ],
  "google-snake": [
    "Desktop",
    "W / Up Arrow (↑) = Move snake up.",
    "A / Left Arrow (←) = Move snake left.",
    "S / Down Arrow (↓) = Move snake down.",
    "D / Right Arrow (→) = Move snake right.",
    "Spacebar / P = Pause or resume the game.",
    "Esc = Open settings or exit to the main menu. [2, 3, 4, 5, 6]",
    "Mobile & Touch Devices",
    "Swipe Up / Down = Move snake vertically.",
    "Swipe Left / Right = Move snake horizontally.",
    "Tap Pause Icon = Pause the game."
  ],
  "gp-moto-racing": [
    "Desktop",
    "W = Accelerate / Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Accelerate / Drive forward.",
    "Left Arrow (←) = Steer left.",
    "Down Arrow (↓) = Reverse.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Brake.",
    "Left Ctrl = Nitro boost.",
    "C = Change camera.",
    "R = Restart.",
    "P = Pause."
  ],
  "gp-moto-racing-3": [
    "Desktop",
    "W = Accelerate forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Accelerate forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Brake.",
    "Left Ctrl = Nitro (Boost)."
  ],
  "grand-prix-hero": [
    "Desktop",
    "Left Arrow (←) = Change lanes.",
    "Right Arrow (→) = Change lanes.",
    "A = Change lanes.",
    "D = Change lanes.",
    "Spacebar = Activate boost.",
    "Enter = Confirm menu selections.",
    "Left Click = Select menu items and upgrades.",
    "Mobile",
    "Swipe Left = Change lanes.",
    "Swipe Right = Change lanes."
  ],
  "grand-vegas-simulator": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Brake/Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Left Arrow (←) = Steer left.",
    "Down Arrow (↓) = Brake/Reverse.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Handbrake."
  ],
  "granny": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "C = Crouch / Stand.",
    "R = Hide / Unhide.",
    "E = Pick up items / Interact.",
    "Space = Drop item.",
    "F = Remove traps / Use special interactions.",
    "Left Click = Use equipped item.",
    "Esc = Pause / Open menu."
  ],
  "grapple-grip": [
    "Desktop",
    "- Left Click = Gather resources, navigate menus, select recipes, and craft items."
  ],
  "gravity-soccer": [
    "Desktop",
    "Mouse Movement = Remove blocks and activate interactive objects.",
    "Left Click = Remove blocks and activate interactive objects.",
    "Restart Button = Reset the current level instantly.",
    "Menu Button = Choose levels or replay stages to improve star collection.",
    "Mobile",
    "Tap = Remove blocks and activate interactive objects.",
    "Restart Button = Reset the current level instantly.",
    "Menu Button = Choose levels or replay stages to improve star collection."
  ],
  "grindcraft": [
    "Desktop",
    "Left Click = Harvest resources, craft items, and manage menus.",
    "Mouse Hover = View required resources and recipes for items.",
    "Mobile & Touch Devices",
    "Tap = Harvest resources, craft items, and navigate tabs.",
    "Long Press = View resource requirements and item descriptions."
  ],
  "grindcraft-remastered": [
    "Desktop",
    "Left Click = Gather resources and craft items.",
    "Mouse Movement = Navigate menus and select resources, tools, and crafting options."
  ],
  "growden-io": [
    "Desktop",
    "- W = Move forward.",
    "- A = Move left.",
    "- S = Move backward.",
    "- D = Move right.",
    "- Space = Jump.",
    "- E = Interact (Harvest, talk to shopkeepers, etc.).",
    "- 1–9 / Number Keys = Select items from the inventory hotbar.",
    "- Left Click = Plant seeds, harvest crops, and navigate menus.",
    "- Right Click = Rotate and adjust the camera angle."
  ],
  "guess-the-kitty": [
    "Desktop",
    "Left Click = Select answers.",
    "Mobile",
    "Tap = Select answers."
  ],
  "gully-cricket": [
    "Mobile",
    "Tap = Execute batting shots.",
    "Swipe = Execute diverse batting shots."
  ],
  "gulper-io": [
    "Desktop",
    "Mouse Movement = Move your gulper.",
    "Left Click = Accelerate.",
    "Spacebar = Accelerate.",
    "Mobile",
    "Touchscreen = Use mobile controls."
  ],
  "gun-blood": [
    "Desktop",
    "Mouse Movement = Place the cursor over the gun barrel to start each round and keep it positioned there during the countdown.",
    "Left Click = Aim and fire when the \"FIRE\" signal appears.",
    "Mobile",
    "Tap and Hold = Place and keep your finger over the gun barrel to begin the round and maintain position during the countdown.",
    "Tap = Aim and shoot when the \"FIRE\" signal appears."
  ],
  "gun-fest": [
    "Desktop",
    "Left Click & Drag = Move your weapon army left and right.",
    "Navigate through gates = Automatically collect or subtract ammo based on path choice."
  ],
  "gun-mayhem-2": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Z = Use primary weapon.",
    "X = Use secondary weapon.",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "T = Use primary weapon.",
    "Y = Use secondary weapon.",
    "Numpad / = Move.",
    "Numpad 7 = Move.",
    "Numpad 8 = Move.",
    "Numpad 9 = Move.",
    "Numpad * = Use primary weapon.",
    "Numpad - = Use secondary weapon.",
    "Numpad 5 = Move.",
    "Numpad 1 = Move.",
    "Numpad 2 = Move.",
    "Numpad 3 = Move.",
    "Numpad 0 = Use primary weapon.",
    "Numpad . = Use secondary weapon."
  ],
  "gun-mayhem-redux": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Z = Use primary fire.",
    "X = Use secondary fire.",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "T = Use primary fire.",
    "Y = Use secondary fire."
  ],
  "gun-spin": [
    "Desktop",
    "Left Click = Shoot.",
    "Spacebar = Shoot.",
    "R = Restart run.",
    "Mouse Movement = Navigate menus.",
    "Mobile",
    "Tap = Shoot.",
    "On-screen Buttons = Access upgrades and restart."
  ],
  "gunmayhem": [
    "Desktop",
    "Up Arrow (↑) = Move upward and jump.",
    "Down Arrow (↓) = Move downward and jump.",
    "Left Arrow (←) = Move left and jump.",
    "Right Arrow (→) = Move right and jump.",
    "[ = Shoot.",
    "] = Drop bomb.",
    "W = Move upward and jump.",
    "A = Move left and jump.",
    "S = Move downward and jump.",
    "D = Move right and jump.",
    "T = Shoot.",
    "Y = Drop bomb.",
    "Numpad 7 = Move and jump.",
    "Numpad 8 = Move and jump.",
    "Numpad 9 = Move and jump.",
    "Numpad * = Shoot.",
    "Numpad - = Drop bomb.",
    "Numpad 5 = Move and jump.",
    "Numpad 1 = Move and jump.",
    "Numpad 2 = Move and jump.",
    "Numpad 3 = Move and jump.",
    "Numpad 0 = Shoot.",
    "Numpad . = Drop bomb."
  ],
  "halloween-lonely-road-racing": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake / Reverse.",
    "Down Arrow (↓) = Brake / Reverse.",
    "A = Steer left.",
    "Left Arrow (←) = Steer left.",
    "D = Steer right.",
    "Right Arrow (→) = Steer right.",
    "Shift = Use Nitro Boost."
  ],
  "halloween-skeleton-smash": [
    "Desktop",
    "A = Steer left.",
    "D = Steer right.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Mouse Movement = Control direction.",
    "Left Click = Control direction.",
    "Mobile",
    "Tap = Steer the Van."
  ],
  "hammer-2": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space = Jump.",
    "Left Click = Shoot.",
    "R = Reload.",
    "F = Interact / Enter vehicle.",
    "1 = Change weapon.",
    "2 = Change weapon.",
    "3 = Change weapon.",
    "Shift = Sprint."
  ],
  "hanger": [
    "Desktop",
    "Left Arrow (←) = Swing left to build momentum.",
    "Right Arrow (→) = Swing right to build momentum.",
    "Up Arrow (↑) = Move up the rope.",
    "Down Arrow (↓) = Move down the rope.",
    "Spacebar = Grab or release the rope.",
    "Click and Hold = Create and attach a rope to the ceiling.",
    "Release = Detach the rope.",
    "Mobile",
    "Tap and Hold = Create and attach a rope to the ceiling.",
    "Release = Detach the rope."
  ],
  "hanger-2": [
    "Desktop",
    "Left Click = Attach or release the rope."
  ],
  "happy-fishing": [
    "Desktop",
    "Left Arrow (←) = Move the hook left.",
    "Right Arrow (→) = Move the hook right.",
    "Left Click = Cast and reel in the hook.",
    "Mouse Movement = Move the hook.",
    "Mobile",
    "Tap = Cast and reel in the hook.",
    "Finger Movement = Move the hook."
  ],
  "happy-room": [
    "Desktop",
    "Mouse Movement = Place and interact with traps and devices.",
    "Left Click = Select, place, and activate equipment.",
    "Drag & Drop = Position devices within the testing room."
  ],
  "happy-wheels": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake or reverse.",
    "Left Arrow (←) = Lean backward.",
    "Right Arrow (→) = Lean forward.",
    "Spacebar = Primary action.",
    "Shift = Secondary action.",
    "Ctrl = Secondary action.",
    "Z = Eject from vehicle.",
    "C = Switch camera.",
    "R = Restart level."
  ],
  "head-basketball": [
    "Desktop",
    "- W = Move forward / Jump / Jump Shot.",
    "- A = Move left.",
    "- S = Move backward / Pump.",
    "- D = Move right.",
    "- Up Arrow (↑) = Jump / Jump Shot.",
    "- Down Arrow (↓) = Pump.",
    "- Left Arrow (←) = Move left.",
    "- Right Arrow (→) = Move right.",
    "- L = Shoot.",
    "- Z = Mega Dunk.",
    "- B = Shoot (Player 1 in 2-Player Mode).",
    "- V = Mega Dunk (Player 1 in 2-Player Mode).",
    "- K = Mega Dunk (Player 2 in 2-Player Mode).",
    "- Double Tap A or D = Dash.",
    "- Double Tap Left Arrow (←) or Right Arrow (→) = Dash."
  ],
  "head-soccer-2022": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Z = Kick.",
    "X = Shoot.",
    "A = Move left.",
    "D = Move right.",
    "W = Jump.",
    "N = Kick.",
    "M = Shoot."
  ],
  "head-soccer-2023": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "N = Shoot.",
    "M = Shoot.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "1 = Shoot.",
    "2 = Shoot."
  ],
  "heads-arena-soccer-all-stars": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space = Kick or Header.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Kick or Header.",
    "K = Kick or Header."
  ],
  "heart-star": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "A = Move left.",
    "D = Move right.",
    "Up Arrow (↑) = Jump.",
    "W = Jump.",
    "Spacebar = Switch Worlds (Character)."
  ],
  "hexanaut-io": [
    "Desktop",
    "W = Change movement direction.",
    "A = Change movement direction.",
    "S = Change movement direction.",
    "D = Change movement direction.",
    "Up Arrow (↑) = Change movement direction.",
    "Down Arrow (↓) = Change movement direction.",
    "Left Arrow (←) = Change movement direction.",
    "Right Arrow (→) = Change movement direction.",
    "Mouse Movement = Direct the movement of your character.",
    "Mobile",
    "Press and Hold = Control movement."
  ],
  "hexbee-merger": [
    "Desktop",
    "Mouse Movement = Select, drag, and place hexagon pieces onto the board.",
    "Left Click = Select, drag, and drop hexagon pieces onto the board.",
    "Pause / Menu Button = Pause the game, open settings, or restart.",
    "Refresh Page = Start a new game if no restart option is provided.",
    "Mobile",
    "Tap & Drag = Select, drag, and place hexagon pieces onto the grid.",
    "Pause / Menu Button = Pause the game, open settings, or restart.",
    "Refresh Page = Start a new game if no restart option is provided."
  ],
  "hextris": [
    "Desktop",
    "Left Arrow (←) = Rotate Hexagon Counter-Clockwise.",
    "Right Arrow (→) = Rotate Hexagon Clockwise.",
    "Mobile",
    "Tap Left Side = Rotate Hexagon Counter-Clockwise.",
    "Tap Right Side = Rotate Hexagon Clockwise."
  ],
  "hide-and-smash": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Left Click = Aim and Smash."
  ],
  "highway-bike-simulator": [
    "Desktop",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Shift = Perform wheelie."
  ],
  "highway-racer": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake.",
    "Down Arrow (↓) = Brake.",
    "A = Steer left.",
    "D = Steer right.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Space = Handbrake."
  ],
  "highway-rider-extreme": [
    "Desktop",
    "Left Arrow (←) = Steer the motorcycle left.",
    "Right Arrow (→) = Steer the motorcycle right.",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake.",
    "Mobile",
    "Tap = Steer and control the motorcycle.",
    "Swipe = Steer and control the motorcycle."
  ],
  "highway-traffic": [
    "Desktop",
    "W = Accelerate / Drive forward.",
    "Up Arrow (↑) = Accelerate / Drive forward.",
    "A = Steer left.",
    "D = Steer right.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Handbrake.",
    "Left Shift = Boost.",
    "F = Boost."
  ],
  "hill-climb-racing": [
    "Desktop",
    "Right Arrow (→) = Accelerate.",
    "D = Accelerate.",
    "Left Arrow (←) = Brake / Reverse.",
    "A = Brake / Reverse.",
    "Right Click = Accelerate.",
    "Left Click = Brake / Reverse.",
    "Mobile",
    "Tap Right Side of Screen = Accelerate.",
    "Tap Left Side of Screen = Brake / Reverse."
  ],
  "hill-climb-racing-2": [
    "Mobile",
    "Right Side of Screen = Accelerate and tilt the vehicle forward/nose down while airborne.",
    "Left Side of Screen = Brake/reverse and tilt the vehicle backward/nose up while airborne.",
    "Both Sides of Screen = Perform specific vehicle actions."
  ],
  "hills-of-steel": [
    "Desktop",
    "A = Drive tank left.",
    "D = Drive tank right.",
    "Left Arrow (←) = Drive tank left.",
    "Right Arrow (→) = Drive tank right.",
    "Spacebar = Shoot.",
    "B = Repair tank.",
    "Mobile",
    "Tap Left Side = Drive tank left.",
    "Tap Right Side = Drive tank right.",
    "Tap Fire Button = Shoot.",
    "Touch Controls = Drive, shoot, and activate abilities."
  ],
  "hole-io": [
    "Desktop",
    "Mouse Movement = Steer the hole.",
    "W = Move the hole.",
    "A = Move the hole.",
    "S = Move the hole.",
    "D = Move the hole.",
    "Up Arrow (↑) = Move the hole.",
    "Down Arrow (↓) = Move the hole.",
    "Left Arrow (←) = Move the hole.",
    "Right Arrow (→) = Move the hole.",
    "Mobile",
    "Drag = Move in any direction."
  ],
  "hoop-world-3d": [
    "Desktop",
    "Left Click = Perform flips in the air.",
    "Spacebar = Perform flips in the air.",
    "Release = Attempt a dunk.",
    "Mobile",
    "Tap and Hold = Perform flips.",
    "Release = Attempt a dunk."
  ],
  "hop-&-pop-it": [
    "Mobile",
    "Tap = Pop bubbles."
  ],
  "horse-shoeing": [
    "Desktop",
    "Left Click (Hold and Drag) = Interact with tools and complete mini-games.",
    "Mobile",
    "Touch and Hold = Perform actions on mobile devices."
  ],
  "horse-simulator-3d": [
    "Desktop",
    "- W = Move forward.",
    "- A = Move left.",
    "- S = Move backward.",
    "- D = Move right.",
    "- Up Arrow (↑) = Move upward.",
    "- Down Arrow (↓) = Move downward.",
    "- Left Arrow (←) = Move left.",
    "- Right Arrow (→) = Move right.",
    "- Space = Jump.",
    "- Shift = Run.",
    "- Left Click = Attack."
  ],
  "house-of-hazards": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "W = Jump.",
    "S = Crouch / Activate.",
    "J = Move left.",
    "L = Move right.",
    "Y = Jump.",
    "K = Crouch / Activate.",
    "Left Stick = Move.",
    "South Button = Jump.",
    "East Button = Crouch / Activate."
  ],
  "hover-racer": [
    "Desktop",
    "A = Steer hovercraft left.",
    "D = Steer hovercraft right.",
    "Left Arrow (←) = Steer hovercraft left.",
    "Right Arrow (→) = Steer hovercraft right.",
    "Mobile",
    "Tap Left Side = Move left.",
    "Tap Right Side = Move right."
  ],
  "icy-purple-head-2": [
    "Desktop",
    "Left Click = Become icy.",
    "Release = Return to sticky mode.",
    "Spacebar = Become icy.",
    "Mobile",
    "Tap and Hold = Become icy.",
    "Lift Finger = Return to sticky mode."
  ],
  "icy-purple-head-3": [
    "Desktop",
    "Left Click (Hold) = Transform into Icy Form and slide.",
    "Left Click (Release) = Return to Purple Form.",
    "Mobile",
    "Touch and Hold = Transform into Icy Form and slide.",
    "Release Touch = Return to Purple Form."
  ],
  "icy-purple-head-superslide": [
    "Desktop",
    "Left Click (Hold) = Transform into Ice (Slide).",
    "Release Mouse Button = Return to Normal Form (Stick).",
    "Mobile",
    "Touch and Hold = Transform into Ice (Slide).",
    "Release Touch = Return to Normal Form (Stick)."
  ],
  "icycle": [
    "Desktop",
    "Left Arrow (←) = Move / Accelerate left.",
    "Right Arrow (→) = Move / Accelerate right.",
    "A = Move / Accelerate left.",
    "D = Move / Accelerate right.",
    "Up Arrow (↑) = Jump.",
    "W = Jump.",
    "Down Arrow (↓) = Glide using umbrella.",
    "S = Glide using umbrella."
  ],
  "idle-ants": [
    "Desktop",
    "Left Click = Interact and boost ants.",
    "Spacebar = Temporary speed boost.",
    "Mobile",
    "Tap = Interact and boost ants."
  ],
  "idle-breakout": [
    "Desktop",
    "Left Click = Purchase balls, upgrades, and enhancements.",
    "Left Click = Click on bricks to deal manual damage.",
    "Mobile",
    "Tap = Select buttons to purchase balls, upgrades, and enhancements.",
    "Tap = Tap bricks to deal manual damage."
  ],
  "idle-dice": [
    "Desktop",
    "Left Click = Roll the dice manually and interact with menus.",
    "Spacebar = Quickly roll the dice without using the mouse.",
    "Mouse Clicks = Purchase upgrades, unlock new dice, and navigate game options.",
    "Mobile",
    "Tap = Roll the dice manually to earn points faster.",
    "Tap = Purchase upgrades and expand your dice collection.",
    "Swipe = Browse different sections and features."
  ],
  "idle-digging-tycoon": [
    "Desktop",
    "Left Click = Dig the ground and interact with the game.",
    "Mobile",
    "Tap = Dig the ground and interact with the game."
  ],
  "idle-football-manager": [
    "Desktop",
    "Left Click = Manage players and purchase upgrades.",
    "Mouse Movement = Navigate menus and interact with game features."
  ],
  "idle-light-city": [
    "Desktop",
    "Left Click = Interact with menus and upgrades.",
    "Mouse Movement = View tooltips and information.",
    "Scroll Wheel = Scroll around the map.",
    "Mobile",
    "Tap = Select buildings and purchase upgrades.",
    "Pinch = Zoom in or out.",
    "Drag = Move around the city map."
  ],
  "idle-lumber-inc": [
    "Desktop",
    "Left Click = Interact with land, workers, buildings, and upgrades.",
    "Mobile",
    "Tap = Interact with land, workers, buildings, and upgrades."
  ],
  "idle-miner": [
    "Desktop",
    "Left Click = Interact with the game."
  ],
  "idle-mining-empire": [
    "Desktop",
    "Mouse Movement = Click menus, upgrades, and management options.",
    "Hold Click = Perform long-press actions for faster spending.",
    "Mobile",
    "Tap = Collect resources and purchase upgrades.",
    "Hold Tap = Perform long-press actions for faster spending."
  ],
  "idle-restaurants": [
    "Desktop",
    "Left Click = Interact with menus, upgrade facilities, and navigate the game interface.",
    "Scroll Wheel = Zoom in / Zoom out.",
    "Mobile",
    "Tap = Interact with menus, upgrade facilities, and navigate the game interface.",
    "Pinch = Zoom in / Zoom out."
  ],
  "idle-startup-tycoon": [
    "Desktop",
    "Left Click = Select, upgrade, hire, and manage tasks.",
    "Drag / Scroll = Navigate between sections and around the office."
  ],
  "idle-tree-city": [
    "Desktop",
    "Mouse Movement = Plant trees, manage workers, select plots, and interact with menus.",
    "Mobile",
    "Tap = Plant, upgrade, and collect resources.",
    "Pinch = Zoom in or out."
  ],
  "impossible-monster-truck": [
    "Desktop",
    "W = Accelerate / Drive forward.",
    "Up Arrow (↑) = Accelerate / Drive forward.",
    "S = Brake / Reverse.",
    "Down Arrow (↓) = Brake / Reverse.",
    "A = Steer left.",
    "Left Arrow (←) = Steer left.",
    "D = Steer right.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Handbrake.",
    "Esc = Pause the game."
  ],
  "impossible-tic-tac-toe": [
    "Desktop",
    "Mouse Movement = Select a grid space and place your mark.",
    "Left Click = Select a grid space and place your mark.",
    "R = Start a new round instantly.",
    "Restart Button = Start a new round instantly.",
    "Menu Options = Adjust settings, choose who moves first, or switch available modes.",
    "Mobile",
    "Tap = Select a grid space and place your mark."
  ],
  "indian-truck": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake / Reverse.",
    "Down Arrow (↓) = Brake / Reverse.",
    "A = Turn left.",
    "Left Arrow (←) = Turn left.",
    "D = Turn right.",
    "Right Arrow (→) = Turn right.",
    "C = Change camera.",
    "L = Turn on headlights.",
    "H = Use horn.",
    "P = Pause.",
    "Mobile",
    "On-screen Buttons = Accelerate / Brake / Reverse.",
    "Steering / Arrows = Turn left / right."
  ],
  "indian-truck-simulator-3d": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake / Reverse.",
    "Down Arrow (↓) = Brake / Reverse.",
    "A = Steer left.",
    "Left Arrow (←) = Steer left.",
    "D = Steer right.",
    "Right Arrow (→) = Steer right.",
    "Space = Handbrake.",
    "Mobile",
    "On-screen Steering Wheel / Buttons = Steer, accelerate, and brake."
  ],
  "indian-uphill-bus-simulator-3d": [
    "Desktop",
    "W = Accelerate / Drive forward.",
    "Up Arrow (↑) = Accelerate / Drive forward.",
    "S = Brake / Reverse.",
    "Down Arrow (↓) = Brake / Reverse.",
    "A = Turn left.",
    "Left Arrow (←) = Turn left.",
    "D = Turn right.",
    "Right Arrow (→) = Turn right.",
    "Mobile",
    "On-screen Pedal = Accelerate.",
    "On-screen Pedal = Brake.",
    "On-screen Wheel / Arrows = Steer bus.",
    "On-screen Camera Icon = Toggle camera view."
  ],
  "infiltrating-the-airship": [
    "Desktop",
    "Left Click = Select options and make choices."
  ],
  "infinite-soccer": [
    "Desktop",
    "A = Move left.",
    "Left Arrow (←) = Move left.",
    "D = Move right.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Jump.",
    "Up Arrow (↑) = Jump.",
    "S = Slide.",
    "Down Arrow (↓) = Slide."
  ],
  "infinity-loop": [
    "Desktop",
    "Left Click = Rotate the selected puzzle piece clockwise to change its orientation.",
    "Mobile",
    "Tap = Rotate the selected puzzle piece clockwise to change its orientation."
  ],
  "interactive-buddy": [
    "Desktop",
    "Left Click (Hold and Drag) = Interact with, move, or throw the Buddy and various objects.",
    "Left Click = Select tools, weapons, gadgets, and items from the on-screen menus."
  ],
  "iron-snout": [
    "Desktop",
    "Up Arrow (↑) = Jump.",
    "W = Jump.",
    "Down Arrow (↓) = Duck.",
    "S = Duck.",
    "Left Arrow (←) = Attack left.",
    "A = Attack left.",
    "Right Arrow (→) = Attack right.",
    "D = Attack right.",
    "Mobile",
    "Tap = Attack in the direction of tap.",
    "Swipe = Attack in the direction of swipe.",
    "Swipe Up = Jump.",
    "Swipe Down = Duck."
  ],
  "iron-snout-2": [
    "Desktop",
    "Left Arrow (←) = Attack left.",
    "A = Attack left.",
    "Right Arrow (→) = Attack right.",
    "D = Attack right.",
    "Up Arrow (↑) = Jump / Uppercut.",
    "W = Jump / Uppercut.",
    "Down Arrow (↓) = Duck / Stomp.",
    "S = Duck / Stomp.",
    "Mobile",
    "Tap Left Side = Attack left.",
    "Tap Right Side = Attack right.",
    "Swipe Up = Jump."
  ],
  "jacksmith": [
    "Desktop",
    "Left Click = Navigate menus, select materials, operate forging tools, collect loot during battles, and fire the cannon.",
    "1 = Activate cannonball type 1.",
    "2 = Activate cannonball type 2.",
    "3 = Activate cannonball type 3.",
    "4 = Activate cannonball type 4.",
    "5 = Activate cannonball type 5.",
    "6 = Activate cannonball type 6.",
    "M = Open the Info Menu.",
    "I = Open the Inventory Menu.",
    "B = Open the Bestiary Menu.",
    "D = Open the Design Menu.",
    "H = Open the Help Menu.",
    "Up Arrow (↑) = Navigate menus and scroll through pages of weapon parts.",
    "Down Arrow (↓) = Navigate menus and scroll through pages of weapon parts.",
    "Left Arrow (←) = Navigate menus and scroll through pages of weapon parts.",
    "Right Arrow (→) = Navigate menus and scroll through pages of weapon parts."
  ],
  "jelly-truck": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake / Reverse.",
    "Left Arrow (←) = Tilt left.",
    "Right Arrow (→) = Tilt right.",
    "Mobile",
    "On-screen Touch Buttons = Drive and tilt the vehicle."
  ],
  "jet-boy": [
    "Desktop",
    "Left Click = Fly upward / thrust.",
    "Space = Fly upward / thrust.",
    "W = Fly upward / thrust.",
    "Up Arrow (↑) = Fly upward / thrust.",
    "Release = Drop down.",
    "Mobile",
    "Tap and Hold = Fly upward / thrust.",
    "Release = Drop down."
  ],
  "jetpack-joyride": [
    "Desktop",
    "Spacebar = Fly upward.",
    "Release Spacebar = Fall downward.",
    "Left Click = Fly upward.",
    "Release Left Click = Fall downward.",
    "Mobile",
    "Tap and Hold = Fly upward.",
    "Release Touch = Fall downward."
  ],
  "jewel-shuffle": [
    "Desktop",
    "Left Click = Click a jewel and then click an adjacent jewel to swap positions, or click and drag a jewel to move it."
  ],
  "jewels-blitz-5": [
    "Desktop",
    "Left Click = Swap gems to create match-3 combinations.",
    "Drag = Swap gems to create match-3 combinations.",
    "Mobile",
    "Tap and Drag = Swap gems to create match-3 combinations.",
    "Tap = Activate boosters and power-ups."
  ],
  "johnny-revenge": [
    "Desktop",
    "Mouse Movement = Aim.",
    "Left Click = Shoot."
  ],
  "johnny-trigger": [
    "Desktop",
    "Mouse Movement = Aim.",
    "Left Click = Shoot.",
    "Mobile",
    "Drag = Aim.",
    "Tap = Shoot."
  ],
  "johnny-upgrade": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "A = Move left.",
    "D = Move right.",
    "Up Arrow (↑) = Jump.",
    "W = Jump.",
    "Spacebar = Jump.",
    "X = Shoot (after unlocking the blaster upgrade)."
  ],
  "jollyworld": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake / Reverse.",
    "Left Arrow (←) = Accelerate, brake, and lean/balance the vehicle.",
    "Right Arrow (→) = Accelerate, brake, and lean/balance the vehicle.",
    "Spacebar = Jump.",
    "Shift = Use special ability or action.",
    "Z = Use special ability or action.",
    "Ctrl = Turn around (reverse direction)."
  ],
  "jump-up-3d": [
    "Desktop",
    "Space = Jump / Shoot.",
    "Left Click = Jump / Shoot.",
    "Mobile",
    "Tap = Jump / Shoot."
  ],
  "jump-up-3d-mini-basketball": [
    "Desktop",
    "Spacebar = Jump and shoot.",
    "Left Click = Jump and shoot.",
    "Mobile",
    "Tap = Jump and shoot."
  ],
  "jumping-shell": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Jump.",
    "Up Arrow (↑) = Jump.",
    "Double Press W = Exit your shell.",
    "Double Press Up Arrow (↑) = Exit your shell.",
    "B = Back / Pause.",
    "ESC = Back / Pause.",
    "R = Restart the current level."
  ],
  "jungle-td": [
    "Desktop",
    "W = Move the map upward.",
    "A = Move the map left.",
    "S = Move the map downward.",
    "D = Move the map right.",
    "Up Arrow (↑) = Move the map upward.",
    "Down Arrow (↓) = Move the map downward.",
    "Left Arrow (←) = Move the map left.",
    "Right Arrow (→) = Move the map right.",
    "Left Click = Select / Play / Interact."
  ],
  "just-fall-lol": [
    "Desktop",
    "Up Arrow (↑) = Move.",
    "Down Arrow (↓) = Move.",
    "Left Arrow (←) = Move.",
    "Right Arrow (→) = Move.",
    "W = Move.",
    "A = Move.",
    "S = Move.",
    "D = Move.",
    "Spacebar = Jump.",
    "Mouse Movement = Control the character."
  ],
  "kart-fight-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Left Click = Move and steer character."
  ],
  "kart-race-3d": [
    "Desktop",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake / Reverse.",
    "Mobile",
    "Left Button = Steer left.",
    "Right Button = Steer right.",
    "Gas Pedal Button = Accelerate.",
    "Brake Pedal Button = Brake / Reverse."
  ],
  "kart-wars": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake / Reverse.",
    "Down Arrow (↓) = Brake / Reverse.",
    "A = Steer left.",
    "Left Arrow (←) = Steer left.",
    "D = Steer right.",
    "Right Arrow (→) = Steer right.",
    "Space = Jump.",
    "Shift = Nitro / Turbo boost.",
    "Left Click = Shoot weapons."
  ],
  "kawaii-dressup": [
    "Desktop",
    "Mouse Movement = Select and apply outfits, hairstyles, accessories, and customization items.",
    "Mobile",
    "Tap = Customize the character with outfits, hairstyles, accessories, and other items."
  ],
  "kirka-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space = Jump.",
    "P = Open weapon selection menu.",
    "Esc = Open weapon selection menu.",
    "Left Click = Shoot.",
    "Right Click = Aim.",
    "X = Aim.",
    "Shift = Crouch.",
    "E = Dash.",
    "1 = Switch weapon.",
    "2 = Switch weapon.",
    "3 = Switch weapon."
  ],
  "kix-dream-soccer": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Left Arrow (←) = Move left.",
    "Down Arrow (↓) = Move downward.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Pass, shoot, or tackle.",
    "C = Change player.",
    "X = Hard tackle."
  ],
  "knight-hero-adventure-idle-rpg": [
    "Desktop",
    "Left Click = Navigate menus, select upgrades, and interact with the game interface."
  ],
  "kour-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space = Jump.",
    "Esc = Open pause menu.",
    "Left Click = Shoot.",
    "Right Click = Aim.",
    "Shift = Crouch.",
    "C = Crouch.",
    "E = Dash.",
    "B = Use an emote or dance.",
    "F = Inspect your weapon.",
    "1 = Switch weapon.",
    "2 = Switch weapon.",
    "3 = Switch weapon."
  ],
  "krunker-io": [
    "Desktop",
    "W = Move forward.",
    "A = Strafe left.",
    "S = Move backward.",
    "D = Strafe right.",
    "Space = Jump.",
    "Shift = Crouch.",
    "R = Reload.",
    "E = Switch to secondary weapon.",
    "Q = Switch to melee weapon.",
    "1 = Use Killstreak 1.",
    "2 = Use Killstreak 2.",
    "3 = Use Killstreak 3.",
    "Mouse Movement = Look and aim.",
    "Left Click = Primary fire.",
    "Right Click = Aim Down Sights (ADS)."
  ],
  "leader-strike": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Mouse Movement = Aim.",
    "Left Click = Shoot.",
    "Right Click = Aim Down Sights.",
    "R = Reload.",
    "Number Keys = Switch weapons when available."
  ],
  "learn-to-fly": [
    "Desktop",
    "Left Arrow (←) = Adjust flight angle left.",
    "Right Arrow (→) = Adjust flight angle right.",
    "Spacebar = Activate rockets."
  ],
  "learntofly2": [
    "Desktop",
    "Left Arrow (←) = Control flight angle left.",
    "Right Arrow (→) = Control flight angle right.",
    "A = Control flight angle left.",
    "D = Control flight angle right.",
    "Spacebar = Activate boosters.",
    "Any Key = Activate special items when equipped."
  ],
  "level-devil": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Jump.",
    "Up Arrow (↑) = Jump.",
    "Spacebar = Jump.",
    "Mobile",
    "On-Screen Arrow Buttons = Move.",
    "Jump Button = Jump."
  ],
  "life-choices-life-simulator": [
    "Desktop",
    "Left Click = Select characters and choose options."
  ],
  "life-the-game": [
    "Desktop",
    "Mouse Movement = Navigate and interact.",
    "Left Click = Select and perform actions."
  ],
  "linebacker-alley-2": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Speed boost.",
    "S = Spin move.",
    "A = Jump.",
    "D = Flip."
  ],
  "lines-to-fill": [
    "Desktop",
    "Left Click + Drag = Move and place blocks.",
    "Mobile",
    "Drag = Move blocks on mobile devices."
  ],
  "little-master-cricket": [
    "Desktop",
    "Mouse Movement = Swing and control the bat.",
    "Mobile",
    "Swipe = Swing and control the bat."
  ],
  "lolbeans-io": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Move forward.",
    "Down Arrow (↓) = Move backward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Jump.",
    "Right Click = Jump.",
    "Mouse Movement = Look around.",
    "Mobile",
    "Virtual Joystick (Left Side) = Move.",
    "Swipe Right Side = Look around.",
    "Tap Button = Jump."
  ],
  "lolshot-io": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Spacebar = Jump.",
    "1–8 = Switch weapons.",
    "Enter = Chat.",
    "Esc = Open settings.",
    "Left Click = Shoot.",
    "Right Click = Jump.",
    "Scroll Wheel = Switch weapons."
  ],
  "love-tester": [
    "Desktop",
    "Typing Keys = Type names.",
    "Left Click = Enter names and check results."
  ],
  "ludo-hero": [
    "Desktop",
    "Left Click = Roll the dice and move pawns.",
    "Mouse Movement = Navigate menus and select actions."
  ],
  "ludo-multiplayer": [
    "Desktop",
    "Left Click = Roll dice or select token.",
    "Mouse = Navigate menus.",
    "Click = Move highlighted token.",
    "Mobile",
    "Tap = Roll dice or select token.",
    "Tap = Move highlighted token.",
    "Touch Controls = Navigate menus."
  ],
  "lurkers-io": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "B = Open crafting menu.",
    "C = Drop item.",
    "R = Reload.",
    "Shift = Sprint.",
    "0–9 = Equip items.",
    "Enter = Chat.",
    "TAB = Open scoreboard.",
    "H = Show help window.",
    "M = Mute sound.",
    "ALT = Show all health bars.",
    "Left Click = Use item, place block, or repair.",
    "Right Click = Attack, destroy block, interact, or nail."
  ],
  "mad-day": [
    "Desktop",
    "Spacebar = Jump.",
    "X = Launch rockets.",
    "Up Arrow (↑) = Launch rockets."
  ],
  "mad-gunz": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Space = Jump.",
    "Left Click = Shoot.",
    "R = Reload.",
    "1–5 = Change weapons.",
    "Mobile",
    "Joystick = Move.",
    "Right Side of Screen = Aim.",
    "Shoot Button = Shoot.",
    "Jump Button = Jump.",
    "Reload Button = Reload.",
    "Weapon Buttons = Switch weapons."
  ],
  "mad-shark": [
    "Desktop",
    "Up Arrow (↑) = Move up.",
    "Down Arrow (↓) = Move down.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Space = Shoot or fire lasers.",
    "Z = Shoot or fire lasers.",
    "Shift = Use bombs or special attacks.",
    "X = Use bombs or special attacks."
  ],
  "mad-truck-challenge": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake.",
    "W = Accelerate.",
    "S = Brake or reverse.",
    "Left Arrow (←) = Tilt truck left.",
    "Right Arrow (→) = Tilt truck right.",
    "A = Tilt truck left.",
    "D = Tilt truck right.",
    "Spacebar = Use Nitro boost.",
    "X = Fire rockets."
  ],
  "madalin-cars-multiplayer": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake or reverse.",
    "Down Arrow (↓) = Brake or reverse.",
    "A = Steer left.",
    "Left Arrow (←) = Steer left.",
    "D = Steer right.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Handbrake.",
    "Shift = Nitro.",
    "C = Change camera view.",
    "R = Respawn or reset car.",
    "T = Open map view."
  ],
  "madalin-stunt-cars-2": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Left Shift = Use Nitro.",
    "Q = Change graphics quality.",
    "R = Reset vehicle position.",
    "Y = Restart game.",
    "T = Show map.",
    "F = Full screen.",
    "G = Switch between automatic and manual transmission.",
    "H = Turn police lights on/off.",
    "J = Change engine sound.",
    "C = Change camera view.",
    "B = Show center rearview mirror.",
    "M = Return to main menu."
  ],
  "madalin-stunt-cars-3": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake or reverse.",
    "Down Arrow (↓) = Brake or reverse.",
    "A = Steer left.",
    "Left Arrow (←) = Steer left.",
    "D = Steer right.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Handbrake or E-brake.",
    "F = Nitro boost.",
    "C = Change camera.",
    "T = Toggle minimap or map.",
    "R = Respawn or reset vehicle."
  ],
  "magikmon": [
    "Desktop",
    "Left Click = Move and interact with characters or objects."
  ],
  "make-up-runner": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "A = Move left.",
    "Right Arrow (→) = Move right.",
    "D = Move right.",
    "Up Arrow (↑) = Jump.",
    "W = Jump.",
    "Left Click (Hold & Drag) = Move character left or right.",
    "Left Click (Click) = Jump."
  ],
  "marble-dash": [
    "Desktop",
    "Mouse Movement = Aim shooter.",
    "Left Click = Shoot marble.",
    "Space = Switch between available marbles.",
    "Mobile",
    "Drag = Aim shooter.",
    "Tap = Shoot marble.",
    "Tap Launcher = Switch between available marbles."
  ],
  "marbles-sorting": [
    "Desktop",
    "Left Click = Select a tube to pick up the top ball.",
    "Left Click = Select a destination tube to place the ball."
  ],
  "masked-forces": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Move forward.",
    "Down Arrow (↓) = Move backward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Space = Jump.",
    "C = Crouch.",
    "R = Reload.",
    "F = Pick up weapon.",
    "Tab = Open menu.",
    "Number Keys = Switch weapons.",
    "Left Click = Shoot.",
    "Right Click = Aim.",
    "Mouse Wheel = Switch weapons."
  ],
  "master-checkers": [
    "Desktop",
    "Mouse Click = Select and move pieces."
  ],
  "master-chess": [
    "Desktop",
    "Left Click = Select and move a piece.",
    "Mobile",
    "Tap and Drag = Select and move a piece."
  ],
  "maze-path-of-light": [
    "Desktop",
    "Arrow Keys = Navigate the beam of light through the maze.",
    "W = Navigate the beam upward.",
    "A = Navigate the beam left.",
    "S = Navigate the beam downward.",
    "D = Navigate the beam right.",
    "Left Click = Select path direction at intersections."
  ],
  "maze-planet-3d": [
    "Desktop",
    "W = Move the ball upward.",
    "A = Move the ball left.",
    "S = Move the ball downward.",
    "D = Move the ball right.",
    "Up Arrow (↑) = Move the ball upward.",
    "Down Arrow (↓) = Move the ball downward.",
    "Left Arrow (←) = Move the ball left.",
    "Right Arrow (→) = Move the ball right."
  ],
  "mega-ramp-car-stunts": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Space = Handbrake.",
    "Left Shift = Nitro (NOS).",
    "R = Respawn vehicle.",
    "C = Change camera view."
  ],
  "merc-zone": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Spacebar = Jump.",
    "Left Click = Shoot.",
    "Right Click = Aim Down Sights.",
    "R = Reload.",
    "E = Switch weapon.",
    "Mouse Wheel = Switch weapon.",
    "G = Throw grenade.",
    "C = Crouch.",
    "Shift = Crouch.",
    "F = Interact."
  ],
  "merge-alphabet": [
    "Desktop",
    "Left Click = Select and merge units.",
    "Mouse Movement = Navigate and interact with the game.",
    "Mobile",
    "Tap = Select and merge units.",
    "Touchscreen = Navigate and interact with the game."
  ],
  "merge-cakes": [
    "Desktop",
    "Left Click = Drag cakes.",
    "Release Mouse Button = Drop and merge matching cakes.",
    "Mobile",
    "Tap and Hold = Drag cakes with one finger.",
    "Tap = Interact with gifts, rewards, and menu buttons.",
    "Release = Drop cakes to merge matching desserts and unlock new recipes."
  ],
  "merge-cyber-racers": [
    "Desktop",
    "Left Click = Select, drag, and move cars.",
    "Drag and Drop = Merge matching vehicles or place them on the race track."
  ],
  "merge-harvest": [
    "Desktop",
    "Left Click = Click, drag, and merge items.",
    "Drag and Drop = Combine matching objects and move resources around the farm.",
    "Mobile",
    "Tap and Hold = Select and drag items.",
    "Drag and Drop = Merge matching objects and manage your farm.",
    "Tap = Interact with buildings, crops, chests, rewards, and other farm elements."
  ],
  "merge-master": [
    "Desktop",
    "Drag Left Click = Merge dinosaurs and warriors.",
    "Mobile",
    "Tap and Drag = Merge matching units.",
    "Tap = Select and manage characters."
  ],
  "merge-party": [
    "Desktop",
    "Left Click = Activate generators, select items, and drag items across the game board.",
    "Click and Drag = Reposition items or combine matching pieces.",
    "Mobile",
    "Tap = Activate generators, select items, and navigate through menus or quest objectives.",
    "Drag = Move items across the grid to merge matching objects."
  ],
  "merge-rainbow": [
    "Mobile",
    "Drag = Select and combine identical units on the board.",
    "Tap = Interact with game menus and interface buttons."
  ],
  "merge-round-racers": [
    "Desktop",
    "Left Click = Select, drag, and move cars.",
    "Drag and Drop = Merge matching vehicles or place them on the race track.",
    "Mobile",
    "Tap and Drag = Move and merge cars.",
    "Tap = Interact with menus and game features"
  ],
  "microwars": [
    "Desktop",
    "Left Click & Drag = Draw a line from one base to another to send your troops.",
    "Mobile",
    "Tap or Drag = Send troops from one base to another."
  ],
  "minecraft-builder": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Space = Jump.",
    "Left Click = Mine or break blocks.",
    "Right Click = Place blocks.",
    "E = Open inventory.",
    "1–9 = Select items from hotbar.",
    "Mobile",
    "Left Side of Screen = Move character.",
    "Right Side of Screen = Look around and aim.",
    "Tap Blocks = Mine or interact.",
    "Tap Item in Hotbar = Select block or tool."
  ],
  "minecraft-case-simulator": [
    "Desktop",
    "Left Click = Select, open cases, and navigate menus.",
    "Mobile",
    "Tap = Select, open cases, and interact with menu elements."
  ],
  "minecraft-classic": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Space = Jump.",
    "Left Shift = Run.",
    "Z = Toggle fly mode.",
    "Q = Move down while flying.",
    "E = Move up while flying.",
    "X = Enable noclip or move through blocks while flying.",
    "B = Open inventory.",
    "T = Chat.",
    "Enter = Set spawn point.",
    "G = Drop item.",
    "F = Toggle fog.",
    "Esc = Open menu.",
    "Left Click = Destroy block.",
    "Right Click = Place block.",
    "Mouse Wheel / 1–9 = Select block in hotbar."
  ],
  "minesweeper": [
    "Desktop",
    "Arrow Keys = Move cursor in specific web versions.",
    "Space = Flag a cell in some versions.",
    "Left Click = Reveal a cell.",
    "Right Click = Place or remove a flag.",
    "Left + Right Click = Chord and reveal adjacent cells when flag count matches the hint.",
    "Mobile",
    "Tap = Reveal a cell.",
    "Long Press = Place or remove a flag."
  ],
  "minibattles": [
    "Desktop",
    "Player 1 = C.",
    "Player 2 = N.",
    "Player 3 = Q.",
    "Player 4 = P.",
    "Player 5 = Left Arrow (←).",
    "Player 6 = Right Arrow (→)."
  ],
  "mob-city": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Move forward.",
    "Down Arrow (↓) = Move backward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Space = Jump.",
    "J = Jump.",
    "Left Shift = Activate Hammer Time.",
    "C = Activate Hammer Time.",
    "Q = Switch weapons.",
    "E = Switch weapons.",
    "Enter = Enter vehicle.",
    "Esc = Pause game.",
    "P = Pause game.",
    "M = Toggle sound.",
    "V = Change camera view.",
    "Mouse Movement = Aim.",
    "Left Click = Fire weapon.",
    "Z = Fire weapon.",
    "Right Click = Throw grenade.",
    "X = Throw grenade.",
    "Mouse Wheel = Switch weapons."
  ],
  "money-movers": [
    "Desktop",
    "W = Move small brother forward.",
    "A = Move small brother left.",
    "S = Move small brother backward.",
    "D = Move small brother right.",
    "Up Arrow (↑) = Move big brother forward.",
    "Down Arrow (↓) = Move big brother backward.",
    "Left Arrow (←) = Move big brother left.",
    "Right Arrow (→) = Move big brother right.",
    "S / Down Arrow (↓) = Interact or pick up objects."
  ],
  "money-movers-2": [
    "Desktop",
    "W = Move and jump smaller brother forward.",
    "A = Move and jump smaller brother left.",
    "S = Move and jump smaller brother backward.",
    "D = Move and jump smaller brother right.",
    "Up Arrow (↑) = Move and jump bigger brother forward.",
    "Down Arrow (↓) = Move and jump bigger brother backward.",
    "Left Arrow (←) = Move and jump bigger brother left.",
    "Right Arrow (→) = Move and jump bigger brother right."
  ],
  "money-movers-3": [
    "Desktop",
    "Guard Controls",
    "W = Move guard forward.",
    "A = Move guard left.",
    "S = Move guard backward.",
    "D = Move guard right.",
    "Spacebar = Jump or perform actions.",
    "Dog Controls",
    "Up Arrow (↑) = Move dog forward.",
    "Down Arrow (↓) = Move dog backward.",
    "Left Arrow (←) = Move dog left.",
    "Right Arrow (→) = Move dog right.",
    "Spacebar = Jump or perform actions.",
    "Z = Jump or perform actions."
  ],
  "money-roller": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Mouse Drag = Move left/right.",
    "Mobile",
    "Tap and Drag = Move left/right."
  ],
  "money-rush": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Jump.",
    "Shift = Activate power-ups."
  ],
  "monkey-mart": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Move forward.",
    "Down Arrow (↓) = Move backward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Mobile",
    "Touch and Drag = Move the monkey around the market."
  ],
  "monster-tracks": [
    "Desktop",
    "W = Accelerate and move forward.",
    "Up Arrow (↑) = Accelerate and move forward.",
    "S = Brake or reverse the truck.",
    "Down Arrow (↓) = Brake or reverse the truck.",
    "A = Tilt truck backward.",
    "Left Arrow (←) = Tilt truck backward.",
    "D = Tilt truck forward.",
    "Right Arrow (→) = Tilt truck forward.",
    "Mouse Click = Navigate menus and select options.",
    "Mobile",
    "Tap Right Side of Screen = Accelerate the truck.",
    "Tap Left Side of Screen = Brake or slow down.",
    "On-Screen Controls = Adjust truck balance.",
    "Tap = Navigate menus and interact with settings."
  ],
  "monster-truck-arena": [
    "Desktop",
    "W = Accelerate or tilt backward while airborne.",
    "Up Arrow (↑) = Accelerate or tilt backward while airborne.",
    "S = Brake, reverse, or tilt forward during jumps.",
    "Down Arrow (↓) = Brake, reverse, or tilt forward during jumps.",
    "A = Turn left or tilt left while airborne.",
    "Left Arrow (←) = Turn left or tilt left while airborne.",
    "D = Turn right or tilt right while airborne.",
    "Right Arrow (→) = Turn right or tilt right while airborne.",
    "R = Reset or reverse backward.",
    "Left Click = Interact with buttons and menus.",
    "Drag Left/Right Click = Move camera view.",
    "Mobile",
    "Touch Controls = Drive, steer, and perform stunts.",
    "Tap and Drag = Adjust camera and interact with game menus."
  ],
  "monster-truck-destroyer": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake / Reverse.",
    "Left Arrow (←) = Tilt Left / Balance.",
    "Right Arrow (→) = Tilt Right / Balance."
  ],
  "monster-truck-vs-zombie": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "W = Accelerate.",
    "Down Arrow (↓) = Brake or reverse.",
    "S = Brake or reverse.",
    "Left Arrow (←) = Balance or tilt truck left.",
    "Right Arrow (→) = Balance or tilt truck right.",
    "A = Balance or tilt truck left.",
    "D = Balance or tilt truck right."
  ],
  "monsters-wheels-special": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake or reverse.",
    "Left Arrow (←) = Lean backward.",
    "Right Arrow (→) = Lean forward.",
    "Space = Use Nitro.",
    "X = Use Nitro."
  ],
  "moomoo-io-sandbox": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Move forward.",
    "Down Arrow (↓) = Move backward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "1–9 = Select item or weapon.",
    "Left Click = Gather or attack.",
    "Space = Gather or attack.",
    "E = Toggle auto-attack.",
    "Q = Quick select food.",
    "X = Lock rotation.",
    "R = Ping minimap.",
    "C = Add map marker.",
    "Enter = Chat."
  ],
  "mosaic-puzzle-art": [
    "Desktop",
    "Left Click = Select a color from the palette.",
    "Left Click = Apply the selected color to a hexagonal tile.",
    "Check Button = Verify the completed puzzle.",
    "Mobile",
    "Tap = Select a color from the palette.",
    "Tap = Apply the selected color to a hexagonal tile.",
    "Tap Check Button = Verify the completed puzzle."
  ],
  "moto-maniac": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Reverse or brake.",
    "Down Arrow (↓) = Reverse or brake.",
    "A = Tilt bike left.",
    "Left Arrow (←) = Tilt bike left.",
    "D = Tilt bike right.",
    "Right Arrow (→) = Tilt bike right.",
    "P = Pause the game."
  ],
  "moto-maniac-2": [
    "Desktop",
    "Up Arrow (↑) = Drive forward.",
    "W = Drive forward.",
    "Down Arrow (↓) = Drive backward.",
    "S = Drive backward.",
    "Left Arrow (←) = Tilt left.",
    "A = Tilt left.",
    "Right Arrow (→) = Tilt right.",
    "D = Tilt right.",
    "P = Pause the game.",
    "Mobile",
    "Touch Controls = Use on-screen buttons to drive, tilt, and balance the bike."
  ],
  "moto-maniac-3": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake or reverse.",
    "Down Arrow (↓) = Brake or reverse.",
    "A = Tilt and balance left.",
    "D = Tilt and balance right.",
    "Left Arrow (←) = Tilt and balance left.",
    "Right Arrow (→) = Tilt and balance right.",
    "Spacebar = Restart level after crashing."
  ],
  "moto-road-rash-3d": [
    "Desktop",
    "Player 1",
    "S = Drive or steer.",
    "F = Drive or steer.",
    "E = Drive or steer.",
    "D = Drive or steer.",
    "Shift = Use Nitro.",
    "W = Kick opponents.",
    "R = Kick opponents.",
    "C = Re-spawn.",
    "Player 2",
    "Up Arrow (↑) = Drive or steer.",
    "Down Arrow (↓) = Drive or steer.",
    "Left Arrow (←) = Drive or steer.",
    "Right Arrow (→) = Drive or steer.",
    "Spacebar = Use Nitro.",
    "N = Kick opponents.",
    "M = Kick opponents.",
    "H = Re-spawn."
  ],
  "moto-trial-racing-2": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "W = Accelerate.",
    "Down Arrow (↓) = Brake / Slow Down.",
    "S = Brake / Slow Down.",
    "Left Arrow (←) = Turn left.",
    "A = Turn left.",
    "Right Arrow (→) = Turn right.",
    "D = Turn right.",
    "Space = Handbrake."
  ],
  "moto-x3m": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "W = Accelerate.",
    "Down Arrow (↓) = Brake.",
    "S = Brake.",
    "Left Arrow (←) = Tilt backward.",
    "A = Tilt backward.",
    "Right Arrow (→) = Tilt forward.",
    "D = Tilt forward.",
    "Mobile",
    "Tap Screen Buttons = Accelerate, brake, and tilt the bike."
  ],
  "moto-x3m-2": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "W = Accelerate.",
    "Down Arrow (↓) = Brake.",
    "S = Brake.",
    "Left Arrow (←) = Tilt backward.",
    "A = Tilt backward.",
    "Right Arrow (→) = Tilt forward.",
    "D = Tilt forward.",
    "Mobile",
    "Tap Screen Buttons = Accelerate, brake, and tilt the bike."
  ],
  "moto-x3m-4-winter": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "W = Accelerate.",
    "Down Arrow (↓) = Brake.",
    "S = Brake.",
    "Left Arrow (←) = Lean backward.",
    "A = Lean backward.",
    "Right Arrow (→) = Lean forward.",
    "D = Lean forward.",
    "Space = Continue or respawn from checkpoint."
  ],
  "moto-x3m-5-pool-party": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake.",
    "Down Arrow (↓) = Brake.",
    "A = Lean backward.",
    "Left Arrow (←) = Lean backward.",
    "D = Lean forward.",
    "Right Arrow (→) = Lean forward.",
    "Mobile",
    "Tap = Use on-screen buttons to accelerate, brake, and tilt the bike."
  ],
  "moto-x3m-spooky-land": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake or reverse.",
    "Down Arrow (↓) = Brake or reverse.",
    "A = Tilt and balance the bike left.",
    "D = Tilt and balance the bike right.",
    "Left Arrow (←) = Tilt and balance the bike left.",
    "Right Arrow (→) = Tilt and balance the bike right."
  ],
  "mr-bullet": [
    "Desktop",
    "Left Click (Hold) = Aim your shot.",
    "Left Click (Release) = Fire your weapon.",
    "Mobile",
    "Tap and Drag = Aim your shot.",
    "Release = Fire your weapon."
  ],
  "murder": [
    "Desktop",
    "Spacebar = Hold to charge an attack as the Assassin or glance over your shoulder as the King.",
    "Single-Button Interaction = Control the entire game using one input."
  ],
  "mutazone": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Move forward.",
    "Down Arrow (↓) = Move backward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Confirm selections.",
    "Esc = Pause game.",
    "P = Pause game.",
    "Mobile",
    "Virtual Joystick = Move character.",
    "Tap Screen = Confirm upgrades and interact with menus."
  ],
  "my-perfect-hotel": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Move forward.",
    "Down Arrow (↓) = Move backward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Mobile",
    "Tap and Drag = Move character."
  ],
  "my-pony-my-little-race": [
    "Desktop",
    "Up Arrow (↑) = Jump.",
    "Spacebar = Jump.",
    "Down Arrow (↓) = Duck or slow down.",
    "Mobile",
    "Tap = Jump over obstacles."
  ],
  "n-gon": [
    "Desktop",
    "W = Jump.",
    "Up Arrow (↑) = Jump.",
    "A = Move left.",
    "Left Arrow (←) = Move left.",
    "S = Crouch.",
    "Down Arrow (↓) = Crouch.",
    "D = Move right.",
    "Right Arrow (→) = Move right.",
    "Space = Field.",
    "F = Fire.",
    "Q = Previous gun.",
    "E = Next gun.",
    "P = Pause.",
    "T = Testing (Building).",
    "Left Click = Fire.",
    "Right Click = Field.",
    "Scroll Wheel = Switch guns."
  ],
  "nail-stack": [
    "Desktop",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Mobile",
    "Swipe Left = Move left.",
    "Swipe Right = Move right."
  ],
  "neon-biker": [
    "Desktop",
    "Left Click = Accelerate.",
    "Spacebar = Boost speed."
  ],
  "neon-racer": [
    "Desktop",
    "- W = Accelerate.",
    "- A = Steer left.",
    "- D = Steer right.",
    "- S = Brake.",
    "- Space = Boost.",
    "- Shift = Drift.",
    "- Q / E = Use special abilities."
  ],
  "neon-war": [
    "Desktop",
    "Left Click (Hold) = Move and control the cannon."
  ],
  "ninja-cat-exploit": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Jump.",
    "Left Click = Navigate menus.",
    "Mobile",
    "On-Screen Controls = Move and jump.",
    "Swipe or Hold Directional Buttons = Control movement when required."
  ],
  "noob-basketball-clicker": [
    "Desktop",
    "Left Click = Shoot basketballs and interact with menus."
  ],
  "noob-drive": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake / Reverse.",
    "Down Arrow (↓) = Brake / Reverse.",
    "A = Tilt / Rotate left.",
    "Left Arrow (←) = Tilt / Rotate left.",
    "D = Tilt / Rotate right.",
    "Right Arrow (→) = Tilt / Rotate right.",
    "R = Restart level.",
    "Mobile",
    "On-screen Buttons = Tap the respective UI buttons for gas, brake, and rotation controls."
  ],
  "noob-steve": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Z = Jump.",
    "Mobile",
    "Touch Controls = Move and jump."
  ],
  "noob-steve-parkour": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Spacebar = Jump.",
    "Mouse Movement = Look around and adjust direction.",
    "Esc = Pause or restart game."
  ],
  "nugget-clicker": [
    "Desktop",
    "Left Click = Interact with the game.",
    "Mobile",
    "Tap = Play on supported mobile devices."
  ],
  "off-road-rain-cargo-simulator": [
    "Desktop",
    "Up Arrow (↑) = Drive and accelerate.",
    "Down Arrow (↓) = Brake or reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right."
  ],
  "offroad-forest-racing": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "W = Accelerate.",
    "A = Steer left.",
    "S = Brake / Reverse.",
    "D = Steer right.",
    "Spacebar = Handbrake or Boost (depending on specific game version)."
  ],
  "offroad-ultimate": [
    "Desktop",
    "W = Accelerate.",
    "S = Brake / Reverse.",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake / Reverse.",
    "A = Steer left.",
    "D = Steer right.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Space = Handbrake.",
    "C = Change camera view."
  ],
  "offroader-v5": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake / Reverse.",
    "Down Arrow (↓) = Brake / Reverse.",
    "A = Steer left.",
    "Left Arrow (←) = Steer left.",
    "D = Steer right.",
    "Right Arrow (→) = Steer right.",
    "Space = Handbrake.",
    "1 = Select previous vehicle.",
    "2 = Select next vehicle.",
    "C = Change camera view.",
    "R = Repair vehicle.",
    "T = Slow motion.",
    "P = Pause.",
    "E = Eject payload.",
    "Enter = Reset vehicle.",
    "H = Toggle instructions.",
    "ESC = Open menu."
  ],
  "onion-boy": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Z = Jump.",
    "X = Attack.",
    "P = Pause the game.",
    "Mobile",
    "Left Side of Screen = Move left.",
    "Right Side of Screen = Move right.",
    "Jump Icon = Jump.",
    "Attack Icon = Attack."
  ],
  "only-3d-parkour": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Move forward.",
    "Down Arrow (↓) = Move backward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Jump.",
    "Shift = Sprint.",
    "Mouse Movement = Rotate camera and look around."
  ],
  "only-up": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Move forward.",
    "Down Arrow (↓) = Move backward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Space = Jump.",
    "Shift = Activate slow motion.",
    "Q = Open achievements.",
    "F = Open skins.",
    "P = Open settings.",
    "Mouse Movement = Look around."
  ],
  "only-up-2": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Space = Jump.",
    "Shift = Sprint.",
    "Mouse Movement = Camera control.",
    "Left Click = Interaction.",
    "Esc = Open game menu."
  ],
  "only-up-3d-parkour": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Move forward.",
    "Down Arrow (↓) = Move backward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Jump.",
    "Shift = Sprint.",
    "Mouse Movement = Rotate camera and look around."
  ],
  "ooze-odyssey": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "A = Move left.",
    "D = Move right.",
    "Z = Jump.",
    "K = Jump.",
    "Space = Jump.",
    "X = Fire projectiles (when available).",
    "J = Fire projectiles (when available).",
    "P = Pause."
  ],
  "orbital-survival": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Move forward.",
    "Down Arrow (↓) = Move backward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Mouse Movement = Aim attacks.",
    "Left Click = Shoot enemies.",
    "Mobile",
    "Tap and Drag = Move character.",
    "Tap Screen = Aim and fire at enemies."
  ],
  "ovo": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Slide while running.",
    "Down Arrow (↓) = Smash while in the air.",
    "Up Arrow (↑) = Wall jump while sliding against a wall."
  ],
  "ovo-2": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Slide or smash (while mid-air).",
    "Mobile",
    "On-Screen Buttons = Tap to move, jump, slide, and smash based on the game's interface."
  ],
  "ovo-3-dimensions": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Slide while moving / Ground Smash while in the air.",
    "Up Arrow (↑) (while touching a wall) = Wall Jump."
  ],
  "ovo-classic": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Space Bar = Jump.",
    "Down Arrow (↓) = Slide.",
    "Down Arrow (↓) (Midair) = Smash through transparent platforms.",
    "Up Arrow (↑) (While sliding down a wall) = Wall jump."
  ],
  "pac-man-world": [
    "Gamepad",
    "Left Analog Stick / Directional Buttons = Move Pac-Man.",
    "X Button = Jump / Swim up.",
    "X Button (in mid-air) = Butt-Bounce.",
    "Circle Button (Hold and release) = Rev Roll.",
    "Square Button = Pac-Dot Attack.",
    "Triangle Button = Super Pac-Dot Attack (Uses ten Pac-Dots).",
    "Select Button = View game status.",
    "L2 / R2 Buttons = Camera Zoom (Maze Mode only)."
  ],
  "pack-a-bag": [
    "Desktop",
    "Mouse Movement = Drag and drop items.",
    "R = Rotate selected item.",
    "Mobile",
    "Drag and Drop = Move items into the suitcase.",
    "Tap = Select and rotate items (using on-screen UI)."
  ],
  "pacman": [
    "Desktop",
    "Up Arrow (↑) = Move Pac-Man upward.",
    "Down Arrow (↓) = Move Pac-Man downward.",
    "Left Arrow (←) = Move Pac-Man left.",
    "Right Arrow (→) = Move Pac-Man right.",
    "Mobile",
    "Swipe Up = Move Pac-Man upward.",
    "Swipe Down = Move Pac-Man downward.",
    "Swipe Left = Move Pac-Man left.",
    "Swipe Right = Move Pac-Man right."
  ],
  "pacman-remake": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Q = Switch graphics scale (1x or 2x).",
    "N = Toggle noclip.",
    "R = Reset and advance one level."
  ],
  "panda-bubble-shooter": [
    "Desktop",
    "Mouse Movement = Aim.",
    "Left Click = Shoot bubble.",
    "Mobile",
    "Drag = Aim.",
    "Tap = Shoot bubble."
  ],
  "panda-simulator-3d": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Left Arrow (←) = Move left.",
    "Down Arrow (↓) = Move downward.",
    "Right Arrow (→) = Move right.",
    "Left Click = Attack enemies or interact.",
    "Spacebar = Jump.",
    "Shift = Run faster."
  ],
  "papa-louie": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Climb ladders.",
    "Down Arrow (↓) = Climb ladders / Slide.",
    "Space Bar = Jump, attack, or perform actions.",
    "Left Click = Select ingredients, interact with cooking/prep stations, navigate menus, and serve orders.",
    "Mobile",
    "Tap = Select items, interact with stations, and navigate menus.",
    "Drag = Move ingredients, assemble food, and control character movement (in specific platformer titles).",
    "Swipe = Move ingredients, assemble food, and control character movement (in specific platformer titles)."
  ],
  "papa-louie-2": [
    "Desktop",
    "Left Arrow (←) = Walk and move left.",
    "Right Arrow (→) = Walk and move right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Slide on slopes.",
    "Spacebar = Attack with your spatula."
  ],
  "papa-louie-3": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Slide.",
    "Space Bar = Attack."
  ],
  "papas-bakeria": [
    "Desktop",
    "Left Click = Click, drag, drop, and interact with stations, timers, and ingredients.",
    "Mobile",
    "Tap = Prepare pies and manage orders.",
    "Swipe = Prepare pies and manage orders."
  ],
  "papas-burgeria": [
    "Desktop",
    "Left Click = Click, hold, and drag to interact with stations, flip patties, and place ingredients.",
    "Drag = Move ingredients or switch between restaurant stations.",
    "Mobile",
    "Tap = Select stations, flip patties, or drop ingredients.",
    "Swipe = Move ingredients or switch between restaurant stations.",
    "Drag = Move ingredients or switch between restaurant stations."
  ],
  "papas-cheeseria": [
    "Desktop",
    "Left Click = Click, hold, and drag to select, place, and move ingredients, flip sandwiches, and operate station machinery."
  ],
  "papas-donuteria": [
    "Desktop",
    "Left Click = Select, drag, drop, flip, and place ingredients.",
    "Mobile",
    "Tap = Select items.",
    "Drag and Drop = Move and place ingredients.",
    "Pinch = Zoom (on supported mobile devices)."
  ],
  "papas-freezeria": [
    "Desktop",
    "1 = Switch to the Order Station.",
    "2 = Switch to the Build Station.",
    "3 = Switch to the Mix Station.",
    "4 = Switch to the Top Station.",
    "Space = Toggle between topping trays (Sauces, Shakers, and Placeable items).",
    "Left Click = Select menu items, pour ingredients, and interact with station buttons and interfaces.",
    "Click and Drag = Blend sundaes, apply syrups/toppings, and move components across the screen.",
    "Mobile",
    "Tap = Select items, press station buttons, and interact with the game interface.",
    "Swipe/Drag = Navigate menus, pour syrups, and apply toppings.",
    "Multi-touch = Perform simultaneous actions such as operating multiple blenders or using the topping carousel while placing items."
  ],
  "papas-hot-doggeria": [
    "Desktop",
    "Left Click = Click, drag, and place ingredients; switch stations; select order tickets; interact with menu buttons.",
    "Mobile",
    "Tap = Select items, switch stations, and interact with menus.",
    "Swipe Up = Flip items on the grill, drizzle sauces, and arrange toppings.",
    "Swipe Down = Flip items on the grill, drizzle sauces, and arrange toppings.",
    "Swipe Left = Flip items on the grill, drizzle sauces, and arrange toppings.",
    "Swipe Right = Flip items on the grill, drizzle sauces, and arrange toppings."
  ],
  "papas-pastaria": [
    "Desktop",
    "Left Click = Interact with stations, drag ingredients, and place items.",
    "Mobile",
    "Tap = Interact with stations and place items.",
    "Swipe = Drag ingredients and place items."
  ],
  "papas-pizzaria": [
    "Desktop",
    "Left Click = Click buttons, navigate between workstations, and interact with game elements.",
    "Drag = Hold the left mouse button and drag to interact with ingredients, manage station equipment, move pizzas, and slice pizzas.",
    "Mobile",
    "Tap = Select buttons and interact with game objects.",
    "Drag = Place toppings and move pizzas between stations.",
    "Swipe = Slice the pizza at the Cutting Station."
  ],
  "papas-scooperia": [
    "Desktop",
    "Left Click = Select, drag, place, and interact with ingredients.",
    "Mobile",
    "Tap = Select items and menus.",
    "Tap and Hold = Scoop ice cream and apply syrups.",
    "Drag = Position toppings and ingredients."
  ],
  "papas-sushiria": [
    "Desktop",
    "Left Click = Click, hold, and drag to spread rice, roll sushi, slice ingredients, prepare bubble tea, and complete other cooking tasks.",
    "Mobile",
    "Tap = Select ingredients and interact with stations.",
    "Drag = Navigate between stations, spread rice, roll sushi, slice ingredients, assemble bubble tea orders, and complete cooking tasks."
  ],
  "papas-taco-mia": [
    "Desktop",
    "Left Click = Interact with station buttons, take orders, select ingredients, cook, flip, cut, and assemble taco ingredients.",
    "Drag = Cook, flip, cut, and assemble taco ingredients across the different stations.",
    "Mobile",
    "Tap = Select items, navigate between workstations, and manage ticket queues.",
    "Drag = Perform cooking, cutting, and assembly tasks.",
    "Swipe = Perform cooking, cutting, and assembly tasks."
  ],
  "papas-wingeria": [
    "Desktop",
    "Left Click = Click, drag, and interact with stations, timers, and ingredients.",
    "Drag = Interact with stations, timers, and ingredients.",
    "Mobile",
    "Tap = Interact with stations, timers, and ingredients.",
    "Drag = Interact with stations, timers, and ingredients."
  ],
  "paper-fighter-3d": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Attack Key = Perform punches, kicks, and special attacks.",
    "Block Key = Guard against incoming attacks.",
    "Esc = Pause the game or open the menu.",
    "Mobile",
    "Drag = Move your fighter using the virtual joystick.",
    "Tap = Use attack buttons, block button, and the pause icon."
  ],
  "paper-io": [
    "Keyboard Controls",
    "Arrow Keys or W / A / S / D – Move",
    "Mouse Controls",
    "Click and Drag – Move",
    "Touch Controls",
    "Swipe in the desired direction – Move"
  ],
  "paper-io-2": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Mouse Movement = Move or steer.",
    "Mobile",
    "Swipe Up = Move forward.",
    "Swipe Down = Move backward.",
    "Swipe Left = Steer left.",
    "Swipe Right = Steer right.",
    "Drag = Move or steer."
  ],
  "paper-io-3": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Mobile",
    "Swipe Up = Move upward.",
    "Swipe Down = Move downward.",
    "Swipe Left = Move left.",
    "Swipe Right = Move right."
  ],
  "paper-minecraft": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Left Click = Mine or place blocks.",
    "E = Open or close the inventory.",
    "E + Hover = Open chests, crafting tables, or interact with doors and villagers.",
    "F = Eat food or hold an item.",
    "Space = Drop a single item from a stack while dragging.",
    "Q = Drop an item.",
    "P = Pause or unpause the game.",
    "T = Talk or enter commands.",
    "O = Save the game.",
    "R = Sprint or swim in water.",
    "1–9 = Select items from the toolbar."
  ],
  "park-out": [
    "Desktop",
    "Left Click (Hold & Drag) = Move a vehicle in the desired direction.",
    "Mobile",
    "Drag = Slide a vehicle in the desired direction."
  ],
  "parking-fury": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Left Arrow (←) = Steer left.",
    "Down Arrow (↓) = Reverse.",
    "Right Arrow (→) = Steer right."
  ],
  "parking-fury-2": [
    "Desktop",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "R = Restart the current level."
  ],
  "parking-fury-3d": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Left Arrow (←) = Steer left.",
    "Down Arrow (↓) = Reverse.",
    "Right Arrow (→) = Steer right.",
    "Ctrl = Enter or steal a vehicle.",
    "Space = Use the handbrake.",
    "C = Change the camera view."
  ],
  "parking-fury-3d-bounty-hunter": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Apply the handbrake.",
    "C = Switch camera views.",
    "Ctrl = Enter or steal a vehicle.",
    "Esc = Pause the game or open the settings menu."
  ],
  "parking-fury-3d-night-thief": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Left Arrow (←) = Steer left.",
    "Down Arrow (↓) = Reverse.",
    "Right Arrow (→) = Steer right.",
    "Space = Use the handbrake.",
    "C = Change the camera view.",
    "R = Reset the vehicle position.",
    "Esc = Pause the game.",
    "P = Pause the game.",
    "Mobile",
    "On-Screen Steering Controls = Steer the vehicle.",
    "On-Screen Pedals = Accelerate and brake.",
    "Tap = Switch the camera view using the camera button."
  ],
  "parking-mania": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Left Arrow (←) = Steer left.",
    "Down Arrow (↓) = Reverse.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Apply the handbrake.",
    "C = Change the camera view.",
    "R = Reset the vehicle position.",
    "Esc = Pause the game.",
    "P = Pause the game.",
    "Mobile",
    "On-Screen Steering Controls = Steer the vehicle.",
    "On-Screen Pedals = Accelerate and brake.",
    "Tap = Switch the camera view using the camera button."
  ],
  "parkour-race": [
    "Desktop",
    "A = Steer left.",
    "D = Steer right.",
    "Mobile",
    "Drag Left = Steer left.",
    "Drag Right = Steer right."
  ],
  "penalty-fever": [
    "Desktop",
    "- Left Click = Begin the run-up toward the ball (Striker).",
    "- Left Click = Set the final direction and height of the shot (Striker).",
    "- Mouse Movement = Aim the goalkeeper's dive.",
    "- Left Click = Execute the save attempt (Goalkeeper)."
  ],
  "penalty-kicks": [
    "Desktop",
    "Left Click and Drag = Aim your shot and adjust the shot power by changing the drag distance.",
    "Release Left Click = Shoot.",
    "Drag in a Curved Path = Apply spin to the ball.",
    "Mobile",
    "Tap and Hold = Hold the ball.",
    "Swipe = Shoot toward your target.",
    "Curve Your Swipe = Apply bend to the shot.",
    "Tap = Restart the round using the on-screen restart button."
  ],
  "penalty-shooters": [
    "Desktop",
    "- Left Click = Aim, shoot, and dive as the goalkeeper.",
    "Mobile",
    "- Tap = Aim, shoot, and dive as the goalkeeper."
  ],
  "penalty-shooters-2": [
    "Desktop",
    "Left Click and Hold = Aim.",
    "Release Left Click = Shoot.",
    "Left Click = Move and dive as the goalkeeper.",
    "Mouse Movement = Move and dive as the goalkeeper.",
    "Mobile",
    "Tap and Hold = Aim.",
    "Release = Shoot.",
    "Tap = Move and dive as the goalkeeper."
  ],
  "penalty-shooters-3": [
    "Desktop",
    "Up Arrow (↑) = Navigate menus upward.",
    "Down Arrow (↓) = Navigate menus downward.",
    "Left Arrow (←) = Navigate menus left.",
    "Right Arrow (→) = Navigate menus right.",
    "Enter = Confirm selections.",
    "Left Click (Hold & Drag) = Aim and set power.",
    "Left Click (Release) = Shoot.",
    "Left Click = Dive as the goalkeeper (when defending).",
    "Mobile",
    "Tap (Hold) = Aim.",
    "Drag = Adjust power and curve.",
    "Release = Shoot.",
    "Tap = Dive as the goalkeeper (when defending)."
  ],
  "peppa-pig-basketball": [
    "Desktop",
    "Left Click = Pass the ball to a teammate.",
    "Left Click and Hold = Aim and adjust the power of your shot.",
    "Release Left Click = Shoot the ball toward the basket."
  ],
  "petz-lol": [
    "Desktop",
    "Left Click = Pass the ball to a teammate.",
    "Left Click (Hold) = Aim and adjust the power of your shot.",
    "Left Click (Release) = Shoot the ball toward the basket."
  ],
  "ping-pong-chaos": [
    "Desktop",
    "W = Player 1 jumps left.",
    "E = Player 1 jumps right.",
    "I = Player 2 jumps left.",
    "O = Player 2 jumps right."
  ],
  "ping-pong-go": [
    "Desktop",
    "Mouse Movement = Move the paddle.",
    "Left Click = Serve.",
    "Spacebar = Serve.",
    "Esc = Pause the game.",
    "P = Pause the game.",
    "Mobile",
    "Drag = Move the paddle.",
    "Swipe = Add speed with a quick flick.",
    "Drag = Apply spin with a longer drag."
  ],
  "pixel-gun-3d": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space = Jump.",
    "Shift = Sprint or dash.",
    "1–0 = Switch weapons.",
    "R = Reload.",
    "E = Interact.",
    "Mouse Movement = Aim.",
    "Left Click = Shoot.",
    "Right Click = Aim down sights or use secondary fire."
  ],
  "pixel-gun-apocalypse-2": [
    "Desktop",
    "Mouse Movement = Look and aim.",
    "Left Click = Shoot.",
    "Right Click = Aim down sights.",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Move forward.",
    "Left Arrow (←) = Move left.",
    "Down Arrow (↓) = Move backward.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Jump.",
    "Shift = Sprint.",
    "C = Crouch.",
    "R = Reload."
  ],
  "pixel-gun-survival": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space = Jump.",
    "Left Click = Shoot.",
    "R = Reload.",
    "1–9 = Switch weapons.",
    "Esc = Open the pause menu.",
    "Mobile",
    "Left Joystick = Move.",
    "Touch and Drag = Aim.",
    "Fire Button = Shoot.",
    "Reload Button = Reload your weapon.",
    "Jump Button = Jump.",
    "Weapon Switch Button = Switch weapons.",
    "Interact Button = Interact."
  ],
  "pixel-shooter": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "W = Jump.",
    "R = Reload weapon.",
    "Spacebar = Throw grenade.",
    "Left Click = Shoot."
  ],
  "pixel-smash-duel": [
    "Desktop",
    "Player 1",
    "W = Jump.",
    "E = Attack.",
    "Player 2",
    "Up Arrow (↑) = Jump.",
    "M = Attack."
  ],
  "pixwars-2": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Left Click = Shoot / Build.",
    "E = Open build menu.",
    "Spacebar = Jump.",
    "F = Enter vehicle / Purchase items."
  ],
  "pizza-tower": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Z = Jump.",
    "K = Jump.",
    "Space = Jump.",
    "X = Dash, grab, or throw.",
    "L = Dash, grab, or throw.",
    "Left Shift = Dash, grab, or throw.",
    "S + X / L / Left Shift = Slide.",
    "Down Arrow (↓) + X / L / Left Shift = Slide.",
    "S (in air) = Dive or ground pound.",
    "Down Arrow (↓) (in air) = Dive or ground pound.",
    "X / L / Left Shift + Jump (against wall) = Wall climb or wall jump.",
    "C = Parry or taunt.",
    "J = Parry or taunt.",
    "Esc = Pause.",
    "P = Pause.",
    "Gamepad",
    "Left Stick = Move.",
    "D-Pad = Move.",
    "A (Xbox) = Jump.",
    "Cross (PlayStation) = Jump.",
    "X (Xbox) = Dash, grab, or throw.",
    "Square (PlayStation) = Dash, grab, or throw.",
    "Down + Dash (Gamepad) = Slide.",
    "Down (in air) = Dive or ground pound.",
    "Dash / Grab + Jump (against wall) = Wall climb or wall jump.",
    "B (Xbox) = Parry or taunt.",
    "Circle (PlayStation) = Parry or taunt.",
    "Start (Xbox) = Pause.",
    "Options (PlayStation) = Pause."
  ],
  "plactions": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Interact / Jump / Action.",
    "Spacebar = Interact / Jump / Action.",
    "Up Arrow (↑) = Interact / Jump / Action.",
    "R = Restart level.",
    "ESC = Go back / Open menu.",
    "B = Go back / Open menu."
  ],
  "plants-vs-zombies": [
    "Desktop",
    "Mouse Movement = Select and place plants.",
    "Left Click = Interact with menus and collect sunlight.",
    "Shovel Tool = Remove plants from the lawn.",
    "Pause Button = Pause the game and access settings."
  ],
  "pokemon-emerald": [
    "Desktop",
    "Up Arrow (↑) = Move character upward and navigate menus.",
    "Down Arrow (↓) = Move character downward and navigate menus.",
    "Left Arrow (←) = Move character left and navigate menus.",
    "Right Arrow (→) = Move character right and navigate menus.",
    "Z = Confirm, interact, or select.",
    "X = Cancel, close menu, or sprint while holding with Running Shoes.",
    "Enter = Open Start Menu.",
    "Backspace = Select (Menu Function).",
    "A = L Button (GBA functionality).",
    "S = R Button (GBA functionality)."
  ],
  "poly-track": [
    "Desktop",
    "W = Accelerate / Drive forward.",
    "A = Steer left.",
    "S = Brake / Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Accelerate / Drive forward.",
    "Left Arrow (←) = Steer left.",
    "Down Arrow (↓) = Brake / Reverse.",
    "Right Arrow (→) = Steer right.",
    "R = Restart current track.",
    "Enter = Restart current track."
  ],
  "pool-club": [
    "Desktop",
    "Mouse Movement = Aim.",
    "Left Click and Drag = Set shot power.",
    "Release Left Click = Shoot.",
    "Up Arrow (↑) = Fine-tune your aim (supported in some browsers).",
    "Down Arrow (↓) = Fine-tune your aim (supported in some browsers).",
    "Left Arrow (←) = Fine-tune your aim (supported in some browsers).",
    "Right Arrow (→) = Fine-tune your aim (supported in some browsers).",
    "Mobile",
    "Drag = Aim.",
    "Pull Back = Set shot power.",
    "Tap = Shoot.",
    "Tap Cue Ball Icon = Apply spin."
  ],
  "poop-clicker-3": [
    "Desktop",
    "Left Click = Generate poop and earn points.",
    "Mobile",
    "Tap = Generate poop and earn points."
  ],
  "poor-bunny": [
    "Desktop",
    "Player 1",
    "W = Jump.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Player 2",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Esc = Pause.",
    "P = Pause.",
    "R = Restart.",
    "Mobile",
    "On-Screen Movement Controls = Move.",
    "Jump Button = Jump."
  ],
  "pop-it-master": [
    "Desktop",
    "Left Click = Pop bubbles.",
    "Spacebar = Rapid or successive popping (when available).",
    "Mobile",
    "Tap = Pop bubbles directly on the screen."
  ],
  "poppy-glamrock": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Left Arrow (←) = Move left.",
    "Down Arrow (↓) = Move downward.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Jump / Interact.",
    "Left Shift = Sprint.",
    "Left Click = Select / Action.",
    "Right Click = Secondary Action.",
    "Scroll Wheel = Zoom / Switch Items."
  ],
  "pou": [
    "Desktop",
    "Left Click = Select items, buttons, and menu options.",
    "Left Click and Drag = Interact with the pet, feed, clean, and navigate game elements.",
    "Mobile",
    "Tap = Select items and interact with the interface.",
    "Drag = Perform actions, move objects, and interact with the pet.",
    "Swipe = Perform actions, move objects, and interact with the pet."
  ],
  "power-badminton": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "J = Swing (High hit).",
    "K = Swing (Low hit).",
    "L = Smash."
  ],
  "president-simulator": [
    "Desktop",
    "Left Click = Generate money and interact with menus.",
    "Mouse Movement = Navigate the interface and purchase upgrades.",
    "Scroll Wheel = Browse upgrades and investment options (if supported)."
  ],
  "pudding-monsters": [
    "Desktop",
    "Left Click and Drag = Slide the pudding monsters.",
    "Mobile",
    "Tap and Drag = Slide the pudding monsters."
  ],
  "push-the-box": [
    "Desktop",
    "Up Arrow (↑) = Move upward to push boxes.",
    "Down Arrow (↓) = Move downward to push boxes.",
    "Left Arrow (←) = Move left to push boxes.",
    "Right Arrow (→) = Move right to push boxes.",
    "Left Click = Move the character or interact with the game interface to push boxes.",
    "Mobile",
    "Tap = Move the character or interact with the game interface to push boxes."
  ],
  "push-the-box-3d": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Mouse Movement and Drag = Rotate the camera view.",
    "R = Restart the current level.",
    "Z = Undo your last move.",
    "Esc = Pause the game (if available)."
  ],
  "rabbit-samurai": [
    "Desktop",
    "Left Click (Hold) = Fire and attach the grappling rope to an anchor point.",
    "Left Click (Release) = Release the rope to swing and maintain momentum.",
    "Mobile",
    "Tap (Hold) = Fire and attach the grappling rope to an anchor point.",
    "Release = Let go to swing forward."
  ],
  "rabbit-samurai-2": [
    "Desktop",
    "- Left Click and Hold = Attach to anchors and swing.",
    "- Release Left Click = Launch your rabbit forward.",
    "- W = Adjust aim.",
    "- A = Adjust aim.",
    "- S = Adjust aim.",
    "- D = Adjust aim.",
    "- Up Arrow (↑) = Adjust aim.",
    "- Down Arrow (↓) = Adjust aim.",
    "- Left Arrow (←) = Adjust aim.",
    "- Right Arrow (→) = Adjust aim.",
    "- Space = Attach the grappling hook.",
    "- R = Restart the level.",
    "Mobile",
    "- Tap = Attach to reachable anchors.",
    "- Swipe = Adjust aim (on supported devices).",
    "- Release = Launch your rabbit forward.",
    "- Restart Button = Restart the level instantly."
  ],
  "raft-wars": [
    "Desktop",
    "Left Click (Hold & Drag) = Drag to aim and pull back to set power.",
    "Left Click (Release) = Release to shoot.",
    "1 = Switch to the corresponding available weapon.",
    "2 = Switch to the corresponding available weapon.",
    "3 = Switch to the corresponding available weapon.",
    "4 = Switch to the corresponding available weapon.",
    "5 = Switch to the corresponding available weapon.",
    "6 = Switch to the corresponding available weapon.",
    "7 = Switch to the corresponding available weapon.",
    "P = Open the pause menu or settings screen (depending on the version).",
    "Mobile",
    "Drag = Aim and pull back to set power.",
    "Release = Shoot.",
    "On-Screen Buttons = Switch between available weapons."
  ],
  "raft-wars-2": [
    "Desktop",
    "Left Click and Drag = Aim.",
    "Release Left Click = Shoot.",
    "Mobile",
    "Tap and Drag = Aim.",
    "Release = Shoot."
  ],
  "ragdoll-archers": [
    "Desktop",
    "Single Player",
    "Mouse Movement = Aim.",
    "Left Click = Shoot.",
    "Space = Jump.",
    "Two-Player Mode",
    "Player 1",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Left Shift = Jump / Shoot.",
    "Player 2",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Right Shift = Jump / Shoot."
  ],
  "ragdoll-fight": [
    "Desktop",
    "Left Click (Hold & Drag) = Manipulate the stickman's body and weapon position to attack or defend.",
    "Physics-Based Movement = The character moves based on the physics engine rather than direct key-based directional input.",
    "Mobile",
    "Drag = Control the character's limbs or weapon by dragging the touch point.",
    "Swipe = Execute rapid movements to build momentum for more powerful impacts."
  ],
  "ragdoll-hit": [
    "Desktop",
    "- A = Move left.",
    "- D = Move right.",
    "- Left Arrow (←) = Move left.",
    "- Right Arrow (→) = Move right.",
    "- W = Jump.",
    "- Up Arrow (↑) = Jump.",
    "- S = Kick.",
    "- Down Arrow (↓) = Kick.",
    "- Space = Grab or throw.",
    "Mobile",
    "- On-Screen Joystick = Move.",
    "- On-Screen Arrows = Move.",
    "- Jump Button = Jump.",
    "- Action Button = Kick, grab, and throw."
  ],
  "rainbow-parkour": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Spacebar = Jump.",
    "Mouse Movement = Adjust the camera view.",
    "R = Restart from the latest checkpoint.",
    "Esc = Pause the game or open the menu.",
    "Mobile",
    "Left Joystick = Move your character.",
    "Swipe = Control the camera.",
    "Jump Button = Jump across obstacles.",
    "Menu Button = Pause the game or access settings."
  ],
  "rally-champion": [
    "Desktop",
    "A = Steer left.",
    "D = Steer right.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Esc = Pause.",
    "Mobile",
    "Tap Left Side of Screen = Steer left.",
    "Tap Right Side of Screen = Steer right."
  ],
  "rally-point-3": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Left Shift = Drift.",
    "X = Drift.",
    "Spacebar = Use nitro.",
    "Z = Use nitro.",
    "C = Change the camera.",
    "R = Reset the vehicle."
  ],
  "real-flying-truck-simulator-3d": [
    "Desktop",
    "W = Accelerate.",
    "S = Brake or reverse.",
    "A = Steer left.",
    "D = Steer right.",
    "F = Switch to Fly Mode or land.",
    "Space = Apply the handbrake or brake.",
    "Shift = Activate nitro or boost.",
    "Mobile",
    "On-Screen Steering Buttons = Steer and navigate.",
    "On-Screen Gas Pedal = Accelerate.",
    "On-Screen Brake Pedal = Decelerate.",
    "Fly/Land Button = Toggle between driving and flying modes."
  ],
  "real-football": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Shift = Sprint.",
    "E = Make a short pass.",
    "R = Perform a long pass.",
    "Spacebar = Shoot the ball.",
    "T = Switch tactics.",
    "Left Click = Move to the selected area.",
    "Left Click (Double Click) = Sprint to the selected area.",
    "Left Click (Single Arrow or Teammate) = Make a short pass.",
    "Left Click (Double Arrow) = Perform a long pass.",
    "Left Click (Player Name Box) = Shoot the ball.",
    "Left Click (Tactic Icon) = Change tactics."
  ],
  "real-garbage-truck": [
    "Desktop",
    "- W = Accelerate.",
    "- S = Brake / Reverse.",
    "- A = Steer left.",
    "- D = Steer right.",
    "- Space = Handbrake."
  ],
  "recoil": [
    "Desktop",
    "Mouse Movement = Aim.",
    "Left Click = Shoot.",
    "R = Restart the level.",
    "Esc = Pause the game.",
    "P = Pause the game.",
    "Mobile",
    "Tap = Aim and shoot."
  ],
  "red-ball-4": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Jump.",
    "Up Arrow (↑) = Jump.",
    "Space = Jump.",
    "Enter = Jump.",
    "R = Restart the level.",
    "P = Pause the game.",
    "Esc = Pause the game.",
    "Mobile",
    "On-Screen Left Arrow = Move left.",
    "On-Screen Right Arrow = Move right.",
    "On-Screen Jump Button = Jump.",
    "On-Screen Pause Button = Pause the game."
  ],
  "red-driver-5": [
    "Desktop",
    "W = Accelerate.",
    "A = Steer left.",
    "S = Brake or reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake or reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right."
  ],
  "repuls-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space = Jump.",
    "Shift = Sprint.",
    "R = Reload.",
    "Q = Perform a melee attack.",
    "E = Interact or pick up items.",
    "1 = Switch to the primary or secondary weapon.",
    "2 = Select equipment.",
    "Esc = Open the settings.",
    "M = Open the scoreboard.",
    "Left Click = Fire the weapon.",
    "Right Click = Aim (rifles).",
    "Scroll Wheel = Cycle through weapons."
  ],
  "retro-bowl": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Mouse Movement = Aim passes and kicks.",
    "Left Click = Snap the ball, select options, or kick when aiming.",
    "Left Click (Hold & Drag) = Aim and throw passes.",
    "Spacebar = Dive.",
    "Mobile",
    "Tap = Snap the ball or select options.",
    "Drag = Aim and throw passes.",
    "Swipe = Move the ball carrier or dodge/juke.",
    "Swipe Forward = Dive.",
    "Tap (Hold) = Aim a kick.",
    "Release = Kick field goals and extra points."
  ],
  "retro-bowl-college": [
    "Desktop",
    "- Space = Snap the ball.",
    "- W = Move upward (dodge).",
    "- S = Move downward (dodge).",
    "- A = Dive.",
    "- D = Stop or perform a stutter step.",
    "- Left Click = Snap the ball.",
    "- Left Click and Hold = Aim the pass.",
    "- Left Click and Drag = Adjust the pass trajectory and throw (or dodge/juke while running).",
    "Mobile",
    "- Tap = Snap the ball.",
    "- Tap and Hold = Aim the pass.",
    "- Drag = Adjust the pass trajectory and throw (or dodge/juke while running).",
    "- Swipe Forward = Dive.",
    "- Swipe Backward = Hesitate or stop."
  ],
  "return-man-2": [
    "Desktop",
    "I = Move upward.",
    "J = Move left.",
    "K = Move downward.",
    "L = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Left Arrow (←) = Move left.",
    "Down Arrow (↓) = Move downward.",
    "Right Arrow (→) = Move right.",
    "A = Perform a spin move.",
    "S = Use a speed burst.",
    "D = Perform a front flip."
  ],
  "riddle-school-5": [
    "Desktop",
    "Left Click = Interact with objects, select items, solve puzzles, and navigate through the environment."
  ],
  "riddle-transfer-2": [
    "Desktop",
    "Left Click = Interact with objects, select dialogue options, and use items.",
    "Mouse Movement = Explore areas and find interactive elements.",
    "Left Click (Inventory) = Select and use collected items."
  ],
  "rise-of-neon-square": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Jump.",
    "R = Restart the current level."
  ],
  "roblox": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Mouse Movement = Look around.",
    "Left Click = Interact or use items.",
    "Space = Jump.",
    "Shift = Sprint (in supported games).",
    "Esc = Open the menu.",
    "Mobile",
    "Virtual Joystick = Move.",
    "Touch Screen = Look around and interact.",
    "On-Screen Buttons = Perform game actions."
  ],
  "rocket-league": [
    "Desktop",
    "W = Throttle or accelerate.",
    "A = Steer left.",
    "S = Reverse or brake.",
    "D = Steer right.",
    "Spacebar = Jump.",
    "Left Shift = Boost.",
    "Left Click = Toggle Ball Cam.",
    "Right Click = Powerslide or air roll.",
    "Gamepad",
    "Right Trigger = Accelerate.",
    "Left Trigger = Reverse or brake.",
    "Left Stick = Steer, pitch, and yaw.",
    "A (Xbox) / X (PlayStation) = Jump.",
    "B (Xbox) / Circle (PlayStation) = Boost.",
    "X (Xbox) / Square (PlayStation) = Powerslide or air roll.",
    "Y (Xbox) / Triangle (PlayStation) = Toggle Ball Cam.",
    "Right Stick = Control the camera."
  ],
  "rocket-pult": [
    "Desktop",
    "- W = Thrust forward.",
    "- Up Arrow (↑) = Thrust forward.",
    "- A = Rotate counterclockwise.",
    "- Left Arrow (←) = Rotate counterclockwise.",
    "- D = Rotate clockwise.",
    "- Right Arrow (→) = Rotate clockwise.",
    "- Space = Release or deploy the landing legs.",
    "- Z = Slow time (uses fuel).",
    "- Backspace = Reset everything (hold for 5 seconds)."
  ],
  "rocket-soccer-derby": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Jump.",
    "Left Shift = Boost.",
    "F = Change the camera."
  ],
  "rogue-dunk": [
    "Desktop",
    "- Mouse Movement = Aim and navigate.",
    "- Left Click = Dunk or perform actions.",
    "Mobile",
    "- Tap = Dunk or perform actions.",
    "- Swipe = Navigate and aim."
  ],
  "rolling-ball-3d": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Mobile",
    "Swipe Left = Move left.",
    "Swipe Right = Move right."
  ],
  "rolly-vortex": [
    "Desktop",
    "Left Arrow (←) = Move the ball left.",
    "Right Arrow (→) = Move the ball right.",
    "Mobile",
    "Swipe Left = Move the ball left.",
    "Swipe Right = Move the ball right."
  ],
  "rooftop-snipers": [
    "Desktop",
    "Player 1",
    "W = Jump.",
    "E = Shoot.",
    "Player 2",
    "I = Jump.",
    "O = Shoot."
  ],
  "rooftop-snipers-2": [
    "Desktop",
    "W = Jump.",
    "E = Shoot.",
    "Mobile",
    "Tap = Jump.",
    "Tap and Hold = Charge the shot.",
    "Release = Shoot."
  ],
  "rowdy-wrestling": [
    "Desktop",
    "Single Player",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Z = Punch or attack.",
    "X = Kick or perform a special attack.",
    "Two Players",
    "Player 1",
    "W = Jump.",
    "A = Move left.",
    "D = Move right.",
    "G = Punch.",
    "H = Kick.",
    "Player 2",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "K = Punch.",
    "L = Kick."
  ],
  "royale-dudes": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space = Drift (while driving).",
    "R = Reload the weapon.",
    "E = Interact (enter vehicles, pick up items, and access Buy Stations).",
    "M = Enlarge or open the map.",
    "Tab = Enlarge or open the map.",
    "Q = Switch weapons.",
    "1 = Select weapon slot 1.",
    "2 = Select weapon slot 2.",
    "3 = Select weapon slot 3.",
    "X = Use the special weapon.",
    "G = Throw a grenade.",
    "Mouse Movement = Aim the weapon.",
    "Left Click = Shoot or attack."
  ],
  "run-3": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "A = Move left.",
    "Right Arrow (→) = Move right.",
    "D = Move right.",
    "Up Arrow (↑) = Jump.",
    "Spacebar = Jump.",
    "Move Toward Tunnel Walls = Rotate the tunnel and run along different surfaces."
  ],
  "run-3-editor": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Jump or switch gravity.",
    "Up Arrow (↑) = Jump or switch gravity.",
    "Mouse Movement = Move level pieces in Editor Mode.",
    "Left Click = Place and edit level pieces in Editor Mode.",
    "P = Pause the game.",
    "Esc = Pause the game.",
    "R = Restart the current level.",
    "Mobile",
    "Tap (Left Side) = Move left.",
    "Tap (Right Side) = Move right.",
    "Tap = Jump or switch gravity.",
    "Drag = Build and edit levels in Editor Mode.",
    "Pause Button = Pause the game or open the menu."
  ],
  "run-3d": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space = Jump."
  ],
  "running-fred": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Jump.",
    "Double Spacebar = Double jump.",
    "Shift = Slide or dash.",
    "P = Pause the game.",
    "M = Mute or unmute the game."
  ],
  "rusher-crusher": [
    "Desktop",
    "Left Click = Shoot or attack.",
    "Mobile",
    "Tap = Shoot or attack."
  ],
  "sandstrike-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Jump.",
    "Left Shift = Sprint.",
    "Ctrl = Crouch.",
    "1 = Switch to weapon 1.",
    "2 = Switch to weapon 2.",
    "3 = Switch to weapon 3.",
    "E = Interact or enter/exit vehicles.",
    "R = Reload."
  ],
  "sausage-flip": [
    "Desktop",
    "Left Click and Drag = Aim and set the launch power.",
    "Release Left Click = Flip.",
    "Mobile",
    "Drag = Aim and set the launch power.",
    "Release Finger = Flip."
  ],
  "save-the-doge": [
    "Desktop",
    "Left Click (Hold & Drag) = Draw a protective line.",
    "Left Click (Release) = Finalize the barrier.",
    "Mobile",
    "Drag = Draw a protective line.",
    "Release = Finalize the barrier."
  ],
  "scenexe-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Left Click = Fire weapons and guide drones/minions to the cursor.",
    "Right Click = Repel drones/minions away from the cursor (also used for inverse movement).",
    "Mouse Movement = Move the cursor to aim and direct drones/minions.",
    "Space = Fire weapons and guide drones/minions to the cursor.",
    "Shift = Repel drones/minions away from the cursor (also used for inverse movement).",
    "E = Toggle Auto Fire.",
    "R = Reverse the tank direction.",
    "C = Toggle Auto Spin.",
    "1 = Upgrade a tank stat.",
    "2 = Upgrade a tank stat.",
    "3 = Upgrade a tank stat.",
    "4 = Upgrade a tank stat.",
    "5 = Upgrade a tank stat.",
    "6 = Upgrade a tank stat.",
    "7 = Upgrade a tank stat.",
    "8 = Upgrade a tank stat.",
    "M = Toggle Debug Mode (shows performance information such as ping and FPS)."
  ],
  "scrap-metal-3-infernal-trap": [
    "Desktop",
    "W = Accelerate or move forward.",
    "A = Steer left.",
    "S = Brake or reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Accelerate or move forward.",
    "Left Arrow (←) = Steer left.",
    "Down Arrow (↓) = Brake or reverse.",
    "Right Arrow (→) = Steer right.",
    "Space = Use handbrake.",
    "C = Change camera view.",
    "H = Use horn.",
    "Esc = Open the menu.",
    "Left Click + Drag = Place and position stunt objects.",
    "Mobile",
    "On-Screen Buttons = Drive and control the vehicle.",
    "Tap + Drag = Select, move, and place objects."
  ],
  "shady-bears": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "A = Move left.",
    "Q = Move left.",
    "D = Move right.",
    "W = Jump.",
    "Z = Jump.",
    "J = Move left.",
    "L = Move right.",
    "I = Jump.",
    "F = Move left.",
    "H = Move right.",
    "T = Jump.",
    "Mobile",
    "On-screen Buttons = Control the game using touch controls available on your device and browser."
  ],
  "shape-fold": [
    "Desktop",
    "Left Click + Drag = Move, rotate, and fold connected puzzle pieces.",
    "Mobile",
    "Tap + Drag = Move, rotate, and fold connected puzzle pieces."
  ],
  "shape-fold-animals": [
    "Desktop",
    "Mouse Movement = Move pieces.",
    "Left Click = Click and drag pieces to fold them into place.",
    "Trackpad = Click and drag pieces to fold them into place.",
    "Mobile",
    "Tap = Select pieces.",
    "Drag = Move pieces using one finger to fold them into place."
  ],
  "shark-io": [
    "Desktop",
    "W = Move your shark forward.",
    "A = Move your shark left.",
    "S = Move your shark backward.",
    "D = Move your shark right.",
    "Up Arrow (↑) = Move your shark forward.",
    "Left Arrow (←) = Move your shark left.",
    "Down Arrow (↓) = Move your shark backward.",
    "Right Arrow (→) = Move your shark right.",
    "Spacebar = Activate speed boost.",
    "Mouse Movement = Move and navigate your shark.",
    "Left Click = Activate speed boost."
  ],
  "shell-shockers": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Spacebar = Jump.",
    "Shift = Aim or Zoom.",
    "E = Switch to Secondary Weapon.",
    "F = Melee Attack.",
    "Q = Throw Grenade.",
    "R = Reload.",
    "G = Weapon Inspect.",
    "Left Click = Shoot/Fire."
  ],
  "ships-3d": [
    "Desktop",
    "W = Move your ship forward.",
    "A = Move your ship left.",
    "S = Move your ship backward.",
    "D = Move your ship right.",
    "F = Interact with ship controls and equipment.",
    "Mouse Movement = Look around and aim.",
    "Left Click = Fire cannons and weapons when available."
  ],
  "shootz": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Dash / Special Ability.",
    "R = Reload weapon.",
    "Mouse Movement = Aim.",
    "Left Click = Shoot.",
    "Mobile",
    "Drag = Move and Aim.",
    "Tap = Shoot.",
    "On-Screen Button = Activate Special Ability."
  ],
  "short-ride": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "A = Move left.",
    "D = Move right.",
    "Up Arrow (↑) = Accelerate.",
    "W = Accelerate.",
    "Spacebar = Get on or off the bicycle."
  ],
  "simplyup-io": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Jump.",
    "Mouse Movement = Look Around / Camera Control."
  ],
  "sink-it": [
    "Desktop",
    "Mouse Movement = Aim and fire.",
    "Space = Fire (Player 1).",
    "Enter = Fire (Player 2).",
    "Mobile",
    "Tap, Hold, and Release = Shoot.",
    "Swipe = Adjust angle."
  ],
  "skibidi-shooter": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "1 = Switch weapons.",
    "2 = Switch weapons.",
    "3 = Switch weapons.",
    "Mouse Movement = Aim.",
    "Left Click = Shoot."
  ],
  "skibidi-toilet-rampage": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Spacebar = Attack or dash.",
    "Mobile",
    "Joystick = Move.",
    "Tap = Attack or dash."
  ],
  "skiing-fred": [
    "Desktop",
    "- Left Arrow (←) = Steer left.",
    "- Right Arrow (→) = Steer right.",
    "- Spacebar = Jump.",
    "- Z = Brake.",
    "- X = Jump.",
    "Mobile",
    "- Tilt = Steer/Move.",
    "- Tap Left Side of Screen = Slow down / Brake.",
    "- Tap/Hold Right Side of Screen = Jump / Speed up.",
    "- Double Tap Right Side of Screen = Perform mid-air stunts."
  ],
  "skillfite-io": [
    "Desktop",
    "W = Move character forward.",
    "A = Move character left.",
    "S = Move character backward.",
    "D = Move character right.",
    "1 - 4 = Select hotbar item.",
    "E = Open crafting menu.",
    "Shift = Dash.",
    "Space = Interact or attack.",
    "Left Click = Interact, gather, or attack.",
    "Right Click = Dash.",
    "Scroll Wheel = Zoom in or out."
  ],
  "slime-road": [
    "Desktop",
    "Left Click = Click and drag to move the slime left or right across the lanes.",
    "Mobile",
    "Swipe = Guide the slime between lanes as it bounces forward automatically.",
    "Drag = Move the slime between lanes using touch controls."
  ],
  "slime-rush-td": [
    "Desktop",
    "Left Click = Place towers on white flags.",
    "Left Click on Tower = Upgrade or sell the tower.",
    "Mobile",
    "Tap White Flags = Build towers.",
    "Tap Existing Towers = Upgrade or remove towers."
  ],
  "slope": [
    "Desktop",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "A = Steer left.",
    "D = Steer right.",
    "Mobile",
    "Tap = Steer.",
    "Swipe = Steer."
  ],
  "slope-2": [
    "Desktop",
    "- Left Arrow (←) = Move left.",
    "- Right Arrow (→) = Move right.",
    "- A = Move left.",
    "- D = Move right.",
    "- Pause Button = Pause the game.",
    "- Restart Button = Restart the game."
  ],
  "slope-3": [
    "Desktop",
    "- Left Arrow (←) = Move left.",
    "- Right Arrow (→) = Move right"
  ],
  "slope-city": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Mobile",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Swipe Up = Jump."
  ],
  "slope-tunnel": [
    "Desktop",
    "A = Rotate the tunnel left.",
    "Left Arrow (←) = Rotate the tunnel left.",
    "D = Rotate the tunnel right.",
    "Right Arrow (→) = Rotate the tunnel right.",
    "Mobile",
    "Tap Left Side of Screen = Rotate the tunnel left.",
    "Tap Right Side of Screen = Rotate the tunnel right."
  ],
  "slopey": [
    "Desktop",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "A = Steer left.",
    "D = Steer right.",
    "R = Restart after crashing (available in some versions).",
    "P or Esc = Pause the game (if supported).",
    "Mobile",
    "On-Screen Left and Right Buttons = Steer.",
    "Swipe Left = Steer left.",
    "Swipe Right = Steer right."
  ],
  "slow-roads": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake / Reverse.",
    "Down Arrow (↓) = Brake / Reverse.",
    "A = Steer left.",
    "Left Arrow (←) = Steer left.",
    "D = Steer right.",
    "Right Arrow (→) = Steer right.",
    "Shift = Car boost.",
    "R = Reset vehicle.",
    "C = Change camera angle.",
    "Q / E = Change weather and lighting conditions.",
    "F = Toggle auto-drive.",
    "H = Toggle headlights.",
    "Space = Handbrake.",
    "\\ (Hold) = Sticky steer."
  ],
  "smash-karts": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Drive backward.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Drive backward.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Fire or Use Power-Up.",
    "Mobile",
    "On-Screen Joystick = Drive.",
    "Weapon Button = Fire or Use Power-Up."
  ],
  "snail-bob-5-love-story": [
    "Desktop",
    "Left Click = Interact with objects such as buttons, levers, and platforms, or click the snail to make it stop or hide in its shell.",
    "Mobile",
    "Turn Around Button = Make the snail face the opposite direction.",
    "Speed Up Button = Increase or decrease the snail's movement speed."
  ],
  "snail-bob-6-winter-story": [
    "Desktop",
    "Left Click = Interact with objects, buttons, levers, and platforms. Click the snail to make it stop or hide in its shell.",
    "Turn Around Button = Make the snail turn to face the opposite direction.",
    "Speed Up Button = Increase or decrease the snail's movement speed."
  ],
  "snail-bob-7-fantasy-story": [
    "Desktop",
    "Mouse Movement = Click buttons, levers, and other objects.",
    "Left Click = Interact with objects.",
    "1 = Change Bob's movement speed.",
    "2 = Make Bob hide in his shell or stop moving.",
    "Spacebar = Turn Bob around and move in the opposite direction."
  ],
  "snail-bob-8-island-story": [
    "Desktop",
    "Left Click = Interact with buttons, levers, and other interactive objects.",
    "1 = Change Bob's speed.",
    "2 = Stop or start Bob.",
    "Spacebar = Change Bob's direction."
  ],
  "snake": [
    "Desktop",
    "Up Arrow (↑) = Move the snake upward.",
    "Down Arrow (↓) = Move the snake downward.",
    "Left Arrow (←) = Move the snake left.",
    "Right Arrow (→) = Move the snake right.",
    "W = Move the snake upward.",
    "A = Move the snake left.",
    "S = Move the snake downward.",
    "D = Move the snake right.",
    "P or Esc = Pause the game.",
    "Mobile",
    "Swipe Up = Move the snake upward.",
    "Swipe Down = Move the snake downward.",
    "Swipe Left = Move the snake left.",
    "Swipe Right = Move the snake right."
  ],
  "snake-clash": [
    "Desktop",
    "Mouse Movement = Move your snake in the desired direction.",
    "W = Steer your snake.",
    "A = Steer your snake.",
    "S = Steer your snake.",
    "D = Steer your snake.",
    "Up Arrow (↑) = Steer your snake.",
    "Down Arrow (↓) = Steer your snake.",
    "Left Arrow (←) = Steer your snake.",
    "Right Arrow (→) = Steer your snake.",
    "Left Click = Activate a speed boost.",
    "Spacebar = Activate a speed boost.",
    "Mobile",
    "Swipe = Move your snake in the desired direction."
  ],
  "snake-io": [
    "Desktop",
    "Mouse Drag = Move and steer your snake.",
    "W = Move your snake forward.",
    "A = Move your snake left.",
    "S = Move your snake backward.",
    "D = Move your snake right.",
    "Hold Left Click = Activate a speed boost.",
    "Spacebar = Activate a speed boost."
  ],
  "snay-io": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Spacebar = Split.",
    "W = Feed (eject mass).",
    "E = Macro.",
    "Q = Double Split.",
    "F = Quad Split.",
    "G = Grapple/Minions.",
    "Scroll Wheel Up = Zoom in.",
    "Scroll Wheel Down = Zoom out.",
    "Mouse Movement = Direct movement.",
    "Left Click = Split (when configured)."
  ],
  "sniper-3d": [
    "Desktop",
    "Mouse Movement = Aim.",
    "Left Click = Fire weapon.",
    "Right Click = Zoom in or out.",
    "Scroll Wheel = Zoom in or out.",
    "R = Reload.",
    "Spacebar = Hold breath for a steadier aim.",
    "Mobile",
    "Drag = Aim.",
    "Tap = Shoot.",
    "Pinch = Zoom."
  ],
  "sniper-shot-bullet-time": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Right Click = Aim.",
    "Left Click = Shoot.",
    "Scroll Wheel = Zoom In / Out.",
    "Spacebar = Jump."
  ],
  "snipey-io": [
    "Desktop",
    "Mouse Movement = Direct the character’s movement around the arena.",
    "Left Click = Attack nearby enemies.",
    "Right Click = Trigger a speed boost."
  ],
  "snow-rider-3d": [
    "Desktop",
    "Left Arrow (←) = Steer left.",
    "A = Steer left.",
    "Right Arrow (→) = Steer right.",
    "D = Steer right.",
    "Spacebar = Jump.",
    "Mobile",
    "Swipe Left = Steer left.",
    "Swipe Right = Steer right.",
    "Tap = Jump."
  ],
  "snowball-io": [
    "Mobile",
    "Drag Finger = Move the character and build or aim the snowball.",
    "Lift Finger = Launch the snowball."
  ],
  "soccer-bros": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "G = Kick / Tackle.",
    "Spacebar = Kick / Tackle.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "L = Kick / Tackle."
  ],
  "soccer-dash": [
    "Physical Controls",
    "Two-Button Control Panel = Select game mode."
  ],
  "soccer-heads": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Spacebar = Kick.",
    "A = Move left.",
    "D = Move right.",
    "W = Jump.",
    "S = Kick.",
    "Down Arrow (↓) = Kick."
  ],
  "soccer-legends-2021": [
    "Desktop",
    "1 Player Mode",
    "Player 1",
    "A = Move left.",
    "D = Move right.",
    "W = Jump.",
    "S = Slide.",
    "X = Shoot.",
    "Z = Super Shot.",
    "Player 2",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Slide.",
    "L = Shoot.",
    "K = Super Shot.",
    "2 Player Mode",
    "Player 1",
    "A = Move left.",
    "D = Move right.",
    "W = Jump.",
    "S = Slide.",
    "B = Shoot.",
    "V = Super Shot.",
    "Player 2",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Slide.",
    "L = Shoot.",
    "K = Super Shot."
  ],
  "soccer-random": [
    "Desktop",
    "W = Player 1 controls (Jump and Kick).",
    "Up Arrow (↑) = Player 2 controls (Jump and Kick).",
    "Mobile",
    "Tap = Jump and kick the ball."
  ],
  "soccer-skills-champions-league": [
    "Desktop",
    "Click + Drag = Move and aim.",
    "Release = Pass or shoot.",
    "Long Drag = Increase shot power.",
    "Mobile",
    "Tap + Drag = Move and aim.",
    "Release = Kick the ball.",
    "Short Flick = Make a quick or accurate pass."
  ],
  "soccer-skills-euro-cup": [
    "Desktop",
    "Mouse Movement = Move player.",
    "Left Click Release = Pass / Shoot.",
    "Longer Drag = Increase power.",
    "Mobile",
    "Drag = Move player.",
    "Release Finger = Pass / Shoot.",
    "Longer Swipe = Increase power and speed."
  ],
  "soccer-skills-world-cup": [
    "Desktop",
    "- Click + Drag = Move the active player in the direction of the drag.",
    "- Release Mouse Button = Pass, shoot, or kick the ball.",
    "- Drag Distance = Determines movement speed and kick power (shorter drags for passes, longer drags for shots).",
    "Mobile",
    "- Tap + Drag = Move the active player in the direction of the drag.",
    "- Release Finger = Pass, shoot, or kick the ball.",
    "- Drag Distance = Determines movement speed and kick power (shorter drags for passes, longer drags for shots)."
  ],
  "sonic-the-hedgehog-remastere": [
    "Mobile",
    "Directional Pad = Move Sonic.",
    "Jump Button = Jump and attack enemies.",
    "Touch Controls = Navigate menus and gameplay.",
    "Controller",
    "D-Pad / Left Stick = Move.",
    "Action Button = Jump.",
    "Start = Pause Game."
  ],
  "space-is-key": [
    "Desktop",
    "Spacebar = Jump.",
    "M = Mute or unmute audio."
  ],
  "spider-solitaire": [
    "Desktop",
    "- Left Click = Click and drag cards to move them, or select and move cards to a valid position.",
    "- Ctrl + Z = Undo Move.",
    "- Ctrl + H = Show Hint.",
    "Mobile",
    "- Tap = Select and move cards or interact with game buttons.",
    "- Drag = Move cards across the tableau."
  ],
  "sprinter": [
    "Desktop",
    "Left Arrow (←) = Run.",
    "Right Arrow (→) = Run.",
    "Alternate Left and Right Arrow keys rapidly to build speed and maintain momentum."
  ],
  "squid-game": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Spacebar = Jump.",
    "Left Click = Interact / Scratch Cookie / Pull Rope / Attack.",
    "E = Pick Up Weapon.",
    "G = Drop Weapon.",
    "T = Open Chat."
  ],
  "stabfish-2": [
    "Desktop",
    "Mouse Movement = Aim and direct your weapon.",
    "Left Click = Use skill.",
    "Right Click = Use skill."
  ],
  "stabfish-io": [
    "Desktop",
    "Mouse Movement = Control the direction and steering of the fish.",
    "Left Click (Hold) = Activate the boost ability to swim faster.",
    "Mouse Position (Centered) = Keep the mouse directly over the fish to keep it stationary.",
    "Mobile",
    "On-Screen Joystick / Drag = Control the fish’s movement.",
    "Double Tap = Activate the boost ability.",
    "Two-Finger Tap/Hold = Boost while controlling movement."
  ],
  "stack-bump-3d": [
    "Desktop",
    "W = Jump / Control character.",
    "Up Arrow (↑) = Jump / Control character.",
    "Mobile",
    "Tap = Jump / Control character."
  ],
  "stair-race-3d": [
    "Desktop",
    "Left Click + Drag = Move the character.",
    "Mobile",
    "Tap + Drag = Move the character."
  ],
  "starblast": [
    "Desktop",
    "W = Move and steer your ship.",
    "A = Strafe left (when enabled in custom games).",
    "S = Move and steer your ship.",
    "D = Strafe right (when enabled in custom games).",
    "Up Arrow (↑) = Move and steer your ship.",
    "Down Arrow (↓) = Move and steer your ship.",
    "Left Arrow (←) = Move and steer your ship.",
    "Right Arrow (→) = Move and steer your ship.",
    "Spacebar = Fire weapons.",
    "Alt = Fire secondary weapon.",
    "W = Open secondary weapon shop (Survival mode).",
    "U = Open/close upgrade bar.",
    "R = Toggle radar.",
    "C = Toggle chat commands.",
    "Tab = Toggle leaderboard.",
    "Z = Take a screenshot.",
    "V = Give gems to teammates (Team Mode).",
    "Mouse Movement = Aim and steer your ship.",
    "Left Click = Fire weapons.",
    "Right Click = Move/steer (hold and drag).",
    "Scroll Wheel = Select secondary weapons."
  ],
  "steal-a-brainrot": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Space = Jump.",
    "Left Click = Interact with UI, purchase items, and steal/collect Brainrots.",
    "Number Keys / Hotbar Keys = Select troll gear or items.",
    "Mobile",
    "Left Virtual Joystick = Move character.",
    "Tap Buttons = Interact with UI, buy Brainrots, and activate abilities.",
    "Tap = Select characters or items.",
    "Drag = Move characters or items."
  ],
  "stealing-the-diamond": [
    "Desktop",
    "Left Click = Select menu options and interact with choices."
  ],
  "stick-archers-battle": [
    "Desktop",
    "- W = Charge and fire arrow (Blue Player).",
    "- Up Arrow (↑) = Charge and fire arrow (Red Player).",
    "Mobile",
    "- Tap and Hold = Charge arrow.",
    "- Release = Fire arrow."
  ],
  "stick-defenders": [
    "Desktop",
    "Click + Drag = Move units to merge them.",
    "Click Upgrade Buttons = Improve defenses.",
    "Click Ability Icons = Activate special skills.",
    "Mobile",
    "Tap + Drag = Move units to merge them.",
    "Tap Upgrade Buttons = Improve defenses.",
    "Tap Ability Icons = Activate special skills."
  ],
  "stick-duel-battle": [
    "Desktop",
    "Up Arrow (↑) = Move upward and jump.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "L = Shoot.",
    "W = Move forward and jump.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "F = Shoot."
  ],
  "stick-merge": [
    "Desktop",
    "- Left Click + Drag = Select, move, and merge weapons.",
    "- Mouse Movement = Aim.",
    "- Left Click = Shoot.",
    "Mobile",
    "- Tap + Drag = Select, move, and merge weapons.",
    "- Drag = Aim.",
    "- Tap = Shoot."
  ],
  "stick-merge-halloween": [
    "Desktop",
    "Click and Drag = Select, move, and merge weapons.",
    "Mouse Movement = Aim at enemies (firing is automatic).",
    "Mobile",
    "Tap and Drag = Select, move, and merge weapons.",
    "Touch and Move = Aim at targets (firing is automatic)."
  ],
  "stickbattle-lo": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Spacebar = Jump.",
    "E = Interact / Pickup weapon.",
    "R = Reload weapon.",
    "Left Click = Shoot / Attack.",
    "Right Click = Aim.",
    "Mouse Movement = Aim / Look around."
  ],
  "stickman-army-the-resistance": [
    "Desktop",
    "- Left Click (Left Side of Screen) = Target and shoot the left lane.",
    "- Left Click (Right Side of Screen) = Target and shoot the right lane.",
    "- On-Screen UI Buttons = Activate Rage Mode and deploy defensive structures.",
    "Mobile",
    "- Tap (Left Side of Screen) = Target and shoot the left lane.",
    "- Tap (Right Side of Screen) = Target and shoot the right lane.",
    "- Tap On-Screen UI Buttons = Activate Rage Mode and deploy defensive structures."
  ],
  "stickman-boost": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "A = Move left.",
    "Right Arrow (→) = Move right.",
    "D = Move right.",
    "Up Arrow (↑) = Jump.",
    "W = Jump.",
    "Double Tap Up Arrow (↑) = Perform a higher or longer jump.",
    "Down Arrow (↓) = Slide / Crouch.",
    "S = Slide / Crouch.",
    "R = Restart Level.",
    "Mobile",
    "On-Screen Arrows = Move.",
    "Jump Button = Jump.",
    "Slide Button = Slide / Crouch."
  ],
  "stickman-boost-2": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "A = Move left.",
    "D = Move right.",
    "Up Arrow (↑) = Jump or double jump.",
    "W = Jump or double jump.",
    "Down Arrow (↓) = Slide under obstacles.",
    "S = Slide under obstacles."
  ],
  "stickman-fighter-2": [
    "Desktop",
    "- Left Arrow (←) = Move left.",
    "- A = Move left.",
    "- Right Arrow (→) = Move right.",
    "- D = Move right.",
    "- Up Arrow (↑) = Jump.",
    "- W = Jump.",
    "- Down Arrow (↓) = Crouch / Dodge.",
    "- S = Crouch / Dodge.",
    "- Space = Attack / Shoot (varies by specific version/level).",
    "- F = Attack / Shoot (varies by specific version/level).",
    "- L = Attack / Shoot (varies by specific version/level)."
  ],
  "stickman-fighter-epic-battle": [
    "Desktop",
    "Left Arrow (←) = Attack left.",
    "Right Arrow (→) = Attack right."
  ],
  "stickman-fighter-epic-battle-2": [
    "Desktop",
    "Left Arrow (←) = Attack left.",
    "Right Arrow (→) = Attack right.",
    "A = Attack left.",
    "D = Attack right."
  ],
  "stickman-fighter-mega-brawl": [
    "Desktop",
    "Left Arrow (←) = Attack enemies on the left.",
    "Right Arrow (→) = Attack enemies on the right.",
    "Mobile",
    "Tap Left Side of Screen = Attack enemies on the left.",
    "Tap Right Side of Screen = Attack enemies on the right."
  ],
  "stickman-golf": [
    "Desktop",
    "- Left Arrow (←) = Aim left.",
    "- Right Arrow (→) = Aim right.",
    "- Space = Power up or shoot.",
    "- Left Click = Power up or shoot (varies by version).",
    "Mobile",
    "- Tap = Power up or shoot (varies by version).",
    "- Drag = Aim (in some versions).",
    "- Swipe = Aim (in some versions)."
  ],
  "stickman-hook": [
    "Desktop",
    "Left Click = Attach to a hook.",
    "Hold Click = Swing.",
    "Release Click = Let go of the rope.",
    "Spacebar = Acts as a click input in some versions.",
    "Mobile",
    "Tap and Hold = Attach and swing.",
    "Release Touch = Let go of the rope."
  ],
  "stickman-ragdoll-crash-fun": [
    "Desktop",
    "Left Click + Hold = Aim and set launch power.",
    "Release Left Click = Launch the stickman.",
    "R = Restart the current level.",
    "Mobile",
    "Tap + Drag = Aim and set launch power.",
    "Release = Launch the stickman."
  ],
  "stickman-run": [
    "Desktop",
    "Space = Jump.",
    "Up Arrow (↑) = Jump.",
    "Left Click = Jump."
  ],
  "stickman-school-run": [
    "Desktop",
    "Up Arrow (↑) = Jump.",
    "W = Jump.",
    "Down Arrow (↓) = Roll.",
    "S = Roll.",
    "Space = Throw projectiles.",
    "Mobile",
    "Tap Left Side = Jump.",
    "Swipe Down = Roll.",
    "Tap Right Side = Throw projectiles."
  ],
  "stickman-vs-zombies": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Jump.",
    "Up Arrow (↑) = Jump.",
    "S = Drop Weapon.",
    "Down Arrow (↓) = Drop Weapon.",
    "Spacebar = Shoot.",
    "Numpad 0 = Shoot.",
    "Mobile",
    "On-Screen Virtual Buttons = Move, jump, shoot, and perform other actions."
  ],
  "stickman-warriors": [
    "Mobile",
    "Movement Pad = Move, jump, and dash.",
    "Ki/Charge Button = Hold to charge energy for special moves.",
    "Attack Buttons = Execute melee punches and kicks.",
    "Skill Buttons = Trigger special attacks, ultimate abilities, and transformations.",
    "Guard Button = Hold to block incoming attacks and reduce damage."
  ],
  "stock-car-hero": [
    "Desktop",
    "Left Arrow (←) = Steer left.",
    "A = Steer left.",
    "Right Arrow (→) = Steer right.",
    "D = Steer right.",
    "Auto Acceleration = Enabled.",
    "Mobile",
    "Tap Left Side of Screen = Steer left.",
    "Hold Left Side of Screen = Steer left.",
    "Tap Right Side of Screen = Steer right.",
    "Hold Right Side of Screen = Steer right.",
    "Light Swipes = Make smoother steering adjustments."
  ],
  "street-ball-jam": [
    "Desktop",
    "- Left Click = Jump and shoot.",
    "- Spacebar = Jump and shoot.",
    "Mobile",
    "- Tap Screen = Jump and shoot."
  ],
  "street-ball-star": [
    "Desktop",
    "Left Click (Hold) = Aim and adjust direction.",
    "Left Click (Release) = Shoot."
  ],
  "striker-dummies": [
    "Desktop",
    "W = Move upward and swing.",
    "A = Move left and swing.",
    "S = Move downward and swing.",
    "D = Move right and swing.",
    "Up Arrow (↑) = Move upward and swing.",
    "Down Arrow (↓) = Move downward and swing.",
    "Left Arrow (←) = Move left and swing.",
    "Right Arrow (→) = Move right and swing."
  ],
  "stunt-biker-3d": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake / Reverse.",
    "Down Arrow (↓) = Brake / Reverse.",
    "A = Lean left / Balance.",
    "Left Arrow (←) = Lean left / Balance.",
    "D = Lean right / Balance.",
    "Right Arrow (→) = Lean right / Balance.",
    "Space = Handbrake / Jump.",
    "Shift = Nitro Boost.",
    "R = Restart Level.",
    "Mobile",
    "Left Side of Screen = Lean / Balance.",
    "Right Side of Screen = Accelerate / Brake."
  ],
  "stunt-car-challenge-3": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "W = Accelerate.",
    "Down Arrow (↓) = Brake / Reverse.",
    "S = Brake / Reverse.",
    "Left Arrow (←) = Tilt left.",
    "A = Tilt left.",
    "Right Arrow (→) = Tilt right.",
    "D = Tilt right.",
    "Mobile",
    "On-screen Buttons = Accelerate, brake, and tilt/balance."
  ],
  "stupid-zombies": [
    "Desktop",
    "Mouse Movement = Aim.",
    "Left Click = Shoot.",
    "Scroll Wheel = Adjust Zoom.",
    "Supported Keys = Adjust Zoom (on supported versions).",
    "Mobile",
    "Drag = Aim.",
    "Release = Fire."
  ],
  "stupid-zombies-2": [
    "Desktop",
    "Mouse Movement = Aim.",
    "Left Click + Drag = Aim.",
    "Release = Shoot.",
    "Mobile",
    "Tap and Hold = Aim.",
    "Release = Shoot."
  ],
  "subway-princess-runner": [
    "Mobile",
    "Swipe Left = Move to the left lane.",
    "Swipe Right = Move to the right lane.",
    "Swipe Up = Jump over obstacles.",
    "Swipe Down = Slide under barriers.",
    "Double Tap = Activate skateboard."
  ],
  "subway-surfers": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "A = Move left.",
    "Right Arrow (→) = Move right.",
    "D = Move right.",
    "Up Arrow (↑) = Jump.",
    "W = Jump.",
    "Down Arrow (↓) = Roll.",
    "S = Roll.",
    "Spacebar = Activate Hoverboard.",
    "Mobile",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Swipe Up = Jump.",
    "Swipe Down = Roll.",
    "Double Tap = Activate Hoverboard."
  ],
  "subway-surfers-bali": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "A = Move left.",
    "D = Move right.",
    "Up Arrow (↑) = Jump.",
    "W = Jump.",
    "Down Arrow (↓) = Roll.",
    "S = Roll.",
    "Spacebar = Activate hoverboard.",
    "Mobile",
    "Swipe Left = Change lanes.",
    "Swipe Right = Change lanes.",
    "Swipe Up = Jump.",
    "Swipe Down = Roll.",
    "Double Tap = Activate hoverboard."
  ],
  "subway-surfers-beijing": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Roll.",
    "Space = Activate hoverboard.",
    "Mobile",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Swipe Up = Jump.",
    "Swipe Down = Roll.",
    "Double Tap = Activate hoverboard."
  ],
  "subway-surfers-havana": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Roll.",
    "Space = Activate Hoverboard.",
    "Mobile",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Swipe Up = Jump.",
    "Swipe Down = Roll.",
    "Double Tap = Activate Hoverboard."
  ],
  "subway-surfers-hawaii": [
    "Desktop",
    "- Left Arrow (←) = Move left.",
    "- A = Move left.",
    "- Right Arrow (→) = Move right.",
    "- D = Move right.",
    "- Up Arrow (↑) = Jump.",
    "- W = Jump.",
    "- Down Arrow (↓) = Roll.",
    "- S = Roll.",
    "- Spacebar = Activate hoverboard.",
    "Mobile",
    "- Swipe Left = Switch lanes.",
    "- Swipe Right = Switch lanes.",
    "- Swipe Up = Jump.",
    "- Swipe Down = Roll.",
    "- Double Tap = Activate hoverboard."
  ],
  "subway-surfers-hongkong": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Roll / Duck.",
    "Spacebar = Activate Hoverboard.",
    "Mobile",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Swipe Up = Jump.",
    "Swipe Down = Roll / Duck.",
    "Double Tap = Activate Hoverboard."
  ],
  "subway-surfers-houston": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Roll.",
    "Space = Activate hoverboard.",
    "Mobile",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Swipe Up = Jump.",
    "Swipe Down = Roll.",
    "Double Tap = Activate hoverboard."
  ],
  "subway-surfers-monaco": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Roll / Slide.",
    "Spacebar = Activate hoverboard.",
    "Mobile",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Swipe Up = Jump.",
    "Swipe Down = Roll / Slide.",
    "Double Tap = Activate hoverboard."
  ],
  "subway-surfers-mumbai": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Roll.",
    "Space = Activate hoverboard.",
    "Mobile",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Swipe Up = Jump.",
    "Swipe Down = Roll.",
    "Double Tap = Activate hoverboard."
  ],
  "subway-surfers-new-orleans": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Roll / Slide.",
    "Space = Activate hoverboard.",
    "Mobile",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Swipe Up = Jump.",
    "Swipe Down = Roll / Slide.",
    "Double Tap = Activate hoverboard."
  ],
  "subway-surfers-new-york": [
    "Desktop",
    "- Left Arrow (←) = Move left.",
    "- Right Arrow (→) = Move right.",
    "- A = Move left.",
    "- D = Move right.",
    "- Up Arrow (↑) = Jump.",
    "- W = Jump.",
    "- Down Arrow (↓) = Slide or roll.",
    "- S = Slide or roll.",
    "- Space = Activate hoverboard."
  ],
  "subway-surfers-san-francisco": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "A = Move left.",
    "Right Arrow (→) = Move right.",
    "D = Move right.",
    "Up Arrow (↑) = Jump.",
    "W = Jump.",
    "Down Arrow (↓) = Slide / Roll.",
    "S = Slide / Roll.",
    "Spacebar = Activate hoverboard.",
    "Mobile",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Swipe Up = Jump.",
    "Swipe Down = Slide / Roll.",
    "Double Tap = Activate hoverboard."
  ],
  "subway-surfers-singapore": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Roll / Slide.",
    "Space = Activate Hoverboard.",
    "Mobile",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Swipe Up = Jump.",
    "Swipe Down = Roll / Slide.",
    "Double Tap = Activate Hoverboard."
  ],
  "subway-surfers-tokyo": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "A = Move left.",
    "Right Arrow (→) = Move right.",
    "D = Move right.",
    "Up Arrow (↑) = Jump.",
    "W = Jump.",
    "Down Arrow (↓) = Roll / Slide.",
    "S = Roll / Slide.",
    "Spacebar = Activate Hoverboard.",
    "Mobile",
    "Swipe Left = Change lanes.",
    "Swipe Right = Change lanes.",
    "Swipe Up = Jump.",
    "Swipe Down = Roll / Slide.",
    "Double Tap = Activate Hoverboard."
  ],
  "subway-surfers-venice": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "A = Move left.",
    "Right Arrow (→) = Move right.",
    "D = Move right.",
    "Up Arrow (↑) = Jump.",
    "W = Jump.",
    "Down Arrow (↓) = Roll / Slide.",
    "S = Roll / Slide.",
    "Spacebar = Activate hoverboard.",
    "Mobile",
    "Swipe Left / Right = Change lanes.",
    "Swipe Up = Jump.",
    "Swipe Down = Roll / Slide.",
    "Tap Hoverboard Button = Activate hoverboard."
  ],
  "subway-surfers-winter-holiday": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Roll / Slide.",
    "Space = Activate hoverboard.",
    "Mobile",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Swipe Up = Jump.",
    "Swipe Down = Roll / Slide.",
    "Double Tap = Activate hoverboard."
  ],
  "subway-surfers-zurich": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "A = Move left.",
    "D = Move right.",
    "Up Arrow (↑) = Jump.",
    "W = Jump.",
    "Down Arrow (↓) = Roll or slide.",
    "S = Roll or slide.",
    "Space = Activate hoverboard (when available).",
    "Mobile",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Swipe Up = Jump.",
    "Swipe Down = Roll or slide.",
    "Double Tap = Activate hoverboard (when available)."
  ],
  "sugar-shock": [
    "Desktop",
    "- Left Click = Click and drag candies to swap neighboring candies and create matches.",
    "Mobile",
    "- Tap = Select candies.",
    "- Swipe = Drag candies to swap and create matches."
  ],
  "suika-game": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Down Arrow (↓) = Drop fruit.",
    "Mouse Movement = Position fruit.",
    "Left Click = Drop fruit.",
    "Mobile",
    "Drag = Position fruit.",
    "Tap = Drop fruit."
  ],
  "super-bike-the-champion": [
    "Desktop",
    "W = Steer, accelerate, and brake.",
    "A = Steer, accelerate, and brake.",
    "S = Steer, accelerate, and brake.",
    "D = Steer, accelerate, and brake.",
    "Up Arrow (↑) = Steer, accelerate, and brake.",
    "Down Arrow (↓) = Steer, accelerate, and brake.",
    "Left Arrow (←) = Steer, accelerate, and brake.",
    "Right Arrow (→) = Steer, accelerate, and brake.",
    "Spacebar = Respawn.",
    "C = Change camera view.",
    "Controller",
    "Gamepad = Optional controller support for racing controls."
  ],
  "super-falling-fred": [
    "Desktop",
    "- Left Arrow (←) = Move left.",
    "- Right Arrow (→) = Move right.",
    "- A = Move left.",
    "- D = Move right.",
    "Mobile",
    "- Drag = Move character left or right."
  ],
  "super-fowlst": [
    "Desktop",
    "A = Flap left.",
    "Left Arrow (←) = Flap left.",
    "D = Flap right.",
    "Right Arrow (→) = Flap right.",
    "W = Use equipped item.",
    "Up Arrow (↑) = Use equipped item.",
    "Spacebar = Use equipped item.",
    "Esc = Pause the game.",
    "P = Pause the game.",
    "Mobile",
    "Tap Left Side = Flap left.",
    "Tap Right Side = Flap right.",
    "Swipe Up = Use equipped item."
  ],
  "super-hexbee-merger": [
    "Desktop",
    "Mouse Movement = Position hexagon pieces on the board.",
    "Left Click + Drag = Select, move, and place hexagon pieces onto the grid.",
    "Pause / Menu Button = Pause the game, open settings, or restart when available.",
    "Refresh Page = Start a new game if no restart option is provided.",
    "Mobile",
    "Tap + Drag = Select, move, and place hexagon pieces onto the grid.",
    "Pause / Menu Button = Pause the game, open settings, or restart when available.",
    "Refresh Page = Start a new game if no restart option is provided."
  ],
  "super-hot": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Mouse Movement = Aim.",
    "Left Click = Shoot, melee, pick up weapon, or interact.",
    "Right Click = Throw weapon.",
    "Spacebar = Jump.",
    "R = Restart level.",
    "E = Hotswitch (in specific late-game campaign stages)."
  ],
  "super-liquid-soccer": [
    "Desktop",
    "- W = Move forward.",
    "- A = Move left.",
    "- S = Move backward.",
    "- D = Move right.",
    "- M = Pass.",
    "- J = Shoot / Header.",
    "- L = Chip / Cross.",
    "- I = Through Pass.",
    "- Q = Switch Player.",
    "- E = Switch Player.",
    "- P = Sprint.",
    "- O = Sprint."
  ],
  "super-mario-64": [
    "Desktop",
    "Control Stick = Move Mario.",
    "A Button = Jump.",
    "B Button = Punch, attack, talk, or grab.",
    "Z Button = Crouch, crawl, or ground pound.",
    "C-Buttons = Control the camera.",
    "R Button = Change camera view.",
    "Start Button = Pause."
  ],
  "super-mario-bros": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Down Arrow (↓) = Crouch (when Super Mario).",
    "Z / Ctrl = Jump / Swim.",
    "X / Alt = Run / Throw fireballs (when Fire Mario).",
    "Enter = Start game / Pause.",
    "Select = Select game mode (at title screen only)."
  ],
  "super-mx-the-champion": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Left Arrow (←) = Steer left.",
    "Down Arrow (↓) = Reverse.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Respawn."
  ],
  "super-onion-boy": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Z = Jump.",
    "X = Attack.",
    "P = Pause the game.",
    "Mobile",
    "Left Side of Screen = Move left.",
    "Right Side of Screen = Move right.",
    "Jump Icon = Jump.",
    "Attack Icon = Attack."
  ],
  "super-santa-kicker": [
    "Desktop",
    "Left Click + Drag = Aim and set kick power.",
    "Release Left Click = Launch Santa.",
    "Mobile",
    "Tap + Drag = Aim and set kick power.",
    "Release = Launch Santa."
  ],
  "super-tunnel-rush": [
    "Desktop",
    "A = Steer left.",
    "Left Arrow (←) = Steer left.",
    "D = Steer right.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Pause.",
    "Mobile",
    "Tap and Hold Left Side of Screen = Steer left.",
    "Tap and Hold Right Side of Screen = Steer right.",
    "Mouse",
    "Click Left Side of Screen = Move left.",
    "Click Right Side of Screen = Move right."
  ],
  "superbattle-2": [
    "Desktop",
    "W = Player 1 movement and actions.",
    "A = Player 1 movement and actions.",
    "S = Player 1 movement and actions.",
    "D = Player 1 movement and actions.",
    "Arrow Keys = Player 2 movement and actions.",
    "Mobile",
    "On-Screen Touch Controls = Control movement and actions on supported devices."
  ],
  "superbike-hero": [
    "Desktop",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake.",
    "Mobile",
    "Tap / Hold Left Side of Screen = Steer left.",
    "Tap / Hold Right Side of Screen = Steer right."
  ],
  "surviv-io": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "1 = Equip Primary Weapon.",
    "2 = Equip Secondary Weapon.",
    "3 = Equip Melee / Fists.",
    "E = Equip Melee / Fists.",
    "4 = Equip / Cycle Throwables.",
    "F = Interact (Pick up items, open doors, revive).",
    "R = Reload.",
    "X = Cancel Action.",
    "Q = Equip Last Weapon.",
    "T = Switch Gun Slots.",
    "7 = Use Bandage.",
    "8 = Use Med Kit.",
    "9 = Use Soda.",
    "0 = Use Pills.",
    "M = Open Map.",
    "G = Open Map.",
    "V = Toggle Minimap.",
    "L = Toggle Fullscreen.",
    "Esc = Open Menu.",
    "C = Hold for Team Ping.",
    "Mouse Movement = Aim.",
    "Left Click = Fire / Use Item / Scope Zoom.",
    "Right Click = Open Emote Wheel.",
    "Right Click on Item = Drop Item.",
    "Scroll Wheel = Switch Weapons / Change Scope Zoom."
  ],
  "survivor-in-rainbow-monster": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right."
  ],
  "swatforce-vs-terrorists": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Mouse Movement = Aim.",
    "Left Click = Shoot.",
    "Right Click = Aim Down Sights (if available).",
    "R = Reload.",
    "Shift = Sprint.",
    "Spacebar = Jump.",
    "Mobile",
    "Tap = Shoot at enemies.",
    "On-screen Interface = Switch weapons or manage defenses."
  ],
  "swingo": [
    "Desktop",
    "Left Click (Hold & Drag) = Aim grappling hook.",
    "Left Click (Release) = Launch hook and pull forward.",
    "Mobile",
    "Tap, Drag, and Release = Aim and launch grappling hook."
  ],
  "swipe-fighter-heroes": [
    "Desktop",
    "Mouse Movement = Swipe to Attack.",
    "Down Arrow (↓) = Block.",
    "Up Arrow (↑) = Kick.",
    "Right Arrow (→) = Punch.",
    "Q = Special Attack.",
    "W = Special Attack.",
    "Mobile",
    "Swipe Up = Attack, Perform Moves, and Defend.",
    "Swipe Down = Attack, Perform Moves, and Defend.",
    "Swipe Left = Attack, Perform Moves, and Defend.",
    "Swipe Right = Attack, Perform Moves, and Defend.",
    "Tap = Kick, Punch, Block, and Special Moves."
  ],
  "table-tennis-ultimate-tournament": [
    "Desktop",
    "Mouse Movement Up / Down = Control the height and reach of your paddle swing.",
    "Mouse Swipe Left / Right = Hit the ball back to your opponent.",
    "Left Click = Perform powerful shots with faster swings."
  ],
  "table-tennis-world-tour": [
    "Desktop",
    "Mouse Movement = Move the paddle and hit the ball."
  ],
  "tag": [
    "Desktop",
    "W = Player 1 control.",
    "A = Player 1 control.",
    "S = Player 1 control.",
    "D = Player 1 control.",
    "T = Player 2 control.",
    "F = Player 2 control.",
    "G = Player 2 control.",
    "H = Player 2 control.",
    "I = Player 3 control.",
    "J = Player 3 control.",
    "K = Player 3 control.",
    "L = Player 3 control.",
    "Up Arrow (↑) = Player 4 control.",
    "Left Arrow (←) = Player 4 control.",
    "Down Arrow (↓) = Player 4 control.",
    "Right Arrow (→) = Player 4 control."
  ],
  "tag-2": [
    "Desktop",
    "W = Move forward (Player 1).",
    "A = Move left (Player 1).",
    "D = Move right (Player 1).",
    "Up Arrow (↑) = Move forward (Player 2).",
    "Left Arrow (←) = Move left (Player 2).",
    "Right Arrow (→) = Move right (Player 2).",
    "J = Move left (Player 3).",
    "I = Move forward (Player 3).",
    "L = Move right (Player 3).",
    "F = Move left (Player 4).",
    "T = Move forward (Player 4).",
    "H = Move right (Player 4)."
  ],
  "taming-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Left Arrow (←) = Move left.",
    "Down Arrow (↓) = Move downward.",
    "Right Arrow (→) = Move right.",
    "Left Click = Attack.",
    "E = Auto-attack.",
    "L = Lock rotate.",
    "M = Open map.",
    "C = Open shop.",
    "1 = Select Pet target.",
    "2 = Select Pet target.",
    "3 = Select Pet target.",
    "4 = Activate Pet skill.",
    "5 = Activate Pet skill.",
    "6 = Activate Pet skill."
  ],
  "tank-trouble": [
    "Desktop",
    "E = Move forward (Player 1).",
    "S = Move left (Player 1).",
    "D = Move backward (Player 1).",
    "F = Move right (Player 1).",
    "Q = Shoot (Player 1).",
    "Up Arrow (↑) = Move forward (Player 2).",
    "Left Arrow (←) = Move left (Player 2).",
    "Down Arrow (↓) = Move backward (Player 2).",
    "Right Arrow (→) = Move right (Player 2).",
    "M = Shoot (Player 2).",
    "Mouse Movement = Move (Player 3).",
    "Left Click = Shoot (Player 3).",
    "P = Pause the game."
  ],
  "tank-trouble-2": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "M = Fire.",
    "E = Move upward.",
    "S = Move downward.",
    "D = Move left.",
    "F = Move right.",
    "Q = Fire.",
    "Numpad 8 = Move upward.",
    "Numpad 5 = Move downward.",
    "Numpad 4 = Move left.",
    "Numpad 6 = Move right.",
    "Numpad 0 = Fire.",
    "I = Move upward.",
    "K = Move downward.",
    "J = Move left.",
    "L = Move right.",
    "Y = Fire."
  ],
  "tanuki-sunset": [
    "Desktop",
    "A = Steer left.",
    "Left Arrow (←) = Steer left.",
    "D = Steer right.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Drift.",
    "Esc = Pause the Game."
  ],
  "tap-goal": [
    "Desktop",
    "Left Click = Change direction.",
    "Mobile",
    "Tap = Change direction."
  ],
  "tap-tap-shots": [
    "Desktop",
    "Left Click = Make the basketball jump and shoot toward the hoop.",
    "Mobile",
    "Tap = Make the basketball jump and shoot toward the hoop."
  ],
  "temple-of-boom": [
    "Desktop",
    "Up Arrow (↑) = Jump / Double jump.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Down Arrow (↓) = Pick up weapon.",
    "W = Jump / Double jump.",
    "A = Move left.",
    "D = Move right.",
    "S = Pick up weapon.",
    "Z = Shoot.",
    "X = Switch weapon.",
    "C = Shoot.",
    "V = Switch weapon.",
    "K = Shoot.",
    "L = Switch weapon."
  ],
  "temple-run": [
    "Desktop",
    "W = Jump.",
    "Up Arrow (↑) = Jump.",
    "S = Slide.",
    "Down Arrow (↓) = Slide.",
    "A = Turn left.",
    "Left Arrow (←) = Turn left.",
    "D = Turn right.",
    "Right Arrow (→) = Turn right.",
    "Mobile",
    "Swipe Up = Jump.",
    "Swipe Down = Slide.",
    "Swipe Left = Turn left.",
    "Swipe Right = Turn right.",
    "Tilt Device = Move side to side."
  ],
  "temple-run-2": [
    "Desktop",
    "- A = Turn left.",
    "- Left Arrow (←) = Turn left.",
    "- D = Turn right.",
    "- Right Arrow (→) = Turn right.",
    "- W = Jump.",
    "- Up Arrow (↑) = Jump.",
    "- S = Slide.",
    "- Down Arrow (↓) = Slide.",
    "Mobile",
    "- Swipe Left = Turn left.",
    "- Swipe Right = Turn right.",
    "- Swipe Up = Jump.",
    "- Swipe Down = Slide."
  ],
  "temple-run-2-frozen-shadows": [
    "Desktop",
    "- A = Move left.",
    "- Left Arrow (←) = Move left.",
    "- D = Move right.",
    "- Right Arrow (→) = Move right.",
    "- W = Jump.",
    "- Up Arrow (↑) = Jump.",
    "- S = Slide.",
    "- Down Arrow (↓) = Slide.",
    "Mobile",
    "- Swipe Left / Right = Move and turn.",
    "- Swipe Up = Jump.",
    "- Swipe Down = Slide."
  ],
  "temple-run-2-holi-festival": [
    "Desktop",
    "Left Arrow (←) = Turn left.",
    "Right Arrow (→) = Turn right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Slide.",
    "Mobile",
    "Swipe Left = Turn left.",
    "Swipe Right = Turn right.",
    "Swipe Up = Jump.",
    "Swipe Down = Slide."
  ],
  "temple-run-2-jungle-fall": [
    "Desktop",
    "A = Move and turn left.",
    "D = Move and turn right.",
    "Left Arrow (←) = Move and turn left.",
    "Right Arrow (→) = Move and turn right.",
    "W = Jump.",
    "Up Arrow (↑) = Jump.",
    "S = Slide.",
    "Down Arrow (↓) = Slide.",
    "Mobile",
    "Swipe Left = Move and turn left.",
    "Swipe Right = Move and turn right.",
    "Swipe Up = Jump.",
    "Swipe Down = Slide."
  ],
  "tennis-masters": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Jump.",
    "Up Arrow (↑) = Jump.",
    "X = Hit the ball.",
    "L = Hit the ball.",
    "Z = Smash.",
    "K = Smash.",
    "Two-Player Mode",
    "Player 1",
    "A = Move left.",
    "D = Move right.",
    "W = Jump.",
    "V = Hit the ball.",
    "B = Smash.",
    "Player 2",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "L = Hit the ball.",
    "K = Smash."
  ],
  "tetra-blocks": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Rotate.",
    "Down Arrow (↓) = Soft Drop.",
    "Spacebar = Hard Drop.",
    "P = Pause.",
    "Mobile",
    "Swipe Left = Move left.",
    "Swipe Right = Move right.",
    "Tap = Rotate.",
    "Swipe Down = Soft Drop.",
    "Quick Double Tap Near Bottom = Hard Drop."
  ],
  "tetris": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Down Arrow (↓) = Soft drop.",
    "Up Arrow (↑) = Rotate clockwise.",
    "Z = Rotate counter-clockwise.",
    "Spacebar = Hard drop.",
    "C = Hold piece.",
    "Shift = Hold piece.",
    "Esc = Pause game."
  ],
  "tetris-99": [
    "Controller",
    "Left Stick / D-Pad Left = Move piece left.",
    "Left Stick / D-Pad Right = Move piece right.",
    "D-Pad Down = Soft Drop.",
    "D-Pad Up = Hard Drop.",
    "A = Rotate Right.",
    "Y = Rotate Right.",
    "B = Rotate Left.",
    "X = Rotate Left.",
    "L = Hold Piece.",
    "R = Hold Piece.",
    "Right Stick = Switch Targeting Modes.",
    "+ = Pause Game."
  ],
  "the-backrooms": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Shift = Sprint.",
    "Left Control (Ctrl) = Crouch.",
    "Spacebar = Jump.",
    "F = Interact.",
    "Q = Lean left.",
    "E = Lean right.",
    "I = Open inventory.",
    "1 = Select hotbar item.",
    "2 = Select hotbar item.",
    "3 = Select hotbar item.",
    "C = Show card.",
    "V = Proximity voice chat.",
    "Tab = Open player list.",
    "Enter = Open chat.",
    "Esc = Open pause menu.",
    "Left Click = Use item or perform primary action."
  ],
  "the-backrooms-3d": [
    "Desktop",
    "- W = Move forward.",
    "- A = Move left.",
    "- S = Move backward.",
    "- D = Move right.",
    "- E = Interact / Open doors.",
    "- L = Flashlight.",
    "- R = Rotate / Reset view (if applicable).",
    "- Mouse Movement = Look / Rotate camera.",
    "- Left Click = Select / Interact."
  ],
  "the-bowling-club": [
    "Desktop",
    "Mouse Movement Up / Down = Control the height and reach of your paddle swing.",
    "Mouse Swipe Left / Right = Hit the ball back to your opponent.",
    "Left Click = Perform powerful shots with faster swings.",
    "Mobile",
    "Drag = Aim and set direction.",
    "Swipe = Aim and set direction.",
    "Release = Throw the ball.",
    "Movement During Release = Adjust spin and curve."
  ],
  "the-final-earth": [
    "Desktop",
    "Ctrl + Left Click = Follow an entity.",
    "Esc = Deselect buildings or exit menus.",
    "Right Click = Deselect buildings or exit menus.",
    "Left Click = Select, place, or interact with buildings and UI.",
    "Right Click = Deselect the current tool or building.",
    "Scroll Wheel = Zoom in and out.",
    "Drag = Navigate the map or use special build modes like \"Multi Replace\"."
  ],
  "the-final-earth-2": [
    "Desktop",
    "- W = Move camera forward.",
    "- A = Move camera left.",
    "- S = Move camera backward.",
    "- D = Move camera right.",
    "- Up Arrow (↑) = Move camera forward.",
    "- Down Arrow (↓) = Move camera backward.",
    "- Left Arrow (←) = Move camera left.",
    "- Right Arrow (→) = Move camera right.",
    "- Scroll Wheel = Zoom in / out.",
    "- Left Click = Select, build, and interact with structures.",
    "- Click and Drag = Move around the map.",
    "- Ctrl + Left Click Near Citizens = Follow a specific citizen and observe their activities."
  ],
  "the-fish-master": [
    "Desktop",
    "Left Click + Drag = Cast the line and adjust the hook's direction to catch fish.",
    "Mobile",
    "Tap = Cast the line into the water.",
    "Drag = Move the fishhook to aim and catch fish while reeling in."
  ],
  "the-heist": [
    "Desktop",
    "W = Steer and control vehicle.",
    "A = Steer and control vehicle.",
    "S = Steer and control vehicle.",
    "D = Steer and control vehicle.",
    "Up Arrow (↑) = Steer and control vehicle.",
    "Down Arrow (↓) = Steer and control vehicle.",
    "Left Arrow (←) = Steer and control vehicle.",
    "Right Arrow (→) = Steer and control vehicle.",
    "Spacebar = Deploy weapons.",
    "Left Ctrl = Activate speed boost.",
    "Left Shift = Toggle slow-motion ability."
  ],
  "the-impossible-quiz": [
    "Desktop",
    "Keyboard = Type answers or perform specific interactions when prompted.",
    "Arrow Keys = Navigate or select options in certain questions.",
    "Left Click = Select answers, click hidden elements, or interact with objects.",
    "Click + Drag = Interact with specific puzzles and maze-like challenges.",
    "Mouse Movement = Explore hidden spots on the screen."
  ],
  "the-impossible-quiz-2": [
    "Desktop",
    "Arrow Keys = Used for navigation, filling meters, or selecting directional options in certain questions.",
    "Spacebar = Trigger actions, answer specific questions, or advance through certain sections.",
    "A-Z Keys = Type specific answers or interact with keyboard-based challenges.",
    "1 Key = Use specific shortcut answers in certain questions.",
    "Left Click = Select answers, drag objects, click hidden elements, and navigate the interface.",
    "Mouse Movement = Navigate the cursor, find hidden areas, guide objects in mazes, and complete drawing or stroking challenges."
  ],
  "the-little-giant": [
    "Desktop",
    "A = Move left.",
    "Left Arrow (←) = Move left.",
    "D = Move right.",
    "Right Arrow (→) = Move right.",
    "W = Jump, double jump (mid-air), and wall jump (against a wall).",
    "Up Arrow (↑) = Jump, double jump (mid-air), and wall jump (against a wall).",
    "Spacebar = Jump, double jump (mid-air), and wall jump (against a wall).",
    "Mobile",
    "Left Side of Screen = Move left.",
    "Right Side of Screen = Move right.",
    "Jump Button = Jump, double jump, and wall jump."
  ],
  "the-spear-stickman": [
    "Desktop",
    "Hold Left Click = Aim the spear.",
    "Release Left Click = Throw the spear.",
    "Mobile",
    "Touch and Drag = Aim the spear.",
    "Release Finger = Throw the spear."
  ],
  "the-speed-ninja": [
    "Desktop",
    "Up Arrow (↑) = Jump / Double jump.",
    "Space = Jump / Double jump.",
    "Down Arrow (↓) = Slide.",
    "A / J = Throw Shuriken.",
    "Enter = Restart level.",
    "Mobile",
    "Tap = Jump / Double jump.",
    "Swipe Down = Slide.",
    "On-Screen Button = Throw Shuriken."
  ],
  "the-worlds-hardest-game": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right."
  ],
  "the-worlds-hardest-game-3": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right."
  ],
  "there-is-no-game": [
    "Desktop",
    "Left Click = Click and interact with objects.",
    "Mouse Movement = Explore and manipulate puzzle elements."
  ],
  "thumb-fighter": [
    "Desktop",
    "A = Attack / Pin Thumb (Player 1).",
    "L = Attack / Pin Thumb (Player 2)."
  ],
  "thumb-fighter-christmas": [
    "Desktop",
    "A = Player 1 Attack.",
    "L = Player 2 Attack.",
    "Press the key at the right moment to attack or defend in the match."
  ],
  "tic-tac-toe": [
    "Desktop",
    "Left Click = Select a square and place your mark.",
    "Mobile",
    "Tap = Select a square and place your mark."
  ],
  "timber-man": [
    "Desktop",
    "Left Arrow (←) = Chop from the left side.",
    "A = Chop from the left side.",
    "Right Arrow (→) = Chop from the right side.",
    "D = Chop from the right side.",
    "Mobile",
    "Tap Left Side = Chop from the left.",
    "Tap Right Side = Chop from the right."
  ],
  "time-clones": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Left Arrow (←) = Move left.",
    "Down Arrow (↓) = Move downward.",
    "Right Arrow (→) = Move right.",
    "Space = Jump.",
    "C = Create clone.",
    "R = Restart level.",
    "ESC = Back to main menu."
  ],
  "time-shooter-2": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Left Arrow (←) = Move left.",
    "Down Arrow (↓) = Move downward.",
    "Right Arrow (→) = Move right.",
    "Left Click = Shoot or pick up a weapon.",
    "Right Click = Throw your weapon.",
    "R = Throw your weapon."
  ],
  "time-shooter-3-swat": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Left Arrow (←) = Move left.",
    "Down Arrow (↓) = Move downward.",
    "Right Arrow (→) = Move right.",
    "Left Click = Shoot / Pick up weapon.",
    "Right Click = Throw weapon.",
    "R = Throw weapon.",
    "F = Pick up / use shield."
  ],
  "tiny-cars": [
    "Desktop",
    "- W = Accelerate.",
    "- Up Arrow (↑) = Accelerate.",
    "- S = Brake.",
    "- Down Arrow (↓) = Brake.",
    "- A = Turn left.",
    "- Left Arrow (←) = Turn left.",
    "- D = Turn right.",
    "- Right Arrow (→) = Turn right.",
    "- R = Restart level.",
    "- Backspace = Restart level.",
    "- E = Toggle ghost replay visibility."
  ],
  "tiny-fishing": [
    "Desktop",
    "Left Click = Cast your line.",
    "Click + Drag = Move the hook left and right while reeling in.",
    "Mobile",
    "Tap = Cast your line.",
    "Drag = Move the hook to catch fish."
  ],
  "tiny-town-racing": [
    "Desktop",
    "A = Steer left.",
    "Left Arrow (←) = Steer left.",
    "D = Steer right.",
    "Right Arrow (→) = Steer right.",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake / Reverse.",
    "Down Arrow (↓) = Brake / Reverse.",
    "Controller",
    "Left Stick = Steer.",
    "Right Trigger / A = Accelerate.",
    "Left Trigger / B = Brake / Reverse."
  ],
  "tomb-of-the-mask": [
    "Mobile",
    "Swipe Up = Move the character upward.",
    "Swipe Down = Move the character downward.",
    "Swipe Left = Move the character left.",
    "Swipe Right = Move the character right.",
    "Gamepad",
    "Joystick / D-pad = Move the character in the desired direction."
  ],
  "tomb-of-the-mask-color": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Swipe = Move.",
    "Tap = Use power-ups."
  ],
  "tomb-runner": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "A = Move left.",
    "Right Arrow (→) = Move right.",
    "D = Move right.",
    "Up Arrow (↑) = Jump.",
    "W = Jump.",
    "Down Arrow (↓) = Slide.",
    "S = Slide.",
    "Mobile",
    "Swipe Left = Change lanes.",
    "Swipe Right = Change lanes.",
    "Swipe Up = Jump.",
    "Swipe Down = Slide."
  ],
  "toon-off": [
    "Desktop",
    "W = Move forward.",
    "A = Move left.",
    "S = Move backward.",
    "D = Move right.",
    "Space = Jump.",
    "Shift = Sprint.",
    "1 = Change weapon.",
    "2 = Change weapon.",
    "3 = Change weapon.",
    "R = Reload.",
    "C = Crouch.",
    "Left Click = Shoot.",
    "Right Click = Aim / Zoom.",
    "Scroll Wheel = Change weapon."
  ],
  "top-speed-3d": [
    "Desktop",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Spacebar = Handbrake / Drift.",
    "Shift = Nitro.",
    "R = Reset vehicle.",
    "C = Change camera view."
  ],
  "top-speed-racing-3d": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake or reverse.",
    "Down Arrow (↓) = Brake or reverse.",
    "A = Turn left.",
    "Left Arrow (←) = Turn left.",
    "D = Turn right.",
    "Right Arrow (→) = Turn right.",
    "Space = Handbrake.",
    "Shift = Nitro boost.",
    "Camera Button = Switch between camera views.",
    "Spanner/Wrench Icon = Instantly repair your vehicle at no cost."
  ],
  "toss-the-turtle": [
    "Desktop",
    "W = Control turtle direction while airborne.",
    "A = Control turtle direction while airborne.",
    "S = Control turtle direction while airborne.",
    "D = Control turtle direction while airborne.",
    "Mouse Movement = Aim the cannon.",
    "Hold Left Click = Adjust launch power.",
    "Release Left Click = Fire the turtle."
  ],
  "tower-crash-3d": [
    "Desktop",
    "Mouse Movement = Aim.",
    "Left Click = Shoot.",
    "Click + Drag = Rotate the tower."
  ],
  "tower-defense-2d": [
    "Desktop",
    "Mouse Movement = Control the game.",
    "Left Click = Interact with game elements."
  ],
  "tower-of-destiny": [
    "Desktop",
    "Space = Jump.",
    "Up Arrow (↑) = Jump.",
    "Left Click = Jump.",
    "Mobile",
    "Tap = Jump."
  ],
  "traffic-control": [
    "Desktop",
    "Left Click = Speed up a car.",
    "Left Click (Orange Button) = Slow down all traffic.",
    "Mobile",
    "Tap = Speed up a car.",
    "Tap (Orange Button) = Slow down all traffic."
  ],
  "traffic-escape": [
    "\"Controls",
    "Keyboard / Mouse Controls",
    "Left Mouse Button – Stop or release a vehicle",
    "Touch Controls",
    "Tap – Stop or release a vehicle",
    "\""
  ],
  "traffic-jam-3d": [
    "Desktop",
    "- W = Drive forward.",
    "- A = Steer left.",
    "- S = Reverse.",
    "- D = Steer right.",
    "- Up Arrow (↑) = Drive forward.",
    "- Down Arrow (↓) = Reverse.",
    "- Left Arrow (←) = Steer left.",
    "- Right Arrow (→) = Steer right.",
    "- N = Activate Nitro boost.",
    "- C = Change the camera view.",
    "- E = Use the horn or flash the lights.",
    "Mobile",
    "- Swipe Left = Change lanes to the left.",
    "- Swipe Right = Change lanes to the right."
  ],
  "traffic-mania": [
    "Desktop",
    "Left Click = Stop or release a vehicle.",
    "Mobile",
    "Tap = Stop or release a vehicle."
  ],
  "traffic-rider": [
    "\"Control",
    "Keyboard Controls",
    "Movement — WASD",
    "Jump — Space Bar",
    "Use Microphone — T",
    "Open Inventory — Tab",
    "Use Text Chat — Enter",
    "Mouse Controls",
    "Main Action — Left Mouse Button",
    "Build Menu — Right Mouse Button",
    "\""
  ],
  "traffic-run": [
    "Desktop",
    "Left Click = Stop or release a vehicle.",
    "Drag = Speed up vehicles to help them pass through the intersection more quickly.",
    "Mobile",
    "Tap = Stop or release a vehicle.",
    "Swipe Up = Speed up vehicles.",
    "Swipe Down = Speed up vehicles.",
    "Swipe Left = Speed up vehicles.",
    "Swipe Right = Speed up vehicles."
  ],
  "traffic-rush": [
    "Desktop",
    "Left Click (Hold) = Move the car.",
    "Release Mouse Button = Stop the car."
  ],
  "traffic-tom": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right."
  ],
  "tribals-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space Bar = Jump.",
    "T = Use microphone.",
    "Tab = Open inventory.",
    "Enter = Use text chat.",
    "Left Click = Main action.",
    "Right Click = Open the build menu."
  ],
  "tricks": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake / Reverse.",
    "Down Arrow (↓) = Brake / Reverse.",
    "A = Tilt bike / Balance.",
    "D = Tilt bike / Balance.",
    "Left Arrow (←) = Tilt bike / Balance.",
    "Right Arrow (→) = Tilt bike / Balance.",
    "Mobile",
    "Tap and Hold = Accelerate / Brake.",
    "Swipe / Tilt = Balance bike in air."
  ],
  "tricksplit-io": [
    "Desktop",
    "Mouse Movement = Move your cell.",
    "Space = Split your cell.",
    "W = Eject mass (feed)."
  ],
  "truck-traffic": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Mobile",
    "Tap = Steer by tapping the left or right side of the screen."
  ],
  "truck-trials": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake / Reverse.",
    "Down Arrow (↓) = Brake / Reverse.",
    "A = Lean backward.",
    "Left Arrow (←) = Lean backward.",
    "D = Lean forward.",
    "Right Arrow (→) = Lean forward.",
    "Mobile",
    "Gas Pedal = Accelerate / Brake / Reverse.",
    "Left Side of Screen = Tilt / Balance Truck."
  ],
  "tube-clicker": [
    "Desktop",
    "Left Click = Generate views and interact with menus.",
    "Mobile",
    "Tap = Generate views and navigate the interface."
  ],
  "tube-jumpers": [
    "Desktop",
    "W = Player 1 jump.",
    "I = Player 2 jump.",
    "Z = Player 3 jump.",
    "M = Player 4 jump."
  ],
  "tunnel-rush": [
    "Desktop",
    "Single Player",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Two Player Mode",
    "Player 1",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Player 2",
    "A = Move left.",
    "D = Move right."
  ],
  "tunnel-rush-2": [
    "Desktop",
    "- Left Arrow (←) = Rotate left.",
    "- Right Arrow (→) = Rotate right.",
    "- A = Rotate left.",
    "- D = Rotate right.",
    "Mobile",
    "- Tap and Hold (Left Side) = Rotate left.",
    "- Tap and Hold (Right Side) = Rotate right."
  ],
  "turbo-moto-racer": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "W = Accelerate.",
    "Down Arrow (↓) = Brake.",
    "S = Brake.",
    "Left Arrow (←) = Steer left.",
    "A = Steer left.",
    "Right Arrow (→) = Steer right.",
    "D = Steer right."
  ],
  "turn-turn": [
    "Desktop",
    "Left Click = Accelerate the vehicle.",
    "Mobile",
    "Tap = Accelerate the vehicle."
  ],
  "two-ball-3d": [
    "Desktop",
    "Player 1",
    "A = Move left.",
    "D = Move right.",
    "Player 2",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right."
  ],
  "two-ball-3d-dark": [
    "Desktop",
    "Player 1",
    "A = Move left.",
    "D = Move right.",
    "Player 2",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Power-Up Shortcuts",
    "1 = Activate Armor.",
    "2 = Activate Magnet.",
    "3 = Activate Double Counter."
  ],
  "two-neon-boxes": [
    "Desktop",
    "Left Click (Left Side) = Jump with the left box.",
    "Left Click (Right Side) = Jump with the right box.",
    "Mobile",
    "Tap (Left Side) = Jump with the left box.",
    "Tap (Right Side) = Jump with the right box."
  ],
  "two-tunnel-3d": [
    "Desktop",
    "Player 1",
    "A = Move left.",
    "D = Move right.",
    "Player 2",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Mobile",
    "Tap = Move by tapping the left or right side of the screen."
  ],
  "ultimate-car-arena": [
    "Desktop",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Drive backward.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Shift = Activate boost.",
    "B = Look behind.",
    "R = Respawn the vehicle.",
    "Ctrl = Change cars."
  ],
  "ultimate-car-driving": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake / Reverse.",
    "Down Arrow (↓) = Brake / Reverse.",
    "A = Steer left.",
    "Left Arrow (←) = Steer left.",
    "D = Steer right.",
    "Right Arrow (→) = Steer right.",
    "Space = Handbrake.",
    "C = Change Camera View.",
    "Shift = Boost (on supported vehicles).",
    "R = Reset / Flip Vehicle (if stuck)."
  ],
  "ultimate-off-road-cars": [
    "Desktop",
    "W = Move forward.",
    "A = Steer left.",
    "S = Move backward.",
    "D = Steer right.",
    "Up Arrow (↑) = Move forward.",
    "Down Arrow (↓) = Move backward.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Brake.",
    "C = Pull car using winch.",
    "Left Click = Attach winch."
  ],
  "ultimate-offroad-cars-2": [
    "Desktop",
    "W = Drive forward.",
    "A = Steer left.",
    "S = Reverse.",
    "D = Steer right.",
    "Up Arrow (↑) = Drive forward.",
    "Down Arrow (↓) = Reverse.",
    "Left Arrow (←) = Steer left.",
    "Right Arrow (→) = Steer right.",
    "Spacebar = Handbrake.",
    "C = Pull the car.",
    "X = Free the cable.",
    "Shift = Toggle all-wheel drive.",
    "Z + Left Click = Attach the winch."
  ],
  "unicycle-hero": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "A = Move left.",
    "D = Move right.",
    "Space Bar = Throw object.",
    "Mobile",
    "Tap and Hold = Move left or right.",
    "Tap = Throw objects."
  ],
  "unicycle-legend": [
    "Desktop",
    "A = Ride left.",
    "D = Ride right.",
    "Left Arrow (←) = Ride left.",
    "Right Arrow (→) = Ride right.",
    "Spacebar = Pause.",
    "R = Restart the level.",
    "L = Open the level selection.",
    "Esc = Go back."
  ],
  "uno": [
    "Desktop",
    "Left Click = Select or play a card.",
    "Left Click = Draw a card from the draw pile.",
    "Left Click = Call UNO using the UNO button.",
    "Left Click = Select a color for a Wild card.",
    "Mobile",
    "Tap = Select or play a card.",
    "Tap = Draw a card from the draw pile.",
    "Tap = Call UNO using the UNO button.",
    "Tap = Select a color for a Wild card."
  ],
  "venge-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space Bar = Jump.",
    "R = Reload.",
    "E = Melee attack.",
    "F = Throw grenade.",
    "B = Buy.",
    "Hold B = Turn cards.",
    "H = Dance.",
    "Enter = Chat.",
    "Escape = Open leaderboards.",
    "Left Click = Shoot.",
    "Right Click = Aim down sights.",
    "Shift = Aim down sights.",
    "Scroll Wheel = Switch between weapons."
  ],
  "vex-3": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Jump.",
    "Up Arrow (↑) = Jump.",
    "S = Slide or enter the level.",
    "Down Arrow (↓) = Slide or enter the level.",
    "S (While Running) = Slide under low obstacles.",
    "Down Arrow (↓) (While Running) = Slide under low obstacles."
  ],
  "vex-4": [
    "Desktop",
    "W = Jump.",
    "A = Move left.",
    "S = Slide or crouch.",
    "D = Move right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Slide or crouch.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Wall Contact + Jump = Perform a wall jump.",
    "Movement Keys = Swim and navigate through water sections."
  ],
  "vex-5": [
    "Desktop",
    "W = Jump, wall jump, or climb up.",
    "A = Move left.",
    "S = Slide, duck, enter doors, or swim down/back.",
    "D = Move right.",
    "Up Arrow (↑) = Jump, wall jump, or climb up.",
    "Left Arrow (←) = Move left.",
    "Down Arrow (↓) = Slide, duck, enter doors, or swim down/back.",
    "Right Arrow (→) = Move right."
  ],
  "vex-6": [
    "Desktop",
    "- A = Move left.",
    "- D = Move right.",
    "- Left Arrow (←) = Move left.",
    "- Right Arrow (→) = Move right.",
    "- W = Jump.",
    "- Up Arrow (↑) = Jump.",
    "- S = Slide or crouch.",
    "- Down Arrow (↓) = Slide or crouch.",
    "- R = Restart the level.",
    "- Wall Contact + Jump = Perform a wall jump.",
    "- Movement Keys = Swim and navigate underwater sections."
  ],
  "vex-7": [
    "Desktop",
    "W = Jump.",
    "A = Move left.",
    "S = Slide or enter a level.",
    "D = Move right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Slide or enter a level.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "R = Restart the level."
  ],
  "vex-8": [
    "Desktop",
    "A = Move left.",
    "D = Move right.",
    "W = Jump.",
    "S = Slide or crouch.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Down Arrow (↓) = Slide or crouch.",
    "Wall Contact + Jump = Perform a wall jump.",
    "Movement Keys (In Water) = Swim and navigate underwater."
  ],
  "volley-random": [
    "Desktop",
    "W = Player 1 jump.",
    "Up Arrow (↑) = Player 2 jump.",
    "Mobile",
    "Tap (Left Side) = Player 1 jump.",
    "Tap (Right Side) = Player 2 jump."
  ],
  "volleyball-challenge": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Down Arrow (↓) = Hit / Serve / Special move.",
    "Up Arrow (↑) = Jump.",
    "A = Move left.",
    "D = Move right.",
    "S = Hit / Serve / Special move.",
    "W = Jump.",
    "Enter = Select / Confirm.",
    "ESC = Back / Pause."
  ],
  "voxiom-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space = Jump.",
    "Shift = Sprint or run.",
    "C = Crouch.",
    "Left Click = Shoot or use an item.",
    "Right Click = Aim or place a block.",
    "F = Aim.",
    "E = Interact.",
    "G = Drop an item.",
    "T = Spray blocks.",
    "X = Open the inventory.",
    "M = Open the map.",
    "Tab = View the leaderboard."
  ],
  "war-brokers-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Space Bar = Jump.",
    "C = Crouch.",
    "R = Reload.",
    "F = Enter or exit a vehicle, or pick up items.",
    "Shift = Hold breath while zoomed or use quick chat.",
    "Left Ctrl = Toggle sprint.",
    "M = Open the menu.",
    "0 = Toggle the frame rate display.",
    "Left Click = Shoot.",
    "Right Click = Zoom or aim."
  ],
  "war-of-sticks": [
    "Desktop",
    "Left Click = Click unit purchase and upgrade buttons.",
    "Mouse Movement = Navigate game menus and manage economy through the interface.",
    "Upper-left UI Buttons = Train units and manage economy.",
    "Mobile",
    "Tap = Click unit purchase and upgrade buttons.",
    "Upper-left UI Buttons = Train units and manage economy."
  ],
  "water-color-sort": [
    "Desktop",
    "Left Click = Select a tube.",
    "Left Click on another tube = Pour the liquid.",
    "Mobile",
    "Tap = Select a tube.",
    "Tap another tube = Pour the liquid."
  ],
  "we-become-what-we-behold": [
    "Desktop",
    "Mouse Movement = Move the camera.",
    "Left Click = Take a photograph."
  ],
  "wheelie-bike": [
    "Desktop",
    "W = Lean backward (wheelie).",
    "Up Arrow (↑) = Lean backward (wheelie).",
    "S = Lean forward (front brake).",
    "Down Arrow (↓) = Lean forward (front brake).",
    "A = Balance left.",
    "D = Balance right.",
    "Left Arrow (←) = Balance left.",
    "Right Arrow (→) = Balance right.",
    "Left Click and Hold = Lean backward (wheelie).",
    "Release Left Click = Lean forward.",
    "Mobile",
    "Tap and Hold = Lean backward (wheelie).",
    "Release Tap = Lean forward."
  ],
  "wheely-2": [
    "Desktop",
    "Left Click = Start or stop driving with Wheely.",
    "Left Click = Use switches, buttons, levers, and other interactive objects to solve puzzles and clear the path."
  ],
  "wheely-3": [
    "Desktop",
    "Left Click = Move Wheely and interact with objects."
  ],
  "wheely-4": [
    "Desktop",
    "Left Click = Move Wheely (start/stop) and interact with environmental objects (buttons, levers, and switches)."
  ],
  "wheely-5": [
    "Desktop",
    "Left Click = Start or stop moving Wheely.",
    "Left Click = Interact with buttons, switches, levers, and cranks."
  ],
  "wheely-6": [
    "Desktop",
    "Left Click = Interact with objects, buttons, levers, and mechanisms.",
    "Left Click = Click on Wheely to start movement.",
    "Left Click = Click on Wheely while moving to stop movement."
  ],
  "wheely-7": [
    "Desktop",
    "Left Click = Interact with objects, buttons, levers, and mechanisms.",
    "Left Click = Make Wheely move.",
    "Left Click = Stop Wheely while he is moving."
  ],
  "wheely-8": [
    "Desktop",
    "Left Click = Interact with objects, buttons, and mechanisms."
  ],
  "where-is-my-cat": [
    "Desktop",
    "Left Click = Click objects to interact with them.",
    "Drag & Drop = Move objects to uncover the hidden cat.",
    "Mobile",
    "Tap = Tap objects to interact with them.",
    "Drag = Move objects to uncover the hidden cat."
  ],
  "who-is": [
    "Desktop",
    "Left Click = Select answers and interact.",
    "Drag = Move objects if the level allows.",
    "Mobile",
    "Tap = Select answers and interact.",
    "Drag = Move objects if the level allows."
  ],
  "wizard-mike": [
    "Desktop",
    "Mouse Movement = Aim spells.",
    "Left Click = Cast or shoot spells."
  ],
  "wood-blocks-3d": [
    "Desktop",
    "Left Click and Drag = Select and place block pieces onto the grid.",
    "Left Click = Activate power-ups."
  ],
  "word-city-crossed": [
    "Desktop",
    "Left Click = Select and connect letters to form words.",
    "Mobile",
    "Tap = Select and connect letters to form words."
  ],
  "word-city-uncrossed": [
    "Desktop",
    "Left Click & Drag = Drag across letters to connect them and form words.",
    "Mobile",
    "Swipe = Drag across letters to connect them and form words."
  ],
  "word-slide": [
    "Desktop",
    "Left Click = Select and drag letter columns up or down to rearrange letters.",
    "Mobile",
    "Tap = Select a letter column.",
    "Drag = Move letter columns up or down to rearrange letters."
  ],
  "wordle-infinite": [
    "Desktop",
    "A–Z Keys = Enter letters for your guess.",
    "Enter = Submit your five-letter word guess.",
    "Backspace/Delete = Remove the last entered letter.",
    "Left Click = Select letters on the on-screen keyboard.",
    "Left Click = Submit your guess by clicking Enter.",
    "Left Click = Remove the last entered letter by clicking Backspace/Delete.",
    "Mobile",
    "Tap = Select letters on the on-screen keyboard.",
    "Tap = Submit your guess by tapping Enter.",
    "Tap = Remove the last entered letter by tapping Backspace/Delete."
  ],
  "wordle-plus": [
    "Desktop",
    "Keyboard = Type letters to input a guess.",
    "Enter = Submit the current guess.",
    "Backspace = Delete the last entered letter.",
    "Left Click = Select letters on the on-screen keyboard.",
    "Left Click = Submit the current guess using the on-screen button.",
    "Mobile",
    "Tap = Select letters on the on-screen keyboard.",
    "Tap = Submit the current guess using the on-screen button."
  ],
  "wordle-unlimited": [
    "Desktop",
    "Keyboard = Type letters.",
    "Enter = Submit a word.",
    "Backspace = Delete the last letter.",
    "Left Click = Select on-screen keys.",
    "Mobile",
    "Tap = Select on-screen keys."
  ],
  "words-search-classic-edition": [
    "Desktop",
    "Left Click = Click and hold the first letter of a word.",
    "Drag = Drag across the remaining letters.",
    "Release = Confirm your word selection.",
    "Mobile",
    "Tap = Tap and hold the first letter of a word.",
    "Swipe = Swipe across the word.",
    "Release = Lift your finger to confirm the selection."
  ],
  "worlds-hardest-game-2": [
    "Desktop",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right."
  ],
  "wormate-io": [
    "Desktop",
    "Mouse Movement = Steer your worm.",
    "Left Click = Activate the speed boost."
  ],
  "wrassling": [
    "Desktop",
    "Player 1",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Up Arrow (↑) = Jump.",
    "Z = Swing left arm.",
    "X = Swing right arm.",
    "Player 2 (Local Multiplayer)",
    "A = Move left.",
    "D = Move right.",
    "W = Jump.",
    "C = Swing left arm.",
    "V = Swing right arm."
  ],
  "wrestle-bros": [
    "Desktop",
    "- W = Move upward or jump.",
    "- A = Move left.",
    "- S = Move downward.",
    "- D = Move right.",
    "- Up Arrow (↑) = Move upward or jump.",
    "- Down Arrow (↓) = Move downward.",
    "- Left Arrow (←) = Move left.",
    "- Right Arrow (→) = Move right.",
    "- Spacebar = Attack or perform an action (context-dependent).",
    "- Enter = Attack or perform an action (context-dependent)."
  ],
  "x-trial-racing": [
    "Desktop",
    "Up Arrow (↑) = Accelerate.",
    "Down Arrow (↓) = Brake or slow down.",
    "Left Arrow (←) = Tilt backward or rotate counterclockwise.",
    "Right Arrow (→) = Tilt forward or rotate clockwise.",
    "Mobile",
    "Tap = Use the on-screen arrows to move.",
    "Tap = Use the left-side buttons to rotate.",
    "Tap = Use the right-side buttons to accelerate and brake."
  ],
  "yohoho-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Up Arrow (↑) = Move upward.",
    "Down Arrow (↓) = Move downward.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Space Bar = Attack or charge a dash attack.",
    "Mouse Movement = Move.",
    "Left Click = Attack or charge a dash attack.",
    "Mobile",
    "Drag = Move.",
    "Tap (Second Finger) = Attack.",
    "Hold (Second Finger) = Charge a dash attack."
  ],
  "zeepkist-crash-2d": [
    "Desktop",
    "Space = Hold to power up, then release to launch.",
    "Left Arrow (←) = Adjust trajectory left.",
    "Right Arrow (→) = Adjust trajectory right.",
    "Mobile",
    "On-screen Button = Press and hold to power up, then release to launch.",
    "On-screen Buttons = Tap to adjust trajectory."
  ],
  "zombie-derby-pixel-survival": [
    "Desktop",
    "W = Accelerate.",
    "Up Arrow (↑) = Accelerate.",
    "S = Brake.",
    "Down Arrow (↓) = Brake.",
    "A = Tilt backward.",
    "Left Arrow (←) = Tilt backward.",
    "D = Tilt forward.",
    "Right Arrow (→) = Tilt forward.",
    "Spacebar = Shoot.",
    "Left Shift = Nitro.",
    "N = Nitro.",
    "Gamepad",
    "Right Trigger = Accelerate.",
    "Left Trigger = Brake.",
    "Left Stick = Tilt vehicle.",
    "A / Cross (X) = Shoot.",
    "X / Square = Nitro."
  ],
  "zombie-shooter-2d": [
    "Desktop",
    "Left Click = Shoot or interact with the game."
  ],
  "zombocalypse-shooter": [
    "Desktop",
    "Left Arrow (←) = Move left.",
    "A = Move left.",
    "Right Arrow (→) = Move right.",
    "D = Move right.",
    "Space = Use weapon.",
    "Down Arrow (↓) = Pick up crate / Drop weapon (hold).",
    "S = Pick up crate / Drop weapon (hold).",
    "Up Arrow (↑) = Call support (at 25, 50, 100 kill combo).",
    "W = Call support (at 25, 50, 100 kill combo).",
    "Shift = Pause game."
  ],
  "zombs-royale-io": [
    "Desktop",
    "W = Move upward.",
    "A = Move left.",
    "S = Move downward.",
    "D = Move right.",
    "Left Click = Shoot or attack.",
    "Right Click = Open the emote menu (or as customized).",
    "E = Interact.",
    "R = Reload.",
    "M = Open the map.",
    "Tab = Open the map.",
    "Q = Switch weapons.",
    "1 = Switch to weapon slot 1.",
    "2 = Switch to weapon slot 2.",
    "3 = Switch to weapon slot 3.",
    "4 = Switch to weapon slot 4.",
    "F = Use or heal.",
    "T = Use an emote.",
    "Spacebar = Use an emote (quick selection)."
  ],
  "zuck-vs-musk-techbro-beatdown": [
    "Desktop",
    "Up Arrow (↑) = Jump.",
    "Left Arrow (←) = Move left.",
    "Right Arrow (→) = Move right.",
    "Space = Attack or perform an action (such as punching, jumping, or pinning)."
  ] 
  };

  // Agar kisi game ka slug map me na mile to yeh generic
  // list dikhai jayegi (fallback).
  const FALLBACK_CONTROLS = [
    "WASD / Arrow keys = move",
    "Mouse = aim / look around",
    "Left-click = interact / shoot",
    "Space = jump",
    "Esc = pause menu"
  ];

  // Yeh words (bina ":" wale, akele) agar list me milein to
  // unhe normal bullet point ki jagah heading ki tarah render
  // kiya jayega (bara/bold text, bina bullet ke).
  const HEADING_LABELS = ["desktop", "mobile", "gamepad", "player 1", "player 2","player 3","player 4" ];

  function isHeadingLabel(text) {
    if (!text) return false;
    const t = String(text).trim().toLowerCase();
    return HEADING_LABELS.includes(t);
  }

  const GAME_TITLE = document.querySelector("h2.n162, .game-card h1")
    ? (document.querySelector("h2.n162, .game-card h1").textContent || "").trim()
    : "This Game";

  /**
   * Kisi bhi URL/path se game ka "slug" (folder name) nikalta hai.
   *
   * Support karta hai dono tareeke:
   *   1) "https://site.com/drive-mad"              -> "drive-mad"
   *   2) "/games/drive-mad/index.html"              -> "drive-mad"
   *   3) "games/1v1-lol/index.htm"                  -> "1v1-lol"
   *
   * Yani agar URL ka aakhri part "index.html" (ya index.htm/.php)
   * ho, to uske SE PEHLE wala folder-name hi asli slug hai —
   * kyunke har game apni khud ki folder me "index.html" ke
   * andar hoti hai (gamename/index.html).
   */
  function getSlugFromUrl(url) {
    if (!url) return null;
    try {
      const clean = url.split("?")[0].split("#")[0].replace(/\/+$/, "");
      const parts = clean.split("/").filter(Boolean);
      if (parts.length === 0) return null;

      let last = parts[parts.length - 1];

      // Agar last segment "index.html" / "index.htm" / "index.php" hai
      // to us se pehle wala part (game folder ka naam) lo.
      if (/^index\.(html?|php)$/i.test(last) && parts.length > 1) {
        last = parts[parts.length - 2];
      }

      // Kisi bhi extension (.html/.htm/.php) ko slug se hata do,
      // taake agar kabhi game-name.html jaisi file bhi ho to bhi
      // sahi slug mile.
      last = last.replace(/\.(html?|php)$/i, "");

      return last || null;
    } catch (e) {
      return null;
    }
  }

  /**
   * Currently active game ka slug dhoond kar uske controls
   * wapas karta hai. Na mile to FALLBACK_CONTROLS deta hai.
   *
   * PRIORITY:
   *   1) Page ka apna URL (window.location) — kyunke site
   *      structure hi "site.com/g/gamename/index.html" hai,
   *      is liye yeh sabse reliable source hai (iframe ka src
   *      kabhi outdated/hardcoded ho sakta hai, jaisa testing
   *      me hua).
   *   2) Desktop iframe (#test_app_frame) ka src
   *   3) Mobile iframe (#gameFrame) ka src
   */
  function getControlsForCurrentGame() {
    const desktopFrame = document.getElementById("test_app_frame");
    const mobileFrame = document.getElementById("gameFrame");

    const candidates = [
      { label: "window.location.pathname", value: window.location.pathname },
      { label: "window.location.href", value: window.location.href },
      { label: "#test_app_frame src", value: desktopFrame ? desktopFrame.getAttribute("src") : null },
      { label: "#gameFrame src", value: mobileFrame ? mobileFrame.getAttribute("src") : null },
      { label: "#gameFrame data-original-src", value: mobileFrame ? mobileFrame.dataset.originalSrc : null }
    ];

    // eslint-disable-next-line no-console
    console.groupCollapsed("[game-buttons] Controls slug detection");
    let matched = null;
    candidates.forEach(({ label, value }) => {
      const slug = getSlugFromUrl(value);
      const isMatch = !!(slug && CONTROLS_MAP[slug]);
      if (isMatch && !matched) matched = slug;
      // eslint-disable-next-line no-console
      console.log(
        (isMatch ? "✅ MATCH  " : "   no match"),
        "|", label.padEnd(28, " "),
        "| raw:", value,
        "| slug:", slug
      );
    });
    // eslint-disable-next-line no-console
    console.log(matched ? `→ Using controls for: "${matched}"` : "→ No slug matched — using FALLBACK_CONTROLS");
    // eslint-disable-next-line no-console
    console.groupEnd();

    for (const { value } of candidates) {
      const slug = getSlugFromUrl(value);
      if (slug && CONTROLS_MAP[slug]) {
        return CONTROLS_MAP[slug];
      }
    }

    return FALLBACK_CONTROLS;
  }

  /* ---------------------------------------------------------
     1) MODAL STYLES (ek hi baar inject honge)
     --------------------------------------------------------- */
  const style = document.createElement("style");
  style.textContent = `
    .gb-overlay-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      opacity: 0;
      pointer-events: none;
      transition: opacity .15s ease;
    }
    .gb-overlay-backdrop.gb-show {
      opacity: 1;
      pointer-events: auto;
    }
    .gb-modal {
      background: #1d1e2c;
      border-radius: 16px;
      width: 360px;
      max-width: 90vw;
      max-height: 80vh;
      overflow-y: auto;
      padding: 28px 26px;
      position: relative;
      color: #fff;
      font-family: inherit;
      box-shadow: 0 10px 40px rgba(0,0,0,0.4);
      transform: translateY(10px);
      transition: transform .15s ease;
    }
    .gb-overlay-backdrop.gb-show .gb-modal {
      transform: translateY(0);
    }
    .gb-modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: transparent;
      border: none;
      color: #aaa;
      cursor: pointer;
      font-size: 22px;
      line-height: 1;
    }
    .gb-modal-close:hover { color: #fff; }
    .gb-modal h3 {
      text-align: center;
      font-size: 22px;
      font-weight: 800;
      margin: 0 0 22px 0;
    }
    .gb-controls-list {
      list-style: disc;
      padding-left: 20px;
      margin: 0;
    }
    .gb-controls-list li {
      margin-bottom: 14px;
      font-size: 15px;
      color: #e5e5ea;
    }
    .gb-controls-list li.gb-controls-heading {
      list-style: none;
      margin-left: -20px;
      margin-top: 18px;
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: 800;
      color: #fff;
    }
    .gb-controls-list li.gb-controls-heading:first-child {
      margin-top: 0;
    }
    .gb-share-icons {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-bottom: 20px;
    }
    .gb-share-icons a {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
    }
    .gb-share-fb { background: #1877f2; }
    .gb-share-x { background: #000; }
    .gb-share-wa { background: #25d366; }
    .gb-share-row {
      display: flex;
      align-items: center;
      background: #2a2b3c;
      border-radius: 10px;
      padding: 6px 6px 6px 14px;
      gap: 10px;
    }
    .gb-share-url {
      flex: 1;
      background: transparent;
      border: none;
      color: #cfcfe0;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      outline: none;
    }
    .gb-share-copy {
      background: #6c4cf1;
      color: #fff;
      border: none;
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
    }
    .gb-share-copy:hover { background: #5b3fe0; }
    .gb-share-copy.gb-copied { background: #2ecc71; }
  `;
  document.head.appendChild(style);

  /* ---------------------------------------------------------
     2) Helper: generic modal banane / dikhane / band karne ke liye
     --------------------------------------------------------- */
  function openModal(innerHTML) {
    const backdrop = document.createElement("div");
    backdrop.className = "gb-overlay-backdrop";
    backdrop.innerHTML = `<div class="gb-modal">
        <button class="gb-modal-close" aria-label="Close">&times;</button>
        ${innerHTML}
      </div>`;
    document.body.appendChild(backdrop);

    requestAnimationFrame(() => backdrop.classList.add("gb-show"));

    function close() {
      backdrop.classList.remove("gb-show");
      setTimeout(() => backdrop.remove(), 150);
    }

    backdrop.querySelector(".gb-modal-close").addEventListener("click", close);
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) close();
    });
    document.addEventListener("keydown", function escHandler(e) {
      if (e.key === "Escape") {
        close();
        document.removeEventListener("keydown", escHandler);
      }
    });

    return { close };
  }

  /* ---------------------------------------------------------
     3) CONTROLS button
     --------------------------------------------------------- */
  function showControlsModal() {
    const controls = getControlsForCurrentGame();
    const listItems = controls
      .map((c) => {
        if (isHeadingLabel(c)) {
          return `<li class="gb-controls-heading">${c}</li>`;
        }
        return `<li>${c}</li>`;
      })
      .join("");
    openModal(`
      <h3>Controls</h3>
      <ul class="gb-controls-list">${listItems}</ul>
    `);
  }

  /* ---------------------------------------------------------
     4) SHARE button
     --------------------------------------------------------- */
  function showShareModal() {
    const pageUrl = window.location.href;
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedTitle = encodeURIComponent(GAME_TITLE);

    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    const xUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    const waUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;

    const modal = openModal(`
      <h3>Share this game</h3>
      <div class="gb-share-icons">
        <a class="gb-share-fb" href="${fbUrl}" target="_blank" rel="noopener noreferrer" title="Share on Facebook">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
            <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.86c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.87h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z"/>
          </svg>
        </a>
        <a class="gb-share-x" href="${xUrl}" target="_blank" rel="noopener noreferrer" title="Share on X">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
            <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.6L4.5 22H1.3l8.1-9.3L1 2h7l4.9 6L18.9 2Zm-1.2 18h1.9L7.4 4H5.4l12.3 16Z"/>
          </svg>
        </a>
        <a class="gb-share-wa" href="${waUrl}" target="_blank" rel="noopener noreferrer" title="Share on WhatsApp">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.35 5.06L2 22l5.1-1.32A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Zm5.1 14.24c-.24.68-1.4 1.3-1.94 1.36-.5.06-1.13.09-1.83-.11-.42-.12-.96-.31-1.66-.6-2.92-1.26-4.82-4.2-4.97-4.4-.15-.2-1.19-1.58-1.19-3.02 0-1.44.75-2.15 1.02-2.44.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2.02.9 2.17.07.15.12.32.02.52-.1.2-.15.32-.29.5-.15.17-.3.39-.44.52-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2 1.12.99 2.06 1.3 2.35 1.45.29.15.46.12.63-.07.17-.2.72-.84.92-1.13.19-.29.39-.24.65-.15.27.1 1.7.8 2 .95.29.15.48.22.55.34.07.13.07.71-.17 1.39Z"/>
          </svg>
        </a>
      </div>
      <div class="gb-share-row">
        <input class="gb-share-url" type="text" readonly value="${pageUrl}">
        <button class="gb-share-copy">Copy</button>
      </div>
    `);

    const copyBtn = document.querySelector(".gb-overlay-backdrop.gb-show .gb-share-copy");
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(pageUrl).then(() => {
        const original = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        copyBtn.classList.add("gb-copied");
        setTimeout(() => {
          copyBtn.textContent = original;
          copyBtn.classList.remove("gb-copied");
        }, 1500);
      });
    });
  }

  /* ---------------------------------------------------------
     5) Attach CONTROLS + SHARE to har jaga jahan bhi buttons hain
     (desktop wale .n151 block + mobile wale .reactions-row block)
     --------------------------------------------------------- */
  document.querySelectorAll(".controls-btn").forEach((btn) => {
    btn.addEventListener("click", showControlsModal);
  });

  document.querySelectorAll(".share-btn").forEach((btn) => {
    btn.addEventListener("click", showShareModal);
  });

  /* ---------------------------------------------------------
     6) REFRESH button — iframe ko reload karega
     --------------------------------------------------------- */
  document.querySelectorAll(".refresh-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Sabse pehle currently visible/active iframe dhoondo
      const iframe =
        document.getElementById("test_app_frame") ||
        document.getElementById("gameFrame");
      if (iframe && iframe.src) {
        const src = iframe.src;
        iframe.src = "";
        // thoda delay taake reload guaranteed ho
        setTimeout(() => (iframe.src = src), 50);
      }
    });
  });

  /* ---------------------------------------------------------
     7) FULLSCREEN button — SIRF desktop wrapper ke liye
     --------------------------------------------------------- */
  document.querySelectorAll(".fullscreen-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const wrapper = document.getElementById("gameFrameWrapper");
      if (!wrapper) return;

      if (wrapper.requestFullscreen) {
        wrapper.requestFullscreen();
      } else if (wrapper.webkitRequestFullscreen) {
        wrapper.webkitRequestFullscreen();
      } else if (wrapper.msRequestFullscreen) {
        wrapper.msRequestFullscreen();
      }
    });
  });

  /* ---------------------------------------------------------
     8) MOBILE: Play Now -> overlay open, Exit -> iframe auto-pause
     --------------------------------------------------------- */
  const playBtn = document.getElementById("playBtn");
  const gameOverlay = document.getElementById("gameOverlay");
  const closeBtn = document.getElementById("closeBtn");
  const mobileFrame = document.getElementById("gameFrame");

  // Original game URL yaad rakhne ke liye (taake exit ke baad
  // dobara Play kiya jaye to fresh start ho, aur Controls modal
  // ke liye slug bhi mil sake jab src "about:blank" ho jaye)
  const originalGameSrc = mobileFrame ? mobileFrame.getAttribute("src") : null;
  if (mobileFrame && originalGameSrc) {
    mobileFrame.dataset.originalSrc = originalGameSrc;
  }

  if (playBtn && gameOverlay) {
    playBtn.addEventListener("click", () => {
      const needsReload =
        mobileFrame &&
        (!mobileFrame.getAttribute("src") ||
          mobileFrame.getAttribute("src") === "about:blank" ||
          mobileFrame.dataset.needsReload === "1");

      if (needsReload && originalGameSrc) {
        mobileFrame.setAttribute("src", originalGameSrc);
        mobileFrame.dataset.needsReload = "0";
      }
      gameOverlay.classList.add("gb-overlay-open");
      gameOverlay.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  }

  if (closeBtn && gameOverlay) {
    closeBtn.addEventListener("click", () => {
      // Overlay hide karo
      gameOverlay.classList.remove("gb-overlay-open");
      gameOverlay.style.display = "none";
      document.body.style.overflow = "";

      // Game ko "pause/stop" karne ka sabse reliable tareeqa:
      // iframe ka src hata dena (isse embedded game unload ho
      // jata hai aur background me chalna/run hona ruk jata hai).
      if (mobileFrame) {
        mobileFrame.setAttribute("src", "about:blank");
        // taake dobara Play Now click karne par fresh load ho:
        mobileFrame.dataset.needsReload = "1";
      }
    });
  }
})();
const playGameBtn = document.getElementById('playGameBtn');
if (playGameBtn) {
  playGameBtn.addEventListener('click', function () {
    const splash = document.getElementById('gameSplash');
    const iframe = document.getElementById('test_app_frame');
    const gameSrc = iframe && iframe.getAttribute('data-src');

    if (!splash || !iframe || !gameSrc) {
      console.error('Cannot start game: splash, iframe, or iframe data-src is missing.');
      return;
    }

    this.classList.add('slide-out');

    setTimeout(function () {
      splash.style.display = 'none';
      iframe.src = gameSrc;
      iframe.style.display = 'block';
    }, 600);
  });
}