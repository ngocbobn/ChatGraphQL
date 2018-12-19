import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ChatList from '../components/chatList';
import actions from '../redux/test/actions';

const { changeValue } = actions

const GET_PUBLIC_CHAT = gql`
{
    getPublicChat{
      _id
      userId
      message
    }
}
`;

const CREATE_NEW_PUBLIC_MESSAGE = gql`
mutation CreateNewPublicMessage($message: String!){
    createNewPublicChat(message: $message){
      _id
      userId
      message
    }
}
`;

const NEW_PUBLIC_MESSAGE_SUBSCRIPTION = gql`
subscription{
    createNewPublicChat{
      _id
      userId
      message
    }
}
`

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: null,
            value: null
        }

        this.changeValueRedux = this.changeValueRedux.bind(this)
    }
    _onSubcribePublicMessage(subscribeToMore) {
        subscribeToMore({
            document: NEW_PUBLIC_MESSAGE_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev
                debugger
                const newMessage = subscriptionData.data.createNewPublicChat
                const data = Object.assign({}, prev)
                if (data.getPublicChat.findIndex(x => x._id === newMessage._id) < 0) {
                    data.getPublicChat.push(newMessage)
                }
                return Object.assign({}, prev, data)
            }
        })
    }
    changeValueRedux(value) {
        this.props.changeValue(value)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value })
    }

    render() {
        const { message } = this.state
        return (
            <Fragment>
                <div>Chat Page</div>
                <label htmlFor="message">Message</label>
                <input id="message" onChange={e => this.changeValueRedux(e.target.value)} />
                <input id="test" value={this.state.value} />
                <Mutation
                    mutation={CREATE_NEW_PUBLIC_MESSAGE}
                    variables={{ message }}
                    onError={e => console.log(e.message)}
                    update={(cache, { data: { createNewPublicChat } }) => {
                        debugger
                        const chats = cache.readQuery({ query: GET_PUBLIC_CHAT })
                        if (chats.getPublicChat.findIndex(x => x._id === createNewPublicChat._id) < 0) {
                            chats.getPublicChat.push(createNewPublicChat)
                        }

                    }}
                >
                    {mutationCreateNewMessage => <button type="submit" onClick={mutationCreateNewMessage}>Send</button>}
                </Mutation>
                <hr />
                <Query
                    query={GET_PUBLIC_CHAT}>
                    {({ loading, error, data, subscribeToMore }) => {
                        debugger
                        if (loading) return <div>Loading...</div>
                        if (error) return <div>{error.message}</div>
                        this._onSubcribePublicMessage(subscribeToMore)
                        return data.getPublicChat.map((item, index) => <ChatList key={index} data={item} />)
                    }}
                </Query>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        value: state.TestReducers.get('value')
    }),
    { changeValue }
)(Chat);
