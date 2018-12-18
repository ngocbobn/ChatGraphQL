import React, { Component } from 'react';

class ChatList extends Component {
    render() {
        return (
            <div>
                <p>{this.props.data.userId}</p>
                <p>{this.props.data.message}</p>
            </div>
        );
    }
}

export default ChatList;
