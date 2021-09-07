import { useState, useEffect } from 'react';

function MainContainer() {

    let [movieinfo, setMovieinfo] = useState(null);
    let [title, setTitle] = useState("asuran");

    useEffect(() => {

        getMovieData();

    }, [])


    function readTitle(value) {
        setTitle(value);
    }

    function getMovieData() {

        let url = `https://omdbapi.com/?t=${title}&apikey=f4056ad2`;

        fetch(url)
            .then((response) => response.json())
            .then((movie) => {
                console.log(movie);
                setMovieinfo(movie);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="main">
            <div className="movie-container">
                <div className="padd">
                    <p style={{textAlign:"center"}} >Everyone loves movies and they are the good source of entertainment and favorite enjoy time. And, you don’t just watch movies but like to read about movies, know about their characters and more, Movie mafia site provide you everything about movies</p>
                    <h2>World wide Movie Information for you!</h2>
                    <div className="input-group">
                        <input type="text" placeholder="Enter the movie name" onChange={(event) => { readTitle(event.target.value) }} className="search-field" />
                        <button className="btn" onClick={getMovieData}>Get Info</button>
                    </div>
                    {
                        movieinfo?.Error === undefined ? (

                            <div className="movie">
                                <div className="poster">
                                    <img src={movieinfo?.Poster} alt="poster" className="img-poster" />
                                </div>
                                <div className="details">
                                    <div className="padd">
                                        <h1>{movieinfo?.Title}</h1>
                                        <p><b>Genre</b> : {movieinfo?.Genre}</p>
                                        <p><b>Directed By</b> :{movieinfo?.Director}</p>
                                        <p><b>Plot</b> :{movieinfo?.Plot}</p>
                                        <p><b>Cast</b> :{movieinfo?.Actors}</p>
                                        <p><b>Box Office</b> :{movieinfo?.BoxOffice}</p>
                                        <p><b>Language</b> :{movieinfo?.Language}</p>
                                        <p><b>Release Date</b> :{movieinfo?.Released}</p>
                                        <p><b>Produced By</b> :{movieinfo?.Production}</p>
                                        <p><b>Runtime</b> :{movieinfo?.Runtime}</p>

                                        <div className="ratings">

                                            {

                                                movieinfo?.Ratings.map((rating, index) => (

                                                    <div key={index}>
                                                        <b>{rating.Source}</b>
                                                        <h3>{rating.Value}</h3>
                                                    </div>

                                                ))

                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>

                        ) :
                            (
                                <h1>Sorry! The Searched Movie Not Found.</h1>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default MainContainer;