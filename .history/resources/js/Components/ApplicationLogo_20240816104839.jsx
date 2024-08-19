export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path d="M500 100a450 450 0 1 0 450 450 450 450 0 0 0 -450-450Zm0 600a350 350 0 1 1 350-350 350 350 0 0 1 -350 350Z" fill="#333" />
            <path d="M250 450h500v200H250V450z" fill="#fff" stroke="#333" strokeWidth="20" />
            <path d="M250 450l250 150L750 450" stroke="#333" strokeWidth="20" strokeLinecap="round" />
            <path d="M250 650l250-150L750 650" stroke="#333" strokeWidth="20" strokeLinecap="round" />
        </svg>
    );
}
