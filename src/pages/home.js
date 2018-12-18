import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
class Home extends Component {
    render() {
        return (
            <Fragment>
                <div>Home Page</div>
                <div><Link to='/login'>Signin</Link></div>
                <div><Link to='/signup'>Signup</Link></div>
            </Fragment>
        );
    }
}

export default Home;
