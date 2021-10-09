import { fetchJson } from "../lib/api";

const { API_URL } = process.env;

export async function getUser(id) {
  const user = await fetchJson(`${API_URL}/users/${id}`);
  return user;
}

export async function getUserByUserName(userName) {
  const user = await fetchJson(`${API_URL}/users/${userName}`);
  return user;
}

export async function getUsers() {
  const users = await fetchJson(`${API_URL}/users`);
  return users;
}
