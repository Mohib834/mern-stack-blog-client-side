import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Navbar from './components/Navbar';
import Blogs from './components/Blogs';
import Home from './components/Home';
import Footer from './components/Footer';
import Blog from './components/Blog';
import BlogAdd from './components/BlogAdd';
import Register from './components/Register';
import Login from './components/Login';
import axios from 'axios';

const API_URL = 'https://mohib-blog-api.herokuapp.com/'

//Theme modification 
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f51b5'
    }
  }
}
)

//For protected routes
axios.defaults.withCredentials = true;
const config = token => ({
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserLoggedIn: document.cookie ? true : false,
      publicBlogs: [],
      myBlogs: [],
      loading: false,
      token: JSON.parse(localStorage.getItem('token')) || '',
    }

    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.createBlog = this.createBlog.bind(this);
    this.deleteBlog = this.deleteBlog.bind(this);
    this.getPublicBlogs = this.getPublicBlogs.bind(this);
    this.getMyBlogs = this.getMyBlogs.bind(this);
    this.commentBlog = this.commentBlog.bind(this);
  }

  getPublicBlogs() {
    axios.get(`${API_URL}blog`)
      .then(response => {
        this.setState({ publicBlogs: response.data })
      })
      .catch(err => console.log(err))
  }

  getMyBlogs() {
    axios.get(`${API_URL}blog/myblogs`, config(this.state.token))
      .then(response => {
        this.setState({ myBlogs: response.data })
        console.log(response.data);
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      await this.getPublicBlogs();
      await this.getMyBlogs()

      this.setState({
        loading: false
      })
    })
  }

  async registerUser(data, callback) {
    try {
      const response = await axios.post(`${API_URL}register`, { data });

      this.getPublicBlogs();
      this.getMyBlogs();

      localStorage.setItem('token', JSON.stringify(response.data.token));

      this.setState({
        isUserLoggedIn: true,
        token: response.data.token
      })

      callback(response);
    } catch (err) {
      console.log(err);
    }
  }

  async loginUser(data, callback) {
    try {
      const response = await axios.post(`${API_URL}login`, { ...data });

      this.getPublicBlogs();
      this.getMyBlogs();

      localStorage.setItem('token', JSON.stringify(response.data.token));

      this.setState(st => ({
        isUserLoggedIn: true,
        token: response.data.token
      }))

      callback(response);
    } catch (err) {
      console.log(err);
    }
  }

  async logoutUser(callback) {
    const response = await axios.post(`${API_URL}logout`, null, config(this.state.token));
    this.setState(st => ({
      user: {},
      isUserLoggedIn: false,
      token: ''
    }))

    localStorage.clear();

    callback(response);
  }

  async createBlog(data, callback) {
    try {
      const response = await axios.post(`${API_URL}blog/new`, { ...data }, config(this.state.token));
      callback(response);

      this.getPublicBlogs();
      this.getMyBlogs();

    } catch (err) {
      console.log(err);
    }
  }

  deleteBlog(id) {
    this.setState(st => ({
      myBlogs: st.myBlogs.filter(blog => blog._id !== id),
    }))
    axios.delete(`${API_URL}blog/${id}`, config(this.state.token))
      .then(response => {
        console.log(response);
        this.getPublicBlogs();
      })
      .catch(err => console.log(err));
  }

  async commentBlog(data, id, callback) {
    const response = await axios.post(`${API_URL}blog/${id}/comment`, {
      ...data
    }, config(this.state.token));
    // Updating a blog which have a new comment
    const updatedBlog = response.data;
    this.setState(st => ({
      publicBlogs: st.publicBlogs.map(blog => blog._id === updatedBlog._id ? updatedBlog : blog),
      myBlogs: st.myBlogs.map(blog => blog._id === updatedBlog._id ? updatedBlog : blog),
    }));
    callback(response);
  }

  render() {
    const { publicBlogs, myBlogs, isUserLoggedIn, loading } = this.state;

    return (
      <MuiThemeProvider>
        <div className="App">
          <Route path="/reload" exact component={null} key="reload" />
          <Route
            path="/"
            render={routeProps =>
              <Navbar
                user={isUserLoggedIn}
                logoutUser={this.logoutUser}
                routeProps={routeProps}
              />}
          />

          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route
              exact
              path="/blog"
              render={routeProps =>
                <Blogs
                  blogs={publicBlogs}
                  loading={loading}
                />}
            />
            <Route
              exact
              path="/blog/myblogs"
              render={routeProps =>
                <Blogs
                  blogs={myBlogs}
                  deleteBlog={this.deleteBlog}
                  areMyBlogs={true}
                  isUserLoggedIn={isUserLoggedIn}
                  loading={loading}

                />}
            />
            <Route exact path="/blog/new" render={routeProps => <BlogAdd createBlog={this.createBlog} routeProps={routeProps} />} />
            <Route
              exact
              path="/blog/:id"
              render={routeProps => {
                if (!loading) {
                  const id = routeProps.match.params.id;
                  const allBlog = myBlogs.concat(publicBlogs);
                  const blog = allBlog.find(blog => blog._id === id);
                  console.log(blog);
                  return <Blog key={this.state.publicBlogs} routeProps={routeProps} blog={blog} loading={loading} isUserLoggedIn={isUserLoggedIn} commentBlog={this.commentBlog} publicBlogs={publicBlogs} />
                }
              }
              }
            />
            <Route exact path="/register" render={routeProps => <Register registerUser={this.registerUser} routeProps={routeProps} />} />
            <Route exact path="/login" render={routeProps => <Login loginUser={this.loginUser} routeProps={routeProps} />} />
            <Route render={() => <h1>404!</h1>} />
          </Switch>

          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
