import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import React from 'react';

function Testimonials() {
    const testimonials = [
        {
            name: 'Pedro Alvarado',
            photo: 'https://randomuser.me/api/portraits/men/45.jpg',
            comment: 'El café es increíble, pero lo que más me gusta es la atención de las meseras. Siempre tan amables y atentas. Ya quiero regresar para probar más postres!',
        },
        {
            name: 'Juan Pérez',
            photo: 'https://randomuser.me/api/portraits/men/32.jpg',
            comment: 'De los mejores cafés que he probado. Además, la mesera que me atendió tenía una sonrisa tan linda que hizo que mi día fuera mucho mejor. Lo recomiendo!',
        },
        {
            name: 'María García',
            photo: 'https://randomuser.me/api/portraits/women/44.jpg',
            comment: 'Me encanta venir aquí, siempre hay algo nuevo que probar. Y los meseros son tan atentos, especialmente el que me atendió hoy, ¡tan simpático! Jajaj.',
        },
        {
            name: 'Carlos Rodríguez',
            photo: 'https://randomuser.me/api/portraits/men/85.jpg',
            comment: 'Un lugar increíble para relajarse. Los meseros son muy profesionales, y el café... ¡simplemente perfecto! Pronto volveré por otro café y esos deliciosos postres.',
        },
        {
            name: 'Sofía Martínez',
            photo: 'https://randomuser.me/api/portraits/women/68.jpg',
            comment: 'El ambiente aquí es maravilloso, y los baristas siempre tienen una sonrisa en la cara. Me encanta trabajar desde aquí con un buen café en mano. Nos vemos pronto!.',
        },
        {
            name: 'Luis Fernández',
            photo: 'https://randomuser.me/api/portraits/men/90.jpg',
            comment: 'Excelente lugar para disfrutar de un buen café. Además, la atención es de primera. El mesero que me atendió fue muy amable y servicial. Seguro que regreso pronto!',
        },
        {
            name: 'Ana López',
            photo: 'https://randomuser.me/api/portraits/women/91.jpg',
            comment: 'Este lugar siempre me sorprende. La mesera que me atendió hoy fue tan amable y atenta que hizo mi visita aún mejor. El café siempre es espectacular! Jjjaja.',
        },
        {
            name: 'Lucía Mendoza',
            photo: 'https://randomuser.me/api/portraits/women/33.jpg',
            comment: 'Cada visita es una experiencia nueva. Los sabores y el ambiente son perfectos para relajarse, y los meseros siempre te atienden con una sonrisa. Me encanta!',
        },
        {
            name: 'Diego Torres',
            photo: 'https://randomuser.me/api/portraits/men/60.jpg',
            comment: 'Siempre recomiendo este lugar a mis amigos. La atención es excelente, y los meseros hacen que te sientas como en casa. Siempre tienen algo nuevo y delicioso que probar!',
        },
        {
            name: 'Isabel Ramírez',
            photo: 'https://randomuser.me/api/portraits/women/47.jpg',
            comment: 'La calidad del café es excelente, y el personal es súper amable. El mesero de hoy fue tan simpático que no pude evitar sonreír durante toda la visita. Volveré pronto!',
        },
        {
            name: 'Fernando Castillo',
            photo: 'https://randomuser.me/api/portraits/men/29.jpg',
            comment: 'Es el lugar perfecto para desconectar después de un largo día. Los pasteles son geniales, y los meseros siempre te tratan con mucho respeto. Volveré a relajarme aquí! ok.',
        },
        {
            name: 'Valentina Herrera',
            photo: 'https://randomuser.me/api/portraits/women/25.jpg',
            comment: 'Me encanta venir aquí a pasar la tarde. La atmósfera es tranquila, el café es exquisito, y los meseros son tan amables. Ya quiero regresar! Jaja.',
        },
    ];

    return (
        <div>
            <Navbar />
            <section className='mx-auto max-w-screen-lg bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-screen-xl mx-auto px-4 py-12'>
                    <h2 className='text-4xl font-bold text-center text-gray-900 mb-8'>Lo que dicen nuestros clientes</h2>
                    <div className='grid gap-8 lg:grid-cols-3'>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className='bg-white p-6 rounded-lg shadow-lg'>
                                <div className='flex items-center mb-4'>
                                    <img
                                        src={testimonial.photo}
                                        alt={testimonial.name}
                                        className='w-16 h-16 rounded-full mr-4'
                                    />
                                    <div>
                                        <h3 className='text-xl font-semibold text-gray-900'>{testimonial.name}</h3>
                                    </div>
                                </div>
                                <p className='text-gray-700'>{testimonial.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Testimonials;
