import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom'
import '../styles/Blog.css'
import loader from '../loader.gif';



const styles = {
    root: {
        margin: '6rem 0',
        position: 'relative'
    },
    blogTitle: {
        fontSize: '4.1rem',
        ['@media(max-width:530px)']: {
            fontSize: '2.5rem'
        },
        ['@media(max-width:415px)']: {
            fontSize: '2rem',
            fontWeight: 'bold'
        },
    },
    blogSubTitle: {
        fontSize: '2.5rem',
        marginTop: '1.5rem',
        marginBottom: '2rem',
        ['@media(max-width:530px)']: {
            fontSize: '2rem'
        },
        ['@media(max-width:415px)']: {
            fontSize: '1.7rem'
        },
    },
    blogText: {
        width: '60%',
        ['@media(max-width:530px)']: {
            width: '80%'
        },
        margin: '0 auto',
        textAlign: 'left',
        lineHeight: '160%',
    },
    blogTime: {
        margin: '2rem 0',
        fontSize: '14px',
    },
    fab: {
        position: 'fixed',
        bottom: '20px',
        right: '20px'
    },
    comments: {
        width: '60%',
        margin: '0 auto',
        textAlign: 'left',
        fontSize: '3rem',
        border: '1px solid #ccc',
        marginTop: '2rem',
        padding: '2rem',
        background: '#3f51b5',
        color: '#fff',
        ['@media(max-width:530px)']: {
            width: '80%',
            fontSize: '2rem'
        },
    },
    comment: {
        fontSize: '18px',
        padding: '1rem 0',
        display: 'flex',
        justifyContent: 'space-between',
        ['@media(max-width:530px)']: {
            fontSize: '12px'
        },
        '& span': {
            fontSize: '14px',
            ['@media(max-width:530px)']: {
                fontSize: '12px'
            },
        }
    },
    ctBtn: {
        background: '#fff',
        fontSize: '14px',
        padding: '.4rem .7rem',
        border: 'none',
        borderRadius: '3px',

        ['@media(max-width:530px)']: {
            marginTop: '1rem',
        },

        '&:hover': {
            background: '#ccc'
        }
    },
    loginWarning: {
        fontSize: '17px',
        textAlign: 'center',
        textTransform: 'uppercase',
        ['@media(max-width:530px)']: {
            fontSize: '14px'
        },
    }

}

class Blog extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            comments: props.blog ? props.blog.comments : [],
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.commentBlog(this.state, this.props.blog._id, response => {
            this.setState({
                comments: response.data.comments,
            }, () => {
                this.setState({ comment: '' })
            });
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const { classes, blog, isUserLoggedIn, loading } = this.props;
        const { comments } = this.state;
        const b = { ...blog };
        if (!loading) {
            return (
                <div className={classes.root}>
                    <div>
                        <h1 className={classes.blogTitle}>{b.title}</h1>
                        <h3 className={classes.blogSubTitle}>{b.subTitle}</h3>
                        <p className={classes.blogText}>
                            {b.content}
                        </p>
                    </div>

                    <Link to="/blog/new">
                        <Fab color="primary" aria-label="add" className={classes.fab}>
                            <AddIcon style={{ fontSize: '22px' }} />
                        </Fab>
                    </Link>
                    <div className={classes.comments}>
                        Comments -
                         {comments.map((comment, idx) => (
                            <div key={comment._id} className={classes.comment}>
                                {idx + 1}. {comment.comment}
                                <span style={{ textTransform: 'capitalize' }}>-{comment.commentBy}</span>
                            </div>
                        ))}
                        {isUserLoggedIn ? (
                            <form id='comment-form' onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="comment" value={this.state.comment} onChange={this.handleChange} />
                                    <input type="submit" className={classes.ctBtn} value="Submit" />
                                </div>
                            </form>
                        ) : <div className={classes.loginWarning}>You need to login in order to comment !</div>}
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <img src={loader} width='100px' />
                </div>
            )
        }
    }
}

export default withStyles(styles)(Blog);