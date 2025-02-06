<script setup lang="ts">
import type { PlaylistType, Track } from '@/App.vue';
import MusicCard from '@/components/MusicCard.vue';
import PlaylistCard from '@/components/PlaylistCard.vue';
import data from '@/Data/data.json';
import dataPlaylists from '@/Data/dataPlaylists.json';
import { useQueueStore } from '@/stores/query';
import { ref } from 'vue';

const tracks = ref<Track[]>(data as Track[]);
const playlists = dataPlaylists as PlaylistType[];

const queueStore = useQueueStore();
</script>

<template>
  <div class="min-h-screen bg-[#141414] text-white w-full h-full">
    <div class="pt-8 pb-16 pl-12">
      <div class="flex gap-6">
        <div class="w-2/3 rounded-lg">
          <img src="/public/images/accueil1.png" alt="Accueil" class="object-fill rounded-xl" />
        </div>
        <div class="w-full h-full space-y-3 overflow-y-auto">
          <h1 class="text-xl font-semibold">Top charts</h1>

          <PlaylistCard :playlist="playlists[0]" :variant="'line'" />
        </div>
      </div>
      <h1 class="mt-6 mb-1 text-xl font-semibold">New releases.</h1>
      <div class="inline-flex w-full h-auto gap-6 overflow-x-auto overflow-y-hidden">
        <MusicCard
          @click="queueStore.playPlaylist(tracks.slice(0, 8), track)"
          v-for="(track, index) in tracks.slice(0, 8)"
          :key="track.id"
          :track="track"
          :variant="'full'"
        />
      </div>
    </div>
  </div>
</template>
