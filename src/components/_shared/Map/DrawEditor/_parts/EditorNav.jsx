import React from 'react';

import { editorNav, editorNavInner } from '../DrawEditor.module.scss';

import Button from 'components/_shared/Button';

const EditorNav = ({ setRenderTools }) => (
  <div className={editorNav}>
    <div className={editorNavInner}>
      <Button tertiary onClick={() => setRenderTools(true)}>
        Select Multiple Points
      </Button>
    </div>
  </div>
);

export default EditorNav;
