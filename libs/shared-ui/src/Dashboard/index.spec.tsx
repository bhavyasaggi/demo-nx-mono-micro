import React from 'react';
import { render } from '@testing-library/react';

import Dashboard from './index';

describe('Dashboard', () => {
  it('should render successfully', () => {
    const { container } = render(
      <Dashboard
        id={15}
        email="kminchelle@qq.com"
        firstName="Jeanne"
        lastName="Halvorson"
        gender="female"
        image="https://robohash.org/autquiaut.png?size=50x50&set=set1"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
