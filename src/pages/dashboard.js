import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { SongList } from '../components/songList';



class Dashboard extends Component {
    constructor(props) {
        super(props)
    }
    onLogout() {
        localStorage.removeItem('token')
        this.props.history.push("/login")
    }
    render() {
        return (
            <Fragment>
                <div>Dashboard Page</div>
                <button onClick={this.onLogout.bind(this)}>Logout</button>
                <SongList />
                <Link to="/create-new-song">Add new song</Link>
            </Fragment>
        );
    }
}

export default Dashboard;
