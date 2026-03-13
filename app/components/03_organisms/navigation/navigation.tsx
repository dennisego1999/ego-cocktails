import Logo  from "../../01_atoms/logo/logo";
import Section from "../../00_fundaments/section/section";
import Hamburger from "../../01_atoms/hamburger/hamburger";
import PopoverMenu from "../popover-menu/popover-menu";
import NavMenu from "../../02_molecules/nav-menu/nav-menu";

export default function Navigation() {
    return (
        <Section 
            className="navigation" 
            tag="nav" 
            flexDirection="row" 
            justify="between" 
            align="center" 
            gap="tiny" 
            gutter="both" 
            theme="dark"
        >
            <Logo />

            <NavMenu className="navigation__links" />

            <Hamburger popovertarget="mobile-nav" />

            <PopoverMenu id="mobile-nav">
                <NavMenu className="navigation__mobile-links" isMobile={true} />
            </PopoverMenu>
        </Section>
    )
}