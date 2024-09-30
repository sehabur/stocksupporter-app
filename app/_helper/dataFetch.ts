export const getUser = async () => {
  const authDataFromStorage: any = localStorage.getItem("userInfo");
  const auth = JSON.parse(authDataFromStorage);

  if (!auth) return;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profile/${auth._id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return { ...data, token: auth.token };
};
