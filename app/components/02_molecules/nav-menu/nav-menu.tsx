import INavMenuProps from "@/app/contracts/INavMenuProps";
import Link from "../../01_atoms/link/link";
import Section from "../../00_fundaments/section/section";

export default function NavMenu({ className, isMobile = false }: INavMenuProps) {
    // Remove any falsey items from list
    const classes = ["nav-menu", className].filter(Boolean).join(" ");

    return (
         <Section 
            tag="ul" 
            className={classes} 
            flexDirection={isMobile ? 'column' : 'row'} 
            justify={!isMobile ? 'end' : 'start'} 
            gap="tiny"
            gutter={isMobile ? 'both' : null}
            padding={isMobile ? 'both' : null}
            paddingSize={isMobile ? 'tiny' : null}
        >
            <li><Link href="/">Home</Link></li>
            <li><Link href="/recipes">All recipes</Link></li>
        </Section>
    );
}