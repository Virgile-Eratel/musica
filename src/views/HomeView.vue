<script setup lang="ts">
import MusicCard from '@/components/MusicCard.vue';
import { provide, ref } from 'vue';
import data from '../Data/data.json';

const currentTrack = ref('');

function setCurrentTrack(mp3: string) {
  currentTrack.value = mp3;
}

provide('setCurrentTrack', setCurrentTrack);
</script>

<template>
  <main>
    <div class="flex flex-wrap p-5 overflow-hidden gap-x-8 gap-y-2">
      <MusicCard
        v-for="music in data"
        :key="music.id"
        :id="music.id"
        :name="music.name"
        :artiste="music.artiste"
        :album="music.album"
        :cover="music.cover"
        :mp3="music.mp3"
      />
    </div>

    <div class="fixed bottom-0 w-full bg-[#1e2123] p-5">
      <audio :src="currentTrack" controls v-if="currentTrack">
        Votre navigateur ne supporte pas l'élément <code>audio</code>.
      </audio>
    </div>
  </main>
</template>
