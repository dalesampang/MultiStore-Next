import { ChevronLeft, Menu } from "lucide-react";

export default function AdminNavbar({ onToggle, sidebarOpen }) {
  return (
    <>
      {" "}
      <div className="navbar-header border-b border-neutral-200 dark:border-neutral-600">
        <div className="flex items-center justify-between">
          <div className="col-auto">
            <div className="flex flex-wrap items-center gap-[16px]">
              <button
                type="button"
                className={`sidebar-toggle transition-transform duration-300 ${sidebarOpen ? "active rotate-180" : "rotate-0"}`}
                onClick={onToggle}>
                {sidebarOpen ? <ChevronLeft size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
          <div className="col-auto">
            <button
              data-dropdown-toggle="dropdownProfile"
              className="flex items-center justify-center rounded-full"
              type="button">
              <img
                src="/images/user.png"
                alt="image"
                className="object-fit-cover h-10 w-10 rounded-full"
              />
            </button>
            <div
              id="dropdownProfile"
              className="dropdown-menu-sm z-10 rounded-lg bg-white p-3 shadow-lg dark:bg-neutral-700 hidden"
              data-popper-placement="bottom">
              <div className="mb-4 flex items-center justify-between gap-2 rounded-lg bg-primary-50 px-4 py-3 dark:bg-primary-600/25">
                <div>
                  <h6 className="mb-0 text-lg font-semibold text-neutral-900">
                    Robiul Hasan
                  </h6>
                  <span className="text-neutral-500">Admin</span>
                </div>
              </div>

              <div className="scroll-sm max-h-[400px] overflow-y-auto pe-2">
                <ul className="flex flex-col">
                  <li>
                    <a
                      className="flex items-center gap-4 px-0 py-2 text-black hover:text-primary-600"
                      href="view-profile.html">
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex items-center gap-4 px-0 py-2 text-black hover:text-primary-600"
                      href="email.html">
                      Inbox
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex items-center gap-4 px-0 py-2 text-black hover:text-primary-600"
                      href="company.html">
                      Setting
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex items-center gap-4 px-0 py-2 text-black hover:text-danger-600"
                      href="javascript:void(0)">
                      Log Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
