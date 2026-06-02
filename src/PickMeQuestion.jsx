import { useState } from 'react'

export default function PickMeQuestion({ category, onBack }) {
  const [selected, setSelected] = useState(null)   // index of chosen option
  const [revealed, setRevealed] = useState(false)

  const hasOptions = category.options?.length > 0
  const isTrap = category.isTrap

  const handleOption = (idx) => {
    if (revealed) return
    setSelected(idx)
    setRevealed(true)
  }

  const isCorrect = hasOptions && selected !== null &&
    category.options[selected] === category.answer

  return (
    <div className="pm-q-page">
      <button className="back-btn" onClick={() => { setSelected(null); setRevealed(false); onBack() }}>
        ← Categories
      </button>

      <div className="pm-q-cat-label">{category.name}</div>

      {/* Trap category */}
      {isTrap && (() => {
        const isWin = category.answer.toLowerCase().includes('bonus') || category.answer.startsWith('+')
        return (
          <div className="pm-trap-screen">
            <div className="pm-trap-icon">{isWin ? '🎉' : '💀'}</div>
            <div className={`pm-trap-msg ${isWin ? 'pm-trap-win' : 'pm-trap-lose'}`}>
              {isWin
                ? 'Smart pick. You win this one just for being bold enough to click it.'
                : 'You fell for it. This category exists purely to punish the curious.'}
            </div>
            <div className="pm-trap-explain">{category.explanation}</div>
          </div>
        )
      })()}

      {/* Normal question */}
      {!isTrap && (
        <>
          <div className="pm-q-question">{category.question}</div>

          {/* MCQ options */}
          {hasOptions && (
            <div className="pm-options">
              {category.options.map((opt, i) => {
                let cls = 'pm-option'
                if (revealed) {
                  if (opt === category.answer) cls += ' pm-opt-correct'
                  else if (i === selected) cls += ' pm-opt-wrong'
                }
                if (!revealed) cls += ' pm-opt-active'
                return (
                  <button key={i} className={cls} onClick={() => handleOption(i)} disabled={revealed}>
                    <span className="pm-opt-letter">{String.fromCharCode(65 + i)}</span>
                    {opt}
                    {revealed && opt === category.answer && <span className="pm-opt-tick">✓</span>}
                    {revealed && i === selected && opt !== category.answer && <span className="pm-opt-cross">✗</span>}
                  </button>
                )
              })}
            </div>
          )}

          {/* Open answer — just reveal button */}
          {!hasOptions && !revealed && (
            <button className="btn-next pm-reveal-open" onClick={() => setRevealed(true)}>
              Reveal Answer ›
            </button>
          )}

          {/* Answer + explanation */}
          {revealed && (
            <div className="pm-answer-block">
              {hasOptions && (
                <div className={`pm-result-label ${isCorrect ? 'pm-correct' : 'pm-wrong'}`}>
                  {isCorrect ? '✓ Correct!' : '✗ Wrong'}
                </div>
              )}
              <div className="pm-answer-text">
                <span className="pm-answer-label">Answer: </span>
                {category.answer}
              </div>
              <div className="pm-explain">{category.explanation}</div>
            </div>
          )}
        </>
      )}

      {revealed && (
        <button className="btn-next pm-next-cat" onClick={() => { setSelected(null); setRevealed(false); onBack() }}>
          ← Back to Categories
        </button>
      )}
    </div>
  )
}
