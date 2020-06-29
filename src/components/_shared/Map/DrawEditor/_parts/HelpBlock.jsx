import React from 'react';

import { editorHelpText } from '../DrawEditor.module.scss';

import Button from 'components/_shared/Button';

const HelpBlock = ({ setRenderTools }) => (
  <div className={editorHelpText}>
    <p>
      Use the polygon tool to draw around the data points you want to select.
    </p>
    <Button secondary isWhite onClick={() => setRenderTools(false)}>
      Cancel
    </Button>
  </div>
);

export default HelpBlock;
