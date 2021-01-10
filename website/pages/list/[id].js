import xw from 'xwind'
import Link from 'next/link'
import Button from '../../components/Button'
import Header from '../../components/Header'
import PlaylistCard from '../../components/PlaylistCard'
import PageContainer from '../../components/PageContainer'
import PlaylistContentItem from '../../components/PlaylistContent'
import playlistFixture, { PLAYLIST_MAP } from '../../data/playlist-fixture'

const ViewPlaylist = ({ playlist }) => (
  <PageContainer>
    <Header>
      <Link href="/">
        <a css={xw`inline-block my-4`}>
          <Button css={xw`text-blue-600 bg-blue-100 hover:bg-blue-200`}>
            &larr; Back
          </Button>
        </a>
      </Link>
      <Link href={`/list/${playlist?.name}/edit`}>
        <a css={xw`inline-block my-4 ml-3`}>
          <Button css={xw`text-gray-600 bg-gray-100 hover:bg-gray-200`}>
            Edit
          </Button>
        </a>
      </Link>
    </Header>
    <div css={xw`md:grid grid-cols-3 gap-x-4`}>
      <div>
        <PlaylistCard
          css={xw`pb-2 max-w-full`}
          href={`/list/${playlist?.name}/view`}
          playlist={playlist}
          imageChildren={
            <span className="absolute bottom-0 left-0 w-full py-2 text-center bg-gray-800 text-white uppercase opacity-75 hover:opacity-90">
              ▶&nbsp;&nbsp;Start
            </span>
          }
        />
        {playlist?.props?.description && (
          <>
            <hr css={xw`border-t border-gray-200 mt-1 mb-6`} />
            <div css={xw`text-gray-500 mb-3`}>
              <p>{playlist?.props?.description}</p>
            </div>
          </>
        )}
      </div>
      <div css={xw`col-span-2`}>
        <div css={xw`border border-gray-200 rounded-md`}>
          {playlist?.props?.items?.map((item, key) => (
            <PlaylistContentItem key={key} item={item} />
          ))}
        </div>
      </div>
    </div>
  </PageContainer>
)

export const getStaticProps = ({ params }) => ({
  props: { playlist: PLAYLIST_MAP[params.id] || null },
})

export const getStaticPaths = () => ({
  fallback: true,
  paths: playlistFixture.map((p) => ({ params: { id: p?.name || '' } })),
})

export default ViewPlaylist
