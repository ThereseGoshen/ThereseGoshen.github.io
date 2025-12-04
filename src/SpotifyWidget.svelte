<script>
  import { onMount } from 'svelte';
  
  // Your Vercel API endpoint
  // For production: '/api/spotify' (relative path works on Vercel)
  const API_BASE = '/api/spotify';
  
  let currentTrack = null;
  let topTracks = [];
  let recentTracks = [];
  let isLoading = true;
  let error = null;
  let isPlaying = false;
  
  // Fetch currently playing track
  async function getCurrentlyPlaying() {
    try {
      const response = await fetch(`${API_BASE}?endpoint=currently-playing`);
      const data = await response.json();
      
      if (data.playing) {
        currentTrack = data.track;
        isPlaying = true;
      } else {
        currentTrack = null;
        isPlaying = false;
      }
    } catch (err) {
      console.error('Error fetching currently playing:', err);
      error = 'Failed to fetch currently playing track';
    }
  }
  
  // Fetch top tracks
  async function getTopTracks() {
    try {
      const response = await fetch(`${API_BASE}?endpoint=top-tracks&time_range=short_term&limit=5`);
      const data = await response.json();
      topTracks = data.tracks || [];
    } catch (err) {
      console.error('Error fetching top tracks:', err);
    }
  }
  
  // Fetch recently played tracks
  async function getRecentlyPlayed() {
    try {
      const response = await fetch(`${API_BASE}?endpoint=recently-played&limit=5`);
      const data = await response.json();
      recentTracks = data.tracks || [];
    } catch (err) {
      console.error('Error fetching recently played:', err);
    }
  }
  
  // Refresh all data
  async function refreshData() {
    isLoading = true;
    error = null;
    
    try {
      await Promise.all([
        getCurrentlyPlaying(),
        getTopTracks(),
        getRecentlyPlayed()
      ]);
    } catch (err) {
      error = 'Failed to fetch Spotify data';
    } finally {
      isLoading = false;
    }
  }
  
  onMount(async () => {
    // Initial load
    await refreshData();
    
    // Refresh current track every 30 seconds
    const interval = setInterval(getCurrentlyPlaying, 30000);
    
    return () => {
      clearInterval(interval);
    };
  });
</script>

