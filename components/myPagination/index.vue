<script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";

const store = useGlobalStore();

const props = defineProps<{
  arrLength: number;
}>();

// calculating quantity of pages
const pageQuantity = computed(() => {
  if (props.arrLength) {
    return Math.ceil(props.arrLength / store.productsQuantity);
  }
  return 0;
});

// calculating start and end of pagination
const pageLimits = (currentPage: number) => {
  store.pagStart = (currentPage - 1) * store.productsQuantity;
  store.pagEnd = store.pagStart + store.productsQuantity;
};

// calculating via arrows
const arrowFunc = (action: string) => {
  if (action === "+") {
    store.pagStart = store.pagStart + store.productsQuantity;
    store.pagEnd = store.pagEnd + store.productsQuantity;
  } else {
    store.pagStart = store.pagStart - store.productsQuantity;
    store.pagEnd = store.pagEnd - store.productsQuantity;
  }
};
</script>

<template>
  <div
    class="flex items-center justify-center"
    v-if="arrLength > store.productsQuantity"
  >
    <Pagination
      v-slot="{ page }"
      :total="pageQuantity * 10"
      :sibling-count="1"
      show-edges
    >
      <PaginationList
        v-slot="{ items }"
        class="flex items-center justify-center gap-1 tablets:flex-wrap"
      >
        <PaginationFirst @click="pageLimits(1)" class="tablets:hidden" />
        <PaginationPrev @click="arrowFunc('-')" class="tablets:hidden" />

        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            as-child
            @click="pageLimits(item.value)"
          >
            <Button
              class="w-10 h-10 p-0"
              :variant="item.value === page ? 'default' : 'outline'"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext @click="arrowFunc('+')" class="tablets:hidden" />
        <PaginationLast
          @click="pageLimits(pageQuantity)"
          class="tablets:hidden"
        />
      </PaginationList>
    </Pagination>
  </div>
</template>
