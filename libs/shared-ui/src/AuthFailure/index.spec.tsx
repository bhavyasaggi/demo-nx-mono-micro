import React from 'react';
import { render } from '@testing-library/react';

import AuthFailure from '.';

describe('AuthFailure', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthFailure />);
    expect(baseElement).toBeTruthy();
  });
});
