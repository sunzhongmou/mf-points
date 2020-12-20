import React from 'react';
import styled from 'styled-components';

const Animation = styled.span.attrs({
  type: 'text',
  className: 'AnimatedEllipsis',
})``;

const Load = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => (
  <Load>
    <h2>
      <span>加载中</span>
      <Animation />
    </h2>
  </Load>
);

export default Loading
