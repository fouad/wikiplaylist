import _ from 'lodash'
import xw from 'xwind'
import uuid from '../utils/uuid'
import Button from './Button'
import { useState } from 'react'
import { useRouter } from 'next/router'
import playlists from '../data/playlist-fixture'

const getPlaylistItem = () => ({
  displayName: '',
  props: {
    image: '',
    href: '',
  },
})

function PlaylistForm({ playlist: initialPlaylist }) {
  let [state, setState] = useState(() => ({
    playlist: initialPlaylist || {
      name: uuid(),
      displayName: '',
      props: {
        author: '',
        backgroundImage: '',
        items: [getPlaylistItem()],
      },
    },
  }))
  let onChange = (id, field, value) => {
    setState((s) => {
      let { playlist } = s

      if (typeof id === 'undefined' || id === null) {
        playlist = _.set(playlist, field, value)
      } else {
        playlist = _.set(playlist, `props.items.${id}.${field}`, value)
      }

      return { ...s, playlist }
    })
  }
  let router = useRouter()
  let addItem = () =>
    setState((s) => ({
      ...s,
      playlist: {
        ...s.playlist,
        props: {
          ...s.playlist.props,
          items: [...s.playlist.props.items, getPlaylistItem()],
        },
      },
    }))

  return (
    <div>
      <InputField
        field="name"
        label="Playlist ID"
        value={state.playlist.name}
        onChange={onChange}
        rightChildren={
          <Button
            css={xw`w-48 ml-3`}
            onClick={() => onChange(null, 'name', uuid())}
          >
            Randomize ID
          </Button>
        }
      />
      <InputField
        field="displayName"
        label="Playlist Name"
        value={state.playlist.displayName}
        onChange={onChange}
      />
      <InputField
        label="Playlist Image"
        field="props.backgroundImage"
        value={state.playlist.props.backgroundImage}
        onChange={onChange}
      />
      <InputField
        label="Author"
        field="props.author"
        value={state.playlist.props.author}
        onChange={onChange}
      />
      {state.playlist.props.items.map((item, id) => (
        <div key={id}>
          <h2 css={xw``}>Step {id + 1}</h2>
          <ContentItemField itemId={id} item={item} onChange={onChange} />
        </div>
      ))}
      <div>
        <Button css={xw`w-28 md:px-0`} onClick={addItem}>
          Add Item
        </Button>
      </div>
      <div css={xw`mt-20`} />
      <div css={xw`flex justify-end mt-6 mb-12`}>
        <div css={xw`w-48 mr-3`}>
          <Button
            css={xw`text-blue-600 bg-blue-100 hover:bg-blue-200`}
            tooltip="Saves as a shareable URL"
            onClick={() =>
              router.push(getLinkToDraft({ playlist: state.playlist }))
            }
          >
            Save as Draft
          </Button>
        </div>
        <div css={xw`w-48`}>
          <Button tooltip="Opens a link to create a permanent change">
            Save Permanently
          </Button>
        </div>
      </div>
    </div>
  )
}

export function ContentItemField({
  itemId,
  item = { id: '', displayName: '', props: { href: '', image: '' } },
  onChange = () => {},
}) {
  let id = typeof itemId !== 'undefined' ? itemId : item.id
  return (
    <div css={xw`py-3 px-4`}>
      <InputField
        itemId={id}
        label="Title"
        field="displayName"
        value={item.displayName}
        onChange={onChange}
      />
      <InputField
        itemId={id}
        label="Link URL"
        field="props.href"
        value={item.props.href}
        onChange={onChange}
      />
      <InputField
        itemId={id}
        label="Image URL"
        field="props.image"
        value={item.props.image}
        onChange={onChange}
      />
    </div>
  )
}

export function InputField({
  itemId,
  label,
  field,
  value,
  rightChildren,
  onChange = () => {},
}) {
  return (
    <div css={xw`mb-3`}>
      <label
        htmlFor={`input-${itemId}`}
        css={xw`block text-sm font-medium text-gray-700`}
      >
        {label}
      </label>
      <div className="flex mt-1">
        <input
          type="text"
          value={value}
          id={`input-${itemId}-${field}`}
          name={`input-${itemId}-${field}`}
          css={xw`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md`}
          onChange={(e) => onChange(itemId, field, e.target.value)}
        />
        {rightChildren}
      </div>
    </div>
  )
}

function getLinkToDraft({ playlist }) {
  let valueB64 = btoa(JSON.stringify({ playlist }))
  return `/list/-/view?draft=${valueB64}`
}

function getLinkToNewFile({ id, value }) {
  let root = 'https://github.com/'
  let repo = 'fouad/wikiplaylist'
  return `${root}${repo}/new/main?filename=website/data/playlists/${id}.json&value=${encodeURIComponent(
    value
  )}`
}

export default PlaylistForm
