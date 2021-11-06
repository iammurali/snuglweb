import TemplateProvider from "../components/templates";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { resetServerContext } from "react-beautiful-dnd"

resetServerContext()

function CompViewPage(props) {
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
  const grid = 8;


  const [templateArrayState, setTemplateArrayState] = useState(templateArray)
  const [winReady, setwinReady] = useState(false);
    useEffect(() => {
        setwinReady(true);
    }, []);


  let onDragEnd = (result) => {
    // dropped outside the list
    if(!result.destination) {
       return; 
    }
    
    const items = reorder(
      templateArrayState, 
      result.source.index, 
      result.destination.index
    );
    console.log('ITEMS::::::::::', items);
    setTemplateArrayState(items)
    
  }

  const getItemStyle = (draggableStyle, isDragging) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '',
    
    // styles we need to apply on draggables
    ...draggableStyle
  });
  
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : '',
    padding: grid,
  });
        


  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

 
  return (
    <div className="p-2">
     {winReady && (<DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div 
              
              ref={provided.innerRef} 
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {templateArrayState.length > 0 && templateArrayState.map((item, index) => (
                <Draggable
                  key={item.c}
                  draggableId={item.c}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div >
                      <div
                      className="hover:bg-blue-400" 
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        style={getItemStyle(
                          provided.draggableProps.style,
                          snapshot.isDragging
                        )}
                       
                      >
                        {TemplateProvider()[item.f][item.c]}
                      </div>
                      {provided.placeholder}
                    </div>
                   )}
                </Draggable>
               ))}
              {provided.placeholder}
            </div>
           )}
        </Droppable>
      </DragDropContext>) }
    </div>
  );
}
export default CompViewPage;





// {templateArray.map((obj, i) => {
//             return TemplateProvider()[obj.f][obj.c];
//           })}