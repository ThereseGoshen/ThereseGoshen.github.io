export default async function handler(req, res) {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
    const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

    async function getAccessToken() {
        const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64")
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token
            })
        });

        return tokenResponse.json();
    }

    const token = await getAccessToken();

    const nowPlayingResponse = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
            headers: {
                Authorization: `Bearer ${token.access_token}`
            }
        }
    );

    if (nowPlayingResponse.status === 204) {
        return res.status(200).json({ playing: false });
    }

    const nowPlaying = await nowPlayingResponse.json();

    return res.status(200).json({
        playing: true,
        artist: nowPlaying.item.artists.map(a => a.name).join(", "),
        song: nowPlaying.item.name,
        albumArt: nowPlaying.item.album.images[0].url
    });
}
