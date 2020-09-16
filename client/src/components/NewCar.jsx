import React, { useState, useEffect, useContext } from "react";
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
import SaveButton from "./SaveButton";

import api from "../providers/api";

import { Context as AuthContext } from "../state/auth";
import {
  Context as NotificationsContext,
  enqueueSnackbar,
} from "../state/notifications";

function NewCar({ history }) {
  const authContext = useContext(AuthContext);
  const notificationsContext = useContext(NotificationsContext);

  const currentUser = authContext.state.currentUser;
  const notificationsDispatch = notificationsContext.dispatch;

  const [clients, setClients] = useState([]);
  const [client, setClient] = useState("");
  const [clientError, setClientError] = useState(null);
  const [brand, setBrand] = useState("");
  const [brandError, setBrandError] = useState(null);
  const [model, setModel] = useState("");
  const [modelError, setModelError] = useState(null);
  const [year, setYear] = useState("");
  const [yearError, setYearError] = useState(null);
  const [color, setColor] = useState(null);
  const [colorError, setColorError] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoFileError, setPhotoFileError] = useState(null);

  const [loading, setLoading] = useState(false);

  const disabled =
    !!modelError ||
    !!yearError ||
    !!brandError ||
    !!colorError ||
    !!photoFileError ||
    loading;

  const handleBrand = ({ target: { value } }) => {
    setBrand(value);
    brandError && setBrandError(null);
  };
  const handleModel = ({ target: { value } }) => {
    setModel(value);
    modelError && setModelError(null);
  };
  const handleYear = ({ target: { value } }) => {
    setYear(value);
    yearError && setYearError(null);
  };
  const handleColor = ({ target: { value } }) => {
    setColor(value);
    colorError && setColorError(null);
  };

  const options = {
    headers: {
      Authorization: `Bearer ${currentUser}`,
    },
  };
  const handleAdd = async (evt) => {
    evt.preventDefault();

    setLoading(true);

    if (!brand || !model || !year || !color) {
      setLoading(false);
      !brand && setModelError("Brand is required");
      !model && setYearError("Model is required");
      !year && setBrandError("Year is required");
      !color && setColorError("Color Number is required");
      setLoading(false);
      return;
    }

    try {
      const form = new FormData();

      form.append("client", client);
      form.append("brand", brand);
      form.append("model", model);
      form.append("year", year);
      form.append("color", color);

      if (photoFile) form.append("file", photoFile);

      const options = {
        headers: {
          Authorization: `Bearer ${currentUser}`,
        },
      };

      await api.cars.create(form, options);

      notificationsContext.dispatch(
        enqueueSnackbar({
          message: `Car created successfully!`,
          options: {
            variant: "success",
          },
        })
      );
      history.push("/dashboard/cars");
      setLoading(false);
    } catch (error) {
      let message;
      if (error.response && error.response.data.validation) {
        error.response.data.validation.forEach((error) => {
          const { param, msg } = error;
          param === "client" && setClientError(msg);
          param === "brand" && setModelError(msg);
          param === "model" && setYearError(msg);
          param === "year" && setBrandError(msg);
          param === "color" && setColorError(msg);
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

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.clients.getAll(options);
        setClients(data);
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
    fetch();
  }, [currentUser]);

  return (
    <DashboardLayout>
      <Container>
        <Header>
          <Title>Add New Car</Title>
        </Header>
        <Card background="lighten" borderRadius={14} elevation={2}>
          <Form encType="multipart/form-data">
            <Row>
              <Column>
                <StyledImageUploader
                  text={"Upload Photo"}
                  setFile={setPhotoFile}
                  setError={setPhotoFileError}
                  error={photoFileError}
                />
                <StyledButton
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
                </StyledButton>
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
                      onChange={({ target: { value } }) => setClient(value)}
                    >
                      {clients.length > 0 &&
                        clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {`${client.first_name} ${client.last_name}`}
                          </option>
                        ))}
                    </Select>
                  </Column>
                </Row>
                <Row>
                  <Input
                    label="Brand"
                    helperText={modelError ? modelError : "Enter the brand"}
                    placeholder="Brand"
                    value={brand}
                    onChange={handleBrand}
                    error={!!brandError}
                  />
                </Row>
                <Row>
                  <Input
                    label="Model"
                    helperText={yearError ? yearError : "Enter the model"}
                    placeholder="Model"
                    value={model}
                    onChange={handleModel}
                    error={!!modelError}
                  />
                </Row>
                <Row>
                  <Input
                    label="Year"
                    helperText={
                      brandError ? brandError : "Enter client the year"
                    }
                    placeholder="Year"
                    value={year}
                    onChange={handleYear}
                    error={!!yearError}
                  />
                </Row>
                <Row>
                  <Input
                    label="Color"
                    helperText={colorError ? colorError : "Enter the color"}
                    placeholder="Color"
                    value={color}
                    onChange={handleColor}
                    error={!!colorError}
                  />
                </Row>
              </Column>
            </Row>
          </Form>
        </Card>
      </Container>
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

const StyledButton = styled(SaveButton)`
  width: 100%;
  margin-top: ${(props) => props.theme.spacing(30)};
`;

const Select = styled.select`
  width: 100%;
  margin-bottom: 10px;
  height: 30px;
`;

export default NewCar;
