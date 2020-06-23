import React, { useState } from 'react';

import TextInput from '@wfp/ui/lib/components/TextInput';

import {
  labelAsWrapper,
  inputWrapper,
  labelAsWrapperOption,
  labelAsWrapperOptionCheck,
} from './LabelAs.module.scss';

import Button from 'components/_shared/Button';

import {
  faCheck,
  faBuilding,
  faUniversity,
  faPiggyBank,
  faChevronRight,
  faPrescription,
  faPrescriptionBottle,
  faTag,
} from '@fortawesome/pro-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pointsActions from 'ducks/points/actions';
import { useDispatch, useSelector } from 'react-redux';
import { faGasPump } from '@fortawesome/pro-regular-svg-icons';
import tagsSelectors from 'ducks/tags/selectors';

const Options = [
  {
    icon: faBuilding,
    tag: 'Work',
  },
  {
    icon: faUniversity,
    tag: 'University',
  },
  {
    icon: faPiggyBank,
    tag: 'Bank',
  },
  {
    icon: faPrescriptionBottle,
    tag: 'Pharmacy',
  },
  {
    icon: faGasPump,
    tag: 'Gas Station',
  },
];

const LabelAs = ({ currentLabel, points }) => {
  const dispatch = useDispatch();
  const tags = useSelector(state => tagsSelectors.getTags(state));
  const [customLabel, setCustomLabel] = useState();

  return (
    <div className={labelAsWrapper}>
      <ul>
        {Options.map(({ icon, tag }) => (
          <li className={labelAsWrapperOption}>
            <button
              onClick={() =>
                dispatch(
                  pointsActions.setPointsLabel({
                    label: tag,
                    points,
                  }),
                )
              }
              disabled={tag === currentLabel}
            >
              <FontAwesomeIcon icon={icon} /> {tag}
              {tag === currentLabel && (
                <FontAwesomeIcon
                  icon={faCheck}
                  className={labelAsWrapperOptionCheck}
                />
              )}
            </button>
          </li>
        ))}
        {tags?.length > 0 &&
          tags.map(tag => (
            <li className={labelAsWrapperOption}>
              <button
                onClick={() =>
                  dispatch(
                    pointsActions.setPointsLabel({
                      label: tag,
                      points,
                    }),
                  )
                }
                disabled={tag === currentLabel}
              >
                <FontAwesomeIcon icon={faTag} /> {tag}
                {tag === currentLabel && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={labelAsWrapperOptionCheck}
                  />
                )}
              </button>
            </li>
          ))}
      </ul>
      <div className={inputWrapper}>
        <TextInput
          id="labelAs"
          labelText=""
          name="labelAs"
          placeholder="Dave's Diner"
          onChange={e => setCustomLabel(e.target.value)}
        />
        <Button
          onClick={() =>
            dispatch(
              pointsActions.setPointsLabel({
                label: customLabel,
                points,
              }),
            )
          }
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </div>
    </div>
  );
};

export default LabelAs;
