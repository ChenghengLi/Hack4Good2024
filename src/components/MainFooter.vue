<template>
    <footer>
        <div class="container">
            <router-link to="/" class="logo">
                <h3>AnalogiScan</h3>
            </router-link>
            <div class="footer">
                <div class="footer-col">
                    <h4>About</h4>
                    <a href="/about">About Us</a>

                </div>

                <div class="footer-col">
                    <h4>Home</h4>
                    <a href="/">Home</a>

                </div>
              
                <div class="footer-col">
                    <h4>Apps</h4>
                    <a href="/playground">Playground</a>

                </div>
>
      
                <p class="copyright">
                    AnalogiScan &copy; {{date}}
                </p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "MainFooter",
    data(){
        return {
            date: new Date().getFullYear(),
        }
    }
};
</script>

<style scoped>
footer {
    border-top: 1px solid var(--brown);
}
.footer {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-block: 4rem;
    gap: 1.5rem;
}

.logo {
    margin-block: 2rem;
    display: inline-block;
}

.footer-col {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    gap: 1.5rem;
}

.footer-col h4 {
    padding-bottom: 1.3rem;
}

.footer-col a {
    font-size: 1.6rem;
}

.footer-col a:hover {
    color: var(--dark-green);
}

.footer-col span {
    display: block;
    font-size: 1.6rem;
}
strong {
    color: var(--text);
}

.social-links a {
    padding-right: 1.4rem;
}

.copyright {
    font-size: 1.7rem;
    width: 100%;
    text-align: center;
}

.copyright span {
    font-weight: 700;
    color: var(--dark-green);
}

.install p {
    padding-block: 0;
}

.apps {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.download-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    border: 2px solid var(--text);
    border-radius: 6px;
    padding: 8px;
    text-align: center;
}

.download-btn svg {
    font-size: 2rem;
}

.apps a:hover {
    background-color: var(--dark-green);
    color: white;
    border-color: var(--dark-green);
}

.apps a:hover p {
    color: white;
}

.payment-methods {
    display: flex;
    align-items: center;
    gap: 10px;
}
.payment-methods img {
    height: 20px;
    width: 100%;
}

.payment-methods svg:hover {
    cursor: pointer;
    color: var(--dark-green);
}

@media (max-width: 399px) {
    .download-btn p {
        font-size: 1.4rem;
    }
    .download-btn span {
        font-size: 1.4rem;
    }
}

@media (max-width: 345px) {
    .apps {
        display: flex;
        flex-direction: column;
    }
}
</style>
