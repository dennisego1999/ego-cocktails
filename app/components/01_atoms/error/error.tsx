import Text from "../text/text";
import ErrorProps from "./error-props";

export default function Error({ children }: ErrorProps) {
  return <Text className="error">{children}</Text>;
}
