<script setup lang="ts">
defineProps<{
  icon: string;
  text: string;
  path: string;
}>();
</script>

<template>
  <NuxtLink
    :to="`/${path}`"
    class="duration-300 flex items-center gap-1 p-2 rounded-lg font-medium"
  >
    <Icon :name="icon" style="color: white" size="30" class="duration-300" />
    {{ text.length !== 0 ? text : "" }}
  </NuxtLink>
</template>
