import React from 'react';

import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';

import { render, fireEvent, waitFor } from '@testing-library/react';

import Authenticator from './index';

type authLoginBodyType = {
  username: string;
  password: string;
};

const handlers = [
  http.post('https://dummyjson.com/auth/login', async ({ request }) => {
    const { username, password } = (await request.json()) as authLoginBodyType;
    await delay(150);
    if (username === 'correct@email.com' && password === 'correct') {
      return HttpResponse.json(
        {
          id: 15,
          username: 'kminchelle',
          email: 'kminchelle@qq.com',
          firstName: 'Jeanne',
          lastName: 'Halvorson',
          gender: 'female',
          image: 'https://robohash.org/autquiaut.png?size=50x50&set=set1',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZz9zaXplPTUweDUwJnNldD1zZXQxIiwiaWF0IjoxNjM1NzczOTYyLCJleHAiOjE2MzU3Nzc1NjJ9.n9PQX8w8ocKo0dMCw3g8bKhjB8Wo7f7IONFBDqfxKhs',
        },
        { status: 200 }
      );
    }
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Authenticator', () => {
  it('should render successfully', async () => {
    const onSuccess = jest.fn();
    const onFailure = () => {};
    const { findByTestId } = render(
      <Authenticator onSuccess={onSuccess} onFailure={onFailure} />
    );

    const fieldEmail = await findByTestId('auth-email');
    const fieldPassword = await findByTestId('auth-password');
    const btnSubmit = await findByTestId('auth-submit');
    fireEvent.change(fieldEmail, { target: { value: 'correct@email.com' } });
    fireEvent.change(fieldPassword, { target: { value: 'correct' } });
    fireEvent.click(btnSubmit);
    await waitFor(() => {
      expect(onSuccess.mock.calls.length).toBe(1);
    });
    // expect(baseElement).toBeTruthy();
  });
});
