export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path d="M500 50a450 450 0 1 0 450 450 450 450 0 0 0 -450-450Zm0 600a350 350 0 1 1 350-350 350 350 0 0 1 -350 350Z" fill="#333" />
            <circle cx="350" cy="350" r="75" fill="#fff" />
            <circle cx="650" cy="350" r="75" fill="#fff" />
            <circle cx="350" cy="650" r="75" fill="#fff" />
            <circle cx="650" cy="650" r="75" fill="#fff" />
            <path d="M350 350l150 150-150 150" stroke="#333" strokeWidth="60" strokeLinecap="round" />
            <path d="M650 350l-150 150 150 150" stroke="#333" strokeWidth="60" strokeLinecap="round" />
            <path d="M350 650l150-150-150-150" stroke="#333" strokeWidth="60" strokeLinecap="round" />
            <path d="M650 650l-150-150 150-150" stroke="#333" strokeWidth="60" strokeLinecap="round" />
        </svg>
    );
}
