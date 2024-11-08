<template>   
    <div class="container mt-5 py-2">
        <div class="product-container row">
            <div class="search-container col-sm-12 col-md-10">
                <input class="search-input" type="" @input="getTextSearch($event)" placeholder="Search for Products, Brands and More" /> 
                <button class="search-button" @click="applySearchFilter()">Search again</button>
            </div>
            <div class="filters col-sm-12 col-md-2">
                <button class="filter-button" @click="openFilterModal()">Filter</button>
                <div class="filter-list-container">
                    <div
                        class="right-drawer"
                        :style="{
                            width: drawerVisible ? '25vw' : '0',
                            paddingLeft: drawerVisible ? '10px' : '0',
                        }"
                        >
                        <div class="filterCloseBtn">
                            <button class="close" @click="drawerVisible = false">&#9587;</button>
                        </div>
                        <br/>
                        <h2 style="text-align: left">Filters</h2>
                        <div class="accordion" id="accordionExample">
                            <div class="accordion-item">
                                <div class="accordion-header" @click="() => openCategoriesFilter()">
                                    Categories
                                </div>
                                <div 
                                    class="accordion-body"
                                    :style="{
                                        display: categoryVisible ? 'none' : 'block',
                                    }"
                                >
                                    <ul>
                                        <li v-for="category in categories"><label> <input type="checkbox" :name="category" @change="getSelectedCategoryFilter($event)" :value="category" />{{category}}</label></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <div class="accordion-header" @click="() => openBrandsFilter()">
                                    Brands
                                </div>
                                <div 
                                    class="accordion-body"
                                    :style="{
                                        display: brandsVisible ? 'none' : 'block',
                                    }"
                                >
                                    <ul>
                                        <li v-for="brand in brands"><label><input type="checkbox" @change="getSelectedBrandFilter($event)" :name="brand" :value="brand" />{{brand}}</label></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="filterBtn">
                            <button class="cancel" @click="drawerVisible = false">Cancel</button>
                            <button class="apply" @click="applyFilter()" >Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       <div class="row">
           <div v-for="product in products" :key="product.id" class="col-sm-6 col-md-4 p-2">
               <single-product :product="product" :viewProductDetails="viewProductDetails"></single-product>
           </div>
                 
        <div v-if="productDetailsVisible" @click="() => hideProductModal()" class="product-overlay"></div>
        <div v-if="productDetailsVisible" class="product-details-modal">
            <div class="row">
                <div class="col-sm-12 col-md-6 p-2">
                    <div class="card-image">
                        <img class="card-img" :src="productDetails.thumbnail" :alt="productDetails.title" />
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 p-2">
                    <h5 class="card-title">{{productDetails.title}}</h5> 
                    <p class="card-text">SKU: <b>{{productDetails.sku}}</b></p> 
                    <p class="card-text">Brand: <b>{{productDetails.brand}}</b></p> 
                    <p class="card-text">Category: <b>{{productDetails.category}}</b></p> 
                    <p class="card-text">Price: <b>${{productDetails.price}}</b></p>                    
                    <p class="card-text">Rating: <b>{{productDetails.rating}}</b></p> 
                    <p class="card-text">Availability: <b>{{productDetails.availabilityStatus}}</b></p>                     
                    <p class="card-text">Item Left: <b>{{productDetails.stock}}</b></p> 
                    
                </div>
            </div>
            <p class="card-text"><strong>Description:</strong> {{productDetails.description}}</p>             
            <p class="card-text">Shipping Information: <b>{{productDetails.shippingInformation}}</b></p>                    
            <p class="card-text">Warranty Information: <b>{{productDetails.warrantyInformation}}</b></p>                    
            <p class="card-text">Product weight: <b>{{productDetails.weight}}</b></p>
        </div>
       </div>
   </div>
</template>   

