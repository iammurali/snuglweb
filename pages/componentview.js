import TemplateProvider from "../components/templates";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { resetServerContext } from "react-beautiful-dnd";
import Frame from "react-frame-component";
import templateStore from "../global-stores/templateStore";
import Welcome from "../components/welcome";

resetServerContext();

function CompViewPage(props) {
  const grid = 8;
  const templateArray = templateStore((state) => state.templateArray);
  const setTemplateArray = templateStore((state) => state.setTemplate);

  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  let onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      templateArray,
      result.source.index,
      result.destination.index
    );

    setTemplateArray(items);
  };

  const deleteCompo = (index) => {
    let temArr = [...templateArray];
    temArr.splice(index, 1);
    setTemplateArray(temArr);
  };

  const getItemStyle = (draggableStyle, isDragging) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "",
    padding: grid,
  });

  const downloadHtml = () => {
    // let snuglService = new SnuglUtilityService();
    // snuglService.generateHtmlForArray(templateArrayState);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  return (
    <div className="p-2" onClick={downloadHtml}>
      {winReady && templateArray.length > 0 ? (
        
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {templateArray.length > 0 &&
                    templateArray.map((item, index) => (
                      <Draggable
                        key={`${item.c}-${index}`}
                        draggableId={item.c}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div className="group relative outline-none hover:border-gray-700 border-transparent border-2 hover:border-current">
                            <div
                              className=""
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
                            <button
                              onClick={() => deleteCompo(index)}
                              class="hidden top-0 right-0 absolute group-hover:block "
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="red"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                            {provided.placeholder}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        
      ) : (
        <Welcome />
      )}
      <div className="hidden">
      <div id="webframe">

          {templateArray && templateArray.map((item, index)=>
            (<div key={`${item.c}-${index}`}>

              {TemplateProvider()[item.f][item.c]}
            </div>
          ))}
      </div>

        
        </div>
    </div>
  );
}
export default CompViewPage;
