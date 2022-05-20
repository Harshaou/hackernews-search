import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import { FcSearch } from 'react-icons/fc';
import useDebounce from './useDebounce';
import axios from 'axios';

const HomeComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [state, setState] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Custom Hook
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // API search function
  const searchCharacters = async () => {
    try {
      let res = await axios.get(`https://hn.algolia.com/api/v1/search?query=${searchTerm}`);
      return res.data.hits;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchCharacters(debouncedSearchTerm).then((state) => {
          setIsSearching(false);
          setState(state);
        });
      } else {
        setState([]);
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm], // Only call effect if debounced search term changes
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Hacker News Search</h2>
      {isSearching && <div>Searching ...</div>}
      <div className={styles.inputDiv}>
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search articles"
          type="text"
          autoFocus
        />
      </div>
      <div>
        <div className={styles.articleDiv}>
          {state?.length > 0 ? (
            state.map(
              (item, index) =>
                item.title && (
                  <p key={index} className={styles.articleItem}>
                    <Link to={item.objectID}>{item.title}</Link>
                  </p>
                ),
            )
          ) : (
            <div className={styles.noResult}>
              <FcSearch size={50} />
              <h3>Type keywords to trigger a search</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
