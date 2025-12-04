export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!client_id || !client_secret || !refresh_token) {
    return res.status(500).json({ 
      error: 'Missing Spotify credentials',
      debug: {
        hasClientId: !!client_id,
        hasClientSecret: !!client_secret,
        hasRefreshToken: !!refresh_token
      }
    });
  }

  try {
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64")
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh_token
      })
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to refresh token');
    }

    const tokenData = await tokenResponse.json();
    const access_token = tokenData.access_token;

    const endpoint = req.query.endpoint || 'currently-playing';

    if (endpoint === 'currently-playing') {
      const spotifyResponse = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      );

      if (spotifyResponse.status === 204 || spotifyResponse.status === 202) {
        return res.status(200).json({ playing: false });
      }

      const spotifyData = await spotifyResponse.json();

      return res.status(200).json({
        playing: true,
        track: {
          name: spotifyData.item.name,
          artist: spotifyData.item.artists.map(a => a.name).join(", "),
          album: spotifyData.item.album.name,
          albumArt: spotifyData.item.album.images[0]?.url,
          url: spotifyData.item.external_urls.spotify
        }
      });
    }

    if (endpoint === 'top-tracks') {
      const timeRange = req.query.time_range || 'short_term';
      const limit = req.query.limit || 5;
      
      const spotifyResponse = await fetch(
        `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      );

      const spotifyData = await spotifyResponse.json();

      return res.status(200).json({
        tracks: spotifyData.items.map(track => ({
          name: track.name,
          artist: track.artists.map(a => a.name).join(", "),
          album: track.album.name,
          albumArt: track.album.images[2]?.url || track.album.images[0]?.url,
          url: track.external_urls.spotify
        }))
      });
    }

    if (endpoint === 'recently-played') {
      const recentLimit = req.query.limit || 5;
      
      const spotifyResponse = await fetch(
        `https://api.spotify.com/v1/me/player/recently-played?limit=${recentLimit}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      );

      const spotifyData = await spotifyResponse.json();

      return res.status(200).json({
        tracks: spotifyData.items.map(item => ({
          name: item.track.name,
          artist: item.track.artists.map(a => a.name).join(", "),
          album: item.track.album.name,
          albumArt: item.track.album.images[2]?.url || item.track.album.images[0]?.url,
          url: item.track.external_urls.spotify,
          playedAt: item.played_at
        }))
      });
    }

    return res.status(400).json({ error: 'Invalid endpoint' });

  } catch (error) {
    console.error('Spotify API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch Spotify data',
      message: error.message 
    });
  }
}