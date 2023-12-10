import React from 'react';

import { waitFor } from '@testing-library/react';

import mockRouter from 'next-router-mock';

import { renderWithStore } from '../store/__mock__';

import PageSignIn from '../pages/sign-in';

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

describe('PageSignIn', () => {
  it('Redirect to Logged-In', async () => {
    mockRouter.push('/');
    renderWithStore(<PageSignIn />, {
      preloadedState: { user: dummyAuth },
    });
    await waitFor(async () => {
      expect(mockRouter.pathname).toBe('/logged-in');
    });
  });
  it('Show Login Form', async () => {
    mockRouter.push('/');
    const { getByTestId } = renderWithStore(<PageSignIn />);
    const boxAuth = getByTestId('box-auth');
    await waitFor(async () => {
      expect(boxAuth.firstChild).toBeTruthy();
    });
  });
});
