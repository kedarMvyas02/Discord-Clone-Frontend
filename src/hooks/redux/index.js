import { useSelector } from "react-redux";

export function GetUser() {
  const temp = useSelector((state) => state.user);
  const user = temp?.user?.data?.userWithLogin;
  return user;
}

export function GetMe() {
  const user = localStorage.getItem("user");
  return user;
}
