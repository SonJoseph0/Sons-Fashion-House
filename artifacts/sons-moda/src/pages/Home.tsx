import { motion } from "framer-motion";
import { Link } from "wouter";
import { products, formatCurrency } from "../data/products";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-grow"
    >
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="/images/hero.jpg"
            alt="Sons Moda Masculina - Coleção Atual"
            className="w-full h-full object-cover object-center"
            data-testid="img-hero"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <div className="relative z-10 text-center px-6 mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight mb-6"
          >
            A NOVA<br />ALFAIATARIA.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto mb-10 font-light"
          >
            Presença exigida. Streetwear de luxo redefinido para o homem contemporâneo.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              href="/colecoes" 
              className="inline-block bg-white text-black px-10 py-4 uppercase tracking-[0.2em] text-sm font-medium hover:bg-gold hover:text-white transition-colors duration-300"
              data-testid="link-hero-cta"
            >
              Explorar Coleção
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-24 lg:py-32 bg-background px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">LANÇAMENTOS</h2>
            <Link 
              href="/colecoes" 
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors hidden md:block"
              data-testid="link-view-all"
            >
              Ver Tudo
            </Link>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants} className="group cursor-pointer">
                <Link href={`/produto/${product.id}`} className="block" data-testid={`link-product-${product.id}`}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-card mb-6">
                    {product.tag && (
                      <div className="absolute top-4 left-4 z-10 bg-background text-foreground text-[10px] uppercase tracking-widest px-3 py-1 font-medium">
                        {product.tag}
                      </div>
                    )}
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      data-testid={`img-product-${product.id}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium tracking-wide">{product.name}</h3>
                    <div className="flex items-center space-x-3">
                      <span className="text-primary font-medium">{formatCurrency(product.price)}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-muted-foreground line-through text-sm">
                          {formatCurrency(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-12 text-center md:hidden">
            <Link 
              href="/colecoes" 
              className="inline-block border border-border px-8 py-3 text-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-colors"
              data-testid="link-view-all-mobile"
            >
              Ver Tudo
            </Link>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-24 lg:py-32 bg-card relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('/images/hero.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(100%)' }} />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight">O MANIFESTO</h2>
            <p className="text-lg md:text-2xl text-muted-foreground font-light leading-relaxed">
              Não fazemos roupas para nos misturar. Sons é a intersecção entre o rigor da alfaiataria clássica e a subversão da cultura de rua de São Paulo. Cada peça é um corte de atitude. Para o homem que dita suas próprias regras e exige qualidade sem compromisso.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
