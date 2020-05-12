import React, { useState } from 'react';
import { Button, tooltipStyle, TextInput } from '@wfp/ui';
import Dropzone from '../PathEditor/Dropzone';
import SidebarContent from '../SidebarPathList';

import {
  getTrack,
  getselectedPointsData,
  getFilteredTrackPath,
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
import path from '../../ducks/path';
import { NavLink } from 'react-router-dom';
import Tippy from '@tippy.js/react';
import { addSelected } from '../../ducks/selectedPoints';
import SelectCase from '../SelectCase';
import SettingsList from '../Settings/SettingsList';
import { getPath } from 'ducks/path';
import { getselectedPoints } from 'selectors/selectedPoints';
import { useParams } from 'react-router';

import { saveAsJson } from 'helpers/export';

function Sidebar({ addPathEntryTrigger, track }) {
  const currentPath = useSelector(state => getPath(state));
  const [name, setName] = useState(currentPath.name);
  const dispatch = useDispatch();
  const params = useParams();
  const filteredTrackPath = useSelector(state => getFilteredTrackPath(state));
  const selectedPathEntries = useSelector(getselectedPoints);
  const save = () => {
    saveAsJson({
      data: track,
      filename: `export-${path.publish_date_utl}.json`,
    });
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
          {currentPath.authority_name ? (
            <>
              {/* }h2>
                <a href={track.info_website}>{track.authority_name}</a>
          </h2> */}
              <p>
                {moment
                  .utc(currentPath.publish_date_utl)
                  .format('YYYY-MM-DD HH:mm:ss')}
              </p>
            </>
          ) : (
            <>
              <TextInput
                name="path-name"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <Button
                onClick={e => dispatch(path.actions.editMeta({ name: name }))}
              >
                Save
              </Button>
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
        <NavLink to={`/${params.patient}/edit/new`}>
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
          onClick={() =>
            dispatch(path.actions.removeEntries(selectedPathEntries))
          }
        >
          Delete selected
        </Button>
        <Button
          iconReverse
          small
          icon={<FontAwesomeIcon icon={faCheckCircle} />}
          onClick={() => {
            dispatch(addSelected(filteredTrackPath.map(e => e.id)));
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
    selectedPoints: getselectedPointsData(state),
    track: getTrack(state),
  };
};

const mapDispatchToProps = dispatch => ({
  addPathEntryTrigger: data => dispatch(path.actions.addPathEntry(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
