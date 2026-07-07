import { motion } from "framer-motion";
import { Link } from "wouter";
import { categories, products, formatCurrency } from "../data/products";

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

export default function Collections() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-grow pt-24 pb-20"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <header className="mb-16 md:mb-24 mt-8 md:mt-12 text-center">
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-6">COLEÇÕES</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            Silhuetas ousadas e tecidos premium. Explore nosso catálogo completo desenhado para presença absoluta.
          </p>
        </header>

        {/* Categories Grid */}
        <section className="mb-32">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
          >
            {categories.map((cat, index) => (
              <motion.div key={cat.name} variants={itemVariants} className={`group relative overflow-hidden aspect-[4/5] cursor-pointer ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                <img 
                  src={cat.image} 
                  alt={`Categoria ${cat.name}`}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  data-testid={`img-category-${cat.name}`}
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-serif tracking-tight text-white mb-2">{cat.name}</h3>
                  <div className="h-0.5 w-0 bg-gold transition-all duration-500 group-hover:w-12" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* All Products */}
        <section>
          <div className="flex justify-between items-end mb-12 border-b border-border pb-6">
            <h2 className="text-2xl md:text-3xl font-serif tracking-tight">TODAS AS PEÇAS</h2>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">{products.length} ITENS</span>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
          >
            {products.map((product) => (
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
                    <p className="text-sm text-muted-foreground uppercase tracking-widest">{product.category}</p>
                    <div className="flex items-center space-x-3 pt-1">
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
        </section>
      </div>
    </motion.div>
  );
}
