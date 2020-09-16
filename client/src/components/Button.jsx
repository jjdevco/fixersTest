import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Button({
  width,
  height,
  type,
  variant,
  color,
  icon,
  iconPosition,
  disabled,
  onClick,
  children,
  className,
}) {
  return (
    <Container
      type={type}
      width={width}
      height={height}
      variant={variant}
      color={color}
      iconPosition={iconPosition}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {icon && iconPosition === "left" && (
        <Icon variant={variant} color={color} iconPosition={iconPosition}>
          <i className={`fas ${icon}`} />
        </Icon>
      )}
      <>{children}</>
      {icon && iconPosition === "right" && (
        <Icon variant={variant} color={color} iconPosition={iconPosition}>
          <i className={`fas ${icon}`} />
        </Icon>
      )}
    </Container>
  );
}

const Container = styled.button`
  min-height: 28px;
  min-height: ${(props) => props.height};
  width: ${(props) => props.width};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  border: 1px solid
    ${(props) =>
      props.variant === "outlined"
        ? props.theme.colors[props.color].main
        : "transparent"};
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  color: ${(props) =>
    props.variant === "outlined"
      ? props.theme.colors[props.color].main
      : props.color === "default"
      ? props.theme.colors.text.main
      : props.theme.colors.background.lighten};
  background: ${(props) =>
    props.variant === "outlined"
      ? props.theme.colors[props.color].lighten
      : props.color === "default"
      ? props.theme.colors.background.main
      : props.theme.colors[props.color].main};
  &:hover {
    filter: ${(props) =>
      props.variant === "outlined" ? "brightness(90%)" : ""};
    background: ${(props) =>
      props.variant === "outlined"
        ? ""
        : props.color === "default"
        ? props.theme.colors.background.darken
        : props.theme.colors[props.color].darken};
  }
  &:active {
    color: ${(props) =>
      props.variant === "outlined"
        ? props.theme.colors[props.color].darken
        : props.color === "default"
        ? props.theme.colors.text.main
        : props.theme.colors.background.lighten};
    filter: brightness(75%);
  }
  &:disabled {
    filter: brightness(80%);
    background: ${(props) => props.theme.colors.background.main};
    color: ${(props) => props.theme.colors.text.lighten};
    cursor: default;
  }
  transition: all 125ms ease-in-out;
`;

const Icon = styled.div`
  font-size: inherit;
  margin: 0 ${(props) => (props.iconPosition === "left" ? "6px" : 0)} 0
    ${(props) => (props.iconPosition === "right" ? "6px" : 0)};
  border-radius: 50%;
  cursor: ${(props) => (props.rightIconAction ? "pointer" : "default")};
  color: inherit;
  transition: all 125ms ease-out;
`;

Button.defaultProps = {
  type: "button",
  variant: "compressed",
  color: "default",
  iconPosition: "right",
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["compressed", "outlined"]),
  color: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
  ]),
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
