import React, { useState, useContext } from "react";
import { Context } from "../../context/Context";
import "./Sidebar.css";

export const Sidebar = () => {
  const [sidebarShow, setSidebarShow] = useState(false);

  const {
    onSent,
    prevPrompts,
    setRecentPrompt,
    newChat,

  } = useContext(Context);

  const handlerClick = () => {
    setSidebarShow(!sidebarShow);
  };

  const loadPrompt = async (prompt) =>{
    setRecentPrompt()
    await onSent(prompt)
  }

  return (
    <div className="sidebar">
      <div className="top">
        <span className="material-icons-outlined menu" onClick={handlerClick}>
          menu
        </span>
        <div className="new-chat" onClick={()=>newChat()}>
          <span className="material-icons-outlined">add</span>
          {sidebarShow ? <p>New Chat</p> : null}
        </div>

        {sidebarShow ? 
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div className="recent-entry" key={index} onClick={()=>loadPrompt(item)}>
                  <span className="material-icons-outlined">chat</span>
                  <p>{item.slice(0,18)}...</p>
                </div>
              )
            })}
          </div>
         : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <span className="material-icons-outlined">help</span>
          {sidebarShow ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <span className="material-icons-outlined">update</span>
          {sidebarShow ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <span className="material-icons-outlined">settings</span>
          {sidebarShow ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};
