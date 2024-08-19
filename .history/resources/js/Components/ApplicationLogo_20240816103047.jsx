export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '-50px' }}>
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#ff7e5f', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#feb47b', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="180" fill="url(#grad1)" />
            <circle cx="140" cy="140" r="30" fill="#fff" />
            <circle cx="260" cy="140" r="30" fill="#fff" />
            <circle cx="140" cy="260" r="30" fill="#fff" />
            <circle cx="260" cy="260" r="30" fill="#fff" />
            <path d="M140 140l70 70-70 70" stroke="#333" strokeWidth="30" strokeLinecap="round" />
            <path d="M260 140l-70 70 70 70" stroke="#333" strokeWidth="30" strokeLinecap="round" />
            <path d="M140 260l70-70-70-70" stroke="#333" strokeWidth="30" strokeLinecap="round" />
            <path d="M260 260l-70-70 70-70" stroke="#333" strokeWidth="30" strokeLinecap="round" />
        </svg>
    );
}
