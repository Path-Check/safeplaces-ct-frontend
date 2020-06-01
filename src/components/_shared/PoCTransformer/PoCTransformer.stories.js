import React from 'react';
import PoCTransformer from 'components/_shared/PoCTransformer';

export default { title: 'PoCTransformer' };

const radius0 = require('./radius0.json');
const radius1 = require('./radius1.json');
const radius2 = require('./radius2.json');
const radius3 = require('./radius3.json');
const radius4 = require('./radius4.json');

export const Default = () => <PoCTransformer />;
export const R0 = () => <PoCTransformer path={radius0} />;
export const R1 = () => <PoCTransformer path={radius1} />;
export const R2 = () => <PoCTransformer path={radius2} />;
export const R3 = () => <PoCTransformer path={radius3} />;
export const R4 = () => <PoCTransformer path={radius4} />;
