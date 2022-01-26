import React from 'react';
import styles from './ProfilePhoto.module.css';

const ProfilePhoto = (props) => {
  const changeHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      props.onChange(event.target.files[0]);
    }
  };

  return (
    <div className={styles.container}>
      <img src={props.imgSrc} className={styles.avatar} alt='Profile' />
      <input
        className={styles.input}
        type='file'
        accept='image/*'
        id='photo'
        name='photo'
        onChange={changeHandler}
      />
      <label htmlFor='photo' className={styles.label}>
        Choose new photo
      </label>
    </div>
  );
};

export default ProfilePhoto;
