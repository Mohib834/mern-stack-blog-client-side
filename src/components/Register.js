import React, { Component } from 'react';
import '../styles/Login.css';
import loader from '../loader.gif';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
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
        e.preventDefault()

        this.setState({ loading: true })

        const { name, email, password } = this.state;
        const data = { name, email, password }

        this.props.registerUser(data, response => {
            console.log(response);
            if (response.status === 200) {
                this.props.routeProps.history.push('/blog');
                this.setState({ loading: false })
            }
        });
    }
    render() {
        const { loading } = this.state;
        return (
            <div>
                {loading ? <img src={loader} width='100px' /> : (
                    <form className="form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input className="form-control" type='text' name="name" placeholder="Your Name" onChange={this.handleChange} value={this.state.name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type='email' name="email" placeholder="Your Email" onChange={this.handleChange} value={this.state.email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type='password' name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
                        </div>
                        <input className="btn btn-primary btn-lg btn-block" type="submit" value="Sign Up" />
                    </form>
                )}
            </div>

        )
    }
}

export default Register;
