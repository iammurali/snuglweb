import create from 'zustand'

let templateArray = [
    
];
const templateStore = create(set => ({
  templateArray: templateArray,
  setTemplate: (templateArr) => set(state => ({ templateArray: templateArr })),
  addComponent: (componentObj) => set(state => ({templateArray: [...state.templateArray, componentObj]}))
}))

// logger disable during production build
const unsub1 = templateStore.subscribe(console.log);

export default templateStore;