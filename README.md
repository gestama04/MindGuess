# MindGuess

MindGuess is a mobile guessing game powered by a custom local probabilistic inference engine.

The game attempts to identify the public figure the player is thinking of by selecting useful questions, updating candidate probabilities, and determining when there is enough confidence to present a guess.

Unlike approaches that depend on a generative AI model for every question, the main MindGuess game engine runs locally and remains deterministic, testable, and available without an AI request.

---

## Current Status

MindGuess is in active development.

The current implementation includes:

- A functional React Native mobile application
- A local probabilistic inference engine
- Structured and validated public-figure data
- Automated dataset simulations
- Reproducible question variation
- Development diagnostics
- Automated testing

Current evaluated results:

- 10 public figures
- 33 structured questions
- 75 automated tests
- 100% identification across the current dataset
- Multiple reproducible question-selection seeds
- Successful Android testing through Expo Go

---

## How the Game Engine Works

MindGuess maintains a probability distribution across all available candidates.

After each player answer, the engine:

1. Evaluates how each candidate relates to the current question.
2. Applies answer-dependent likelihood weights.
3. Normalizes the candidate probability distribution.
4. Ranks the remaining candidates.
5. Calculates the expected entropy of available questions.
6. Selects a question with high expected information gain.
7. Ends the game when the configured confidence or turn limit is reached.

Supported answers:

- Yes
- No
- Maybe
- I don't know

---

## Question Selection

Questions are ranked using entropy and expected information gain.

The engine can select between questions that are close to the highest-ranked option using a configurable near-best ratio.

Question variation is controlled through reproducible numeric seeds.

This provides:

- Different question sequences between games
- Deterministic automated tests
- Reproducible bug reports
- Protection against selecting significantly weaker questions

---

## Architecture

MindGuess is organized as a TypeScript monorepo using npm Workspaces.

```text
apps/
  mobile/

data/
  people/
  tests/

packages/
  entity-schema/
  game-data/
  game-engine/
  shared-types/
