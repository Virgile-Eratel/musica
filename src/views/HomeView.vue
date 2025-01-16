<script setup lang="ts">
import MusicCard from '@/components/MusicCard.vue';
import Sidebar from '../components/Sidebar.vue';
import data from '../Data/data.json';
</script>

<template>
  <main>
    <div class="flex flex-wrap w-full h-full p-5 overflow-hidden gap-x-8 gap-y-2">
      <MusicCard
        :id="music.id"
        :name="music.name"
        :artiste="music.artiste"
        :album="music.album"
        :duration="music.duration"
        :cover="music.cover"
        :mp3="music.mp3"
        v-for="music in data"
        :key="music.id"
      />
    </div>
  </main>
</template>
