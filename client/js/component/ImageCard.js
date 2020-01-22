import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../i18n';

/**
 * Function returns the card row content
 * @param {String} label - row label
 * @param {String} value - row value
 * @returns {Element} Element containg row details
 */
const getCardRow = (label, value) => (
  <div className="image-card-row">
    <div className="image-card-row-label util-font-label">{label}</div>
    <div className="image-card-row-value util-font-label util-text-right-align">{value}</div>
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
    <img src={imageURL} alt={name} className="image-card-media" />
    <div className="image-card-details">
      <div className="image-card-title">{name}</div>
      <div className="image-card-sub-title">
        { i18n.ID_CREATION.replace("{0}", id).replace("{1}", creationDate)}
      </div>
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
  <div className="image-card-root">
    <div className="image-card-inner-layer">
      {getCardImage(
        name, id, creationDate, imageURL
      )}
      <div className="image-card-content">
        {getCardContent(status, species, gender, origin, lastLocation)}
      </div>
    </div>

  </div>
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
