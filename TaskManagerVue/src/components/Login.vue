<template>
  <div id="ihealth-layout" class="theme-blue">
  
  <!-- Main body area -->
  <div class="main p-2 py-3 p-xl-5 ">
      <div class="body d-flex p-0 p-xl-5">
          <div class="container-xxl">
              
              <div class="row g-0">
  
                  <div class="col-lg-12 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
                      <div class="w-100 p-3 p-md-5 card border-0 bg-dark text-light" style="max-width: 32rem;">
                        <h2>Login</h2>
                        <br>

                          <form class="row g-1 p-3 p-md-4" @submit.prevent="signIn" id="sign" ref="form">

                              <div class="col-12">
                                  <div class="mb-2">
                                      <label class="form-label">Email</label>
                                      <input v-model="email" v-validate="{required: true, email}" name="email" type="email" class="form-control form-control-lg" placeholder="email">
                                      <span class="inputError">{{ errors.first('email') }}</span>
                                  </div>
                              </div>
  

                              <div class="col-12">
                                  <div class="mb-2">
                                      <div class="form-label">
                                          <span class="d-flex justify-content-between align-items-center">
                                              Password
                                          </span>
                                      </div>
                                      <input v-model="password" v-validate="{ required: true, min: 3}" name="password" type="password" class="form-control form-control-lg" placeholder="password  ">
                                      <span class="inputError">{{ errors.first('password') }}</span>
                                  </div>
                              </div>
  
                              <div class="col-12 text-center mt-4">
                                <button type="submit" :disabled="loading" class="btn btn-lg btn-block btn-light lift text-uppercase " atl="signin">SIGN IN</button>
                                <br>
                                <br>
                                <br>
                                <router-link class="m-link" to="/register" >
                                  <span>Sign up</span>
                                </router-link>
                              </div>
                          </form>
                          
                      </div>
                  </div>
              </div>
              
          </div>
      </div>
  
  </div>
  
  </div>
  </template>
  <script>
    import axios from "axios"
    import store from '../store/'
    import user from '../store/user'
    
    export default {
      // eslint-disable-next-line vue/multi-word-component-names
      name: 'Login',
      data: ()=>({
        email : '',
        password : '',
        loading: false,
      }),
      methods: {
        async signIn(){
          const validForm = await this.formIsValid
          if(validForm){
            this.loading = true
            axios.post(store.getters.getUrl+'/login', {email: this.email, password: this.password})
            .then(response => {
              if(response.data.status == 'success'){
                this.$toast.success(response.data.message)
              
                user.dispatch('updateLogin',{expires:1, user:response.data.token})
  
                this.loading = false
                this.$router.push('/')
              }
              else{
                this.$toast.error(response.data.message)
              }
              this.loading = false
            })
            .catch(error=> {
              this.$toast.error(error.response.data.message)
              Object.keys(error.response.data.errors).forEach((key) => {
                error.response.data.errors[key].forEach((errorMessage) => {
                    this.$toast.error(`${errorMessage}`);
                  });
              });
              this.loading = false
            })
          } 
          else {
            this.$toast.error('Correct the errors!')
            this.loading = false
          }
        },
      },
      computed : {   
        formIsValid(){
          // eslint-disable-next-line vue/no-async-in-computed-properties, no-async-promise-executor
          return new Promise(async (resolve, reject) => {
            try {
              const valid = await this.$validator.validate();
              resolve(valid);
            } catch (error) {
              reject(error);
            }
          });
        }
      },
    }
  </script>
  <style>
    .inputError {
      color: #ff0000;
      font-weight: bold;
    }
  
    .forgotpassword {
      background: transparent;
      border: none;
    }
  
    .forgotpassword:hover {
      color: #ffb62d;
    }
  </style>