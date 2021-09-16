import styles from "./Button.module.css";

export default function Button({ handleClick, text, style, editRef }) {
  const handleInputFocus = () => {
    if (text === "Edit") {
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
