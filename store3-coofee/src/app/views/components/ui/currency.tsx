"use client";

interface CurrencyProps {
  value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({
  value = 0
}) => {
  // Puedes ajustar el formato según tus necesidades
  const formatter = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  });

  return ( 
    <div className="font-semibold text-lg text-gray-700">
      {formatter.format(Number(value))}
    </div>
  );
}

export default Currency;
