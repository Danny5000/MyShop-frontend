function Input({ name, placeholder, type, required, value, onChange }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      className="border rounded py-1 w-80"
    />
  );
}

export default Input;
