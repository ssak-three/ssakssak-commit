import { getServerSession } from "next-auth";
import authOptions from "./auth-options";

const getAccessToken = async () => {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;

  return accessToken;
};

export default getAccessToken;
