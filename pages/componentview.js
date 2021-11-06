import TemplateProvider from "../components/templates";
import { DragDropContext } from 'react-beautiful-dnd';



function CompViewPage(props) {
  
  const reorder =  (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  let templateArray = [
    
    {
      f: 'TopNav', c: 'TopNav'
    },
    {
      f: 'Hero', c: 'Hero'
    },
    {
      f: 'Team', c: 'Team'
    },
    {
      f: 'Testimonial', c: 'Testimonial'
    },
    {
      f: 'Testimonial', c: 'Testimonial2'
    },

  ];


  return <div className="p-2">
    {
      templateArray.map((obj, i)=>{
        return TemplateProvider()[obj.f][obj.c];
      })
    }

    {/* { TemplateProvider()['TopNav']['TopNav']}
    { TemplateProvider()['Hero']['Hero']}
    { TemplateProvider()['Team']['Team']}
    { TemplateProvider()['Testimonial']['Testimonial']}
    { TemplateProvider()['Testimonial']['Testimonial2']} */}

  </div>;
}
export default CompViewPage;
