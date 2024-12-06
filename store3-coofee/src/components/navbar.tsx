"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, PhoneIcon, CogIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaTiktok, FaWhatsapp, FaShoppingCart } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className='border-b'>
            <div className='mx-auto max-w-screen-xl px-4 py-6 justify-center'>
                <div className='relative px-4 sm:px-8 lg:px-12 flex h-16 items-center justify-between'>
                    <Link href="/" className='ml-4 flex lg:ml-0 gap-x-2 items-center'>
                        <p className='font-bold text-4xl text-gray-900 hover:text-gray-600 transition-colors duration-300'>
                            COF☕
                        </p>
                    </Link>
                    <div className="hidden lg:flex flex-1 mx-8 relative">
                        <input disabled
                            type="text"
                            placeholder="Mantenimiento..."
                            className="w-full p-2 pl-10 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                    </div>
                    <div className='flex items-center space-x-4 space-y-4'>
                        <Link href="/views/view-cart" className='text-gray-900 hover:text-gray-400'>
                            <FontAwesomeIcon icon={faShoppingCart} className='h-8 w-8' />
                        </Link>
                    </div>
                    <div className="hidden lg:block lg:w-8"></div>
                    {/* Menu toggle for small screens */}
                    <div className='flex items-center space-x-4 space-y-4'>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='lg:hidden text-gray-900 hover:text-gray-600'>
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                    {/* Desktop menu */}
                    <div className={`hidden lg:flex items-center space-x-4 ${isMenuOpen ? 'block' : 'hidden'}`}>

                        {/* <Link href="https://wa.me/" target="_blank" className='text-green-400 hover:text-gray-700'>
                            <FaWhatsapp className="h-6 w-6" />
                        </Link>
                        <h1>|</h1> */}

                        <Link href="/contact" className='text-gray-900 hover:text-gray-400'>
                            <PhoneIcon className='h-8 w-8' />
                        </Link>
                        <div className='px-2'>
                            <Link href="#" className='text-yellow-500 hover:text-yellow-700 font-semibold'>
                                <span>Donar</span>
                            </Link>
                        </div>
                        <div className='px-2'>
                            <Link href="/detalles-empresa/testimonials" className='text-gray-900 hover:text-gray-400 font-semibold'>
                                Testimonios
                            </Link>
                        </div>
                        <Link href="https://wa.me/" target='_blank' className='text-xs text-purple-500 hover:text-gray-700 font-semibold'>
                            ADQUIRIR-TIENDA.
                        </Link>
                        <h1>|</h1>
                        <Link href="/admin/dashboard/cm0bowhx700002vrjcinrzutc" className='text-gray-900 hover:text-gray-400'>
                            <CogIcon className='h-9 w-9' />
                        </Link>
                    </div>
                    {/* Mobile menu */}
                    <div
                        className={`lg:hidden absolute right-4 top-16 bg-white border border-gray-300 rounded-md shadow-lg ${isMenuOpen ? 'block' : 'hidden'}`}
                        style={{ zIndex: 1000 }} // Ajusta z-index para asegurarte de que esté por encima de otros elementos
                    >

                        <Link href="/admin/dashboard/cm0bowhx700002vrjcinrzutc" className='block p-3 text-gray-900 hover:text-gray-400'>
                            <CogIcon className='h-6 w-6' />
                        </Link>
                        <Link href="/contact" className='block p-3 text-gray-900 hover:text-gray-400'>
                            <PhoneIcon className='h-6 w-6' />
                        </Link>
                        <Link href="https://wa.me/" className='block p-3 text-purple-500 hover:text-gray-700'>
                            IR!
                        </Link>
                        <Link href="/detalles-empresa/testimonials" className='text-gray-900 hover:text-gray-400 font-semibold'>
                            Test...
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Navbar;
