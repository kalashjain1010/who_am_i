import { useState, useEffect } from 'react'

function useWikiPhoto(name) {
  const [url, setUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!name) { setLoading(false); return }
    setLoading(true); setUrl(null)
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`)
      .then(r => r.json())
      .then(d => setUrl(d.thumbnail?.source || null))
      .catch(() => setUrl(null))
      .finally(() => setLoading(false))
  }, [name])
  return { url, loading }
}

export default function PhotoReveal({ round, onStart, onBack }) {
  const { url, loading } = useWikiPhoto(round.wikiName || round.answer)

  return (
    <div className="photo-reveal-page">
      <button className="back-btn pr-back" onClick={onBack}>← Back</button>

      <div className="pr-who-label">WHO AM I?</div>

      <div className="pr-photo-wrap">
        {loading && (
          <div className="photo-spinner">
            <div className="spinner" />
          </div>
        )}
        {!loading && url && (
          <img src={url} alt="who am i" onError={e => e.target.style.display = 'none'} />
        )}
        {!loading && !url && (
          <div className="pr-initials">
            {round.answer.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      <div className="pr-answer-name">{round.answer}</div>

      <div className="pr-hint">Contestant — look away from the screen 👆</div>

      <button className="btn-next pr-start-btn" onClick={onStart}>
        Start Clues ›
      </button>
    </div>
  )
}
