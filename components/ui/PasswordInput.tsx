"use client";

import { forwardRef, useState } from "react";
import Input from "./PrimaryInput";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  inputClassName?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ error, inputClassName, ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <Input
        ref={ref}
        {...props}
        type={show ? "text" : "password"}
        icon="lock"
        endIcon={show ? "visibility_off" : "visibility"}
        onEndIconClick={() => setShow((prev) => !prev)}
        error={error}
        inputClassName={inputClassName}
      />
    );
  },
);

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
