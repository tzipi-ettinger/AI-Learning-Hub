const BotSVG = ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* אנטנה */}
        <line x1="50" y1="8" x2="50" y2="20" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="50" cy="6" r="4" fill="#a78bfa"/>
        {/* ראש */}
        <rect x="20" y="20" width="60" height="42" rx="12" fill="#1e1b3a" stroke="#a78bfa" strokeWidth="2"/>
        {/* עיניים */}
        <circle cx="37" cy="38" r="7" fill="#0f0c29"/>
        <circle cx="63" cy="38" r="7" fill="#0f0c29"/>
        <circle cx="37" cy="38" r="4" fill="#a78bfa"/>
        <circle cx="63" cy="38" r="4" fill="#60a5fa"/>
        <circle cx="39" cy="36" r="1.5" fill="white"/>
        <circle cx="65" cy="36" r="1.5" fill="white"/>
        {/* פה */}
        <rect x="33" y="52" width="34" height="5" rx="2.5" fill="#a78bfa" opacity="0.6"/>
        <rect x="37" y="52" width="6" height="5" rx="1" fill="#a78bfa"/>
        <rect x="47" y="52" width="6" height="5" rx="1" fill="#a78bfa"/>
        <rect x="57" y="52" width="6" height="5" rx="1" fill="#a78bfa"/>
        {/* צוואר */}
        <rect x="44" y="62" width="12" height="8" rx="3" fill="#1e1b3a" stroke="#a78bfa" strokeWidth="1.5"/>
        {/* גוף */}
        <rect x="18" y="70" width="64" height="26" rx="10" fill="#1e1b3a" stroke="#a78bfa" strokeWidth="2"/>
        {/* כפתורים בגוף */}
        <circle cx="38" cy="83" r="5" fill="#a78bfa" opacity="0.8"/>
        <circle cx="50" cy="83" r="5" fill="#60a5fa" opacity="0.8"/>
        <circle cx="62" cy="83" r="5" fill="#a78bfa" opacity="0.5"/>
        {/* ידיים */}
        <rect x="4" y="72" width="12" height="20" rx="6" fill="#1e1b3a" stroke="#a78bfa" strokeWidth="1.5"/>
        <rect x="84" y="72" width="12" height="20" rx="6" fill="#1e1b3a" stroke="#a78bfa" strokeWidth="1.5"/>
    </svg>
)

export default BotSVG
