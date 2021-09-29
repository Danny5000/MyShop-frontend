function Button({ type, disabled, onClick, children }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="bg-green-600 text-gray-100 rounded px-4 py-2
      hover:bg-green-500 my-2 disabled:bg-gray-400"
    >
      {children}
    </button>
  );
}

export default Button;
