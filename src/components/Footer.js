import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <p>Copyright &copy; 2022</p>
        </footer>
    );
}

<style jsx>{`
    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #f8f9fa;
        color: black;
        text-align: center;
    }
`}</style>
export default Footer;
