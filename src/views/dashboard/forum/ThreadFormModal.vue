<template>
    <div class="modal-groups">
        <Modal sizeClass="max-w-5xl" :showLabel="false" :title="formMode === 'create' ? 'Create New Thread' : 'Update thread'" 
               label="Create Thread" labelClass="btn-outline-primary h-10 flex items-center" 
               ref="modal1" themeClass="bg-primary-500">
            <form @submit.prevent="formMode === 'create' ? createThread() : updateThread()"  class="text-base text-slate-600 dark:text-slate-300  grid grid-cols-12 gap-3 items-center">
                <div class="col-span-12">
                    <Textinput  type="text" placeholder="Thread title"
                           name="name" v-model="form.title" :error="titleError" 
                           classInput="h-[48px] mb-3"/>
                </div>
                <div class="col-span-12 sm:col-span-6">
                    <Select v-model="form.category_id" :error="categoryError" :options="categoryOptions" 
                        :placeholder="'Select category'" classInput="h-[48px] mb-3"></Select>
                </div>
                <div class="col-span-12 sm:col-span-6">
                    <VueSelect :options="TagsOptions" :class="'h-[48px]'" v-model="form.tags" :placeholder="'Select Tags'"  multiple />
                </div>
                <div class="col-span-full relative" style="z-index: 500;" >
                    <Editor
                        api-key="zkifj1pjj6bq4nc4f9o2sfurf48pmddl3mq8tvhcitscxp0n"
                        :init="editorConfig"
                        initial-value="Thread content"
                        v-model="form.body"
                    />
                </div>
                
                <div class="col-span-full py-3 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-700">
                    <Button type="submit" text="Save" btnClass="btn-primary h-10 flex items-center"/>
                </div>
            </form>
            
        </Modal>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import Editor from '@tinymce/tinymce-vue'
import Button from "@/components/Button";
import Modal from "@/components/Modal/Modal";
import Textinput from "@/components/Textinput";
import Textarea from "@/components/Textarea";
import Switch from "@/components/Switch";
import Select from '@/components/Select';
import FileInput from "@/components/Fileinput"
import * as yup from "yup";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import apiClient from "@/plugins/axios";
import VueSelect from "@/components/Select/VueSelect";
export default defineComponent({
    data(){
        return {
            form:{
                title: '',
                category_id: '',
                body: '',
                tags: [],
            },
            titleError: '',
            categoryError: '',
            contentError: '',

            toast: useToast(),
            router: useRouter(),
            categoryOptions:[],
            TagsOptions: [],
            editorConfig: {
                selector: '#your-textarea',
                fixed_toolbar_container: '#your-toolbar-container',
                toolbar_mode: 'sliding',
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
                ],
                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                setup: (editor) => {
                    editor.on('init', () => {
                        this.modifyTinyMCEStyles();
                    });
                },
            }
        }
    },
    components: {
        Modal,
        Button,
        Textinput,
        Select,
        Textarea,
        Switch,
        FileInput,
        Editor,
        VueSelect,
    },
    props: {
        formMode:{
            type: String,
            required: true,
        },
        loadData:{
            type: Function,
            required: true,
        }
    },
    methods:{
        modifyTinyMCEStyles() {
            // Modify TinyMCE's dropdown and dialog styles
            const tinymceAux = document.querySelector('.tox-tinymce-aux');
            const tinymceDialog = document.querySelector('.tox-dialog');

            if (tinymceAux) {
                tinymceAux.style.zIndex = '200000'; // Ensure this value is higher than your modal's z-index
                console.log('Modified')
            }

            if (tinymceDialog) {
                tinymceDialog.style.zIndex = '2100'; // Ensure this value is higher than your modal's z-index
            }
        },

        loadEditData(item){
            console.log('Loading data form...');
            this.form.id = item.id
            this.form.title = item.title;
            this.form.category_id = item.category_id;
            this.form.body = item.body;
            this.form.tags = item.tags.map(tag => tag.id);
            console.log(this.form.tags);
        },

        resetForm(){
            this.form.title = '';
            this.form.category_id = '';
            this.form.body = '';
            this.form.tags = [];
        },

        async FetchCategories(){
          await apiClient.get(`/api/admin/forum/categories`)
          .then((response) => {
                this.categoryOptions = response.data.categories.map(category => ({
                    value: category.id,
                    label: category.name
                }));
              //console.table(this.categoryOptions);
          }).catch((error) => {
              this.toast.error('Failed to fetch categories', { timeout: 2000 });
              //console.log(error);
          });
        },
        fetchTags(){
            apiClient.get(`/api/admin/forum/tags`)
            .then(response => {
                this.TagsOptions = response.data.tags.map(tag => ({
                    value: tag.id,
                    label: tag.name
                }));
                //console.table(this.TagsOptions);
            }).catch(error => {
                this.toast.error('Failed to fetch tags', { timeout: 2000 });
                console.log(error);
            });
        },
        createThread(){
            console.log('creating thread');
            const schema = yup.object({
                title: yup.string().required("Name is required"),
                category_id: yup.number().required("Category is required"),
                body: yup.string().required("Content is required"),
            });
            schema.validate({
                title: this.form.title,
                category_id: this.form.category_id,
                body: this.form.body,

            }).then(() =>{
                console.log(this.form);
                apiClient.post(`/api/forum/thread/create`, this.form,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
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
                    if (errors.hasOwnProperty('title')){
                        this.titleError = errors.name[0];
                    }
                    if (errors.hasOwnProperty('category_id')){
                        this.categoryError = errors.category_id[0];
                    }
                    if (errors.hasOwnProperty('body')){
                        this.contentError = errors.content[0];
                    }
                    this.toast.error(error.message, { timeout: 6000 });
                })
            }).catch((error) => {
                if (error.path === 'title'){
                    this.titleError = error.errors[0];
                } else if (error.path === 'category_id') {
                    this.categoryError = error.errors[0];
                } else if (error.path === 'content') {
                    this.contentError = error.errors[0];
                }
            });
        },
        updateThread(){
            console.log('updating thread');
            const schema = yup.object({
                title: yup.string().required("Name is required"),
                category_id: yup.number().required("Category is required"),
                body: yup.string().required("Content is required"),
            });
            schema.validate({
                title: this.form.title,
                category_id: this.form.category_id,
                body: this.form.body,

            }).then(() =>{
                console.log('creating form: ', this.form);
                apiClient.post(`/api/forum/thread/update`, this.form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
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
                    if (errors.hasOwnProperty('title')){
                        this.titleError = errors.name[0];
                    }
                    if (errors.hasOwnProperty('category_id')){
                        this.categoryError = errors.category_id[0];
                    }
                    if (errors.hasOwnProperty('body')){
                        this.contentError = errors.content[0];
                    }
                    this.toast.error(error.message, { timeout: 6000 });
                })
            }).catch((error) => {
                if (error.path === 'title'){
                    this.titleError = error.errors[0];
                } else if (error.path === 'category_id') {
                    this.categoryError = error.errors[0];
                } else if (error.path === 'body') {
                    this.contentError = error.errors[0];
                }
            });
        },
    },
    mounted(){
        this.FetchCategories();
        this.fetchTags();
    },
});
</script>
<style lang="css" scoped>
</style>
  