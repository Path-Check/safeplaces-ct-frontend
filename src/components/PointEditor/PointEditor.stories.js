import React from 'react';

import PointEditor from '.';

export default {
  title: 'Point Editor',
};

export const AddPoint = () => <PointEditor type="add" />;
export const EditPoint = () => <PointEditor type="edit" />;
