<script>
  import { onMount } from 'svelte';
  

  const CLIENT_ID = 'aa40d44af89645e4869ebe5f13968b90';
  const REDIRECT_URI = 'https://therese-goshen-github-io.vercel.app/api/callback';
  console.log("Redirect:", REDIRECT_URI);

  //scopes - permissions the app is requesting
  const SCOPES = [
    'user-read-currently-playing',
    'user-top-read',
    'user-read-recently-played',
    'playlist-read-private'
  ].join(' ');
  
  let accessToken = '';
  let currentTrack = null;
  let topTracks = [];
  let recentTracks = [];
  let isLoading = true;
  let error = null;
  
  // Generate code verifier for PKCE
  function generateCodeVerifier() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const randomValues = crypto.getRandomValues(new Uint8Array(64));
    return Array.from(randomValues)
      .map(v => possible[v % possible.length])
      .join('');
  }
  
  // Generate code challenge from verifier
  async function generateCodeChallenge(verifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(hash)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }
  
  // Initiate Spotify login with PKCE
  async function loginWithSpotify() {
    const codeVerifier = generateCodeVerifier();
    localStorage.setItem('code_verifier', codeVerifier);
    
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      scope: SCOPES,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    });
    
    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }
  
  // Exchange authorization code for access token
  async function getAccessToken(code) {
    const codeVerifier = localStorage.getItem('code_verifier');
    
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier
    });
    
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });
      
      const data = await response.json();
      
      if (data.access_token) {
        accessToken = data.access_token;
        localStorage.setItem('spotify_access_token', data.access_token);
        localStorage.setItem('spotify_refresh_token', data.refresh_token);
        localStorage.setItem('spotify_token_expiry', Date.now() + (data.expires_in * 1000));
        
        // Clean up
        localStorage.removeItem('code_verifier');
        
        return data.access_token;
      }
    } catch (err) {
      console.error('Error getting access token:', err);
      error = 'Failed to authenticate with Spotify';
    }
  }
  
  // Refresh access token
  async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('spotify_refresh_token');
    if (!refreshToken) return null;
    
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    });
    
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });
      
      const data = await response.json();
      
      if (data.access_token) {
        accessToken = data.access_token;
        localStorage.setItem('spotify_access_token', data.access_token);
        localStorage.setItem('spotify_token_expiry', Date.now() + (data.expires_in * 1000));
        return data.access_token;
      }
    } catch (err) {
      console.error('Error refreshing token:', err);
    }
    
    return null;
  }
  
  // Check if token is expired and refresh if needed
  async function ensureValidToken() {
    const expiry = localStorage.getItem('spotify_token_expiry');
    if (expiry && Date.now() >= parseInt(expiry)) {
      return await refreshAccessToken();
    }
    return accessToken;
  }
  
  // Fetch currently playing track
  async function getCurrentlyPlaying() {
    const token = await ensureValidToken();
    if (!token) return;
    
    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        const data = await response.json();
        if (data && data.item) {
          currentTrack = data.item;
        }
      } else if (response.status === 204) {
        // No track currently playing
        currentTrack = null;
      }
    } catch (err) {
      console.error('Error fetching currently playing:', err);
    }
  }
  
  // Fetch top tracks
  async function getTopTracks() {
    const token = await ensureValidToken();
    if (!token) return;
    
    try {
      const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      topTracks = data.items || [];
    } catch (err) {
      console.error('Error fetching top tracks:', err);
    }
  }
  
  // Fetch recently played tracks
  async function getRecentlyPlayed() {
    const token = await ensureValidToken();
    if (!token) return;
    
    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=5', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      recentTracks = data.items || [];
    } catch (err) {
      console.error('Error fetching recently played:', err);
    }
  }
  
  // Logout and clear tokens
  function logout() {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_token_expiry');
    localStorage.removeItem('code_verifier');
    accessToken = '';
    currentTrack = null;
    topTracks = [];
    recentTracks = [];
  }
  
  onMount(async () => {
    // Check if we're coming back from Spotify authorization
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      // Exchange code for token
      await getAccessToken(code);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
    } else {
      // Try to get token from localStorage
      accessToken = localStorage.getItem('spotify_access_token') || '';
    }
    
    if (accessToken) {
      // Fetch all data
      await Promise.all([
        getCurrentlyPlaying(),
        getTopTracks(),
        getRecentlyPlayed()
      ]);
      
      // Refresh current track every 30 seconds
      setInterval(getCurrentlyPlaying, 30000);
    }
    
    isLoading = false;
  });
</script>

<div class="spotify-widget">
  <div class="widget-header">
    <h2>[♫] Spotify Dashboard</h2>
    {#if accessToken}
      <button on:click={logout} class="logout-btn">Logout</button>
    {/if}
  </div>
  
  {#if isLoading}
    <div class="loading">Loading...</div>
  {:else if error}
    <div class="error">{error}</div>
  {:else if !accessToken}
    <div class="auth-prompt">
      <p>Connect to Spotify to see my music stats!</p>
      <button on:click={loginWithSpotify} class="connect-btn">
        <span class="btn-icon">[♪]</span>
        Connect Spotify
      </button>
    </div>
  {:else}
    <!-- Currently Playing -->
    {#if currentTrack}
      <div class="section now-playing">
        <h3>~> Now Playing</h3>
        <div class="track-card featured">
          {#if currentTrack.album.images[0]}
            <img src={currentTrack.album.images[0].url} alt={currentTrack.name} />
          {/if}
          <div class="track-details">
            <p class="track-name">{currentTrack.name}</p>
            <p class="artist-name">{currentTrack.artists.map(a => a.name).join(', ')}</p>
            <p class="album-name">{currentTrack.album.name}</p>
          </div>
        </div>
      </div>
    {:else}
      <div class="section">
        <p class="not-playing">No track currently playing</p>
      </div>
    {/if}
    
    <!-- Top Tracks -->
    {#if topTracks.length > 0}
      <div class="section">
        <h3>++ Top Tracks This Month</h3>
        <div class="track-list">
          {#each topTracks as track, i}
            <div class="track-item">
              <span class="track-number">#{i + 1}</span>
              <div class="track-info">
                {#if track.album.images[2]}
                  <img src={track.album.images[2].url} alt={track.name} class="track-thumb" />
                {/if}
                <div>
                  <p class="track-name">{track.name}</p>
                  <p class="artist-name">{track.artists[0].name}</p>
                </div>
              </div>
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
          {#each recentTracks as item, i}
            <div class="track-item">
              <span class="track-number">#{i + 1}</span>
              <div class="track-info">
                {#if item.track.album.images[2]}
                  <img src={item.track.album.images[2].url} alt={item.track.name} class="track-thumb" />
                {/if}
                <div>
                  <p class="track-name">{item.track.name}</p>
                  <p class="artist-name">{item.track.artists[0].name}</p>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  {/if}
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
  
  .auth-prompt {
    text-align: center;
    padding: 2rem;
  }
  
  .auth-prompt p {
    margin-bottom: 1.5rem;
    color: #666;
  }
  
  .connect-btn {
    background: #1DB954;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
  }
  
  .connect-btn:hover {
    background: #1ed760;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(29, 185, 84, 0.3);
  }
  
  .btn-icon {
    font-family: 'Courier New', monospace;
    font-size: 1.2rem;
  }
  
  .logout-btn {
    background: transparent;
    border: 1px solid #ddd;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    color: #666;
    font-size: 0.9rem;
    transition: all 0.2s ease;
  }
  
  .logout-btn:hover {
    background: #f5f5f5;
    border-color: #999;
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