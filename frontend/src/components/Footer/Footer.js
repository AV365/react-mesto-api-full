function Footer() {
  const currentTime = new Date();
  const year = currentTime.getFullYear();

  return (
    <>
      <footer className="footer">
        <p className="footer__copyright">© {year} Mesto Russia</p>
      </footer>
    </>
  );
}

export default Footer;
