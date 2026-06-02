import { ALL_ROUNDS, MY_ROUNDS } from './data.js'

function RoundCard({ r, idx, onSelect, isDone }) {
  return (
    <div className={`round-card${isDone ? ' round-done' : ''}`} onClick={() => onSelect(idx)}>
      <div className="rc-top">
        <div className="rc-num">{r.n}</div>
        <div className="rc-badges">
          {isDone && <div className="rc-done-badge">✓ Done</div>}
          <div className="rc-badge">{r.clues.length} clue{r.clues.length !== 1 ? 's' : ''}</div>
        </div>
      </div>
      <div className="rc-middle">
        <div className="rc-mystery">{isDone ? '✅' : '❓'}</div>
        <div className="rc-tagline">{isDone ? 'Played' : 'Who am I?'}</div>
      </div>
      <button className="rc-play" onClick={e => { e.stopPropagation(); onSelect(idx) }}>
        {isDone ? '↺ Play Again' : '▶ Play'}
      </button>
    </div>
  )
}

export default function Home({ onSelect, completed, gameMode, onModeChange }) {
  const base = ALL_ROUNDS.length
  return (
    <div className="home">
      <div className="home-title">WHO AM I?</div>

      {/* Mode toggle */}
      <div className="mode-toggle-row">
        <button
          className={`mode-toggle-btn${gameMode === 'quiz' ? ' active' : ''}`}
          onClick={() => onModeChange('quiz')}
        >
          🔍 Quiz Mode
        </button>
        <button
          className={`mode-toggle-btn${gameMode === 'audience' ? ' active' : ''}`}
          onClick={() => onModeChange('audience')}
        >
          🎭 Audience Mode
        </button>
      </div>
      <p className="mode-toggle-desc">
        {gameMode === 'audience'
          ? 'Contestant looks away — photo shown first, then clues read aloud'
          : 'Everyone guesses together from the clues'}
      </p>

      <div className="rounds-grid">
        {ALL_ROUNDS.map((r, i) => (
          <RoundCard key={r.n} r={r} idx={i} onSelect={onSelect} isDone={completed.has(i)} />
        ))}
      </div>

      <div className="section-divider">
        <div className="sd-line" />
        <div className="sd-label">✦ Bonus Rounds ✦</div>
        <div className="sd-line" />
      </div>

      <div className="rounds-grid" style={{ marginTop: '1rem' }}>
        {MY_ROUNDS.map((r, i) => (
          <RoundCard key={r.n} r={r} idx={base + i} onSelect={onSelect} isDone={completed.has(base + i)} />
        ))}
      </div>
    </div>
  )
}
