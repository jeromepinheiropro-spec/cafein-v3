import React from "react";
import { Link as RLink, NavLink as RNavLink } from "react-router-dom";
import { useLocalize } from "./lang.jsx";

/*
  Link / NavLink « conscients de la langue ».
  Ils préfixent automatiquement la cible avec /en quand on navigue en anglais,
  pour que la navigation reste dans la bonne langue sans toucher chaque page.
  forwardRef indispensable : framer-motion (motion.create(Link)) passe un ref.
*/

export const Link = React.forwardRef(function Link({ to, ...rest }, ref) {
  const localize = useLocalize();
  return <RLink ref={ref} to={typeof to === "string" ? localize(to) : to} {...rest} />;
});

export const NavLink = React.forwardRef(function NavLink({ to, ...rest }, ref) {
  const localize = useLocalize();
  return <RNavLink ref={ref} to={typeof to === "string" ? localize(to) : to} {...rest} />;
});
