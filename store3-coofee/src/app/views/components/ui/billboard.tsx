import React from 'react';

const allImageUrls = [
    "https://img.freepik.com/psd-gratis/diseno-especial-medios-sociales-cafe_505751-6239.jpg",
    "https://img.freepik.com/psd-premium/pastel-cafe-negro-maqueta-pizarra_23-2148363734.jpg",
    "https://img.freepik.com/psd-gratis/banner-web-promocional-venta-menu-cafe-especial-o-plantilla-banner-instagram_505751-3236.jpg",
    "https://img.freepik.com/psd-gratis/plantilla-poster-empaquetado-galletas-diseno-plano_23-2149385579.jpg",
    "https://img.freepik.com/psd-premium/mockup-flat-lay-marco-espacio-trabajo_23-2148199670.jpg",
    "https://img.freepik.com/psd-gratis/plantilla-volante-cuadrado-cafeteria_23-2148448469.jpg",
    "https://img.freepik.com/psd-gratis/promocion-menu-bebidas-cafeteria-redes-sociales-diseno-plantilla-banner-publicacion-instagram_84443-996.jpg",
    "https://img.freepik.com/psd-premium/comida-deliciosa-angulo-alto-mesa_23-2149687659.jpghttps://img.freepik.com/psd-gratis/plantilla-poster-cafeteria_23-2148715683.jpg",
];

// Duplicar las URLs para lograr un efecto continuo
const doubledImageUrls = [...allImageUrls, ...allImageUrls];

const Billboard = () => {
    return (
        <div className="p-4 sm:p-2 lg:p-2 rounded-xl overflow-hidden">
            <div className="relative overflow-hidden rounded-xl h-64 md:h-96 bg-gray-200">
                <div className="absolute inset-0 flex animate-slide-left">
                    <div className="flex w-[200%] h-full">
                        {doubledImageUrls.map((imageUrl, index) => {
                            console.log(`Rendering image: ${imageUrl}`); // Verificar que las URLs se están aplicando
                            return (
                                <div 
                                    key={index} 
                                    className="relative flex-shrink-0 w-80 h-full bg-cover bg-center" 
                                    style={{ backgroundImage: `url(${imageUrl})` }}
                                >
                                    <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                                        <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
                                            {/* Puedes agregar contenido aquí */}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Billboard;



// import React, { useEffect, useState } from 'react';

// const YourComponent = () => {
//   const [allImageUrls, setAllImageUrls] = useState([]);

//   useEffect(() => {
//     // Simulación de una llamada a una API para obtener las URLs
//     const fetchImageUrls = async () => {
//       const response = await fetch('https://api.ejemplo.com/imagenes');
//       const data = await response.json();
//       setAllImageUrls(data.imageUrls); // Asumiendo que la respuesta tiene un campo `imageUrls`
//     };

//     fetchImageUrls();
//   }, []);