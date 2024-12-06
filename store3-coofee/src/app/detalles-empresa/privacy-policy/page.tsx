import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import React from 'react';

const PoliticasPrivacidad = () => {
    return (
        <div>
            <Navbar/>
            <section className="mx-auto max-w-screen-lg bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        Políticas de Privacidad
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                        En <span className="font-semibold text-blue-600">Scuti Company</span>, valoramos tu privacidad y estamos comprometidos a proteger tus datos personales. Esta Política de Privacidad describe cómo recopilamos, usamos, y compartimos tu información cuando utilizas nuestros servicios.
                    </p>
                    <div className="text-left space-y-6">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Información que Recopilamos</h3>
                        <p className="text-gray-600 mb-4">
                            Recopilamos información que nos proporcionas directamente, como nombre, dirección de correo electrónico, y cualquier otra información que decidas compartir con nosotros. También podemos recopilar información automáticamente, como datos de navegación y el uso de nuestros servicios.
                        </p>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. Cómo Usamos Tu Información</h3>
                        <p className="text-gray-600 mb-4">
                            Utilizamos la información recopilada para proporcionarte nuestros servicios, mejorar tu experiencia, y comunicarnos contigo. También podemos usar tus datos para fines de marketing y promociones, siempre que hayas dado tu consentimiento.
                        </p>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. Compartición de Información</h3>
                        <p className="text-gray-600 mb-4">
                            No compartimos tu información personal con terceros sin tu consentimiento, excepto en casos necesarios para cumplir con la ley, procesar pagos, o proporcionar servicios en tu nombre.
                        </p>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">4. Seguridad</h3>
                        <p className="text-gray-600 mb-4">
                            Implementamos medidas de seguridad adecuadas para proteger tu información personal contra el acceso no autorizado, la alteración, divulgación o destrucción.
                        </p>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">5. Cambios en la Política</h3>
                        <p className="text-gray-600 mb-4">
                            Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre cualquier cambio significativo en la forma en que tratamos tu información personal.
                        </p>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">6. Contacto</h3>
                        <p className="text-gray-600 mb-4">
                            Si tienes alguna pregunta sobre nuestra Política de Privacidad, no dudes en contactarnos a través de nuestro correo electrónico: <a href="mailto:support@scuticompany.com" className="text-blue-600 hover:underline">support@scuticompany.com</a>.
                        </p>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default PoliticasPrivacidad;
