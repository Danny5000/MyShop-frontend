module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "connect.stripe.com"],
  },
  env: {
    IMG_URL: process.env.IMG_URL,
    API_URL: process.env.API_URL,
  },
};
