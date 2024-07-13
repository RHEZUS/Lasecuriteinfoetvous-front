<template>
    <div class="modal-groups">
        <Modal :showLabel="false" :title="formMode === 'create' ? 'Create New Category' : 'Update Category'" 
               label="Create User" labelClass="btn-outline-primary h-10 flex items-center" 
               ref="modal1" themeClass="bg-primary-500">
            <form @submit.prevent="formMode === 'create' ? createUser() : updateUser()"  class="text-base text-slate-600 dark:text-slate-300">
                <Textinput type="text" placeholder="Category Name"
                           name="name" v-model="form.name" :error="nameError" 
                           classInput="h-[48px] mb-3"/>
                <Textarea  placeholder="Description of the category"
                          v-model="form.description" :error="descError" 
                           hasicon classInput="min-h-[48px]"></Textarea>
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
import Textarea from "@/components/Textarea";
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
                description: '',
            },
            nameError: '',
            parentError: '',
            descError: '',
            toast: useToast(),
            router: useRouter(),
        }
    },
    components: {
        Modal,
        Button,
        Textinput,
        Select,
        Textarea,
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
                //email: yup.string().required("Email is required").email(),
                //role: yup.string().required("Role is required"),
                //password: yup.string().required("Password is required").min(8),
            });
            schema.validate({
                name: this.form.name,
                //email: this.form.email,
                //role: this.form.role,
                //password: this.form.password,
            })
        },

        loadEditData(item){
            console.log('Loading data form...');
            this.form.id = item.id
            this.form.name = item.name;
            this.form.description = item.description;
            console.log('Form after load', this.form)
        },

        resetForm(){
            this.form.name = '';
            this.form.description = '';
            //console.log('Form after reset', this.form)

        },
        createUser(){
            const schema = yup.object({
                name: yup.string().required("Name is required"),
            });
            schema.validate({
                name: this.form.name,
            }).then(() =>{
                console.log('Creating user...');
                apiClient.post(`/api/admin/forum/category/create`, this.form, {withCredentials:true})
               .then(response => {
                    this.$refs.modal1.closeModal();
                    this.toast.success("Registered successfully", { timeout: 2000 });
                    this.resetForm();
                    this.loadData();
                    console.log(response);
                    //this.router.push("/");
                }).catch(error => {
                    console.log('Error message: ', error);
                    const errors = error.response.data.errors;
                    if (errors.hasOwnProperty('name')){
                        this.nameError = errors.name[0];
                    }
                    if (errors.hasOwnProperty('parent_category_id')){
                        this.parentError = errors.parent_category_id[0];
                    }
                    if (errors.hasOwnProperty('description')){
                        this.descError = errors.desc[0];
                    }
                    this.toast.error(error.message, { timeout: 6000 });
                })
            }).catch((error) => {
                if (error.path === 'name'){
                    this.nameError = error.errors[0];
                } else if (error.path === 'parent_category_id') {
                    this.parentError = error.errors[0];
                } else if (error.path === 'description') {
                    this.descError = error.errors[0];
                }
            });
        },
        updateUser(){
            const schema = yup.object({
                name: yup.string().required("Name is required"),
            });
            schema.validate({
                name: this.form.name,
            }).then(() =>{
                console.log('Updating category...');
                apiClient.put(`/api/admin/forum/category/update/${this.form.id}`, this.form)
               .then(response => {
                    this.$refs.modal1.closeModal();
                    this.toast.success("Registered successfully", { timeout: 2000 });
                    this.resetForm();
                    this.loadData();
                    //this.router.push("/");
                }).catch(error => {
                    console.log('Error message: ', error);
                    const errors = error.response.data.errors;
                    if (errors.hasOwnProperty('name')){
                        this.nameError = errors.name[0];
                    }
                    if (errors.hasOwnProperty('parent_category_id')){
                        this.parentError = errors.parent_category_id[0];
                    }
                    if (errors.hasOwnProperty('desc')){
                        this.descError = errors.desc[0];
                    }
                    this.toast.error(error.message, { timeout: 6000 });
                })
            }).catch((error) => {
                if (error.path === 'name'){
                    this.nameError = error.errors[0];
                } else if (error.path === 'parent_category_id') {
                    this.parentError = error.errors[0];
                } else if (error.path === 'desc') {
                    this.descError = error.errors[0];
                }
            });
        }
    }
};
</script>
<style lang=""></style>
  