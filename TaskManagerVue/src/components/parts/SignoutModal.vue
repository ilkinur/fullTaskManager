<template>
  <div class="modal fade show" id="SignOutModal" tabindex="-1" style="display: flex" aria-modal="true" aria-hidden="true" role="dialog">
     <div id="signOutDialog" class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-sm">
       <div id="signOutContent" class="modal-content">
        <!-- Header -->
        <div class="modal-header">
          <h5 class="modal-title">Log out</h5>
          <button @click="closeSignoutModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body custom_setting">
          <div class="setting-mode">
            <h6 class="card-title mb-2 fs-6">Are you sure you want to log out?</h6>
          </div>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" @click="closeSignoutModal" class="btn btn-white border lift" data-dismiss="modal">No</button>
          <button type="button" @click="signOut" :disables="loading" class="btn btn-primary lift">Yes</button>
        </div>
       </div>
     </div>
   </div>
 </template>
 
<script>
  import jwtInterceptor from '../../jwt.interceptor'
  import user from '../../store/user'

  export default {
   // eslint-disable-next-line vue/multi-word-component-names
    name: 'SignoutModal',
    emit: ['closeModal', 'save'],
    data() {
      return {
        loading: false,
        token: ''
      }
    },
    methods: {
      closeSignoutModal() {
        this.$emit('closeSignoutModal')
      },
      async signOut() {
        this.loading = true
        await jwtInterceptor.get(this.$store.getters.getUrl+'/logout');
        const signout_request = {token: this.token}
        user.dispatch('updateLogin', {expires:-1})
        
        window.location.href = "/login"
      },
    },
    created() {
      this.token = user.getters.getUser.refreshToken
    }
  }
</script>
 
<style>
  #SignOutModal {
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  #signOutDialog {
    position: absolute;
    width: 90%;
    margin: 0;
  }

  #signOutContent {
    width: 100%;
  }
</style>