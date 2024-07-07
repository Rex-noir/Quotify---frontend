<script setup lang="ts">
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Password from "primevue/password";
import Divider from "primevue/divider";
import { ref } from "vue";

const password = ref();
</script>
<template>
  <div class="p-5">
    <div class="title-styles flex flex-col">
      <div class="flex flex-col gap-2">
        <h1 class="mb-0 p-0">Login</h1>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText class="border-surface-300" placeholder="Username" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-key"></i>
          </InputGroupAddon>
          <Password
            toggle-mask
            placeholder="Password"
            v-model="password"
            :feedback="false"
          />
        </InputGroup>
        <Button
          severity="info"
          outlined
          size="small"
          class="mx-auto w-fit"
          label="Login"
        />
      </div>
      <Divider align="center" type="solid">
        <b class="prose">Or</b>
      </Divider>
      <div class="flex flex-col gap-2 p-2">
        <h1 class="mb-0 p-0">Sign Up</h1>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText class="border-surface-300" placeholder="Username" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-at"></i>
          </InputGroupAddon>
          <InputText class="border-surface-300" placeholder="Email" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-key"></i>
          </InputGroupAddon>
          <Password
            toggle-mask
            placeholder="Password"
            v-model="password"
            :feedback="false"
          />
        </InputGroup>
        <Button
          severity="success"
          outlined
          size="small"
          class="mx-auto w-fit"
          label="Sign Up"
        />
      </div>
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
</style>
