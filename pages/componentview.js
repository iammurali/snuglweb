import TemplateProvider from "../components/templates";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { resetServerContext } from "react-beautiful-dnd"
import templateStore from "../global-stores/templateStore";

resetServerContext()

function CompViewPage(props) {
 
  const grid = 8;
  const templateArray = templateStore(state => state.templateArray);
  const setTemplateArray = templateStore(state => state.setTemplate)

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
      templateArray,
      result.source.index, 
      result.destination.index
    );

    setTemplateArray(items)
    
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

  const downloadHtml = () => {
    // let snuglService = new SnuglUtilityService();
    // snuglService.generateHtmlForArray(templateArrayState);
  }
        


  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

 
  return (
    <div className="p-2" onClick={downloadHtml}>
     {winReady && (<DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div 
              
              ref={provided.innerRef} 
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {templateArray.length > 0 && templateArray.map((item, index) => (
                <Draggable
                  key={item.c}
                  draggableId={item.c}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div >
                      <div
                      className="hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" 
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
