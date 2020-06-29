import React, { useState } from 'react';

import TextInput from '@wfp/ui/lib/components/TextInput';

import classNames from 'classnames';

import {
  labelAsWrapper,
  inputWrapper,
  labelAsWrapperOption,
  labelAsWrapperOptionCheck,
  labelAsWrapperBottom,
} from './LabelAs.module.scss';

import Button from 'components/_shared/Button';

import {
  faCheck,
  faBuilding,
  faUniversity,
  faPiggyBank,
  faChevronRight,
  faPrescriptionBottle,
  faTag,
  faCircle,
} from '@fortawesome/pro-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pointsActions from 'ducks/points/actions';
import { useDispatch, useSelector } from 'react-redux';
import { faGasPump } from '@fortawesome/pro-regular-svg-icons';
import tagsSelectors from 'ducks/tags/selectors';

const options = ['Work', 'University', 'Bank', 'Pharmacy', 'Gas Station'];

const iconFromLabel = {
  Work: faBuilding,
  University: faUniversity,
  Bank: faPiggyBank,
  Pharmacy: faPrescriptionBottle,
  'Gas Station': faGasPump,
};

const LabelAs = ({
  renderAtBottom,
  currentNickname,
  points: pointIds,
  closeCallback,
}) => {
  const dispatch = useDispatch();
  const tags = useSelector(state => tagsSelectors.getTags(state));
  const [customLabel, setCustomLabel] = useState();
  const nicknames =
    tags && tags.length ? new Set([...options, ...tags]) : options;

  const classes = classNames({
    [`${labelAsWrapper}`]: true,
    [`${labelAsWrapperBottom}`]: renderAtBottom,
  });
  const handleConfirm = nickname => {
    dispatch(
      pointsActions.setPointsLabel({
        nickname,
        pointIds,
      }),
    );

    closeCallback();
  };

  return (
    <div className={classes}>
      <ul>
        {Array.from(nicknames).map(tag => (
          <li className={labelAsWrapperOption}>
            <button
              onClick={() => handleConfirm(tag)}
              disabled={tag === currentNickname}
            >
              <FontAwesomeIcon icon={faCircle} /> {tag}
              {tag === currentNickname && (
                <FontAwesomeIcon
                  icon={faCheck}
                  className={labelAsWrapperOptionCheck}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
      <form
        className={inputWrapper}
        onSubmit={() => handleConfirm(customLabel)}
      >
        <TextInput
          id="labelAs"
          labelText=""
          name="labelAs"
          placeholder="Dave's Diner"
          onChange={e => setCustomLabel(e.target.value)}
        />
      </form>
    </div>
  );
};

export default LabelAs;
