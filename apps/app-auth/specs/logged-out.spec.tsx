import React from 'react';
import { render } from '@testing-library/react';

import PageLoggedOut from '../pages/sign-in';

describe('PageLoggedOut', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageLoggedOut />);
    expect(baseElement).toBeTruthy();
  });
});
