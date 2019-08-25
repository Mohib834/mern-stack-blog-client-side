import React, { Component } from 'react'
import '../styles/BlogAdd.css'
import loader from '../loader.gif';
import Switch from '@material-ui/core/Switch';


class BlogAdd extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            subTitle: '',
            content: '',
            showToPublic: false,
            loading: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePublicChange = this.handlePublicChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        const { title, subTitle, content, showToPublic } = this.state;
        const data = { title, subTitle, content, showToPublic };
        console.log(data);
        this.setState({ loading: true })
        this.props.createBlog(data, response => {
            if (response.status === 200) {
                this.props.routeProps.history.push('/blog/myblogs');
                this.setState({ loading: false })
            }
        });
    }
    handlePublicChange() {
        this.setState(st => ({
            showToPublic: !st.showToPublic,
        }))
    }
    render() {
        const { loading, showToPublic } = this.state;
        return (
            <div className="BlogAdd">
                {loading ? <img src={loader} width='100px' /> : (
                    <form className="BlogAdd-form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor='title'>Title</label>
                            <input className="form-control" id="title" name="title" type="text" placeholder="Blog Title" value={this.state.title} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor='subTitle'>Subtitle</label>
                            <input className="form-control" id="subTitle" name="subTitle" type="text" placeholder="Blog Title" value={this.state.subTitle} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor='content'>Content</label>
                            <textarea id="content" className="form-control" rows="9" name="content" value={this.state.content} onChange={this.handleChange}></textarea>
                        </div>
                        <div className="form-footer">
                            <input type="submit" className="btn btn-primary btn-lg" />
                            <div>
                                Public
                                <Switch
                                    color="primary"
                                    checked={showToPublic}
                                    inputProps={{ 'aria-label': 'checkbox primary' }}
                                    onChange={this.handlePublicChange}
                                />
                            </div>
                        </div>
                    </form>
                )}
            </div>
        )
    }
}

export default BlogAdd;