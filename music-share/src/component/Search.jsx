import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import axios from 'axios';
import './YoutubeModal.css';

// YouTube 검색 결과 타입을 주석으로 문서화
/**
 * @typedef {Object} YoutubeSearch
 * @property {Object} id
 * @property {string} id.videoId
 * @property {Object} snippet
 * @property {string} snippet.title
 * @property {Object} snippet.thumbnails
 * @property {Object} snippet.thumbnails.medium
 * @property {string} snippet.thumbnails.medium.url
 */

// 유튜브 모달 컴포넌트
export default function YoutubeModal({ roomId }) {
  const [playlist, setPlaylist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [nowPlaying, setNowPlaying] = useState(0);

  // 플레이리스트에 비디오가 있는지 확인
  const isInPlaylist = (video) => playlist.some((item) => item.id.videoId === video.id.videoId);

  // 플레이리스트에 비디오 추가
  const addVideoToPlaylist = (video) => {
    if (!isInPlaylist(video)) {
      setPlaylist([...playlist, video]);
    }
  };

  // 플레이리스트에서 비디오 제거
  const removeVideoFromPlaylist = (index) => {
    const newPlaylist = playlist.filter((_, i) => i !== index);
    setPlaylist(newPlaylist);
    if (index <= nowPlaying && nowPlaying > 0) {
      setNowPlaying(nowPlaying - 1);
    }
  };

  // 검색어 변경 처리
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // YouTube 검색 실행
  const handleSearch = async () => {
    if (!searchTerm) return;
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: searchTerm,
          type: 'video',
          key: 'AIzaSyAQCuk2TmVKrmWb4o91OgvWbAdR0pwdKSw'
        }
      });
      setSearchResults(response.data.items);
    } catch (error) {
      console.error('YouTube 검색 API 에러:', error);
    }
  };

  // 컴포넌트 마운트 시 소켓 연결 및 이벤트 리스너 설정
  useEffect(() => {
    // TODO: 소켓 연결 및 이벤트 리스너 로직 구현
  }, [roomId]);

  return (
    <div className="youtube-modal">
      <div className="modal-header">유튜브 모달 헤더</div>
      <div className="modal-search-input">
        <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="검색..." />
        <button onClick={handleSearch}>검색</button>
      </div>
      <div className="modal-search-results">
        {searchResults.map((video) => (
          <div key={video.id.videoId} className="search-result-item" onClick={() => addVideoToPlaylist(video)}>
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            <div className="video-title">{video.snippet.title}</div>
          </div>
        ))}
      </div>
      <div className="modal-playing">
        {playlist.length > 0 && (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${playlist[nowPlaying].id.videoId}`}
            playing
            controls
            onEnded={() => setNowPlaying((nowPlaying + 1) % playlist.length)}
          />
        )}
      </div>
      <div className="modal-playlist">
        {playlist.map((video, index) => (
          <div key={video.id.videoId} className="playlist-item">
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            <div className="video-title">{video.snippet.title}</div>
            <button onClick={() => removeVideoFromPlaylist(index)}>제거</button>
          </div>
        ))}
      </div>
    </div>
  );
}
