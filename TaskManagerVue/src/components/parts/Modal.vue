<template>
 <div class="modal fade show" id="SettingModal" tabindex="-1" style="display: flex" aria-modal="true" aria-hidden="true" role="dialog">
    <div id="modalDialog" class="modal-dialog  modal-dialog-centered modal-dialog-scrollable modal-sm">
      <div id="modalContent" class="modal-content">
        <!-- Header -->
        <div class="modal-header">
          <h5 class="modal-title">Custom Settings</h5>
          <button @click="closeModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body custom_setting">
          <!-- Settings: Light/dark -->
          <div class="setting-mode">
            <h6 class="card-title mb-2 fs-6">Light/Dark & Contrast Layout</h6>
            <ul class="list-group list-unstyled mb-0 mt-1">
                <li class="list-group-item d-flex align-items-center py-1 px-2">
                    <div class="form-check form-switch theme-switch mb-0">
                      <input v-model="darkMode" :checked="darkMode" class="form-check-input" type="checkbox" id="theme-switch">
                      <label class="form-check-label" for="theme-switch">Enable Dark Mode</label>
                    </div>
                </li>
                <li class="list-group-item d-flex align-items-center py-1 px-2">
                    <div class="form-check form-switch theme-high-contrast mb-0">
                      <input v-model="highContrast" :checked="highContrast" class="form-check-input" type="checkbox" id="theme-high-contrast">
                      <label class="form-check-label" for="theme-high-contrast">Enable High Contrast</label>
                    </div>
                </li>
            </ul>
          </div>
        </div>
        <div class="modal-footer justify-content-start">
            <button type="button" @click="closeModal" class="btn btn-white border lift" data-dismiss="modal">Close</button>
            <button type="button" @click="applyChanges" class="btn btn-primary lift">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Modal',
  emit: ['closeModal', 'save'],
  props: {
    userDarkMode: {
      type: Boolean,
      required: true
    },
    userHighContrast: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      darkMode: this.userDarkMode,
      highContrast: this.userHighContrast
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    applyChanges() {
      this.$emit('save', {userDarkMode: this.darkMode, userHighContrast: this.highContrast})
    },
  }
}
</script>

<style>
#SettingModal {
  background-color: rgba(0, 0, 0, 0.5);
}

#modalDialog {
  position: absolute;
  right: 1%;
}

@media screen and (max-width: 768px) {
  #SettingModal {
    justify-content: center;
  }

  #modalDialog {
    position: relative;
  }
}
</style>