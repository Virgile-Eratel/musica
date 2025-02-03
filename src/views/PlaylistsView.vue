<script setup lang="ts">
import PlaylistCard from '@/components/PlaylistCard.vue';
</script>

<template>
  <div class="w-full min-h-screen">
    <div class="my-4 ml-12">
      <PlaylistCard :id="1" title="Ma Playlist" cover="/public/images/coverPlaylist1.jpg" />
    </div>
  </div>
</template>
