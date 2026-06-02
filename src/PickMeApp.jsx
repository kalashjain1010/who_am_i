import { useState, useEffect } from 'react'
import { PICKME_EPISODES } from './pickmeData.js'
import ParticleBackground from './ParticleBackground.jsx'
import PickMeHome from './PickMeHome.jsx'
import PickMeCategories from './PickMeCategories.jsx'
import PickMeQuestion from './PickMeQuestion.jsx'

function getHashState() {
  const parts = window.location.hash.slice(1).split('/')
  // #pickme       → episodes
  // #pickme/3     → episode idx 3, categories screen
  if (parts[1] !== undefined && parts[1] !== '') {
    return { screen: 'categories', episodeIdx: parseInt(parts[1]) || 0 }
  }
  return { screen: 'episodes', episodeIdx: 0 }
}

export default function PickMeApp({ onBack }) {
  const init = getHashState()
  const [screen, setScreen] = useState(init.screen)
  const [episodeIdx, setEpisodeIdx] = useState(init.episodeIdx)
  const [categoryIdx, setCategoryIdx] = useState(0)

  useEffect(() => {
    const handler = () => {
      const s = getHashState()
      setScreen(s.screen)
      setEpisodeIdx(s.episodeIdx)
    }
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  const selectEpisode = (idx) => {
    window.location.hash = `pickme/${idx}`
    setEpisodeIdx(idx)
    setScreen('categories')
  }

  const selectCategory = (idx) => {
    setCategoryIdx(idx)
    setScreen('question')
  }

  const backToEpisodes = () => {
    window.location.hash = 'pickme'
    setScreen('episodes')
  }

  const backToCategories = () => {
    setScreen('categories')
  }

  const episode = PICKME_EPISODES[episodeIdx]
  const category = episode?.categories[categoryIdx]

  return (
    <>
      <ParticleBackground />
      {screen === 'episodes' && (
        <PickMeHome episodes={PICKME_EPISODES} onSelect={selectEpisode} onBack={onBack} />
      )}
      {screen === 'categories' && (
        <PickMeCategories episode={episode} onSelect={selectCategory} onBack={backToEpisodes} />
      )}
      {screen === 'question' && (
        <PickMeQuestion category={category} onBack={backToCategories} />
      )}
    </>
  )
}
