<script setup lang="ts">
// Props
const { page, total } = defineProps<{
  page: number,
  total: number
}>()
</script>

<template>
  <div class="pagination">
    <button class="pagination-previous" :disabled="page === 1" @click="$emit('update:page', page - 1)">Previous</button>
    <button class="pagination-next" :disabled="page === total" @click="$emit('update:page', page + 1)">Next page</button>
  </div>
</template>

<style scoped>
.container_movie {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 220px;
  background-color: #b4b055;
  border-radius: 3px;
  padding: 10px;
  margin: 10px;
  height: 450px;
}

.movie_img {
  width: auto;
  height: 300px;
  border-radius: 3px;
}

.movie_info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 150px;
  color: #0E273C;
}
</style>
