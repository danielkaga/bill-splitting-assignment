<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.parent-container {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
</style>
