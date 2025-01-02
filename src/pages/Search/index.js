import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tmdb from '../../Tmdb';
import Header from '../../components/Header';
import './styles.css';

const Search = ({ onMovieSelect }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [blackHeader, setBlackHeader] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPopularMovies();
      }, []);
    
      const loadPopularMovies = async () => {
        try {
          setLoading(true);
          const response = await Tmdb.getPopularMovies();
          setSearchResults(response[0].items.results || []);
          setError(null);
        } catch (err) {
          console.error(err);
          setError("Failed to load popular movies");
        } finally {
          setLoading(false);
        }
      };

      const handleSearch = async (e) => {
        e.preventDefault();
        
        if (!searchQuery.trim() || loading) return;
    
        try {
          setLoading(true);
          const response = await Tmdb.getSearch(searchQuery);
          setSearchResults(response.results || []);
          setError(null);
        } catch (err) {
          console.error(err);
          setError("Failed to search movies");
        } finally {
          setLoading(false);
        }
      };
    
      const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
      };
    
      const handleMovieClick = (movie) => {
        if (onMovieSelect) {
          onMovieSelect(movie);
        }
      };

    useEffect(() => {
      const scrollListener = () => {
        if(window.scrollY > 10) {
          setBlackHeader(true);
        }
        else {
          setBlackHeader(false);
        }
      }
    
      window.addEventListener('scroll', scrollListener);
    
      return () => {
        window.removeEventListener('scroll', scrollListener);
      }
    
    }, []);

    return (
        <div className="page">
            <Header black={blackHeader}/>
            {/* Search input */}
            <section className="search-container">
                <div className="search-wrap">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            className=""
                            placeholder="Search for Movie or TV Show"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            required
                        />
                        <button type="submit" className="search-button">
                            <svg width="22"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 items-center text-white mt-auto mb-auto pr-4 cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="#fff"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </form>
                </div>
                {/* Display results */}
                <div className="search-lists">

                {error && (
                    <div className="text-red-500 mb-4">{error}</div>
                )}

                {loading ? (
                    <div className="">
                    </div>
                ) : (
                    <div className="movies-grid">
                        {searchResults.map((item) => (
                            <Link 
                            to={`/details/${item.media_type || 'movie'}/${item.id}`}
                            className=""
                            >
                                <div 
                                key={item.id} 
                                className="similar-movie movieRow--item"
                                onClick={() => handleMovieClick(item)}
                                >
                                    {item.poster_path || item.profile_path ? (
                                        <img
                                        src={`https://image.tmdb.org/t/p/w300${item.poster_path || item.profile_path}`}
                                        alt={item.title || item.name}
                                        />
                                    ) : (
                                        <div className="">
                                        No Image
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                </div>
            </section>
        </div> 
    );
}

export default Search;
