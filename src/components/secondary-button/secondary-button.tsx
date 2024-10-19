import React from "react";
import styles from './secondary-button.module.scss';
import { Button, ButtonProps, ConfigProvider } from "antd";

interface SecondaryButtonProps extends ButtonProps {
  children: string|any;
}

const SecondaryButton = (props: SecondaryButtonProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            controlHeight: 40,
            controlHeightLG: 44,
            controlHeightSM: 36,
            borderRadius: 15,
            defaultBg:"rgba(255, 255, 255, 1)",
            defaultColor: "rgba(0,0,0,1)",
            defaultHoverBg: "rgba(82, 196, 26, 1)",
            defaultHoverColor: "rgb(255, 255, 255)",
        },
        },
      }}
    >
      <Button {...props} className={styles.button} size="large">
        {props.children}
      </Button>
    </ConfigProvider>
  );
};

export default SecondaryButton;
