import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ApiPage from '../ApiPage';
import OrganizationPage from '../OrganizationPage';
import styles from './styles.module.scss';
import { Button } from '@wfp/ui';
import {
  faFolderPlus,
  faCaretLeft,
  faFileDownload,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SettingsList from './SettingsList';
import ButtonRouter from 'components/_legacy/ButtonRouter';
import { useSelector } from 'react-redux';
import { getCases } from 'ducks/cases';
import { saveAsJson } from 'helpers/export';

export default function Settings() {
  const cases = useSelector(getCases);
  const save = () => {
    saveAsJson({
      data: cases,
      filename: `organization-exp`,
    });
  };

  return (
    <div className={styles.settingsPageWrapper}>
      <div className={styles.settingsPage}>
        <div className={styles.header}>
          <ButtonRouter
            to="/"
            icon={<FontAwesomeIcon icon={faCaretLeft} />}
            iconReverse
          >
            Return to homepage
          </ButtonRouter>
          <div className={styles.headerConfiguration}>
            <Button
              kind="ghost"
              iconReverse
              icon={<FontAwesomeIcon icon={faFolderPlus} />}
            >
              Load configuration
            </Button>
            <Button
              kind="ghost"
              iconReverse
              icon={<FontAwesomeIcon icon={faFileDownload} />}
              onClick={save}
            >
              Export configuration
            </Button>
          </div>
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
