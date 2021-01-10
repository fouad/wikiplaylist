import xw from 'xwind'
import Link from 'next/link'
import PlaylistCard from './PlaylistCard'
import playlists, { PLAYLIST_MAP } from '../data/playlist-fixture'

export function PlaylistCarousel({
  title = 'Popular playlists trending now',
  ids,
  ...props
}) {
  return (
    <div {...props}>
      <h3 css={xw`font-semibold`}>{title}</h3>
      <div css={xw`md:grid grid-cols-3 gap-4`}>
        {ids
          ? ids.map((id, key) => (
              <PlaylistCard
                key={key}
                href={`/list/${id}`}
                css={xw`py-2 max-w-full`}
                playlist={PLAYLIST_MAP[id]}
              />
            ))
          : playlists
              .filter((_, i) => i < 3)
              .map((playlist, key) => (
                <PlaylistCard
                  key={key}
                  href={`/list/${p.name}`}
                  css={xw`py-2 max-w-full`}
                  playlist={playlist}
                />
              ))}
      </div>
    </div>
  )
}

export default PlaylistCarousel
