import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        height: '80vh',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quote: {
        marginTop: '-7rem',
        fontWeight: 'lighter',
        fontSize: '3.5rem',
        ['@media(max-width:530px)']: {
            fontSize: '2rem',
        },
        ['@media(max-width:415px)']: {
            fontSize: '1.7rem'
        },
        '& span': {
            fontSize: '8rem',
            ['@media(max-width:530px)']: {
                fontSize: '5rem'
            },
            ['@media(max-width:415px)']: {
                fontSize: '2.5rem'
            },
            ['@media(max-width:360px)']: {
                fontSize: '2rem'
            },
        }
    }
}

function Home(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <h1 className={classes.quote}>
                <span>“</span>Opportunities don't happen, you create them.<span>”</span>
            </h1>
        </div>
    )
}

export default withStyles(styles)(Home);