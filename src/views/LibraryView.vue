<script setup lang="ts">
import type { Track } from '@/App.vue';
import MusicCard from '@/components/MusicCard.vue';
import data from '@/Data/data.json';
import { ref } from 'vue';

const tracks = ref<Track[]>(data as Track[]);
</script>

<template>
  <div class="min-h-screen bg-[#141414] text-white">
    <div class="my-4 ml-12">
      <h1 class="text-3xl font-semibold">Ma collection</h1>
    </div>
    <div class="grid grid-cols-4 gap-6 px-8 pt-8 pb-16">
      <MusicCard
        v-for="(track, index) in tracks"
        :key="track.id"
        :track="track"
        :variant="'compact'"
      />
    </div>
  </div>
</template>
