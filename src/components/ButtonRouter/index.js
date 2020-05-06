import React from 'react';
import { Button } from '@wfp/ui';

export default function ButtonRouter({ to, ...other }) {
  return <Button onClick={this.handleOnClick} type="button" {...other} />;
}
