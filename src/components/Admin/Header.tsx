"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { menuData } from "./menuData";
import Dropdown from "../Header/Dropdown";
export default function AdminHeader() {
  const [stickyMenu, setStickyMenu] = useState(false);
  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });

  return (
    <nav>
      <ul className="flex xl:items-center flex-col xl:flex-row gap-5 xl:gap-6">
        {menuData.map((menuItem, i) =>
          menuItem.submenu ? (
            <Dropdown key={i} menuItem={menuItem} stickyMenu={stickyMenu} />
          ) : (
            <li
              key={i}
              className="group relative before:w-0 before:h-[3px] before:bg-blue before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full ">
              <Link
                href={menuItem.path}
                className={`hover:text-blue text-custom-sm font-medium text-dark flex ${
                  stickyMenu ? "xl:py-4" : "xl:py-6"
                }`}>
                {menuItem.title}
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
