import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaTiktok, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto py-6 px-4 lg:px-8">
        {/* Sección de Enlaces Centrados */}
        <div className="flex flex-col lg:flex-row justify-center gap-6 mb-6 lg:mb-4">
          <Link href="/detalles-empresa/sobre-nosotros" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 text-center lg:text-left">
            Sobre Nosotros
          </Link>
          <Link href="/detalles-empresa/privacy-policy" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 text-center lg:text-left">
            Políticas de Privacidad
          </Link>
          <Link href="/detalles-empresa/terms-condition" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 text-center lg:text-left">
            Términos y Condiciones
          </Link>
        </div>

        {/* Sección de Redes Sociales */}
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors duration-300" aria-label="Facebook">
            <FaFacebookF className="h-6 w-6" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition-colors duration-300" aria-label="Twitter">
            <FaTwitter className="h-6 w-6" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 transition-colors duration-300" aria-label="Instagram">
            <FaInstagram className="h-6 w-6" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition-colors duration-300" aria-label="LinkedIn">
            <FaLinkedin className="h-6 w-6" />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600 transition-colors duration-300" aria-label="TikTok">
            <FaTiktok className="h-6 w-6" />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-800 transition-colors duration-300" aria-label="Whatsapp">
          <FaWhatsapp className="h-6 w-6" />
          </a>
        </div>

        {/* Sección de Derechos Reservados */}
        <p className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Scuti. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
