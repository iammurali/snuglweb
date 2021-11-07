import create from 'zustand'

let templateArray = [
    {
      f: "TopNav",
      c: "TopNav",
    },
    {
      f: "Hero",
      c: "Hero",
    },
    {
      f: "Team",
      c: "Team",
    },
    {
      f: "Testimonial",
      c: "Testimonial",
    },
    {
      f: "Testimonial",
      c: "Testimonial2",
    },
  ];
const templateStore = create(set => ({
  templateArray: templateArray,
  setTemplate: (templateArr) => set(state => ({ templateArray: templateArr })),
}))

// logger disable during production build
const unsub1 = templateStore.subscribe(console.log);

export default templateStore;