export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 1000 900" xmlns="http://www.w3.org/2000/svg">
            <path d="M500 50a450 450 0 1 0 450 450 450 450 0 0 0 -450-450Zm0 600a350 350 0 1 1 350-350 350 350 0 0 1 -350 350Z" fill="#333" />
            
            <svg width="900" height="900" xmlns="http://www.w3.org/2000/svg">
       
                <circle cx="500" cy="380" r="200" fill="#C68620" />
            </svg>
           
        </svg>
    );
}
