import React from 'react';
import { render } from '@testing-library/react';

import PageHome from '../pages/index';

describe('PageHome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageHome />);
    expect(baseElement).toBeTruthy();
  });
});
