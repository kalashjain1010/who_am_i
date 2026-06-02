import { useState, useEffect } from 'react'

function useWikiPhoto(wikiName) {
  const [url, setUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!wikiName) { setLoading(false); return }
    setLoading(true); setUrl(null)
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiName)}`)
      .then(r => r.json())
      .then(d => setUrl(d.thumbnail?.source || null))
      .catch(() => setUrl(null))
      .finally(() => setLoading(false))
  }, [wikiName])

  return { url, loading }
}

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function Answer({ round, revealed, onNext, onHome, isLast }) {
  const { url, loading } = useWikiPhoto(round.wikiName || round.answer)
  const shown = round.clues.slice(0, revealed)

  return (
    <div className="answer-page">
      <div className="ans-label">The answer is…</div>

      <div className="ans-photo-wrap">
        {loading && (
          <div className="photo-spinner">
            <div className="spinner" />
          </div>
        )}
        {!loading && url && (
          <img src={url} alt={round.answer} onError={e => { e.target.style.display = 'none' }} />
        )}
        {!loading && !url && (
          <div className="ans-photo-initials">{initials(round.answer)}</div>
        )}
      </div>

      <div className="ans-word">{round.answer}</div>

      <div className="ans-recap">
        {shown.map((clue, i) => (
          <div key={i} className="ans-recap-item">
            <div className="arc-clue">
              <span className="arc-cn">C{i + 1}</span>
              {clue}
            </div>
            {round.explains?.[i] && (
              <div className="arc-explain">💡 {round.explains[i]}</div>
            )}
          </div>
        ))}
      </div>

      <div className="ans-btns">
        <button className="btn-home" onClick={onHome}>← All Rounds</button>
        <button className="btn-nxt" onClick={onNext}>
          {isLast ? 'Finish' : 'Next Round →'}
        </button>
      </div>
    </div>
  )
}
