<script setup lang="ts">
const props = defineProps({
  el: Object,
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();

// add to favorite logic
const heartActive = ref(false);

const addToFavorite = async (id: number) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        favorite: [...(user.value?.user_metadata?.favorite || []), id],
      },
    });
    if (error) throw error;
    console.log(data);
  } catch (error) {
    console.log(`Error adding to favorite: ${error}`);
  }
};

const deleteFromFavorite = async (id: number) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        favorite: user.value?.user_metadata?.favorite.filter(
          (item: any) => item !== id
        ),
      },
    });
    if (error) throw error;
    console.log(data);
  } catch (error) {
    console.log(`Error deleting to favorite: ${error}`);
  }
};

watchEffect(() => {
  if (!user.value) return;

  if (user.value.user_metadata?.favorite) {
    const isFavorite = user.value.user_metadata.favorite.find(
      (item: any) => item === props.el?.id
    );
    if (isFavorite) {
      heartActive.value = true;
    } else {
      heartActive.value = false;
    }
  }
});
</script>

<template>
  <article
    class="max-w-[400px] laptop:max-w-full p-5 border rounded-lg cursor-pointer"
  >
    <div class="overflow-hidden flex flex-col gap-3 relative">
      <button
        class="bg-red-500 w-12 flex items-center justify-center h-12 rounded-lg absolute top-0 right-0"
        @click="
          heartActive = !heartActive;
          heartActive ? addToFavorite(el?.id) : deleteFromFavorite(el?.id);
        "
      >
        <Icon
          :name="heartActive === false ? `mdi:heart-outline` : `mdi:heart`"
          style="color: white"
          size="32"
        />
      </button>
      <div
        class="w-[264px] h-[264px] laptop:w-[200px] laptop:h-[200px] overflow-hidden m-auto"
      >
        <NuxtImg
          :src="el?.image"
          alt="product"
          format="webp"
          loading="lazy"
          class="w-full h-full object-cover"
        />
      </div>
      <h3 class="text-xl shrink-0 min-h-[56px]">
        {{
          el?.title.length >= 50 ? `${el?.title.slice(0, 50)}...` : el?.title
        }}
      </h3>
      <div class="flex items-center justify-between font-medium">
        <p class="text-xl">{{ el?.price }}$</p>
        <p class="text-lg text-green-500">{{ el?.category }}</p>
      </div>
      <Button class="w-full gap-3 mt-5">
        <Icon name="uil:plus-circle" style="color: white" size="28" />
        Add to cart
      </Button>
    </div>
  </article>
</template>
