import React from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import ApiPage from '../ApiPage';
import OrganizationPage from '../OrganizationPage';
import styles from './styles.module.scss';
import { Button } from '@wfp/ui';
import { faCaretLeft } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SettingsList from './SettingsList';

export default function Settings() {
  return (
    <div className={styles.settingsPageWrapper}>
      <div className={styles.settingsPage}>
        <div className={styles.header}>
          <NavLink to="/">
            <Button icon={<FontAwesomeIcon icon={faCaretLeft} />} iconReverse>
              Return to homepage
            </Button>
          </NavLink>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.navigation}>
            <SettingsList />
          </div>
          <div className={styles.content}>
            <Switch>
              <Route
                path="/settings/organization"
                component={OrganizationPage}
              />
              <Route path="/settings/api" component={ApiPage} />
              <Route>
                <Redirect from="/settings/" to="/settings/organization" />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
