import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import styled from 'styled-components';
import Loading from './components/Loading';

const PointSlate = styled.div.attrs({
  className: 'blankslate',
})`
  max-width: 1150px;
  margin: 0 auto;
`;

const Point = styled.h2.attrs({
  className: 'mb-1',
})`
  font-size: 300px;
`;

const defaultHistory = createBrowserHistory();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      point: "100",
      loading: true,
    };
  }

  componentDidMount() {
    const host = process.env.REACT_APP_API_HOST;
    fetch(`${host}/api/points/sum`, {
      method: "GET",
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    })
      .then((result) => result.json())
      .then((response) => {
        this.setState({
          point: response.message,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({ loading: false, error: true });
      });
  }

  render() {
    const { point, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <Router history={this.props.history || defaultHistory}>
        <PointSlate>
          <Point>{point}</Point>
        </PointSlate>
      </Router>
    );
  }
}

export default App;
