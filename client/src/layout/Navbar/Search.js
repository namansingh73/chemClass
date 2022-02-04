import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classroomActions from '../../store/classroom/classroom-actions';
import styles from './Search.module.css';

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchParameter } = useSelector(({ classroom }) => classroom);

  const submitHandler = (e) => {
    e.preventDefault();
    if (e.target.value !== '') {
      navigate('/classrooms');
    }
  };

  return (
    <form className={styles.searchForm} onSubmit={submitHandler}>
      <span className={styles.searchIcon}>
        <i className='fas fa-search'></i>
      </span>
      <input
        type='text'
        placeholder='Search'
        className={styles.searchInput}
        value={searchParameter}
        onChange={(e) =>
          dispatch(classroomActions.updateSearchParamter(e.target.value))
        }
      />
    </form>
  );
};

export default Search;
