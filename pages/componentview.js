import { useEffect, useState } from "react";
import {
  DragDropContext,
  resetServerContext,
  Draggable,
  Droppable,
} from "react-beautiful-dnd";
import templateStore from "../global-stores/templateStore";
import Welcome from "../components/welcome";
import inputModalStore from "../global-stores/inputModalStore";
import InputModal from "../components/input-modal";
import TemplateProvider from "../components/templates";

resetServerContext();
function CompViewPage(props) {
  const grid = 8;
  const templateArray = templateStore((state) => state.templateArray);
  const setTemplateArray = templateStore((state) => state.setTemplate);
  const openInputModl = inputModalStore((state) => state.openInputModal);
  const [borderPostion, setBorderPostion] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

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

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const openInputModal = (event) => {
    // open modal that shows all the available inputs
    console.log(event.target);
    console.log(event.target.id);
    // set inner html for the selected id
    if (event.target.id.includes("editable")) {
      console.log(event.target.innerText);
      event.target.innerText = "Murali";
    }
    //    openInputModl();
  };

  function getOffset(recta) {
    const rect = recta;
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };
  }
  const onElementHover = (event) => {
    console.log(event.target.id);
    let postionOfHoveredElement = event.target.getBoundingClientRect();
    if (event.target.id.includes("editable")) {
      console.log("offsetTop", event.target.offsetTop, event.target.offsetLeft);
      setBorderPostion({
        top: event.target.offsetTop,
        left: event.target.offsetLeft,
        width: postionOfHoveredElement.width,
        height: postionOfHoveredElement.height,
      });
    } else {
      resetElementState();
    }
  };

  const resetElementState = () => {
    setBorderPostion({
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    });
  };

  return (
    <div className="p-2">
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
                      draggableId={`${item.c}-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div className="group relative outline-none hover:border-blue-700 border-transparent border-2 hover:border-current">
                          <div
                            onClick={openInputModal}
                            onMouseOver={onElementHover}
                            //onMouseLeave={resetElementState}
                            className=""
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            style={getItemStyle(
                              provided.draggableProps.style,
                              snapshot.isDragging
                            )}
                          >
                            {TemplateProvider(item)[item.f][item.c]}
                          </div>
                          <button
                            onClick={() => deleteCompo(index)}
                            className="hidden top-0 right-0 absolute group-hover:block "
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
                          <div
                            style={{
                              top: borderPostion.top - 5,
                              left: borderPostion.left - 5,
                              width: borderPostion.width + 10,
                              height: borderPostion.height + 10,
                              position: "absolute",
                              border: "2px dashed #5dce91",
                            }}
                            className="hiddden group-hover:block"
                          ></div>
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
          {templateArray &&
            templateArray.map((item, index) => (
              <div key={`${item.c}-${index}`}>
                {TemplateProvider(item)[item.f][item.c]}
              </div>
            ))}
        </div>
      </div>
      <InputModal />
    </div>
  );
}
export default CompViewPage;
