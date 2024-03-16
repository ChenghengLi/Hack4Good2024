<template>
    <main-header />
    <sub-header heading="#WhoWeAre" subHeading="Get to know us" />
    <div class="container">
        <article>
            <div class="about-text">
                <h1>Sobre nosotros</h1>
                <p>
                    Somos un equipo de estudiantes del doble grado en Matemáticas e Ingeniería Informática. 
                    Nos hemos unido con la misión de desarrollar una plataforma que facilite una comprensión
                    más profunda y accesible de diversos documentos en el día a día. Nuestro objetivo es 
                    proporcionar herramientas que ayuden a las personas a interpretar mejor cualquier tipo 
                    de texto, promoviendo la claridad y el entendimiento en la lectura.
                </p>
            </div>
        </article>
    </div>
    <service-section />
    <main-footer />
</template>

<script>
import SubHeader from "@/components/SubHeader.vue";
import ServiceSection from "@/components/home_components/ServiceSection.vue";
import MainHeader from "@/components/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";
export default {
    components: { SubHeader, ServiceSection, MainHeader, MainFooter },
    name: "AboutView",
};
</script>

<style scoped>
article {
    display: flex;
    gap: 4rem;
    margin-bottom: 2.5rem;
}
.about-img {
    height: 50vh;
    width: 50%;
    object-fit: cover;
}

.about-text {
    width: 100%;
}

.about-text p {
    line-height: 25px;
}

.video-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-block: 3rem;
    text-align: center;
}

.video-banner {
    height: 60vh;
    width: 60%;
    border-radius: 10px;
    margin-top: 2rem;
}

.video-section a {
    text-decoration: underline;
    color: var(--dark-blue);
}

@media (max-width: 499px) {
    article {
        flex-direction: column;
    }
    .about-img,
    .about-text,
    .video-banner {
        width: 100%;
    }

    h1 {
        font-size: 4rem;
    }
}
</style>
