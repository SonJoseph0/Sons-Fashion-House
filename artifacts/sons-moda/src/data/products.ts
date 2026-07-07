export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  sizes: string[];
  tag: string | null;
  image: string;
}

export const products: Product[] = [
  { id: 1, name: "Camiseta Oversized Essentials", category: "Camisetas", price: 189, originalPrice: 320, sizes: ["P","M","G","GG"], tag: "MAIS VENDIDO", image: "/images/prod-1.jpg" },
  { id: 2, name: "Calça Cargo Tactical", category: "Calças", price: 349, originalPrice: 580, sizes: ["36","38","40","42"], tag: "NOVO", image: "/images/prod-2.jpg" },
  { id: 3, name: "Jaqueta Coach Premium", category: "Jaquetas", price: 529, originalPrice: 890, sizes: ["P","M","G","GG"], tag: "EXCLUSIVO", image: "/images/prod-3.jpg" },
  { id: 4, name: "Tênis Street Luxe", category: "Tênis", price: 419, originalPrice: 720, sizes: ["39","40","41","42","43"], tag: "LIMITADO", image: "/images/prod-4.jpg" },
  { id: 5, name: "Boné Signature", category: "Acessórios", price: 129, originalPrice: 220, sizes: ["ÚNICO"], tag: null, image: "/images/prod-5.jpg" },
  { id: 6, name: "Camiseta Gráfica Statement", category: "Camisetas", price: 219, originalPrice: 360, sizes: ["P","M","G","GG"], tag: "NOVO", image: "/images/prod-6.jpg" },
  { id: 7, name: "Moletom Heavyweight", category: "Calças", price: 299, originalPrice: 490, sizes: ["P","M","G","GG"], tag: null, image: "/images/prod-7.jpg" },
  { id: 8, name: "Jaqueta Bomber Silk", category: "Jaquetas", price: 689, originalPrice: 1100, sizes: ["P","M","G"], tag: "EXCLUSIVO", image: "/images/prod-8.jpg" },
];

export const categories = [
  { name: "Camisetas", image: "/images/cat-camisetas.jpg" },
  { name: "Calças", image: "/images/cat-calcas.jpg" },
  { name: "Jaquetas", image: "/images/cat-jaquetas.jpg" },
  { name: "Tênis", image: "/images/cat-tenis.jpg" },
  { name: "Acessórios", image: "/images/cat-acessorios.jpg" },
];

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};
