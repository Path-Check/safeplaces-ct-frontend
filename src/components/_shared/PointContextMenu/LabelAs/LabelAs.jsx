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

import { faTag, faCircle, faTimes } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useDispatch, useSelector } from 'react-redux';
import pointsActions from 'ducks/points/actions';
import tagsSelectors from 'ducks/tags/selectors';

const options = ['Work', 'University', 'Bank', 'Pharmacy', 'Gas Station'];

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

    if (closeCallback) {
      closeCallback();
    }
  };

  return (
    <div className={classes}>
      <ul>
        {Array.from(nicknames).map(tag => (
          <li className={labelAsWrapperOption}>
            <button
              onClick={() =>
                tag === currentNickname
                  ? handleConfirm(null)
                  : handleConfirm(tag)
              }
            >
              <FontAwesomeIcon icon={faCircle} /> {tag}
              {tag === currentNickname && (
                <FontAwesomeIcon
                  icon={faTimes}
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
        <FontAwesomeIcon icon={faTag} />
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
