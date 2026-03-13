import ISectionProps from "@/app/contracts/ISectionProps";

export default function Section({
  tag: Tag = "section",
  align = null,
  justify = null,
  size = 10,
  flexDirection = "column",
  gutter = null,
  gutterSize = null,
  padding = null,
  paddingSize = null,
  theme = null,
  gap = null,
  wrap = false,
  className,
  children,
}: ISectionProps) {
  const Component = Tag as React.ElementType;

  return (
    <Component
      className={`section${className ? ` ${className}` : ""}`}
      data-align={align}
      data-justify={justify}
      data-size={size}
      data-flex-direction={flexDirection}
      data-gutter={gutter}
      data-gutter-size={gutterSize}
      data-padding={padding}
      data-padding-size={paddingSize}
      data-theme={theme}
      data-gap={gap}
      data-wrap={wrap}
    >
      {children}
    </Component>
  );
}