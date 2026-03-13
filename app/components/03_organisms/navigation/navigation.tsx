import Link from "../../01_atoms/link/link";
import Logo  from "../../01_atoms/logo/logo";
import Section from "../../00_fundaments/section/section";
import Hamburger from "../../01_atoms/hamburger/hamburger";

export default function Navigation() {
    return (
        <Section className="navigation" tag="nav" flexDirection="row" justify="between" align="center" gap="tiny" gutter="both" theme="dark">
            <Logo />

            <Section tag="ul" className="navigation__links" flexDirection="row" justify="end" gap="tiny">
                <li>
                    <Link href="/">Home</Link>
                </li>

                <li>
                    <Link href="/recipes">All recipes</Link>
                </li>
            </Section>

            <Hamburger/>
        </Section>
    )
}