import React, { useState, useEffect, useRef } from 'react';

import { toPoint } from 'components/_shared/Map/_helpers';
import inside from '@turf/inside';

import { Editor, DrawPolygonMode } from 'react-map-gl-draw';

import {
  editorNav,
  editorNavInner,
  editorNavControls,
  editorHelpText,
} from './DrawEditor.module.scss';

import { faTrash, faTag, faFilter } from '@fortawesome/pro-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import pointsSelectors from 'ducks/points/selectors';
import { useSelector, useDispatch } from 'react-redux';

import pointsActions from 'ducks/points/actions';
import applicationActions from 'ducks/application/actions';
import Button from 'components/_shared/Button';

const returnActions = (amount, filterAction, closeAction, labelAction) => [
  {
    label: `Filter ${amount}
  Points`,
    icon: faFilter,
    action: filterAction,
  },
  {
    label: `Delete ${amount}
  Points`,
    icon: faTrash,
    action: closeAction,
  },
  {
    label: `Label ${amount}
  Points`,
    icon: faTag,
    action: labelAction,
  },
];

const DrawEditor = () => {
  const dispatch = useDispatch();
  const editorRef = useRef();
  const [renderTools, setRenderTools] = useState(false);
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

  const onApply = () => {
    if (geometry) {
      dispatch(pointsActions.setGeometry(geometry));
    }
    resetGeometry(true);
  };

  useEffect(() => {
    if (!geometry) {
      return;
    }
    const targetArray = filteredPoints.length > 0 ? filteredPoints : points;
    const selection = targetArray.filter(p => inside(toPoint(p), geometry));
    console.log(selection);

    if (selection?.length > 0) {
      setNewPoints(selection);
    } else {
      dispatch(
        applicationActions.notification({
          title: 'Please make a valid selection',
        }),
      );
      resetGeometry();
    }
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
        clickRadius={20}
        onUpdate={map => handleUpdate(map)}
        featureStyle={({ feature, state }) => {
          if (state === 'UNCOMMITTED' || state === 'SELECTED') {
            return {
              stroke: '#4051DB',
              strokeWidth: 1,
              fill: 'rgba(105, 121, 248, 0.2)',
              strokeDasharray: '5,5',
            };
          }

          return {
            stroke: '#4051DB',
            strokeWidth: 2,
            fill: 'rgba(105, 121, 248, 0.5)',
          };
        }}
        mode={renderTools && new DrawPolygonMode()}
      />
      {!renderTools && (
        <div className={editorNav}>
          <div className={editorNavInner}>
            <Button tertiary onClick={() => setRenderTools(true)}>
              Select Multiple Points
            </Button>
          </div>
        </div>
      )}
      {!geometry && renderTools && (
        <div className={editorHelpText}>
          <p>
            Use the polygon tool to draw around the data points you want to
            select.
          </p>
          <button onClick={() => setRenderTools(false)}>
            <FontAwesomeIcon icon={faTrash} /> Clear Selection
          </button>
        </div>
      )}
      {geometry && newPoints?.length > 0 && (
        <ul className={editorNavControls}>
          {returnActions(
            newPoints.length,
            () => console.log('filter'),
            () => console.log('delete'),
            () => console.log('label'),
          ).map(({ label, icon, action }) => (
            <li>
              <Button tertiary onClick={() => action()}>
                <FontAwesomeIcon icon={icon} /> {label}
              </Button>
            </li>
          ))}

          <li>
            <Button primary onClick={() => handleDelete()}>
              Cancel
            </Button>
          </li>
        </ul>
      )}
    </>
  );
};

export default DrawEditor;
