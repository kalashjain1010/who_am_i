export default function PickMeHome({ episodes, onSelect, onBack }) {
  return (
    <div className="home">
      <button className="back-btn home-back-btn" onClick={onBack}>← Games</button>
      <div className="home-title" style={{ fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '.08em' }}>PICK ME BEHAVIOUR</div>
      <p className="mode-toggle-desc" style={{ marginBottom: '1.5rem' }}>Pick an episode → pick a category → get the question</p>
      <div className="rounds-grid">
        {episodes.map((ep, i) => (
          <div key={ep.id} className="round-card" onClick={() => onSelect(i)}>
            <div className="rc-top">
              <div className="rc-num">{ep.id}</div>
              <div className="rc-badge">{ep.categories.length} categories</div>
            </div>
            <div className="rc-middle">
              <div className="rc-mystery">❓</div>
              <div className="rc-tagline">Pick Me</div>
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
