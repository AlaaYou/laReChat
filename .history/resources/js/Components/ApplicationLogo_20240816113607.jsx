export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 1000 900" xmlns="http://www.w3.org/2000/svg">
            <path d="M500 50a450 450 0 1 0 450 450 450 450 0 0 0 -450-450Zm0 600a350 350 0 1 1 350-350 350 350 0 0 1 -350 350Z" fill="#333" />
            
            <text x="500" y="350" textAnchor="middle" dominantBaseline="central" fontSize="100" fill="#fff">L</text>
        </svg>
    );
}
