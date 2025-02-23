import { defineStore } from "pinia";

export const useGlobalStore = defineStore("counter", () => {
  const productsQuantity = ref(24);
  const pagStart = ref(0);
  const pagEnd = ref(productsQuantity.value);

  return { productsQuantity, pagStart, pagEnd };
});
