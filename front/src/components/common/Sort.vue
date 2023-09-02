<script setup lang="ts">
// Props
const { sort } = defineProps<{
  sort: {
    type: 'note' | 'date' | 'alphabetical',
    order: 'asc' | 'desc'
  }
}>()
const emit = defineEmits(['update'])
const updateSort = (type: 'note' | 'date' | 'alphabetical') => {
  if (sort.type === type) {
    sort.order = sort.order === 'asc' ? 'desc' : 'asc'
  } else {
    sort.type = type
    sort.order = 'asc'
  }
  emit('update', sort)
}
</script>

<template>
  <div class="sort">
    <div>Trier par par:</div>
    <div>
      <div @click="updateSort('note')" class="margin-left-1 clickable">Note</div>
      <div @click="updateSort('date')" class="margin-left-1 clickable">Date de sortie</div>
      <div @click="updateSort('alphabetical')" class="margin-left-1 clickable">Ordre alphabétique</div>
    </div>
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
