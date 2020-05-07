import React from 'react';
import { Button } from '@wfp/ui';
import { useHistory } from 'react-router';
export default function ButtonRouter({ to, ...other }) {
  const history = useHistory();
  return <Button type="button" onClick={() => history.push(to)} {...other} />;
}
