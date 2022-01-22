import React from 'react';
import styles from './Attachments.module.css';
import AttachmentItem from './AttachmentItem';

const Attachments = () => {
  return (
    <div className={styles.attachments}>
      <AttachmentItem />
      <AttachmentItem />
      <AttachmentItem />
      <AttachmentItem />
    </div>
  );
};

export default Attachments;
