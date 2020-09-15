import React, { useState, useContext } from "react";
import styled from "styled-components";

import Card from "./Card";
import Input from "./Input";
import Button from "./Button";

import { auth } from "../providers/firebase";
import { Context } from "../state/auth";
import { LOGIN_USER } from "../state/types";

function Login({ history }) {
  const { dispatch } = useContext(Context);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const disabled = !!emailError || !!passwordError || loading;

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
    emailError && setEmailError(null);
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
    passwordError && setPasswordError(null);
  };

  const handleLogin = async (evt) => {
    evt.preventDefault();

    setLoading(true);

    if (!email) {
      setLoading(false);
      setEmailError("Email is required");
      return;
    }
    if (!password) {
      setLoading(false);
      setPasswordError("Password is required");
      return;
    }

    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);
      const token = user.xa;

      if (remember) localStorage.setItem("token", token);

      await dispatch({ type: LOGIN_USER, payload: token });

      history.push("/dashboard");
    } catch (error) {
      if (error.code && error.code.startsWith("auth/")) {
        if (error.code !== "auth/wrong-password") {
          setEmailError(error.message);
        } else {
          setPasswordError(error.message);
        }
      } else console.log(error);
    }

    setLoading(false);
  };

  return (
    <Container>
      <StyledCard
        maxHeight="500px"
        maxWidth="400px"
        direction="column"
        justify="space-evenly"
        borderRadius={14}
        border="3px solid"
        background="lighten"
        elevation={12}
      >
        <header>
          <Title>Login to Account</Title>
          <SubTitle>Please enter your email and password to continue</SubTitle>
        </header>
        <Form>
          <Input
            label="email address"
            type="text"
            placeholder="Email"
            helperText={emailError ? emailError : "Enter your email address"}
            leftIcon="fa-at"
            value={email}
            onChange={handleEmail}
            error={!!emailError}
          />

          <br />
          <Input
            label="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            helperText={passwordError ? passwordError : "Enter your password"}
            leftIcon="fa-key"
            rightIcon={showPassword ? "fa-eye-slash" : "fa-eye"}
            rightIconAction={() =>
              setShowPassword((showPassword) => !showPassword)
            }
            value={password}
            onChange={handlePassword}
            error={!!passwordError}
          />
          <Remember>
            <Checkbox
              type="checkbox"
              value={remember}
              onChange={() => setRemember((remember) => !remember)}
            />

            <span>Remember me?</span>
          </Remember>
        </Form>
        <StyledButton
          type="submit"
          width="100%"
          color="primary"
          variant="compressed"
          onClick={handleLogin}
          disabled={disabled}
        >
          {loading ? (
            <i className="fas fa-spinner fa-pulse fa-lg"></i>
          ) : (
            "Login"
          )}
        </StyledButton>
      </StyledCard>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.primary.darken};
`;

const StyledCard = styled(Card)`
  padding: ${(props) => props.theme.spacing(20, 40)};
  margin: ${(props) => props.theme.spacing(30)};
`;

const Title = styled.h1`
  margin: ${(props) => props.theme.spacing(2)};
  text-align: center;
`;

const SubTitle = styled.h3`
  margin: ${(props) => props.theme.spacing(2)};
  text-align: center;
  font-size: 0.9rem;
  font-weight: 400;
`;

const Form = styled.form`
  align-self: start;
  width: 100%;
`;

const Remember = styled.div`
  display: flex;
  align-items: start;
  font-size: 0.9rem;
  margin: ${(props) => props.theme.spacing(10, 0, 0, 0)};
  color: ${(props) => props.theme.colors.text.main};
`;

const Checkbox = styled.input`
  margin: ${(props) => props.theme.spacing(0, 5, 0, 0)};
  height: 20px;
  width: 20px;
`;
const StyledButton = styled(Button)`
  font-size: 1rem;
  font-weight: 600;
`;

export default Login;
