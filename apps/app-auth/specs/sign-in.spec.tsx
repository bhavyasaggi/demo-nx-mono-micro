import React from 'react';
import { render } from '@testing-library/react';

import PageSignIn from '../pages/sign-in';

describe('PageSignIn', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageSignIn />);
    expect(baseElement).toBeTruthy();
  });
});
