import React, { useState }  from 'react';

// Components
import MainContent from './components/MainContent/MainContent';
import Header from './components/Header/Header';

function App() {
  const [search, setSearch] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleSearchChange = (search) => {
    setSearch(search);
  }

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  }

  const handleDataChange = (data) => {
    setGenres([...new Set(data?.map(item => item.genre))]);
  }

  return (
    <div>
      <Header onSearch={handleSearchChange}/>
      <MainContent 
        search={search} 
        genres={genres}
        selectedGenre={selectedGenre} 
        onGenreClick={handleGenreClick} 
        onDataChange={handleDataChange}
      />
    </div>
  );
};

export default App;
