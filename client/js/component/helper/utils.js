import i18n from '../../i18n';
import {
  DEFAULT_VALUE, SORT_ORDER, SORT_KEY
} from "../../constants";

/**
 * @desc function which returns a callback function to array.sort to sort the elements.
 * @param {String} sortOrder - sort order asc or desc
 * @param {String} sortKey - sorts the object based on key.
 * @return {Function} returns callback function for array sort
 */
const sortOnOrderAndKey = (sortOrder, sortKey) => (first, next) => {
  let firstKey = first[sortKey];
  let nextKey = next[sortKey];
  let sortReturnValue = 0;
  // when key is string
  if (typeof firstKey === "string" && typeof nextKey === "string") {
    firstKey = first[sortKey].toLowerCase();
    nextKey = next[sortKey].toLowerCase();
    if (firstKey > nextKey) {
      sortReturnValue = sortOrder === SORT_ORDER.ASCENDING ? 1 : -1;
    } else if (firstKey < nextKey) {
      sortReturnValue = sortOrder === SORT_ORDER.ASCENDING ? -1 : 1;
    }
    // when key is number
  } else {
    sortReturnValue = sortOrder === SORT_ORDER.ASCENDING ? firstKey - nextKey : nextKey - firstKey;
  }
  return sortReturnValue;
};

/**
 * @desc function returns duration in days/months/weeks/years from date string
 * @param {String} showResults - date string
 * @return {String} returns the duration
 */
const getDurationFromDate = (selectedDateString) => {
  const currentDate = new Date();
  const selectedDate = new Date(selectedDateString);
  if (currentDate < selectedDate) {
    return DEFAULT_VALUE.NO_RESULTS;
  }
  const dayDifference = Math.ceil(Math.abs(currentDate.getTime() - selectedDate.getTime()) / (1000 * 3600 * 24));
  const weekDifference = Math.floor(dayDifference / 7);

  let monthDifference = (currentDate.getFullYear() - selectedDate.getFullYear()) * 12;

  monthDifference -= selectedDate.getMonth() + 1;
  monthDifference += currentDate.getMonth() + 1;
  monthDifference = Math.abs(monthDifference);
  const yearDifference = Math.abs(currentDate.getFullYear() - selectedDate.getFullYear());

  // eslint-disable-next-line no-nested-ternary
  return yearDifference ? `${yearDifference} ${i18n.YEARS}` : false
    || monthDifference ? `${monthDifference} ${i18n.MONTHS}` : false
      || weekDifference ? `${weekDifference} ${i18n.WEEKS}` : false
      || `${dayDifference} ${i18n.DAYS}`;
};

/**
 * @desc function returns formated show results
 * @param {Array} showResults - raw show results form api
 * @return {Array} formated show results
 */
export const getFormatedShowResults = (showResults, sortOrder) => showResults
  .map(show => ({
    name: show.name,
    id: show.id,
    status: show.status || DEFAULT_VALUE.NO_RESULTS,
    species: show.species || DEFAULT_VALUE.NO_RESULTS,
    gender: show.gender || DEFAULT_VALUE.NO_RESULTS,
    origin: show.origin.name || DEFAULT_VALUE.NO_RESULTS,
    lastLocation: show.location.name || DEFAULT_VALUE.NO_RESULTS,
    imageURL: show.image || "",
    creationDate: getDurationFromDate(show.created)
  })).sort(sortOnOrderAndKey(sortOrder, SORT_KEY.ID));

/**
 * @desc function returns the sorted data based on sort order
 * @param {Array} results - shows
 * @param {String} sortOrder - sort oder asc/desc
 * @return {Array} sorted results
 */
export const getSortedData = (results, sortOrder) => results.slice().sort(sortOnOrderAndKey(sortOrder, SORT_KEY.ID));

/**
 * @desc function filters data based on search string and returns the sorted results
 * @param {Array} results - shows
 * @param {String} searchString - search string
 * @param {String} sortOrder - sort oder asc/desc
 * @return {Array} sorted results
 */
export const getFilteredData = (results, searchString, sortOrder) => results.slice()
  .filter(item => new RegExp(`${searchString}`, 'i').test(item.name))
  .sort(sortOnOrderAndKey(sortOrder, SORT_KEY.ID));
