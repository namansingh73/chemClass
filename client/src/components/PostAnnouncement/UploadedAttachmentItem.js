import React from 'react';
import styles from './UploadedAttachmentItem.module.css';
import pdfIcon from './pdf_icon.png';
import imgIcon from './triangle_icon.png';

const UploadedAttachmentItem = (props) => {
  return (
    <div className={styles.uploadBox}>
      <img
        src={props.type === 'pdf' ? pdfIcon : imgIcon}
        className={styles.icon}
        alt='file'
      />
      <span className={styles.filename}>{props.filename}</span>

      <button
        onClick={() => props.onRemoveFile(props.name_timestamp)}
        type='button'
        className={styles.closeBtn}
      >
        &#10799;
      </button>
    </div>
  );
};

export default UploadedAttachmentItem;
