import { useEffect, useRef } from 'react';

const CursorGlow = () => {
    const glowRef = useRef(null);

    useEffect(() => {
        const el = glowRef.current;
        if (!el) return;

        const move = (e) => {
            const zoom = parseFloat(getComputedStyle(document.body).zoom) || 1;
            el.style.left = (e.clientX / zoom) + 'px';
            el.style.top  = (e.clientY / zoom) + 'px';
        };

        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, []);

    return <div className="cursor-glow" ref={glowRef} aria-hidden="true" />;
};

export default CursorGlow;
