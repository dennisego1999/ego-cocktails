import Image from "next/image";
import VisualProps from "./visual-props";

export default function Visual({ src, alt, fit = "cover", ...rest }: VisualProps) {
  return (
    <figure className="visual" data-fit={fit} {...rest}>
      <Image className="visual__image" src={src} alt={alt} width={1920} height={1080} />
    </figure>
  );
}
