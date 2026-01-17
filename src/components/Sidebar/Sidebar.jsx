



import React, { useState, useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const [recentPrompt, setRecentPrompt] = useState(""); // added state for recent prompt
  const { onSent, previousPrompts, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      {/* Top Section */}
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu"
        />

        <div className="sidebar-top">
          <button className="new-chat" onClick={newChat}>
            ➕ New Chat
          </button>
        </div>
      </div>

      {/* History / Previous Prompts */}
      <div className="sidebar-history">
        {previousPrompts.map((prompt, index) => (
          <div
            key={index}
            className="sidebar-item"
            onClick={() => onSent(prompt)}
          >
            💬 {prompt.slice(0, 25)}...
          </div>
        ))}

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {previousPrompts.map((item, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(item)}
                className="recent-entry"
              >
                <img src={assets.message_icon} alt="msg" />
                <p>{item.slice(0, 20)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="help" />
          {extended && <p>Help</p>}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="activity" />
          {extended && <p>Activity</p>}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="settings" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
