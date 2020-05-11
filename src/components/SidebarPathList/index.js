import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editPathEntry, removePathEntry } from '../../ducks/path';

import { addSelected } from '../../ducks/selectedPoints';
import { getselectedPointsData, getFilteredTrackPath } from '../../selectors';
import { Button, Checkbox, List, ListItem } from '@wfp/ui';
import styles from './styles.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faMapMarkerQuestion,
  faEdit,
} from '@fortawesome/pro-solid-svg-icons';
import moment from 'moment';
import Empty from '../Empty';
import ButtonRouter from 'components/ButtonRouter';
import { faUndo } from '@fortawesome/pro-solid-svg-icons';

export default function SidebarPathList() {
  const selectedPoints = useSelector(state => getselectedPointsData(state));
  const filteredTrackPath = useSelector(state => getFilteredTrackPath(state));
  const dispatch = useDispatch();
  //const removePathEntryTrigger = data => dispatch(removePathEntry(data));

  return (
    <>
      {!filteredTrackPath && (
        <Empty
          title="No file opened"
          className="attendance-detail-empt"
          kind="large"
          icon={<FontAwesomeIcon icon={faMapMarkerQuestion} size="1x" />}
        >
          Please open a file
        </Empty>
      )}
      {filteredTrackPath &&
        filteredTrackPath.map((e, i) => (
          <div
            className={`${styles.item} ${
              selectedPoints.includes(e.id) && styles.selectedItem
            }`}
            key={i}
          >
            {e.trash === true ? (
              <div className={styles.deletedEntry}>
                <span>Entry deleted</span>
                <Button
                  kind="secondary"
                  small
                  icon={<FontAwesomeIcon icon={faUndo} />}
                  iconReverse
                  onClick={() => {
                    dispatch(editPathEntry({ ...e, trash: false }), e.id);
                  }}
                >
                  undo
                </Button>
              </div>
            ) : (
              <>
                <Checkbox
                  wrapperClassName={styles.checkbox}
                  name={`checkbox-${e.id}`}
                  onChange={f => {
                    if (f === false) {
                      const newSelect = selectedPoints;
                      newSelect.splice(newSelect.indexOf(e.id), 1);
                      dispatch(addSelected([...newSelect]));
                    } else {
                      dispatch(addSelected([...selectedPoints, e.id]));
                    }
                  }}
                  checked={selectedPoints.includes(e.id)}
                />
                <div
                  className={styles.itemInner}
                  onClick={() => dispatch(addSelected([e.id]))}
                >
                  <div>
                    <h3 className={styles.title}>
                      {moment.utc(e.time).format('YYYY-MM-DD')}
                      <span className={styles.time}>
                        {moment.utc(e.time).format('HH:mm:ss')}
                      </span>
                    </h3>

                    <p className={styles.subTitle}>
                      {e.street} {e.other} {e.postal} {e.town}
                    </p>

                    <List kind="simple" colon small>
                      <ListItem title="Latitude">{e.latitude}</ListItem>
                      <ListItem title="Longitude">{e.longitude}</ListItem>
                    </List>
                  </div>

                  <div className={styles.buttons}>
                    <ButtonRouter
                      kind="tertiary"
                      small
                      to={`/patient/edit/${e.id}`}
                      icon={<FontAwesomeIcon icon={faEdit} />}
                    />
                    <Button
                      kind="tertiary"
                      small
                      icon={<FontAwesomeIcon icon={faTrashAlt} />}
                      onClick={() => dispatch(removePathEntry(e.id))}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
    </>
  );
}
