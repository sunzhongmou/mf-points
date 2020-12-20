import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import styled from 'styled-components';
import Loading from './components/Loading';
import Category from './components/Category';
import QuestionList from './components/QuestionList';
import {ADD_SUB_WITHIN_TWENTY} from './helper';
import { userService } from './service/math.service';

const MainColumn = styled.div.attrs({
  className: 'col-lg-9',
})`
  max-width: 1150px;
  margin: 0 auto;
`;

const defaultHistory = createBrowserHistory();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: ADD_SUB_WITHIN_TWENTY,
      questions: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({
      questions: userService.getQuestions(this.state.category),
      loading: false,
    });
  }

  setCategory = (name) => {
    this.setState({
      questions: userService.getQuestions(name),
      loading: false,
      category: name,
    });
  };

  render() {
    const { questions, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <Router history={this.props.history || defaultHistory}>
        <MainColumn>
          <Category setCategory={this.setCategory} />
          <QuestionList questions={questions} />
        </MainColumn>
      </Router>
    );
  }
}

export default App;
