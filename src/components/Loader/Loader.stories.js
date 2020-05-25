import React from 'react';
import Loader from 'components/Loader';

export default { title: 'Loader' };

export const Default = () => <Loader />;

export const LoadingRecords = () => <Loader message="Records are Loading" />;

export const LoadingRecord = () => <Loader message="Record is Loading" />;
