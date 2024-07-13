<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      label="Email"
      type="email"
      placeholder="Type your email"
      name="email"
      v-model="email"
      :error="emailError"
      classInput="h-[48px]"
    />
    <Textinput
      label="Password"
      type="password"
      placeholder="8+ characters, 1 capital letter"
      name="password"
      v-model="password"
      :error="passwordError"
      hasicon
      classInput="h-[48px]"
    />

    <div class="flex justify-between">
      <label class="cursor-pointer flex items-start">
        <input
          type="checkbox"
          class="hidden"
          @change="toggleCheckbox"
        />
        <span
          class="h-4 w-4 border rounded flex-none inline-flex mr-3 relative top-1 transition-all duration-150"
          :class="
            checkbox
              ? 'ring-2 ring-black-500 dark:ring-offset-slate-600 dark:ring-slate-900  dark:bg-slate-900 ring-offset-2 bg-slate-900'
              : 'bg-slate-100 dark:bg-slate-600 border-slate-100 dark:border-slate-600 '
          "
        >
          <img
            src="@/assets/images/icon/ck-white.svg"
            alt=""
            class="h-[10px] w-[10px] block m-auto"
            v-if="checkbox"
          />
        </span>
        <span class="text-slate-500 dark:text-slate-400 text-sm leading-6"
          >Keep me signed in</span
        >
      </label>
      <router-link
        to="/forgot-password"
        class="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >Forgot Password?</router-link
      >
    </div>

    <button type="submit" class="btn btn-dark block w-full text-center">
      Sign in
    </button>
  </form>
</template>

<script>
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import apiClient from '@/plugins/axios';
import axios from "axios";

export default {
  components: {
    Textinput,
  },
  data() {
    return {
      email: 'admin@gmail.com',
      password: 'Demo1234',
      checkbox: false,
      emailError: '',
      passwordError: '',
      toast: useToast(),
      router: useRouter(),
    };
  },
  methods: {
    toggleCheckbox() {
      this.checkbox = !this.checkbox;
    },
    onSubmit() {
      const schema = yup.object({
        email: yup.string().required("Email is required").email(),
        password: yup.string().required("Password is required").min(8),
      });

      schema.validate({
        email: this.email,
        password: this.password,
      })
      .then(() => {
        console.log('Login in.......');
        apiClient.post(`/api/login/`, {'email': this.email, 'password': this.password})
       .then((response) => {
          this.toast.success("Login successfully", { timeout: 2000 });
          localStorage.setItem('token', response.data.token);
          console.log('Token: ', response.data);
          this.router.push("/");
        }).catch((error) => {
          console.log('Error message: ', error.message);
          this.toast.error(error.message, { timeout: 2000 });
        });
      })
      .catch((error) => {
        if (error.path === 'email') {
          this.emailError = error.errors[0];
        } else if (error.path === 'password') {
          this.passwordError = error.errors[0];
        }
      });
    }
  }
};
</script>

<style lang="scss"></style>
