<template>
  <div>
    <Card noborder>
      <div class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center">
        <h5>Articles</h5>
        <InputGroup v-model="searchTerm" placeholder="Search" type="text" prependIcon="heroicons-outline:search" merged/>
      </div>

      <vue-good-table
        :columns="columns"
        styleClass="vgt-table bordered"
        :rows="stories"
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
          <span v-if="props.column.field == 'image'" class="flex">
            <span class="w-16 h-16 ltr:mr-3 rtl:ml-3 flex-none">
              <img
                :src="API_URL + 'storage/' + props.row.image_url"
                :alt="props.row.title + 'image'"
                class="object-cover w-full h-full "
              />
            </span>
          </span>
          <span
              v-if="props.column.field == 'created_at'"
              class="text-slate-500 dark:text-slate-300"
            >
            {{ formatDate(props.row.created_at) }}
          </span>
          <span v-if="props.column.field == 'audio'" class="block w-full relative">
            <audio controls class="relative">
              <source :src="API_URL + 'storage/' + props.row.audio" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
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
            <div class="flex space-x-3 rtl:space-x-reverse">
              <Tooltip placement="top" v-if="0 == 1" arrow theme="dark">
                <template #button>
                  <div class="action-btn">
                    <Icon icon="heroicons:eye" />
                  </div>
                </template>
                <span> View</span>
              </Tooltip>
              <Tooltip placement="top" arrow theme="dark">
                <template  #button>
                  <div @click="showEditModal(props.row)" class="action-btn">
                    <Icon icon="heroicons:pencil-square" />
                  </div>
                </template>
                <span> Edit</span>
              </Tooltip>
              <Tooltip  placement="top" arrow theme="danger-500">
                <template #button>
                  <div @click="confirmDelete(props.row.id)" class="action-btn">
                    <Icon icon="heroicons:trash" />
                  </div>
                </template>
                <span>Delete</span>
              </Tooltip>
            </div>
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
    <div class="modal-groups absolute top-[100px]  right-6">
      <StoryModal :load-data="FetchData" :formMode="formMode" :user="item" ref="formModal1"></StoryModal>
      <Button @click="showCreateModal()" type="submit" text="Create Story"  btnClass="btn-primary h-10 flex items-center"/>
    </div>
  </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
import Tooltip from "@/components/Tooltip";
import Dropdown from "@/components/Dropdown";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
import Pagination from "@/components/Pagination";
import { MenuItem } from "@headlessui/vue";
import Button from "@/components/Button";
import Modal from "@/components/Modal/Modal";
import Textinput from "@/components/Textinput";
import StoryModal from "./StoryFormModal.vue";
import { useToast } from "vue-toastification";
import { API_URL } from '@/constant/data';
import apiClient from "@/plugins/axios";
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
    StoryModal,
    Tooltip,
    Editor,
  },

  data() {
    return {
      API_URL: API_URL,
      stories: [],
      toast: useToast(),
      formMode: 'create',
      form: {
        name: '',
        email: '',
        role: '',
        phone_number: '',
        password: '',
      },
      item: [],
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
              label: "image",
              field: "image_url",
          },
          {
              label: "Title",
              field: "title",
          },
          {
              label: "author",
              field: "user.name",
          },
          {
              label: "Audio",
              field: "audio",
          },
          {
              label: "category",
              field: "category.name",
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
          await apiClient.get(`/api/admin/stories`, { withCredentials: true })
          .then(response => {
              this.stories = response.data.stories;
              //console.log(response);
          }).catch(error => {
              this.toast.error('Failed to fetch stories', { timeout: 2000 });
              console.log(error);
          });
      },

      showCreateModal(){
        this.formMode = 'create';
        this.$refs.formModal1.resetForm();
        this.$refs.formModal1.$refs.modal1.openModal();
      },

      showEditModal(item){
        this.formMode = 'edit';
        this.$refs.formModal1.resetForm();
        this.item = item;
        this.$refs.formModal1.loadEditData(item);
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
        await apiClient.delete(`/api/admin/story/delete/${itemId}`)
        .then(response => {
            this.FetchData();
            console.log(response);
            this.toast.success('Story has been deleted successfully', { timeout: 2000 });
        }).catch(error => {
            this.toast.error('Failed to delete Story', { timeout: 2000 });
            console.log(error);
        });
      },
  },
  mounted() {
    this.FetchData();
  },
};
</script>
<style lang="scss" scoped>
.action-btn {
  @apply h-6 w-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded;
}
</style>
