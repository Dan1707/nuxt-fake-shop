<script setup lang="ts">
const props = defineProps({
  price: Number,
  discount: Number,
});

const emit = defineEmits(["discountData"]);

const discountData = calcDiscount(props.price || 0, props.discount || 0);

onMounted(() => {
  emit("discountData", discountData);
});
</script>

<template>
  <div
    class="absolute z-[99] bottom-0 right-0 w-40 h-40 flex items-center justify-center text-white font-bold text-center text-xl bg-sky-500 shadow-lg overflow-hidden rounded-full clip-star"
    v-if="discount"
  >
    <span class="z-10">-{{ discount }}%</span>
  </div>
</template>
