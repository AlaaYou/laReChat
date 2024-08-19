export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"> <path d="M100 10a90 90 0 1 0 90 90 90 90 0 0 0 -90-90Zm0 160a70 70 0 1 1 70-70 70 70 0 0 1 -70 70Z" fill="#333" /> <circle cx="60" cy="60" r="10" fill="#fff" /> <circle cx="140" cy="60" r="10" fill="#fff" /> <circle cx="60" cy="140" r="10" fill="#fff" /> <circle cx="140" cy="140" r="10" fill="#fff" /> <path d="M60 60l30 30-30 30" stroke="#333" stroke-width="10" stroke-linecap="round" /> <path d="M140 60l-30 30 30 30" stroke="#333" stroke-width="10" stroke-linecap="round" /> <path d="M60 140l30-30-30-30" stroke="#333" stroke-width="10" stroke-linecap="round" /> <path d="M140 140l-30-30 30-30" stroke="#333" stroke-width="10" stroke-linecap="round" /> </svg>
    );
}
