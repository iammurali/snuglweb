import create from "zustand";

const componentModalStore = create((set) => ({
  isOpen: false,
  componentCategory: "",
  openModal: (compCat) =>
    set((state) => ({ isOpen: true, componentCategory: compCat })),
  closeModal: () => set((state) => ({ isOpen: false, componentCategory: "" })),
}));

export default componentModalStore;

