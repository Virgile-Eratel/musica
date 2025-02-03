<script setup lang="ts">
import type { Track } from '@/App.vue';
import MusicCard from '@/components/MusicCard.vue';
import data from '@/Data/data.json';
import { ref } from 'vue';

const tracks = ref<Track[]>(data as Track[]);
</script>

<template>
  <div class="min-h-screen bg-[#141414] text-white w-full h-full">
    <div class="pt-8 pb-16 pl-12">
      <div class="flex gap-6 max-h-[503px]">
        <div class="rounded-lg w-[886px] h-[503px]">
          <img src="/public/images/accueil1.png" alt="Accueil" class="object-cover rounded-xl" />
        </div>
        <div class="flex-wrap flex-1 w-full overflow-y-auto">
          <h1 class="mt-6 mb-1 text-xl font-semibold">Top charts</h1>

          <!-- TODO mettre le top 3 des playlists -->
        </div>
      </div>
      <h1 class="mt-6 mb-1 text-xl font-semibold">New releases.</h1>
      <div class="inline-flex w-full h-auto gap-6 overflow-x-auto overflow-y-hidden">
        <MusicCard
          v-for="(track, index) in tracks"
          :key="track.id"
          :track="track"
          :variant="'full'"
        />
      </div>
    </div>
  </div>
</template>
