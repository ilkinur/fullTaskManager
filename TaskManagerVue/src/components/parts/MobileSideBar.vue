<template>
  <div class="mt-2" id="mobileSideBar">
    <ul class="mt-3">
      <li id="mobileList" v-for="i,index in menus" :key="index">
        <router-link class="m-link" :to="i.to">
          <i :class="i.icon" id="sideBarIcon"></i>
          <span>{{ i.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import menus from '../../store/menus';
import user from '../../store/user';

export default {
  name: 'MobileSideBar',
  data: () => ({
    menus : [],
    role: '',
  }),
  props: {
    isSideBarOpen: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    isSideBarOpen() {
      this.toggleMobileSideBar()
    }
  },
  methods: {
    toggleMobileSideBar() {
      if (this.isSideBarOpen)
        document.getElementById('mobileSideBar').style.display = 'none'
      else
        document.getElementById('mobileSideBar').style.display = 'flex'
    }
  },
  created(){
    this.menus = menus.getters.getMenus;
    this.role = user.getters.getUserRole;
  }
}
</script>

<style>
#mobileSideBar {
  display: none;
  background-color: #0D6EFD;
  justify-content: center;
  width: 100%;
}

.m-link {
  font-size: 1rem;
  color: white;
}

#mobileList {
  list-style-type: none;
}

#sideBarIcon {
  margin-right: 0.5rem;
}
</style>