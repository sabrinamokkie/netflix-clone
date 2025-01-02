import React from 'react';
import './styles.css';

function Header( { black } ) {
  return (
    <header className={black ? 'black' : ''}>
        <div className="header--logo">
          <a href="/">
            <img alt="Netflix" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png" />
          </a>  
          <div>
            Clone
          </div>
        </div>
        <div className="header--user">
        <a href="/search">
              <svg width="27"
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
          </a>
          <a href="/">
            <img alt="Usuário" src="https://learning.royalbcmuseum.bc.ca/wp-content/uploads/2014/07/netflix-face.jpg" />
          </a>
        </div>
    </header>
  );
}

export default Header;
