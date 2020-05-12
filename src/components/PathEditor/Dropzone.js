import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import path from '../../ducks/path';
// import { getAllTracks } from "../../selectors";
import { connect } from 'react-redux';
import { Button } from '@wfp/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/pro-solid-svg-icons';

function MyDropzone({ importPathTrigger }) {
  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result;
          importPathTrigger(JSON.parse(binaryStr));
          console.log(JSON.parse(binaryStr));
        };
        reader.readAsText(file);
      });
    },
    [importPathTrigger],
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button iconReverse icon={<FontAwesomeIcon icon={faFolderPlus} />}>
        Import
      </Button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    // track: getAllTracks(state)
  };
};

const mapDispatchToProps = dispatch => ({
  importPathTrigger: data => dispatch(path.actions.import(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyDropzone);
