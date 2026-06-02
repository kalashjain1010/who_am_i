import { ALL_ROUNDS } from './data.js'

export default function Home({ onSelect }) {
  return (
    <div className="home">
      <div className="home-title">WHO AM I?</div>
      <div className="rounds-grid">
        {ALL_ROUNDS.map((r, i) => (
          <div key={r.n} className="round-card" onClick={() => onSelect(i)}>
            <div className="rc-top">
              <div className="rc-num">{r.n}</div>
              <div className="rc-badge">{r.clues.length} clue{r.clues.length !== 1 ? 's' : ''}</div>
            </div>
            <div className="rc-middle">
              <div className="rc-mystery">❓</div>
              <div className="rc-tagline">Who am I?</div>
            </div>
            <button className="rc-play" onClick={e => { e.stopPropagation(); onSelect(i) }}>
              ▶ Play
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
