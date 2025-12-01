"use client";
import { Menu } from "@/types/Menu";
import { House, ShoppingCart, Tags } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const iconMap: Record<string, React.ElementType> = {
  tags: Tags,
  house: House,
  cart: ShoppingCart,
};
export default function SideDropDown({ menuItem }: { menuItem: Menu }) {
  const [toggler, setToggler] = useState(false);
  const Icon = menuItem.icon ? iconMap[menuItem.icon] : null;
  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname.includes(menuItem.path || "") ||
      menuItem.submenu?.some((sub) => pathname.includes(sub.path || ""))
    ) {
      setToggler(true);
    } else {
      setToggler(false);
    }
  }, [pathname, menuItem]);

  return (
    <>
      <li
        className={`dropdown ${toggler ? "dropdown-open" : ""}`}
        onClick={() => setToggler(!toggler)}>
        <Link href="#">
          {Icon && <Icon fontSize={48} className="menu-icon" />}
          <span>{menuItem.title}</span>
        </Link>
        <ul
          className="sidebar-submenu"
          style={{ display: toggler ? "block" : "none" }}>
          {menuItem.submenu.map((menu, i) => {
            const isActive = pathname === menu.path;

            return (
              <li key={i} className={isActive ? "active-page show open" : ""}>
                <Link
                  href={menu.path}
                  className={isActive ? "active-page" : ""}>
                  {menu.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </li>
    </>
  );
}
