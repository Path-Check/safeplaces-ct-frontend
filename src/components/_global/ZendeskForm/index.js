import React, { useEffect } from 'react';
import Zendesk from 'react-zendesk';
import { useLocation } from 'react-router-dom';
import { ZendeskAPI } from 'react-zendesk/src';

const ZENDESK_KEY = '6958c2a0-013c-46b5-aa41-f7b4228746a9';

const setting = {
  color: {
    button: '#6979f8',
    launcher: '#6979f8',
    header: '#6979f8',
    resultLists: '#FFFFFF',
    articleLinks: '#FFFFFF',
  },
  launcher: {
    chatLabel: {
      'en-US': 'Need Help',
    },
  },
  contactForm: {},
};

const ZendeskForm = () => {
  const { pathname } = useLocation();
  const isSettings = pathname?.includes('settings');

  useEffect(() => {
    console.log(isSettings);
    if (!isSettings) {
      ZendeskAPI('webWidget', 'hide');
    } else {
      ZendeskAPI('webWidget', 'show');
    }
  }, [isSettings, pathname]);

  return (
    <Zendesk
      zendeskKey={ZENDESK_KEY}
      {...setting}
      onLoaded={() => {
        if (!isSettings) {
          ZendeskAPI('webWidget', 'hide');
        }
      }}
    />
  );
};

export default ZendeskForm;
