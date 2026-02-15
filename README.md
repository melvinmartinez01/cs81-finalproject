# W.U.R.P - Wireless Utility Response Program

## Overview

W.U.R.P (Wireless Utility Response Program) is a React-based smart home command simulator inspired by Module 6B "Creating an Assistant".
The application simulates a homne environment with multiple rooms and allow users to command certain devices like lights, music, water dispenser, and security features.
In this project, W.U.R.P simulates a Alfred-style personality - sarcastic, and composed - while dynamically updating the home status.
_______________

## Features

- React component-based architecture
- Dynamically room state management (lights, supplies, music, water, security)
- Command parsing system
- Activity log tracking all commands and actions
- Interactive console input
- Responsive layout using CSS Grid
- State-driven UI updates using React hooks
_______________

## Rooms Simulated
- Bathroom
- Kitchen
- Living Room
- Master Bedroom

Each room had independent state properties:
- Lights (ON/OFF)
- Toilet paper supply
- Doggy door lock status
- Ice water availibility
- Music playback state
_______________

## Example Commands
Users can test the system using commands such as:
- Turn on bathroom lights
- Turn off living room lights
- Unlock doggy door
- Making calls
- Request for toilet paper
To name a few.
_______________

## Technologies Used
- React
- JavaScript (ES6+)
- CSS Grid
- Vite
- Git/GitHub
_______________

## How It Works

1. User types a command into the Command Console.
2. The command is processed by a handler function.
3. The application updates the appropriate room state.
4. W.U.R.P generates a response message. 
5. The Activity Log records the interaction.
6. The UI re-renders dynamically based on updated state.
_______________

## Advanced Concepts Demonstrated
- useState for state management
- useMemo for derived state
- Controlled form inputs
- Conditional rendering
- Dynamic list rendering
- Object state manipulation
- Component composition
- Event handling
- Responsive layout techniques
_______________

Thank you for this class Professor Vicky Seno. The idea of creating a form of AI has been the main topic in my conversations with my friends and my partner. My friends are taught and guided me through this journey, first with C programming, and then Python. Learning JavaScript has been the best and funnest language I have learned so far.  