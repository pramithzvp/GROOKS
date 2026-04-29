import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    reviews: number;
    stock: number;
    sold: number;
    image: string;
    category: string;
}

export const useProductStore = defineStore('product', () => {
    const products = ref<Product[]>([
        // Electronics
        { id: 1, category: "Electronics", name: "Wireless Noise-Cancelling Headphones", description: "Premium over-ear headphones with active noise cancellation and 30-hour battery life.", price: 199.99, rating: 4.8, reviews: 1245, stock: 45, sold: 8500, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80" },
        { id: 2, category: "Electronics", name: "Smart Watch Series 8", description: "Advanced health tracking, ECG app, blood oxygen sensor, and always-on retina display.", price: 249.00, rating: 4.9, reviews: 3210, stock: 105, sold: 15000, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80" },
        { id: 3, category: "Electronics", name: "Mechanical Gaming Keyboard", description: "RGB backlit mechanical keyboard with tactile blue switches and aircraft-grade aluminum frame.", price: 89.99, rating: 4.7, reviews: 2100, stock: 34, sold: 6700, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80" },
        { id: 4, category: "Electronics", name: "4K Action Camera", description: "Waterproof action camera with 4K resolution at 60fps and ultra-wide angle lens.", price: 199.99, rating: 4.6, reviews: 850, stock: 60, sold: 4200, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80" },
        { id: 5, category: "Electronics", name: "Portable Bluetooth Speaker", description: "Waterproof portable speaker with 360-degree sound and 24-hour playtime.", price: 99.00, rating: 4.8, reviews: 4500, stock: 200, sold: 12500, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80" },
        { id: 6, category: "Electronics", name: "Ultra-Wide Gaming Monitor", description: "34-inch curved ultra-wide gaming monitor with 144Hz refresh rate and 1ms response time.", price: 499.99, rating: 4.5, reviews: 620, stock: 15, sold: 1800, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80" },
        { id: 7, category: "Electronics", name: "Wireless Charging Pad", description: "Fast wireless charging pad compatible with all Qi-enabled devices.", price: 39.99, rating: 4.3, reviews: 3100, stock: 300, sold: 25000, image: "https://images.unsplash.com/photo-1603674554159-b62f6febbce5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

        // Furniture
        { id: 8, category: "Furniture", name: "Ergonomic Office Chair", description: "Comfortable mesh office chair with lumbar support, adjustable armrests, and headrest.", price: 99.50, rating: 4.5, reviews: 832, stock: 12, sold: 3400, image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80" },
        { id: 9, category: "Furniture", name: "Modern Coffee Table", description: "Minimalist wooden coffee table with tempered glass top and storage shelf.", price: 120.00, rating: 4.4, reviews: 340, stock: 25, sold: 1200, image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80" },
        { id: 10, category: "Furniture", name: "L-Shaped Sectional Sofa", description: "Spacious L-shaped sofa with soft linen fabric and high-density foam cushions.", price: 899.00, rating: 4.7, reviews: 150, stock: 8, sold: 450, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" },
        { id: 11, category: "Furniture", name: "Standing Desk", description: "Electric height adjustable standing desk with memory presets and solid wood top.", price: 349.99, rating: 4.8, reviews: 920, stock: 40, sold: 2800, image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&q=80" },
        { id: 12, category: "Furniture", name: "Bookshelf", description: "5-tier industrial bookshelf with metal frame and rustic wood shelves.", price: 89.50, rating: 4.6, reviews: 1200, stock: 75, sold: 5600, image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80" },

        // Sports & Outdoors
        { id: 13, category: "Sports", name: "Stainless Steel Water Bottle", description: "Double-wall vacuum insulated stainless steel water bottle keeps drinks cold for 24 hours.", price: 24.99, rating: 4.6, reviews: 540, stock: 200, sold: 1200, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80" },
        { id: 14, category: "Sports", name: "Yoga Mat with Alignment Lines", description: "Eco-friendly non-slip yoga mat with body alignment system and carrying strap.", price: 35.00, rating: 4.8, reviews: 2300, stock: 150, sold: 8900, image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&q=80" },
        { id: 15, category: "Sports", name: "Adjustable Dumbbells Set", description: "Space-saving adjustable dumbbells from 5 to 50 lbs with quick weight selection dial.", price: 199.00, rating: 4.9, reviews: 1800, stock: 20, sold: 4500, image: "https://plus.unsplash.com/premium_photo-1666736569798-421076607ba7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWRqdXN0JTIwZHVtYmVsbCUyMHNldHxlbnwwfHwwfHx8MA%3D%3D" },
        { id: 16, category: "Sports", name: "Camping Tent 4-Person", description: "Waterproof family camping tent with easy setup and excellent ventilation.", price: 149.99, rating: 4.5, reviews: 670, stock: 65, sold: 3200, image: "https://images.unsplash.com/photo-1624923686627-514dd5e57bae?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGluZyUyMHRlbnR8ZW58MHx8MHx8fDA%3D" },

        // Kitchen
        { id: 17, category: "Kitchen", name: "Pour-Over Coffee Maker", description: "Classic glass pour-over coffee maker with permanent stainless steel filter.", price: 34.50, rating: 4.4, reviews: 950, stock: 56, sold: 2300, image: "https://www.selectbrands.com/cdn/shop/files/cm-001po.10__17673.1699031949.1280.1280.jpg?v=1725980552&width=1280" },
        { id: 18, category: "Kitchen", name: "Non-Stick Cookware Set", description: "12-piece non-stick pots and pans set with glass lids and stay-cool handles.", price: 89.99, rating: 4.6, reviews: 3400, stock: 80, sold: 12000, image: "https://media.istockphoto.com/id/2171707906/photo/frying-pans.webp?a=1&b=1&s=612x612&w=0&k=20&c=8W1NFSO8uAjRpMQ_Zx5pLb42RSVp1svHEtDsCPRwtm0=" },
        { id: 19, category: "Kitchen", name: "Digital Air Fryer", description: "5.8-quart air fryer with 8 preset programs and touch screen control panel.", price: 119.50, rating: 4.8, reviews: 5600, stock: 110, sold: 18000, image: "https://cdn11.bigcommerce.com/s-5vfc75n1yv/images/stencil/600x600/products/3290/32272/499f895fa94515b2327a55532f06b88f867fdfed__20420.1764604244.jpg?c=1" },
        { id: 20, category: "Kitchen", name: "Chef's Knife", description: "8-inch professional chef's knife made of high-carbon German stainless steel.", price: 45.00, rating: 4.9, reviews: 2100, stock: 250, sold: 9500, image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80" },

        // Fashion
        { id: 21, category: "Fashion", name: "Classic Men's Watch", description: "Elegant analog watch with genuine leather strap and water-resistant design.", price: 125.00, rating: 4.6, reviews: 1450, stock: 90, sold: 6700, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80" },
        { id: 22, category: "Fashion", name: "Polarized Sunglasses", description: "Classic aviator sunglasses with polarized lenses and UV400 protection.", price: 29.99, rating: 4.4, reviews: 3200, stock: 400, sold: 15000, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80" },
        { id: 23, category: "Fashion", name: "Minimalist Leather Wallet", description: "Slim RFID-blocking leather wallet with money clip and quick-access card slots.", price: 39.50, rating: 4.7, reviews: 4100, stock: 180, sold: 22000, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80" },
        { id: 24, category: "Fashion", name: "Running Shoes", description: "Lightweight and breathable running shoes with shock-absorbing foam midsole.", price: 85.00, rating: 4.5, reviews: 2800, stock: 120, sold: 11000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" },
        { id: 25, category: "Fashion", name: "Canvas Weekend Bag", description: "Durable canvas travel duffel bag with genuine leather accents and shoe compartment.", price: 65.00, rating: 4.8, reviews: 950, stock: 65, sold: 4300, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80" }
    ])

    const categories = computed(() => {
        return Array.from(new Set(products.value.map(p => p.category)))
    })

    function getProductById(id: number) {
        return products.value.find(p => p.id === id)
    }

    function getProductsByCategory(category: string) {
        if (!category || category === 'All') return products.value;
        return products.value.filter(p => p.category === category)
    }

    function addRating(id: number, newRating: number) {
        const product = products.value.find(p => p.id === id)
        if (product) {
            // Calculate new average
            const totalScore = product.rating * product.reviews
            product.reviews += 1
            product.rating = Number(((totalScore + newRating) / product.reviews).toFixed(1))
        }
    }

    return { products, categories, getProductById, getProductsByCategory, addRating }
})
