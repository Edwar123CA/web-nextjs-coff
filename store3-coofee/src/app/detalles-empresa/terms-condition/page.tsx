import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import React from 'react';

const TerminosCondiciones = () => {
    return (
        <div>
            <Navbar/>
            <section className="mx-auto max-w-screen-lg bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        Términos y Condiciones
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Los siguientes Términos y Condiciones rigen tu acceso y uso de los servicios ofrecidos por <span className="font-semibold text-blue-600">Scuti Company</span>. Al utilizar nuestros servicios, aceptas estos términos en su totalidad.
                    </p>
                    <div className="text-left space-y-6">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Aceptación de los Términos</h3>
                        <p className="text-gray-600 mb-4">
                            Al acceder o utilizar nuestros servicios, aceptas cumplir con estos Términos y Condiciones y cualquier otra política o directriz aplicable.
                        </p>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. Uso de los Servicios</h3>
                        <p className="text-gray-600 mb-4">
                            Te comprometes a usar nuestros servicios únicamente para fines legales y de acuerdo con nuestras políticas. No debes usar nuestros servicios para realizar actividades ilegales o que infrinjan derechos de terceros.
                        </p>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. Propiedad Intelectual</h3>
                        <p className="text-gray-600 mb-4">
                            Todos los derechos de propiedad intelectual relacionados con nuestros servicios, incluyendo pero no limitados a marcas, copyrights y patentes, son propiedad de Scuti Company o de sus licenciatarios.
                        </p>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">4. Limitación de Responsabilidad</h3>
                        <p className="text-gray-600 mb-4">
                            En la medida permitida por la ley, Scuti Company no será responsable por daños directos, indirectos, incidentales o consecuentes que resulten del uso de nuestros servicios.
                        </p>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">5. Modificaciones</h3>
                        <p className="text-gray-600 mb-4">
                            Nos reservamos el derecho a modificar estos Términos y Condiciones en cualquier momento. Cualquier cambio será efectivo al momento de su publicación.
                        </p>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">6. Contacto</h3>
                        <p className="text-gray-600 mb-4">
                            Si tienes preguntas sobre estos Términos y Condiciones, por favor contáctanos a través de nuestro correo electrónico: <a href="mailto:support@scuticompany.com" className="text-blue-600 hover:underline">support@scuticompany.com</a>.
                        </p>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default TerminosCondiciones;
