import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Card, CardContent, Button, CardActions, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';

const styles = {
    card: {
        textAlign: 'left',
        padding: '2rem',
        margin: '2rem',
        boxShadow: '0 0px 2px rgba(0,0,0,.1)',
        display: 'inline-block',
        width: '30%',
        ['@media (max-width:1100px)']: { // eslint-disable-line no-useless-computed-key
            width: '40%'
        },
        ['@media (max-width:840px)']: { // eslint-disable-line no-useless-computed-key
            width: '70%',
            height: '70%',
        },
        position: 'relative',
        height: '39rem',
    },
    title: {
        fontSize: '25px',
    },
    body: {
        fontSize: '17px',
    },
    btnLearn: {
        fontSize: '14px',
        border: '1px solid #ccc',
    },
    closeBtn: {
        position: 'absolute',
        right: '0',
        top: '0',
    },
    dialogBtn: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: 'rgba(0,0,0,.8)'
    },
    cardFooter: {
        display: 'flex',
        justifyContent: 'space-between',
    }
}

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: false,
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    };
    handleOpen() {
        this.setState({
            dialog: true,
        })
    }
    handleClose() {
        this.setState({
            dialog: false
        })
    }
    handleDelete() {
        const { deleteBlog, blog } = this.props;
        this.setState({
            dialog: false
        }, deleteBlog(blog._id))
    }
    render() {
        const { classes, blog, areMyBlogs } = this.props;
        const { dialog, showToPublic } = this.state;
        return (

            <Card className={classes.card}>
                {areMyBlogs && (
                    <IconButton className={classes.closeBtn} onClick={this.handleOpen}>
                        <CloseIcon
                            color='inherit'
                            key="close"
                            aria-label="close"
                        />
                    </IconButton>
                )}

                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {blog.title}
                    </Typography>
                    <Typography component="p" className={classes.body}>
                        {blog.content.slice(0, 250) + '... '}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardFooter}>
                    <Link to={`/blog/${blog._id}`}>
                        <Button size="medium" className={classes.btnLearn}>
                            More
                        </Button>
                    </Link>
                </CardActions>

                {/* warning dialog */}

                <Dialog
                    open={dialog}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"

                >
                    <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
                        ARE YOU SURE YOU WANT TO DELETE THIS ?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} className={classes.dialogBtn}>
                            No
                        </Button>
                        <Button onClick={this.handleDelete} className={classes.dialogBtn} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        )
    }
}

export default withStyles(styles)(Blog);
