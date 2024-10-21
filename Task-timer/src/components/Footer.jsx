

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer--left">
                <p>&copy; 2024 TAMK Projects</p>
            </div>
            <div className="footer--right">
                <a href="/privacy-policy" className="footer--link">Privacy Policy</a>
                <a href="/terms-of-service" className="footer--link">Terms of Service</a>
                <a href="/contact-us" className="footer--link">Contact Us</a>
            </div>
        </footer>
    );
}