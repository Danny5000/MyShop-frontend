import ProfilePage from "../../components/PageTemplates/ProfilePage";
import { ApiError } from "../../lib/api";
import { getUsers, getUserByUserName } from "../../lib/users";
import ProductCardProfile from "../../components/ProductCards/ProductCard-Profile";

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
    if ((err instanceof ApiError && err.status == 404) || 500) {
      return { notFound: true };
    }
    throw err;
  }
}

function UserPage({ user: { userData } }) {
  return userData.map((element) => (
    <ProfilePage key={element.userName} title={element.userName}>
      <div className="flex flex-col pb-8">
        <p className="text-lg">Name: {element.name}</p>
        <p className="text-lg mt-2">Email: {element.email}</p>
        <p className="text-lg mt-2">
          Member Since: {element.createdAt.split("T")[0]}
        </p>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-medium pb-2">My Products</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {element.productData.map((product) => (
            <div key={product.id}>
              <ProductCardProfile product={product} />
            </div>
          ))}
        </div>
      </div>
    </ProfilePage>
  ));
}

export default UserPage;
