import LinkProps from "@/app/components/01_atoms/link/link-props";
import NextLink from "next/link";

export default function Link({ className, href, children, ...rest }: LinkProps) {
  const classes = ["link", "text", className].filter(Boolean).join(" ");

  return (
    <NextLink className={classes} href={href} {...rest}>
      {children}
    </NextLink>
  );
}
