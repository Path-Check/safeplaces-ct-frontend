import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removePathEntry } from '../../ducks/path';

import { addSelected } from '../../ducks/selectedPathEntry';
import {
  getSelectedPathEntryData,
  getFilteredTrackPath,
} from '../../selectors';
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

export default function SidebarPathList() {
  const selectedPathEntry = useSelector(state =>
    getSelectedPathEntryData(state),
  );
  const filteredTrackPath = useSelector(state => getFilteredTrackPath(state));
  const dispatch = useDispatch();
  const addSelectedTrigger = data => dispatch(addSelected(data));
  const removePathEntryTrigger = data => dispatch(removePathEntry(data));

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
              selectedPathEntry.includes(e) && styles.selectedItem
            }`}
            key={i}
          >
            <Checkbox
              wrapperClassName={styles.checkbox}
              name={`checkbox-${e.id}`}
              onChange={f => {
                if (f === false) {
                  const newSelect = selectedPathEntry;
                  newSelect.splice(newSelect.indexOf(e), 1);
                  addSelectedTrigger([...newSelect]);
                } else {
                  addSelectedTrigger([...selectedPathEntry, e]);
                }
              }}
              checked={selectedPathEntry.includes(e)}
            />
            <div
              className={styles.itemInner}
              onClick={() => addSelectedTrigger([e])}
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
                  onClick={() => removePathEntryTrigger(e.time)}
                />
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
