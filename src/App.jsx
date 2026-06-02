import { useState, useCallback } from 'react'
import { ALL_ROUNDS, MY_ROUNDS } from './data.js'
const ROUNDS = [...ALL_ROUNDS, ...MY_ROUNDS]
import ParticleBackground from './ParticleBackground.jsx'
import Confetti from './Confetti.jsx'
import Home from './Home.jsx'
import Game from './Game.jsx'
import Answer from './Answer.jsx'

const LS_KEY = 'wai_completed'

function loadCompleted() {
  try { return new Set(JSON.parse(localStorage.getItem(LS_KEY) || '[]')) }
  catch { return new Set() }
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [roundIdx, setRoundIdx] = useState(0)
  const [revealed, setRevealed] = useState(1)
  const [confetti, setConfetti] = useState(false)
  const [flashOp, setFlashOp] = useState(0)
  const [completed, setCompleted] = useState(loadCompleted)

  const flash = useCallback(() => {
    setFlashOp(0.5)
    setTimeout(() => setFlashOp(0), 120)
  }, [])

  const markDone = useCallback((idx) => {
    setCompleted(prev => {
      const next = new Set(prev)
      next.add(idx)
      localStorage.setItem(LS_KEY, JSON.stringify([...next]))
      return next
    })
  }, [])

  const startRound = useCallback((idx) => {
    setRoundIdx(idx)
    setRevealed(1)
    setConfetti(false)
    setScreen('game')
  }, [])

  const nextClue = useCallback(() => {
    setRevealed(r => r + 1)
  }, [])

  const revealAnswer = useCallback((idx) => {
    flash()
    markDone(idx)
    setConfetti(true)
    setScreen('answer')
  }, [flash, markDone])

  const nextRound = useCallback(() => {
    setConfetti(false)
    if (roundIdx + 1 < ROUNDS.length) {
      startRound(roundIdx + 1)
    } else {
      setScreen('home')
    }
  }, [roundIdx, startRound])

  const goHome = useCallback(() => {
    setConfetti(false)
    setScreen('home')
  }, [])

  const round = ROUNDS[roundIdx]

  return (
    <>
      <ParticleBackground />
      <Confetti active={confetti} />
      <div className="flash" style={{ opacity: flashOp }} />

      {screen === 'home' && <Home onSelect={startRound} completed={completed} />}

      {(screen === 'game' || screen === 'answer') && (
        <div className="overlay" style={{ position: 'fixed', zIndex: 10 }}>
          {screen === 'game' && (
            <Game
              round={round}
              revealed={revealed}
              onNext={nextClue}
              onReveal={() => revealAnswer(roundIdx)}
              onBack={goHome}
            />
          )}
          {screen === 'answer' && (
            <Answer
              round={round}
              revealed={revealed}
              onNext={nextRound}
              onHome={goHome}
              isLast={roundIdx + 1 >= ROUNDS.length}
            />
          )}
        </div>
      )}
    </>
  )
}
