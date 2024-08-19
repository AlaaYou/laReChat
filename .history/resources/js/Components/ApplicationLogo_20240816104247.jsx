export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 1000 900" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 150h900v600H50V150z" fill="#333" />
            <path d="M50 150l450 300L950 150" stroke="#fff" strokeWidth="60" strokeLinecap="round" />
            <path d="M50 750l450-300L950 750" stroke="#fff" strokeWidth="60" strokeLinecap="round" />
        </svg>
    );
}
