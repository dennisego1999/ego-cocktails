'use client';

import { useRef } from 'react';

export default function Hamburger() {
    const ref = useRef<HTMLButtonElement>(null);

    const toggle = (): void => {
        if (ref.current) {
            const isOpen = ref.current.dataset.open === 'true';
            ref.current.dataset.open = String(!isOpen);
        }
    };

    return (
        <button
            className="hamburger"
            ref={ref}
            data-open="false"
            onClick={toggle}
            aria-label="Toggle menu"
        >
            <div className="hamburger__inner">
                <div className="hamburger__center"></div>
            </div>
        </button>
    );
}