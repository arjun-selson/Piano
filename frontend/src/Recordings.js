import React, { useEffect, useState } from "react";
import Navbar from "./Navbar1";

function Recordings() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
        console.error("User ID not found in session storage.");
        return;
    }

    fetch(`http://localhost:8080/recordings?userId=${userId}`, {
        method: "GET",
        credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
        setSongs(data);
    })
    .catch(err => console.error("Error fetching recordings:", err));
}, []);

    return (
        <div style={{
            background: "#111",
            minHeight: "100vh",
            color: "#fff",
            padding: "40px 0",
            fontFamily: "Segoe UI, Arial, sans-serif"
        }}>
            <Navbar />
            <div style={{
                background: "#222",
                maxWidth: 600,
                margin: "40px auto",
                borderRadius: 16,
                boxShadow: "0 4px 24px #0008",
                padding: "32px 32px 24px 32px"
            }}>
                <h2 style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "2rem",
                    marginBottom: "24px",
                    letterSpacing: "1px",
                    borderBottom: "2px solid #444",
                    paddingBottom: "12px"
                }}>
                    Your Recordings
                </h2>
                {songs.length === 0 ? (
                    <p style={{ color: "#bbb", fontSize: "1.1rem" }}>No recordings found.</p>
                ) : (
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {songs.map((song, index) => (
                            <li key={index} style={{
                                background: "#181818",
                                borderRadius: 8,
                                marginBottom: 18,
                                padding: "16px 18px",
                                display: "flex",
                                alignItems: "center",
                                boxShadow: "0 2px 8px #0004"
                            }}>
                                <span style={{
                                    flex: 1,
                                    color: "#fff",
                                    fontWeight: 500,
                                    fontSize: "1.1rem"
                                }}>
                                    {song.songName}
                                </span>
                                <audio controls src={song.songPath} style={{
                                    marginLeft: 18,
                                    background: "#222",
                                    borderRadius: 4,
                                    outline: "none"
                                }} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Recordings;