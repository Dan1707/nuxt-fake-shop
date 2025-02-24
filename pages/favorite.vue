<script setup lang="ts">
import type { Database } from "~/database.types";

const user = useSupabaseUser();
const supabase = useSupabaseClient<Database>();
const store = useGlobalStore();

const isLoading = ref(true);

const favoriteProducts = ref<any>([]);

const fetchFavoriteProducts = async () => {
  try {
    if (!user.value) return;

    const { data, error } = await supabase.rpc("get_products_by_ids", {
      product_ids: user.value.user_metadata?.favorite || [],
    });
    if (error) {
      console.error(error);
    }
    favoriteProducts.value = data?.slice(store.pagStart, store.pagEnd);
  } catch (error) {
    console.log(`Error fetching favorite products: ${error}`);
  } finally {
    isLoading.value = false;
  }
};

watchEffect(() => {
  fetchFavoriteProducts();
});
</script>

<template>
  <div class="container my-5">
    <div v-if="favoriteProducts.length === 0">
      <div
        class="flex items-center justify-center flex-col gap-3 w-full h-[50vh]"
      >
        <Icon name="uil:heart-break" style="color: black" size="56" />
        <p class="text-lg">No favorite products here...</p>
      </div>
    </div>
    <div v-else>
      <h1 class="text-3xl">Favorite products:</h1>
      <ProductContainer class="mt-5" :arr="favoriteProducts" />
      <MyPagination :arrLength="favoriteProducts.length || 0" class="my-5" />
    </div>
  </div>
</template>
