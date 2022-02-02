import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import alertActions from '../../store/alert/alert-actions';
import subjectActions from '../../store/subject/subject-actions';
import uploadIcon from './upload_icon.png';
import PopupCard from '../../layout/PopupCard/PopupCard';
import Button from '../../utils/Button/Button';
import UploadAttachmentItem from '../../utils/UploadAttachmentItem/UploadAttachmentItem';
import styles from './SubmitAssignment.module.css';

const SubmitAssignment = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!attachment) {
      dispatch(
        alertActions.alert({
          alertType: 'Error',
          info: 'Attachment cannot be empty!',
        })
      );
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append('attachment', attachment);
      const res = await axios.post(
        `/api/v1/classrooms/posts/${props.post._id}/assignmentSubmission`,
        data
      );

      const post = res.data.post;
      dispatch(subjectActions.updatePost(post));
      dispatch(
        alertActions.alert({
          alertType: 'Success',
          info: 'Assignment submitted successfully!',
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
    }

    setLoading(false);
  };

  return (
    <PopupCard onClose={props.onClose}>
      <form className={styles.form} onSubmit={submitHandler}>
        <h2 className={styles.heading}>
          {props.post.assignmentDetails.submission
            ? 'Update your submission!'
            : 'Create new submission!'}
        </h2>
        <p>
          {props.post.assignmentDetails.submission ? (
            <a
              href={props.post.assignmentDetails.submission.attachment.url}
              target='_blank'
              rel='noreferrer'
              className={styles.previousSubmission}
            >
              <i className='fas fa-check'></i> View previous submission
            </a>
          ) : (
            'Submit your assignment'
          )}
        </p>

        <div className={styles.uploadsContainer}>
          {attachment && (
            <UploadAttachmentItem
              type={attachment.name.endsWith('pdf') ? 'pdf' : 'image'}
              filename={attachment.name}
              onRemoveFile={() => setAttachment(null)}
              name_timestamp={`${attachment.name}${attachment.timestamp}`}
            />
          )}
        </div>

        <label className={styles.attachmentLabel} htmlFor='attachment'>
          <img
            src={uploadIcon}
            className={styles.attachmentImage}
            alt='Upload'
          />
          <input
            onChange={(e) => setAttachment(e.target.files[0])}
            className={styles.attachmentInput}
            type='file'
            id='attachment'
            name='name'
            accept='application/pdf,image/*'
          />
        </label>

        <Button color='blue' rounded disabled={loading} loading={loading}>
          <i className='fab fa-telegram-plane'></i> Submit
        </Button>
      </form>
    </PopupCard>
  );
};

export default SubmitAssignment;
