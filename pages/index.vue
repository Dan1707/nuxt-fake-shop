<script setup lang="ts">
import Skeleton from "~/components/ui/skeleton/Skeleton.vue";

const {
  fetchProductsArr,
  productsLength,
  isLoading,
  productsArr,
  fetchByTitle,
  fetchProductsLength,
} = useProducts();

watchEffect(() => {
  fetchProductsArr();
  fetchProductsLength();
});
</script>

<template>
  <Search class="mt-5 sticky top-[120px] z-[999]" @search="fetchByTitle" />

  <div v-if="isLoading">
    <div
      class="grid grid-cols-4 desktop:grid-cols-3 laptop:grid-cols-2 grid-rows-[repeat(autofill,_510px)] gap-5 container mt-10"
    >
      <Skeleton
        v-for="product in productsArr"
        :key="product.id"
        :el="product"
        class="max-w-[400px] h-[482px] laptop:max-w-full p-5 border rounded-lg"
      />
    </div>
  </div>
  <div v-else>
    <ProductContainer class="mt-5" :arr="productsArr" />
  </div>
  <MyPagination :arrLength="productsLength || 0" class="my-5" />
</template>
