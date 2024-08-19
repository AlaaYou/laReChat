export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 1000 900" xmlns="http://www.w3.org/2000/svg">
            <path d="M500 50a450 450 0 1 0 450 450 450 450 0 0 0 -450-450Zm0 600a350 350 0 1 1 350-350 350 350 0 0 1 -350 350Z" fill="#333" />
            <path d="M250 350h500v200H250V350z" fill="#fff" stroke="#333" strokeWidth="20" />
            <path d="M250 350l250 150L750 350" stroke="#333" strokeWidth="20" strokeLinecap="round" />
            <path d="M250 550l250-150L750 550" stroke="#333" strokeWidth="20" strokeLinecap="round" />
        </svg>
    );
}