<script>
    import SingleProduct from "./SingleProduct.vue"
    export default{
        components: {
            SingleProduct
        },
        computed: {
            products: {
                get() {      
                    return this.$store.state.filteredProducts? this.$store.state.filteredProducts : this.$store.state.products
                },
                set(val) {
                    this.$store.state.filteredProducts = val
                }
            },
            searchQuery: {
                get() {      
                    return this.$store.state.searchQuery
                },
                set(val) {
                    this.$store.state.searchQuery = val
                }
            },
            drawerVisible: {
                get() {      
                    return this.$store.state.drawerVisible
                },
                set(val) {
                    this.$store.state.drawerVisible = val
                }
            },
            categoryVisible: {
                get() {      
                    return this.$store.state.categoryVisible
                },
                set(val) {
                    this.$store.state.categoryVisible = val
                }
            },
            brandsVisible: {
                get() {      
                    return this.$store.state.brandsVisible
                },
                set(val) {
                    this.$store.state.brandsVisible = val
                }
            },
            selectedCategories: {
                get() {      
                    return this.$store.state.selectedCategories
                },
                set(val) {
                    this.$store.state.selectedCategories = val
                }
            },
            selectedBrands: {
                get() {      
                    return this.$store.state.selectedBrands
                },
                set(val) {
                    this.$store.state.selectedBrands = val
                }
            },
            brands() {                 
                let brandsList = [];
                if(this.$store.state.products){
                    this.$store.state.products.map(item => {
                        if(brandsList.indexOf(item.brand) === -1 && item.brand){
                            brandsList.push(item.brand)
                        }
                    });
                }
                return brandsList;
            },
            categories() {    
                let categoriesList = [];
                if(this.$store.state.products){
                    this.$store.state.products.map(item => {
                        if(categoriesList.indexOf(item.category) === -1){
                            categoriesList.push(item.category)
                        }
                    });
                }
                return categoriesList;
            },            
            productDetails: {
                get() {      
                    return this.$store.state.productDetails
                },
                set(val) {
                    this.$store.state.productDetails = val
                }  
            },
            productDetailsVisible: {
                get() {      
                    return this.$store.state.productDetailsVisible
                },
                set(val) {
                    this.$store.state.productDetailsVisible = val
                }                
            }
        },
        created(){
            this.$store.dispatch("fetchProducts");
        },
        methods: {    
            applySearchFilter: function() {
                let textSearch = this.$store.state.searchQuery;
                if(!textSearch){
                    this.products = this.$store.state.products;
                    return;
                };
                this.filteredResources= this.$store.state.products;
                this.filteredResources = this.filteredResources.filter(item => {
                    return item.title.toLowerCase().includes(textSearch.toLowerCase());
                });
                this.products = this.filteredResources;
            },
            getTextSearch: function(event) {
                this.searchQuery = event.target.value;
            },            
            openFilterModal: function() {
                this.drawerVisible = true;
            },
            openCategoriesFilter: function() {
                this.categoryVisible = this.categoryVisible ? false: true;
            },
            openBrandsFilter: function() {
                this.brandsVisible = this.brandsVisible ? false: true;
            },
            getSelectedBrandFilter: function(event) {
                if(event.target.checked){
                    this.selectedBrands.push(event.target.value)
                }
                else {
                    this.selectedBrands = this.selectedBrands.filter(item => item !== event.target.value)
                }               
            },
            getSelectedCategoryFilter: function(event) {
                if(event.target.checked){
                    this.selectedCategories.push(event.target.value)
                }
                else {
                    this.selectedCategories = this.selectedCategories.filter(item => item !== event.target.value)
                }
            },
            applyFilter: function() {
                this.drawerVisible = false;
                this.filteredResources= this.$store.state.products;
                if(this.selectedCategories.length > 0 || this.selectedBrands.length > 0){
                    this.filteredResources = this.filteredResources.filter(item => {
                        return this.selectedCategories.indexOf(item.category) > -1 || this.selectedBrands.indexOf(item.brand) > -1;
                    });
                }
                this.products = this.filteredResources;
            },            
            viewProductDetails: function(product){
                this.productDetailsVisible = true;
                this.productDetails = product;
            },
            hideProductModal: function(){
                this.productDetailsVisible = false;
            },
        }
        
    }
</script>
<style scoped>
    .product-container {
        margin-top: 50px
    }
    .search-button{
        padding: 5px 20px;
        background: #b98b00;
        color: #fff;
        font-weight: 600;
        border: none;
        width: 150px;
    }
    .search-input {
        width: calc(100% - 155px);
    }
    .filters {
        text-align: right;
    }
    .filter-button {
        padding: 5px 20px;
        background: #4fa900;
        color: #fff;
        font-weight: 600;
        border: none;
    }
    .right-drawer {
        position: absolute;
        top: 0;
        right: 0;
        width: 0; /* initially */
        overflow: hidden;
        height: 100vh;
        padding-left: 0; /* initially */
        border-left: 1px solid whitesmoke;
        background: white;
        z-index: 200;
        transition: all 0.2s;
    }
    .accordion-header {
        text-align: left;
        padding: 10px;
        border: 1px solid #ccc;
        cursor: pointer;
        margin-top: 5px;
    }
    .accordion-body {
        text-align: left;
        padding: 10px 0;
    }
    .accordion-body li {
        list-style: none;
    }
    .accordion-body li input{
        margin-right: 10px;
    }
    .filterCloseBtn {
        text-align: right;
        margin: 5px;
        overflow: hidden;
    }
    .filterBtn {        
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 20px;
    }
    .filterBtn button{
        width: 48%;
    }
    .product-overlay {
        background: #000;
        opacity: 0.2;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: fixed;
        z-index: 998;
    }
    .product-details-modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 800px;
        height: 600px;
        background-color: white;
        padding: 30px;
        border: 1px solid black;
        box-shadow: 10px 10px 5px #888888;
        z-index: 999;
    }
    .product-details-modal img {
        width: 322px;
    }
    @media screen and (max-width: "800px") {
        .product-details-modal {
            width: 100%;
        }
    }
</style>