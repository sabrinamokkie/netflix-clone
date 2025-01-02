import React, { useEffect, useState } from 'react';
import Tmdb from '../../Tmdb';
import { useParams } from 'react-router';
import TheatersIcon from '@material-ui/icons/Theaters';
import LanguageIcon from '@material-ui/icons/Language';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import iconAmazon from '../../assets/icon-amazon.png';
import iconNetflix from '../../assets/icon-netflix.png';
import './styles.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';

function Details(){
    const { id, type } = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    const [trailerVideo, setTrailerVideo] = useState([]);
    const [urlVideo, setUrlVideo] = useState();
    const [videoFullScreen, setVideoFullScreen] = useState(false);
    const [descriptionVideo, setDescriptionVideo] = useState();
    const [castDetails, setCastDetails] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [scrollX, setScrollX] = useState(-400);

    useEffect(() => {
        const loadAll = async () => {
            let movie = await Tmdb.getMovieInfo(id, type);
            let trailer = await Tmdb.getTrailerVideo(id, type);
            let similar = await Tmdb.getSimilar(id, type);
            setSimilarMovies(similar.results);
            setMovieDetails(movie);
            let castData = await Tmdb.getMovieCasts(id, type); // Fetch cast data
            setCastDetails(castData.cast || []);
            setTrailerVideo(trailer);
            setDescriptionVideo(movie.overview);
            console.log(movie);
            //console.log(similar);
        }
        loadAll();
    }, [id, type])
    
    function handleShowTrailer(){
        const trailer = trailerVideo.results;
        if(trailer !== undefined && trailer.length > 0){
            const url = `https://youtube.com/embed/${trailer[0].key}?autoplay=1&controls=0&showinfo=0&autohide=1`;
            setUrlVideo(url);
        }
    }

    function handleVideoFullScreen(){
        setVideoFullScreen(!videoFullScreen);
    }
    
    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if(x > 0){
            x = 0;  
        }
        setScrollX(x);
      }
    
      const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = similarMovies.length * 200;
        if((window.innerWidth - listW) > x){
            x = (window.innerWidth - listW) - 80;  
        }
        setScrollX(x);
      }
    
    return (
        <main className="details">
        <div 
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`
            }}
        >   
        <Link to="/" className="details--backbutton">Back</Link>
            <section> 
                <div>
                    <div className="details--info">
                        <h3 className={movieDetails.vote_average > 5 ? 'positive' : 'negative'}>{movieDetails.vote_average * 10 + '%'}</h3>
                    </div>

                    <h4><span>{movieDetails.release_date?.substring(0, 4)}</span></h4>
                    <h1>{movieDetails.original_title || movieDetails.original_name}</h1>

                    <h4>{descriptionVideo}</h4>
                    <h4> <span>Runtime:</span> {movieDetails.runtime} min.</h4>
                    <h4> <span>Genres:</span> {movieDetails.genres?.map(genre => genre.name).join(', ')}</h4>
                    <h4> <span>Casts:</span> {castDetails.map(cast => cast.name).join(', ')}</h4>

                    {
                        (trailerVideo.results !== undefined && trailerVideo.results.length !== 0)
                        &&
                        <a onClick={() => handleShowTrailer()} className="details--viewtrailer"><div><TheatersIcon />Watch trailer</div></a>
                    }
                     {
                        (movieDetails.homepage !== undefined && movieDetails.homepage !== '') && 
                            <a href={movieDetails.homepage} target="_blank" rel="noopener noreferrer" className="details--officialsite">
                                <div>
                                    {
                                        movieDetails.homepage.includes('netflix') ?
                                        <img alt="Netflix" src={iconNetflix} width="23"/> :
                                        movieDetails.homepage.includes('amazon') ?
                                        <img alt="Amazon" src={iconAmazon} width="23"/> :
                                        <LanguageIcon />
                                    }
                                
                                </div>
                            </a>
                     }
                </div>
            </section>
            {
                urlVideo !== undefined
                &&
                <aside className={videoFullScreen ? 'video--fullscreen' : ''}>
                    <div>
                        <button onClick={() => handleVideoFullScreen()}><AspectRatioIcon /></button>
                    </div>
                    <iframe frameBorder="0" height="100%" width="100%" title="1"
                        src={urlVideo}>
                    </iframe>
                </aside>
            }
        </div>
        <div className='similar movieRow'>
            <h2>More Like This</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}}/>
                </div>

                <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}}/>
            </div>
            <div className="movieRow--listarea">
                <div className='movieRow--list'style={{
                    marginLeft: scrollX,
                    width: similarMovies.length * 200
                }}>
                    {similarMovies.length > 0 && similarMovies.map((movie, key) => (
                        <div key={key} className="similar-movie movieRow--item">
                            {/* Adjust these properties based on your API response structure */}
                            <Link to={`/details/${type}/${movie.id}`}>
                                <img alt={movie.original_title} src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </main>
    )
}

export default Details;