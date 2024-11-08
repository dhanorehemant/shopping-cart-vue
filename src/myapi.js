export default {
    getProducts: async () => {
        const response = await fetch('https://dummyjson.com/products');
        const products = await response.json();
        console.log("products", products)
        return products.products;        
    },
    products: (action, productId) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(productId);
            }, 100);
        });
    }
}