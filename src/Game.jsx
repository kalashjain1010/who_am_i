import { useRef, useEffect } from 'react'

export default function Game({ round, revealed, onNext, onReveal, onBack }) {
  const wrapRef = useRef(null)
  const allDone = revealed >= round.clues.length

  useEffect(() => {
    if (wrapRef.current) {
      const last = wrapRef.current.lastChild
      last?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [revealed])

  return (
    <div className="game-page">
      <div className="game-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="game-title">WHO AM I?</div>
      </div>

      <div className="clue-dots">
        {round.clues.map((_, i) => {
          let cls = 'cdot'
          if (i < revealed) cls += ' done'
          if (i === revealed - 1) cls += ' cur'
          return <div key={i} className={cls} />
        })}
        <span className="clue-label">{revealed}/{round.clues.length}</span>
      </div>

      <div className="clues-wrap" ref={wrapRef}>
        {round.clues.slice(0, revealed).map((clue, i) => (
          <div key={i} className="clue-item" style={{ animationDelay: '0s' }}>
            <div className="clue-n">C{i + 1}</div>
            <div className="clue-t">{clue}</div>
          </div>
        ))}
      </div>

      <div className="game-btns">
        <button className="btn-reveal" onClick={onReveal}>🎭 Reveal</button>
        <button className="btn-next" onClick={onNext} disabled={allDone}>
          {allDone ? 'All clues shown' : 'Next Clue ›'}
        </button>
      </div>
    </div>
  )
}
