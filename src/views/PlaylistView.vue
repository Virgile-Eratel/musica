<script setup lang="ts">
import type { PlaylistType, Track } from '@/App.vue';
import MusicCard from '@/components/MusicCard.vue';
import Playlist from '@/components/Playlist.vue';
import PlaylistCard from '@/components/PlaylistCard.vue';
import data from '@/Data/data.json';
import dataPlaylists from '@/Data/dataPlaylists.json';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const tracks = ref<Track[]>(data as Track[]);

const playlists = dataPlaylists as PlaylistType[];

const route = useRoute();
const idPlaylist = Number(route.params.id);
const selectedPlaylist = playlists.find((pl) => pl.id === idPlaylist);

const playlistTracks = selectedPlaylist
  ? tracks.value.filter((track) => selectedPlaylist.tracksId.includes(track.id))
  : [];

const playlistTitle = selectedPlaylist ? selectedPlaylist.title : '';
const playlistCover = selectedPlaylist ? selectedPlaylist.cover : '';
const playlistDescription = selectedPlaylist ? selectedPlaylist.description : '';
</script>

<template>
  <div class="w-full min-h-screen">
    <div class="my-4 ml-12">
      <Playlist
        v-if="selectedPlaylist"
        :cover="playlistCover"
        :title="playlistTitle"
        :description="playlistDescription"
        :tracks="playlistTracks"
      />
      <div v-else class="flex items-center justify-center w-full text-xl text-white h-52">
        Pas de playlist avec l'id {{ idPlaylist }}
      </div>
    </div>
  </div>
</template>
