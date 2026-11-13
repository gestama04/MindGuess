# 🧠 MindGuess

> A deterministic React Native guessing game powered by a local probabilistic inference engine.

<p align="center">
  <strong>React Native · Expo · TypeScript · Zod · npm Workspaces</strong>
</p>

<p align="center">
  <a href="https://github.com/gestama04/MindGuess">
    <strong>View source code</strong>
  </a>
</p>

---

## Overview

MindGuess is a mobile guessing game that attempts to identify the public figure a player is thinking of.

Instead of depending on a generative AI model for every question, the core game engine runs locally using structured data, probability updates, entropy, information gain, and deterministic question selection.

The result is a system that is:

- Local-first
- Deterministic
- Testable
- Reproducible
- Available without an AI request
- Suitable for automated simulations and diagnostics

---

## Current Status

MindGuess is in active development.

The current implementation includes:

- Functional React Native mobile application
- Local probabilistic inference engine
- TypeScript monorepo using npm Workspaces
- Structured public-figure dataset
- Runtime validation with Zod
- Automated dataset simulations
- Reproducible question-selection seeds
- Development diagnostics
- Classic and Fool Me game modes
- Native share messages
- 75 automated tests
- Android testing through Expo

### Current evaluation

- **34 validated candidates**
- **55 structured questions**
- **34/34 correct identifications**
- **100% identification rate across the current evaluated dataset**
- **75 automated tests**
- **Average of 6.97 questions per simulation**
- **Multiple reproducible question-selection seeds**

The current results describe the evaluated dataset and are not a claim that the engine can identify arbitrary people outside the available data.

---

## Game Modes

### Classic

The engine asks questions and attempts to identify the public figure selected by the player.

The game ends when:

- The confidence threshold is reached; or
- The configured maximum number of turns is reached.

### Fool Me

The player answers ambiguously and attempts to avoid being identified.

This mode uses the same observable game state as the main engine. It does not invent lie-detection metrics or claim to determine whether a player is telling the truth.

Results display:

- The engine's calculated confidence
- Number of questions asked
- Final candidate ranking
- A native share message

---

## How the Engine Works

MindGuess maintains a probability distribution across all available candidates.

After each answer, the engine:

1. Evaluates how each candidate relates to the current question.
2. Applies answer-dependent likelihood weights.
3. Updates the probability of every candidate.
4. Normalizes the probability distribution.
5. Ranks the remaining candidates.
6. Calculates the entropy of the current state.
7. Estimates the expected information gain of available questions.
8. Selects the next question.
9. Ends the game when the confidence or turn limit is reached.

Supported answers:

- Yes
- No
- Maybe
- I don't know

---

## Probability Updates

Each candidate receives a probability based on how compatible the candidate is with the player's answer.

The engine considers:

- Candidate-question compatibility
- Answer likelihood
- Current candidate probability
- Remaining uncertainty
- Confidence thresholds
- Configured turn limits

After each update, the probabilities are normalized so that the complete candidate distribution remains mathematically consistent.

---

## Entropy and Information Gain

Questions are selected using uncertainty reduction.

The engine calculates:

- Current entropy across candidates
- Expected entropy after each possible answer
- Expected information gain for each question
- Near-best question alternatives

Questions with higher expected information gain are generally more useful because they divide the remaining candidates more effectively.

The engine can choose between questions close to the highest-ranked option using a configurable near-best ratio. This keeps the game varied without selecting questions that are significantly weaker.

---

## Reproducible Question Variation

Question variation is controlled through numeric seeds.

The same seed produces the same question-selection behaviour, which enables:

- Deterministic automated tests
- Reproducible bug reports
- Stable dataset simulations
- Easier debugging
- Different question sequences between games

This combines deterministic behaviour for engineering purposes with controlled variation for the player experience.

---

## Architecture

MindGuess is organized as a TypeScript monorepo using npm Workspaces.

```text
apps/
└── mobile/
    ├── app/
    ├── components/
    ├── screens/
    └── services/

data/
├── people/
└── tests/

packages/
├── entity-schema/
├── game-data/
├── game-engine/
└── shared-types/
```

### Main responsibilities

- **Mobile app:** React Native interface, game flow, navigation, answer controls, results, and sharing
- **Game engine:** Probability updates, entropy, information gain, confidence, and question selection
- **Game data:** Structured candidates, questions, and compatibility data
- **Entity schema:** Runtime validation and data contracts
- **Shared types:** TypeScript types shared across workspaces
- **Dataset tests:** Simulations, consistency checks, and evaluation cases

