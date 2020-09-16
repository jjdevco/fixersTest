import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

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

function ShowClient({ history }) {
  const authContext = useContext(AuthContext);
  const notificationsContext = useContext(NotificationsContext);

  const { id } = useParams();

  const currentUser = authContext.state.currentUser;
  const notificationsDispatch = notificationsContext.dispatch;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [picture, setPicture] = useState("");

  const [loading, setLoading] = useState(true);

  const options = {
    headers: {
      Authorization: `Bearer ${currentUser}`,
    },
  };

  const handleDelete = async () => {
    try {
      window.confirm("Do you want to delete this client?");
      await api.clients.deleteOne(id, options);
      notificationsDispatch(
        enqueueSnackbar({
          message: "Client delete successfully",
          options: {
            variant: "success",
          },
        })
      );
      history.push("/dashboard/clients");
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
        const cars = await api.cars.getAll(options);
        console.log(cars);
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
    fetch();
  }, [id, currentUser]);

  return (
    <DashboardLayout>
      {loading ? (
        <Loader>
          <i className="fas fa-spinner fa-pulse fa-3x"></i>
        </Loader>
      ) : (
        <Container>
          <Header>
            <Title>Client - {`${firstName} ${lastName}`} </Title>
          </Header>
          <Card background="lighten" borderRadius={14} elevation={2}>
            <Form>
              <Row>
                <ImageUploader src={picture} />
              </Row>
              <Row>
                <Input
                  label="First Name"
                  placeholder="First Name"
                  value={firstName}
                  onChange={() => {}}
                  readOnly
                />
                <Input
                  label="Last Name"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={() => {}}
                  readOnly
                />
              </Row>
              <Row>
                <Input
                  label="Email Address"
                  placeholder="Email Address"
                  value={email}
                  onChange={() => {}}
                  readOnly
                />
                <Input
                  label="Phone Number"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={() => {}}
                  readOnly
                />
              </Row>
              <Row>
                <Buttons>
                  <EditButton
                    color="default"
                    onClick={() =>
                      history.push("/dashboard/clients/edit/" + id, {
                        firstName,
                        lastName,
                        email,
                        phone,
                        picture,
                        fromShow: true,
                      })
                    }
                  >
                    {loading ? (
                      <i className="fas fa-spinner fa-pulse fa-lg"></i>
                    ) : (
                      <i className="fas fa-edit"></i>
                    )}
                  </EditButton>
                  <DeleteButton
                    variant="outlined"
                    color="danger"
                    onClick={handleDelete}
                  >
                    {loading ? (
                      <i className="fas fa-spinner fa-pulse fa-lg"></i>
                    ) : (
                      <i className="fas fa-trash-alt"></i>
                    )}
                  </DeleteButton>
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

const EditButton = styled(Button)`
  height: 40px;
  width: 80px;
  border: 1px solid ${(props) => props.theme.colors.background.darken};
  border-radius: 4px 0 0 4px;
  font-size: 1.05rem;
`;
const DeleteButton = styled(Button)`
  height: 40px;
  width: 80px;
  border: 1px solid ${(props) => props.theme.colors.danger.main};
  border-radius: 0 4px 4px 0;
  font-size: 1.05rem;
`;

export default ShowClient;
