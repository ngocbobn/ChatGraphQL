import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Song from './song';
const SONG_LIST_QUERY = gql`
{
    songs{
      id
      title
      likes
    }
}
`;

const NEW_SONG_SUBSCRIPTION = gql`
subscription {
    createNewSongSub{
      id
      title
      likes
    }
}
`;
const LIKE_SONG_SUBSCRIPTION = gql`
subscription {
    likeSongSub{
      id
      title
      likes
    }
}
`;

class SongList extends Component {
    _updateSongList(store, data, songId) {
        const songStore = store.readQuery({ query: SONG_LIST_QUERY })
        debugger
        const song = songStore.songs.find(x => x.id == songId)
        song.likes = data.likes
    }
    _subcribeToNewSong(subscribeToMore) {
        debugger
        subscribeToMore({
            document: NEW_SONG_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev
                debugger
                const newSong = subscriptionData.data.createNewSongSub

                return Object.assign({}, prev, {
                    songs: [newSong, ...prev.songs],
                    __typename: prev.songs.__typename
                })
            }
        })
    }
    _subcribeToLikeSong(subscribeToMore) {
        subscribeToMore({
            document: LIKE_SONG_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev
                debugger
                const updateSong = subscriptionData.data.likeSongSub
                const data = Object.assign({}, prev)
                var index = data.findIndex(x => x.id == updateSong.id)
                data[index] = updateSong
                return Object.assign({}, prev, data)
            }
        })
    }
    render() {
        return (
            <Query query={SONG_LIST_QUERY}>
                {({ loading, error, data, subscribeToMore }) => {
                    debugger
                    if (loading) return <div>Loading...</div>
                    if (error) return <div>{error.message}</div>
                    debugger
                    this._subcribeToNewSong(subscribeToMore)
                    this._subcribeToLikeSong(subscribeToMore)
                    return data.songs.map((item, index) => <Song key={index} updateSongList={this._updateSongList} song={item} />)
                }}
            </Query>
        );
    }
}

export { SongList, SONG_LIST_QUERY };
