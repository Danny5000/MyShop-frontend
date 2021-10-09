import ProfilePage from "../../components/PageTemplates/ProfilePage";
import { ApiError } from "../../lib/api";
import { getUserByUserName, getUsers } from "../../lib/users";

export async function getStaticPaths() {
  const users = await getUsers();
  return {
    paths: users.userData.map((user) => ({
      params: { userName: user.userName.toString() },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { userName } }) {
  try {
    const user = await getUserByUserName(userName);
    return {
      props: {
        user,
      },
      revalidate: parseInt(process.env.REVALIDATE_SECONDS),
    };
  } catch (err) {
    if (err instanceof ApiError && err.status == 404) {
      return { notFound: true };
    }
    throw err;
  }
}

function UserPage({ user: { userData } }) {
  return userData.map((element) => (
    <ProfilePage key={element.id} title={element.userName}>
      <div className="flex flex-col">
        <p className="text-lg">Name: {element.name}</p>
        <p className="text-lg mt-2">Email: {element.email}</p>
        <p className="text-lg mt-2">
          Member Since: {element.createdAt.split("T")[0]}
        </p>
      </div>
    </ProfilePage>
  ));
}

export default UserPage;
