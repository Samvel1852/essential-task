import styles from "./Button.module.css";

export default function Button({ handleClick, text, style }) {
  return (
    <button style={style} className={styles.button} onClick={handleClick}>
      {text}
    </button>
  );
}
