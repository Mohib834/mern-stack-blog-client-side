import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { relative } from 'path';
import { useMediaQuery } from '@material-ui/core';

const style = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2rem',
        borderBottom: '1px solid #eee',
        fontSize: '1.5rem',
        position: 'relative',
        ['@media (max-width:530px)']: { // eslint-disable-line no-useless-computed-key
            marginBottom: '4rem',
        },
    },
    menu: {
        display: 'flex',
        marginBottom: '0',
        '& li': {
            listStyle: 'none',
            margin: '0 1.5rem',
        }
    },
    logo: {
        textDecoration: 'none',
        fontSize: '2.5rem',
        color: '#000',
        fontWeight: 'bold',
        marginRight: '-8rem',
    },
    acc: {
        marginBottom: '0',
        display: 'flex',
        '& li': {
            listStyle: 'none',
            margin: '0 1rem',
        }
    }
}

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
    }
    handleLogout(e) {
        e.preventDefault();
        this.props.logoutUser(response => {
            if (response.status === 200) {
                this.props.routeProps.history.push('/blog');
            }
        });
    }
    handleMenu() {
        this.setState(st => ({
            open: !st.open,
        }))
    }
    render() {
        const { classes, user } = this.props;
        return (
            <nav className={classes.navbar}>
                <Link to="/" className={classes.logo}>the daily post</Link>
                <div className={`menu-item ${this.state.open && 'show'}`}>
                    <ul className={classes.menu} style={user ? { marginLeft: '-3.5rem' } : { marginLeft: '0' }}>
                        <li>
                            <Link to="/" className="styled-link">Home</Link>
                        </li>
                        <li>
                            <Link to="/blog" className="styled-link">Blogs</Link>
                        </li>

                        {user && <li><Link to="/blog/myblogs" className="styled-link">My Blogs</Link></li>}

                    </ul>
                    <ul className={classes.acc}>

                        {!user && <li><Link to="/register">Sign Up</Link></li>}

                        <li>
                            {user ? <Link to="/logout" onClick={this.handleLogout}>Logout</Link> : <Link to="/login">Login</Link>}
                        </li>
                    </ul>
                </div>
                <div id="hamburger" className={this.state.open && 'open'} onClick={this.handleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav >
        )
    }
}

export default withStyles(style)(Navbar);