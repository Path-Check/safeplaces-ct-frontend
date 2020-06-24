import React, { useState, useEffect, useRef } from 'react';

import { toPoint } from 'components/_shared/Map/_helpers';
import inside from '@turf/inside';

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

import pointsSelectors from 'ducks/points/selectors';
import { useSelector, useDispatch } from 'react-redux';

import pointsActions from 'ducks/points/actions';

const DrawEditor = () => {
  const dispatch = useDispatch();
  const editorRef = useRef();
  const [renderTools, setRenderTools] = useState(false);
  const [mode, setMode] = useState(null);
  const [geometry, setGeometry] = useState(null);
  const points = useSelector(state => pointsSelectors.getPoints(state));
  const [newPoints, setNewPoints] = useState(null);
  const filteredPoints = useSelector(state =>
    pointsSelectors.getFilteredPoints(state),
  );

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
    if (geometry) {
      dispatch(pointsActions.setGeometry(geometry));
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
    if (!geometry) {
      return;
    }
    const targetArray = filteredPoints.length > 0 ? filteredPoints : points;
    const newPoints = targetArray.filter(p => inside(toPoint(p), geometry));

    setNewPoints(newPoints);
    handleModeSelection('');
  }, [geometry]);

  return (
    <>
      <Editor
        ref={editorRef}
        style={{
          width: '100%',
          height: '100%',
          cursor: renderTools ? 'crosshair' : 'inherit',
        }}
        clickRadius={10}
        onUpdate={map => handleUpdate(map)}
        featureStyle={({ feature, state }) => {
          return {
            stroke: '#4051DB',
            strokeWidth: 2,
            fill: 'rgba(105, 121, 248, 0.5)',
          };
        }}
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
          <button onClick={onApply} disabled={newPoints?.length < 1}>
            Apply Selection <FontAwesomeIcon icon={faCheck} />
          </button>
          <button onClick={() => handleDelete()}>
            Cancel Selection <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )}
    </>
  );
};

export default DrawEditor;
