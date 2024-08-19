export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
            <path d="M125 15a110 110 0 1 0 110 110 110 110 0 0 0 -110-110Zm0 170a90 90 0 1 1 90-90 90 90 0 0 1 -90 90Z" fill="#333" />
            <circle cx="80" cy="80" r="15" fill="#fff" />
            <circle cx="170" cy="80" r="15" fill="#fff" />
            <circle cx="80" cy="170" r="15" fill="#fff" />
            <circle cx="170" cy="170" r="15" fill="#fff" />
            <path d="M80 80l40 40-40 40" stroke="#333" stroke-width="15" stroke-linecap="round" />
            <path d="M170 80l-40 40 40 40" stroke="#333" stroke-width="15" stroke-linecap="round" />
            <path d="M80 170l40-40-40-40" stroke="#333" stroke-width="15" stroke-linecap="round" />
            <path d="M170 170l-40-40 40-40" stroke="#333" stroke-width="15" stroke-linecap="round" />
        </svg>
    );
}