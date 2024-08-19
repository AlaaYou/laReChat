export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <path d="M275 50a250 250 0 1 0 250 250 250 250 0 0 0 -250-250Zm0 350a200 200 0 1 1 200-200 200 200 0 0 1 -200 200Z" fill="#333" />
            <circle cx="200" cy="200" r="50" fill="#fff" />
            <circle cx="400" cy="200" r="50" fill="#fff" />
            <circle cx="200" cy="400" r="50" fill="#fff" />
            <circle cx="400" cy="400" r="50" fill="#fff" />
            <path d="M200 200l100 100-100 100" stroke="#333" strokeWidth="50" strokeLinecap="round" />
            <path d="M400 200l-100 100 100 100" stroke="#333" strokeWidth="50" strokeLinecap="round" />
            <path d="M200 400l100-100-100-100" stroke="#333" strokeWidth="50" strokeLinecap="round" />
            <path d="M400 400l-100-100 100-100" stroke="#333" strokeWidth="50" strokeLinecap="round" />
        </svg>
    );
}
