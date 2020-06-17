import { configure, addDecorator, addParameters } from '@storybook/react';

import ProviderDecorator from './decorators/provider';

addDecorator(ProviderDecorator);
