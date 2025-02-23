<script>
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div class="wrapper">
    <LayoutHeader />
    <main class="">
      <slot />
    </main>
    <layoutFooter />
  </div>
</template>
