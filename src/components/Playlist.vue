<script setup lang="ts">
import type { Track } from '@/App.vue';
import { defineProps } from 'vue';
import MusicCard from './MusicCard.vue';

interface PlaylistProps {
  cover: string;
  title: string;
  description: string;
  tracks: Track[];
}

const props = defineProps<PlaylistProps>();
</script>

<template>
  <div class="relative w-full h-full">
    <div
      class="absolute inset-0 overflow-hidden bg-center bg-cover rounded-xl"
      :style="{ backgroundImage: `url(${props.cover})` }"
    >
      <div class="absolute inset-0 bg-black opacity-70 rounded-xl"></div>
    </div>

    <div class="relative z-10 p-3 pt-28">
      <div class="flex items-end gap-x-6">
        <div class="h-52 w-52">
          <img
            :src="props.cover"
            alt="Playlist cover"
            class="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div>
          <h1 class="text-xl font-semibold text-white">{{ props.title }}</h1>
          <p class="text-gray-300">{{ props.description }}</p>
          <p class="text-gray-300">{{ props.tracks.length }} musiques</p>
        </div>
      </div>
      <div class="w-full pt-10 space-y-4">
        <MusicCard
          v-for="(track, index) in props.tracks"
          :key="track.id"
          :track="track"
          :variant="'line'"
        />
      </div>
    </div>
  </div>
</template>
