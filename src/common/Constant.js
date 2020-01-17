import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const isIphoneX =
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812 || height === 896 || width == 896);

const Constant = {
    NavBarHeight: 50,
    ToolbarHeight: Platform.OS === "ios"?(isIphoneX ? 35 : 22):0,
    ScreenWidth: width,
    ScreenHeight: height
};

export default Constant;