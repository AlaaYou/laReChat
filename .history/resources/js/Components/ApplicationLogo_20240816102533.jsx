export default function ApplicationLogo(props) {
    return (
      <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" fill="#333" />
        <circle cx="50" cy="50" r="30" fill="#fff" />
        <path
          d="M50 30 L60 40 L50 50 L40 40 Z"
          fill="#333"
          transform="translate(0, -10)"
        />
      </svg>
    );
  }