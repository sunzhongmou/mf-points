import React from 'react';
import { shallow } from 'enzyme';
import QuestionList from '../components/QuestionList';
import QuestionCard from '../components/QuestionCard';

const questions = ['1 + 2 =', '1 + 3 =', '1 + 4 ='];

describe('Question list scenarios', () => {
  it('given questions when render then number of expression shows', () => {
    const questionList = shallow(<QuestionList questions={questions} />);
    const questionCards = questionList.find('QuestionCard');
    expect(questionCards).toHaveLength(questions.length);
    expect(questionCards.at(0).prop('question')).toEqual(questions[0]);
    expect(questionCards.at(1).prop('question')).toEqual(questions[1]);
    expect(questionCards.at(2).prop('question')).toEqual(questions[2]);
  });
});
