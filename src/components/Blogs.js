import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import BlogCard from './BlogCard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import loader from '../loader.gif';


const styles = {
    root: {
        position: 'relative',
    },
    title: {
        textTransform: 'uppercase',
        fontSize: '2.5rem',
        margin: '1rem 0',
        fontWeight: 'lighter',
        textDecoration: 'underline',
    },
    fab: {
        position: 'fixed',
        bottom: '20px',
        right: '20px'
    },
    link: {
        color: '#3f51b5',
        '&:hover': {
            textDecoration: 'underline',
            color: '#3f51b5',
        }
    }
}

class Blogs extends Component {
    render() {
        const { classes, blogs, deleteBlog, isUserLoggedIn, areMyBlogs, loading } = this.props;
        const showBlogs = () => {
            if (blogs.length === 0 && areMyBlogs) {
                return <p><span style={{ display: 'inline-block', transform: 'rotateZ(90deg)', fontSize: '18px' }}>:(</span> You don't have any blogs yet. <Link to="/blog/new" className={classes.link}>Create One ?</Link> </p>
            } else {
                return blogs.map(blog => (
                    <BlogCard
                        blog={blog}
                        key={blog._id}
                        deleteBlog={deleteBlog}
                        areMyBlogs={areMyBlogs}
                    />
                ))
            }
        }
        if (!loading) {
            return (
                <div className={classes.root}>
                    <h3 className={classes.title}>{areMyBlogs ? 'My Blogs' : 'Public Blogs'}</h3>
                    <div>
                        {showBlogs()}
                    </div>
                    {isUserLoggedIn && (
                        <Link to="/blog/new">
                            <Fab color="primary" aria-label="add" className={classes.fab}>
                                <AddIcon style={{ fontSize: '22px' }} />
                            </Fab>
                        </Link>
                    )}
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

export default withStyles(styles)(Blogs);