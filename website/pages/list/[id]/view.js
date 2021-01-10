import xw from 'xwind'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Button from '../../../components/Button'
import Header from '../../../components/Header'
import Sidebar from '../../../components/PlaylistSidebar'
import PageContainer from '../../../components/PageContainer'
import playlistFixture, { PLAYLIST_MAP } from '../../../data/playlist-fixture'
import { PlaylistDisplayName } from '../../../components/PlaylistContent'
import { useRouter } from 'next/router'

const ViewPlaylist = ({ playlist, params, query }) => {
  const router = useRouter()

  if (!playlist) {
    if (router.query?.draft) {
      try {
        let decDraft = atob(router.query?.draft)
        let result = JSON.parse(decDraft)

        console.log('> decoded draft playlist', result)

        playlist = result.playlist
      } catch (err) {
        console.error(err)
        return <div>hello</div>
      }
    } else {
      return <div>not found!</div>
    }
  }

  const [frameSrc, setFrameSrc] = useState('')
  const [currentStep, setCurrentStep] = useState('')
  const [sidebarVisible, setSidebarVisibility] = useState(true)
  const onSidebarItemClick = (e) => {
    // If not cmd+click, then don't open the link
    if (!e.metaKey) {
      e.stopPropagation()
      e.preventDefault()
    }
    if (e.target.getAttribute('data-url')) {
      setFrameSrc(e.target.getAttribute('data-url'))
      setCurrentStep(e.target.getAttribute('data-id'))
      return
    }
    let parent = e.target.closest('[data-url]')
    if (parent) {
      setFrameSrc(parent.getAttribute('data-url'))
      setCurrentStep(parent.getAttribute('data-id'))
      return
    }
  }

  console.log(playlist)

  useEffect(() => {
    let first = playlist?.props?.items[0]
    setFrameSrc(first?.props?.href)
    console.log(first?.props?.href, playlist)
  }, [playlist, router.query.draft]) // TODO: add check for params to jump to linked step

  return (
    <>
      <PageContainer>
        <Header>
          <Link href="/">
            <a css={xw`inline-block my-4`}>
              <Button css={xw`text-blue-600 bg-blue-100 hover:bg-blue-200`}>
                &larr; Home
              </Button>
            </a>
          </Link>
          <Button
            onClick={() => setSidebarVisibility(!sidebarVisible)}
            css={xw`inline-block w-auto ml-3 text-blue-600 bg-blue-100 hover:bg-blue-200`}
          >
            Toggle Sidebar
          </Button>
          <PlaylistDisplayName css={xw`inline-block ml-3 max-w-xs`}>
            {playlist.displayName}
          </PlaylistDisplayName>
        </Header>
        <iframe
          src={frameSrc}
          css={xw`rounded-md border border-gray-200`}
          style={{ height: 'calc(100vh - 96px)' }}
          width="100%"
        />
      </PageContainer>
      <Sidebar
        playlist={playlist}
        curentStep={currentStep}
        visible={sidebarVisible}
        onContentItemClick={onSidebarItemClick}
      />
    </>
  )
}

export const getStaticProps = ({ params }) => ({
  props: { playlist: PLAYLIST_MAP[params.id] || null },
})

export const getStaticPaths = () => ({
  fallback: true,
  paths: playlistFixture.map((p) => ({
    params: { id: p.name || '' },
  })),
})

export default ViewPlaylist
