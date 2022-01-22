import React, { useState } from 'react';
import styles from './ProfilePhoto.module.css';
import avatar from './avatar.png';

const ProfilePhoto = () => {
  const [imgSrc, setImgSrc] = useState(avatar);

  const changeHandler = (event) => {
    console.log('log');
    if (event.target.files && event.target.files[0]) {
      setImgSrc(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className={styles.container}>
      <img src={imgSrc} className={styles.avatar} alt='Profile' />
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
