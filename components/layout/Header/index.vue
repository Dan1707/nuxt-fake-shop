<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();

// logingout user
const logOut = async () => {
  await supabase.auth.signOut();
};
</script>

<template>
  <header class="bg-primary shadow-slate-500 shadow-md sticky top-0 z-[100]">
    <div class="container py-5 flex items-center justify-between text-white">
      <div class="flex items-center justify-between basis-auto gap-3">
        <div
          class="w-[60px] h-[60px] phonel:w-[45px] phonel:h-[45px] flex justify-center items-center rounded-full bg-white"
        >
          <Icon
            name="uil:shopping-cart"
            style="color: black"
            size="40"
            class="phonel:w-[35px] phonel:h-[35px]"
          />
        </div>
        <h4 class="text-xl uppercase tablets:hidden">Nuxt-fake-shop.com</h4>
      </div>
      <nav
        class="flex items-center justify-between basis-[450px] laptop:basis-auto laptop:gap-4"
      >
        <ul class="flex items-center basis-full justify-between laptop:hidden">
          <li>
            <LayoutHeaderLink icon="uil:home-alt" text="Home" path="" />
          </li>
          <li>
            <LayoutHeaderLink
              icon="uil:heart"
              text="Favorite"
              path="favorite"
            />
          </li>
          <li>
            <LayoutHeaderLink icon="uil:shopping-bag" text="Cart" path="cart" />
          </li>
          <li @click="logOut">
            <button v-if="user">
              <LayoutHeaderLink
                icon="uil:arrow-from-right"
                text="Logout"
                path="auth"
              />
            </button>
            <button v-else>
              <LayoutHeaderLink icon="uil:lock" text="" path="auth" />
            </button>
          </li>
        </ul>

        <button class="hidden laptop:block">
          <Icon
            name="material-symbols:menu-rounded"
            style="color: white"
            size="60"
            class="phonel:w-[45px] phonel:h-[45px]"
          />
        </button>
      </nav>
    </div>
  </header>
</template>

<style>
.router-link-active {
  @apply bg-white text-primary relative;
}

.router-link-active span {
  @apply bg-primary;
}

.router-link-active::after {
  content: "";
  position: absolute;
  width: 50px;
  height: 5px;
  border-radius: 5px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  margin-bottom: -15px;
}
</style>
