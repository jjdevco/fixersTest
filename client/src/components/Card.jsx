import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Card({
  height,
  minHeight,
  maxHeight,
  width,
  minWidth,
  maxWidth,
  display,
  direction,
  justify,
  align,
  background,
  border,
  borderRadius,
  children,
  elevation,
}) {
  return (
    <Container
      height={height}
      minHeight={minHeight}
      maxHeight={maxHeight}
      width={width}
      minWidth={minWidth}
      maxWidth={maxWidth}
      display={display}
      direction={direction}
      justify={justify}
      align={align}
      background={background}
      border={border}
      borderRadius={borderRadius}
      elevation={elevation}
    >
      {children}
    </Container>
  );
}

const Container = styled.div`
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
  width: ${(props) => props.width};
  min-width: ${(props) => props.minWidth};
  max-width: ${(props) => props.maxWidth};
  display: ${(props) => props.display};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  border: ${(props) => props.border}
    ${(props) => props.theme.colors.background.darken};
  border-radius: ${(props) => props.borderRadius}px;
  box-shadow: ${(props) =>
    props.elevation && props.theme.shadow(props.elevation)};
  background: ${(props) => props.theme.colors.background[props.background]};
`;

Card.defaultProps = {
  height: "100%",
  width: "100%",
  display: "flex",
  direction: "row",
  justify: "center",
  align: "center",
  background: "transparent",
};

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  display: PropTypes.string,
  direction: PropTypes.string,
  justify: PropTypes.string,
  align: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.number,
  elevation: PropTypes.number,
  background: PropTypes.oneOfType(["main", "lighten", "darken"]),
};

export default Card;
