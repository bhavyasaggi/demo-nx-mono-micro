import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import Dashboard from './index';

const meta: Meta<typeof Dashboard> = {
  component: Dashboard,
  title: 'Dashboard',
};
export default meta;

type Story = StoryObj<typeof Dashboard>;

export const DashboardPrimary = {
  args: {
    firstName: 'John',
    lastName: 'Doe',
    image: 'https://robohash.org/john.png',
    email: 'john@email.com',
    gender: 'male',
  },
};

export const DashboardStory: Story = {
  args: {
    firstName: 'John',
    lastName: 'Doe',
    image: 'https://robohash.org/john.png',
    email: 'john@email.com',
    gender: 'male',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome, John!/gi)).toBeTruthy();
  },
};
