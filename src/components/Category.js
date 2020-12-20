import React from 'react';
import {
  ADD_SUB_WITHIN_TEN, ADD_SUB_WITHIN_TWENTY, ADD_SUB_WITHIN_TWENTY_WITH_OPERANDS_IN_TEN,
  ADD_WITHIN_TEN, ADD_WITHIN_TWENTY_WITH_OPERANDS_IN_TEN,
  ADD_WITHIN_TEN_FILL, ADD_WITHIN_TWENTY, ADD_WITHIN_TWENTY_FILL,
  SUB_WITHIN_TEN,
  SUB_WITHIN_TEN_FILL, SUB_WITHIN_TWENTY, SUB_WITHIN_TWENTY_FILL,
} from '../helper';

class Category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.setCategory = props.setCategory;
  }

  handleClick(e) {
    e.preventDefault();
    const topic = e.target.getAttribute('data-name');
    this.setState({ topic: topic });
    this.setCategory(topic);
  }

  render() {
    return (
      <nav className="d-none d-lg-block col-lg-2 float-lg-left pl-3 pl-md-0 pr-3 pr-md-5 pt-3 pt-md-2 pb-md-6">
        <h4 className="text-mono mb-3 text-normal">类别</h4>
        <ul className="list-style-none mb-4">
          <li>
            <span
              className="muted-link filter-item py-2 mb-0"
              data-ga-click="Category, text:ADD_SUB_WITHIN_TWENTY_WITH_OPERANDS_IN_TEN"
              onClick={this.handleClick}
              data-name={ADD_SUB_WITHIN_TWENTY_WITH_OPERANDS_IN_TEN}
            >
              20以内加减法(10)
            </span>
          </li>
          <li>
            <span
              className="muted-link filter-item py-2 mb-0"
              data-ga-click="Category, text:ADD_WITHIN_TWENTY_WITH_OPERANDS_IN_TEN"
              onClick={this.handleClick}
              data-name={ADD_WITHIN_TWENTY_WITH_OPERANDS_IN_TEN}
            >
              20以内加法(10)
            </span>
          </li>
          <li>
            <span
              className="muted-link filter-item py-2 mb-0"
              data-ga-click="Category, text:ADD_SUB_WITHIN_TWENTY"
              onClick={this.handleClick}
              data-name={ADD_SUB_WITHIN_TWENTY}
            >
              20以内加减法
            </span>
          </li>
          <li>
            <span
              className="muted-link filter-item py-2 mb-0"
              data-ga-click="Category, text:ADD_SUB_WITHIN_TEN"
              onClick={this.handleClick}
              data-name={ADD_WITHIN_TWENTY}
            >
              20以内加法
            </span>
          </li>
          <li>
            <span
              className="muted-link filter-item py-2 mb-0"
              data-ga-click="Category, text:ADD_SUB_WITHIN_TEN"
              onClick={this.handleClick}
              data-name={ADD_WITHIN_TWENTY_FILL}
            >
              20以内加法填空
            </span>
          </li>
          <li>
            <span
              className="muted-link filter-item py-2 mb-0"
              data-ga-click="Category, text:ADD_SUB_WITHIN_TEN"
              onClick={this.handleClick}
              data-name={SUB_WITHIN_TWENTY}
            >
              20以内减法
            </span>
          </li>
          <li>
            <span
              className="muted-link filter-item py-2 mb-0"
              data-ga-click="Category, text:ADD_SUB_WITHIN_TEN"
              onClick={this.handleClick}
              data-name={SUB_WITHIN_TWENTY_FILL}
            >
              20以内减法填空
            </span>
          </li>
          <li>
            <span
              className="muted-link filter-item py-2 mb-0"
              data-ga-click="Category, text:ADD_SUB_WITHIN_TEN"
              onClick={this.handleClick}
              data-name={ADD_SUB_WITHIN_TEN}
            >
              10以内加减法
            </span>
          </li>
          <li>
            <span
              className="muted-link filter-item py-2 mb-0"
              data-ga-click="Category, text:ADD_SUB_WITHIN_TEN"
              onClick={this.handleClick}
              data-name={ADD_WITHIN_TEN}
            >
              10以内加法
            </span>
          </li>
          <li>
            <span
              className="muted-link filter-item py-2 mb-0"
              data-ga-click="Category, text:ADD_SUB_WITHIN_TEN"
              onClick={this.handleClick}
              data-name={ADD_WITHIN_TEN_FILL}
            >
              10以内加法填空
            </span>
          </li>
          <li>
            <span
              className="muted-link filter-item py-2 mb-0"
              data-ga-click="Category, text:ADD_SUB_WITHIN_TEN"
              onClick={this.handleClick}
              data-name={SUB_WITHIN_TEN}
            >
              10以内减法
            </span>
          </li>
          <li>
            <span
              className="muted-link filter-item py-2 mb-0"
              data-ga-click="Category, text:ADD_SUB_WITHIN_TEN"
              onClick={this.handleClick}
              data-name={SUB_WITHIN_TEN_FILL}
            >
              10以内减法填空
            </span>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Category;
