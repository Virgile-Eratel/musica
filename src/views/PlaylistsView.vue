<script setup lang="ts">
import type { PlaylistType } from '@/App.vue';
import PlaylistCard from '@/components/PlaylistCard.vue';
import dataPlaylists from '@/Data/dataPlaylists.json';

const playlists = dataPlaylists as PlaylistType[];
</script>

<template>
  <div class="w-full min-h-screen">
    <div class="my-4 ml-12">
      <h1 class="p-4 text-xl font-semibold text-white">Playlists</h1>
      <div class="inline-flex w-full h-auto gap-6 overflow-x-auto overflow-y-hidden">
        <PlaylistCard v-for="playlist in playlists" :key="playlist.id" :playlist="playlist" />
      </div>
    </div>
  </div>
</template>
