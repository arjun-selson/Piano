import React, { useRef, useState, useEffect } from 'react';
import Navbar1 from './Navbar1';
import './piano.css';

const recordIcons = [
  'https://www.flipsidexr.com/files/docs/graphics/button_w-record.png',
  'https://png.pngtree.com/element_our/png/20181205/stop-vector-icon-png_256694.jpg'
];

const defaultKeyMap = [
  { id: 'button1', key: '1', label: 'C3#', audio: '', className: 'block-key-1' },
  { id: 'button2', key: '2', label: 'D3#', audio: '', className: 'block-key-2' },
  { id: 'buttonA', key: 'a', label: 'F3#', audio: '', className: 'block-key-a' },
  { id: 'buttonS', key: 's', label: 'G3#', audio: '', className: 'block-key-s' },
  { id: 'buttonD', key: 'd', label: 'A3#', audio: '', className: 'block-key-d' },
  { id: 'buttonF', key: 'f', label: 'C3#', audio: '', className: 'block-key-f' },
  { id: 'buttonG', key: 'g', label: 'D4#', audio: '', className: 'block-key-g' },
  { id: 'buttonH', key: 'h', label: 'F4#', audio: '', className: 'block-key-h' },
  { id: 'buttonJ', key: 'j', label: 'G4#', audio: '', className: 'block-key-j' },
  { id: 'buttonK', key: 'k', label: 'A4#', audio: '', className: 'block-key-k' },
  { id: 'buttonL', key: 'l', label: 'C5#', audio: '', className: 'block-key-l' },
  { id: 'button;', key: ';', label: 'D5#', audio: '', className: 'block-key-;' },
  { id: 'button8', key: '8', label: 'F5#', audio: '', className: 'block-key-8' },
  { id: 'button9', key: '9', label: 'G5#', audio: '', className: 'block-key-9' },
  { id: 'button0', key: '0', label: 'A5#', audio: '', className: 'block-key-0' },
  { id: 'buttonQ', key: 'q', label: 'C3', audio: '', className: 'white-key' },
  { id: 'buttonW', key: 'w', label: 'D3', audio: '', className: 'white-key' },
  { id: 'buttonE', key: 'e', label: 'E3', audio: '', className: 'white-key' },
  { id: 'buttonR', key: 'r', label: 'F3', audio: '', className: 'white-key' },
  { id: 'buttonT', key: 't', label: 'G3', audio: '', className: 'white-key' },
  { id: 'buttonY', key: 'y', label: 'A3', audio: '', className: 'white-key' },
  { id: 'buttonU', key: 'u', label: 'B3', audio: '', className: 'white-key' },
  { id: 'buttonI', key: 'i', label: 'C4', audio: '', className: 'white-key' },
  { id: 'buttonO', key: 'o', label: 'D4', audio: '', className: 'white-key' },
  { id: 'buttonP', key: 'p', label: 'E4', audio: '', className: 'white-key' },
  { id: 'button[', key: '[', label: 'F4', audio: '', className: 'white-key' },
  { id: 'button]', key: ']', label: 'G4', audio: '', className: 'white-key' },
  { id: 'buttonZ', key: 'z', label: 'A4', audio: '', className: 'white-key' },
  { id: 'buttonX', key: 'x', label: 'B4', audio: '', className: 'white-key' },
  { id: 'buttonC', key: 'c', label: 'C5', audio: '', className: 'white-key' },
  { id: 'buttonV', key: 'v', label: 'D5', audio: '', className: 'white-key' },
  { id: 'buttonB', key: 'b', label: 'E5', audio: '', className: 'white-key' },
  { id: 'buttonN', key: 'n', label: 'F5', audio: '', className: 'white-key' },
  { id: 'buttonM', key: 'm', label: 'G5', audio: '', className: 'white-key' },
  { id: 'button,', key: ',', label: 'A5', audio: '', className: 'white-key' },
  { id: 'button.', key: '.', label: 'B5', audio: '', className: 'white-key' },
  { id: 'button1A', key: '1', label: 'B5', audio: '', className: 'white-key' }
];

const audioRefs = {};
const btnRefs = {};

