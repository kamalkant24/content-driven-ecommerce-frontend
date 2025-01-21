import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import pdf from "../assets/pdf_4726010.png";
import xls from "../assets/xls_4726040.png";

const Editor = () => {
  const [editorContent, setEditorContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [showMentionModal, setShowMentionModal] = useState(false);
  const [mention, setMention] = useState("");
  const [mentionQuery, setMentionQuery] = useState("");
  const editorRef = useRef(null);
  const emojipickerRef = useRef(null);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    updateEditorContent();
  };

  const handleInsertOrderedList = () => {
    // Get the selected text
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText) {
      // If text is selected, insert it as an ordered list with serial numbering starting from 1
      const lines = selectedText.split("\n"); // Split selected text into lines
      let orderedListHTML = "<ol>"; // Start ordered list
      lines.forEach((line, index) => {
        orderedListHTML += `<li>${index + 1}. ${line}</li>`; // Add line with serial numbering starting from 1
      });
      orderedListHTML += "</ol>"; // End ordered list
      execCommand("insertHTML", orderedListHTML); // Insert ordered list HTML
    } else {
      // If no text is selected, insert an empty ordered list
      execCommand("insertOrderedList");
    }
  };

  const handleInsertBulletedList = () => {
    // Get the selected text
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText) {
      // If text is selected, insert it as an unordered list
      const lines = selectedText.split("\n"); // Split selected text into lines
      let unorderedListHTML = "<ul>"; // Start unordered list
      lines.forEach((line) => {
        unorderedListHTML += `<li>• ${line}</li>`; // Add each line as a list item
      });
      unorderedListHTML += "</ul>"; // End unordered list
      execCommand("insertHTML", unorderedListHTML); // Insert unordered list HTML
    } else {
      // If no text is selected, insert an empty unordered list
      execCommand("insertUnorderedList");
    }
  };
  const updateEditorContent = (html) => {
    if (editorRef.current && typeof html === "string") {
      // Append the new HTML to the current content
      const newContent = editorRef.current.innerHTML + html;
      setEditorContent(newContent);
      // Handle mentions if applicable
      const lastChar = html.target.innerHTML[newContent.length - 1];
      if (lastChar === "@") {
        setShowMentionModal(true);
        setMentionQuery("");
      } else if (showMentionModal) {
        const mentionQueryMatch = newContent.match(/@(\w+)$/);
        if (mentionQueryMatch) {
          setMentionQuery(mentionQueryMatch[1]);
          const filtered = mentions.filter((mention) =>
            mention.toLowerCase().startsWith(mentionQueryMatch[1].toLowerCase())
          );
          setFilteredMentions(filtered);
        } else {
          setShowMentionModal(false);
        }
      }
    }
  };

  const insertHtmlAtCaret = (html, type) => {
    if (type === "emoji" || type === "mention") {
      updateEditorContent(html);
    } else {
      let sel, range;
      if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();

          const el = document.createElement("div");
          el.innerHTML = html;

          // Check if the inserted content is a link
          const linkElement = el.querySelector("a");
          if (linkElement) {
            range.insertNode(linkElement);
          } else {
            const frag = document.createDocumentFragment();
            let node, lastNode;
            while ((node = el.firstChild)) {
              lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            if (lastNode) {
              range = range.cloneRange();
              range.setStartAfter(lastNode);
              range.collapse(true);
              sel.removeAllRanges();
              sel.addRange(range);
            }
          }
        }
      }

      updateEditorContent(editorRef.current.innerHTML + html);
    }
  };
  const handleBoldClick = () => execCommand("bold");
  const handleItalicClick = () => execCommand("italic");
  const handleUnderlineClick = () => execCommand("underline");
  const handleStrikethroughClick = () => execCommand("strikeThrough");

  const handleLinkClick = () => setShowLinkModal(true);

  const handleLinkModalSubmit = () => {
    insertHtmlAtCaret(`<a href="${linkUrl}" target="_blank">${linkText}</a>`);
    setShowLinkModal(false);
    setLinkText("");
    setLinkUrl("");
  };

  const handleMentionModalSubmit = () => {
    let type = "mention";
    insertHtmlAtCaret(`@${mention} `, type);
    setShowMentionModal(false);
    setMention("");
  };

  const handleEmojiClick = () => setShowEmojiPicker(!showEmojiPicker);

  const handleEmojiSelect = (event) => {
    let type = "emoji";
    insertHtmlAtCaret(event.emoji, type);
  };
  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to array
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageData = reader.result;
          insertHtmlAtCaret(`<img src="${imageData}"  alt="Attached Image" />`);
        };
        reader.readAsDataURL(file);
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          const fileData = reader.result;
          // Set non-image file data with type and name for preview
          const fileType = file.type.split("/")[1]; // Extract file type (e.g., pdf, xls)
          const newFile = { data: fileData, type: fileType, name: file.name };
          const updatedFiles = [...attachedFiles, newFile]; // Append the new file to the existing files
          setAttachedFiles(updatedFiles);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...attachedFiles];
    updatedFiles.splice(index, 1); // Remove the file at the specified index
    setAttachedFiles(updatedFiles);
  };

  // useEffect(() => {
  //   const handleOutsideClick = (event) => {
  //     if (
  //       showEmojiPicker &&
  //       emojipickerRef.current &&
  //       !emojipickerRef.current.contains(event.target)
  //     ) {
  //       setShowEmojiPicker(false);
  //     }
  //   };
  //   document.addEventListener("click", handleOutsideClick);
  //   return () => {
  //     document.removeEventListener("click", handleOutsideClick);
  //   };
  // }, [showEmojiPicker]);

  return (
    <div className="max-w-md mx-auto  bg-white rounded-lg shadow-md mt-20 relative">
      <div className="rounded-lg">
        <div className="flex justify-start items-center rounded-t-lg shadow bg-[#FAFAFA] p-3">
          <button
            className="bg-transparent  text-gray-800 font-semibold py-2 px-2   "
            title="Bold"
            onClick={handleBoldClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M5.33333 3.33594H8.33333C8.95217 3.33594 9.54566 3.58177 9.98325 4.01936C10.4208 4.45694 10.6667 5.05043 10.6667 5.66927C10.6667 6.28811 10.4208 6.8816 9.98325 7.31919C9.54566 7.75677 8.95217 8.0026 8.33333 8.0026H5.33333M5.33333 3.33594V8.0026M5.33333 3.33594H4M5.33333 8.0026H9.66667C10.2855 8.0026 10.879 8.24844 11.3166 8.68602C11.7542 9.12361 12 9.7171 12 10.3359C12 10.9548 11.7542 11.5483 11.3166 11.9859C10.879 12.4234 10.2855 12.6693 9.66667 12.6693H5.33333M5.33333 8.0026V12.6693M5.33333 12.6693H4"
                stroke="#252525"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            className="bg-transparent  text-gray-800 font-semibold py-2   px-2    "
            title="Underline"
            onClick={handleUnderlineClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M10.8885 3V8.27778C10.8885 8.94082 10.6251 9.5767 10.1562 10.0455C9.68738 10.5144 9.0515 10.7778 8.38845 10.7778C7.72541 10.7778 7.08953 10.5144 6.62069 10.0455C6.15185 9.5767 5.88845 8.94082 5.88845 8.27778V3M4.77734 3H6.99957M9.77734 3H11.9996M4.77734 13H12.5551"
                stroke="#252525"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            className="bg-transparent hover:bg-gray-100 text-gray-800 font-semibold py-2  px-2  "
            title="Italic"
            onClick={handleItalicClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M5.916 12.6693L10.0113 3.33594M4 12.6693H8.22M7.78 3.33594H12"
                stroke="#252525"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            className="bg-transparent hover:bg-gray-100 text-gray-800 font-semibold py-2  px-2  "
            title="Strikethrough"
            onClick={handleStrikethroughClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4.80039 3.9999V3.1999H12.8004V3.9999M4.80039 12.7999H8.00039M7.00439 10.3855L6.40039 12.7999M8.80039 3.1999L7.66359 7.6631M7.66359 7.6631L2.40039 2.3999M7.66359 7.6631L13.6004 13.5999"
                stroke="#252525"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="16"
            viewBox="0 0 1 16"
            fill="none"
          >
            <line x1="0.5" x2="0.5" y2="16" stroke="#F0F0F0" />
          </svg>
          <button
            className="bg-transparent hover:bg-gray-100 text-gray-800 font-semibold py-2  px-3  "
            title="Link"
            onClick={handleLinkClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M9.34161 6.64138C8.9017 6.20175 8.30522 5.95479 7.68328 5.95479C7.06135 5.95479 6.46486 6.20175 6.02495 6.64138L3.65561 9.01071C3.21582 9.45054 2.96875 10.0471 2.96875 10.669C2.96875 11.291 3.21582 11.8876 3.65561 12.3274C4.09553 12.767 4.69201 13.014 5.31395 13.014C5.93588 13.014 6.53236 12.767 6.97228 12.3274L7.27961 12.02M6.97228 9.01071C7.41211 9.45051 8.00863 9.69758 8.63061 9.69758C9.2526 9.69758 9.84912 9.45051 10.2889 9.01071L12.6576 6.64138C13.0974 6.20155 13.3445 5.60504 13.3445 4.98305C13.3445 4.36106 13.0974 3.76454 12.6576 3.32471C12.2178 2.88512 11.6214 2.63818 10.9996 2.63818C10.3778 2.63818 9.78142 2.88512 9.34161 3.32471L8.86628 3.80005"
                stroke="#252525"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="16"
            viewBox="0 0 1 16"
            fill="none"
          >
            <line x1="0.5" x2="0.5" y2="16" stroke="#F0F0F0" />
          </svg>
          <button
            className="bg-transparent hover:bg-gray-100 text-gray-800 font-semibold py-2  px-2  "
            title="Ordered List"
            onClick={handleInsertOrderedList}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M5.11743 4.04688H15.0005M5.11743 8.0001H15.0005M5.11743 11.9533H15.0005M0.660156 4.04688H0.670039M0.660156 8.0001H0.670039M0.660156 11.9533H0.670039"
                stroke="#252525"
                stroke-width="1.2"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <button
            className="bg-transparent hover:bg-gray-100 text-gray-800 font-semibold py-2  px-2   "
            title="Unordered List"
            onClick={handleInsertBulletedList}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M7.66634 3.99984H14.0417M7.66634 7.99984H14.0417M7.66634 11.9998H14.0417M2.33301 10.6665C2.33282 10.4436 2.38853 10.2242 2.49504 10.0283C2.60155 9.83252 2.75546 9.66652 2.94269 9.54553C3.12993 9.42454 3.3445 9.35243 3.5668 9.33579C3.7891 9.31915 4.01202 9.35851 4.21518 9.45027C4.41834 9.54203 4.59525 9.68326 4.72973 9.86105C4.86421 10.0388 4.95197 10.2475 4.98498 10.468C5.01798 10.6884 4.99519 10.9137 4.91868 11.123C4.84217 11.3324 4.71438 11.5193 4.54701 11.6665L2.33301 13.3332H5.66634M2.33301 3.33317L3.66634 2.6665V6.6665M2.33301 6.6665H4.99967"
                stroke="#252525"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <div
          contentEditable
          ref={editorRef}
          onInput={updateEditorContent}
          dangerouslySetInnerHTML={{ __html: editorContent }}
          className="bg-white p-4   w-full h-48 overflow-y-auto border-0"
        />
        <div className="flex justify-start  p-2">
          <button
            className="bg-transparent hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 "
            title="Emoji"
            onClick={handleEmojiClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                d="M10.0002 18.0004C14.1425 18.0004 17.5004 14.6425 17.5004 10.5002C17.5004 6.35796 14.1425 3 10.0002 3C5.85796 3 2.5 6.35796 2.5 10.5002C2.5 14.6425 5.85796 18.0004 10.0002 18.0004Z"
                stroke="#252525"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 12C7 12 8.12503 13.5 10.0001 13.5C11.8751 13.5 13.0002 12 13.0002 12"
                stroke="#252525"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.75 8.25H7.75833"
                stroke="#252525"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.25 8.25H12.2583"
                stroke="#252525"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleFileInputChange}
            ref={(input) => input && (input.value = null)} // Reset input value after each file selection
            id="fileInput"
            multiple
          />
          <label
            htmlFor="fileInput"
            className="bg-transparent hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 "
            // title="Attach"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                d="M16.5983 9.7923L10.1379 16.2526C9.34647 17.0441 8.27305 17.4887 7.15379 17.4887C6.03452 17.4887 4.9611 17.0441 4.16966 16.2526C3.37822 15.4612 2.93359 14.3878 2.93359 13.2685C2.93359 12.1492 3.37822 11.0758 4.16966 10.2844L10.63 3.82404C11.1576 3.29642 11.8732 3 12.6194 3C13.3656 3 14.0812 3.29642 14.6088 3.82404C15.1365 4.35167 15.4329 5.06728 15.4329 5.81346C15.4329 6.55964 15.1365 7.27525 14.6088 7.80288L8.14147 14.2632C7.87765 14.527 7.51985 14.6752 7.14676 14.6752C6.77367 14.6752 6.41586 14.527 6.15205 14.2632C5.88823 13.9994 5.74003 13.6416 5.74003 13.2685C5.74003 12.8954 5.88823 12.5376 6.15205 12.2738L12.1203 6.31257"
                stroke="#252525"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </label>
          <button
            className="bg-transparent hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2"
            title="At Mention"
            onClick={() => setShowMentionModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                d="M9.99944 13.7176C11.7746 13.7176 13.2137 12.2785 13.2137 10.5033C13.2137 8.72815 11.7746 7.28906 9.99944 7.28906C8.22424 7.28906 6.78516 8.72815 6.78516 10.5033C6.78516 12.2785 8.22424 13.7176 9.99944 13.7176Z"
                stroke="#252525"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13 7.49953V11.2495C13 11.8463 13.2371 12.4186 13.659 12.8405C14.081 13.2625 14.6533 13.4995 15.25 13.4995C15.8467 13.4995 16.419 13.2625 16.841 12.8405C17.2629 12.4186 17.5 11.8463 17.5 11.2495V10.4995C17.4999 8.8068 16.9272 7.16389 15.875 5.83793C14.8227 4.51197 13.3529 3.58095 11.7045 3.19626C10.056 2.81156 8.32595 2.99582 6.79552 3.71906C5.26508 4.4423 4.0243 5.662 3.27495 7.17982C2.5256 8.69765 2.31173 10.4243 2.66813 12.0791C3.02453 13.7339 3.93024 15.2195 5.23798 16.2942C6.54572 17.369 8.17858 17.9698 9.87106 17.9989C11.5635 18.028 13.2161 17.4837 14.56 16.4545"
                stroke="#252525"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        {showLinkModal && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-md w-80">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">Add Link</h2>
                <button
                  className="text-xl font-bold"
                  onClick={() => setShowLinkModal(false)}
                >
                  &times;
                </button>
              </div>
              <input
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Link text"
                className="bg-gray-200 p-2 rounded mb-2 w-full"
              />
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Link URL"
                className="bg-gray-200 p-2 rounded mb-4 w-full"
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLinkModalSubmit}
              >
                Add Link
              </button>
            </div>
          </div>
        )}

        {showMentionModal && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-md w-80">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">Add Mention</h2>
                <button
                  className="text-xl font-bold"
                  onClick={() => setShowMentionModal(false)}
                >
                  &times;
                </button>
              </div>
              <input
                type="text"
                value={mention}
                onChange={(e) => setMention(e.target.value)}
                placeholder="Mention"
                className="bg-gray-200 p-2 rounded mb-4 w-full"
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleMentionModalSubmit}
              >
                Add Mention
              </button>
            </div>
          </div>
        )}

        {showEmojiPicker && (
          <div className="relative">
            <div className="absolute z-10" ref={emojipickerRef}>
              <EmojiPicker onEmojiClick={handleEmojiSelect} />
            </div>
          </div>
        )}
        {attachedFiles > 0 && (
          <div className="grid grid-cols-4 gap-4 mt-3">
            {attachedFiles.map((file, index) => (
              <div key={index} className="relative border p-2 rounded shadow">
                {/* Display file preview based on the file type */}
                {file.type === "pdf" && (
                  <>
                    <button
                      className="font-bold border rounded-full px-2 bg-red-500 text-white absolute top-2 right-2"
                      onClick={() => handleRemoveFile(index)}
                    >
                      x
                    </button>
                    <img
                      src={pdf}
                      alt="PDF Icon"
                      className="w-16 h-16 mx-auto"
                    />
                    <p className="truncate text-center mt-2">{file.name}</p>
                  </>
                )}
                {file.type === "xls" && (
                  <>
                    <button
                      className="font-bold border rounded-full px-2 bg-red-500 text-white absolute top-2 right-2"
                      onClick={() => handleRemoveFile(index)}
                    >
                      x
                    </button>
                    <img
                      src={xls}
                      alt="XLS Icon"
                      className="w-16 h-16 mx-auto"
                    />
                    <p className="truncate text-center mt-2 ">{file.name}</p>
                  </>
                )}
                {/* Add more conditions for other file types */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
