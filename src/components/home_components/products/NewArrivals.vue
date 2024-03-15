<template>
    <section class="products">
        <h2>Our Sets</h2>
        <p class="highlight"></p>
        <div class="container">
            <div class="product__container" v-if="newArrivals">
                <product-card
                    v-for="(product, index) in newArrivals"
                    :key="index"
                    :productId="product._id"
                    :productName="product.name"
                    :brand="product.brand"
                    :price="product.price"
                    :currency="product.currency"
                    :ratings="product.rating"
                    :image_url="product.images[0]"
                    :in_stock="product.in_stock"
                />
            </div>
            <product-preloader type="inline" v-else>
                Loading products...
            </product-preloader>
        </div>
    </section>
</template>

<script>
import ProductCard from "@/components/home_components/cards/ProductCard.vue";
import ProductPreloader from "@/components/preloaders/ProductPreloader.vue";
export default {
    name: "NewArrivals",
    components: {
        ProductCard,
        ProductPreloader,
    },
    data() {
      return {
        newArrivals: []// Initialize inputText with the prop value
      };
    },
    created() {
        this.getProducts();
    },
    methods: {
        getProducts() {
             fetch("/data/products.json")
            .then((response) => response.json())
            .then((data) => {
                this.newArrivals = data.results.map((product) => {
                    product.images[0] = product.images[0].replace(
                        "http",
                        "https"
                    );
                    
                    return product;
                });
            })
            .catch((err) => {
                console.log(err);
            });
        }
    },
};
</script>
