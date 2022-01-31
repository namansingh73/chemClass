import React from 'react';
import styles from './Attachments.module.css';
import AttachmentItem from './AttachmentItem';

const Attachments = (props) => {
  return (
    <div className={styles.attachments}>
      {props.post.attachments.map((attachment) => (
        <AttachmentItem key={attachment.public_id} attachment={attachment} />
      ))}
    </div>
  );
};

export default Attachments;
