import '@/styles/landing.css';
import '@/styles/legal.css';
import pyneIcon from '@/assets/pyne_icon_white.png';

const Datenschutz = () => {
  return (
    <>
      <div className="legal-page">
        <div className="legal-container">
          <a href="/" className="legal-back">← Zurück / Back</a>

          <h1>Datenschutzerklärung / Privacy Policy</h1>

          {/* GERMAN */}
          <section>
            <h2>1. Datenschutz auf einen Blick</h2>
            <h3>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>

            <h3>Datenerfassung auf dieser Website</h3>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber:<br /><br />
              Solena Solutions GmbH<br />
              Danziger Str. 57<br />
              10435 Berlin<br />
              E-Mail: carlos@solena-app.com
            </p>
          </section>

          <section>
            <h2>2. Hosting</h2>
            <p>
              Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
            </p>
          </section>

          <section>
            <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3>Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>

            <h3>Hinweis zur verantwortlichen Stelle</h3>
            <p>
              Solena Solutions GmbH<br />
              Danziger Str. 57<br />
              10435 Berlin<br /><br />
              Vertreten durch: Carlos Maisch und Cornelius Hetzler<br />
              E-Mail: carlos@solena-app.com
            </p>
          </section>

          <section>
            <h2>4. Datenerfassung auf dieser Website</h2>
            <h3>Warteliste / Waitlist</h3>
            <p>
              Wenn Sie sich über das Formular auf dieser Website für unsere Warteliste anmelden, erheben wir Ihre E-Mail-Adresse sowie den Typ der Anmeldung (Club oder Golfer). Diese Daten werden ausschließlich zum Zweck der Kontaktaufnahme im Rahmen des Pilotprogramms verwendet und nicht an Dritte weitergegeben.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie uns per E-Mail kontaktieren.
            </p>
          </section>

          <section>
            <h2>5. Ihre Rechte / Your Rights</h2>
            <p>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.
            </p>
            <p>
              You have the right to request information about your stored personal data, its origin, recipients, and the purpose of data processing, as well as the right to correction, blocking, or deletion of this data at any time free of charge. Please contact us at carlos@solena-app.com.
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

export default Datenschutz;
