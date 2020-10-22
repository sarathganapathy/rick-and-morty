import React from "react";
import PropTypes from "prop-types";
import ImageCard from "./ImageCard";
import NoResults from "./NoResults";
import i18n from "../i18n";

/**
 * @desc this functions returns the array of elements containing shows
 * @param {Array} shows - array containing show details
 * @returns {Array} Array of Elements containing ImageCard.
 */
const getShowCards = shows => (
  shows.map(({ id, ...show }) => (
    <div key={id} className="card-layout-body-content-items">
      <ImageCard id={id} {...show} />
    </div>
  ))
);

/**
 * @desc this functions returns label saying there is no shows available.
 * @returns {NoResults} return no results found component.
 */
const getNoShowsLabel = () => (
  <NoResults label={i18n.NO_SHOWS_AVAILABLE} classes="card-layout-body-content-no-results util-header-text" />
);

/**
 * @func CardLayout
 * @desc This is the function for displaying CardLayout containg image cards
 */
const CardLayout = (props) => {
  const { shows } = props;
  return (
    <main className="util-flex-wrap util-background-container card-layout">
      { shows.length ? getShowCards(shows) : getNoShowsLabel()}
    </main>
  );
};

CardLayout.propTypes = {
  shows: PropTypes.instanceOf(Array)
};

CardLayout.defaultProps = {
  shows: []
};

export default CardLayout;
