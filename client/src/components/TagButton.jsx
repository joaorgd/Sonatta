import React from 'react';

function TagButton({ children, onClick, isSelected }) {
  // Define as classes com base no estado 'isSelected'
  const baseClasses = "px-4 py-2 rounded-full font-semibold transition duration-300 ease-in-out cursor-pointer text-center";
  
  const variantClasses = isSelected
    ? "bg-white text-dark-bg border border-white" // Estilo Selecionado
    : "bg-dark-gray text-white-text border border-gray-700 hover:bg-gray-700"; // Estilo Padrão

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
    >
      {children}
    </button>
  );
}

export default TagButton;