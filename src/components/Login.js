import React, { Component } from 'react';
import '../styles/Login.css';
import loader from '../loader.gif';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    async handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        const data = { email, password };

        this.setState({ loading: true })
        this.props.loginUser(data, response => {
            if (response.status === 200) {
                this.props.routeProps.history.push('/blog/myblogs');
                this.setState({ loading: false })
            }
        })
    }
    render() {
        const { loading } = this.state;
        return (
            <div>
                {loading ? <img src={loader} width='100px' /> : (
                    <form className="form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type='email' name="email" placeholder="Your Email" onChange={this.handleChange} value={this.state.email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type='password' name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
                        </div>
                        <input type="submit" className="btn btn-primary btn-lg btn-block" value="Login" />
                    </form>
                )}
            </div>
        )
    }
}

export default Login;
