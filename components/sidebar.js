import modalStore from "../global-stores/modalStore";
import ComponentModal from "./component-modal";

function SideBar(props) {
  function downloadInnerHtml(filename, elId, mimeType) {
    let headTag = document.createElement("head");
    let htmlTag = document.createElement("html").appendChild(headTag);
    let body = document.createElement("body");
    let elHtml = document.getElementById(elId);
    body.appendChild(elHtml);

    let linkT = document.createElement("link");
    linkT.type = "text/css";
    linkT.rel = "stylesheet";
    headTag.appendChild(linkT);

    linkT.href =
      "https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.0.2/tailwind.min.css";

    htmlTag.append(body);
    let link = document.createElement("a");
    mimeType = mimeType || "text/plain";

    link.setAttribute("download", filename);
    link.setAttribute(
      "href",
      "data:" +
        mimeType +
        ";charset=utf-8," +
        encodeURIComponent(htmlTag.innerHTML)
    );
    link.click();
  }

  const openModal = modalStore((state) => state.openModal);

  return (
    <>
      <div className=" text-blue-100 space-y-6 px-2">
        <a href="#" className="text-white flex items-center space-x-2 px-4">
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
          <span className="text-2xl font-extrabold">Snugl Web</span>
        </a>

        <nav>
          <a
            onClick={() => {
              openModal("TopNav");
            }}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
          >
            Headers
          </a>
          <a
            onClick={() => {
              openModal("Hero");
            }}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
          >
            Heroes
          </a>
          <a
            onClick={() => {
              openModal("Testimonial");
            }}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
          >
            Testimonials
          </a>
          <a
            onClick={() => {
              openModal("Team");
            }}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
          >
            Teams
          </a>
          <a
            href=""
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
          >
            Gallery
          </a>
          <div
            onClick={() =>
              downloadInnerHtml("index.html", "webframe", "text/html")
            }
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
          >
            Export
          </div>
        </nav>
      </div>

      <ComponentModal />
    </>
  );
}

export default SideBar;
