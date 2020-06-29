import React from 'react';
import PropTypes from 'prop-types';

import { videoPlayer } from './VideoPlayer.module.scss';

import classNames from 'classnames';
import Modal from 'components/_global/Modal';

const VideoPlayer = ({ source, closeAction, autoPlay = true }) => {
  const classes = classNames({
    [`${videoPlayer}`]: true,
  });

  return (
    <Modal closeAction={closeAction}>
      <video
        autoPlay={autoPlay}
        controls
        loop
        className={classes}
        src={source}
      />
    </Modal>
  );
};

VideoPlayer.propTypes = {
  source: PropTypes.string,
  autoPlay: PropTypes.bool,
};

export default VideoPlayer;
