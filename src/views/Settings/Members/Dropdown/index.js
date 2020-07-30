import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/pro-solid-svg-icons';
import {
  dropdown,
  dropdownContent,
  item,
  menuIcon,
  deleteMemberText,
} from './Dropdown.module.scss';
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside';

const Dropdown = ({ id }) => {
  const containerRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  const [role, setRole] = useState('admin');

  useOnClickOutside(containerRef, () => setOpenMenu(false));
  const deleteMember = () => {
    const isTheySure = window.confirm('Are you sure?');
    if (isTheySure) {
      console.log('The user is sure!');
    }
  };

  const changeTo = to => {
    const isTheySure = window.confirm('Are you sure?');
    if (isTheySure) {
      // here we'll dispatch the action and the role will come via props
      setRole(to);
    }
  };

  const renderChangeTo = () => {
    switch (role) {
      case 'admin': {
        return (
          <>
            <div onClick={() => changeTo('superadmin')} className={item}>
              Change to Super Admin
            </div>
            <div onClick={() => changeTo('tracer')} className={item}>
              Change to Contact Tracer
            </div>
          </>
        );
      }
      case 'superadmin': {
        return (
          <>
            <div onClick={() => changeTo('admin')} className={item}>
              Change to Admin
            </div>
            <div onClick={() => changeTo('tracer')} className={item}>
              Change to Contact Tracer
            </div>
          </>
        );
      }
      case 'tracer': {
        return (
          <>
            <div onClick={() => changeTo('superadmin')} className={item}>
              Change to Super Admin
            </div>
            <div onClick={() => changeTo('admin')} className={item}>
              Change to Admin
            </div>
          </>
        );
      }
      default:
        break;
    }
  };
  return (
    <div
      onClick={() => setOpenMenu(!openMenu)}
      className={dropdown}
      ref={containerRef}
    >
      <FontAwesomeIcon icon={faEllipsisV} className={menuIcon} />
      {openMenu && (
        <div id="dropdownMenu" className={dropdownContent}>
          {renderChangeTo()}
          <div onClick={deleteMember} className={`${item} ${deleteMemberText}`}>
            Delete member
          </div>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
