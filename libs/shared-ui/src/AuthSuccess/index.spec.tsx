import React from 'react';
import { render } from '@testing-library/react';

import AuthSuccess from '.';

describe('AuthSuccess', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthSuccess />);
    expect(baseElement).toBeTruthy();
  });
});
