import React from 'react';
import styles from './AttachmentItem.module.css';

const AttachmentItem = (props) => {
  return (
    <a
      className={styles.attachmentItem}
      href={props.attachment.url}
      target='_blank'
    >
      <img
        src={props.attachment.url.replace(
          '/upload',
          '/upload/w_600,h_400,c_pad,q_95,f_jpg'
        )}
        className={styles.attachmentImg}
        alt='Attachment Thumbnail'
      />
      <div className={styles.description}>
        <span className={styles.filename}>
          {props.attachment.originalName.length > 15
            ? props.attachment.originalName.substring(0, 12) + '...'
            : props.attachment.originalName}
        </span>
        <span className={styles.fileformat}>
          {props.attachment.originalName.endsWith('pdf') ? 'Pdf' : 'Image'}
        </span>
      </div>
    </a>
  );
};

export default AttachmentItem;
