import React from 'react';
import styled from 'styled-components';
import QuestionCard from './QuestionCard';

const CardContainer = styled.div.attrs({
  className: 'container-lg clearfix',
})`
  display: flex;
  flex-wrap: wrap;
`;

const QuestionList = ({ questions }) => {
  return (
    <CardContainer>
      {questions.map((question, index) => (
        <QuestionCard key={index} question={question} />
      ))}
    </CardContainer>
  );
};

export default QuestionList;
