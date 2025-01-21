import { defineStore } from 'pinia'

export const useModal = defineStore('modal', {
  state: () => ({
    visible: false,
    content: '',
    loading: 0
  }),
  actions: {
    toggleVisibility() {
      this.visible = !this.visible
      this.updateBodyClass()
    },
    toggleLoading() {
      this.loading = !this.loading
    },
    setContent(content) {
      this.content = content
    },
    reset() {
      this.content = ''
      this.loading = 0
      this.visible = false
    },
    updateBodyClass() {
      if (this.visible) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    }
  },
})