<template>
  <div class="modal fade show" id="DeleteModal" tabindex="-1" style="display: flex" aria-modal="true" aria-hidden="true" role="dialog">
     <div id="deleteDialog" class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-sm">
       <div id="deleteContent" class="modal-content">
        <!-- Header -->
        <div class="modal-header">
          <h5 class="modal-title">{{ text.header }}</h5>
          <button @click="closeDeleteModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body custom_setting">
          <div class="setting-mode">
            <h6 class="card-title mb-2 fs-6">{{ text.question }}</h6>
          </div>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" @click="closeDeleteModal" class="btn btn-white border lift" data-dismiss="modal">Xeyr</button>
          <button type="button" @click="deleteObject" :disabled="loading" class="btn btn-primary lift">Bəli</button>
        </div>
       </div>
     </div>
   </div>
 </template>
 
<script>
  import jwtInterceptor from '../../jwt.interceptor'

  export default {
   // eslint-disable-next-line vue/multi-word-component-names
    name: 'DeleteModal',
    emit: ['closeModal'],
    props: {
      objectId: {
        type: String,
        required: true
      },
      deletingAPI: {
        type: String,
        required: true
      },
      text: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      closeDeleteModal() {
        this.$emit('closeDeleteModal')
      },
      deleteObject() {
        this.loading = true

        jwtInterceptor.delete(this.$store.getters.getUrl + this.deletingAPI + '/' + this.objectId).then(response => {
          if (response.data.isError === null) {
            this.$toast.success(this.text.object + " uğurla ləğv olundu!", {
              position: "top-right"
            })
            this.loading = false
            this.$router.go(-1)
          }
          else {
            this.$toast.error("Bir xəta baş verdi. Bir daha sınayın!", {
              position: "top-right"
            });
            this.loading = false
          }
        }).catch(() => {
          this.$toast.error("Bir xəta baş verdi!", {
            position: "top-right"
          });
          this.loading = false
        })
      },
    },
  }
</script>
 
<style>
  #DeleteModal {
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  #deleteDialog {
    position: absolute;
    width: 90%;
    margin: 0;
  }

  #deleteContent {
    width: 100%;
  }
</style>