import React from 'react';

import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';

import { render, fireEvent, waitFor, act } from '@testing-library/react';

import Authenticator from './index';

type authLoginBodyType = {
  username: string;
  password: string;
};

const handlers = [
  http.post('https://dummyjson.com/auth/login', async ({ request }) => {
    const { username, password } = (await request.json()) as authLoginBodyType;
    await delay(10);
    if (username === 'correct' && password === 'correct') {
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
        } as object,
        { status: 200 }
      );
    }
    return HttpResponse.json({ message: 'Broke!' } as object, { status: 500 });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Authenticator', () => {
  it('Correct Credentials', async () => {
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
      expect(onSuccess).toHaveBeenCalled();
    });
  });
  it('Wrong Credentials', async () => {
    const onSuccess = jest.fn();
    const onFailure = () => {};
    const { findByTestId } = render(
      <Authenticator onSuccess={onSuccess} onFailure={onFailure} />
    );

    await act(async () => {
      const fieldEmail = await findByTestId('auth-email');
      fireEvent.change(fieldEmail, { target: { value: 'correct@email.com' } });
    });
    await act(async () => {
      const fieldPassword = await findByTestId('auth-password');
      fireEvent.change(fieldPassword, { target: { value: 'wrongpassword' } });
    });
    await act(async () => {
      const btnSubmit = await findByTestId('auth-submit');
      fireEvent.click(btnSubmit);
    });

    await waitFor(async () => {
      await Promise.resolve();
    });
    await waitFor(async () => {
      const textError = await findByTestId('auth-error');
      expect(textError).toBeTruthy();
    });
  });
  it('Invalid Credentials', async () => {
    const onSuccess = jest.fn();
    const onFailure = () => {};
    const { findByTestId } = render(
      <Authenticator onSuccess={onSuccess} onFailure={onFailure} />
    );

    await act(async () => {
      const fieldEmail = await findByTestId('auth-email');
      fireEvent.change(fieldEmail, { target: { value: 'a@a.a' } });
    });
    await act(async () => {
      const fieldPassword = await findByTestId('auth-password');
      fireEvent.change(fieldPassword, { target: { value: 'b' } });
    });
    await act(async () => {
      const btnSubmit = await findByTestId('auth-submit');
      fireEvent.click(btnSubmit);
    });

    await waitFor(async () => {
      await Promise.resolve();
    });
    await waitFor(async () => {
      const textErrorEmail = await findByTestId('auth-error-email');
      expect(textErrorEmail).toBeTruthy();
    });
    await waitFor(async () => {
      const textErrorPassword = await findByTestId('auth-error-password');
      expect(textErrorPassword).toBeTruthy();
    });
  });
});
