import React, { useState } from 'react';

import { editorHelpText } from '../DrawEditor.module.scss';

import Button from 'components/_shared/Button';

import VideoPlayer from 'components/_shared/VideoPlayer/VideoPlayer';
import video from 'assets/polygion-tut.webm';

const HelpBlock = ({ resetGeometry }) => {
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <>
      <div className={editorHelpText}>
        <p>
          Use the polygon tool to draw around the data points you want to
          select.
          {/* <button onClick={() => setShowTutorial(true)}>See how</button> */}
        </p>
        <Button secondary isWhite onClick={() => resetGeometry(false)}>
          Cancel
        </Button>
      </div>
      {showTutorial && (
        <VideoPlayer
          closeAction={() => setShowTutorial(false)}
          source={video}
        />
      )}
    </>
  );
};
export default HelpBlock;
