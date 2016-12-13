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

  it('should have a const of WeatherCard', () => {
    const wrapper = shallow(<Main />);
    const WeatherCards = wrapper.find('WeatherCards');
    expect(WeatherCards).to.have.length(1);
  });

  it('should have a const of Weather', () => {
    const wrapper = shallow(<Main />);
    const Weather = wrapper.find('Weather');
    expect(Weather).to.have.length(0);
  });

  it('should have a render function', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find('.WeatherReport')).to.have.length(1);
  })
  // 
  // it('should should take a location', () => {
  //   const wrapper = shallow(<Main />);
  //   const input = wrapper.find('.search-input');
  //   const search = wrapper.find('button');
  //   input.simulate('change', { target: { value: 'denver' } });
  //   search.simulate('click');
  //   // console.log(wrapper.state());
  //   expect(wrapper.state().location).to.equal('denver');
  // });
});
