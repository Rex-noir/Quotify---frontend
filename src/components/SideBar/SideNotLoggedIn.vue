<script setup lang="ts">
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Password from "primevue/password";
import Divider from "primevue/divider";
import { ref } from "vue";
import AuthUtils from "@/utils/auth.utils";
import { useRouter } from "vue-router";
import Message from "primevue/message";
import { isAxiosError } from "axios";

const login = ref<{
  credential: string;
  password: string;
}>({
  credential: "",
  password: "",
});

const theRouter = useRouter();
const errorMessage = ref<string>();
const loginLoading = ref<boolean>(false);
const handleLogin = async () => {
  try {
    loginLoading.value = true;

    const isEmail = login.value.credential.includes("@");

    const credentials = {
      [isEmail ? "email" : "username"]: login.value.credential,
      password: login.value.password,
    };
    await AuthUtils.login(credentials);
    loginLoading.value = false;
    location.reload();
  } catch (error) {
    if (isAxiosError(error)) {
      errorMessage.value = error.response?.data.message;
    }
    loginLoading.value = false;
  }
};
</script>
<template>
  <div
    class="flex h-full w-full flex-col items-center bg-surface-100 p-3 dark:bg-surface-0"
  >
    <div
      class="title-styles prose sticky top-28 flex w-full flex-col items-center justify-center dark:prose-invert"
    >
      <form @submit.prevent="handleLogin" class="flex flex-col gap-3">
        <h1 class="mb-0 p-0">Login</h1>
        <Message
          :severity="errorMessage ? 'error' : 'secondary'"
          class="text-center"
        >
          {{ errorMessage || '"Welcome back, mate!" - Anon' }}
        </Message>
        <InputGroup>
          <InputGroupAddon class="border-none">
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText
            class="prose border-none dark:prose-invert"
            autocomplete="email"
            placeholder="Email or username"
            name="email"
            v-model="login.credential"
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon class="border-none">
            <i class="pi pi-key"></i>
          </InputGroupAddon>
          <Password
            toggle-mask
            name="password"
            :input-props="{
              autocomplete: true,
              class: 'border-none prose dark:prose-invert',
            }"
            placeholder="Password"
            v-model="login.password"
            :feedback="false"
          />
        </InputGroup>
        <Button
          :loading="loginLoading"
          severity="info"
          outlined
          type="submit"
          size="small"
          class="mx-auto w-full"
          label="Login"
        />
      </form>
      <Divider align="center" type="solid">
        <span class="dark:text-white">Or</span>
      </Divider>
      <Button
        severity="success "
        outlined
        size="small"
        @click="theRouter.push({ name: 'signup' })"
        class="mx-auto w-fit"
        label="Sign Up"
      />
    </div>
  </div>
</template>
<style>
.p-password-input {
  @apply border-slate-300;
}
.p-divider {
  @apply before:border-slate-300;
}
.title-styles {
  @apply prose prose-h1:prose-2xl prose-h1:m-0 prose-h1:text-center; /*titles*/
}
.p-message-content {
  @apply justify-center p-0 px-1;
}
</style>
