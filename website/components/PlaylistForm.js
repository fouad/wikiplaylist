import _ from 'lodash'
import xw from 'xwind'
import uuid from '../utils/uuid'
import Button from './Button'
import { useState } from 'react'
import LinkIfExists from './LinkIfExists'
import { PlaylistContentList } from './PlaylistContent'

const getPlaylistItem = (id) => ({
  id,
  displayName: '',
  props: {
    image: '',
    href: '',
  },
})

function PlaylistForm({ playlist: initialPlaylist, saveAction = 'new' }) {
  let [state, setState] = useState(() => ({
    playlist: initialPlaylist || {
      name: uuid(),
      displayName: '',
      props: {
        author: '',
        backgroundImage: '',
        items: [getPlaylistItem(0)],
      },
    },
  }))
  let onChange = (id, field, value) =>
    setState((s) => {
      let { playlist } = s

      if (typeof id === 'undefined' || id === null) {
        playlist = _.set(playlist, field, value)
      } else {
        playlist = _.set(playlist, `props.items.${id}.${field}`, value)
      }

      return { ...s, playlist }
    })
  let addItem = () =>
    setState((s) => ({
      ...s,
      playlist: {
        ...s.playlist,
        props: {
          ...s.playlist.props,
          items: [
            ...s.playlist.props.items,
            getPlaylistItem(s.playlist.props.items.length),
          ],
        },
      },
    }))

  let disabledId = Boolean(initialPlaylist)

  return (
    <div css={xw`md:grid grid-cols-4 gap-x-4`}>
      <div css={xw`col-span-2`}>
        <InputField
          field="name"
          label="Playlist ID"
          onChange={onChange}
          disabled={disabledId}
          className={disabledId && 'opacity-75'}
          value={initialPlaylist ? initialPlaylist.name : state.playlist.name}
          rightChildren={
            !initialPlaylist && (
              <Button
                css={xw`w-48 ml-3 whitespace-nowrap`}
                onClick={() => onChange(null, 'name', uuid())}
              >
                Randomize ID
              </Button>
            )
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
      </div>
      <div css={xw`col-span-2`}>
        <PlaylistContentList playlist={state.playlist} />
        <div css={xw`flex justify-around mt-6 mb-12`}>
          <div css={xw`w-48 mr-3`}>
            <LinkIfExists
              target="_blank"
              className="w-full"
              href={getLinkToDraft({ playlist: state.playlist })}
            >
              <Button
                css={xw`w-full text-blue-600 bg-blue-100 hover:bg-blue-200`}
                tooltip="Saves as a shareable URL"
              >
                Save as Draft
              </Button>
            </LinkIfExists>
          </div>
          <div css={xw`w-48`}>
            <LinkIfExists
              target="_blank"
              className="w-full"
              href={getLinkToGithubFile({
                playlist: state.playlist,
                action: saveAction,
              })}
            >
              <Button
                css={xw`w-full`}
                tooltip="Opens a link to create a permanent change"
              >
                Save Permanently
              </Button>
            </LinkIfExists>
          </div>
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
  disabled,
  className,
  rightChildren,
  onChange = () => {},
}) {
  return (
    <div css={xw`mb-3`} className={className}>
      <label
        htmlFor={`input-${itemId}-${field}`}
        css={xw`block text-sm font-medium text-gray-700`}
      >
        {label}
      </label>
      <div className="flex mt-1">
        <input
          type="text"
          value={value}
          disabled={disabled}
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
  return `/list/-/view?draft=${b64(JSON.stringify({ playlist }))}`
}

function b64(val) {
  return typeof window !== 'undefined'
    ? btoa(val)
    : Buffer.from(val).toString('base64')
}

//@param action {string} [new,edit]
function getLinkToGithubFile({ playlist, action }) {
  let { name } = playlist,
    root = 'https://github.com/',
    repo = 'fouad/wikiplaylist',
    branch = 'main',
    value = JSON.stringify(playlist, null, 2),
    encodedValue = encodeURIComponent(value)
  let pathWithQuery =
    action === 'new'
      ? `?filename=website/data/playlists/${name}.json&`
      : `/website/data/playlists/${name}.json?`
  return `${root}${repo}/${action}/${branch}${pathWithQuery}value=${encodedValue}`
}

export default PlaylistForm
