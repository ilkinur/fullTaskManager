<template>
  <!-- Sidebar -->
  <div class="sidebar px-4 py-4 py-md-5 me-0" :class="{'sidebar-mini': mini === true }">
    <div class="d-flex flex-column h-100">
      <router-link to="/" class="mb-0 brand-icon">
        <span class="logo-icon">
          <i class="icofont-book fs-2"></i>
        </span>
        <span class="logo-text">TaskManager</span>
      </router-link>

      <!-- Menu: main ul -->
      <ul class="menu-list flex-grow-1 mt-3">
        <li v-for="i,index in menus" :key="index">
          <router-link class="m-link" :to="i.to">
            <i :class="i.icon"></i>
            <span>{{ i.name }}</span>
          </router-link>
        </li>
      </ul>

      <!-- Menu: menu collapse btn -->
      <button type="button" @click.prevent="toggleSideBar" class="btn btn-link sidebar-mini-btn text-light">
        <span class="ms-2"><i class="icofont-bubble-right"></i></span>
      </button>
    </div>
  </div>
</template>

<script>
import menus from '../../store/menus';
import mini from '../../store/config';

export default {
  data: () => ({
    menus : [],
    role: '',
    mini: false,
  }),
  methods:{
    toggleSideBar() {
      this.mini = !this.mini;
      mini.dispatch('updateMini', this.mini);
    }
  },
  created(){
    this.menus = menus.getters.getMenus;
    this.mini = mini.getters.getMini;
  }
}
</script>