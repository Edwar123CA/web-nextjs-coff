import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import React from 'react';

const SobreNosotros = () => {
  return (
    <div>
      <Navbar/>
      <section className="mx-auto max-w-screen-lg bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sobre Scuti Company
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            En <span className="font-semibold text-blue-600">Scuti Company</span>, nos especializamos en la creación de soluciones digitales a medida que transforman la forma en que interactúas con el mundo en línea. Desde el desarrollo de páginas web y sistemas hasta la implementación de estrategias personalizadas, ofrecemos una gama completa de servicios para satisfacer todas tus necesidades tecnológicas.
          </p>
          <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-12">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6 lg:mb-0 lg:w-1/3">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Nuestro Enfoque</h3>
              <p className="text-gray-600">
                En Scuti Company, nuestro enfoque se basa en entender tus necesidades únicas para entregar soluciones que no solo cumplan con tus expectativas, sino que las superen. Aplicamos las mejores prácticas en diseño y desarrollo web para garantizar la máxima funcionalidad y estética.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6 lg:mb-0 lg:w-1/3">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Nuestros Servicios</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Desarrollo de Páginas Web</li>
                <li>Sistemas Personalizados</li>
                <li>Optimización de SEO</li>
                <li>Consultoría Tecnológica</li>
                <li>Soporte y Mantenimiento</li>
              </ul>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 lg:w-1/3">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Nuestro Compromiso</h3>
              <p className="text-gray-600">
                Nos comprometemos a proporcionar un servicio excepcional, con atención al detalle y un enfoque proactivo para resolver cualquier desafío. Tu éxito es nuestra prioridad, y trabajamos arduamente para ofrecerte soluciones que impulsen tu negocio hacia el futuro.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default SobreNosotros;
