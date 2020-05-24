import React from 'react';
import DateSelector from 'components/RedactorTools/DateSelector';

export default { title: 'Redactor Tools Date Selector' };

export const Default = () => (
  <DateSelector steps={15} minDate={1} maxDate={15} />
);
