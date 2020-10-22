import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../i18n';

/**
 * Function to load the original image once image object loads
 * @param { Object } event - event object
 * @returns { undefined } does not returns any value
 */
const imageLoadHandler = (event) => {
  const image = event.target;
  image.setAttribute("src", image.getAttribute("data-src"));
};

/**
 * Function returns the card row content
 * @param {String} label - row label
 * @param {String} value - row value
 * @returns {Element} Element containing row details
 */
const getCardRow = (label, value) => (
  <div className="image-card-row">
    <span className="image-card-row-label util-font-label">{label}</span>
    <span className="image-card-row-value util-font-label util-text-right-align">{value}</span>
  </div>
);

/**
 * returns the card image element
 * @param {String} name - show name
 * @param {Number} id - show id
 * @param {String} creationDate - show creation date
 * @param {String} imageURL - show image url
 * @returns {Element} returns the card content element
 */
const getCardImage = (
  name, id, creationDate, imageURL
) => (
  <div className="image-card-media-container">
    <img
      src="./assets/loading-indicator.jpg"
      data-src={imageURL}
      alt={name}
      className="image-card-media"
      onLoad={imageLoadHandler}
    />
    <div className="image-card-details">
      <h1 className="image-card-title">{name}</h1>
      <span className="image-card-sub-title">
        { i18n.ID_CREATION.replace("{0}", id).replace("{1}", creationDate)}
      </span>
    </div>
  </div>
);

/**
 * returns the card content element
 * @param {String} status - show status
 * @param {String} species - species
 * @param {String} gender - gender
 * @param {String} origin - origin
 * @param {String} lastLocation - lastLocation
 * @returns {Element} returns the card content element
 */
const getCardContent = (status, species, gender, origin, lastLocation) => (
  <div>
    {getCardRow(i18n.STATUS, status)}
    {getCardRow(i18n.SPECIES, species)}
    {getCardRow(i18n.GENDER, gender)}
    {getCardRow(i18n.ORIGIN, origin)}
    {getCardRow(i18n.LAST_LOCATION, lastLocation)}
  </div>
);

/**
 * @class EventCard
 * @desc This is the class for rendering event card.
 */
const ImageCard = ({
  name, id, creationDate, imageURL, status, species, gender, origin, lastLocation
}) => (
  <article className="image-card-root" tabIndex="0">
    <div className="image-card-inner-layer">
      {getCardImage(
        name, id, creationDate, imageURL
      )}
      <div className="image-card-content">
        {getCardContent(status, species, gender, origin, lastLocation)}
      </div>
    </div>

  </article>
);

ImageCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  creationDate: PropTypes.string,
  imageURL: PropTypes.string,
  status: PropTypes.string,
  gender: PropTypes.string,
  species: PropTypes.string,
  origin: PropTypes.string,
  lastLocation: PropTypes.string
};

ImageCard.defaultProps = {
  creationDate: "--",
  imageURL: "",
  gender: "",
  status: "--",
  species: "--",
  origin: "--",
  lastLocation: "--"
};

export default ImageCard;
