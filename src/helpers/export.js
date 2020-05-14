import FileSaver from 'file-saver';

export const saveAsJson = ({ data, filename }) => {
  var blob = new Blob([JSON.stringify(data)], {
    type: 'text/plain;charset=utf-8',
  });
  FileSaver.saveAs(blob, `export-${filename}.json`);
};
