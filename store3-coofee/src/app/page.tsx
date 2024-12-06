import Image from "next/image";
import { Urbanist } from 'next/font/google';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ViewGeneral from "./views/page";
import ToastProvider from "@/providers/toast-provider";
import ModalProvider from "@/providers/modal-provider";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const font = Urbanist({ subsets: ['latin'] });

export const metadata = {
  title: 'Tienda',
  description: 'Tienda - Productos en General',
};

export default function Home() {
  return (
    <div className={font.className}>
      <ToastProvider />
      <ToastContainer />
      <div>
        <Navbar />
        <main className="mx-auto max-w-screen-xl px-4 py-8 justify-center">
          <ModalProvider />
          {/* Renderiza el contenido principal aquí */}
          {/* Si `HomePage` ya maneja la renderización, no es necesario incluirlo aquí */}
          <ViewGeneral />
        </main>
        <Footer />
      </div>
    </div>
  );
}
