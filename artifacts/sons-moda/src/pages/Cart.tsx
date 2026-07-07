import { motion } from "framer-motion";
import { Link } from "wouter";
import { useCart } from "../contexts/CartContext";
import { formatCurrency } from "../data/products";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    toast({
      title: "Pedido Iniciado",
      description: "Redirecionando para o checkout seguro...",
    });
    // In a real app, redirect to checkout provider
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex-grow pt-32 pb-20 container mx-auto px-6 lg:px-12 flex flex-col items-center justify-center text-center"
      >
        <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-6">SEU CARRINHO</h1>
        <p className="text-muted-foreground text-lg mb-10 font-light">
          Seu carrinho está vazio no momento.
        </p>
        <Link 
          href="/colecoes" 
          className="bg-foreground text-background px-10 py-4 uppercase tracking-[0.2em] text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          data-testid="link-empty-cart-return"
        >
          Explorar Coleções
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-grow pt-32 pb-24"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-12">SEU CARRINHO</h1>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="hidden md:grid grid-cols-6 gap-4 border-b border-border pb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
              <div className="col-span-3">Produto</div>
              <div className="col-span-1 text-center">Quantidade</div>
              <div className="col-span-1 text-right">Preço</div>
              <div className="col-span-1"></div>
            </div>

            <div className="space-y-8 md:space-y-6">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex flex-col md:grid md:grid-cols-6 gap-4 md:items-center border-b border-border/50 pb-8 md:pb-6 last:border-0" data-testid={`cart-item-${item.product.id}-${item.size}`}>
                  <div className="col-span-3 flex gap-6 items-center">
                    <Link href={`/produto/${item.product.id}`}>
                      <div className="w-24 h-32 bg-card overflow-hidden shrink-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    </Link>
                    <div>
                      <Link href={`/produto/${item.product.id}`}>
                        <h3 className="font-medium tracking-wide text-lg hover:text-primary transition-colors">{item.product.name}</h3>
                      </Link>
                      <p className="text-muted-foreground text-sm uppercase tracking-widest mt-1">Tam: {item.size}</p>
                      <div className="md:hidden mt-2 text-primary font-medium">
                        {formatCurrency(item.product.price)}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1 flex items-center md:justify-center mt-4 md:mt-0">
                    <div className="flex items-center border border-border">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                        data-testid={`button-decrease-${item.product.id}`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium" data-testid={`text-quantity-${item.product.id}`}>
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                        data-testid={`button-increase-${item.product.id}`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-1 hidden md:block text-right font-medium text-primary">
                    {formatCurrency(item.product.price * item.quantity)}
                  </div>

                  <div className="col-span-1 flex justify-end absolute md:static right-6 mt-2 md:mt-0">
                    <button 
                      onClick={() => removeItem(item.product.id, item.size)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-2"
                      data-testid={`button-remove-${item.product.id}`}
                      aria-label="Remover item"
                    >
                      <Trash2 className="w-5 h-5 md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-card border border-border p-8 sticky top-32">
              <h2 className="text-xl font-serif tracking-tight mb-6">RESUMO DO PEDIDO</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-muted-foreground font-light text-sm">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground font-light text-sm border-b border-border/50 pb-4">
                  <span>Frete</span>
                  <span>{subtotal > 500 ? 'Grátis' : 'Calculado no checkout'}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-medium pt-2">
                  <span>Total</span>
                  <span className="text-primary text-xl" data-testid="text-cart-total">{formatCurrency(subtotal)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-foreground text-background py-5 uppercase tracking-[0.2em] text-sm font-bold hover:bg-primary flex items-center justify-center gap-2 transition-colors duration-300"
                data-testid="button-checkout"
              >
                Finalizar Pedido <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-6 pt-6 border-t border-border/50 text-xs text-muted-foreground font-light space-y-2 text-center">
                <p>Pagamento 100% seguro.</p>
                <p>Troca garantida em até 7 dias.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
