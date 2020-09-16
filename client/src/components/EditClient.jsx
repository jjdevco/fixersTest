import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DashboardLayout from "../layouts/DashboardLayout";

import Card from "./Card";
import Container from "./Container";
import Row from "./Row";
import Header from "./Header";
import Title from "./Title";
import Form from "./Form";
import Input from "./Input";
import ImageUploader from "./ImageUploader";
import Button from "./Button";

import api from "../providers/api";

import { Context as AuthContext } from "../state/auth";
import {
  Context as NotificationsContext,
  enqueueSnackbar,
} from "../state/notifications";

function EditClient({ history }) {
  const params = useParams();
  const id = params.id;
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

  const [saving, setSaving] = useState(false);

  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(true);

  const disabled = saving;

  const options = {
    headers: {
      Authorization: `Bearer ${currentUser}`,
    },
  };

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

  const handleSave = async (evt) => {
    evt.preventDefault();

    setSaving(true);

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

      await api.clients.updateOne(id, form, options);

      notificationsContext.dispatch(
        enqueueSnackbar({
          message: `Client updated successfully!`,
          options: {
            variant: "success",
          },
        })
      );
      history.push("/dashboard/clients");
      setSaving(false);
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
      setSaving(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.clients.getOne(id, options);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
        setPhone(data.phone);

        if (data.picture) setPicture(data.picture);

        setLoading(false);
      } catch (error) {
        let message;
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
    if (params.fromShow) {
      setFirstName(params.firstName);
      setLastName(params.lastName);
      setEmail(params.email);
      setPhone(params.phone);
    } else fetch();
  }, [id, currentUser, params]);

  return (
    <DashboardLayout>
      {loading ? (
        <Loader>
          <i className="fas fa-spinner fa-pulse fa-3x"></i>
        </Loader>
      ) : (
        <Container>
          <Header>
            <Title>Edit Client </Title>
          </Header>
          <Card background="lighten" borderRadius={14} elevation={2}>
            <Form encType="multipart/form-data">
              <Row>
                <ImageUploader
                  text={"Change Photo"}
                  setFile={setPhotoFile}
                  setError={setPhotoFileError}
                  error={photoFileError}
                  src={picture}
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
                <Buttons>
                  <CancelButton
                    color="danger"
                    disabled={disabled}
                    onClick={() => history.push("/dashboard/clients")}
                  >
                    {saving ? (
                      <i className="fas fa-spinner fa-pulse fa-lg"></i>
                    ) : (
                      "Cancel"
                    )}
                  </CancelButton>
                  <SaveButton
                    color="success"
                    disabled={disabled}
                    onClick={handleSave}
                  >
                    {saving ? (
                      <i className="fas fa-spinner fa-pulse fa-lg"></i>
                    ) : (
                      "Save"
                    )}
                  </SaveButton>
                </Buttons>
              </Row>
            </Form>
          </Card>
        </Container>
      )}
    </DashboardLayout>
  );
}

const Loader = styled.div`
  height: inherit;
  width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.text.lighten};
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justidy-content: center;
  align-items: center;
`;

const CancelButton = styled(Button)`
  height: 40px;
  width: 80px;
  border-radius: 4px 0 0 4px;
  font-size: 1.05rem;
`;

const SaveButton = styled(Button)`
  height: 40px;
  width: 80px;
  border-radius: 0 4px 4px 0;
  font-size: 1.05rem;
`;

export default EditClient;
