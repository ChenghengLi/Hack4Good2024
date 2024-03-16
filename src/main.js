import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
// import the package
import VueAwesomePaginate from "vue-awesome-paginate";


// import the necessary css file
import "vue-awesome-paginate/dist/style.css";
const app = createApp(App).use(router).use(store).use(VueAwesomePaginate).mount("#app");

app.config.globalProperties.$langauge = 'Spanish';
app.config.globalProperties.$currentAction= 'analogia';
