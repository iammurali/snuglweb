import { useEffect, useState } from "react";
import Frame from "react-frame-component";

import templateStore from "../global-stores/templateStore";
import Welcome from "../components/welcome";
import inputModalStore from "../global-stores/inputModalStore";
import InputModal from "../components/input-modal";
import TemplateProvider from "../components/templates";

function CompViewPage(props) {
  const DEFAULT_POSTION = { top: 0, left: 0, width: 0, height: 0 };
  const templateArray = templateStore((state) => state.templateArray);
  const setTemplateArray = templateStore((state) => state.setTemplate);
  const openInputModl = inputModalStore((state) => state.openInputModal);
  // Local hooks
  const [borderPostion, setBorderPostion] = useState(DEFAULT_POSTION);
  const [componentPosition, setComponentPosition] = useState(DEFAULT_POSTION);
  const [componentIndex, setComponentIndex] = useState(null);
  const [winReady, setwinReady] = useState(false);
  const [showBorder, setShowBorder] = useState(false);

  useEffect(() => {
    setwinReady(true); // TODO: Not req anymore ?
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

  const deleteCompo = () => {
    let temArr = [...templateArray];

    console.log("Here");
    console.table(temArr);
    console.log(componentIndex);
    if (componentIndex > -1) {
      temArr.splice(componentIndex, 1);
      setTemplateArray(temArr);
    } else {
      alert("COmponent index not set ");
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const openInputModal = (event) => {
    // open modal that shows all the available inputs
    if (event.target.id.includes("editable")) {
      openInputModl(event.target);
    }
  };

  const onElementHover = (event, index) => {
    setComponentIndex(index);
    let postionOfHoveredElement = event.target.getBoundingClientRect();
    if (event.target.id.includes("editable")) {
      setBorderPostion({
        top: event.target.offsetTop,
        left: event.target.offsetLeft,
        right: event.target.offsetRight,
        width: postionOfHoveredElement.width,
        height: postionOfHoveredElement.height,
      });
    } else {
      resetElementState();
    }

    console.log("component index", componentIndex, index);
  };

  const resetElementState = () => {
    setBorderPostion(DEFAULT_POSTION);
  };

  const onElementMouseLeave = (event) => {
    setShowBorder(false);
  };

  const onMouseLeaveParent = () => {
    setShowBorder(false);
  };

  const onMouseEnterParent = (e, id) => {
    setShowBorder(true);
    let target = document.getElementById(id);
    let postionOfHoveredElement = target.getBoundingClientRect();
    let offsetTop = target.offsetTop;
    let offsetLeft = target.offsetLeft;
    let postion = {
      top: offsetTop,
      left: offsetLeft,
      width: postionOfHoveredElement.width,
      height: postionOfHoveredElement.height,
    };

    setComponentPosition(postion);
  };
  // element on hover show border for parent
  // pointer events none not working

  return (
    <div className="p-2">
      {winReady && templateArray.length > 0 ? (
        <div id="webframe" className="relative">
          {templateArray.map((item, index) => (
            <div
              id={`parent-${item.c}-${index}`}
              key={`${item.c}-${index}`}
              className="relative "
            >
              <div
                id="secondchild"
                onMouseDown={openInputModal}
                onMouseEnter={(event) =>
                  onMouseEnterParent(event, `parent-${item.c}-${index}`)
                }
                onMouseOver={(event) => onElementHover(event, index)}
                onMouseLeave={(event) => onElementMouseLeave(event)}
                className=""
              >
                {TemplateProvider(item)[item.f][item.c]}
              </div>
            </div>
          ))}
          <div
            style={{
              top: borderPostion.top - 5,
              left: borderPostion.left - 5,
              width: borderPostion.width + 10,
              height: borderPostion.height + 10,

              position: "absolute",
              border: "2px dashed #5dce91",
              pointerEvents: "none",
              display: borderPostion.left != 0 ? "block" : "none",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              width: componentPosition.width,
              top: componentPosition.top,
              height: componentPosition.height,
              left: componentPosition.left,
              borderColor: "blue",
              display: showBorder ? "block" : "none",
            }}
            className="w-full border-2 pointer-events-none"
          >
            <div
              style={{
                pointerEvents: "auto",
              }}
              onMouseOver={() => {
                setShowBorder(true);
              }}
            >
              <button
                onClick={() => deleteCompo()}
                className="relative top-0 right-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 "
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
            </div>
          </div>
        </div>
      ) : (
        <Welcome />
      )}
      <div className="hidden">
        <div>
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
