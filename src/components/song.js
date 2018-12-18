import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const LIKE_SONG_MUTATION = gql`
mutation LikeSong($id: String!){
    likeSong(id: $id){
      title
      likes
    }
}
`;

class Song extends Component {
    render() {
        const { id } = this.props.song
        return (
            <div>
                <div>{this.props.song.title}</div>
                <div>{this.props.song.likes}</div>
                <Mutation
                    mutation={LIKE_SONG_MUTATION}
                    variables={{ id: this.props.song.id }}
                    onError={e => console.log(e.message)}
                    update={(cache, { data: { likeSong } }) => this.props.updateSongList(cache, likeSong, id)}
                >
                    {likeMutation => {
                        return (
                            <a style={{ cursor: 'pointer' }} onClick={likeMutation}>
                                <img style={{ width: '15px' }} src="data:image/png;base64,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" />
                            </a>
                        )
                    }}
                </Mutation>
            </div>
        );
    }
}

export default Song;
