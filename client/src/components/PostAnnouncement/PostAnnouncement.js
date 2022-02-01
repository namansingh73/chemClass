import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import alertActions from '../../store/alert/alert-actions';
import subjectActions from '../../store/subject/subject-actions';
import UploadedAttachmentItem from './UploadedAttachmentItem';
import PopupCard from '../../layout/PopupCard/PopupCard';
import Button from '../../utils/Button/Button';
import styles from './PostAnnouncement.module.css';
import uploadIcon from './upload_icon.png';

const PostAnnouncement = (props) => {
  const dispatch = useDispatch();
  const subject = useSelector(({ subject }) => subject);

  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);

  const textareaChangeHandler = (e) => {
    e.target.style.height = 0;
    e.target.style.height = e.target.scrollHeight + 'px';
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

      const res = await axios.post(
        `/api/v1/classrooms/${subject._id}/posts?postType=announcement`,
        data
      );

      const post = res.data.post;

      dispatch(subjectActions.newPost(post));

      dispatch(
        alertActions.alert({
          alertType: 'Success',
          info: 'Announcement posted successfully!',
        })
      );
      props.onClose();
    } catch (err) {
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
      <form className={styles.emailForm} onSubmit={submitHandler}>
        <h2 className={styles.heading}>Create Announcement</h2>
        <p>Announce something to your class!</p>
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

        <div className={styles.uploadsContainer}>
          {attachments.map((attachment) => (
            <UploadedAttachmentItem
              key={`${attachment.name}${attachment.timestamp}`}
              type={attachment.name.endsWith('pdf') ? 'pdf' : 'image'}
              filename={attachment.name.replace(' ', '_')}
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

export default PostAnnouncement;
