import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Button from "./Button";

import { Context as AuthContext } from "../state/auth";
import {
  Context as NotificationsContext,
  enqueueSnackbar,
  closeSnackbar,
} from "../state/notifications";
import { SIGNOUT_USER } from "../state/types";
import { auth } from "../providers/firebase";

function Navbar() {
  const authContext = useContext(AuthContext);
  const notificationsContext = useContext(NotificationsContext);

  const wrapperRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { push } = useHistory();

  const handleSignOut = async (evt) => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        const key = `logout_${new Date().getTime()}`;
        notificationsContext.dispatch(
          enqueueSnackbar({
            message: `Log Out successfully!`,
            options: {
              variant: "success",
              key,
            },
          })
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await auth().signOut();
        await authContext.dispatch({ type: SIGNOUT_USER });
        if (localStorage.getItem("token")) localStorage.removeItem("token");
        push("/");
        notificationsContext.dispatch(closeSnackbar(key));
      } catch (error) {
        notificationsContext.dispatch(
          enqueueSnackbar({
            message: error.message,
            options: {
              variant: "error",
            },
          })
        );
        console.log(error);
      }
    }
  };

  const handleClickOutside = useCallback((evt) => {
    if (!wrapperRef.current.contains(evt.target)) setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <Container>
      <User ref={wrapperRef} onClick={() => setOpen(true)}>
        <Avatar>
          <i className="fas fa-user" />
        </Avatar>
        <Text>Hello, Andrew</Text>
        <Arrow>
          <i className="fas fa-arrow-down" />
        </Arrow>
        <Menu open={open}>
          {open && (
            <Button
              width="100%"
              variant="outlined"
              color="danger"
              icon="fa-sign-out-alt"
              onClick={() => handleSignOut()}
            >
              Sign Out
            </Button>
          )}
        </Menu>
      </User>
    </Container>
  );
}

const Container = styled.div`
  height: 52px;
  width: 100%;
  background: ${(props) => props.theme.colors.background.lighten};
  box-shadow: ${(props) => props.theme.shadow(2)};
  z-index: 20;
`;

const User = styled.div`
  position: relative;
  height: 52px;
  width: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  margin: ${(props) => props.theme.spacing(0, 20, 0, "auto")};
  cursor: pointer;
`;

const Avatar = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 3px solid ${(props) => props.theme.colors.background.lighten};
  border-radius: 50%;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.background.darken};
  background: ${(props) => props.theme.colors.background.main};
  filter: brightness(85%);
`;

const Text = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  margin: ${(props) => props.theme.spacing(0, 6)};
`;

const Arrow = styled.div`
  height: 10px;
  width: 11px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.colors.text.lighten};
  border-radius: 50%;
  color: ${(props) => props.theme.colors.text.main};
  font-size: 0.4rem;
  background: ${(props) => props.theme.colors.background.main};
`;

const Menu = styled.div`
  position: absolute;
  width: 145px;
  height: auto;
  opacity: ${(props) => (props.open ? 1 : 0)};
  bottom: ${(props) => (props.open ? "-10px" : 0)};
  border: 0.3px solid ${(props) => props.theme.colors.background.main};
  border-radius: 4px;
  padding: ${(props) => props.theme.spacing(5)};
  background: ${(props) => props.theme.colors.background.lighten};
  box-shadow: ${(props) => props.theme.shadow(1)};
  transition: all 200ms ease-in;
`;

export default Navbar;
