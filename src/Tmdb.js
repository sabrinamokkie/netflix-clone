const API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE = 'https://api.themoviedb.org/3';

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'top-rated',
                title: 'Top Rated',
                type: 'movie',
                items: await basicFetch(`/movie/top_rated?api_key=${API_KEY}&language=en-US`)
            },
            {
                slug: 'originals',
                title: 'Netflix Originals',
                type: 'tv',
                items: await basicFetch(`/discover/tv?api_key=${API_KEY}&with_networks=213&sort_by=popularity.desc&language=en-US`)
            },
            {
                slug: 'action',
                title: 'Action',
                type: 'movie',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=28`)
            },
            {
                slug: 'comedy',
                title: 'Comedy',
                type: 'movie',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=35`)
            },
            {
                slug: 'horror',
                title: 'Horror',
                type: 'movie',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=27`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                type: 'movie',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=10749`)
            },
            {
                slug: 'adventure',
                title: 'Adventure',
                type: 'movie',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=12`)
            },
            {
                slug: 'science-fiction',
                title: 'Sci-Fi',
                type: 'movie',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=878`)
            },
            {
                slug: 'war',
                title: 'War',
                type: 'movie',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=10752`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                type: 'movie',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=10749`)
            },
            {
                slug: 'documentary',
                title: 'Documentary',
                type: 'movie',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=99`)
            },
            {
                slug: 'trending',
                title: 'Trending',
                type: 'movie',
                items: await basicFetch(`/trending/all/week?api_key=${API_KEY}&sort_by=popularity.desc&language=en-US`)
            }, 
            {
                slug: 'trending-series',
                title: 'Trending Series',
                type: 'tv',
                items: await basicFetch(`/trending/tv/week?api_key=${API_KEY}&sort_by=popularity.desc&language=en-US`)
            }, 
            {
                slug: 'upcoming-movies',
                title: 'Upcoming Movies',
                type: 'movie',
                items: await basicFetch(`/movie/upcoming?api_key=${API_KEY}&language=en-US`)
            }, 
        ]
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if(movieId){
            switch(type){
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=en-US&api_key=${API_KEY}`);
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=en-US&api_key=${API_KEY}`);
                break;
                default: 
                    info = null;
                break;
            }
        }
        return info;
    },
    getMovieCasts: async (movieId, type) => {
        let cast = {};
    
        if (movieId) {
            switch (type) {
                case 'movie':
                    cast = await basicFetch(`/movie/${movieId}/credits?language=en-US&api_key=${API_KEY}`);
                    break;
                case 'tv':
                    cast = await basicFetch(`/tv/${movieId}/credits?language=en-US&api_key=${API_KEY}`);
                    break;
                default:
                    cast = null;
                    break;
            }
        }
        return cast;
    },
    getTrailerVideo: async (movieId, type) => {
        let trailer = {};

        if(movieId){
            switch(type){
                case 'movie':
                    trailer = await basicFetch(`/movie/${movieId}/videos?language=en-US&api_key=${API_KEY}`);
                break;
                case 'tv':
                    trailer = await basicFetch(`/tv/${movieId}/videos?language=en-US&api_key=${API_KEY}`);
                break;
                default: 
                    trailer = null;
                break;
            }
        }
        return trailer;
    },
    getSimilar: async (movieId, type) => {
        let similarItems = {};

        if(movieId){
            switch(type){
                case 'movie':
                    similarItems = await basicFetch(`/movie/${movieId}/similar?language=en-US&api_key=${API_KEY}`);
                break;
                case 'tv':
                    similarItems = await basicFetch(`/tv/${movieId}/similar?language=en-US&api_key=${API_KEY}`);
                break;
                default:
                    similarItems = null;
                break;
            }
        }
        return similarItems;
    },
    getSearch: async (query) => {
        let searchResults = {};
    
        if (query) {
            searchResults = await basicFetch(`/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&api_key=${API_KEY}`);
        }
    
        return searchResults;
    },
    getPopularMovies: async () => {
        return [
            {
                type: 'movie',
                items: await basicFetch(`/movie/popular?api_key=${API_KEY}&language=en-US`)
            },
        ]  
    }
}