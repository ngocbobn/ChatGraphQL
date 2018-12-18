import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { SONG_LIST_QUERY, SongList } from '../components/songList'

const CREATE_NEW_SONG_MUTATION = gql`
mutation CreateNewSong($title: String!){
    createNewSong(title: $title){
        id
        title
        likes
    }
}
`;

class CreateNewSong extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: null
        }
    }
    render() {
        const { title } = this.state
        console.log(this.props)
        return (
            <Fragment>
                <label htmlFor="title">Title</label>
                <input id="title" onChange={e => this.setState({ title: e.target.value })} />
                <Mutation
                    mutation={CREATE_NEW_SONG_MUTATION}
                    variables={{ title }}
                    onError={e => console.log(e.message)}
                    onCompleted={e => this.props.history.push('/dashboard')}
                    update={(cache, { data: { createNewSong } }) => {
                        debugger
                        const songList = cache.readQuery({ query: SONG_LIST_QUERY })
                        debugger
                        songList.songs.push({
                            id: createNewSong.id,
                            title: createNewSong.title,
                            likes: createNewSong.likes
                        })
                    }}
                >
                    {mutation => <button onClick={mutation}>Create new song</button>}
                </Mutation>
            </Fragment>
        );
    }
}

export default CreateNewSong;
