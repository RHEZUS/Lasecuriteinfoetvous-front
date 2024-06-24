<template>
    <div class="modal-groups">
        <Modal :showLabel="false" :title="formMode === 'create' ? 'Create New User' : 'Update User'" 
               label="Create User" labelClass="btn-outline-primary h-10 flex items-center" 
               ref="modal1" themeClass="bg-primary-500">
            <form @submit.prevent="formMode === 'create' ? createUser() : updateUser()"  class="text-base text-slate-600 dark:text-slate-300">
                <Textinput type="text" placeholder="Full Name"
                           name="name" v-model="form.name" :error="nameError" 
                           classInput="h-[48px] mb-3"/>
                <Textinput type="email" placeholder="Type your email"
                           name="email" v-model="form.email" :error="emailError" 
                           classInput="h-[48px] mb-3"/>
                <Select v-model="form.role" :error="roleError" :options="roleOptions" 
                        :placeholder="'Select User\'s role'" classInput="h-[48px] mb-3"></Select>
                <Textinput v-if="formMode === 'create'" type="password" placeholder="8+ characters, 1 capital letter"
                           name="password" v-model="form.password" :error="passwordError" 
                           hasicon classInput="h-[48px]"/>
                <div class="py-3 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-700">
                    <Button type="submit" text="Save" btnClass="btn-primary h-10 flex items-center"/>
                </div>
            </form>
            
        </Modal>
    </div>
    
</template>
<script>
import Button from "@/components/Button";
import Modal from "@/components/Modal/Modal";
import Textinput from "@/components/Textinput";
import Select from '@/components/Select';
import * as yup from "yup";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import apiClient from "@/plugins/axios";
export default {
    data(){
        return {
            form:{
                name: '',
                email: '',
                role: '',
                password: '',
            },
            nameError: '',
            emailError: '',
            roleError: '',
            passwordError: '',
            toast: useToast(),
            router: useRouter(),
            roleOptions:[
                {value: 'admin', label: 'Admin'},
                {value: 'publisher', label: 'Publisher'},
                {value: 'moderator', label: 'Moderator'},
                {value: 'user', label: 'User'},
            ]
        }
    },
    components: {
        Modal,
        Button,
        Textinput,
        Select,
    },
    props: {
        formMode:{
            type: String,
            required: true,
        },
        user:{
            type: Object,
            required: true,
            default: [],
        },
        loadData:{
            type: Function,
            required: true,
        }
    },
    methods:{
        validator(){
            const schema = yup.object({
                name: yup.string().required("Name is required"),
                email: yup.string().required("Email is required").email(),
                role: yup.string().required("Role is required"),
                password: yup.string().required("Password is required").min(8),
            });
            schema.validate({
                name: this.form.name,
                email: this.form.email,
                role: this.form.role,
                password: this.form.password,
            })
        },

        loadEditData(user){
            console.log('Loading data form...');
            this.form.id = user.id
            this.form.name = user.name;
            this.form.email = user.email;
            this.form.role = user.role;
            console.log('Form after load', this.form)
        },

        resetForm(){
            this.form.name = '';
            this.form.email = '';
            this.form.role = '';
            this.form.password = '';
            //console.log('Form after reset', this.form)

        },
        createUser(){
            const schema = yup.object({
                name: yup.string().required("Name is required"),
                email: yup.string().required("Email is required").email(),
                role: yup.string().required("Role is required"),
                password: yup.string().required("Password is required").min(8),
            });
            schema.validate({
                name: this.form.name,
                email: this.form.email,
                role: this.form.role,
                password: this.form.password,
            }).then(() =>{
                console.log('Creating user...');
                apiClient.post(`/api/admin/user/create`, this.form, {withCredentials:true})
               .then(response => {
                    this.toast.success("Registered successfully", { timeout: 2000 });
                    this.resetForm();
                    this.loadData();
                    //console.log(response);
                    //this.router.push("/");
                }).catch(error => {
                    console.log('Error message: ', error);
                    const errors = error.response.data.errors;
                    if (errors.hasOwnProperty('name')){
                        this.nameError = errors.name[0];
                    }
                    if (errors.hasOwnProperty('email')){
                        this.emailError = errors.email[0];
                    }
                    if (errors.hasOwnProperty('role')){
                        this.emailError = errors.role[0];
                    }
                    if (errors.hasOwnProperty('password')){
                        this.passwordError = errors.password[0];
                    }
                    this.toast.error(error.message, { timeout: 6000 });
                })
            }).catch((error) => {
                if (error.path === 'name'){
                    this.nameError = error.errors[0];
                } else if (error.path === 'email') {
                    this.emailError = error.errors[0];
                } else if (error.path === 'role') {
                    this.roleError = error.errors[0];
                } else if (error.path === 'password') {
                    this.passwordError = error.errors[0];
                }
            });
        },
        updateUser(){
            console.log('Updating user...', this.form);
            const schema = yup.object({
                name: yup.string().required("Name is required"),
                email: yup.string().required("Email is required").email(),
                role: yup.string().required("Role is required"),
            });
            schema.validate({
                name: this.form.name,
                email: this.form.email,
                role: this.form.role,
            }).then(() =>{
                console.log('Updating user...');
                apiClient.put(`/api/admin/user/update/${this.form.id}`, this.form)
               .then(response => {
                    this.toast.success("Registered successfully", { timeout: 2000 });
                    this.resetForm();
                    //this.loadData();
                    //this.router.push("/");
                }).catch(error => {
                    console.log('Error message: ', error);
                    const errors = error.response.data.errors;
                    if (errors.hasOwnProperty('name')){
                        this.nameError = errors.name[0];
                    }
                    if (errors.hasOwnProperty('email')){
                        this.emailError = errors.email[0];
                    }
                    if (errors.hasOwnProperty('role')){
                        this.emailError = errors.role[0];
                    }
                    if (errors.hasOwnProperty('password')){
                        this.passwordError = errors.password[0];
                    }
                    this.toast.error(error.message, { timeout: 2000 });
                })
            }).catch((error) => {
                if (error.path === 'name'){
                    this.nameError = error.errors[0];
                } else if (error.path === 'email') {
                    this.emailError = error.errors[0];
                } else if (error.path === 'role') {
                    this.roleError = error.errors[0];
                } else if (error.path === 'password') {
                    this.passwordError = error.errors[0];
                }
            });
        }
    }
};
</script>
<style lang=""></style>
  