<div class="spotify-widget">
  <div class="widget-header">
    <h2>[♫] My Spotify Stats</h2>
    <button on:click={refreshData} class="refresh-btn" disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Refresh'}
    </button>
  </div>
  
  {#if isLoading && !currentTrack && !topTracks.length}
    <div class="loading">
      <p>Loading Spotify data...</p>
    </div>
  {:else if error}
    <div class="error">
      <p>{error}</p>
      <button on:click={refreshData} class="retry-btn">Retry</button>
    </div>
  {:else}
    <!-- Currently Playing -->
    <div class="section now-playing">
      <h3>~> Now Playing</h3>
      {#if isPlaying && currentTrack}
        <div class="track-card featured">
          {#if currentTrack.albumArt}
            <img src={currentTrack.albumArt} alt={currentTrack.name} />
          {/if}
          <div class="track-details">
            <p class="track-name">{currentTrack.name}</p>
            <p class="artist-name">{currentTrack.artist}</p>
            <p class="album-name">{currentTrack.album}</p>
            <a href={currentTrack.url} target="_blank" rel="noopener" class="spotify-link">
              Listen on Spotify →
            </a>
          </div>
        </div>
      {:else}
        <p class="not-playing">Nothing playing right now</p>
      {/if}
    </div>
    
    <!-- Top Tracks -->
    {#if topTracks.length > 0}
      <div class="section">
        <h3>++ Top Tracks This Month</h3>
        <div class="track-list">
          {#each topTracks as track, i}
            <div class="track-item">
              <span class="track-number">#{i + 1}</span>
              <div class="track-info">
                {#if track.albumArt}
                  <img src={track.albumArt} alt={track.name} class="track-thumb" />
                {/if}
                <div class="track-text">
                  <p class="track-name">{track.name}</p>
                  <p class="artist-name">{track.artist}</p>
                </div>
              </div>
              <a href={track.url} target="_blank" rel="noopener" class="play-icon" title="Play on Spotify">
                ▶
              </a>
            </div>
          {/each}
        </div>
      </div>
    {/if}
    
    <!-- Recently Played -->
    {#if recentTracks.length > 0}
      <div class="section">
        <h3>~ Recently Played</h3>
        <div class="track-list">
          {#each recentTracks as track, i}
            <div class="track-item">
              <span class="track-number">#{i + 1}</span>
              <div class="track-info">
                {#if track.albumArt}
                  <img src={track.albumArt} alt={track.name} class="track-thumb" />
                {/if}
                <div class="track-text">
                  <p class="track-name">{track.name}</p>
                  <p class="artist-name">{track.artist}</p>
                </div>
              </div>
              <a href={track.url} target="_blank" rel="noopener" class="play-icon" title="Play on Spotify">
                ▶
              </a>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  {/if}
  
  <div class="footer">
    <p>Real-time data from my Spotify account • Updates every 30 seconds</p>
  </div>
</div>

<style>
  .spotify-widget {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 2rem auto;
  }
  
  .widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  h2 {
    color: #1DB954;
    font-family: 'Courier New', monospace;
    margin: 0;
    font-size: 1.5rem;
  }
  
  h3 {
    font-family: 'Courier New', monospace;
    color: #333;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  .loading, .error {
    text-align: center;
    padding: 2rem;
    color: #666;
  }
  
  .error {
    color: #e74c3c;
  }
  
  .error p {
    margin-bottom: 1rem;
  }
  
  .refresh-btn, .retry-btn {
    background: transparent;
    border: 1px solid #ddd;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    color: #666;
    font-size: 0.9rem;
    transition: all 0.2s ease;
  }
  
  .refresh-btn:hover:not(:disabled), .retry-btn:hover {
    background: #f5f5f5;
    border-color: #999;
  }
  
  .refresh-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .retry-btn {
    background: #1DB954;
    color: white;
    border-color: #1DB954;
  }
  
  .retry-btn:hover {
    background: #1ed760;
  }
  
  .section {
    margin-bottom: 2rem;
  }
  
  .not-playing {
    text-align: center;
    color: #999;
    font-style: italic;
    padding: 1rem;
  }
  
  /* Now Playing - Featured Track */
  .track-card.featured {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    padding: 1.5rem;
    background: linear-gradient(135deg, #f0f7ff 0%, #e6f2ff 100%);
    border-radius: 12px;
    border-left: 4px solid #1DB954;
  }
  
  .track-card.featured img {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .track-details .track-name {
    font-size: 1.3rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .track-details .artist-name {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 0.25rem;
  }
  
  .track-details .album-name {
    font-size: 0.95rem;
    color: #999;
    margin-bottom: 0.75rem;
  }
  
  .spotify-link {
    color: #1DB954;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  .spotify-link:hover {
    text-decoration: underline;
  }
  
  /* Track List */
  .track-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .track-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    background: #f9f9f9;
    border-radius: 8px;
    transition: all 0.2s ease;
  }
  
  .track-item:hover {
    background: #f0f0f0;
    transform: translateX(4px);
  }
  
  .track-number {
    font-family: 'Courier New', monospace;
    font-weight: bold;
    color: #1DB954;
    min-width: 30px;
  }
  
  .track-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
  }
  
  .track-thumb {
    width: 50px;
    height: 50px;
    border-radius: 4px;
  }
  
  .track-text {
    flex: 1;
  }
  
  .track-info .track-name {
    font-weight: 600;
    color: #333;
    margin-bottom: 0.25rem;
    font-size: 0.95rem;
  }
  
  .track-info .artist-name {
    color: #666;
    font-size: 0.85rem;
  }
  
  .play-icon {
    color: #1DB954;
    font-size: 1.2rem;
    text-decoration: none;
    opacity: 0.7;
    transition: opacity 0.2s ease;
  }
  
  .play-icon:hover {
    opacity: 1;
  }
  
  .footer {
    text-align: center;
    padding-top: 1.5rem;
    margin-top: 1.5rem;
    border-top: 1px solid #eee;
  }
  
  .footer p {
    color: #999;
    font-size: 0.85rem;
    margin: 0;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .spotify-widget {
      padding: 1.5rem;
    }
    
    .track-card.featured {
      flex-direction: column;
      text-align: center;
    }
    
    .track-card.featured img {
      width: 100px;
      height: 100px;
    }
    
    .widget-header {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }
  }
</style>