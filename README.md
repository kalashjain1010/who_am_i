# 🎭 Who Am I?

A live comedy quiz game built for game nights. 50 rounds of cryptic clues about famous personalities — from Narendra Modi to Osama Bin Laden, Sachin Tendulkar to Taylor Swift.

**[▶ Play Now → who-am-i-one-eta.vercel.app](https://who-am-i-one-eta.vercel.app/)**

---

## How It Works

The host picks a round and reveals clues one at a time. Players guess the famous personality. Once someone gets it (or gives up), the host hits **Reveal Answer** to show:

- The answer with a photo pulled live from Wikipedia
- An explanation for every clue — why it pointed to that person

Rounds you've completed are saved in your browser so you always know what's been played.

---

## Features

- **50 rounds** — 39 from the original *Nation Wants to Guess* show + 11 bonus rounds
- **Clue-by-clue reveal** — host controls the pace, one clue at a time
- **Wikipedia photo fetch** — live photo of the answer on reveal
- **Clue explanations** — every hint explained after the answer drops
- **Done tracking** — completed rounds saved in localStorage, shown with a green ✓
- **Confetti** on every reveal
- **Bonus Rounds** section — new cryptic clues 

---

## Tech Stack

- **React 18** + **Vite**
- **Canvas API** — particle background + confetti animation
- **Wikipedia REST API** — live photo on answer reveal
- **localStorage** — persist completed rounds across sessions
- CSS animations — slide-in clues, glow effects, answer zoom

---

## Run Locally

```bash
git clone https://github.com/kalashjain1010/who_am_i.git
cd who_am_i
npm install
npm run dev
```

---

## Round List (Spoiler Warning)

<details>


</details>

---

Built with ☕ for game nights that go on too long.
