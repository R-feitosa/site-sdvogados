import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import monogram from "@/assets/web/rf-logo-icon-trim.png";
import { Ambient } from "@/components/Chrome";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: rota inexistente:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <Helmet>
        <title>Página não encontrada | Rfeitosa Advogados Associados</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Ambient />
      <div className="glass w-full max-w-[520px] rounded-[30px] p-10 text-center">
        <div className="relative z-10">
          <img src={monogram} alt="" className="mx-auto h-16 w-auto opacity-90" />
          <h1 className="display mt-8 text-[3.4rem] font-light leading-none">Página não encontrada.</h1>
          <p className="mt-4 text-white/65">O endereço acessado não existe ou foi alterado.</p>
          <Link to="/" className="btn btn-solid mt-8">
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
