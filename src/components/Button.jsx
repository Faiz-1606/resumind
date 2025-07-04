const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        bg-black 
        text-white 
        font-[Varela_Round] 
        px-5 py-2 
        text-base font-medium 
        rounded-lg 
        border border-transparent 
        hover:border-indigo-400 
        focus:outline focus:outline-4px focus:outline-indigo-400
        transition duration-200
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
