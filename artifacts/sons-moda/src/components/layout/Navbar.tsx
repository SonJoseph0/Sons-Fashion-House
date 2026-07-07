import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-border/50 py-4" : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          <button 
            className="lg:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            data-testid="button-mobile-menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden lg:flex items-center space-x-8 text-sm uppercase tracking-widest font-medium">
            <Link href="/" className="text-foreground hover:text-primary transition-colors" data-testid="link-nav-home">
              Início
            </Link>
            <Link href="/colecoes" className="text-foreground hover:text-primary transition-colors" data-testid="link-nav-collections">
              Coleções
            </Link>
          </div>

          <Link href="/" className="text-2xl lg:text-3xl font-serif text-foreground tracking-tight" data-testid="link-nav-logo">
            SONS<span className="text-gold">.</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/carrinho" className="relative text-foreground hover:text-primary transition-colors group" data-testid="link-nav-cart">
              <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={1.5} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 lg:w-5 lg:h-5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                    data-testid="text-cart-count"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-card border-r border-border z-50 p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <Link href="/" className="text-2xl font-serif tracking-tight" data-testid="link-mobile-logo">
                  SONS<span className="text-gold">.</span>
                </Link>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="button-close-menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col space-y-6 text-lg uppercase tracking-widest font-medium">
                <Link href="/" className="text-foreground hover:text-primary transition-colors" data-testid="link-mobile-home">
                  Início
                </Link>
                <Link href="/colecoes" className="text-foreground hover:text-primary transition-colors" data-testid="link-mobile-collections">
                  Coleções
                </Link>
                <Link href="/carrinho" className="text-foreground hover:text-primary transition-colors" data-testid="link-mobile-cart">
                  Carrinho ({itemCount})
                </Link>
              </nav>

              <div className="mt-auto pb-8">
                <p className="text-sm text-muted-foreground mb-4">Siga-nos</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-foreground hover:text-primary transition-colors text-sm uppercase tracking-widest">Instagram</a>
                  <a href="#" className="text-foreground hover:text-primary transition-colors text-sm uppercase tracking-widest">TikTok</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
