"use client";
import Link from "next/link";
import React from "react";
import { SlEnergy } from "react-icons/sl";
import classnames from "classnames";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Models", href: "/models" },
    { label: "Graph Editor", href: "/graph-editor" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <nav className="nav">
      <Link
        className={classnames({
          "nav__brand--selected": currentPath === "/",
          nav__brand: true,
        })}
        href="/"
      >
        EnergyKPI
        <span>
          <SlEnergy />
        </span>
      </Link>

      <ul className="nav__list">
        {links.map((link) => (
          <li
            key={link.label}
            className={classnames({
              "nav__item--selected": link.href === currentPath,
              nav__item: true,
            })}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
