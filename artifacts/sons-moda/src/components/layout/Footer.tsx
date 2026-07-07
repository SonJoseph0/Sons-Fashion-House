import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="text-3xl font-serif tracking-tight mb-6 block">
              SONS<span className="text-gold">.</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              A redefinição do streetwear de luxo brasileiro. Cortado para quem exige presença, não apenas atenção.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">Navegação</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/colecoes" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Coleções
                </Link>
              </li>
              <li>
                <Link href="/carrinho" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Carrinho
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">Suporte</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Trocas e Devoluções
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Guia de Medidas
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Acesso antecipado a drops limitados.
            </p>
            <form className="flex group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-background border border-border px-4 py-2 w-full text-sm focus:outline-none focus:border-primary transition-colors rounded-none"
                data-testid="input-footer-newsletter"
              />
              <button 
                type="submit" 
                className="bg-foreground text-background px-6 text-sm font-medium uppercase tracking-widest hover:bg-primary transition-colors"
                data-testid="button-footer-newsletter"
              >
                Assinar
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} SONS MODA MASCULINA. TODOS OS DIREITOS RESERVADOS.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Termos</a>
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
