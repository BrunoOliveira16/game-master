import { BsSearch } from 'react-icons/bs';

// Styles
import './search.scss';

const Search = ({ onSearch }) => {
    const handleSearchChange = (event) => {
        onSearch(event.target.value);
    }

    return (
        <div className='wrapper'>
            <input 
                type='text' 
                onChange={ handleSearchChange } 
                className='btn-search'
            />
            <BsSearch />
        </div>
    );
};

export default Search;