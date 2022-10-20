import { createRouter, createWebHistory } from 'vue-router';
import AboutPage from './pages/AboutPage.vue';
import HomePage from './pages/HomePage.vue';
import OrganisationPage from './pages/OrganisationPage.vue';
import OrganisationsPage from './pages/OrganisationsPage.vue';
import ReportPage from './pages/ReportPage.vue';
import ValidatePage from './pages/ValidatePage.vue';
import ValidationResult from './pages/ValidationResult.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/validate', component: ValidatePage },
  { path: '/validate/:tempWorkspaceID', component: ValidationResult },
  { path: '/organisations', component: OrganisationsPage },
  { path: '/organisation/:name', component: OrganisationPage },
  {
    path: '/view/dqf/files/:id',
    redirect: (to) => {
      return { path: '/report/:name', query: { id: to.params.id } };
    },
  },
  { path: '/report/:name', component: ReportPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
