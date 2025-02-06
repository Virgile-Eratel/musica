<template>
  <div v-if="visible" class="absolute inset-0 z-[999] flex items-center justify-center text-black">
    <div class="w-full max-w-md p-6 bg-white rounded-lg">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold">Recherche de musiques</h2>
        <button @click="$emit('close')" class="text-gray-600 hover:text-gray-800">
          <i class="text-2xl bi bi-x"></i>
        </button>
      </div>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Rechercher une musique..."
        class="w-full p-2 mt-4 border rounded"
      />
      <div class="mt-4 overflow-y-auto max-h-64">
        <ul>
          <li
            v-for="track in filteredTracks"
            :key="track.id"
            class="flex items-center p-2 transition-colors border-b hover:bg-gray-100"
          >
            <img :src="track.cover" alt="cover" class="object-cover w-10 h-10 mr-3 rounded" />
            <div>
              <p class="font-semibold">{{ track.name }}</p>
              <p class="text-sm text-gray-500">{{ track.artiste }}</p>
            </div>
          </li>
        </ul>
        <div v-if="filteredTracks.length === 0" class="mt-4 text-gray-500">
          Aucun résultat trouvé.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Track } from '@/App.vue';
import data from '@/Data/data.json';
import { computed, defineProps, ref } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const searchQuery = ref('');
const tracks = ref<Track[]>(data as Track[]);

const filteredTracks = computed(() => {
  if (searchQuery.value.trim() === '') {
    return tracks.value;
  }
  const query = searchQuery.value.toLowerCase();
  return tracks.value.filter(
    (track) =>
      track.name.toLowerCase().includes(query) ||
      (track.artiste && track.artiste.toLowerCase().includes(query)),
  );
});
</script>
