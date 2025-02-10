import { useState } from 'react';
import moviesFromServer from './api/movies.json';
import './App.scss';
import { MoviesList } from './components/MoviesList';

export const App = () => {
  const [query, setQuery] = useState('');
  const [visibleMovies, setVisibleMovies] = useState([...moviesFromServer]);

  const searchMovies = data => {
    setQuery(data);

    if (data !== '') {
      return setVisibleMovies(
        [...moviesFromServer].filter(
          movie =>
            movie.title
              .toLowerCase()
              .trim()
              .includes(query.toLowerCase().trim()) ||
            movie.description
              .toLowerCase()
              .trim()
              .includes(query.toLowerCase().trim()),
        ),
      );
    }

    return setVisibleMovies([...moviesFromServer]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                type="text"
                id="search-query"
                className="input"
                value={query}
                placeholder="Type search word"
                onChange={e => searchMovies(e.currentTarget.value)}
              />
            </div>
          </div>
        </div>

        <MoviesList movies={visibleMovies} />
      </div>

      <div className="sidebar">Sidebar goes here</div>
    </div>
  );
};
