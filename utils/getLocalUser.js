export default function getLocalUser() {
  let localUser = "";

  if (typeof window !== "undefined") {
    localUser = localStorage.getItem("user");
  }

  return localUser;
}
