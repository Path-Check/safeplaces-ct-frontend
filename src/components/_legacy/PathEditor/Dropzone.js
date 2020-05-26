import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import cases from '../../ducks/cases';
// import { getAllTracks } from "../../selectors";
import { connect } from 'react-redux';
import { Button } from '@wfp/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/pro-solid-svg-icons';

function MyDropzone({ importPathTrigger, currentCase }) {
  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result;
          importPathTrigger(JSON.parse(binaryStr), currentCase);
          console.log(JSON.parse(binaryStr));
        };
        reader.readAsText(file);
      });
    },
    [importPathTrigger, currentCase],
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
    currentCase: state.cases.currentCase,
  };
};

const mapDispatchToProps = dispatch => ({
  importPathTrigger: (points, currentCase) => {
    dispatch(cases.actions.import({ points, currentCase }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyDropzone);
