"use client";

import NextImage from "next/image";
import { Tab } from "@headlessui/react";
import { cn } from "@/libs/utils";
import { Image } from "../../../types";

// Define el componente GalleryTab dentro de Gallery para mantener todo en un solo archivo
const GalleryTab: React.FC<{ image: Image }> = ({ image }) => {
  return (
    <Tab
      className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white"
    >
      {({ selected }) => (
        <div className="relative h-full w-full">
          {/* Contenedor de Imagen */}
          <span className="block h-full w-full overflow-hidden rounded-md">
            <NextImage
              src={image.url}
              alt="Image"
              width={800}  // Ajusta según sea necesario
              height={800} // Ajusta según sea necesario
              className="object-cover"
            />
          </span>
          {/* Borde */}
          <span
            className={cn(
              'absolute inset-0 rounded-md border-2', // Usando border-4 en lugar de ring-2 para asegurar visibilidad
              selected ? 'border-black' : 'border-transparent'
            )}
          />
        </div>
      )}
    </Tab>

  );
};

interface GalleryProps {
  images: Image[];
}

const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className="aspect-square w-full">
        {images.map((image) => (
          <Tab.Panel key={image.id}>
            <div className="relative h-full w-full">
              <NextImage
                src={image.url}
                alt="Image"
                width={800}  // Ajusta según sea necesario
                height={800} // Ajusta según sea necesario
                className="object-cover rounded-lg" // Aquí se agrega la clase rounded-lg para bordes redondeados
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

export default Gallery;
