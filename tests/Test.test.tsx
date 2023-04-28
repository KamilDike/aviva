import { render } from "@testing-library/react-native";
import Test from "../src/Test";

describe("<App />", () => {
  it("has 1 child", () => {
    render(Test());
  });
});
