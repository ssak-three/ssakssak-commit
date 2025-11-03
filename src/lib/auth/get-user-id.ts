import { getServerSession } from "next-auth";
import authOptions from "./auth-options";

const getUserId = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.userId;

  return userId;
};

export default getUserId;
