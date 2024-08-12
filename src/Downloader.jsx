// import React, { useState } from 'react';
// import axios from 'axios';
// import { FaDownload } from 'react-icons/fa';
// import { ClipLoader } from 'react-spinners';
// import './Downloader.css';

// const Downloader = () => {
//   const [url, setUrl] = useState('');
//   const [formats, setFormats] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchFormats = async () => {
//     setLoading(true);
//     setFormats([]);
//     setError('');
//     try {
//       const response = await axios.get(`http://localhost:4003/download?url=${url}`);
//       setFormats(response.data);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to fetch formats');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadVideo = (format) => {
//     window.location.href = `http://localhost:4003/download/${format.itag}?url=${url}`;
//   };

//   return (
//     <div className="downloader">
//       <h2>YouTube Downloader</h2>
//       <div className="input-group">
//         <input
//           type="text"
//           placeholder="Enter YouTube URL"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//         />
//         <button onClick={fetchFormats} disabled={loading || !url}>
//           {loading ? <ClipLoader size={20} color="#fff" /> : 'Get Formats'}
//         </button>
//       </div>
//       {error && <p className="error-message">{error}</p>}
//       {formats.length > 0 && (
//         <div className="formats">
//           <h3>Select Quality</h3>
//           <ul>
//             {formats.map((format) => (
//               <li key={format.itag} className="format-item">
//                 {format.qualityLabel}
//                 <button onClick={() => downloadVideo(format)}>
//                   <FaDownload /> Download
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Downloader;
import React, { useState } from 'react';
import axios from 'axios';
import { FaDownload } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import './Downloader.css';

const Downloader = () => {
  const [url, setUrl] = useState('');
  const [formats, setFormats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchFormats = async () => {
    setLoading(true);
    setFormats([]);
    setError('');
    try {
      const response = await axios.get(`http://localhost:4002/download?url=${url}`);
      setFormats(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch formats');
    } finally {
      setLoading(false);
    }
  };

  const downloadVideo = (format) => {
    window.location.href = `http://localhost:4002/download/${format.itag}?url=${url}`;
  };

  return (
    <div className="downloader">
      <header className="header">
        <h1 className="logo">ytdownloder<span>.com</span></h1>
        <nav className="nav">
          <a href="#mp3">YouTube to MP3</a>
          <a href="#video">YouTube Video Downloader</a>
          <a href="#apis">APIs</a>
        </nav>
      </header>

      <main className="main-content">
        <h2 className="main-title">YouTube Video Downloader</h2>
        <p className="main-description">
          Download YouTube videos in seconds with this free and easy-to-use tool. 
          Just enter the URL of the video you want to download and click "Download". 
          That's it!
        </p>
        <div className="input-group">
          <input
            type="text"
            placeholder="Paste Your URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={fetchFormats} disabled={loading || !url}>
            {loading ? <ClipLoader size={20} color="#fff" /> : 'Download'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {formats.length > 0 && (
          <div className="formats">
            <ul>
              {formats.map((format) => (
                <li key={format.itag} className="format-item">
                  {format.qualityLabel}
                  <button onClick={() => downloadVideo(format)}>
                    <FaDownload /> {format.qualityLabel}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>
          WE DO NOT ALLOW/SUPPORT THE DOWNLOAD OF COPYRIGHTED MATERIAL!
        </p>
        <div className="social-icons">
          <i className="youtube-icon">YouTube</i>
          <i className="facebook-icon">Facebook</i>
          {/* Add other icons as needed */}
        </div>
      </footer>
    </div>
  );
};

export default Downloader;
