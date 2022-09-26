import { Burger, createStyles, Space, UnstyledButton } from "@mantine/core";
import classNames from "classnames";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const useNavbarItemStyles = createStyles((theme) => ({
  navbarItem: {
    height: 48,
    backgroundColor: "#F0F0F0",
    padding: "0 56px",
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

const useStyles = createStyles((theme, _params, getRef) => ({
  navbarOverlay: {
    zIndex: -9001,
    opacity: 0,
    transition: "opacity 0.2s, z-index 0.2s step-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    [`&.${getRef("navbarOverlayOpened")}`]: {
      opacity: 1,
      zIndex: 9001,
      transition: "opacity 0.2s, z-index 0.2s step-start",
    },
  },
  navbarOverlayOpened: {
    ref: getRef("navbarOverlayOpened"),
  },
  navbarContainer: {
    zIndex: -9001,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    transition: "z-index 0.2s step-end",
    [`&.${getRef("navbarContainerOpened")}`]: {
      zIndex: 9001,
      transition: "z-index 0.2s step-start",
    },
  },
  navbarContainerOpened: {
    ref: getRef("navbarContainerOpened"),
  },
  navbar: {
    transform: "translate(-100%, 0)",
    transition: "transform 0.2s",
    height: "100%",
    backgroundColor: "#F0F0F0",
    display: "inline-flex",
    flexDirection: "column",
  },
  navbarOpened: {
    transform: "translate(0, 0)",
  },
  burger: {
    zIndex: 9001,
    position: "absolute",
    top: 19,
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
        className={classNames(classes.navbarOverlay, {
          [classes.navbarOverlayOpened]: opened,
        })}
        onClick={() => setOpened(false)}
      />
      <div
        className={classNames(classes.navbarContainer, {
          [classes.navbarContainerOpened]: opened,
        })}
      >
        <div
          className={classNames(classes.navbar, {
            [classes.navbarOpened]: opened,
          })}
        >
          <Space h={56} />
          <NavbarItem
            onClick={() => {
              navigate("/about");
              setOpened(false);
            }}
          >
            About
          </NavbarItem>
          <NavbarItem
            onClick={() => {
              navigate("/faq");
              setOpened(false);
            }}
          >
            FAQ
          </NavbarItem>
          <NavbarItem
            onClick={() => {
              navigate("/privacy");
              setOpened(false);
            }}
          >
            Privacy
          </NavbarItem>
          <NavbarItem
            onClick={() => {
              navigate("/terms");
              setOpened(false);
            }}
          >
            Terms
          </NavbarItem>
          <NavbarItem
            onClick={() => {
              navigate("/for-business");
              setOpened(false);
            }}
          >
            For Business
          </NavbarItem>
          <NavbarItem
            onClick={() => {
              window.open("https://github.com/LeastAuthority/winden", "_blank");
              setOpened(false);
            }}
          >
            GitHub
          </NavbarItem>
          <NavbarItem
            onClick={() => {
              navigate("/feedback");
              setOpened(false);
            }}
          >
            <span className={classes.feedbackLink}>Feedback</span>
          </NavbarItem>
        </div>
      </div>
      <Burger
        className={classes.burger}
        opened={opened}
        onClick={() => setOpened(!opened)}
      />
    </>
  );
}
