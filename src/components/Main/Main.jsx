import React, { useContext } from "react";
import "./Main.css";
import { Context } from "../../context/Context";
import geminIcon from "../../assets/gemin-icon.png";
import profileImage from "../../assets/profile.jpeg";

export const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    handleKeyDown,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img
          src={profileImage}
          alt=""
        />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <span className="material-icons-outlined">map</span>
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <span className="material-icons-outlined">info</span>
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <span className="material-icons-outlined">chat</span>
              </div>
              <div className="card">
                <p>Tell me about React js and React native</p>
                <span className="material-icons-outlined">code</span>
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img
                src={profileImage}
                alt=""
              />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={geminIcon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr className="animated-bg"></hr>
                  <hr className="animated-bg"></hr>
                  <hr className="animated-bg"></hr>
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div>
              <span className="material-icons-outlined">
                add_photo_alternate
              </span>
              <span className="material-icons-outlined">mic</span>
              {input ? (
                <span
                  className="material-icons-outlined"
                  onClick={() => onSent()}
                >
                  send
                </span>
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};
