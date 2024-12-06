import { ReactElement, MouseEventHandler } from "react";

interface IconButtonProps {
  icon: ReactElement;
  onClick?: MouseEventHandler<HTMLButtonElement>; // Añade onClick como prop opcional
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick, // Desestructuración de onClick
  className
}) => {
  return ( 
    <button 
      onClick={onClick} // Añade el manejador de eventos onClick
      className={`rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition ${className}`}
    >
      {icon}
    </button>
  );
}

export default IconButton;
