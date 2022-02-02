import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import alertActions from '../../store/alert/alert-actions';
import uploadIcon from './upload_icon.png';
import PopupCard from '../../layout/PopupCard/PopupCard';
import Button from '../../utils/Button/Button';
import UploadAttachmentItem from '../../utils/UploadAttachmentItem/UploadAttachmentItem';
import styles from './SubmitAssignment.module.css';

const SubmitAssignment = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState(null);

  //   const submitHandler = async (event) => {
  //     event.preventDefault();

  //     setLoading(true);

  //     try {
  //       const data = { email };
  //       await axios.post('/api/v1/users/forgotPassword', data);
  //       dispatch(
  //         alertActions.alert({
  //           alertType: 'Success',
  //           info: 'Password reset mail sent successfully!',
  //         })
  //       );
  //       props.onClose();
  //     } catch (err) {
  //       if (err.response) {
  //         dispatch(
  //           alertActions.alert({
  //             alertType: 'Error',
  //             info: err.response.data.message,
  //           })
  //         );
  //       } else {
  //         dispatch(
  //           alertActions.alert({
  //             alertType: 'Error',
  //             info: 'Something went wrong!',
  //           })
  //         );
  //       }
  //     }

  //     setLoading(false);
  //   };

  return (
    <PopupCard onClose={props.onClose}>
      <form className={styles.form}>
        <h2 className={styles.heading}>Create a submission!</h2>
        <p>View previous submission</p>

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
