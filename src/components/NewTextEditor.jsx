import React, { useState, useEffect } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import "./TextEditor.css";

const NewTextEditor = () => {
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(window)
  );
  const [mention, setMention] = useState("");
  const [link, setLink] = useState("");
  const [emoji, setEmoji] = useState("");
  const [file, setFile] = useState(null);

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  };

  const handleBold = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const handleItalic = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const handleUnderline = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const handleClearFormatting = () => {
    const newState = RichUtils.toggleInlineStyle(editorState, "");
    setEditorState(newState);
  };

  const handleInsertBulletList = () => {
    setEditorState(
      RichUtils.toggleBlockType(editorState, "unordered-list-item")
    );
  };

  const handleInsertOrderedList = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, "ordered-list-item"));
  };

  const handleAddMention = () => {
    const mentionText = `@${mention}`;
    const newEditorState = RichUtils.insertText(editorState, mentionText);
    setEditorState(newEditorState);
    setMention("");
  };

  const handleAddLink = () => {
    const linkText = `[${link}](${link})`;
    const newEditorState = RichUtils.insertText(editorState, linkText);
    setEditorState(newEditorState);
    setLink("");
  };

  const handleAddEmoji = () => {
    const emojiText = `:${emoji}:`;
    const newEditorState = RichUtils.insertText(editorState, emojiText);
    setEditorState(newEditorState);
    setEmoji("");
  };

  const handleUploadFile = (e) => {
    setFile(e.target.files[0]);
    console.log("File uploaded:", file);
  };

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleMentionChange = (e) => {
    setMention(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleEmojiChange = (e) => {
    setEmoji(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleBold}
        >
          Bold
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleItalic}
        >
          Italic
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleUnderline}
        >
          Underline
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClearFormatting}
        >
          Clear Formatting
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleInsertBulletList}
        >
          Bullet List
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleInsertOrderedList}
        >
          Ordered List
        </button>
        <input
          type="text"
          value={mention}
          onChange={handleMentionChange}
          placeholder="Mention"
          className="w-1/4 px-4 py-2 border border-gray-300 rounded"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddMention}
        >
          Add Mention
        </button>
        <input
          type="text"
          value={link}
          onChange={handleLinkChange}
          placeholder="Link"
          className="w-1/4 px-4 py-2 border border-gray-300 rounded"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddLink}
        >
          Add Link
        </button>
        <input
          type="text"
          value={emoji}
          onChange={handleEmojiChange}
          placeholder="Emoji"
          className="w-1/4 px-4 py-2 border border-gray-300 rounded"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddEmoji}
        >
          Add Emoji
        </button>
        <input
          type="file"
          onChange={handleUploadFile}
          className="w-1/4 px-4 py-2 border border-gray-300 rounded"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => console.log("Upload File")}
        >
          Upload File
        </button>
      </div>
      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
        handleKeyCommand={handleKeyCommand}
      />
    </div>
  );
};

export default NewTextEditor;
