<script setup lang="ts">
import MusicCard from '@/components/MusicCard.vue';
import Player from '@/components/Player.vue';
import data from '@/Data/data.json';
import { ref } from 'vue';

export interface Track {
  id: number;
  name: string;
  artiste: string;
  album?: string;
  cover: string;
  mp3: string;
}

const tracks = ref<Track[]>(data as Track[]);
const playerRef = ref();

console.log(tracks.value);
</script>

<template>
  <div class="min-h-screen bg-[#141414] text-white">
    <div class="grid grid-cols-4 gap-6 px-8 py-8">
      <MusicCard
        v-for="(track, index) in tracks"
        :key="track.id"
        :track="track"
        :variant="'compact'"
        @click="playerRef.playTrack(index)"
      />
    </div>

    <div class="fixed bottom-0 left-0 w-full">
      <Player :tracks="tracks" ref="playerRef" />
    </div>
  </div>
</template>
