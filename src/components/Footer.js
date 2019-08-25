import React from 'react'
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        background: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '6rem',
        width: '100%',

        '& span': {
            display: 'block',

        }
    },

}

function Footer(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <span>
                the daily post &copy;2019
            </span>
        </div>
    )
}

export default withStyles(styles)(Footer);