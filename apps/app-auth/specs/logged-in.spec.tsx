import React from 'react';

import { waitFor } from '@testing-library/react';

import mockRouter from 'next-router-mock';

import { renderWithStore } from '../store/__mock__';

import PageLoggedIn from '../pages/logged-in';

jest.mock('next/router', () => require('next-router-mock'));

const dummyAuth = {
  id: 15,
  username: 'kminchelle',
  email: 'kminchelle@qq.com',
  firstName: 'Jeanne',
  lastName: 'Halvorson',
  gender: 'female',
  image: 'https://robohash.org/autquiaut.png?size=50x50&set=set1',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZz9zaXplPTUweDUwJnNldD1zZXQxIiwiaWF0IjoxNjM1NzczOTYyLCJleHAiOjE2MzU3Nzc1NjJ9.n9PQX8w8ocKo0dMCw3g8bKhjB8Wo7f7IONFBDqfxKhs',
};

describe('PageLoggedIn', () => {
  it('Redirect without user-auth', async () => {
    mockRouter.push('/logged-in');
    renderWithStore(<PageLoggedIn />);
    await waitFor(async () => {
      expect(mockRouter.pathname).toBe('/sign-in');
    });
  });
  it('Should render user-info', async () => {
    const { container } = renderWithStore(<PageLoggedIn />, {
      preloadedState: { user: dummyAuth },
    });
    expect(container).toMatchSnapshot();
  });
});
