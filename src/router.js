import { createRouter, createWebHistory } from "vue-router";
import OverviewPage from './pages/OverviewPage.vue';
import DetailPage from './pages/DetailPage.vue';
import CreatePage from './pages/CreatePage.vue';

const routes = [
    { path: '/', component: OverviewPage },
    { path: '/Create', component: CreatePage },
    { path: '/task/:id', component: DetailPage, props: true }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;