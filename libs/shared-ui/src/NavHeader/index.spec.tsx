import React from 'react';
import { render } from '@testing-library/react';

import NavHeader from '.';

describe('NavHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NavHeader />);
    expect(baseElement).toBeTruthy();
  });
});
