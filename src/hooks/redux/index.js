import { useSelector } from "react-redux";

export function GetMe() {
  const temp = useSelector((state) => state.user);
  const user = temp?.user?.data?.userWithLogin;
  return user;
}
