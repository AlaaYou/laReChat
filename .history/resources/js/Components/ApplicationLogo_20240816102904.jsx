export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 560 560" xmlns="http://www.w3.org/2000/svg">
            <path d="M280 30a240 240 0 1 0 240 240 240 240 0 0 0 -240-240Zm0 360a200 200 0 1 1 200-200 200 200 0 0 1 -200 200Z" fill="#333" />
            <circle cx="200" cy="200" r="40" fill="#fff" />
            <circle cx="360" cy="200" r="40" fill="#fff" />
            <circle cx="200" cy="360" r="40" fill="#fff" />
            <circle cx="360" cy="360" r="40" fill="#fff" />
            <path d="M200 200l100 100-100 100" stroke="#333" stroke-width="40" stroke-linecap="round" />
            <path d="M360 200l-100 100 100 100" stroke="#333" stroke-width="40" stroke-linecap="round" />
            <path d="M200 360l100-100-100-100" stroke="#333" stroke-width="40" stroke-linecap="round" />
            <path d="M360 360l-100-100 100-100" stroke="#333" stroke-width="40" stroke-linecap="round" />
        </svg>
    );
}