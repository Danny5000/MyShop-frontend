import Link from "next/link";
import { useUser, useSignOut } from "../../hooks/user";
import { useRouter } from "next/router";
import NavDropDown from "./NavDropDown";

function NavBar() {
  const user = useUser();

  const router = useRouter();
  const signOut = useSignOut();

  const handleSignOut = () => {
    signOut();
    router.push("/sign-in");
  };

  return (
    <nav className="px-2 py-1 bg-gray-200">
      <ul className="flex  gap-2 justify-between text-sm items-center">
        <li className="text-lg font-extrabold">
          <Link href="/">
            <a>MyShop</a>
          </Link>
        </li>
        <div className="flex justify-end mr-2 space-x-6 items-center">
          {user ? (
            <>
              <li>
                <Link href="/add-product">
                  <a>Sell a Product</a>
                </Link>
              </li>
              <li>
                <Link href="/cart">
                  <a>Cart</a>
                </Link>
              </li>
              <li>
                <NavDropDown user={user} />
              </li>
              <li>
                <button onClick={handleSignOut}>Sign Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/sign-in">
                  <a>Sign In</a>
                </Link>
              </li>
              <li>
                <Link href="/sign-up">
                  <a>Register</a>
                </Link>
              </li>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
