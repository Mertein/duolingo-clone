import { auth } from "@clerk/nextjs/server";

const adminIds = [
  "user_2iLEJQAAT493fNv4HI6ZKOL44MZ"
]

export const isAdmin = () => {
  const {userId} = auth();

  if(!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
}