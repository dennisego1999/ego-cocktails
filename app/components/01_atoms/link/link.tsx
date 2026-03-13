import LinkProps from "@/app/components/01_atoms/link/LinkProps";
import NextLink from "next/link";
import Text from "../text/text";

export default function Link({ href, children, ...rest }: LinkProps) {
  return (
    <NextLink className="link" href={href} {...rest}>
      <Text>{children}</Text>
    </NextLink>
  );
}