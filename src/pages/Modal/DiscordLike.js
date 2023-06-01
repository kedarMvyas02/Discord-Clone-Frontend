import React, { useState, useRef } from "react";

const CreateServerForm = ({ onSubmit }) => {
  const [serverName, setServerName] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(serverName, avatarFile);
  };

  const handleServerNameChange = (event) => {
    setServerName(event.target.value);
  };

  const handleAvatarFileChange = (event) => {
    setAvatarFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
      }}
    >
      <div
        style={{
          background: "#36393f",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
        }}
      >
        <h2
          style={{
            color: "#fff",
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Create a Server
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label
              htmlFor="serverName"
              style={{ color: "#fff", fontSize: "16px" }}
            >
              Server Name:
            </label>
            <input
              type="text"
              id="serverName"
              name="serverName"
              value={serverName}
              onChange={handleServerNameChange}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "100%",
              }}
              required
            />
          </div>

          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label
              htmlFor="avatarFile"
              style={{ color: "#fff", fontSize: "16px", marginRight: "10px" }}
            >
              Server Avatar:
            </label>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid #7289da",
                cursor: "pointer",
              }}
              onClick={handleUploadClick}
            >
              {avatarFile && (
                <img
                  src={URL.createObjectURL(avatarFile)}
                  alt="Avatar Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </div>
            <input
              type="file"
              id="avatarFile"
              name="avatarFile"
              onChange={handleAvatarFileChange}
              style={{ display: "none" }}
              accept="image/*"
              required
              ref={fileInputRef}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "8px",
              background: "#7289da",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Create Server
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateServerForm;