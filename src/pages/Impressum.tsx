import '@/styles/landing.css';
import '@/styles/legal.css';
import pyneIcon from '@/assets/pyne_icon_white.png';

const Impressum = () => {
  return (
    <>
      <div className="legal-page">
        <div className="legal-container">
          <a href="/" className="legal-back">← Zurück / Back</a>

          <h1>Impressum / Legal Notice</h1>

          <section>
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
              Solena Solutions GmbH<br />
              Danziger Str. 57<br />
              10435 Berlin
            </p>
          </section>

          <section>
            <h2>Vertreten durch / Represented by</h2>
            <p>Carlos Maisch und Cornelius Hetzler</p>
          </section>

          <section>
            <h2>Kontakt / Contact</h2>
            <p>E-Mail: carlos@solena-app.com</p>
          </section>

          <section>
            <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>
              Carlos Maisch und Cornelius Hetzler<br />
              Danziger Str. 57<br />
              10435 Berlin
            </p>
          </section>

          <section>
            <h2>Registereintrag / Registration</h2>
            <p>
              Handelsregister: Amtsgericht Charlottenburg (Berlin)<br />
              Registernummer: HRB 284153 B
            </p>
          </section>

          <section>
            <h2>Umsatzsteuer-ID / VAT ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: in Gründung.<br />
              VAT identification number pursuant to § 27a of the German VAT Act: pending registration.
            </p>
          </section>
        </div>
      </div>

      <footer className="pyne-footer">
        <div className="footer-inner">
          <img src={pyneIcon} alt="Pyne" className="footer-icon" />
          <span className="footer-copy">© 2026 Pyne Golf &nbsp;·&nbsp; pyne.golf</span>
        </div>
      </footer>
    </>
  );
};

export default Impressum;
