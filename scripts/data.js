import Product from "./Product.js";

// Instancias de Product
const product1 = new Product('P7Q8R11', 'MacBook Apple Air 13.6" M2', 'Descubre la potencia imparable y la elegancia inigualable: MacBook Air M2, experimenta la sinergia perfecta entre potencia, rendimiento y estilo con el MacBook Air. Eleva tu productividad y creatividad a nuevas alturas mientras descubres un mundo de posibilidades ilimitadas junto a Apple MacBook Air.', 6999.00, 10, ['./img/p1_1.webp', './img/p1_2.webp', './img/p1_3.webp', './img/p1_4.webp'], ['Silver', 'Gold', 'Silver Dark'], './details.html');

const product2 = new Product('P7Q8R12', 'Macbook Apple Air 13" M1', 'El Apple MacBook Air 13" con Chip M1 8GB es un portátil con una pantalla Retina, un potente procesador M1 y un teclado de última generación. El chip M1 integra CPU, GPU, Neural Engine, E/S y más en un solo sistema en un chip (SoC).', 4599.00, 10, ['./img/p2_1.webp', './img/p2_2.webp', './img/p2_3.webp', './img/p2_4.webp'], ['Silver', 'Gold', 'Silver Dark'], './details.html');

const product3 = new Product('P7Q8R13', 'Laptop Lenovo IP5Pro 16ARH7 R7', 'El portátil IdeaPad 5 Pro de 7.ª generación [40,64 cm (16″), AMD] está equipado con procesadores móviles AMD Ryzen™ 6000 Series. La tarjeta gráfica NVIDIA', 2699.00, 8, ['./img/p3_1.webp', './img/p3_2.webp', './img/p3_3.webp', './img/p3_4.webp'], ['Gris'], './details.html');

const product4 = new Product('P7Q8R14', 'Laptop LG Gram 16Z90Q-G', 'Laptop LG gram ultraligera, panel IPS de 16” 16:10 y procesador Intel® Evo™ Core™ i5 de 12 Generación. Pantalla IPS de 16" 16:10 WQXGA (2560 x 1600) Windows 11 Home con plataforma Intel con certificación militar.', 1000.00, 5, ['./img/p4_1.webp', './img/p4_2.webp', './img/p4_3.webp', './img/p4_4.webp'], ['Gris'], './details.html');

const product5 = new Product('P7Q8R15', 'iPhone 11 6.1" 128GB', 'Enfoque automático continuo, y sensores: Face ID / Barómetro / Giroscopio de tres ejes / Acelerómetro / Sensor de proximidad / Sensor de luz ambiental. Núcleos del procesador: CPU de 6 núcleos (2 de rendimiento y 4 de eficiencia) / GPU de 4 núcleos / Neural Engine de 8 núcleos', 2199.00, 5, ['./img/p5_1.webp', './img/p5_2.webp', './img/p5_3.webp', './img/p5_4.webp'], ['Black', 'Green', 'Yellow', 'Purple', 'White'], './details.html');

const product6 = new Product('P7Q8R16', 'Producto6', 'Descripción del producto 6', 1300.00, 50, ['./img/mock2.jpg', './img/mock2.jpg', './img/mock2.jpg'], ['color1'], './details.html');
const product7 = new Product('P7Q8R17', 'Producto7', 'Descripción del producto 7', 1300.00, 50, ['./img/mock2.jpg', './img/mock2.jpg', './img/mock2.jpg'], ['color1'], './details.html');
const product8 = new Product('P7Q8R18', 'Producto8', 'Descripción del producto 8', 1300.00, 50, ['./img/mock2.jpg', './img/mock2.jpg', './img/mock2.jpg'], ['color1'], './details.html');

export const products = [product1, product2, product3, product4, product5, product6, product7, product8];