---

## Technical Design

The project separates the mobile interface from the inference engine and domain data.

This allows the game engine to be:

- Tested independently of React Native
- Simulated without a device
- Reused by diagnostic scripts
- Validated against complete datasets
- Maintained without coupling UI code to probability logic

The architecture also keeps the main game loop local, reducing latency and avoiding unnecessary external requests.

---

## Tech Stack

### Mobile

- React Native
- Expo
- Expo Router
- TypeScript
- Native Android testing
- Native share functionality

### Engine and validation

- TypeScript
- Local probabilistic inference
- Entropy calculation
- Expected information gain
- Weighted probability updates
- Deterministic seeded variation
- Zod runtime validation

### Tooling and testing

- npm Workspaces
- Node.js Test Runner
- Automated dataset simulations
- Reproducible diagnostics
- TypeScript type checking
- Git and GitHub

---

## Testing

The project currently includes **75 automated tests** covering:

- Candidate identification
- Question selection
- Probability updates
- Confidence thresholds
- Turn limits
- Answer handling
- Seeded question variation
- Dataset consistency
- Edge cases
- Structured data validation
- Engine behaviour across evaluated candidates

Run the test suite with:

```bash
npm test
```

Run TypeScript validation with:

```bash
npm run typecheck
```

If the repository uses workspace-specific scripts, run the relevant command from the project root or target workspace.

---

## Local Development

### Requirements

- Node.js
- npm
- Expo-compatible development environment
- Android device or emulator for native testing

### Installation

```bash
git clone https://github.com/gestama04/MindGuess.git
cd MindGuess
npm install
```

Start the Expo development server:

```bash
npx expo start
```

Open the application with:

- Expo Go for supported development workflows
- Android emulator
- Physical Android device
- Development or preview build for native functionality

---

## Data Validation

Candidate and question data are validated at runtime using Zod schemas.

Validation helps detect:

- Missing required fields
- Invalid candidate identifiers
- Malformed question definitions
- Unsupported answer values
- Inconsistent dataset references
- Invalid probability-related configuration

The project treats the dataset as part of the application domain rather than as unvalidated static content.

---

## Evaluation Workflow

The current evaluation process uses reproducible simulations:

1. Load the validated candidate dataset.
2. Select a candidate as the hidden target.
3. Start the local game engine with a known seed.
4. Answer questions using the candidate's structured data.
5. Record the selected questions and probability updates.
6. Continue until the engine reaches a guess or turn limit.
7. Compare the final identification with the target candidate.
8. Store diagnostics for analysis and regression testing.

This makes it possible to measure engine behaviour consistently after changes.

---

## Project Goals

MindGuess is designed to explore:

- Local probabilistic inference
- Information-theoretic question selection
- Deterministic simulations
- Dataset-driven application architecture
- Runtime validation in TypeScript
- Separation between UI and domain logic
- Testable mobile product development

The project is intentionally not built around a black-box AI response loop. The inference behaviour is explicit, inspectable, and reproducible.

---

## Planned Improvements

Possible future improvements include:

- Expanded candidate datasets
- More structured question categories
- Improved onboarding
- Additional game modes
- More detailed post-game analytics
- Difficulty settings
- Better accessibility support
- Expanded localization
- Performance profiling on larger datasets
- Additional evaluation scenarios outside the current dataset

---

## Limitations

MindGuess can only identify candidates represented in its validated dataset.

Its accuracy depends on:

- Dataset completeness
- Question quality
- Candidate compatibility data
- Player answer accuracy
- Confidence and turn-limit configuration

The current 100% result applies only to the evaluated dataset and testing configuration.

---

## Repository

[View the MindGuess repository](https://github.com/gestama04/MindGuess)

---

## Author

**Bernardo Silva**

Software Engineer · React Native · TypeScript · Frontend

- **GitHub:** [github.com/gestama04](https://github.com/gestama04)
- **LinkedIn:** [linkedin.com/in/eng-bernardo-silva](https://www.linkedin.com/in/eng-bernardo-silva)
- **Portfolio:** [gestama04.github.io/CURRICULO-DIGITAL](https://gestama04.github.io/CURRICULO-DIGITAL/)
