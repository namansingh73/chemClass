import React from 'react';
import styles from './AttachmentItem.module.css';
import attachmentItemImg from './attachmentItem.jpg';

const AttachmentItem = () => {
  return (
    <div className={styles.attachmentItem}>
      <img
        src={attachmentItemImg}
        className={styles.attachmentImg}
        alt='Attachment Thumbnail'
      />
      <div className={styles.description}>
        <span className={styles.filename}>School.jpg</span>
        <span className={styles.fileformat}>Image</span>
      </div>
    </div>
  );
};

export default AttachmentItem;
