<template>
  <div class="row card">
    <!-- Header -->
    <div class="align-items-center">
      <div class="border-0 mb-4">
        <div class="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
          <h3 class="fw-bold mb-0">Tasks</h3>
          <div class="col-auto d-flex w-sm-100">
            <button type="button" @click.prevent="toAddTask" class="btn btn-primary btn-set-task w-sm-100" data-bs-toggle="modal" data-bs-target="#depadd"><i class="icofont-plus-circle me-2 fs-6"></i>Add</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row overflow-auto">
      <div class="col-sm-12">
        <!-- Search Bar -->
        <div class="row mb-4">
          <div class="w-100 col-sm-12 col-md-6">
            <div id="patient-table_filter" class="dataTables_filter">
              <div class="row">

                <div class="col">
                  <label class="form-label">Title</label>
                  <br />
                  <input type="text" v-model="request.title" name="title" class="form-control">
                </div>

                <div class="col">
                  <label class="form-label">Status</label>
                  <select v-model="request.status" class="form-select" name="specialityDropdown">
                    <option v-for="(s, index) in status" :key="index" :value="s.id">{{ s.name }}</option>
                  </select>
                </div>
                

                <div class="col">
                  <label class="form-label">Due Date</label>
                  <br />
                  <input type="date" v-model="request.due_date" name="dateField" class="form-control">
                </div>
                <div class="col d-flex align-items-end">
                  <button @click.prevent="search" class="btn btn-primary"> <i class="icofont-ui-search"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table id="patient-table" class="table table-striped table-bordered align-middle mb-0 nowrap dataTable no-footer dtr-inline" style="width: 100%;" role="grid" aria-describedby="patient-table_info">
          <thead>
            <tr role="row">
              <th class="text-center">
                Title
              </th>
              <th class="text-center">
                Description
              </th>
              <th class="text-center">
                Due Date
              </th>
              <th class="text-center">
                Status
              </th>
              <th class="text-center">
                isCompleted
              </th>
              <th class="text-center">
                Update
              </th>
            </tr>
          </thead>
          <tbody>                                    
            <tr v-for="item in items" :key="item.id" class="text-center">
              <td>{{ item.title }}</td>
              <td>{{ item.description }}</td>
              <td>{{ format_date(item.due_date) }}</td>
              <td v-if="item.status==false">Pending</td>
              <td v-else-if="item.status==true">Completed</td>
              <td v-else></td>
              <td>
                <input type="checkbox" class="smsCheckbox" @change="completed(item)" :checked="item.status">
              </td>
              <td>
                <button type="button" class="btn btn-outline-secondary" @click="toUpdate(item)"><i class="icofont-edit text-success"></i></button>
                <button type="button" class="btn btn-outline-secondary" @click="toDelete(item)"><i class="icofont-ui-delete text-danger"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <br>
    <pagination
      :totalPages="totalPage"
      :perPage="request.pageSize"
      :currentPage="currentPage"
      @pagechanged="onPageChange"
    />
    <modal name="delete" height="auto" styles="background-color: transparent; width:500px!important">
      <div class="modal-dialog modal-dialog-centered" style="margin: 0!important; width: 100%!important;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title  fw-bold" id="expeditLabel">Are you sure you want to delete?</h5>
                    <button type="button" class="btn-close" @click="$modal.hide('delete')" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" @click="remove" data-bs-dismiss="modal">Yes</button>
                    <button type="button" class="btn btn-danger" @click="$modal.hide('delete')">No</button>
                </div>
            </div>
            </div>
    </modal>
  </div>
</template>

<script>
import jwtInterceptor from '../../jwt.interceptor'
import Pagination from '../parts/site/Pagination.vue'
import user from '../../store/user'
import moment from 'moment'

export default {
  name: 'Tasks',
  components: {
    Pagination
  },
  data() {
    return {
      items: [],
      item: {},
      totalCount: 0,
      request: {
        page:1,
        pageSize: 10,
        due_date: '',
        title: '',
        status: ''
      },
      status:[
        {name:"All",id:""},
        {name:"Pending",id:false},
        {name:"Completed",id:true}
      ],
      currentPage: 1,
      totalPage:0,

    }
  },
  methods: {
    completed(i){
      if(i.status == false){
        i.status = true;
        this.update(i)
      }
      else if(i.status == true){
        i.status = false;
        this.update(i)
      }
    },
    async update(i) {
      this.loading = true
      jwtInterceptor.post(this.$store.getters.getUrl + "/taskUpdate", i).then(response => {
        if (response.data.status == 'success') {
          this.$toast.success(response.data.message, {
            position: "top-right"
          })
          this.loading = false
        }
        else {
          this.$toast.error(response.data.message, {
            position: "top-right"
          })
          this.loading = false
        }
      }).catch((error) => {
        if(i.status == false)
          i.status = true;
        else if(i.status == true)
          i.status = false;
        this.$toast.error(error.response.data.message, {position: "top-right"});
        Object.keys(error.response.data.errors).forEach((key) => {
          error.response.data.errors[key].forEach((errorMessage) => {
              this.$toast.error(`${errorMessage}`, {position: "top-right"});
            });
        });
        this.loading = false
      })

      this.loading = false
    },
    toAddTask() {
      this.$router.push('addTask')
    },
    toUpdate(item) {
      user.dispatch('prepareUpdateItem', item)
      this.$router.push('/updateTask')
    },
    toDelete(item){
      this.item = item
      this.$modal.show('delete')
    },
    remove() {
      this.loading = true
      jwtInterceptor.post(this.$store.getters.getUrl + "/taskDelete", {"id":this.item.id}).then(response => {
        if (response.data.status == 'success') {
          this.$toast.success(response.data.message, {
            position: "top-right"
          })
          this.loading = false
          this.$modal.hide('delete')
          this.search();
        }
        else {
          this.$toast.error(response.data.message, {
            position: "top-right"
          })
          this.loading = false
        }
      }).catch((error) => {
        this.$toast.error(error.response.data.message, {position: "top-right"});
        Object.keys(error.response.data.errors).forEach((key) => {
          error.response.data.errors[key].forEach((errorMessage) => {
              this.$toast.error(`${errorMessage}`, {position: "top-right"});
            });
        });
        this.loading = false
      })

    },
    onPageChange(page) {
      this.request.page = page;
      this.search();
    },
    search() {
      jwtInterceptor.get(this.$store.getters.getUrl+'/task', { params: this.request}).
      then(response => {

        this.items = response.data.data.data;
        this.totalPage = response.data.data.last_page;
        this.totalCount = response.data.data.total;
        
      })
      .catch(error => {
        this.$toast.error(error.response.data.message, {position: "top-right"});
        Object.keys(error.response.data.errors).forEach((key) => {
          error.response.data.errors[key].forEach((errorMessage) => {
              this.$toast.error(`${errorMessage}`, {position: "top-right"});
            });
        });
      })
    },
    format_date(k) {
      return k ? moment(k).format("DD.MM.Y") : "";
    },
  },
  created(){
    this.search();
  }
}
</script>

<style>
.smsCheckbox {
  height: 2.5rem;
  width: 2rem;
}
</style>