const Piano = () => {
  const [keyMapState, setKeyMapState] = useState(defaultKeyMap);
  const [recImg, setRecImg] = useState(recordIcons[0]);
  const [recording, setRecording] = useState(false);
  const [fileName, setFileName] = useState('');
  const [srcs, setSrcs] = useState([]);
  const [blobUrl, setBlobUrl] = useState(null);

  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("http://localhost:8080/api/getKeySounds")
    .then(res => res.json())
    .then(data => {
      const updatedMap = defaultKeyMap.map(key => ({
        ...key,
        audio: data[key.id] || ''
      }));
      setKeyMapState(updatedMap);
      setLoading(false); // Done loading!
    })
    .catch(err => {
      console.error("Failed to load audio URLs:", err);
      setLoading(false);
    });
}, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = typeof event.key === "string" ? event.key.toLowerCase() : event.key;
      const found = keyMapState.find(k => k.key === key);
      if (found) handleButtonClick(found.id);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyMapState, recording]);

  const handleButtonClick = (btnId) => {
    const found = keyMapState.find(k => k.id === btnId);
    const audio = audioRefs[btnId];

    if (audio) {
      if (recording) {
        setSrcs(prev => [...prev, found.audio]);
      }

      audio.currentTime = 0;
      audio.play();

      const btn = btnRefs[btnId];
      if (btn) {
        btn.classList.add('pressed');
        setTimeout(() => {
          btn.classList.remove('pressed');
        }, 150);
      }
    }
  };

  const changePic = async () => {
    if (!recording) {
      setRecImg(recordIcons[1]);
      setRecording(true);
      setSrcs([]);
      setBlobUrl(null);
    } else {
      setRecImg(recordIcons[0]);
      setRecording(false);
      try {
        const blobs = await Promise.all(srcs.map(uri => fetch(uri).then(r => r.blob())));
        const merged = new Blob(blobs, { type: "audio/mp3" });
        const url = URL.createObjectURL(merged);
        setBlobUrl(url);
      } catch (err) {
        console.error("Failed to generate blob:", err);
      }
    }
  };

  const down = async (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem("userId");
    if (!blobUrl) {
      alert("No recording available!");
      return;
    }
    try {
      const response = await fetch(blobUrl);
      const blob = await response.blob();

      const formData = new FormData();
      console.log("Uploading file:", blob, "with name:", fileName);
      formData.append("file", blob, fileName + ".mp3");
      formData.append("songName", fileName);
      formData.append("userId", userId);

      const res = await fetch("http://localhost:8080/uploadSong", {
        method: "POST",
        credentials: "include",
        body: formData
      });

      const msg = await res.text();
      alert(msg);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <>
      <Navbar1 />
      <div className="main-contents">
        <div className="topic">
          <div style={{ float: 'left', width: 750 }}>
            <p style={{ fontWeight: 'bold', color: 'rgb(168, 115, 218)', fontSize: 18, fontFamily: 'Dancing Script, cursive' }}>
              Welcome to Pianist!
            </p>
            <p>Welcome to Pianist! Our Virtual Piano lets you play on your computer or laptop keyboard.</p>
          </div>
          <div className="record" style={{ float: 'right', textAlign: 'center' }}>
            <button onClick={changePic} style={{ background: 'none', border: 'none' }}>
              <img src={recImg} style={{ height: 45, width: 75,lineHeight: 0.75 }} alt="Record" />
            </button>
            <form onSubmit={down}>
              <label style={{lineHeight: 0.6 }}>Enter File Name:</label><br />
              <input
                type="text"
                style={{ width: 120, border: '2px solid black', lineHeight: 0.6 }}
                placeholder="Audio file name"
                value={fileName}
                onChange={e => setFileName(e.target.value)}
              /><br />
              <button
                style={{ width: 125, backgroundColor: '#00cc00', borderRadius: 3, padding: 4, marginTop: 5, border: 'none' ,lineHeight:0.6}}
                disabled={!blobUrl}
                type="submit"
              >
                Download
              </button>
            </form>
          </div>
        </div>

        <br /><br />

        <div className="keys">
          <div id="block-keys">
            {keyMapState.filter(k => k.className.startsWith('block-key')).map(k => (
              <button
                key={k.id}
                id={k.id}
                className={k.className}
                ref={el => btnRefs[k.id] = el}
                onClick={() => handleButtonClick(k.id)}
              >
                <b>{k.key}<br /><br />{k.label}</b>
                <audio ref={el => audioRefs[k.id] = el} src={k.audio}></audio>
              </button>
            ))}
          </div>
          <div id="white-keys">
            {keyMapState.filter(k => k.className === 'white-key').map(k => (
              <button
                key={k.id}
                id={k.id}
                className={k.className}
                ref={el => btnRefs[k.id] = el}
                onClick={() => handleButtonClick(k.id)}
              >
                <b>{k.key}<br /><br />{k.label}</b>
                <audio ref={el => audioRefs[k.id] = el} src={k.audio}></audio>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Piano;
