import type { Meta } from '@storybook/react';

import Authenticator from './index';

const meta: Meta<typeof Authenticator> = {
  component: Authenticator,
  title: 'Authenticator',
};
export default meta;

export const AuthenticatorPrimary = {
  args: {
    onSuccess: () => window.alert('Success'),
    onFailure: () => window.alert('Failure'),
  },
};
