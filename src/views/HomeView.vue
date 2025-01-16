<script setup lang="ts">
import MusicCard from '@/components/MusicCard.vue';
import Sidebar from '../components/Sidebar.vue';
import data from '../Data/data.json';
</script>

<template>
  <main>
    <div class="flex flex-wrap space-x-8 p-5 overflow-hidden h-full w-full">
      <MusicCard
        :id="music.id"
        :name="music.name"
        :artiste="music.artiste"
        :album="music.album"
        :duration="music.duration"
        :cover="music.cover"
        v-for="music in data"
        :key="music.id"
      />
    </div>
  </main>
</template>
