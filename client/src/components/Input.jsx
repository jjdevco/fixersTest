import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Input({
  onChange,
  value,
  label,
  type,
  placeholder,
  helperText,
  error,
  success,
  leftIcon,
  rightIcon,
  rightIconAction,
  className,
  readOnly,
}) {
  return (
    <Container className={className}>
      {label && (
        <Label htmlFor={label} error={error} success={success}>
          {label}:
        </Label>
      )}
      <InputContainer>
        {leftIcon && (
          <LeftIcon error={error} success={success}>
            <i className={`fas ${leftIcon}`} />
          </LeftIcon>
        )}
        <InputField
          name={label}
          type={type}
          placeholder={placeholder}
          error={error}
          success={success}
          onChange={onChange}
          value={value}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          readOnly={readOnly}
        />
        {rightIcon && (
          <RightIcon
            onClick={rightIconAction}
            rightIconAction={rightIconAction}
          >
            <i className={`fas ${rightIcon}`} />
          </RightIcon>
        )}
      </InputContainer>
      <HelperText error={error} success={success}>
        {helperText}
      </HelperText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  width: 100%;
`;

const InputField = styled.input`
  appearance: none;
  outline: none;
  width: inherit;
  min-height: 32px;
  min-width: 0;
  padding: 0 ${(props) => (props.rightIcon ? "34px" : "10px")} 0
    ${(props) => (props.leftIcon ? "34px" : "10px")};
  color: ${(props) => {
    if (props.error) return props.theme.colors.danger.main;
    else if (props.success) return props.theme.colors.success.main;
    else return props.theme.colors.text.lighten;
  }};
  background: ${(props) => {
    if (props.error) return props.theme.colors.danger.lighten;
    else if (props.success) return props.theme.colors.success.lighten;
    else return props.theme.colors.background.main;
  }};
  border: 1.5px solid
    ${(props) => {
      if (props.error) return props.theme.colors.danger.main;
      else if (props.success) return props.theme.colors.success.main;
      else return props.theme.colors.background.darken;
    }};
  border-radius: 4px;
  font-size: 0.9rem;
  text-overflow: ellipsis;
  transition: all 160ms ease-out;
  &:focus {
    border-color: ${(props) => {
      if (props.error) return props.theme.colors.danger.darken;
      else if (props.success) return props.theme.colors.success.darken;
      else return props.theme.colors.text.main;
    }};
    color: ${(props) => {
      if (props.error) return props.theme.colors.danger.darken;
      else if (props.success) return props.theme.colors.success.darken;
      else return props.theme.colors.text.main;
    }};
  }
`;

const Label = styled.label`
  margin-bottom: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  color: ${(props) => props.theme.colors.text.main};
`;

const HelperText = styled.span`
  margin-top: 2px;
  margin-left: 6px;
  font-size: 0.7rem;
  font-weight: 300;
  color: ${(props) => {
    if (props.error) return props.theme.colors.danger.main;
    else if (props.success) return props.theme.colors.success.main;
    else return props.theme.colors.text.main;
  }};
`;

const LeftIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  margin-left: 12px;
  color: ${(props) => {
    if (props.error) return props.theme.colors.danger.main;
    else if (props.success) return props.theme.colors.success.main;
    else return props.theme.colors.text.darken;
  }};
`;

const RightIcon = styled.div`
  position: absolute;
  width: 20px;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  margin-right: 10px;
  cursor: ${(props) => (props.rightIconAction ? "pointer" : "default")};
  font-size: 0.85rem;
  transition: all 125ms ease-out;
  color: ${(props) => props.theme.colors.text.darken};
  &:active {
    font-size: ${(props) => (props.rightIconAction ? "0.75rem" : "")};
  }
`;

Input.defaultProps = {
  type: "text",
  error: false,
  success: false,
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  rightIconAction: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default Input;
