import React from 'react';
import ReactDOM from 'react-dom';
import { expect, assert } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Main from '../lib/components/app.jsx';

describe('Main', () => {
  it('can mount with no properties', () => {
    const wrapper = shallow(<Main />);
  });
});
