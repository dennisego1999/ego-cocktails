import LinkProps from "@/app/components/01_atoms/link/LinkProps";
import NextLink from "next/link";

export default function Link({ className, href, children, ...props }: LinkProps) {
  const classes = ["link", "text", className].filter(Boolean).join(" ");

  return (
    <NextLink className={classes} href={href} {...props}>
      {children}
    </NextLink>
  );
}
