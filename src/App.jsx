import { useState, useCallback } from 'react'
import { ALL_ROUNDS, MY_ROUNDS } from './data.js'
const ROUNDS = [...ALL_ROUNDS, ...MY_ROUNDS]
import ParticleBackground from './ParticleBackground.jsx'
import Confetti from './Confetti.jsx'
import Home from './Home.jsx'
import Game from './Game.jsx'
import Answer from './Answer.jsx'

export default function App() {
  const [screen, setScreen] = useState('home')   // 'home' | 'game' | 'answer'
  const [roundIdx, setRoundIdx] = useState(0)
  const [revealed, setRevealed] = useState(1)
  const [confetti, setConfetti] = useState(false)
  const [flashOp, setFlashOp] = useState(0)

  const flash = useCallback(() => {
    setFlashOp(0.5)
    setTimeout(() => setFlashOp(0), 120)
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

  const revealAnswer = useCallback(() => {
    flash()
    setConfetti(true)
    setScreen('answer')
  }, [flash])

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

      {/* Flash overlay */}
      <div className="flash" style={{ opacity: flashOp }} />

      {/* HOME */}
      {screen === 'home' && <Home onSelect={startRound} />}

      {/* GAME + ANSWER overlay */}
      {(screen === 'game' || screen === 'answer') && (
        <div className="overlay" style={{ position: 'fixed', zIndex: 10 }}>
          {screen === 'game' && (
            <Game
              round={round}
              revealed={revealed}
              onNext={nextClue}
              onReveal={revealAnswer}
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
