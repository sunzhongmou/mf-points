import React from 'react';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import styled from 'styled-components';
import Loading from './components/Loading';
import './App.css';

const PointSlate = styled.div.attrs({
  className: 'blankslate',
})`
  max-width: 1150px;
  margin: 0 auto;
`;

const Point = styled.h2.attrs({
  className: 'mb-1 rainbow',
})`
  font-size: 300px;
`;

const defaultHistory = createBrowserHistory();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: {
        point: '',
        description: '',
        subjectName: '数学'
      },
      records: [],
      point: "100",
      loading: true,
      submitted: false,
      serving: false,
      validationPassed: false,
      error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValidationPassed = this.isValidationPassed.bind(this)
  }
  
  handleChange(event) {
    const { name, value } = event.target;
    const { record } = this.state;
    this.setState({
      record: {
        ...record,
        [name]: value
      }}, this.isValidationPassed);
  }
  
  isValidationPassed() {
    const { record } = this.state;
    if (record.point && record.description && record.subjectName) {
      this.setState({
        validationPassed: true
      });
      return true
    }
    return false
  }

  handleResponse(response) {
    return response.json().then(json => {
      const data = json;
      if (!response.ok) {
        if (response.status === 401) {
          console.log("Not login");
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    if (this.isValidationPassed()) {
      this.setState({serving: true});
      const { record } = this.state;
      
      let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
        body: JSON.stringify(record)
      };

      return fetch(`${process.env.REACT_APP_API_HOST}/api/points/`, requestOptions)
        .then(this.handleResponse)
        .then(res => {
          this.setState({
            record: {
              ...record,
              point: '',
              description: ''
            },
            serving: false,
            submitted: false,
            validationPassed: false
          });
          this.refreshPoint();
          this.refreshRecords();
        })
        .catch(error => {
          console.log(error)
        });
    }
  }

  componentDidMount() {
    this.refreshPoint();
    this.refreshRecords();
  }
  
  refreshPoint() {
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
        this.setState({loading: false, error: true});
      });
  }

  refreshRecords() {
    fetch(`${process.env.REACT_APP_API_HOST}/api/points?page=0&size=30`, {
      method: "GET",
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    })
      .then((result) => result.json())
      .then((response) => {
        console.log(response.content);
        this.setState({
          records: response.content,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({loading: false, error: true});
      });
  }

  render() {
    const {record, records, point, loading, submitted, serving, validationPassed, error} = this.state;

    if (loading) {
      return <Loading/>;
    }

    if (error) {
      return (
        <PointSlate>
          Sorry, but the Points query service is unavailable right now
        </PointSlate>
      );
    }

    function renderRecordIcon(point) {
      if (point < 0) {
        return <div className="TimelineItem-badge bg-purple text-white">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="octicon">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM5 8a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM5.32 9.636a.75.75 0 011.038.175l.007.009a1.82 1.82 0 00.35.31c.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371a1.82 1.82 0 00.35-.31l.007-.008a.75.75 0 011.222.87l-.614-.431c.614.43.614.431.613.431v.001l-.001.002-.002.003-.005.007-.014.019a1.989 1.989 0 01-.184.213 3.32 3.32 0 01-.53.445A3.766 3.766 0 018 12c-.946 0-1.652-.308-2.126-.63a3.323 3.323 0 01-.673-.604 1.975 1.975 0 01-.042-.053l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 01.183-1.044z"></path>
          </svg>
        </div>;
      } else {
        return <div className="TimelineItem-badge bg-green text-white">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="octicon">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM5 8a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM5.32 9.636a.75.75 0 011.038.175l.007.009a1.82 1.82 0 00.35.31c.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371a1.82 1.82 0 00.35-.31l.007-.008a.75.75 0 011.222.87l-.614-.431c.614.43.614.431.613.431v.001l-.001.002-.002.003-.005.007-.014.019a1.989 1.989 0 01-.184.213 3.32 3.32 0 01-.53.445A3.766 3.766 0 018 12c-.946 0-1.652-.308-2.126-.63a3.323 3.323 0 01-.673-.604 1.975 1.975 0 01-.042-.053l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 01.183-1.044z"></path>
          </svg>
        </div>;
      }
    }

    return (
      <Router history={this.props.history || defaultHistory}>
        <PointSlate>
          <Point>{point}</Point>

          <form onSubmit={this.handleSubmit}>
            <div className="form-group required mt-1 record-row">
              <dt className="form-group-header"><label>科目</label></dt>
              <dd className="form-group-body">
                <select className="form-select" aria-label="Important decision"
                        name="subjectName" value={record.subjectName} onChange={this.handleChange}>
                  <option value="语文">语文</option>
                  <option value="数学">数学</option>
                  <option value="体育">体育</option>
                  <option value="音乐">音乐</option>
                  <option value="美术">美术</option>
                  <option value="奖励">奖励</option>
                </select>
              </dd>
            </div>
            <span className="pt-4 mx-2 f2 mt-1">/</span>
            <div className={'form-group mt-1 required record-row' + (submitted && !record.point ? ' errored' : '')}>
              <dt className="input-label"><label>分数</label></dt>
              <dd>
                <input className="form-control js-repo-name input-point" id="point-input" type="number"
                       name="point" value={record.point} onChange={this.handleChange}
                       aria-describedby="point-input-validation"/>
                <p className="note error" id="point-input-validation">不能为空</p>
              </dd>
            </div>
            <span className="pt-4 mx-2 f2 mt-1 ">/</span>
            <div className={'form-group mt-1 required record-row'  + (submitted && !record.description ? ' errored' : '')}>
              <dt className="input-label"><label>描述</label></dt>
              <dd>
                <input className="form-control js-repo-name input-desc" id="desc-input" type="text"
                       name="description" value={record.description} onChange={this.handleChange}
                       aria-describedby="desc-input-validation"/>
                <p className="note error" id="desc-input-validation">不能为空</p>
              </dd>
            </div>
            <div className="form-group mt-1 record-row">
              <dd className="pt-btn">
                <button className="btn btn-primary" aria-disabled={!validationPassed}>提交</button>
                {serving && <img id="submit-status" alt='' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>}
              </dd>
            </div>
          </form>

          <div className="timeline-group">
            {records.map((record) => (
              <div className="TimelineItem" key={record.id}>
                  {renderRecordIcon(record.point)}
                <div className="TimelineItem-body">
                  {new Date(record.createdAt).toLocaleDateString() + ', ' + record.point + ', ' + record.description}
                </div>
              </div>
            ))}
            
          </div>

        </PointSlate>
      </Router>
    );
  }
}

export default App;
