import type { Track } from '@/App.vue';
import { defineStore } from 'pinia';
import data from '../Data/data.json';

export const useQueueStore = defineStore('queue', {
  state: () => ({
    queue: data as Track[],
    currentIndex: 0,
  }),
  getters: {
    currentTrack(state): Track | null {
      return state.queue[state.currentIndex] || null;
    },
  },
  actions: {
    playPlaylist(playlist: Track[]) {
      this.queue = playlist;
      this.currentIndex = 0;
    },
    playNow(track: Track) {
      // musique en cours, return
      if (this.queue.length > 0 && this.queue[0].id === track.id) {
        return;
      }
      // suppression doublon
      this.queue = this.queue.filter((t: { id: any }) => t.id !== track.id);

      // supprime le premier titre de la file pour ne pas le rejouer quand on fait next
      if (this.queue.length > 0) {
        this.queue.shift();
      }

      // Ajoute le nouveau titre en tête de la file.
      this.queue.unshift(track);

      this.currentIndex = 0;
    },
    playNext() {
      if (this.currentIndex < this.queue.length - 1) {
        this.currentIndex++;
      }
    },
    playPrevious() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
  },
});
