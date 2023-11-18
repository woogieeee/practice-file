import React, { useState, useEffect } from 'react';
import './Home.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import io from 'socket.io-client';

// Socket.IO 클라이언트를 생성하고 서버에 연결합니다.
const socket = io('http://localhost:3001');

function Home() {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [country, setCountry] = useState('KR');
  const [playing, setPlaying] = useState(false);  // 현재 재생 상태를 저장합니다.
  const videosPerPage = 1;

  useEffect(() => {
    fetchVideos();
    // 서버로부터 videoState 이벤트를 수신하고 재생 상태를 업데이트합니다.
    socket.on('videoState', (videoState) => {
      setPlaying(videoState.playing);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  const fetchVideos = () => {
    const apiKey = 'AIzaSyAQCuk2TmVKrmWb4o91OgvWbAdR0pwdKSw';
    const apiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&videoCategoryId=10&regionCode=${country}&maxResults=50&key=${apiKey}`;

    fetch(apiUrl, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.items) {
          setVideos(data.items);
        } else {
          throw new Error('No items in API response');
        }
      })
      .catch((error) => console.error(error));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const nextButtonClick = () => {
    if (currentPage < Math.ceil(videos.length / videosPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevButtonClick = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Play 버튼 클릭 시 play 이벤트를 서버에 보냅니다.
  const handlePlay = () => {
    socket.emit('play');
  };

  // Pause 버튼 클릭 시 pause 이벤트를 서버에 보냅니다.
  const handlePause = () => {
    socket.emit('pause');
  };

  return (
    <div className="home-container">
      <div className="country-menu">
        <label>국가 선택: </label>
        <select value={country} onChange={handleCountryChange}>
          <option value="KR">한국</option>
          <option value="JP">일본</option>
          <option value="US">미국</option>
        </select>
      </div>
      <div className="video-container">
        <button 
          className="nav-button prev-button" 
          onClick={prevButtonClick} 
          disabled={currentPage === 0}
        >
          <FaArrowLeft />
        </button>
        <div className="video-list">
          {videos
            .slice(
              currentPage * videosPerPage,
              (currentPage + 1) * videosPerPage
            )
            .map((video, index) => (
              <div key={video.id} className="video-card">
                <div className="video-thumbnail">
                  <iframe 
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.snippet.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="video-info">
                  <h3 className="video-title">
                    {((currentPage) * videosPerPage) + index + 1}.{' '}
                    {video.snippet.title}
                  </h3>
                </div>
              </div>
            ))}
        </div>
        <button 
          className="nav-button next-button" 
          onClick={nextButtonClick} 
          disabled={currentPage >= Math.ceil(videos.length / videosPerPage) - 1}
        >
          <FaArrowRight />
        </button>
      </div>
      <div className="playback-controls">
        {/* Play 및 Pause 버튼을 추가합니다 */}
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>
    </div>
  );
}

export default Home;
