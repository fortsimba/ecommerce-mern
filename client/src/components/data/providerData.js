import GoogleIcon from "./icons/google.png";

const providerData = [
    {
        img: GoogleIcon,
        name: "google",
        href: `${process.env.REACT_APP_BACKEND_URI}/auth/google`,
        alt: "google-icon",
        color: "#CB4024",
        txt: "Login with Google"
    }
];

export default providerData;
