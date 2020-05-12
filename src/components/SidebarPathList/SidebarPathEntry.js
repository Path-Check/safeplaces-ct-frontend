import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addSelected } from '../../ducks/selectedPoints';
import { getSelectedPointsData } from '../../selectors';
import { Button, Checkbox, List, ListItem } from '@wfp/ui';
import styles from './styles.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/pro-solid-svg-icons';
import moment from 'moment';
import ButtonRouter from 'components/ButtonRouter';
import { faUndo } from '@fortawesome/pro-solid-svg-icons';
import { useParams } from 'react-router';
import cases from 'ducks/cases';

export default function SidebarPathEntry({ entry, key }) {
  const params = useParams();
  const selectedPoints = useSelector(state => getSelectedPointsData(state));
  const dispatch = useDispatch();

  return (
    <div
      className={`${styles.item} ${
        selectedPoints.includes(entry.id) && styles.selectedItem
      }`}
      key={key}
    >
      {entry.trash === true ? (
        <div className={styles.deletedEntry}>
          <span>Entry deleted</span>
          <Button
            kind="secondary"
            small
            icon={<FontAwesomeIcon icon={faUndo} />}
            iconReverse
            onClick={() => {
              dispatch(
                cases.actions.editEntry({
                  id: entry.id,
                  values: { ...entry, trash: false },
                }),
              );
            }}
          >
            undo
          </Button>
        </div>
      ) : (
        <>
          <Checkbox
            wrapperClassName={styles.checkbox}
            name={`checkbox-${entry.id}`}
            onChange={f => {
              if (f === false) {
                const newSelect = selectedPoints;
                newSelect.splice(newSelect.indexOf(entry.id), 1);
                dispatch(addSelected([...newSelect]));
              } else {
                dispatch(addSelected([...selectedPoints, entry.id]));
              }
            }}
            checked={selectedPoints.includes(entry.id)}
          />
          <div
            className={styles.itemInner}
            onClick={() => dispatch(addSelected([entry.id]))}
          >
            <div>
              <h3 className={styles.title}>
                {moment.utc(entry.time).isValid() ? (
                  <>
                    {moment.utc(entry.time).format('YYYY-MM-DD')}
                    <span className={styles.time}>
                      {moment.utc(entry.time).format('HH:mm:ss')}
                    </span>
                  </>
                ) : (
                  <>Date not set</>
                )}
              </h3>

              <p className={styles.subTitle}>
                {entry.street} {entry.other} {entry.postal} {entry.town}
              </p>

              <List kind="simple" colon small>
                <ListItem title="Latitude">{entry.latitude}</ListItem>
                <ListItem title="Longitude">{entry.longitude}</ListItem>
              </List>
            </div>

            <div className={styles.buttons}>
              <ButtonRouter
                kind="tertiary"
                small
                to={`/${params.patient}/edit/${entry.id}`}
                icon={<FontAwesomeIcon icon={faEdit} />}
              />
              <Button
                kind="tertiary"
                small
                icon={<FontAwesomeIcon icon={faTrashAlt} />}
                onClick={() => dispatch(cases.actions.removeEntry(entry.id))}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
