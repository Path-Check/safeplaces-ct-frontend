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
  faCheck,
  faTrash,
} from '@fortawesome/pro-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Toggle from 'components/_shared/ToggleControl';

import inside from '@turf/inside';
import pointsSelectors from 'ducks/points/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { toPoint } from 'components/_shared/Map/_helpers';
import pointsActions from 'ducks/points/actions';

const DrawEditor = () => {
  const dispatch = useDispatch();
  const editorRef = useRef();
  const [renderTools, setRenderTools] = useState(false);
  const [mode, setMode] = useState(null);
  const [geometry, setGeometry] = useState(null);
  const points = useSelector(state => pointsSelectors.getPoints(state));

  const resetGeometry = (closeTools = false) => {
    if (editorRef && editorRef.current) {
      editorRef.current.deleteFeatures(0);
      setGeometry(null);
    }

    if (closeTools) {
      setRenderTools(false);
    }
  };

  const handleUpdate = ({ data }) => {
    console.log(data);
    if (!data || data.length < 1) {
      return;
    }

    setGeometry(data[0]?.geometry);
  };

  const handleDelete = () => {
    editorRef.current.deleteFeatures(0);
    setGeometry(null);
  };

  const handleModeSelection = type => {
    if (geometry && type) {
      resetGeometry();
    }

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

  const onApply = () => {
    const filterdPoints = points.filter(p => inside(toPoint(p), geometry));

    if (filterdPoints?.length > 0) {
      dispatch(pointsActions.setFilteredPoints(filterdPoints));
    } else {
      console.error('no points present in this geography');
    }

    resetGeometry(true);
  };

  useEffect(() => {
    if (!renderTools) {
      editorRef.current.deleteFeatures(0);
      handleModeSelection('');
    } else {
      handleModeSelection('rectangle');
    }
  }, [renderTools]);

  useEffect(() => {
    handleModeSelection('');
  }, [geometry]);

  return (
    <>
      <Editor
        ref={editorRef}
        style={{ width: '100%', height: '100%' }}
        clickRadius={12}
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
          <button onClick={onApply}>
            Apply Selection <FontAwesomeIcon icon={faCheck} />
          </button>
          <button onClick={() => handleDelete()}>
            Discard Selection <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )}
    </>
  );
};

export default DrawEditor;
