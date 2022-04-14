import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import alertActions from '../../store/alert/alert-actions';
import subjectActions from '../../store/subject/subject-actions';
import UploadAttachmentItem from '../../utils/UploadAttachmentItem/UploadAttachmentItem';
import PopupCard from '../../layout/PopupCard/PopupCard';
import Button from '../../utils/Button/Button';
import Input from '../../utils/Input/Input';
import styles from './PostAPost.module.css';
import uploadIcon from './upload_icon.png';

// type -> announcement(default), assignment
const PostAPost = (props) => {
  const dispatch = useDispatch();
  const subject = useSelector(({ subject }) => subject);

  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [dateTime, setDateTime] = useState('');
  const [loading, setLoading] = useState(false);
  const textareaChangeHandler = (e) => {
    e.target.style.height = 0;
    e.target.style.height = e.target.scrollHeight + 5 + 'px';
    setText(e.target.value);
  };

  const fileChangeHandler = (e) => {
    const selectedFiles = [...e.target.files];

    selectedFiles.forEach((el) => {
      el.timestamp = Date.now();
    });

    setAttachments((attachments) => [...attachments, ...selectedFiles]);
  };

  const removeFileHandler = (name_timestamp) => {
    setAttachments((attachments) =>
      attachments.filter(
        (attachment) =>
          `${attachment.name}${attachment.timestamp}` !== name_timestamp
      )
    );
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const data = new FormData();
      data.append('text', text);

      attachments.forEach((attachment) => {
        data.append('attachments', attachment);
      });

      if (props.postType === 'assignment') {
        data.append('due', new Date(dateTime).toISOString());
      }

      const res = await axios.post(
        `/api/v1/classrooms/${subject._id}/posts?postType=${props.postType}`,
        data
      );

      const post = res.data.post;

      dispatch(subjectActions.newPost(post));

      dispatch(
        alertActions.alert({
          alertType: 'Success',
          info: `${
            props.postType === 'assignment' ? 'Assignment' : 'Announcement'
          } posted successfully!`,
        })
      );
      props.onClose();
    } catch (err) {
      console.log(err);
      if (err.response) {
        dispatch(
          alertActions.alert({
            alertType: 'Error',
            info: err.response.data.message,
          })
        );
      } else {
        dispatch(
          alertActions.alert({
            alertType: 'Error',
            info: 'Something went wrong!',
          })
        );
      }
      setLoading(false);
    }
  };

  return (
    <PopupCard onClose={props.onClose}>
      <form className={styles.form} onSubmit={submitHandler}>
        <h2 className={styles.heading}>
          Create{' '}
          {props.postType === 'assignment' ? 'Assignment' : 'Announcement'}
        </h2>
        <p>
          {props.postType === 'assignment'
            ? 'Post assignment'
            : 'Announce something'}{' '}
          to your class!
        </p>
        <textarea
          className={styles.textarea}
          id='text'
          placeholder='announcement...'
          required
          value={text}
          rows={1}
          onChange={textareaChangeHandler}
          onKeyUp={textareaChangeHandler}
        />

        {props.postType === 'assignment' && (
          <Input
            type='datetime-local'
            required
            onChange={(e) => setDateTime(e.target.value)}
            min={(() => {
              const now = new Date();
              now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
              return now.toISOString().slice(0, -8);
            })()}
            className={styles.inputDate}
          />
        )}

        <div className={styles.uploadsContainer}>
          {attachments.map((attachment) => (
            <UploadAttachmentItem
              key={`${attachment.name}${attachment.timestamp}`}
              type={attachment.name.endsWith('pdf') ? 'pdf' : 'image'}
              filename={attachment.name}
              onRemoveFile={removeFileHandler}
              name_timestamp={`${attachment.name}${attachment.timestamp}`}
            />
          ))}
        </div>

        <label className={styles.attachmentLabel} htmlFor='attachment'>
          <img
            src={uploadIcon}
            className={styles.attachmentImage}
            alt='Upload'
          />
          <input
            onChange={fileChangeHandler}
            className={styles.attachmentInput}
            type='file'
            id='attachment'
            name='name'
            multiple='multiple'
            accept='application/pdf,image/*'
          />
        </label>
        <Button color='blue' rounded disabled={loading} loading={loading}>
          <i className='fab fa-telegram-plane'></i> Send
        </Button>
      </form>
    </PopupCard>
  );
};

export default PostAPost;
