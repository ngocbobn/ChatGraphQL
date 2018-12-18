import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
mutation Signup($username: String!, $password: String){
    signup(username: $username, password:$password){
      token
    }
}
`;

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            password: null
        }
    }
    _onSignupCompleted() {
        console.log('_onSignupCompleted')
    }
    render() {
        const { username, password } = this.state;
        return (
            <Fragment>
                <h3>Signup</h3>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" onChange={e => this.setState({ username: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" onChange={e => this.setState({ password: e.target.value })} />
                </div>
                <Mutation
                    mutation={SIGNUP_MUTATION}
                    variables={{ username, password }}
                    onError={e => console.log(e.message)}
                    onCompleted={this._onSignupCompleted}
                    update={(cache, { data: { signup } }) => {
                        debugger
                        localStorage.setItem('token', signup.token)
                    }}
                >
                    {signupMutation => <button onClick={signupMutation}>Signup</button>}
                </Mutation>
            </Fragment>
        );
    }
}

export default Signup;