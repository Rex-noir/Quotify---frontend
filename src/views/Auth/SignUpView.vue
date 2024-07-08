<script setup lang="ts">
import { ref } from "vue";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Password from "primevue/password";

const signUp = ref<{
  email: string;
  password: string;
  username: string;
}>({
  email: "",
  password: "",
  username: "",
});
</script>
<template>
  <div
    class="prose flex h-full max-w-none flex-col items-center justify-start gap-10 p-3 dark:prose-invert"
  >
    <div class="md:w-[50%]">
      <h3 class="text-center">SIGN UP</h3>
      <form @submit.prevent="">
        <div class="flex flex-col gap-2">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText
              class="border-surface-300"
              autocomplete="email"
              placeholder="Username"
              name="username"
              type="text"
              v-model="signUp.email"
            />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-at"></i>
            </InputGroupAddon>
            <InputText
              class="border-surface-300"
              autocomplete="email"
              placeholder="Email"
              name="email"
              type="email"
              v-model="signUp.email"
            />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-key"></i>
            </InputGroupAddon>
            <Password
              toggle-mask
              name="password"
              :input-props="{ autocomplete: true }"
              placeholder="Password"
              v-model="signUp.password"
              :feedback="false"
            />
          </InputGroup>
          <Button
            severity="success"
            outlined
            type="submit"
            size="small"
            class="mx-auto w-full"
            label="Sign Up"
          />
        </div>
      </form>
    </div>
    <div class="flex items-center justify-center gap-1">
      Already have an account? You can sign in
      <Button as="a" outlined class="border-none p-0" severity="info">
        here.</Button
      >
    </div>
  </div>
</template>
