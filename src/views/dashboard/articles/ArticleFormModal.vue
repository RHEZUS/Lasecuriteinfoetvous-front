<template>
    <div class="modal-groups">
        <Modal sizeClass="max-w-5xl" :showLabel="false" :title="formMode === 'create' ? 'Create New Article' : 'Update Article'" 
               label="Create Article" labelClass="btn-outline-primary h-10 flex items-center" 
               ref="modal1" themeClass="bg-primary-500">
            <form @submit.prevent="formMode === 'create' ? createArticle() : updateArticle()"  class="text-base text-slate-600 dark:text-slate-300 grid grid-cols-12 gap-3">
                <div class="col-span-12 sm:col-span-6">
                    <Textinput  type="text" placeholder="Article title"
                           name="name" v-model="form.title" :error="titleError" 
                           classInput="h-[48px] mb-3"/>
                </div>
                <div class="col-span-12 sm:col-span-6">
                    <Select v-model="form.category_id" :error="categoryError" :options="categoryOptions" 
                        :placeholder="'Select category'" classInput="h-[48px] mb-3"></Select>
                </div>
                <div class="col-span-12 sm:col-span-6">
                    <FileInput ref="fileInput" :error="imageError" preview filenametag name="preview" class="mb-3" @input="handleFileSelected" />
                </div>
                <div class="col-span-12 sm:col-span-6">
                    <Switch label="Is published" class="mb-3" v-model="form.is_published" :activeClass="'bg-primary-500'" :active="form.is_published ? true : false"></Switch>
                </div>
                <div class="col-span-12 relative z-50">
                    <Editor
                        api-key="zkifj1pjj6bq4nc4f9o2sfurf48pmddl3mq8tvhcitscxp0n"
                        :init="editorConfig"
                        initial-value="Story content"
                        v-model="form.content"
                    />
                    
                </div>
                <div class="py-3 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-700 col-span-12">
                    <Button type="submit" text="Save" btnClass="btn-primary h-10 flex items-center"/>
                </div>
            </form>
            
        </Modal>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import Editor from '@tinymce/tinymce-vue';
