export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="-50 0 450 350" xmlns="http://www.w3.org/2000/svg">
            <path d="M175 20a150 150 0 1 0 150 150 150 150 0 0 0 -150-150Zm0 220a120 120 0 1 1 120-120 120 120 0 0 1 -120 120Z" fill="#333" />
            <circle cx="120" cy="120" r="25" fill="#fff" />
            <circle cx="230" cy="120" r="25" fill="#fff" />
            <circle cx="120" cy="230" r="25" fill="#fff" />
            <circle cx="230" cy="230" r="25" fill="#fff" />
            <path d="M120 120l60 60-60 60" stroke="#333" strokeWidth="25" strokeLinecap="round" />
            <path d="M230 120l-60 60 60 60" stroke="#333" strokeWidth="25" strokeLinecap="round" />
            <path d="M120 230l60-60-60-60" stroke="#333" strokeWidth="25" strokeLinecap="round" />
            <path d="M230 230l-60-60 60-60" stroke="#333" strokeWidth="25" strokeLinecap="round" />
        </svg>
    );
}
