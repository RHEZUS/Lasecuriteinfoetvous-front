<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      label="Full name"
      type="text"
      placeholder="Full Name"
      name="name"
      v-model="name"
      :error="nameError"
      classInput="h-[48px]"
    />
    <Textinput
      label="Email"
      type="email"
      placeholder="Type your email"
      name="emil"
      v-model="email"
      :error="emailError"
      classInput="h-[48px]"
    />
    <Textinput
      label="Password"
      type="password"
      placeholder="8+ characters, 1 capitat letter "
      name="password"
      v-model="password"
      :error="passwordError"
      hasicon
      classInput="h-[48px]"
    />

    <label class="cursor-pointer flex items-start">
      <input
        type="checkbox"
        class="hidden"
        @change="() => (checkbox = !checkbox)"
      />
      <span
        class="h-4 w-4 border rounded inline-flex mr-3 relative flex-none top-1 transition-all duration-150"
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
        >You accept our Terms and Conditions and Privacy Policy</span
      >
    </label>

    <button type="submit" class="btn btn-dark block w-full text-center">
      Create an account
    </button>
  </form>
</template>
<script>
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import apiClient from "@/plugins/axios";
import axios from "axios";

export default {
  components: {
    Textinput,
  },
  data() {
    return {
      email: 'admin@gmail.com',
      password: 'Demo1234',
      name: 'Admin',
      nameError: '',
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
        name: yup.string().required("Name is required"),
      });

      schema.validate({
        email: this.email,
        password: this.password,
        name: this.name,
      })
      .then(() => {
        console.log('Login in.......');
        apiClient(`/api/register/`, {'name': this.name ,'email': this.email, 'password': this.password})
       .then((response) => {
          this.toast.success("Registered successfully", { timeout: 2000 });
          this.router.push("/login");
        }).catch((error) => {
          console.log('Error message: ', error.response.data.errors);
          const errors = error.response.data.errors;
          if (errors.hasOwnProperty('name')){
            this.nameError = errors.name[0];
          }
          if (errors.hasOwnProperty('email')){
            this.emailError = errors.email[0];
          }
          if (errors.hasOwnProperty('password')){
            this.passwordError = errors.password[0];
          }
          this.toast.error(error.message, { timeout: 2000 });
        });
      })
      .catch((error) => {
        if (error.path === 'email') {
          this.emailError = error.errors[0];
        } else if (error.path === 'password') {
          this.passwordError = error.errors[0];
        }else if (error.path === 'name') {
          this.nameError = error.errors[0];
        }
      });
    }
  }
};
</script>
<style lang="scss"></style>
