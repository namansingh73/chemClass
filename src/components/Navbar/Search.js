import React from 'react';
import styles from './Search.module.css';

const Search = () => {
  return (
    <form className={styles.searchForm}>
      <input type='text' placeholder='Search' className={styles.inputForm} />
    </form>
  );
};

export default Search;
