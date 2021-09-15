import Input from "../Input/Input";
import Button from "../Button/Button";

export default function List({
  value,
  edit,
  delate,
  onDelate,
  onEdit,
  onChange,
  readOnly,
  save,
  style,
  done,
  onActiveToggle,
}) {
  return (
    <div>
      <Input
        style={style}
        readOnly={readOnly}
        value={value}
        onChange={onChange}
      />
      <Button text={edit} handleClick={onEdit} />
      {/* <Button text={save} handleClick={onSave} /> */}
      <Button text={delate} handleClick={onDelate} />
      <Button text={done} handleClick={onActiveToggle} />
    </div>
  );
}
