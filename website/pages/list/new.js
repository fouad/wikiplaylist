import xw from 'xwind'
import Link from 'next/link'
import Button from '../../components/Button'
import PlaylistForm from '../../components/PlaylistForm'
import PageContainer from '../../components/PageContainer'
import Header from '../../components/Header'

const NewPlaylist = () => (
  <PageContainer>
    <Header>
      <Link href="/">
        <a css={xw`inline-block my-4`}>
          <Button css={xw`text-blue-600 bg-blue-100 hover:bg-blue-200`}>
            &larr; Back
          </Button>
        </a>
      </Link>
    </Header>
    <PlaylistForm />
  </PageContainer>
)

export default NewPlaylist
