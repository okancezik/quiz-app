import React from "react";
import { Button, ButtonProps, ConfigProvider } from "antd";

interface DangerbuttonProps extends ButtonProps {
  children: string;
}

const Dangerbutton = (props: DangerbuttonProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            controlHeight: 40,
            controlHeightLG: 44,
            controlHeightSM: 36,
            borderRadius: 15,
            defaultBg: "rgb(228, 10, 10)",
            defaultColor: "rgba(255, 255, 255, 0.88)",
            defaultHoverBg: "red",
            defaultHoverColor: "rgb(255, 255, 255)",
          },
        },
      }}
    >
      <Button {...props} size="middle">
        {props.children}
      </Button>
    </ConfigProvider>
  );
};

export default Dangerbutton;
