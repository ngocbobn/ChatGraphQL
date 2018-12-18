import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const LOGIN_GRAPHQL = gql`
mutation Login($username: String!, $password: String!){
    login(username: $username, password: $password){
        token
    }
  }
`;

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            password: null
        }
        this.loginMutation = this.loginMutation.bind(this)
    }
    loginMutation() {
        this.props.mutate({
            variables: { username: this.state.username, password: this.state.password }
        }).then(console.log('success')).catch(e => console.log(e.message))
    }
    render() {
        const { username, password } = this.state;
        return (
            <Fragment>
                <h3>Login</h3>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" onChange={e => this.setState({ username: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" onChange={e => this.setState({ password: e.target.value })} />
                </div>

                <Mutation
                    mutation={LOGIN_GRAPHQL}
                    variables={{ username, password }}
                    onError={e => console.log(e.message)}
                    update={(cache, { data: { login } }) => {
                        debugger
                        if(login.token !== null && login.token !== undefined){
                            this.props.history.push('/dashboard')
                            localStorage.setItem('token', login.token)
                        }
                    }}
                >
                    {loginMutation => <button onClick={loginMutation}>Login</button>}
                </Mutation>
            </Fragment>
        );
    }
}

export default Login;
