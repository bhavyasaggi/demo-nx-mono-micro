import React from 'react';
import { render } from '@testing-library/react';

import PageLoggedIn from '../pages/sign-in';

describe('PageLoggedIn', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageLoggedIn />);
    expect(baseElement).toBeTruthy();
  });
});
