// Product Listing Project JavaScript with Indian Rupees
const productGrid = document.getElementById('product-grid');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const priceValue = document.getElementById('price-value');
const sortOption = document.getElementById('sort-option');

const products = [
    {
        id: 1,
        title: "Smartphone X",
        category: "electronics",
        price: 20000, // Added missing comma here
        rating: 4.5,
        image: "ph.jpg"
    },
    {
        id: 2,
        title: "Laptop",
        category: "electronics",
        price: 65000,
        rating: 4.8,
        image: "lp.jpg"
    },
    {
        id: 3,
        title: "Wireless Headphones",
        category: "electronics",
        price: 2999,
        rating: 4.2,
        image: "bl.jpg"
    },
    {
        id: 4,
        title: "Men's T-Shirt",
        category: "clothing",
        price: 599,
        rating: 4.0,
        image: "ts.jpg"
    },
    {
        id: 5,
        title: " Jeans",
        category: "clothing",
        price: 1299,
        rating: 4.3,
        image: "js.jpg"
    },
    {
        id: 6,
        title: "Coffee Maker",
        category: "home",
        price: 3499,
        rating: 4.6,
        image: "cm.jpg"
    },
    {
        id: 7,
        title: "Blender",
        category: "home",
        price: 1999,
        rating: 3.9,
        image: "lb.jpg"
    },
    {
        id: 8,
        title: "Smart Watch",
        category: "electronics",
        price: 8999,
        rating: 4.7,
        image: "ws.jpg"
    }
];

// Update to show Indian Rupees
priceFilter.addEventListener('input', function() {
    priceValue.textContent = `Up to ₹${this.value}`;
    filterAndSortProducts();
});

categoryFilter.addEventListener('change', filterAndSortProducts);
sortOption.addEventListener('change', filterAndSortProducts);

function filterAndSortProducts() {
    const selectedCategory = categoryFilter.value;
    const maxPrice = parseInt(priceFilter.value);
    const sortBy = sortOption.value;
    
    let filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
        const priceMatch = product.price <= maxPrice;
        return categoryMatch && priceMatch;
    });
    
    switch(sortBy) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            filteredProducts.sort((a, b) => a.id - b.id);
    }
    
    renderProducts(filteredProducts);
}

function renderProducts(productsToRender) {
    productGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p class="no-results">No products match your criteria.</p>';
        return;
    }
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h3 class="product-title">${product.title}</h3>
            <span class="product-category">${product.category}</span>
            <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
            <div class="product-rating">Rating: ${product.rating}/5</div>
        `;
        
        productGrid.appendChild(productCard);
    });
}

// Initialize with max price from products
const maxPrice = Math.max(...products.map(p => p.price));
priceFilter.max = maxPrice;
priceFilter.value = maxPrice;
priceValue.textContent = `Up to ₹${maxPrice}`;

filterAndSortProducts();