import { useState, useEffect } from 'react'
import ParticleBackground from './ParticleBackground.jsx'
import WhoAmIApp from './WhoAmIApp.jsx'
import PickMeApp from './PickMeApp.jsx'

function getHashGame() {
  const h = window.location.hash.slice(1).split('/')[0]
  return h === 'whoami' || h === 'pickme' ? h : null
}

export default function App() {
  const [game, setGame] = useState(getHashGame)

  useEffect(() => {
    const handler = () => setGame(getHashGame())
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  const navigate = (g) => {
    window.location.hash = g || ''
    setGame(g)
  }

  if (game === 'whoami') return <WhoAmIApp onBack={() => navigate(null)} />
  if (game === 'pickme') return <PickMeApp onBack={() => navigate(null)} />

  return (
    <>
      <ParticleBackground />
      <div className="landing">
        <div className="landing-title">NATION WANTS TO GUESS</div>
        <div className="landing-sub">Choose your game</div>
        <div className="landing-cards">
          <button className="landing-card" onClick={() => navigate('whoami')}>
            <div className="lc-icon">🎭</div>
            <div className="lc-name">Who Am I?</div>
            <div className="lc-desc">Cryptic clues. Famous personalities. One at a time — can you guess before the reveal?</div>
            <div className="lc-meta">50 rounds · Clue by clue</div>
          </button>
          <button className="landing-card" onClick={() => navigate('pickme')}>
            <div className="lc-icon">🎯</div>
            <div className="lc-name">Pick Me Behaviour</div>
            <div className="lc-desc">Pick a category. Get a question. Sometimes funny, sometimes trap — always chaotic.</div>
            <div className="lc-meta">13 episodes · MCQ + Open</div>
          </button>
        </div>
      </div>
    </>
  )
}
