export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();

  if (user.value === undefined) return;

  if (!user.value && to.path !== "/auth") {
    return navigateTo("/auth");
  }
});
