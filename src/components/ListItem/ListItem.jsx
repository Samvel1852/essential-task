import Input from "../Input/Input";
import Button from "../Button/Button";
import React, { createContext, useRef } from "react";

export default function ListItem({
  value,
  edit,
  delate,
  onDelate,
  onEdit,
  onChange,
  readOnly,
  style,
  done,
  onActiveToggle,
}) {
  const editRef = useRef();

  return (
    <div>
      <Input
        style={style}
        readOnly={readOnly}
        value={value}
        onChange={onChange}
        editRef={editRef}
      />
      <Button editRef={editRef} text={edit} handleClick={onEdit} />
      <Button text={delate} handleClick={onDelate} />
      <Button text={done} handleClick={onActiveToggle} />
    </div>
  );
}
