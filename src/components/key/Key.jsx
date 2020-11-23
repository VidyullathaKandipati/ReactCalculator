import React from 'react';
import PropTypes from 'prop-types';
import './Key.css';

const Key = ({ value, onClick, type }) => {
  return (
    <div
      className={`key ${value === "0" ? "zero" : ""} ${type || ""}`}
      onClick={() => onClick(value)}>
      {value}
    </div>
  );
};

Key.propTypes = {
  value: PropTypes.any,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

Key.defaultProps = {
  value: undefined,
  onClick: () => {},
  type: undefined,
};

export default Key;