<script setup lang="ts">
import { useRoute } from "vue-router";
import type { Database } from "~/database.types";

const supabase = useSupabaseClient<Database>();
const route = useRoute();
const productId = route.params.id;

const productData = await useAsyncData("product", async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select()
      .eq("id", +productId)
      .single();
    if (error) throw error;

    return data;
  } catch (error) {
    console.log(`Error fetching single item: ${error}`);
  }
});

const product = ref(productData.data.value);

const discountData = ref(null);
</script>

<template>
  <div
    class="container flex flex-col lg:flex-row items-center gap-8 mt-8 p-6 bg-white shadow-lg rounded-lg"
  >
    <div class="max-w-[450px] lg:w-[400px] phonel:w-[280px] relative">
      <Discount
        :price="product?.price || 0"
        :discount="product?.discount || 0"
        @discountData="
          (discount) => {
            discountData = discount;
          }
        "
      />

      <NuxtImg :src="product?.image || ''" class="w-full" />
    </div>

    <div class="flex-1 basis-[700px]">
      <h2 class="text-3xl phonel:text-xl font-bold text-gray-900 mb-4">
        {{ product?.title }}
      </h2>
      <div class="flex items-center gap-4">
        <p
          class="text-2xl phonel:text-lg font-semibold text-primary flex gap-3"
          v-if="product?.discount"
        >
          <span class="text-gray-500 line-through">{{ product?.price }}$</span>
          <span class="text-red-500">{{ discountData }}$</span>
        </p>
        <p class="text-2xl phonel:text-lg font-semibold text-primary" v-else>
          {{ product?.price }}$
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4 mt-4 text-base phonel:text-sm">
        <p class="text-gray-600">Category:</p>
        <p class="font-semibold text-gray-800">{{ product?.category }}</p>

        <p class="text-gray-600">Brand:</p>
        <p class="font-semibold text-gray-800">{{ product?.brand }}</p>

        <p class="text-gray-600">Model:</p>
        <p class="font-semibold text-gray-800">{{ product?.model }}</p>

        <p class="text-gray-600">Color:</p>
        <div class="flex items-center gap-2">
          <span class="font-semibold text-gray-800">{{ product?.color }}</span>
          <span
            class="w-5 h-5 rounded border shadow-md"
            :style="{ backgroundColor: product?.color || '' }"
          ></span>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Description:</h3>
        <p class="text-gray-700 leading-relaxed phonel:text-sm">
          {{ product?.description }}
        </p>
      </div>

      <div class="mt-8 flex gap-3">
        <Button class="w-full"> Add to cart </Button>
        <Button class="w-full"> Add to favorite </Button>
      </div>
    </div>
  </div>
</template>
<style>
.clip-star {
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
}
</style>
