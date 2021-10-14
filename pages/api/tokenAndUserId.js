import jwt from "jsonwebtoken";

function getTokenAndUserID(req, res) {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).end();
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded?.id;

  res.status(200).json({
    token,
    userId,
  });
}

export default getTokenAndUserID;
