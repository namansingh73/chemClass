import React, { Fragment, useState } from 'react';
import styles from './ShowMoreText.module.css';

// Truncate at 1000th chaacter or 15th line whichever comes first
const calcTruncateAt = (text) => {
  let cnt = 0;
  console.log(text);

  for (let i = 0; i < Math.min(text.length, 1000); ++i) {
    if (text[i] === '\n') {
      cnt += 1;
      if (cnt === 15) {
        return i;
      }
    }
  }

  return text.length > 1000 ? 1000 : -1;
};

const ShowMoreText = (props) => {
  const [showWhole, setShowWhole] = useState(false);

  const truncateAt = calcTruncateAt(props.text);

  if (truncateAt === -1) {
    return props.text;
  }

  return (
    <Fragment>
      {showWhole ? props.text : props.text.substring(0, truncateAt)}
      {!showWhole && '...'}
      {showWhole && <br />}
      <button
        class={styles.btn}
        onClick={() => setShowWhole((showWhole) => !showWhole)}
      >
        {showWhole ? 'Show less' : 'Show more'}
      </button>
    </Fragment>
  );
};

export default ShowMoreText;
