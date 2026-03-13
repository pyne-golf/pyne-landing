import '@/styles/landing.css';
import '@/styles/legal.css';
import pyneIcon from '@/assets/pyne_icon_white.png';

const Datenschutz = () => {
  return (
    <>
      <div className="legal-page">
        <div className="legal-container">
          <a href="/" className="legal-back">← Zurück / Back</a>

          <h1>Datenschutzrichtlinie</h1>
          <p style={{ marginBottom: '2rem', fontStyle: 'italic' }}>PYNE GOLF – Mobile App &amp; Webplattform · Stand: März 2026</p>

          <section>
            <h2>1. Verantwortlicher</h2>
            <p>
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
            </p>
            <p>
              Solena Solutions GmbH<br />
              Danziger Straße 57<br />
              10435 Berlin<br />
              Deutschland
            </p>
            <p>
              Datenschutzbeauftragter / Ansprechpartner für Datenschutz:<br />
              Cornelius Hetzler<br />
              E-Mail: cornelius@pyne.golf
            </p>
          </section>

          <section>
            <h2>2. Geltungsbereich</h2>
            <p>
              Diese Datenschutzrichtlinie gilt für die Nutzung der mobilen Applikation „PYNE GOLF" sowie der zugehörigen Webplattform (nachfolgend gemeinsam „App"). Sie informiert darüber, welche personenbezogenen Daten wir erheben, zu welchen Zwecken wir sie verarbeiten, auf welcher Rechtsgrundlage dies geschieht und welche Rechte Ihnen als betroffene Person zustehen.
            </p>
          </section>

          <section>
            <h2>3. Erhobene personenbezogene Daten</h2>

            <h3>3.1 Registrierungs- und Profildaten</h3>
            <ul>
              <li>Vor- und Nachname</li>
              <li>E-Mail-Adresse (für Magic-Link-Authentifizierung, Google Sign-In oder Apple Sign-In)</li>
              <li>Profilbild (optional, vom Nutzer hochgeladen)</li>
              <li>Handicap (optional, vom Nutzer eingegeben)</li>
              <li>Heimatclub (optional, vom Nutzer eingegeben)</li>
            </ul>
            <p>Rechtsgrundlage: Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO) sowie berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO).</p>

            <h3>3.2 Nutzungsdaten und Spielergebnisse</h3>
            <ul>
              <li>Scorecards und Spielergebnisse (Live-Scoring)</li>
              <li>Turnierteilnahmen und -ergebnisse</li>
              <li>Vom Nutzer veröffentlichte Inhalte (Runden, Kommentare) im Rahmen der Social-Features</li>
            </ul>
            <p>Rechtsgrundlage: Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO).</p>

            <h3>3.3 Standortdaten</h3>
            <p>
              Im Rahmen der Club-Suche wird der Standort des Nutzers abgefragt, um nahegelegene Golfclubs anzuzeigen. Die Standortdaten werden ausschließlich in Echtzeit verarbeitet und nicht dauerhaft gespeichert. Die Nutzung der Standortfunktion erfolgt nur mit ausdrücklicher Zustimmung des Nutzers.
            </p>
            <p>Rechtsgrundlage: Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).</p>

            <h3>3.4 Technische Daten und Gerätedaten</h3>
            <ul>
              <li>IP-Adresse</li>
              <li>Gerätetyp, Betriebssystem, Browser-Version</li>
              <li>App-Version</li>
              <li>Push-Notification-Token (sofern Push-Benachrichtigungen vom Nutzer aktiviert werden)</li>
            </ul>
            <p>Rechtsgrundlage: Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO) zur Gewährleistung der technischen Funktionsfähigkeit und Sicherheit der App.</p>
          </section>

          <section>
            <h2>4. Zwecke der Datenverarbeitung</h2>
            <ul>
              <li>Bereitstellung und Betrieb der App (Registrierung, Login, Profilverwaltung)</li>
              <li>Durchführung von Live-Scoring und Turnierverwaltung</li>
              <li>Anzeige von Live-Dashboards (passwortgeschützt, vom Nutzer aktiviert)</li>
              <li>Ermöglichung sozialer Funktionen (Runden teilen, Profil öffentlich/privat, Follower)</li>
              <li>Kommunikation zwischen Golfclubs und deren Mitgliedern/Gästen über die Plattform</li>
              <li>Club-Suche basierend auf Standort (Echtzeit, ohne Speicherung)</li>
              <li>Versand von Push-Benachrichtigungen (nur mit Einwilligung)</li>
              <li>Analyse und Verbesserung der App (Google Analytics)</li>
              <li>Werbemaßnahmen (Google Ads, Meta Pixel)</li>
              <li>Gewährleistung der IT-Sicherheit und Missbrauchsprävention</li>
            </ul>
          </section>

          <section>
            <h2>5. Weitergabe an Dritte und Auftragsverarbeiter</h2>
            <p>Wir geben personenbezogene Daten nur weiter, soweit dies für die in dieser Richtlinie beschriebenen Zwecke erforderlich ist. Folgende Dienstleister (Auftragsverarbeiter) werden eingesetzt:</p>

            <h3>5.1 Supabase (Datenbank &amp; Authentifizierung)</h3>
            <p>Anbieter: Supabase, Inc. – Datenverarbeitung in der EU (Region Frankfurt/Irland). Zweck: Speicherung von Nutzerdaten, Authentifizierung (Magic Link, OAuth). Rechtsgrundlage: Vertragserfüllung, Auftragsverarbeitungsvertrag.</p>

            <h3>5.2 Google Sign-In</h3>
            <p>Anbieter: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Zweck: Authentifizierung via Google-Konto. Bei Nutzung von Google Sign-In werden Name, E-Mail-Adresse und Profilbild von Google an uns übermittelt. Rechtsgrundlage: Vertragserfüllung, Einwilligung.</p>
            <p>Datenschutzerklärung von Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></p>

            <h3>5.3 Apple Sign-In</h3>
            <p>Anbieter: Apple Inc., One Apple Park Way, Cupertino, CA 95014, USA (Datenverarbeitung für EU-Nutzer: Apple Distribution International Ltd., Hollyhill Industrial Estate, Cork, Irland). Zweck: Authentifizierung via Apple-ID. Rechtsgrundlage: Vertragserfüllung, Einwilligung.</p>
            <p>Datenschutzerklärung von Apple: <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">https://www.apple.com/legal/privacy/</a></p>

            <h3>5.4 Vercel (Hosting)</h3>
            <p>Anbieter: Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Zweck: Bereitstellung und Betrieb der Webanwendung. Rechtsgrundlage: Vertragserfüllung, berechtigtes Interesse. Datenschutzerklärung: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">https://vercel.com/legal/privacy-policy</a></p>

            <h3>5.5 Resend (E-Mail-Versand)</h3>
            <p>Anbieter: Resend, Inc. – Datenverarbeitung in der EU (Irland). Zweck: Versand transaktionaler E-Mails (Magic Links, Benachrichtigungen). Rechtsgrundlage: Vertragserfüllung.</p>

            <h3>5.6 Google Analytics</h3>
            <p>Anbieter: Google Ireland Limited. Zweck: Analyse der Website-Nutzung zur Verbesserung des Angebots. Es werden pseudonymisierte Nutzungsdaten erhoben. IP-Anonymisierung ist aktiviert. Rechtsgrundlage: Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).</p>

            <h3>5.7 Google Ads &amp; Meta Pixel (Werbung)</h3>
            <p>Anbieter: Google Ireland Limited bzw. Meta Platforms Ireland Limited, Merrion Road, Dublin 4, Irland. Zweck: Ausspielung und Erfolgsmessung von Werbeanzeigen; Erstellung von Zielgruppen für Remarketing. Es können Cookies und Tracking-Pixel gesetzt werden. Rechtsgrundlage: Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).</p>
            <p>Nutzer können ihre Einwilligung jederzeit über das Cookie-/Consent-Banner widerrufen.</p>
          </section>

          <section>
            <h2>6. Datenverarbeitung im Auftrag von Golfclubs</h2>
            <p>PYNE GOLF stellt Golfclubs eine Schnittstelle bereit, über die Clubs Informationen an ihre Mitglieder und Gäste kommunizieren können (z.&nbsp;B. Benachrichtigungen, Neuigkeiten, Veranstaltungshinweise). In diesem Zusammenhang agiert die Solena Solutions GmbH als Auftragsverarbeiter im Sinne von Art. 28 DSGVO. Der jeweilige Golfclub ist Verantwortlicher für die über die Plattform an seine Mitglieder/Gäste kommunizierten Inhalte.</p>
          </section>

          <section>
            <h2>7. Social Features und Profilsichtbarkeit</h2>
            <p>Nutzer können in der App Inhalte veröffentlichen (z.&nbsp;B. gespielte Runden) und mit anderen Nutzern interagieren. Dabei entscheidet der Nutzer selbst, ob sein Profil öffentlich oder privat ist:</p>
            <ul>
              <li><strong>Öffentliches Profil:</strong> Sichtbar für alle registrierten Nutzer der App.</li>
              <li><strong>Privates Profil:</strong> Sichtbar nur für vom Nutzer akzeptierte Follower.</li>
            </ul>
            <p>Die Einstellung kann jederzeit in den Profileinstellungen geändert werden.</p>
          </section>

          <section>
            <h2>8. Live-Dashboard (Spectator-Modus)</h2>
            <p>Nutzer können ein passwortgeschütztes Live-Dashboard für Turniere aktivieren. Dieses Dashboard ist ausschließlich über ein vom Nutzer festgelegtes Passwort zugänglich. Personen, die das Passwort kennen, können die Live-Ergebnisse einsehen, ohne selbst in der App registriert zu sein. Es werden dabei keine personenbezogenen Daten der Zuschauer erhoben.</p>
          </section>

          <section>
            <h2>9. Cookies und Tracking-Technologien</h2>
            <p>Die Webplattform verwendet Cookies und ähnliche Technologien. Technisch notwendige Cookies werden auf Basis unseres berechtigten Interesses gesetzt (Art. 6 Abs. 1 lit. f DSGVO). Cookies für Analyse- und Werbezwecke (Google Analytics, Google Ads, Meta Pixel) werden nur mit ausdrücklicher Einwilligung des Nutzers aktiviert (Art. 6 Abs. 1 lit. a DSGVO). Die Einwilligung kann jederzeit über das Consent-Banner widerrufen werden.</p>
          </section>

          <section>
            <h2>10. Speicherdauer</h2>
            <p>Personenbezogene Daten werden nur so lange gespeichert, wie es für die jeweiligen Zwecke erforderlich ist:</p>
            <ul>
              <li>Profildaten: Bis zur Löschung des Nutzerkontos.</li>
              <li>Spielergebnisse und Scorecards: Bis zur Löschung des Nutzerkontos oder auf Wunsch des Nutzers.</li>
              <li>Technische Logs (IP-Adressen, Gerätedaten): Maximal 90 Tage.</li>
              <li>Standortdaten: Keine dauerhafte Speicherung (nur Echtzeitverarbeitung).</li>
            </ul>
            <p>Nach Löschung des Kontos werden alle personenbezogenen Daten innerhalb von 30 Tagen unwiderruflich gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.</p>
          </section>

          <section>
            <h2>11. Datensicherheit</h2>
            <p>Wir setzen angemessene technische und organisatorische Maßnahmen ein, um personenbezogene Daten vor unbefugtem Zugriff, Verlust oder Zerstörung zu schützen. Dazu gehören insbesondere:</p>
            <ul>
              <li>Verschlüsselte Datenübertragung (TLS/SSL)</li>
              <li>Zugriffskontrolle und Authentifizierung (Row Level Security in Supabase)</li>
              <li>Regelmäßige Sicherheitsüberprüfungen</li>
              <li>Hosting und Datenverarbeitung innerhalb der EU</li>
            </ul>
          </section>

          <section>
            <h2>12. Ihre Rechte als betroffene Person</h2>
            <p>Ihnen stehen nach der DSGVO folgende Rechte zu:</p>
            <ul>
              <li><strong>Auskunftsrecht</strong> (Art. 15 DSGVO): Sie können Auskunft über Ihre gespeicherten Daten verlangen.</li>
              <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO): Sie können die Berichtigung unrichtiger Daten verlangen.</li>
              <li><strong>Recht auf Löschung</strong> (Art. 17 DSGVO): Sie können die Löschung Ihrer Daten verlangen.</li>
              <li><strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO).</li>
              <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO): Sie können Ihre Daten in einem gängigen Format erhalten.</li>
              <li><strong>Widerspruchsrecht</strong> (Art. 21 DSGVO): Sie können der Verarbeitung auf Basis berechtigter Interessen widersprechen.</li>
              <li><strong>Recht auf Widerruf der Einwilligung</strong> (Art. 7 Abs. 3 DSGVO): Eine erteilte Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden.</li>
            </ul>
            <p>Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: cornelius@pyne.golf</p>
          </section>

          <section>
            <h2>13. Beschwerderecht bei einer Aufsichtsbehörde</h2>
            <p>Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs steht Ihnen das Recht auf Beschwerde bei einer Datenschutzaufsichtsbehörde zu. Die für uns zuständige Aufsichtsbehörde ist:</p>
            <p>
              Berliner Beauftragte für Datenschutz und Informationsfreiheit<br />
              Alt-Moabit 59–61<br />
              10555 Berlin<br />
              <a href="https://www.datenschutz-berlin.de" target="_blank" rel="noopener noreferrer">https://www.datenschutz-berlin.de</a>
            </p>
          </section>

          <section>
            <h2>14. Mindestalter</h2>
            <p>Die Nutzung von PYNE GOLF ist Personen ab 16 Jahren gestattet. Personen unter 16 Jahren dürfen die App nur mit Einwilligung eines Erziehungsberechtigten nutzen. Wir erheben wissentlich keine Daten von Kindern unter 16 Jahren.</p>
          </section>

          <section>
            <h2>15. Änderungen dieser Datenschutzrichtlinie</h2>
            <p>Wir behalten uns vor, diese Datenschutzrichtlinie anzupassen, um sie an geänderte rechtliche Anforderungen oder Änderungen unserer App anzupassen. Die jeweils aktuelle Version ist in der App und auf unserer Website einsehbar. Wesentliche Änderungen werden den Nutzern per E-Mail oder In-App-Benachrichtigung mitgeteilt.</p>
            <p style={{ marginTop: '2rem', fontStyle: 'italic' }}>Stand: März 2026 | Solena Solutions GmbH | pyne.golf</p>
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
