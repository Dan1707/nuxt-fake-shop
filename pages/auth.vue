<script setup lang="ts">
import Checkbox from "~/components/ui/checkbox/Checkbox.vue";

const anableSubmit = ref(false);
const showSignUp = ref(true);

const supabase = useSupabaseClient();
const router = useRouter();

const auth = reactive({
  email: ref(""),
  password: ref(""),
  name: ref(""),
});

const signUp = async () => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: auth.email,
      password: auth.password,
      options: {
        data: {
          name: auth.name,
        },
      },
    });
    if (error) {
      throw error;
    } else {
      console.log(data);
    }
  } catch (error) {
    console.log(`Error with sign up: ${error}`);
  }
};

const Login = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: auth.email,
      password: auth.password,
    });
    if (error) {
      throw error;
    } else {
      console.log(data);
      router.push("/");
    }
  } catch (error) {
    console.log(`Error with Login: ${error}`);
  }
};

const SIgnInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      throw error;
    } else {
      console.log(data);
    }
  } catch (error) {
    console.log(`Error with google sign in: ${error}`);
  }
};
</script>

<template>
  <section class="w-full my-8 flex items-center justify-center container">
    <form class="basis-[450px] text-center flex flex-col gap-4">
      <h2 class="text-3xl">{{ showSignUp ? `Sign up` : `Login` }}</h2>
      <Input
        v-if="showSignUp"
        placeholder="Full Name"
        type="text"
        v-model="auth.name"
        required
      />
      <Input placeholder="Email" type="email" v-model="auth.email" required />
      <Input
        placeholder="Password"
        type="password"
        v-model="auth.password"
        required
      />
      <div class="flex items-center justify-between phonel:flex-col gap-5">
        <div class="flex items-center space-x-2 cursor-pointer">
          <Checkbox id="terms" v-model:checked="anableSubmit" />
          <label
            for="terms"
            class="text-sm font-medium leading-none cursor-pointer"
          >
            Accept terms and conditions
          </label>
        </div>
        <NuxtLink to="/" class="text-sm font-medium hover:underline">
          Forgot password?
        </NuxtLink>
      </div>
      <Button
        type="submit"
        class="mt-4"
        :disabled="!anableSubmit"
        @click.prevent="showSignUp ? signUp() : Login()"
      >
        Submit
      </Button>

      <button class="hover:underline" @click.prevent="showSignUp = !showSignUp">
        {{ showSignUp ? `Have account? Login` : `Create account` }}
      </button>
      <Button
        variant="outline"
        class="border-primary text-lg"
        @click.prevent="SIgnInWithGoogle"
      >
        <Icon name="uil:google" style="color: var(--primary)" size="24" />
        Continue with Google
      </Button>
    </form>
  </section>
</template>
