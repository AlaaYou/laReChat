export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
            <path d="M350 40a300 300 0 1 0 300 300 300 300 0 0 0 -300-300Zm0 440a240 240 0 1 1 240-240 240 240 0 0 1 -240 240Z" fill="#333" />
            <circle cx="240" cy="240" r="50" fill="#fff" />
            <circle cx="460" cy="240" r="50" fill="#fff" />
            <circle cx="240" cy="460" r="50" fill="#fff" />
            <circle cx="460" cy="460" r="50" fill="#fff" />
            <path d="M240 240l120 120-120 120" stroke="#333" stroke-width="50" stroke-linecap="round" />
            <path d="M460 240l-120 120 120 120" stroke="#333" stroke-width="50" stroke-linecap="round" />
            <path d="M240 460l120-120-120-120" stroke="#333" stroke-width="50" stroke-linecap="round" />
            <path d="M460 460l-120-120 120-120" stroke="#333" stroke-width="50" stroke-linecap="round" />
        </svg>
    );
}