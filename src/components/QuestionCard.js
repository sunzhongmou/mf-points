import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = styled.div.attrs({
  className: 'col-2 float-left border p-3',
})`
  font-size: 21px;
  width: 20%;
`;

const QuestionCard = ({ question }) => <Card>{question}</Card>;

QuestionCard.propTypes = {
  question: PropTypes.string.isRequired,
};

export default QuestionCard;
