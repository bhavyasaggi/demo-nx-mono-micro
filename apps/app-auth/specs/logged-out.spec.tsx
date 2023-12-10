import React from 'react';

import { renderWithStore } from '../store/__mock__';

import PageLoggedOut from '../pages/logged-out';

jest.mock('next/router', () => require('next-router-mock'));

describe('PageLoggedOut', () => {
  it('should render successfully', () => {
    const { container } = renderWithStore(<PageLoggedOut />);
    expect(container).toMatchSnapshot();
  });
});
