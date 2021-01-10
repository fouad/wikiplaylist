const addId = (i, id) => ({ ...i, id })
const requireAll = (requireContext) => requireContext.keys().map(requireContext)

let playlists = requireAll(require.context('./playlists', false, /.json$/))

playlists = playlists
  .map((playlist) => {
    if (playlist?.props?.items) {
      playlist.props.items = playlist?.props?.items.map(addId)
    }
    return playlist
  })
  .sort((a, b) => b.name.localeCompare(a.name))

export const PLAYLIST_MAP = playlists.reduce(
  (acc, p) => ({
    ...acc,
    [p.name]: p,
  }),
  {}
)

export default playlists
