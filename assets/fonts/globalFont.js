import { Text } from "react-native";

export const overrideTextFontFamily = () => {
  const oldRender = Text.render;
  Text.render = function (...args) {
    const origin = oldRender.call(this, ...args);
    return {
      ...origin,
      props: {
        ...origin.props,
        style: [{ fontFamily: "Pretendard-Regular" }, origin.props.style],
      },
    };
  };
};
