import { cookies } from "next/headers";

export async function loggedUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("userToken");

  if (token) {
    return true;
  } else {
    return false;
  }
}
