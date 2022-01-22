import React, { useState } from 'react';
import axios from 'axios';
import Input from '../../utils/Input/Input';
import Button from '../../utils/Button/Button';
import styles from './LoginSignup.module.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (event) => {
    setLoading(true);

    const data = { name, email, password, passwordConfirm };
    event.preventDefault();
    const user = await axios.post('/api/v1/users/signup', data);
    console.log(user.data);

    setLoading(false);
  };

  return (
    <form onSubmit={submitHandler}>
      <Input
        label='Name*'
        id='name'
        type='text'
        placeholder='Name'
        name='Name'
        required
        onChange={(event) => setName(event.target.value)}
        value={name}
      />

      <Input
        label='Email*'
        id='email'
        type='email'
        placeholder='mail@website.com'
        name='email'
        required
        onChange={(event) => setEmail(event.target.value)}
        value={email}
      />
      <Input
        label='Password*'
        id='password'
        type='password'
        placeholder='Min 8 characters'
        name='password'
        minLength='8'
        required
        onChange={(event) => setPassword(event.target.value)}
        value={password}
      />
      <Input
        label='Password Confirm*'
        id='passwordConfirm'
        type='password'
        placeholder='Min 8 characters'
        name='passwordConfirm'
        minLength='8'
        required
        onChange={(event) => setPasswordConfirm(event.target.value)}
        value={passwordConfirm}
      />

      <label htmlFor='tnc' className={styles.checkboxLabel}>
        <input
          type='checkbox'
          id='tnc'
          name='tnc'
          required
          className={styles.checkboxInput}
        />
        <span className={styles.checkboxActual}>&#10003;</span>I agree to
        the&nbsp;
        <a
          href='https://youtu.be/dQw4w9WgXcQ'
          rel='noreferrer'
          target='_blank'
          className={styles.termsConditionsLink}
        >
          Terms & Conditions
        </a>
      </label>

      <div className={styles.classLinkBottom}>
        <Button
          className={styles.classLinkBtn}
          rounded
          fullWidth
          disabled={loading}
          loading={loading}
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default Signup;
