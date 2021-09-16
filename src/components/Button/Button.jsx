import PropTypes from "prop-types";

import { buttonTypes } from "../../constants/utils";
import styles from "./Button.module.css";

export default function Button({ handleClick, text, style, editRef }) {
  const handleInputFocus = () => {
    if (text === buttonTypes.edit) {
      editRef.current.focus();
    }
  };

  return (
    <button
      style={style}
      className={styles.button}
      onClick={() => {
        handleClick();
        handleInputFocus();
      }}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  editRef: PropTypes.object,
  style: PropTypes.object,
};
