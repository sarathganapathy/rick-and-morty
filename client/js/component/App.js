import React, { Component } from 'react';
import Header from './Header';
import CardLayout from './CardLayout';
import getInitialData from '../data';
import { getFormatedShowResults, getFilteredData, getSortedData } from './helper/utils';
import { SORT_ORDER } from "../constants";

/**
 * @class App
 * @desc This is the main class which displays the shows and filters
 */
class App extends Component {
  // initial state value
  state = {
    initialShowData: [],
    results: [],
    sortOrder: SORT_ORDER.ASCENDING
  }

  /**
   * @inheritdoc
   */
  componentDidMount() {
    const { sortOrder } = this.state;
    getInitialData().then((shows) => {
      const showDetails = getFormatedShowResults(shows.data.results, sortOrder);
      this.setState({ results: showDetails, initialShowData: showDetails });
    });
  }

  /** This functions handles search input change.
   * @returns {undefined} does not return any value.
   */
  handleSearchInputChange = (searchString) => {
    const { sortOrder, initialShowData } = this.state;
    this.setState(
      { results: getFilteredData(initialShowData, searchString, sortOrder) }
    );
  };

  /**
   * @desc this functions handles the sort order selection change.
   * @returns {undefined} does not return any value.
   */
  handleSortSelectionChange = (sortOrder = SORT_ORDER.ASCENDING) => {
    const { results } = this.state;
    this.setState(
      { results: getSortedData(results, sortOrder), sortOrder }
    );
  };

  /**
   * @inheritdoc
   */
  render() {
    const { results } = this.state;
    return (
      <>
        <Header
          searchInputChange={this.handleSearchInputChange}
          sortSelectionChange={this.handleSortSelectionChange}
          defaultSortValue={SORT_ORDER.ASCENDING}
        />
        <CardLayout shows={results} />
      </>
    );
  }
}

export default App;
