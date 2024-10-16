<template>
  <div id="ihealth-layout" class="theme-blue">
    <SideBar />

    <div class="main px-lg-4 px-md-4">
      <!-- Header -->
      <div class="header">
        <nav class="navbar py-4">
          <div class="d-flex w-100 align-items-center justify-content-end">
            <!-- Sign Out button -->
            <div>
              <button type="button" @click.prevent="triggerSignoutModal" class="btn btn-primary border lift">Exit</button>
            </div>
            
            <!-- Settings toggler -->
            <div id="modalDiv" class="setting mx-2">
              <a @click="triggerModal" data-bs-toggle="modal" data-bs-target="#Settingmodal"><i class="icofont-gear-alt fs-5"></i></a>
            </div>

            <!-- Mobile SideBar toggler -->
            <div class="burger">
              <button class="navbar-toggler border-0 p-0 menu-toggle" type="button" @click.prevent="mobileSideBar = !mobileSideBar" data-bs-toggle="collapse" data-target="#navbarSupportedContent">
                <span class="fa fa-bars"></span>
              </button>
            </div>
          </div>
          <MobileSideBar :isSideBarOpen="mobileSideBar" />
        </nav>
      </div>

      <!-- Body -->
      <div class="body d-flex py-lg-3 py-md-2">
        <div class="container-xxl">
          <div class="col-12">
            <router-view />
          </div>
        </div>

        <!-- Modal -->
        <Modal v-if="showModal === true" @closeModal="hideModal" @save="applyModalSettings"  :userDarkMode="userDarkMode" :userHighContrast="userHighContrast"/>
        <SignoutModal v-if="showSignoutModal === true" @closeSignoutModal="closeSignoutModal" />
      </div>
    </div>
  </div>
</template>

<script>
  import MobileSideBar from './parts/MobileSideBar.vue'
  import SideBar from './parts/SideBar.vue'
  import Modal from './parts/Modal.vue'
  import SignoutModal from './parts/SignoutModal.vue'

  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Dashboard',
    components:{
      SideBar,
      MobileSideBar,
      Modal,
      SignoutModal
    },
    data() {
      return {
        showSignoutModal: false,
        showModal: false,
        userDarkMode: false,
        userHighContrast: false,
        mobileSideBar: false
      }
    },
    methods: {
      triggerModal() {
        this.showModal = true
        this.userDarkMode = localStorage.getItem('darkMode') === 'true'
        this.userhighContrast = localStorage.getItem('highContrast') === 'true'
      },
      triggerSignoutModal() {
        this.showSignoutModal = true
      },
      hideModal() {
        this.showModal = false
      },
      closeSignoutModal() {
        this.showSignoutModal = false
      },
      applyModalSettings(settings) {
        this.userDarkMode = settings.userDarkMode
        this.userHighContrast = settings.userHighContrast

        if (this.userDarkMode === true) {
          let htmlElement = document.getElementsByTagName('html')[0];
          htmlElement.setAttribute('data-theme', 'dark');
        }
        else if (this.userHighContrast === true) {
          let htmlElement = document.getElementsByTagName('html')[0];
          htmlElement.setAttribute('data-theme', 'high-contrast');
        }
        else {
          let htmlElement = document.getElementsByTagName('html')[0];
          htmlElement.setAttribute('data-theme', 'light');
        }
        
        localStorage.setItem('darkMode', this.userDarkMode)
        localStorage.setItem('highContrast', this.userHighContrast)
        this.hideModal()
      },
      setMobileSideBarVisibility() {
        this.mobileSideBar = window.innerWidth > 1280;
      }
    },
    mounted() {
      window.addEventListener('resize', this.setMobileSideBarVisibility);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.setMobileSideBarVisibility);
    }
  }
</script>

<style>
  .burger {
    margin-right: 0.5rem;
  }

  #modalDiv {
    cursor: pointer;
  }

  #modalDiv:hover {
    color: orange;
  }
</style>