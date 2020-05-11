import React from 'react';
import { Button, tooltipStyle } from '@wfp/ui';
import Dropzone from '../PathEditor/Dropzone';
import SidebarContent from '../SidebarPathList';
import FileSaver from 'file-saver';

import {
  getTrack,
  getSelectedPathEntryData,
  getFilteredTrackPath,
  getSelectedTracks,
} from '../../selectors';
import styles from './styles.module.scss';
import { connect, useDispatch, useSelector } from 'react-redux';
import DateSlider from '../Filter';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSave,
  faCaretDown,
  faCheckCircle,
  faTimesCircle,
  faPlusCircle,
} from '@fortawesome/pro-solid-svg-icons';
import { addPathEntry } from '../../ducks/path';
import { NavLink } from 'react-router-dom';
import Tippy from '@tippy.js/react';
import { addSelected, deleteSelected } from '../../ducks/selectedPathEntry';
import SelectCase from '../SelectCase';
import SettingsList from '../Settings/SettingsList';
import { getPath } from 'selectors/paths';

function Sidebar({ addPathEntryTrigger, track }) {
  // const [openNewEntry, setOpenNewEntry] = useState(false);
  const dispatch = useDispatch();
  const filteredTrackPath = useSelector(state => getFilteredTrackPath(state));
  const selectedPath = useSelector(state => getSelectedTracks(state));
  const path = useSelector(state => getPath(state));
  const save = () => {
    const newArray = {};
    filteredTrackPath.forEach(element => {
      newArray[element[0]] = element[1];
    });
    var blob = new Blob([JSON.stringify(track)], {
      type: 'text/plain;charset=utf-8',
    });
    FileSaver.saveAs(blob, `export-${path.publish_date_utl}.json`);
  };
  return (
    <>
      <div className={styles.folder}>
        <div>
          <h2 className={styles.folderTitle}>Sample organization local data</h2>
          <p className={styles.folderSubTitle}>Data for lorem ipsum</p>
        </div>
        <div className={styles.settingsButtons}>
          <div>
            <Tippy
              interactive
              content={
                <div className={styles.settingsList}>
                  <SettingsList />
                </div>
              }
              trigger="click"
              {...tooltipStyle}
            >
              <div>
                <Button
                  kind="secondary"
                  icon={<FontAwesomeIcon icon={faCaretDown} />}
                >
                  Actions
                </Button>
              </div>
            </Tippy>
          </div>
        </div>
      </div>
      <div className={styles.selectCase}>
        <SelectCase />
      </div>
      <div className={styles.header}>
        <div className={styles.title}>
          {path.authority_name ? (
            <>
              {/* }h2>
                <a href={track.info_website}>{track.authority_name}</a>
          </h2> */}
              <p>
                {moment
                  .utc(path.publish_date_utl)
                  .format('YYYY-MM-DD HH:mm:ss')}
              </p>
            </>
          ) : (
              <>
                <h2>Open a file</h2>
                <p>No file opened</p>
              </>
            )}
        </div>
        <div className={styles.buttons}>
          <Dropzone />

          <Button
            onClick={save}
            iconReverse
            icon={<FontAwesomeIcon icon={faSave} />}
          >
            Save
          </Button>
        </div>
      </div>
      <div className={styles.filter}>
        <DateSlider />
      </div>
      <div className={styles.toolbar}>
        <NavLink to="/patient/edit/new">
          <Button
            iconReverse
            small
            icon={<FontAwesomeIcon icon={faPlusCircle} />}
          >
            Add Entry
          </Button>
        </NavLink>
        <Button
          iconReverse
          small
          icon={<FontAwesomeIcon icon={faPlusCircle} />}
          onClick={() => {
            dispatch(deleteSelected(selectedPath));
          }}
        >
          Delete selected
        </Button>
        <Button
          iconReverse
          small
          icon={<FontAwesomeIcon icon={faCheckCircle} />}
          onClick={() => {
            dispatch(addSelected(filteredTrackPath));
          }}
        >
          all
        </Button>
        <Button
          iconReverse
          small
          icon={<FontAwesomeIcon icon={faTimesCircle} />}
          onClick={() => {
            dispatch(addSelected([]));
          }}
        >
          none
        </Button>
      </div>
      <div></div>
      {/* {openNewEntry && (
        <div className={styles.newForm}>
          <EntryForm />
        </div>
      )} */}
      <div className={styles.sidebarContent}>
        <SidebarContent />
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    selectedPathEntry: getSelectedPathEntryData(state),
    track: getTrack(state),
  };
};

const mapDispatchToProps = dispatch => ({
  addPathEntryTrigger: data => dispatch(addPathEntry(data)),
  deleteSelectedTrigger: data => dispatch(deleteSelected(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
