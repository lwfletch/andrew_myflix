import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';



export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }
    


    render() {
        const { movie, onBackClick } = this.props;
// I want to edit this part with a <Container> once I am able to view it
        return (
            <div className='movie-view'>
                <div className='movie-poster'>
                    <img src={movie.ImagePath} />
                </div>
                <div className='movie-title'>
                    <span className='label'>Title: </span>
                    <span className='value'>{movie.Title}</span>
                </div>
                <div className='movie-description'>
                    <span className='label'>Description: </span>
                    <span className='value'>{movie.Description}</span>
                </div>

                <div className='movie-rating'>
                    <span className='label'>Rating: </span>
                    <span className='value'>{movie.Rating}</span>
                </div>
                <div className='movie-actors'>
                    <span className='label'>Actors: </span>
                    <span className='value'>{movie.Actors}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>    
            </div>
        );
    }
}