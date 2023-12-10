import React from 'react';

import { act, fireEvent, waitFor } from '@testing-library/react';

import mockRouter from 'next-router-mock';

import { renderWithStore } from '../store/__mock__';

import PageHome from '../pages/index';

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

describe('PageHome', () => {
  it('Redirect to Sign-In', async () => {
    mockRouter.push('/');
    renderWithStore(<PageHome />);
    await waitFor(async () => {
      expect(mockRouter.pathname).toBe('/sign-in');
    });
  });
  it('Redirect to Logged-In', async () => {
    mockRouter.push('/');
    renderWithStore(<PageHome />, {
      preloadedState: { user: dummyAuth },
    });
    await waitFor(async () => {
      expect(mockRouter.pathname).toBe('/logged-in');
    });
  });
  it('Link to Logged-In', async () => {
    mockRouter.push('/');
    const { getByTestId } = renderWithStore(<PageHome />);
    const btnRedirect = getByTestId('link-sign-in');
    act(() => {
      fireEvent.click(btnRedirect);
    });
    await waitFor(async () => {
      expect(mockRouter.pathname).toBe('/sign-in');
    });
  });
});
