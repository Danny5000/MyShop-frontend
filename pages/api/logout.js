import { fetchJson } from "../../lib/api";
async function handleLogout(req, res) {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).end();
    return;
  }

  try {
    const response = await fetchJson(`${process.env.API_URL}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response);

    res.status(200).json({
      response,
    });
  } catch (err) {
    res.status(401).end();
  }
}

export default handleLogout;
