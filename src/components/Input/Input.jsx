import React from "react";
import styles from "./Input.module.css";
export default function Input({
  type,
  onChange,
  onClick,
  value,
  readOnly,
  style,
  placeholder,
  editRef,
}) {
  return (
    <input
      style={style}
      className={styles.input}
      type={type}
      onChange={onChange}
      onClick={onClick}
      value={value}
      readOnly={readOnly}
      style={style}
      placeholder={placeholder}
      ref={editRef}
    ></input>
  );
}
