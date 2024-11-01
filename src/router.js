import { createRouter, createWebHistory } from "vue-router"; 
import Home from "./components/Home.vue";
import BookIndex from "./components/BookIndex.vue";
import BookDetails from "./components/BookDetails.vue";
import AuthorIndex from "./components/AuthorIndex.vue"; // Importa AuthorIndex
import AuthorDetails from "./components/AuthorDetails.vue"; // Importa AuthorDetails
import PublisherIndex from "./components/PublisherIndex.vue";
import PublisherDetails from "./components/PublisherDetails.vue";
const routes = [
  { path: "/", component: Home },
  
  // Rutas para libros
  { path: "/book", component: BookIndex },
  { path: "/book/show/:id", component: BookDetails, props: { show: true } },
  { path: "/book/edit/:id", component: BookDetails, props: { edit: true } },
  { path: "/book/create", component: BookDetails, props: { create: true } },
  { path: "/book/delete/:id", component: BookDetails, props: { delete: true } },

  // Rutas para autores
  { path: "/author", component: AuthorIndex }, // Ruta para listar autores
  { path: "/author/show/:id", component: AuthorDetails, props: { show: true } }, // Ruta para mostrar autor
  { path: "/author/edit/:id", component: AuthorDetails, props: { edit: true } }, // Ruta para editar autor
  { path: "/author/create", component: AuthorDetails, props: { create: true } }, // Ruta para crear autor
  { path: "/author/delete/:id", component: AuthorDetails, props: { delete: true } }, // Ruta para eliminar autor

  { path: "/publisher", component: PublisherIndex },
  { path: "/publisher/show/:id", component: PublisherDetails, props: { show: true } },
  { path: "/publisher/edit/:id", component: PublisherDetails, props: { edit: true } },
  { path: "/publisher/create", component: PublisherDetails, props: { create: true } }
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;
