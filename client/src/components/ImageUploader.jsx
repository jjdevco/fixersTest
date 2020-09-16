import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function ImageUploader({ height, width, src, text, setFile, setError, error }) {
  const inputRef = useRef(null);
  const [name, setName] = useState(text);
  const [innerSrc, setInnerSrc] = useState(null);

  const imageUrl = innerSrc ? innerSrc : src;

  const handleFile = ({ target: { files } }) => {
    const { type, size } = files[0];
    const validFormats = ["image/jpeg", "image/png"];

    setError(null);
    setName(null);

    if (innerSrc) URL.revokeObjectURL(innerSrc);

    if (size > 5 * 1024 * 1024) {
      return setError(
        `Max. size 5 MB. This file size is: ${(size / 1024 / 1024).toFixed(
          0
        )} MB`
      );
    } else if (validFormats.indexOf(type) === -1) {
      return setError(
        `Unsupported media type. The file must be "image/jpeg" or "image/png"`
      );
    } else {
      setName(files[0].name);
      setInnerSrc(URL.createObjectURL(files[0]));
      setFile(files[0]);
    }
  };

  useEffect(() => {
    return () => {
      if (innerSrc) URL.revokeObjectURL(innerSrc);
    };
  });

  return (
    <Container>
      <Media height={height} width={width} imageUrl={imageUrl} error={error}>
        {imageUrl && !error ? (
          <Picture src={imageUrl} alt="client-picture" />
        ) : (
          <i className={error ? "fas fa-times" : "fas fa-camera"} />
        )}
      </Media>
      <Text error={error} onClick={() => inputRef.current.click()}>
        <>{error ? error : name}</>
        <Input
          ref={inputRef}
          id="image-uploader"
          type="file"
          onChange={handleFile}
        />
      </Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Media = styled.div`
  height: ${(props) => (props.height ? props.height : "70px")};
  width: ${(props) => (props.width ? props.width : "70px")};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 3px solid ${(props) => props.theme.colors.background.lighten};
  border-radius: 50%;
  font-size: 1.8rem;
  color: ${(props) =>
    props.error
      ? props.theme.colors.danger.main
      : props.theme.colors.text.main};
  background: ${(props) => props.theme.colors.background.main};
  filter: ${(props) => (props.imageUrl ? "" : "brightness(85%)")};
`;

const Picture = styled.img`
  height: inherit;
  width: inherit;
  object-fit: contain;
  border-radius: 50%;
`;

const Text = styled.div`
  max-width: 300px;
  margin-top: ${(props) => props.theme.spacing(10)};
  font-size: 0.8rem;
  color: ${(props) =>
    props.error
      ? props.theme.colors.danger.main
      : props.theme.colors.primary.main};
  text-align: center;
  cursor: pointer;
  :hover {
    filter: brightness(85%);
  }
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;
  z-index: -1;
`;

ImageUploader.defaultProps = {
  src: "",
};

ImageUploader.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.string,
  src: PropTypes.string,
  error: PropTypes.string,
  setFile: PropTypes.func,
  setError: PropTypes.func,
};

export default ImageUploader;
