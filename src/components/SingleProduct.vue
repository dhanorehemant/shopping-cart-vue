<template>
    <div class="card"> 
       <div class="card-body"> 
           <div class="card-image" @click="() => viewProductDetails(product)">
            <img class="card-img" :src="product.thumbnail" :alt="product.title" />
            </div>
           <h5 class="card-title">{{product.title}}</h5> 
           <p class="card-text">Price: <b>${{product.price}}</b></p> 
           <button 
               class="btn mt-3"
               :class="inCartQuantity ? 'btn-primary' :  'btn-danger'"
               @click="addToCart(product.id)"
               :disabled="!inCartQuantity">
               {{inCartQuantity ? "Add to Cart" : "Out of stock"}}
           </button> 
       </div>  
   </div>
</template>

<script>
    export default{
        props: ["product", "viewProductDetails"],
        computed: {
            inCartQuantity() {
                return this.product.stock;
            }
        },
        methods: {
            addToCart(id){
                this.$store.dispatch("addToCart", id);
            }
        }
    }
</script>
<style scoped>
    .card {
        border: none;
    }
    .card-image {
        width: 322px;
        height: 322px;
    }
</style>