import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

// #0
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
// 6/16 import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Menubar } from '../navbar/navbar';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { Col, Row } from 'react-bootstrap';
import { ProfileView } from '../profile-view/profile-view'

class MainView extends React.Component {

  constructor(){
      super();
      //initial state set to null
      this.state = {
          user: null
      };
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !==  null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

    //when a movie is clicked, this function updates the state of the selected movie property to that movie
  setSelectedMovie(movie) {
    this.setState({
        selectedMovie: movie
    });
  }

  //https://dashboard.heroku.com/apps/berry-node-api
  getMovies(token) {
    axios.get('https://berry-node-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      // Assign the result to the state

      // 6/16 this.setState({
      //   movies: response.data
      // });
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

    



    //when a user successfully logs in, this function updates the user property in state to that specific user
    onLoggedIn(authData) {
      console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    //function to log out 
    onLoggedOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.setState({
        user: null
      });
    }

    render() {
        // 6/16 const { movies, user } = this.state;

        let { movies } = this.props;
        let { user } = this.state;

        //if no user, the login view will render, if logged in, user details are passed as a prop to the LoginView
        // if (!user) return 
        // <Row>
        //   <Col>
        //   <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        //   </Col>
        // </Row>

        //before movies have been loaded
        // if (movies.length === 0) return <div className="main-view"></div>;

        return (
          <Router>
            <Row className="main-view justify-content-md-center">
              <Route exact path="/" render={() => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                if (movies.length === 0) return <div className="main-view"></div>
                return <MoviesList movies={movies}/>;
              }} />
              <Route path="/register" render={() => {
                if (user) return <Redirect to="/" />
                return <Col>
                  <RegistrationView />
                </Col>
              }} />
              <Route path="/movies/:movieId" render={({ match, history }) => {
                if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                  <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                </Col>
                
              }} />
              <Route path="/directors/:name" render={({ match, history }) => {
                if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name ).Director} onBackClick={() => history.goBack()}/>
                </Col>
              }} />
              <Route path="/genres/:name" render={({ match, history }) => {
                if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                  <GenreView Genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                </Col>
              }} />
              <Route path={`users/${user}`} render={({history}) => {
                if (!user) return <Redirect to="/" />
                return <Col>
                <ProfileView user={user} onBackClick={() => history.goBack()}/>
                </Col>
              }} />
              {/* <button onClick={() => { this.onLoggedOut() }}>Logout</button> */}
            </Row>
          </Router>
        );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);
// 6/16 export default MainView;
