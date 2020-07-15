import React, { useState, useEffect, useRef, useMemo } from 'react';

import { toPoint } from 'components/_shared/Map/_helpers';
import inside from '@turf/inside';

import { Editor, DrawPolygonMode } from 'react-map-gl-draw';

import HelpBlock from 'components/_shared/Map/DrawEditor/_parts/HelpBlock';
import ActionsMenu from 'components/_shared/Map/DrawEditor/_parts/ActionsMenu';
import EditorNav from 'components/_shared/Map/DrawEditor/_parts/EditorNav';

const DrawEditor = React.memo(({ filteredPoints }) => {
  const editorRef = useRef();
  const [renderTools, setRenderTools] = useState(false);
  const [geometry, setGeometry] = useState(null);
  const [newPoints, setNewPoints] = useState(null);
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

    const targetArray = filteredPoints;
    const selection = targetArray.filter(p => inside(toPoint(p), geometry));

    if (selection?.length > 0) {
      setNewPoints(selection);
    } else {
      resetGeometry();
    }
  }, [geometry]);

  const initTools = useMemo(() => permitDrawing && new DrawPolygonMode(), [
    permitDrawing,
  ]);

  return (
    <>
      <Editor
        ref={editorRef}
        style={{
          width: '100%',
          height: '100%',
          cursor: permitDrawing ? 'crosshair' : 'inherit',
        }}
        clickRadius={12}
        editHandleShape="circle"
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
        mode={initTools}
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
});

export default DrawEditor;
