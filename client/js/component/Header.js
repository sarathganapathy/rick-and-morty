import React from "react";
import PropTypes from "prop-types";
import i18n from "../i18n";
import { SORT_ORDER } from "../constants";

/**
 * @desc this functions handles the search input  change.
 * @param {function} searchInputChange function sent from parent as prop
 * @returns {function} onchange handler function.
*/
const handleSearchInputChange = searchInputChange => (event) => {
  searchInputChange(event.target.value);
};

/**
 * @desc this functions handles the sort order selection change.
 * @param {function} sortSelectionChange function sent from parent as prop
 * @returns {function} onchange handler function.
 */
const handleSortSelectionChange = sortSelectionChange => (event) => {
  sortSelectionChange(event.target.value);
};

/**
 * @func Header
 * @desc This is the function for header component which contains search and sort selection elements.
 */
const Header = ({ searchInputChange, sortSelectionChange, defaultSortValue }) => (
  <header className="header util-background-container">
    <div className="header-subsection">
      <h3 id="search-label" className="header-label util-header-text">{i18n.SEARCH_BY_NAME}</h3>
      <div className="header-fields">
        <input type="text" aria-labelledby="search-label" className="header-search-input" onChange={handleSearchInputChange(searchInputChange)} />
        <button className="header-search-button" type="button" aria-label="Search">{i18n.SEARCH}</button>
      </div>
    </div>
    <div className="header-subsection">
      <h3 id="sort-label" className="header-label util-header-text">{i18n.SORT_BY_ID}</h3>
      <div className="header-fields">
        <select type="text" aria-labelledby="sort-label" onChange={handleSortSelectionChange(sortSelectionChange)} defaultValue={defaultSortValue}>
          <option value={SORT_ORDER.ASCENDING}>{i18n.ASCENDING}</option>
          <option value={SORT_ORDER.DESCENDING}>{i18n.DESCENDING}</option>
        </select>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  sortSelectionChange: PropTypes.func.isRequired,
  searchInputChange: PropTypes.func.isRequired,
  defaultSortValue: PropTypes.oneOf([SORT_ORDER.ASCENDING, SORT_ORDER.DESCENDING])
};

Header.defaultProps = {
  defaultSortValue: SORT_ORDER.ASCENDING
};

export default Header;
