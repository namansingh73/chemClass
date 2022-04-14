import React, { Fragment, useState } from 'react';
import Linkify from 'linkify-react';
import styles from './ShowMoreTextAndLinkify.module.css';

// Truncate at 1000th chaacter or 15th line whichever comes first
const calcTruncateAt = (text) => {
  let cnt = 0;

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

const ShowMoreTextAndLinkify = (props) => {
  const [showWhole, setShowWhole] = useState(false);

  const truncateAt = calcTruncateAt(props.text);

  if (truncateAt === -1) {
    return <Linkify options={{ target: '_blank' }}>{props.text}</Linkify>;
  }

  return (
    <Fragment>
      <Linkify options={{ target: '_blank' }}>
        {showWhole ? props.text : props.text.substring(0, truncateAt)}
      </Linkify>
      {!showWhole && '...'}
      {showWhole && <br />}
      <button
        className={styles.btn}
        onClick={() => setShowWhole((showWhole) => !showWhole)}
      >
        {showWhole ? 'Show less' : 'Show more'}
      </button>
    </Fragment>
  );
};

export default ShowMoreTextAndLinkify;
