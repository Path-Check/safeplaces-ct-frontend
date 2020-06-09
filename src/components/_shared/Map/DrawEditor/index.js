import React, { useState, useEffect, useRef } from 'react';

import {
  Editor,
  DrawPolygonMode,
  DrawRectangleMode,
  DrawCircleFromCenterMode,
  EditingMode,
} from 'react-map-gl-draw';

import {
  editorNav,
  editorNavOption,
  editorNavOptionActive,
  editorNavInner,
  editorNavControls,
} from './DrawEditor.module.scss';

import {
  faDrawPolygon,
  faDrawCircle,
  faDrawSquare,
} from '@fortawesome/pro-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Toggle from 'components/_shared/ToggleControl';

import inside from '@turf/inside';
import pointsSelectors from 'ducks/points/selectors';
import { useSelector } from 'react-redux';
import { toPoint } from 'components/_shared/Map/_helpers';

const DrawEditor = () => {
  const editorRef = useRef();
  const [renderTools, setRenderTools] = useState(false);
  const [mode, setMode] = useState(null);
  const [geometry, setGeometry] = useState(null);
  const points = useSelector(state => pointsSelectors.getPoints(state));

  const handleUpdate = ({ data }) => {
    console.log(data);
    if (!data || data.length < 1) {
      return;
    }

    setGeometry(data[0]?.geometry);
  };

  const handleSelect = map => {};

  useEffect(() => {
    if (!renderTools) {
      editorRef.current.deleteFeatures(0);
      handleModeSelection('');
    } else {
      handleModeSelection('rectangle');
    }
  }, [renderTools]);

  const handleModeSelection = type => {
    switch (type) {
      case 'circle':
        setMode(new DrawCircleFromCenterMode());
        break;
      case 'rectangle':
        setMode(new DrawRectangleMode());
        break;
      case 'polygon':
        setMode(new DrawPolygonMode());
        break;
      default:
        setMode('');
        break;
    }
  };

  useEffect(() => {
    console.log(editorRef);

    if (editorRef && mode && geometry) {
      editorRef.current.deleteFeatures(0);
    }
  }, [mode, geometry]);

  useEffect(() => {
    if (geometry) {
      handleModeSelection('');
    }
  }, [geometry]);

  const onApply = () => {
    const filterdPoints = points.filter(p => inside(toPoint(p), geometry));

    console.log(filterdPoints);

    if (filterdPoints) {
      // update points
    } else {
      console.log('no points present in this geography');
    }
  };

  return (
    <>
      <Editor
        ref={editorRef}
        style={{ width: '100%', height: '100%' }}
        clickRadius={12}
        onSelect={map => handleSelect(map)}
        onUpdate={map => handleUpdate(map)}
        mode={mode}
      />
      <div className={editorNav}>
        {renderTools && (
          <>
            <button
              className={`${editorNavOption} ${
                mode instanceof DrawCircleFromCenterMode
                  ? editorNavOptionActive
                  : ''
              }`}
              onClick={() => handleModeSelection('circle')}
            >
              <FontAwesomeIcon icon={faDrawCircle} />
            </button>
            <button
              className={`${editorNavOption} ${
                mode instanceof DrawRectangleMode ? editorNavOptionActive : ''
              }`}
              onClick={() => handleModeSelection('rectangle')}
            >
              <FontAwesomeIcon icon={faDrawSquare} />
            </button>
            <button
              className={`${editorNavOption} ${
                mode instanceof DrawPolygonMode ? editorNavOptionActive : ''
              }`}
              onClick={() => handleModeSelection('polygon')}
            >
              <FontAwesomeIcon icon={faDrawPolygon} />
            </button>
          </>
        )}
        <div className={editorNavInner}>
          <Toggle
            onChange={() => setRenderTools(!renderTools)}
            isChecked={renderTools}
            name="multiToolSelect"
            id="multiToolSelect"
            label="Select Multiple Points"
          />
        </div>
      </div>
      {geometry && (
        <div className={editorNavControls}>
          <button onClick={onApply}>Apply Selection</button>
          <button>Discard Selection</button>
        </div>
      )}
    </>
  );
};

export default DrawEditor;
