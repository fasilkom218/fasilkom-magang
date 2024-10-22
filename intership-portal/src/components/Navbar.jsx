import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import React, { useEffect } from "react";
import { Bars3Icon, XMarkIcon, BellIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import logo from "../assets/img/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { PiShowerFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { logoutMhs, refreshToken } from "../redux/Action/LoginMhsAction";
import { reset } from "../redux/Slice/loginMhsSlice"
import { toast } from "react-toastify";
import { resetJob } from "../redux/Slice/jobMhsSlice";
import { resetInfo } from "../redux/Slice/infoMhsSlice";
import { resetLogbook } from "../redux/Slice/logbookMhsSlice";
import blank from '../assets/img/blank.png';
import { refreshTokenUser } from "../redux/Action/LoginAction";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Dashboard", to: "/dashboard" },
  { name: "Internship", to: "/internship" },
  { name: "Information", to: "/information" },
  { name: "Contact", to: "/contact" },
];

const roles = [
  {
    role: "admin",
    to: "/admin-dashboard",
  },
  {
    role: "mitra",
    to: "/mitra-dashboard",
  },
  {
    role: "dospem",
    to: "/dospem-dashboard",
  },
  {
    role: "kaprodi",
    to: "/kaprodi-dashboard",
  },
  {
    role: "tim-magang",
    to: "/company-dashboard",
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ show, styling = "shadow-lg" }) => {
  const location = useLocation()
  const { user: auth } = useSelector(state => state.auth)
  const { user } = useSelector(state => state.loginMhs)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const rolesItem = roles.find(roleItem => roleItem.role === auth?.role)
  const isActive = location.pathname === rolesItem?.to

  const handleLogout = () => {
    dispatch(logoutMhs())
    dispatch(reset())
    dispatch(resetJob())
    dispatch(resetInfo())
    dispatch(resetLogbook())
    toast.success("Logout success")
    navigate("/")
  }

  useEffect(() => {
    dispatch(refreshToken())
    dispatch(refreshTokenUser())
    const handleScroll = () => {
      const navbar = document.getElementById("navbar")
      if (window.scrollY > 0) {
        navbar.classList.add("navbar-shadow")
      } else {
        navbar.classList.remove("navbar-shadow")
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <Disclosure as="nav" className={`bg-white sticky top-0 z-10 ${show ? "" : styling}`} id={show}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <div className="flex flex-shrink-0 items-center text-2xl font-extrabold ml-1">
              Fasilkom.
            </div>
            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-4">
                {navigation.map((item, index) => {
                  const isActive = location.pathname === item.to
                  return (
                    <a
                      href={item.to}
                      key={index}
                      aria-current={isActive ? "Page" : undefined}
                      className={`${isActive
                        ? "bg-black text-white"
                        : "text-gray-900 hover:bg-gray-700 hover:text-white"
                        } rounded-md px-3 py-2 text-sm font-semibold`}
                    >
                      {item.name}
                    </a>
                  )
                }
                )}
                {auth && rolesItem && (
                  <a
                    href={rolesItem.to}
                    className={`${isActive
                      ? "bg-black text-white"
                      : "text-gray-900 hover:bg-gray-700 hover:text-white"
                      } rounded-md px-3 py-2 text-sm font-semibold`}
                  >
                    Dashboard <span className="capitalize">{rolesItem.role}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-2">
            {user && user.token !== '' ? (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      src={user.profile_pict === null ? blank : user.profile_pict}
                      alt=""
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-in-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <a
                      to={"/dashboard/profile"}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 cursor-pointer"
                    >
                      Sign Out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <Link to={'/started'}>
                <button className='px-4 xl:px-6 py-2 bg-black font-semibold text-white flex gap-2 rounded-lg'>
                  <p className="hidden lg:block">Get Started</p>
                  <p className="lg:hidden">Started</p>
                  <ArrowRightIcon className='hidden lg:block w-5 h-5 self-center' />
                </button>
              </Link>
            )}

          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item, index) => {
            return (
              <a
                href={item.to}
                key={index}
                aria-current={item.current ? "page" : undefined}
                className={`${isActive
                  ? "bg-black text-white"
                  : "text-gray-900 hover:bg-gray-700 hover:text-white"
                  } block rounded-md px-3 py-2 text-sm font-semibold`}
              >
                {item.name}
              </a>
            )
          }
          )}
          {auth && rolesItem && (
            <a
              href={rolesItem.to}
              className={`${isActive
                ? "bg-black text-white"
                : "text-gray-900 hover:bg-gray-700 hover:text-white"
                } block rounded-md px-3 py-2 text-sm font-semibold`}
            >
              Dashboard <span className="capitalize">{rolesItem.role}</span>
            </a>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
