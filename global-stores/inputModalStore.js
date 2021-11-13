import create from "zustand";

const inputModalStore = create((set) => ({
  isInputModalOpen: false,
  openInputModal: () => set((state) => ({ isInputModalOpen: true })),
  closeModal: () => set((state) => ({ isInputModalOpen: false })),
}));

export default inputModalStore;
