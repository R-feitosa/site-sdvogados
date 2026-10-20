/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Endpoint opcional (POST JSON) para registrar os contatos do formulário: CRM, planilha, automação etc. */
  readonly VITE_FORM_ENDPOINT?: string;
  /** "memory" apenas para prévias hospedadas fora da raiz do domínio */
  readonly VITE_ROUTER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
