<template>
  <div>
    <!-- Header -->
    <div class="row align-items-center">
      <div class="border-0 mb-4">
        <div class="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
          <h3 class="fw-bold mb-0">Add Task</h3>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="card-body">
      <form @submit.prevent="add">
        <div class="row overflow-auto">

        <div class="col-md-6 mb-4">
          <label for="title" class="form-label">Title</label>
          <input type="text" v-model="request.title" name="title" v-validate="{ required: true }" id="title" class="form-control" required>
          <span class="inputError">{{ errors.first('title') }}</span>
        </div>

        <div class="col-md-6 mb-4">
          <label class="form-label">Status</label>
          <select v-model="request.status" class="form-select" v-validate="{ required: true }" name="status" id="status" required>
            <option v-for="(s, index) in status" :key="index" :value="s.id">{{ s.name }}</option>
          </select>
          <span class="inputError">{{ errors.first('status') }}</span>
        </div>

        <div class="w-100 templateText mb-4" style="margin-bottom: 50px!important;">
          <label for="smsText" class="form-label">Description</label>
          <br/>
          <textarea class="w-100 h-100 form-control" v-model="request.description" v-validate="{ required: true }" name="description" id="description" required></textarea>
          <span class="inputError">{{ errors.first('description') }}</span>
        </div>
        <br>  
        <div class="col-md-6 mb-4">
          <label for="date" class="form-label">Date</label>
          <input type="date" v-model="request.due_date" v-validate="{ required: true }" name="due_date" id="due_date" class="form-control" required>
          <span class="inputError">{{ errors.first('due_date') }}</span>
        </div>

      </div>
        <button type="submit" class="btn btn-primary mt-4" :disabled="loading">
          Yaddaşa yaz
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import jwtInterceptor from '../../../jwt.interceptor'
export default {
  name: 'addTask',
  data() {
    return {
      loading: false,
      request: {
        title: "",
        description: "",
        due_date: "",
        status: false
      },
      status:[
        {name:"Pending",id:false},
        {name:"Completed",id:true}
      ],

    }
  },
  methods: {

    async add() {
      this.loading = true
      const validForm = await this.isFormValid()
      if (validForm) {
        jwtInterceptor.post(this.$store.getters.getUrl + "/task", this.request).then(response => {
          if (response.data.status == 'success') {
            this.$toast.success(response.data.message, {
              position: "top-right"
            })
            this.loading = false
            this.$router.go(-1);
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
      } 
      else {
        this.$toast.error('Correct the errors!', {
              position: "top-right"
            })
        this.loading = false
      }
      this.loading = false
    },
    isFormValid() {
      // eslint-disable-next-line vue/no-async-in-computed-properties, no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        try {
          const valid = await this.$validator.validate();
          resolve(valid);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
  created() {

  }
}
</script>

<style>
.templateText {
  height: 150px;
  margin-bottom: 2rem;
}

.justify-content-custom {
  justify-content: space-between;
}

@media screen and (max-width: 615px) {
  .justify-content-custom {
    justify-content: space-around !important;
  }
}
</style>