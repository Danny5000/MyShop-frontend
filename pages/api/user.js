import { fetchJson } from "../../lib/api";

async function handleUser(req, res) {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).end();
    return;
  }
  try {
    const user = await fetchJson(`${process.env.API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    res.status(200).json({
      id: user.id,
      userName: user.username,
    });
  } catch (err) {
    res.status(401).end();
  }
}

export default handleUser;
