import LibraryView from '@/views/LibraryView.vue';
import PlaylistsView from '@/views/PlaylistsView.vue';
import PlaylistView from '@/views/PlaylistView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/library',
      name: 'library',
      component: LibraryView,
    },
    {
      path: '/playlists',
      name: 'playlists',
      component: PlaylistsView,
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: PlaylistView,
    },
  ],
});

export default router;
