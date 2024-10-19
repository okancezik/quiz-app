import React from "react";
import { Button, ButtonProps, ConfigProvider } from "antd";

interface PrimaryButtonProps extends ButtonProps {
  children: string;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            controlHeight: 40,
            controlHeightLG: 44,
            controlHeightSM: 36,
            borderRadius: 15,
            defaultBg: "rgb(45, 72, 92)",
            defaultColor: "rgba(255, 255, 255, 0.88)",
            defaultBorderColor: "rgb(40, 52, 82)",
            defaultHoverBg: "rgb(85, 98, 131)",
            defaultHoverBorderColor: "rgb(76, 91, 126)",
            defaultHoverColor: "rgb(255, 255, 255)",
          },
        },
      }}
    >
      <Button {...props} className="button" size="large">
        {props.children}
      </Button>
    </ConfigProvider>
  );
};

export default PrimaryButton;
