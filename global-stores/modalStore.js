import create from 'zustand'

const modalStore = create(set => ({
  isOpen: true,
  openModal: () => set(state => ({ isOpen: true })),
  closeModal: () => set(state => ({ isOpen: false })),
}))


export default modalStore;