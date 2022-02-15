import { GrUpdate } from "react-icons/gr";
import { GiPowerButton } from "react-icons/gi";

export const MenuItems = [
  {
    title: "Sign Out",
    path: "/signout",
    cName: "dropdown-link",
    icon: <GiPowerButton />,
  },
  {
    title: "Update Profile",
    path: "/update-profile",
    cName: "dropdown-link",
    icon: <GrUpdate />,
  },
];

export default MenuItems;
