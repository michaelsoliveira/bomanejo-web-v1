
import React from "react";
import SocialIcons from "@/components/footer/SocialIcons";
import { useRouter } from "next/router";
import ItemsContainer from "@/components/footer/ItemsContainer";

const Footer = () => {
  const router = useRouter()
  const index = router.pathname === '/'

  return (
    <footer className="bg-gray-800 text-white">
      {index && (
        <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-2">
          <h1
            className="lg:text-3xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold
          md:w-2/5"
          >
            <span className="text-teal-400">Acesso Gratuito</span> para o gerenciamento de inventário
          </h1>
          <div>
            <input
              type="text"
              placeholder="Entre com seu email para mais informações"
              className="text-gray-800
            sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2 rounded px-2 focus:outline-none"
            />
            <button
              className="bg-teal-600 hover:bg-teal-500 duration-300 px-5 py-2
            rounded-md text-white md:w-auto w-full"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
      
        <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12
      text-center text-gray-400 text-sm pb-4"
      >
        <span>© 2020 Appy. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <SocialIcons />
      </div>
    </footer>
  );
};

export default Footer;
