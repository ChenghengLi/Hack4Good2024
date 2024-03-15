<template>
    <div class="product__card"  @click="selectProfile">
        <img
            :src="image_url"
            :alt="brand"
            class="product__image"
            loading="lazy"
        />
        <div class="product__header">
            <span class="brand">{{ brand }}</span>
        </div>
        <p class="product__name">{{ productName }}</p>
    </div>
</template>

<script>

import { defineComponent, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';


export default {
    name: "ProductCard",
    props: [
        "productId",
        "image_url",
        "brand",
        "productName",
    ],
    computed: {
        formattedPrice() {
            return this.currency + " " + this.price.toFixed(2);
        },
    },
    methods: {
        selectProfile() {
            this.$emit('profileSelected', this.productId);
        }
    },
};
</script>

<style scoped>
.product__card {
    border: 1px solid var(--grey);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.05s ease-in;
    padding: 15px;
    text-align: left;
    border-radius: 15px;
    color: #222;
    cursor: pointer;
}

.product__image {
    height: auto;
    max-width: 100%;
    border-radius: 5px;
}

.product__name {
    padding-block: 10px;
    font-family: 'Open Sans', sans-serif; /* Use a modern and clean font */
    font-size: 1.7rem; /* Adjust the font size as desired */
    line-height: 1.5; /* Add some line spacing */
    text-transform: capitalize; /* Capitalize the first letter of each word */
    letter-spacing: 0.5px; /* Add some letter spacing */
}

.product__name span {
    display: inline-block; /* Make each phrase a separate inline block */
    margin-right: 5px; /* Add spacing between phrases */
}

.product__name span:last-child {
    margin-right: 0; /* Remove the right margin from the last phrase */
}

.product__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
}

.brand {
    font-size: 2rem;
    display: inline-block;
    font-weight: 700;
}

.product__qty {
    font-size: 1.5rem;
    display: inline-block;
    padding-top: 10px;
    background-color: var(--dark-green);
    color: white;
    border-radius: 5px;
    padding: 5px;
}

.rating {
    padding-bottom: 5px;
    color: gold;
}

.rating i {
    font-size: 1.5rem;
}

.price {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.price span {
    font-size: 1.6rem;
    font-weight: 700;
}

.cart {
    cursor: pointer;
    height: 35px;
    width: 35px;
    color: var(--dark-green);
    border-radius: 50%;
    font-size: 1.9rem;
    display: grid;
    place-items: center;
    text-align: center;
    background-color: var(--light-green);
}
</style>
