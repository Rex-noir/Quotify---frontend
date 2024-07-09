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
  email: string;
  password: string;
}>({
  email: "",
  password: "",
});

const theRouter = useRouter();
const errorMessage = ref<string>();
const loginLoading = ref<boolean>(false);
const handleLogin = async () => {
  try {
    loginLoading.value = true;
    await AuthUtils.login(login.value.email, login.value.password);
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
  <div class="h-full bg-surface-100 p-3">
    <div class="title-styles mt-10 flex w-full flex-col justify-center">
      <form @submit.prevent="handleLogin">
        <div class="flex flex-col justify-center gap-2">
          <h1 class="mb-0 p-0">Login</h1>
          <Message
            :severity="errorMessage ? 'error' : 'secondary'"
            class="text-center"
          >
            {{ errorMessage || '"Welcome back, mate!" - Anon' }}
          </Message>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText
              class="border-surface-300"
              autocomplete="email"
              placeholder="Email"
              name="email"
              type="email"
              v-model="login.email"
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
        </div>
      </form>
      <Divider align="center" type="solid">
        <b class="prose">Or</b>
      </Divider>
      <Button
        severity="success "
        outlined
        size="small"
        @click="theRouter.push({ name: 'signup' })"
        class="mx-auto w-full"
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
