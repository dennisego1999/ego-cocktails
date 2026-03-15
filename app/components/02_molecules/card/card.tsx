import Section from "../../00_fundaments/section/section";
import Link from "../../01_atoms/link/link";
import CardProps from "./card-props";

export default function Card({ href, header, content, footer }: CardProps) {
  if (href) {
    return (
      <Link href={href} className="card" data-border-radius="small">
        <Section tag="article" gap="tiny">
          {header && <header className="card__header">{header}</header>}
          {content && <div className="card__content">{content}</div>}
          {footer && <footer className="card__footer">{footer}</footer>}
        </Section>
      </Link>
    );
  }

  return (
    <Section className="card" tag="article" gap="tiny" data-border-radius="small">
      {header && <header className="card__header">{header}</header>}
      {content && <div className="card__content">{content}</div>}
      {footer && <footer className="card__footer">{footer}</footer>}
    </Section>
  );
}
