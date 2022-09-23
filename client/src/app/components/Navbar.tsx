import { Burger, createStyles, Space, UnstyledButton } from "@mantine/core";
import classNames from "classnames";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const useNavbarItemStyles = createStyles((theme) => ({
  navbarItem: {
    width: "100%",
    height: 48,
    backgroundColor: "#F0F0F0",
    paddingLeft: 32,
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: theme.colors["medium-grey"],
    },
    "&:active": {
      backgroundColor: theme.colors["dark-grey"],
    },
  },
}));

function NavbarItem(
  props: React.PropsWithChildren<{
    onClick: () => void;
  }>
) {
  const { classes } = useNavbarItemStyles();
  return (
    <UnstyledButton className={classes.navbarItem} onClick={props.onClick}>
      {props.children}
    </UnstyledButton>
  );
}

const useStyles = createStyles((theme) => ({
  navbarContainer: {
    opacity: 0,
    transition: "opacity 0.2s",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  navbarContainerOpened: {
    opacity: 1,
  },
  navbar: {
    transform: "translate(-320px, 0)",
    transition: "transform 0.2s",
    backgroundColor: "#F0F0F0",
    width: 240,
    minHeight: "100vh",
  },
  navbarOpened: {
    transform: "translate(0, 0)",
  },
  burger: {
    position: "absolute",
    top: 11,
    left: 11,
  },
  feedbackLink: {
    backgroundColor: theme.colors.blue,
    padding: "5.5px 11px",
    borderRadius: "5px",
    marginLeft: -11,
  },
}));

type Props = React.PropsWithChildren<{}>;

export default function Navbar(props: Props) {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div
        className={classNames(classes.navbarContainer, {
          [classes.navbarContainerOpened]: opened,
        })}
        // onClick{() => setOpened(false)}
      />
      <div
        className={classNames(classes.navbar, {
          [classes.navbarOpened]: opened,
        })}
      >
        <Space h={56} />
        <NavbarItem onClick={() => navigate("/about")}>About</NavbarItem>
        <NavbarItem onClick={() => navigate("/faq")}>FAQ</NavbarItem>
        <NavbarItem onClick={() => navigate("/privacy")}>Privacy</NavbarItem>
        <NavbarItem onClick={() => navigate("/terms")}>Terms</NavbarItem>
        <NavbarItem onClick={() => navigate("/for-business")}>
          For Business
        </NavbarItem>
        <NavbarItem
          onClick={() =>
            window.open("https://github.com/LeastAuthority/winden", "_blank")
          }
        >
          GitHub
        </NavbarItem>
        <NavbarItem onClick={() => navigate("/feedback")}>
          <span className={classes.feedbackLink}>Feedback</span>
        </NavbarItem>
      </div>
      <Burger
        className={classes.burger}
        opened={opened}
        onClick={() => setOpened(!opened)}
      />
    </>
  );
}
