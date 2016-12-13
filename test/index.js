import React from 'react';
import ReactDOM from 'react-dom';
import { expect, assert } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Main from '../lib/components/app.jsx';

describe('Main', () => {
  it('can mount with no properties', () => {
    const wrapper = shallow(<Main />);
  });

  it('should check the state of weather within Main', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.state().weather).to.equal(null);
  });

  it('Main should start with a state of no locations', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.state().location).to.equal('');
  });

  it('should should take a location and ', () => {
    const wrapper = shallow(<Main />);
    // const input = wrapper.find('.search-input');
    const search = wrapper.find('button');
    // input.simulate('onChange', input.target.value='denver');
    search.simulate('click');
    console.log(wrapper.state());
    expect(wrapper.state().location).to.equal('denver');
  });
});
