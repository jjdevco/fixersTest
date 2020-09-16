import React, { useState, useContext } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import Card from "./Card";
import Container from "./Container";
import Row from "./Row";
import Header from "./Header";
import Title from "./Title";
import Form from "./Form";
import Input from "./Input";
import ImageUploader from "./ImageUploader";
import SaveButton from "./SaveButton";

import api from "../providers/api";

import { Context as AuthContext } from "../state/auth";
import {
  Context as NotificationsContext,
  enqueueSnackbar,
} from "../state/notifications";

function NewClient({ history }) {
  const authContext = useContext(AuthContext);
  const notificationsContext = useContext(NotificationsContext);

  const currentUser = authContext.state.currentUser;
  const notificationsDispatch = notificationsContext.dispatch;

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoFileError, setPhotoFileError] = useState(null);

  const [loading, setLoading] = useState(false);

  const disabled =
    !!firstNameError ||
    !!lastNameError ||
    !!emailError ||
    !!phoneError ||
    !!photoFileError ||
    loading;

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
    emailError && setEmailError(null);
  };
  const handleFirstName = ({ target: { value } }) => {
    setFirstName(value);
    firstNameError && setFirstNameError(null);
  };
  const handleLastName = ({ target: { value } }) => {
    setLastName(value);
    lastNameError && setLastNameError(null);
  };
  const handlePhone = ({ target: { value } }) => {
    setPhone(value);
    phoneError && setPhoneError(null);
  };

  const handleAdd = async (evt) => {
    evt.preventDefault();

    setLoading(true);

    if (!firstName || !lastName || !email || !phone) {
      setLoading(false);
      !firstName && setFirstNameError("First Name is required");
      !lastName && setLastNameError("Last Name is required");
      !email && setEmailError("Email is required");
      !phone && setPhoneError("Phone Number is required");
      setLoading(false);
      return;
    }

    try {
      const form = new FormData();

      form.append("first_name", firstName);
      form.append("last_name", lastName);
      form.append("email", email);
      form.append("phone", phone);

      if (photoFile) form.append("file", photoFile);

      const options = {
        headers: {
          Authorization: `Bearer ${currentUser}`,
        },
      };

      await api.clients.create(form, options);

      notificationsContext.dispatch(
        enqueueSnackbar({
          message: `Client created successfully!`,
          options: {
            variant: "success",
          },
        })
      );
      history.push("/dashboard/clients");
      setLoading(false);
    } catch (error) {
      let message;
      if (error.response && error.response.data.validation) {
        error.response.data.validation.forEach((error) => {
          const { param, msg } = error;
          param === "first_name" && setFirstNameError(msg);
          param === "last_name" && setLastNameError(msg);
          param === "email" && setEmailError(msg);
          param === "phone" && setPhoneError(msg);
        });
      }

      if (error.response && error.response.data.message)
        message = error.response.data.message;
      else message = error.message;

      notificationsDispatch(
        enqueueSnackbar({
          message: message,
          options: {
            variant: "error",
          },
        })
      );

      console.error(error);
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Container>
        <Header>
          <Title>Add New Client</Title>
        </Header>
        <Card background="lighten" borderRadius={14} elevation={2}>
          <Form encType="multipart/form-data">
            <Row>
              <ImageUploader
                text={"Upload Photo"}
                setFile={setPhotoFile}
                setError={setPhotoFileError}
                error={photoFileError}
              />
            </Row>
            <Row>
              <Input
                label="First Name"
                helperText={
                  firstNameError ? firstNameError : "Enter client first name"
                }
                placeholder="First Name"
                value={firstName}
                onChange={handleFirstName}
                error={!!firstNameError}
              />
              <Input
                label="Last Name"
                helperText={
                  lastNameError ? lastNameError : "Enter client last name"
                }
                placeholder="Last Name"
                value={lastName}
                onChange={handleLastName}
                error={!!lastNameError}
              />
            </Row>
            <Row>
              <Input
                label="Email Address"
                helperText={
                  emailError ? emailError : "Enter client email address"
                }
                placeholder="Email Address"
                value={email}
                onChange={handleEmail}
                error={!!emailError}
              />
              <Input
                label="Phone Number"
                helperText={
                  phoneError ? phoneError : "Enter client phone number"
                }
                placeholder="Phone Number"
                value={phone}
                onChange={handlePhone}
                error={!!phoneError}
              />
            </Row>
            <Row>
              <SaveButton
                type="submit"
                color="primary"
                onClick={handleAdd}
                disabled={disabled}
              >
                {loading ? (
                  <i className="fas fa-spinner fa-pulse fa-lg"></i>
                ) : (
                  "Add Now"
                )}
              </SaveButton>
            </Row>
          </Form>
        </Card>
      </Container>
    </DashboardLayout>
  );
}

export default NewClient;
