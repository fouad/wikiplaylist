import xw from 'xwind'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Logo from '../components/Logo'
import Button from '../components/Button'
import PageContainer from '../components/PageContainer'
import PlaylistCarousel from '../components/PlaylistCarousel'
import playlistFixture from '../data/playlist-fixture'

const Index = () => {
  let router = useRouter()
  return (
    <>
      <PageContainer>
        <div css={xw`pt-24 pb-12`}>
          <div css={xw`text-center`}>
            <Logo css={xw`mx-auto mb-6`} />
            <h1 css={xw`text-4xl font-semibold`}>Wikiplaylist</h1>
            <h3 css={xw`mt-2 text-xl font-medium text-gray-600`}>
              Playlists for Wikipedia
            </h3>
            <div css={xw`flex justify-center mt-6`}>
              <Link href="/list/new">
                <a css={xw`mr-3`}>
                  <Button>New Playlist</Button>
                </a>
              </Link>
              <span>
                <Button
                  css={xw`text-blue-600 bg-blue-100 hover:bg-blue-200`}
                  onClick={() => {
                    let r = Math.floor(playlistFixture.length * Math.random())
                    let p = playlistFixture[r]
                    router.push('/list/[id]', `/list/${p.name}`)
                  }}
                >
                  I&rsquo;m feeling lucky
                </Button>
              </span>
            </div>
          </div>
        </div>
        <PlaylistCarousel
          css={xw`mt-4`}
          title="Trending playlists right now"
          ids={[
            '71a989bac4b54130bc722c686daea901',
            '71a989bac4b54130bc722c686daea901',
            '71a989bac4b54130bc722c686daea901',
          ]}
        />
        {/*
          <PlaylistCarousel
            title="Patron-sponsored playlists"
            ids={['416e75c0a3e4442c9057c2728ddccde8', 'bd7ee0117e5a40a1940d232308112a12']}
            css={xw`mt-2`}
          />
          <PlaylistCarousel title="Learning about COVID19" css={xw`mt-2`} />
        */}
      </PageContainer>
    </>
  )
}

export default Index
