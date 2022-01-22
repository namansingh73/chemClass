import React from 'react';
import styles from './Search.module.css';

const Search = () => {
  return (
    <form className={styles.searchForm}>
      <span className={styles.searchIcon}>
        <i className='fas fa-search'></i>
      </span>
      <input type='text' placeholder='Search' className={styles.searchInput} />
    </form>
  );
};

export default Search;
