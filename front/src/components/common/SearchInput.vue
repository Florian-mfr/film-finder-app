<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits({
  update: (text) => {
    return text
  }
})
const { text } = defineProps<{ text: string }>()
let timeout = ref<any>(null)
const inputChange = async (event: any) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  timeout = setTimeout(() => {
    emit('update', event.target.value)
  }, 500)
}
</script>

<template>
  <div class="container">
    <div class="container_input">
      <input type="text" class="input" :value="text" placeholder="Chercher un film, un réalisateur, un acteur..." @input="inputChange">
    </div>
    <!-- <div class="input_icon">
      <span>S</span>
    </div> -->
  </div>
</template>

<style scoped>
.container {
  width: 470px;
  position: relative;
}
.container_input {
  width: 100%;
  height: 56px;
  border-radius: 28px;
  background-color: #EFEFEF;
}
.input {
  width: 100%;
  height: 100%;
  border-radius: 28px;
  background-color: transparent;
  color: #000000;
  font-size: 18px;
  border: none;
  padding-left: 20px;
}
.input_icon {
  position: absolute;
  right: -5px;
  top: -1px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #B4B055;
  color: #FFFFFF;
  border: 2px solid #0E273C;
  font-size: 12px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
