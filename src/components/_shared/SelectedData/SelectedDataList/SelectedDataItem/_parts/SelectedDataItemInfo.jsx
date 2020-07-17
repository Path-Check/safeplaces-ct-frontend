import React, { useRef } from 'react';

import moment from 'moment';

import { faHourglass, faClock } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  selectedDataContent,
  selectedDataTag,
} from '../SelectedDataItem.module.scss';

import pointsActions from 'ducks/points/actions';
import { useDispatch } from 'react-redux';

import { formattedDuration } from 'helpers/dateTime';

const SelectedDataItemInfo = React.memo(
  ({
    time: timestamp,
    duration,
    nickname,
    isHighlighted,
    isTrace,
    ...rest
  }) => {
    const dispatch = useDispatch();
    const time = moment(timestamp).format('h:mma');

    const friendlyDuration = formattedDuration(duration);

    return (
      <button
        type="button"
        onClick={() =>
          dispatch(
            pointsActions.setSelectedPoint({
              time: timestamp,
              duration,
              nickname,
              ...rest,
            }),
          )
        }
      >
        <div className={selectedDataContent}>
          <ul>
            <li>
              <FontAwesomeIcon icon={faClock} /> {time}
            </li>
            {friendlyDuration && (
              <li>
                <FontAwesomeIcon icon={faHourglass} /> {friendlyDuration}
              </li>
            )}
            {nickname && <li className={selectedDataTag}>{nickname}</li>}
          </ul>
        </div>
      </button>
    );
  },
);

export default SelectedDataItemInfo;
