import ILinkProps from "@/app/contracts/ILinkProps";
import NextLink from "next/link";
import Text from "../text/text";

export default function Link({ href, children, ...rest }: ILinkProps) {
  return (
    <NextLink className="link" href={href} {...rest}>
      <Text>{children}</Text>
    </NextLink>
  );
}