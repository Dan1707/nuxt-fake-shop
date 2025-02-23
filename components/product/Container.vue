<script setup lang="ts">
defineProps<{
  arr: any[];
}>();
</script>

<template>
  <div
    class="grid grid-cols-4 desktop:grid-cols-3 laptop:grid-cols-2 grid-rows-[repeat(autofill,_510px)] gap-5 container"
  >
    <Product v-for="product in arr" :key="product.id" :el="product" />
  </div>
</template>
<style scoped>
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 576px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
