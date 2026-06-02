const TRAP_ICONS = { isTrap: '⚠️' }
const CAT_COLORS = ['#8b5cf6','#f59e0b','#22d3ee','#10b981','#ef4444','#f97316','#ec4899','#a3e635','#60a5fa','#e879f9']

export default function PickMeCategories({ episode, onSelect, onBack }) {
  return (
    <div className="home" style={{ paddingTop: '2rem' }}>
      <button className="back-btn home-back-btn" onClick={onBack}>← Episodes</button>
      <div className="pm-ep-label">{episode.label}</div>
      <div className="pm-cats-grid">
        {episode.categories.filter(cat => !cat.panelSpecific).map((cat, i) => (
          <button
            key={i}
            className={`pm-cat-card${cat.isTrap ? ' pm-cat-trap' : ''}`}
            style={{ '--cat-color': CAT_COLORS[i % CAT_COLORS.length] }}
            onClick={() => onSelect(i)}
          >
            <div className="pm-cat-name">{cat.name}</div>
            <div className="pm-cat-hint">
              {cat.isTrap ? 'Dare to pick?' : cat.options?.length > 0 ? `${cat.options.length} options` : 'Open answer'}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
