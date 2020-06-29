import React, { useState, useEffect, useRef } from 'react';

import { toPoint } from 'components/_shared/Map/_helpers';
import inside from '@turf/inside';

import { Editor, DrawPolygonMode } from 'react-map-gl-draw';

import pointsSelectors from 'ducks/points/selectors';
import { useSelector, useDispatch } from 'react-redux';

import applicationActions from 'ducks/application/actions';
import HelpBlock from 'components/_shared/Map/DrawEditor/_parts/HelpBlock';
import ActionsMenu from 'components/_shared/Map/DrawEditor/_parts/ActionsMenu';
import EditorNav from 'components/_shared/Map/DrawEditor/_parts/EditorNav';

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

  const permitDrawing = renderTools && !geometry;

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

  useEffect(() => {
    if (!geometry) {
      return;
    }
    const targetArray = filteredPoints.length > 0 ? filteredPoints : points;
    const selection = targetArray.filter(p => inside(toPoint(p), geometry));

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
          cursor: permitDrawing ? 'crosshair' : 'inherit',
        }}
        clickRadius={15}
        onUpdate={map => handleUpdate(map)}
        featureStyle={({ feature, state }) => {
          if (state === 'UNCOMMITTED' || state === 'SELECTED') {
            return {
              stroke: '#4051DB',
              strokeWidth: 1,
              fill: 'rgba(105, 121, 248, 0.24)',
              strokeDasharray: '5,5',
            };
          }

          return {
            stroke: '#4051DB',
            strokeWidth: 2,
            fill: 'rgba(105, 121, 248, 0.5)',
          };
        }}
        editHandleShape="circle"
        mode={permitDrawing && new DrawPolygonMode()}
      />
      {!renderTools && <EditorNav setRenderTools={setRenderTools} />}
      {!geometry && renderTools && (
        <HelpBlock setRenderTools={setRenderTools} />
      )}
      {geometry && newPoints?.length > 0 && (
        <ActionsMenu
          resetGeometry={resetGeometry}
          newPoints={newPoints}
          handleDelete={handleDelete}
          geometry={geometry}
        />
      )}
    </>
  );
};

export default DrawEditor;
