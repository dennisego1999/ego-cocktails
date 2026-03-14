import HeadingProps from "./heading-props";

export default function Heading({
  tag: Tag = "h1",
  size = "2",
  className,
  children,
  ...rest
}: HeadingProps) {
  const classes = ["heading", className].filter(Boolean).join(" ");

  return (
    <Tag className={classes} data-heading-size={size} {...rest}>
      {children}
    </Tag>
  );
}
