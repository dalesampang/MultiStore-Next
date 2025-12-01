"use client";
import { House, ShoppingCart, Tags } from "lucide-react";
import { adminMenuData } from "../Header/adminMenuData";
import SideDropDown from "./SideDropDown";
import Link from "next/link";
import { usePathname } from "next/navigation";
const iconMap: Record<string, React.ElementType> = {
  tags: Tags,
  house: House,
  cart: ShoppingCart,
};

export default function SideBar({ open }) {
  const pathname = usePathname();
  return (
    <>
      <aside
        className={`sidebar transition-transform duration-300 ${open ? "active translate-x-0" : "translate-x-64"}`}>
        {/* <button type="button" class="sidebar-close-btn !mt-4">
            <iconify-icon icon="radix-icons:cross-2"></iconify-icon>
        </button> */}
        <div>
          <a href="/admin" className="sidebar-logo">
            <img
              src="/antipara-manila.svg"
              alt="site logo"
              className="light-logo"
            />
            <img
              src="/antipara-manila.svg"
              alt="site logo"
              className="logo-icon"
            />
          </a>
        </div>
        <div className="sidebar-menu-area">
          <ul className="sidebar-menu" id="sidebar-menu">
            {adminMenuData.map((menu, i) => {
              const Icon = menu.icon ? iconMap[menu.icon] : null;
              const isActive = pathname === menu.path;

              return menu.submenu ? (
                <SideDropDown menuItem={menu} key={i} />
              ) : (
                <li key={i} className={isActive ? "active-page show open" : ""}>
                  <Link
                    href={menu.path}
                    className={isActive ? "active-page" : ""}>
                    {Icon && <Icon fontSize={48} className="menu-icon" />}
                    <span>{menu.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
