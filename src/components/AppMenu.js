import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const AppMenu = () => {
  return (
    <Menu>
      <Menu.Item as={Link} to="/">
        Home Page
      </Menu.Item>
      <Menu.Item as={Link} to="/about">
        About
      </Menu.Item>
      <Menu.Item as={Link} to="/add">
        Add
      </Menu.Item>
    </Menu>
  );
};

export default AppMenu;
