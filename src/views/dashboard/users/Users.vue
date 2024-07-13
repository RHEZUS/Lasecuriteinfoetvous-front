<template>
  <div class="flex h-fit justify-between flex-wrap items-center py-2">
    <Breadcrumb/>
    <div class="modal-groups">
      <UserModal :load-data="FetchData" :formMode="formMode" :user="user" ref="formModal1"></UserModal>
      <Button @click="showCreateModal()" type="submit" text="Create User"  btnClass="btn-primary h-10 flex items-center"/>
    </div>
  </div>
  <div>
    <Card noborder>
      <div class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center">
        <h5>Articles</h5>
        <InputGroup v-model="searchTerm" placeholder="Search" type="text" prependIcon="heroicons-outline:search" merged/>
      </div>

      <vue-good-table
        :columns="columns"
        styleClass="vgt-table bordered centered"
        :rows="users"
        :pagination-options="{
          enabled: true,
          perPage: perpage,
        }"
        :search-options="{
          enabled: true,
          externalQuery: searchTerm,
        }"
      >
        <template v-slot:table-row="props">
          <span v-if="props.column.field == 'customer'" class="flex">
            <span class="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none">
              <img
                :src="props.row.customer.image"
                :alt="props.row.customer.name"
                class="object-cover w-full h-full rounded-full"
              />
            </span>
            <span
              class="text-sm text-slate-600 dark:text-slate-300 capitalize"
              >{{ props.row.customer.name }}</span
            >
          </span>
          <span v-if="props.column.field == 'order'">
            {{ "#" + props.row.order }}
          </span>
          <span
            v-if="props.column.field == 'created_at'"
            class="text-slate-500 dark:text-slate-300"
          >
          {{ formatDate(props.row.created_at) }}
        </span>
          <span v-if="props.column.field == 'is_active'" class="block w-full">
            <span
              class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
              :class="`${
                props.row.is_active === 1
                  ? 'text-success-500 bg-success-500'
                  : ''
              } 
            ${
              props.row.is_active === 'due'
                ? 'text-warning-500 bg-warning-500'
                : ''
            }
            ${
              props.row.is_active === 0
                ? 'text-danger-500 bg-danger-500'
                : ''
            }
            
              `"
            >
              {{ props.row.is_active == 1 ? 'Activated' : 'Deactivated'}}
            </span>
          </span>
          <span v-if="props.column.field == 'action'">
            <Dropdown classMenuItems="w-[140px] z-50">
              <span class="text-xl"
                ><Icon icon="heroicons-outline:dots-vertical"
              /></span>
              <template v-slot:menus class="z-50">
                <MenuItem>
                  <div class="hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50 w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse">
                    <span class="text-base"><Icon :icon="'heroicons-outline:eye'" /></span>
                    <span>View</span>
                  </div>
                </MenuItem>
                <MenuItem>
                  <div @click="showEditModal(props.row)" class="hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50 w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse">
                    <span class="text-base"><Icon :icon="'heroicons:pencil-square'" /></span>
                    <span>Update</span>
                  </div>
                </MenuItem>
                <MenuItem>
                  <div @click="deactivateItem(props.row.id)" v-if="props.row.is_active == 1" class="hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50 w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse">
                    <span class="text-base"><Icon :icon="'heroicons-outline:no-symbol'" /></span>
                    <span>Deactivate</span>
                  </div>
                  <div @click="activateItem(props.row.id)" v-else class="bg-green-500 text-green-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse">
                    <span class="text-base"><Icon :icon="'heroicons-outline:check-badge'" /></span>
                    <span>activate</span>
                  </div>
                </MenuItem>
                <MenuItem>
                  <div @click="confirmDelete(props.row.id)" class="bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse">
                    <span class="text-base"><Icon :icon="'heroicons-outline:trash'" /></span>
                    <span>Delete</span>
                  </div>
                </MenuItem>
              </template>
            </Dropdown>
          </span>
        </template>
        <template #pagination-bottom="props">
          <div class="py-4 px-3">
            <Pagination
              :total="50"
              :current="current"
              :per-page="perpage"
              :pageRange="pageRange"
              @page-changed="current = $event"
              :pageChanged="props.pageChanged"
              :perPageChanged="props.perPageChanged"
              enableSearch
              :options="options"
            >
              >
            </Pagination>
          </div>
        </template>
      </vue-good-table>
    </Card>
  </div>
  </template>
  <script>
  import Dropdown from "@/components/Dropdown";
  import Card from "@/components/Card";
  import Icon from "@/components/Icon";
  import InputGroup from "@/components/InputGroup";
  import Pagination from "@/components/Pagination";
  import { MenuItem } from "@headlessui/vue";
  import Button from "@/components/Button";
  import Modal from "@/components/Modal/Modal";
  import Textinput from "@/components/Textinput";
  import UserModal from "./UserFormModal.vue";
  import { useToast } from "vue-toastification";
  import apiClient from "@/plugins/axios";
  import Breadcrumb from "@/components/Breadcrumbs";
  export default {
    components: {
      Pagination,
      InputGroup,
      Dropdown,
      Icon,
      Card,
      MenuItem,
      Modal,
      Button,
      Textinput,
      UserModal,
      Breadcrumb,
    },
  
    data() {
      return {
        users: [],
        toast: useToast(),
        formMode: 'create',
        form: {
          name: '',
          email: '',
          role: '',
          phone_number: '',
          password: '',
        },
        user: [],
        current: 1,
        perpage: 10,
        pageRange: 1,
        searchTerm: "",
        actions: [
          {
            name: "view",
            icon: "heroicons-outline:eye",
          },
          {
            name: "edit",
            icon: "heroicons:pencil-square",
          },
          {
            name: "delete",
            icon: "heroicons-outline:trash",
          },
        ],
        options: [
          {
            value: "1",
            label: "1",
          },
          {
            value: "3",
            label: "3",
          },
          {
            value: "5",
            label: "5",
          },
        ],
        columns: [
            {
                label: "Id",
                field: "id",
            },
            {
                label: "Name",
                field: "name",
            },
            {
                label: "Email",
                field: "email",
            },
            {
                label: "Role",
                field: "role",
            },
            {
                label: "Status",
                field: "is_active",
            },
            {
                label: "Date",
                field: "created_at",
            },
            {
                label: "Action",
                field: "action",
            },
        ],
      };
    },
    methods: {
        async FetchData(){
            await apiClient.get(`/api/admin/users`, { withCredentials: true })
            .then((response) => {
                this.users = response.data.users;
                //console.table(this.users);
            }).catch((error) => {
                this.toast.error('Failed to fetch Users', { timeout: 2000 });
                console.log(error);
            });
        },

        showCreateModal(){
          this.formMode = 'create';
          this.$refs.formModal1.resetForm();
          this.$refs.formModal1.$refs.modal1.openModal();
        },

        showEditModal(user){
          this.formMode = 'edit';
          this.$refs.formModal1.resetForm();
          this.user = user;
          this.$refs.formModal1.loadEditData(user);
          this.$refs.formModal1.$refs.modal1.openModal();
        },

        formatDate(dateString) {
          const date = new Date(dateString);
          const options = { day: '2-digit', month: 'short', year: 'numeric' };
          //console.log(date.toLocaleDateString('en-US', options));
          return date.toLocaleDateString('en-US', options);
        },

        confirmDelete(itemId) {
          if (confirm('Are you sure you want to delete this item?')) {
            this.deleteItem(itemId);
          }
        },
        async deleteItem(itemId) {
          await apiClient.delete(`/api/admin/user/delete/${itemId}`, { withCredentials: true })
          .then((response) => {
              //this.users = response.data.users;
              //this.users = this.users.filter(item => item.id !== itemId);
              this.FetchData();
              //console.table(this.users);
              this.toast.success('User has been deleted successfully', { timeout: 2000 });
          }).catch((error) => {
              this.toast.error('Failed to delete Users', { timeout: 2000 });
              console.log(error);
          });
        },
        async activateItem(itemId){
          await apiClient.get(`/api/admin/user/activate/${itemId}`, { withCredentials: true })
          .then((response) => {
              //this.users = response.data.users;
              //this.users = this.items.filter(item => item.id !== itemId);
              this.FetchData();
              this.toast.success('User has been activated successfully', { timeout: 2000 });
              console.table(this.users);
          }).catch((error) => {
              this.toast.error('Failed to activate Users', { timeout: 2000 });
              console.log(error);
          });
        },
        async deactivateItem(itemId){
          await apiClient.get(`/api/admin/user/deactivate/${itemId}`, { withCredentials: true })
          .then((response) => {
              //this.users = response.data.users;
              this.FetchData();
              //this.users = this.items.filter(item => item.id !== itemId);
              this.toast.success('User has been deactivated successfully', { timeout: 2000 });
              console.table(this.users);
          }).catch((error) => {
              this.toast.error('Failed to deactivate Users', { timeout: 2000 });
              console.log(error);
          });
        }
    },
    mounted() {
      this.FetchData();
    },
  };
  </script>
  <style lang="scss"></style>
  