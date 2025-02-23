<script setup lang="ts">
import type { Database } from "~/database.types";
import Select from "../ui/select/Select.vue";
import SelectItem from "../ui/select/SelectItem.vue";
import SelectTrigger from "../ui/select/SelectTrigger.vue";
import SelectValue from "../ui/select/SelectValue.vue";
import SelectContent from "../ui/select/SelectContent.vue";
import SelectGroup from "../ui/select/SelectGroup.vue";
import SelectLabel from "../ui/select/SelectLabel.vue";

const supabase = useSupabaseClient<Database>();

defineEmits(["search"]);

const name = ref("");

const productCategories = await useAsyncData("categories", async () => {
  try {
    const { data, error } = await supabase.rpc("get_unique_categories");
    if (error) {
      throw error;
    } else return data;
  } catch (error) {
    console.log(`Error with fetching categories: ${error}`);
  }
});

const { fetchByCategory } = useProducts();

const currentCategory = ref("");

watch(
  currentCategory,
  async (newVal) => {
    if (newVal) await fetchByCategory(newVal);
  },
  { immediate: true }
);
</script>

<template>
  <form class="container z-[999]">
    <div
      class="bg-slate-500/20 backdrop-blur-sm flex items-center phonel:flex-col justify-between p-5 gap-3 rounded-lg"
    >
      <Input
        placeholder="Search products..."
        v-model="name"
        @input.prevent="$emit('search', name)"
        @keyup.enter.prevent="$emit('search', name)"
      />
      <Select class="z-[999] phonel:w-full" v-model="currentCategory">
        <SelectTrigger class="w-[180px] phonel:w-full">
          <SelectValue placeholder="Select product category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories:</SelectLabel>
            <SelectItem
              class="phonel:w-full"
              v-for="category in productCategories.data.value ?? []"
              :key="category.category || ''"
              :value="category.category || ''"
            >
              {{ category?.category }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </form>
</template>
