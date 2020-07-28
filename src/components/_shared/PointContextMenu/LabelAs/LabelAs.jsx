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

import pointsActions from 'ducks/points/actions';
import { connect } from 'react-redux';

const options = ['Work', 'University', 'Bank', 'Pharmacy', 'Gas Station'];

const LabelAs = ({
  renderAtBottom,
  currentNickname,
  points,
  closeCallback,
  setLabel,
  tags,
}) => {
  const [customLabel, setCustomLabel] = useState();
  const nicknames = tags?.length ? new Set([...options, ...tags]) : options;

  const classes = classNames({
    [`${labelAsWrapper}`]: true,
    [`${labelAsWrapperBottom}`]: renderAtBottom,
  });

  const handleConfirm = nickname => {
    setLabel({
      nickname,
      discreetPointIds: points,
    });

    if (closeCallback) {
      closeCallback();
    }
  };

  return (
    <div className={classes}>
      <ul>
        {Array.from(nicknames).map((tag, i) => (
          <li className={labelAsWrapperOption} key={`${tag}${i}`}>
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

const dispatchers = {
  setLabel: pointsActions.setPointsLabel,
};

const mapStateToProps = ({ tags }) => ({
  ...tags,
});

export default connect(mapStateToProps, dispatchers)(LabelAs);
