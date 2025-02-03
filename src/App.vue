<script setup lang="ts">
import { RouterView } from 'vue-router';
import Player from './components/Player.vue';
import Sidebar from './components/Sidebar.vue';

export interface Track {
  id: number;
  name: string;
  artiste: string;
  album?: string;
  cover: string;
  mp3: string;
}
</script>

<template>
  <div class="bg-[#1e2123] min-h-screen w-screen flex">
    <div class="fixed">
      <Sidebar />
    </div>
    <RouterView class="pl-10" />
    <div class="fixed bottom-0 left-0 w-full">
      <Player />
    </div>
  </div>
</template>
