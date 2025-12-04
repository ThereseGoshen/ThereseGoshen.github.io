export default async function handler(req, res) {
    const code = req.query.code;

    return res.status(200).send(`
    <h1>Spotify Authorization Code</h1>
    <p>Copy this code and paste it somewhere safe:</p>
    <textarea style="width:100%;height:200px;">${code}</textarea>
    `);
}