import Button from "@/components/Button";
import Modal from "@/components/Modal/Modal";
import Textinput from "@/components/Textinput";
import Textarea from "@/components/Textarea";
import Switch from "@/components/Switch";
import Select from '@/components/Select';
import FileInput from "@/components/Fileinput";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import apiClient from "@/plugins/axios";
export default defineComponent({
    components: {
        Modal,
        Button,
        Textinput,
        Select,
        Textarea,
        Switch,
        FileInput,
        Editor,
    },
    data(){
        return {
            form:{
                title: '',
                category_id: '',
                content: '',
                image: '',
                is_published:false,
            },
            titleError: '',
            categoryError: '',
            contentError: '',
            imageError: '',
            is_publishedError: '',
            selectedFile: null,

            toast: useToast(),
            router: useRouter(),
            categoryOptions:[],
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
        modifyTinyMCEStyles() {
            // Modify TinyMCE's dropdown and dialog styles
            const tinymceAux = document.querySelector('.tox-tinymce-aux');
            const tinymceDialog = document.querySelector('.tox-dialog');

            if (tinymceAux) {
                tinymceAux.style.zIndex = '200000'; // Ensure this value is higher than your modal's z-index
            }

            if (tinymceDialog) {
                tinymceDialog.style.zIndex = '2100'; // Ensure this value is higher than your modal's z-index
            }
        },
        validator(){
            const schema = yup.object({
                title: yup.string().required("Name is required"),
                category_id: yup.number().required("Category is required"),
                content: yup.string().required("Content is required"),
                is_published: yup.boolean().required("Is published is required"),
            });
            schema.validate({
                title: this.form.title,
                category_id: this.form.category_id,
                content: this.form.content,
                is_published: this.form.is_published,
            })
        },

        loadEditData(item){
            console.log('Loading data form...');
            this.form.id = item.id
            this.form.title = item.title;
            this.form.category_id = item.category_id;
            this.form.content = item.content;
            this.form.is_published = item.is_published;
            this.form.image = item.image;
            console.log('Form after load', this.form)
        },

        resetForm(){
            this.form.title = '';
            this.form.category_id = '';
            this.form.content = '';
            this.form.is_published = true;
            this.form.image = '';
            //console.log('Form after reset', this.form)
        },
        handleFileSelected(file) {
            this.form.image = file;
            console.log(this.form.image);
        },

        async FetchCategories(){
          await apiClient.get(`/api/admin/article/categories`)
          .then((response) => {
                this.categoryOptions = response.data.categories.map(category => ({
                    value: category.id,
                    label: category.name
                }));
              //console.table(this.categoryOptions);
          }).catch((error) => {
              this.toast.error('Failed to fetch categories', { timeout: 2000 });
              console.log(error);
          });
        },
        createArticle(){
            const schema = yup.object({
                title: yup.string().required("Name is required"),
                category_id: yup.number().required("Category is required"),
                content: yup.string().required("Content is required"),
                is_published: yup.boolean().required("Is published is required"),
                image: yup.mixed().required("The image is required"),
            });
            schema.validate({
                title: this.form.title,
                category_id: this.form.category_id,
                content: this.form.content,
                is_published: this.form.is_published,
                image: this.form.image,

            }).then(() =>{
                console.log(this.form);
                apiClient.post(`/api/admin/article/create`, this.form, {
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
                    if (errors.hasOwnProperty('content')){
                        this.contentError = errors.content[0];
                    }
                    if (errors.hasOwnProperty('image')){
                        this.ImageError = errors.content[0];
                    }
                    if (errors.hasOwnProperty('is_published')){
                        this.is_publishedError = errors.is_published[0];
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
                } else if (error.path === 'image') {
                    this.imageError = error.errors[0];
                } else if (error.path === 'is_published') {
                    this.is_publishedError = error.errors[0];
                }
            });
        },
        updateArticle(){
            const schema = yup.object({
                title: yup.string().required("Name is required"),
                category_id: yup.number().required("Category is required"),
                content: yup.string().required("Content is required"),
                is_published: yup.boolean().required("Is published is required"),
                image: yup.mixed().nullable("The image is required"),
            });
            schema.validate({
                title: this.form.title,
                category_id: this.form.category_id,
                content: this.form.content,
                is_published: this.form.is_published,
                image: this.form.image,

            }).then(() =>{
                console.log('updating form: ');
                apiClient.post(`/api/admin/article/update/${this.form.id}`, this.form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
               .then(response => {
                    this.$refs.modal1.closeModal();
                    this.toast.success("Registered successfully", { timeout: 2000 });
                    this.resetForm();
                    this.loadData();
                }).catch(error => {
                    console.log('Error message: ', error);
                    const errors = error.response.data.errors;
                    if (errors.hasOwnProperty('title')){
                        this.titleError = errors.name[0];
                    }
                    if (errors.hasOwnProperty('category_id')){
                        this.categoryError = errors.category_id[0];
                    }
                    if (errors.hasOwnProperty('content')){
                        this.contentError = errors.content[0];
                    }
                    if (errors.hasOwnProperty('is_published')){
                        this.is_publishedError = errors.is_published[0];
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
                } else if (error.path === 'image') {
                    this.imageError = error.errors[0];
                } else if (error.path === 'is_published') {
                    this.is_publishedError = error.errors[0];
                }
            });
        }
    },
    mounted(){
        this.FetchCategories();
        //const fileInput = $refs.fileInput.$el.querySelector('input[type="file"]');
        //if (fileInput) {
        //    fileInput.addEventListener('change', this.handleFileChange);
        //}
    },
    //beforeDestroy() {
    //    const fileInput = this.$refs.fileInput.querySelector('input[type="file"]');
    //    if (fileInput) {
    //        fileInput.removeEventListener('change', this.handleFileChange);
    //    }
    //},
});
</script>
<style lang="css" scoped>
.tox-tinymce-aux {
    z-index: 100000 !important; /* Ensure this value is higher than your modal's z-index */
}

.tox-dialog {
    z-index: 110000 !important; /* Also increase the z-index of TinyMCE dialogs */
}
</style>
  