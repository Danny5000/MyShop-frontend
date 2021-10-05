import { fetchJson } from "../../lib/api";
import jwt from "jsonwebtoken";

const { API_URL } = process.env;

async function handleGetCart(req, res) {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).end();
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  try {
    const cartItems = await fetchJson(`${API_URL}/cart/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(401).end();
  }
}

async function handlePostCart(req, res) {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).end();
    return;
  }
  const { productId, quantity } = req.body;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  try {
    const product = await fetchJson(`${API_URL}/cart/${userId}/${productId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });
    //console.log(product);
    res.status(200).json({});
  } catch (err) {
    res.status(401).end();
  }
}

async function handleCart(req, res) {
  switch (req.method) {
    case "GET":
      return handleGetCart(req, res);
    case "POST":
      return handlePostCart(req, res);
    default:
      res.status(405).end();
  }
}

export default handleCart;
