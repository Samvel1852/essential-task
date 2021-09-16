import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import styles from "./Input.module.css";

export default function Input({
  type,
  onChange,
  value,
  readOnly,
  style,
  placeholder,
  editRef,
  isError,
}) {
  return (
    <input
      className={classNames(
        styles.input,
        { [styles.error]: isError },
        { [styles.main]: !isError }
      )}
      type={type}
      onChange={onChange}
      value={value}
      readOnly={readOnly}
      style={style}
      placeholder={placeholder}
      ref={editRef}
    ></input>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  readOnly: PropTypes.bool.isRequired,
  style: PropTypes.object,
  editRef: PropTypes.object,
  isError: PropTypes.bool,
};
