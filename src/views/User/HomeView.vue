b<template>
    <main-header />
    <section class="hero__section">
        <div class="container">
            <div class="hero__text">
                <h4></h4>
                <h1 style="color: white">Conocimiento al alcance de todos, en cualquier momento y lugar.</h1>
                <p></p>
                <router-link to="/playground">
                    <action-button btnvalue="¡Empieza ya!" />
                </router-link>
            </div>
        </div>
    </section>
    <!-- <service-section />
    <section class="feature__section">
        <div class="container">
            <featured-products :featuredProducts="featuredProducts" />
        </div>
    </section>

    <banner-section /> -->

    <!--<advert-section />-->
</template>

<script>
import ServiceSection from "@/components/home_components/ServiceSection.vue";
import BannerSection from "@/components/home_components/BannerSection.vue";
import NewArrivals from "@/components/home_components/products/NewArrivals.vue";
import AdvertSection from "@/components/home_components/AdvertSection.vue";
import FeaturedProducts from "@/components/home_components/products/FeaturedProducts.vue";
import ActionButton from "@/components/ActionButton.vue";
import MainHeader from "@/components/MainHeader.vue";
import NewsLetter from "@/components/NewsLetter.vue";
import MainFooter from "@/components/MainFooter.vue";


import { mapActions } from "vuex";

export default {
    name: "HomeView",
    data() {
        return {
            products: [],
        };
    },
    methods: {
        ...mapActions(["set_products"]),

    },
    components: {
        ServiceSection,
        BannerSection,
        NewArrivals,
        AdvertSection,
        FeaturedProducts,
        ActionButton,
        MainHeader,
        NewsLetter,
        MainFooter,
    },
    computed: {
        featuredProducts() {
            return this.products.slice(1, 5);
        },
        newArrivals() {
            return this.products.slice(5, 9);
        },
    },
    async created() {

    },
};
</script>

<style scoped>
/* Hero Section */
.hero__section {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 65px);
    background-image: url("@/assets/images/3.png");
    background-position: 60% 30%;
    background-size: cover;
    
}

.hero__text {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
}

.hero__text h4 {
    padding-bottom: 1rem;
}

.hero__text h1 {
    color: var(--dim-blue);
}

.hero__text p {
    margin-bottom: 1rem;
}

@media (min-width: 2000px) {
    .hero__section {
        background-position: 70% 12%;
        background-size: contain;
        background-repeat: no-repeat;
        background-color: #e3e6f3;
        height: 50vh;
    }
}

@media (min-width: 3000px) {
    .hero__section {
        background-position: 60% 30%;
        /* background-size: cover; */
    }
}
</style>
