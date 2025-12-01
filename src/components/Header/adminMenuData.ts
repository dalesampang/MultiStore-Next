import { Menu } from "@/types/Menu";
export const adminMenuData: Menu[] = [
  {
    id: 1,
    title: "Dashboard",
    newTab: false,
    path: "/admin",
    icon: "house",
  },
  {
    id: 6,
    title: "Products",
    newTab: false,
    path: "/admin/products",
    icon: "cart",
    submenu: [
      {
        id: 61,
        title: "All Products",
        newTab: false,
        path: "/admin/products",
      },
      {
        id: 62,
        title: "Add Product",
        newTab: false,
        path: "/admin/products/add",
      },
    ],
  },
  {
    id: 1,
    title: "Categories",
    newTab: false,
    path: "/admin/categories",
    icon: "tags",
  },
];
