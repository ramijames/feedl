import { defineStore } from 'pinia'

export const useModal = defineStore('modal', {
  state: () => ({
    visible: false,
    content: '',
    loading: 0,
    refreshTrigger: false
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
    triggerRefresh() {
      this.refreshTrigger = !this.refreshTrigger
    },
    reset() {
      this.content = ''
      this.type = ''
      this.header = ''
      this.loading = 0
      this.workflowId = ''
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