import xw from 'xwind'
import Link from 'next/link'
import Button from '../../../components/Button'
import PageContainer from '../../../components/PageContainer'
import playlistFixture, { PLAYLIST_MAP } from '../../../data/playlist-fixture'
import PlaylistForm from '../../../components/PlaylistForm'
import Header from '../../../components/Header'

const EditPlaylist = ({ playlist }) => (
  <PageContainer>
    <Header>
      <Link href={playlist ? `/list/${playlist.name}` : '/'}>
        <a css={xw`inline-block my-4`}>
          <Button css={xw`text-blue-600 bg-blue-100 hover:bg-blue-200`}>
            &larr; Back
          </Button>
        </a>
      </Link>
    </Header>
    <PlaylistForm playlist={playlist} saveAction="edit" />
  </PageContainer>
)

export const getStaticProps = ({ params }) => ({
  props: { playlist: PLAYLIST_MAP[params.id] || null },
})

export const getStaticPaths = () => ({
  fallback: true,
  paths: playlistFixture.map((p) => ({
    params: { id: p.name || '' },
  })),
})

export default EditPlaylist
