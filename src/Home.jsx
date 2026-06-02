import { ALL_ROUNDS, MY_ROUNDS } from './data.js'

function RoundCard({ r, idx, onSelect }) {
  return (
    <div className="round-card" onClick={() => onSelect(idx)}>
      <div className="rc-top">
        <div className="rc-num">{r.n}</div>
        <div className="rc-badge">{r.clues.length} clue{r.clues.length !== 1 ? 's' : ''}</div>
      </div>
      <div className="rc-middle">
        <div className="rc-mystery">❓</div>
        <div className="rc-tagline">Who am I?</div>
      </div>
      <button className="rc-play" onClick={e => { e.stopPropagation(); onSelect(idx) }}>
        ▶ Play
      </button>
    </div>
  )
}

export default function Home({ onSelect }) {
  const base = ALL_ROUNDS.length
  return (
    <div className="home">
      <div className="home-title">WHO AM I?</div>

      <div className="rounds-grid">
        {ALL_ROUNDS.map((r, i) => <RoundCard key={r.n} r={r} idx={i} onSelect={onSelect} />)}
      </div>

      <div className="section-divider">
        <div className="sd-line" />
        <div className="sd-label">✦ Bonus Rounds ✦</div>
        <div className="sd-line" />
      </div>

      <div className="rounds-grid" style={{ marginTop: '1rem' }}>
        {MY_ROUNDS.map((r, i) => <RoundCard key={r.n} r={r} idx={base + i} onSelect={onSelect} />)}
      </div>
    </div>
  )
}
