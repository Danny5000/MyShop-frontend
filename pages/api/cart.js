import { fetchJson } from "../../lib/api";
import jwt from "jsonwebtoken";

const { API_URL } = process.env;

async function handleGetCart(req, res) {
  const { token, userId } = getTokenAndUserID(req, res);

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
  const { token, userId } = getTokenAndUserID(req, res);

  const { productId, quantity } = req.body;

  try {
    const cartItems = await fetchJson(
      `${API_URL}/cart/${userId}/${productId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      }
    );
    //console.log(product);
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(401).end();
  }
}

async function handleDeleteItem(req, res) {
  const { token, userId } = getTokenAndUserID(req, res);

  const { productId } = req.body;

  try {
    const cartItems = await fetchJson(
      `${API_URL}/cart/${userId}/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(401).end();
  }
}

function getTokenAndUserID(req, res) {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).end();
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  return {
    token,
    userId,
  };
}

async function handleCart(req, res) {
  switch (req.method) {
    case "GET":
      return handleGetCart(req, res);
    case "POST":
      return handlePostCart(req, res);
    case "DELETE":
      return handleDeleteItem(req, res);
    default:
      res.status(405).end();
  }
}

export default handleCart;
