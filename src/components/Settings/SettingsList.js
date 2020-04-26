import React from "react";
import { NavLink } from "react-router-dom";

export default function SettingsList() {
  return (
    <>
      <NavLink to="/settings/organization">Organization</NavLink>
      <NavLink to="/settings/api">API</NavLink>
    </>
  );
}
