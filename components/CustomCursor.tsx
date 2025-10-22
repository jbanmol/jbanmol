import React, { useEffect, useRef } from 'react';

interface CustomCursorProps {
    isCursorEnabled: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ isCursorEnabled }) => {
    const outlineRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef(0);

    useEffect(() => {
        if (!isCursorEnabled) return;
        
        const root = document.documentElement;

        const onMouseMove = (e: MouseEvent) => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }

            requestRef.current = requestAnimationFrame(() => {
                root.style.setProperty('--cursor-x', `${e.clientX}px`);
                root.style.setProperty('--cursor-y', `${e.clientY}px`);
            });

            const target = e.target as HTMLElement;
            const isInteractive = target.closest('a, button, input, [role="button"], [role="switch"], label, .interactive-card');

            if (outlineRef.current) {
                if (isInteractive) {
                    outlineRef.current.classList.add('grow');
                } else {
                    outlineRef.current.classList.remove('grow');
                }
            }
        };

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            root.style.removeProperty('--cursor-x');
            root.style.removeProperty('--cursor-y');
        };
    }, [isCursorEnabled]);
    
    if (!isCursorEnabled) {
        return null;
    }

    return (
        <>
            <div className="cursor-dot hidden md:block"></div>
            <div ref={outlineRef} className="cursor-outline hidden md:block"></div>
        </>
    );
};

export default CustomCursor;