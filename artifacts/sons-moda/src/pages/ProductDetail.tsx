import { useState } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { products, formatCurrency } from "../data/products";
import { useCart } from "../contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight } from "lucide-react";

export default function ProductDetail() {
  const [, params] = useRoute("/produto/:id");
  const productId = parseInt(params?.id || "0");
  const product = products.find(p => p.id === productId);
  
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { addItem } = useCart();
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="flex-grow flex items-center justify-center pt-24 pb-20">
        <div className="text-center">
          <h1 className="text-3xl font-serif mb-4">Produto não encontrado</h1>
          <Link href="/colecoes" className="text-primary hover:underline uppercase tracking-widest text-sm">
            Voltar para Coleções
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Selecione um tamanho",
        description: "Por favor, selecione um tamanho antes de adicionar ao carrinho.",
        variant: "destructive"
      });
      return;
    }
    
    addItem(product, selectedSize);
    toast({
      title: "Adicionado ao carrinho",
      description: `${product.name} (Tam: ${selectedSize}) foi adicionado com sucesso.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-grow pt-24 pb-24"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-xs uppercase tracking-widest text-muted-foreground mb-8 md:mb-12 mt-4">
          <Link href="/" className="hover:text-primary transition-colors">Início</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <Link href="/colecoes" className="hover:text-primary transition-colors">Coleções</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="lg:w-1/2">
            <div className="aspect-[3/4] overflow-hidden bg-card sticky top-32">
              {product.tag && (
                <div className="absolute top-6 left-6 z-10 bg-background text-foreground text-xs uppercase tracking-widest px-4 py-1.5 font-medium">
                  {product.tag}
                </div>
              )}
              <motion.img 
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid={`img-product-detail-${product.id}`}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-5xl font-serif tracking-tight mb-4" data-testid="text-product-name">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-2xl text-primary font-medium" data-testid="text-product-price">{formatCurrency(product.price)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-muted-foreground line-through font-light">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold uppercase tracking-widest">Tamanho</span>
                  <a href="#" className="text-xs text-muted-foreground hover:text-primary uppercase tracking-widest underline underline-offset-4">Guia de Medidas</a>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-5 gap-3" data-testid="container-sizes">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-sm font-medium transition-all duration-200 border ${
                        selectedSize === size 
                          ? 'border-primary bg-primary text-primary-foreground' 
                          : 'border-border bg-transparent text-foreground hover:border-muted-foreground'
                      }`}
                      data-testid={`button-size-${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 mb-12">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-foreground text-background py-5 uppercase tracking-[0.2em] text-sm font-bold hover:bg-primary transition-colors duration-300"
                  data-testid="button-add-to-cart"
                >
                  Adicionar ao Carrinho
                </button>
                <p className="text-xs text-center text-muted-foreground">Frete grátis para todo o Brasil em compras acima de R$ 500.</p>
              </div>

              <div className="space-y-6 border-t border-border pt-8">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-widest mb-3">Detalhes</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed font-light">
                    Cortada para um caimento impecável. Esta peça reflete o compromisso da Sons com materiais de alta qualidade e uma estética rigorosa. Desenvolvida em estúdio com atenção microscópica a cada costura.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground font-light">
                  <div>
                    <span className="block text-foreground font-medium mb-1 uppercase text-xs tracking-widest">Material</span>
                    <span className="block">100% Algodão Premium</span>
                  </div>
                  <div>
                    <span className="block text-foreground font-medium mb-1 uppercase text-xs tracking-widest">Corte</span>
                    <span className="block">Oversized Estruturado</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 border-t border-border pt-20">
            <h2 className="text-2xl md:text-3xl font-serif tracking-tight mb-12">COMPLETE O VISUAL</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <div key={p.id} className="group cursor-pointer">
                  <Link href={`/produto/${p.id}`} className="block" data-testid={`link-related-${p.id}`}>
                    <div className="relative aspect-[3/4] overflow-hidden bg-card mb-4">
                      <img 
                        src={p.image} 
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-md font-medium tracking-wide mb-1">{p.name}</h3>
                    <span className="text-primary font-medium text-sm">{formatCurrency(p.price)}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
