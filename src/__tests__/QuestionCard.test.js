import React from 'react';
import { shallow } from 'enzyme';
import QuestionCard from '../components/QuestionCard';

describe('Question card scenarios', () => {
  it('given question when render then question assigned', () => {
    const wrapper = shallow(<QuestionCard question="1+2=" />);
    expect(wrapper.props().children).toEqual('1+2=');
  });
});
