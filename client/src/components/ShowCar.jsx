import React, { useState, useEffect, useContext } from "react";
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
import Button from "./Button";
import ImageUploader from "./ImageUploader";

import api from "../providers/api";

import { Context as AuthContext } from "../state/auth";
import {
  Context as NotificationsContext,
  enqueueSnackbar,
} from "../state/notifications";

function ShowCar({ history }) {
  const authContext = useContext(AuthContext);
  const notificationsContext = useContext(NotificationsContext);

  const currentUser = authContext.state.currentUser;
  const notificationsDispatch = notificationsContext.dispatch;

  const { id } = useParams();

  const [client, setClient] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const [loading, setLoading] = useState(true);

  const disabled = loading;

  const handleBrand = () => {};
  const handleModel = () => {};
  const handleYear = () => {};
  const handleColor = () => {};

  const options = {
    headers: {
      Authorization: `Bearer ${currentUser}`,
    },
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.clients.getOne(id, options);
        setClient(data.client);
        setModel(data.model);
        setBrand(data.brand);
        setColor(data.color);
        setYear(data.year);
        setPhotoFile(data.picture);
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
  }, [currentUser]);

  return (
    <DashboardLayout>
      {loading ? (
        <Loader>
          <i className="fas fa-spinner fa-pulse fa-3x"></i>
        </Loader>
      ) : (
        <Container>
          <Header>
            <Title>Car Detail</Title>
          </Header>
          <Card background="lighten" borderRadius={14} elevation={2}>
            <Form encType="multipart/form-data">
              <Row>
                <Column>
                  <StyledImageUploader src={photoFile} setFile={setPhotoFile} />
                  <Buttons>
                    <EditButton
                      color="default"
                      onClick={() =>
                        history.push("/dashboard/cars/edit/" + id, {
                          client,
                          brand,
                          model,
                          year,
                          color,
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
                      // onClick={handleDelete}
                    >
                      {loading ? (
                        <i className="fas fa-spinner fa-pulse fa-lg"></i>
                      ) : (
                        <i className="fas fa-trash-alt"></i>
                      )}
                    </DeleteButton>
                  </Buttons>
                </Column>

                <Column>
                  <Row>
                    <Column>
                      <label htmlFor="clients">Choose a client:</label>
                      <br />
                      <br />

                      <Select
                        name="clients"
                        id="clients"
                        value={client}
                      ></Select>
                    </Column>
                  </Row>
                  <Row>
                    <Input
                      label="Brand"
                      placeholder="Brand"
                      value={brand}
                      onChange={handleBrand}
                    />
                  </Row>
                  <Row>
                    <Input
                      label="Model"
                      placeholder="Model"
                      value={model}
                      onChange={handleModel}
                    />
                  </Row>
                  <Row>
                    <Input
                      label="Year"
                      placeholder="Year"
                      value={year}
                      onChange={handleYear}
                    />
                  </Row>
                  <Row>
                    <Input
                      label="Color"
                      placeholder="Color"
                      value={color}
                      onChange={handleColor}
                    />
                  </Row>
                </Column>
              </Row>
            </Form>
          </Card>
        </Container>
      )}
    </DashboardLayout>
  );
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-evenly;
`;

const StyledImageUploader = styled(ImageUploader)`
  height: 200px;
  width: 200px;
  font-size: 4rem;
`;

const Select = styled.select`
  width: 100%;
  margin-bottom: 10px;
  height: 30px;
`;

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

export default ShowCar;
