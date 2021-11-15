import create from "zustand";

const inputModalStore = create((set) => ({
  isInputModalOpen: false,
  eventtarget: null,
  openInputModal: (eventtarget) =>
    set((state) => ({ isInputModalOpen: true, eventtarget })),
  closeModal: () =>
    set((state) => ({ isInputModalOpen: false, eventtarget: null })),
}));

export default inputModalStore;
