# Anforderungsanalyse

## Kiebitz 2.0 - Funktionen

Kiebitz 2.0 soll als generelle Software zur sicheren Kommunikation zwischen Nutzern und Anbietern von Dienstleistungen (z.B. in Behörden oder Unternehmen) eingesetzt werden können.
Darüber hinaus soll die Software verschiedene typische Arbeitsabläufe automatisieren können, z.B. die Buchung von Terminen sowie das Ausfüllen von Formularen.

### Funktionsumfang

Das Produktteam hat für Kiebitz 2.0 den folgenden erweiterten Funktionsumfang vorgesehen:

#### Erweiterte Terminbuchung

Nutzer sollen wie bisher in der Lage sein, Termine bei Anbietern zu buchen. Die Terminbuchung soll jedoch durch zusätzliche Funktionen erweitert werden, u.a. sollen Anbieter die Möglichkeit haben, bei Terminen zusätzliche Angaben von Nutzern anzufordern (z.B. Kontakdaten).

#### Workflow-Automatisierung

Nutzer und Anbieter sollen in digitalen Geschäftsprozessen zusammenarbeiten können. Nutzer sollen in der Lage sein, über eine Formulareingabe z.B. für den Anbieter relevante Angaben (z.B. eine Krankheitshistorie) zu erfassen und diese verschlüsselt an den Anbieter zu übermitteln. Der Anbieter soll seinerseits in der Lage sein, im gegebenen Prozess weitere Daten einzugeben und so einen spezifischen Geschäftsprozess zu digitialisieren.

## Privacy Engineering Anforderungen

Um konkrete Anforderungen aus Privacy Engineering Sicht zu erarbeiten, geeignete Frameworks auszuwählen und Policies zu definieren, müssen wir uns zunächst darüber klar werden, wo und wie die Software eingesetzt werden soll. Hierzu stellen wir folgende Fragen:

* In welchen Ländern soll die Software angeboten/genutzt werden? <u>**In Europa, insbesondere in Deutschland**</u>.
* In welchen Bereichen soll die Software Daten verarbeiten? <u>**Verwaltung allgemein, Gesundheit**</u>.
* Sollen spezielle Kategorien personenbezogener Daten verarbeitet werden? <u>**Ja**</u>.

Generell ergibt sich aus der Ansässigkeit der XY GmbH in Deutschland die Notwendigkeit der Beachtung der Datenschutzgrundverordnung (DSGVO) sowie weiterer Richtlinien wie ePrivacy.
In Anbetracht dieser Anforderung und der Antworten auf die obigen Fragen entscheiden wir uns für ein deutsches Framework, das mit den Anforderungen der DSGVO kompatibel ist, dem **Standard-Datenschutzmodell (SDM)**. Als Framework für technische Anforderungen entscheiden wir uns für das **BSI Grundschutz-Modell**.

### Standard-Datenschutzmodell

In den folgenden Abschnitten dokumentieren wir die Umsetzung des Standard-Datenschutzmodells gemäß der [offiziellen Dokumentation](https://www.datenschutz-mv.de/static/DS/Dateien/Datenschutzmodell/SDM-Methode_V3.pdf).

#### Initiale Fragen zur Anforderungsanalyse: Terminbuchung

* Gibt es konkrete User Stories oder Prozessbeschreibungen für den geplanten Funktionsumfang?
* Welche konkreten personenbezogenen Daten sollen erfasst werden?
  * Im Terminbuchungsprozess werden die E-Mail Adresse des Nutzers, ggf. eine Mobilfunknummer sowie ggf. die Anschrift erfasst.
* Wie und wo sollen personenbezogene Daten gespeichert werden?
  * Unklar, soll vom Softwareteam in Abstimmung mit dem Privacy Engineering Team festgelegt werden.
* Welche zusätzlichen Metadaten werden für die Terminbuchung erfasst?
  * Der Ort (z.B. Arztpraxis), die Zeit und ggf. weitere Informationen zum Termin z.B. die Art (Arztbesuch, administrativer Termin etc.)
* Wie wird der Nutzer über die Datenerfassung informiert?
  * Soll vom Privacy Engineering zusammen mit Legal / Datenschuztzbeauftragten erarbeitet werden.
* Sollen die Nutzerdaten auch für andere Zwecke verarbeitet werden?
  * Für Analytics / Business Intelligence / Data Science, Marketing.
* Welchen Akteuren sollen die Daten zur Verfügung gestellt werden?
  * Für die Beteiligten im Terminbuchungsprozess, d.h. Ärzte oder Terminanbieter allgmein, sowie die Nutzer und ggf. Kundensupport.
* Sollen Untervearbeiter für die Verarbeitung der Daten eingesetzt werden?
  * Es soll für Anbieter von Terminen ein CRM eingerichtet werden in dem deren Daten für Vertriebszwecke verarbeitet werden.
* Wie lange sollen die Daten im System gespeichert werden?
  * So lange wie nötig, muss abgestimmt werden mit Kunden, Privacy Engineering und Softwareentwicklung.
* Wie soll die technische Infrastruktur gestaltet werden? Soll z.B. ein externer Cloud-Anbieter für das Hosting genutzt werden?

#### Verarbeitungstätigkeiten und Anforderungen

Eine Übersicht über die geplanten Verarbeitungsvorgänge in Kiebitz 2.0 ist in der [Softwaredokumentation](https://kiebitz.eu/doku/system/konzept) gegeben.

##### Anforderungen nach SDM

Aus dem rechtlichen Rahmen und dem Standard-Datenschutzmodell als gewähltes Framework ergeben sich Anforderungen in folgenden Bereichen. Es wurden für die Fallstudie nur die relevantesten Anforderungen ausgewählt.

* **Verfügbarkeit**
  * **Backup-Strategie**: Buchungs- & Nutzerdaten müssen regelmäßig, idealerweise stündlich oder zumindest täglich in einem verschlüsselten Backup gesichert werden. Die Wiederherstellung der Daten muss regelmäßig geprüft werden.
  * **Konfigurationsmanagement / DevOps**: Infrastruktur- & Softwarekomponenten müssen automatisiert erstellt werden können anhand einer deklarativen Konfiguration, oder die Erstellung muss zumindest genau schriftlich dokumentiert werden.
  * **Datenmodell / Audit-Logging / Löschstrategie**: Es muss ein Data Dictionary existieren, das sämtliche Datentypen / -modell und deren Felder / Attribute beschreibt.
* **Integrität**
  * **Rollenmanagement**: Definition von Rechten (Schreiben, Lesen, Löschen) basierend auf zugewiesenen Rollen im System über ein rollenbasiertes Zugriffsmanagement (RBAC).
  * **Datenintegrität**: Nutzung kryptographischer und anderer Mechanismen um die Integrität von Daten im System zu sichern.
  * **Löschen & Berichtigung von Daten**: Möglichkeit, Betroffenrechte wahrzunehmen und z.B. eigene personenbezogene Daten löschen oder korrigieren zu lassen.
  * **Schutz vor äußeren Einflüssen**: Sicherstellung der Skalierbarkeit / Belastbarkeit des Systems z.B. bei Lastspitzen oder bei Denial of Service (DoS) Angriffen, beispielsweise durch den Einsatz von CAPTCHAs. Schutz vor Hacking oder Diebstahl der Daten durch kryptographische Maßnahmen z.B. Verschlüsselung.
  * **Datenvalidierung**: Prüfung aller Eingabedaten vor Speicherung/Verarbeitung im System.
* **Vertraulichkeit**:
  * **Rollenmanagement**: Einführung eines Berechtigungs- & Rollenkonzept basierend auf dem Erforderlichkeitsprinzip, sowie eines zugehörigen Identitätsmanagements; sowohl für die Software als auch die notwendige Infrastruktur.
  * **Sicheres Authentifizierungsverfahren**: Implementierung eines sicheren Verfahrens zur Authentifizierung von Nutzern nach dem Stand der Technik. 
  * **Verschlüsselung**: Implementierung von Transportverschlüsselung und ggf. Verschlüsselung gespeicherter Daten sowie Ende-zu-Ende Verschlüsselung zwischen Akteuren im System.
  * **Schutz vor äußeren Einflüssen**: Implementierung geeigneter technischer und organisatorischer Maßnahmen zur Abwehr, Erkennung und Behebung von Sicherheitszwischenfällen (z.B. durch Hacking).
* **Nichtverkettung**:
  * **Technische Rechtsbindung**: Einschränkung der Verarbeitung, Übermittlung und Nutzung von Daten durch geeignete technische Maßnahmen.
  * **Schnittstellen-Minimierung**: Einschränkung der Möglichkeit des Datenabrufs über technische Schnittstellen auf das Mindestmaß an benötigter Information.
  * **Anonymisierung & Pseudonymisierung**: Umsetzung geeigneter Verfahren zur Pseudonymisierung und Anyonmisierung von Daten, um die Verkettung oder missbräuchliche Nutzung zu erschweren.
* **Transparenz**:
  * **Dokumentation**: Erfassung und schriftliche Dokumentation aller relevanten technischen Verarbeitungsvoränge der Software.
  * **Automatisierte Tests**: Umsetzung automatisierter Software-Tests zur Prüfung kritischer, datenschutzrelevanter Funktionalität.
* **Intervenierbarkeit**:
  * **Einwilligungsmanagement**: Umsetzung eines rechtskonformen Einwilligungsmanagements, das alle Einwilligungen die als Grundlage für die Datenverarbeitung genutzt werden dokumentiert und es Nutzern erlaubt, Einwilligungen nachzuvollziehen und anzupassen.
  * **Technische Realisierung der Betroffenenrechte**: Umsetzung einer Schnittstelle für die Realisierung der Betroffenenrechte, d.h. zur Einschränkung der Verarbeitung, zur Anforderung eines Datenauszugs sowie zur Berichtigung und zur Löschung der eigenen Daten. 
* **Datenminimierung**:
  * **Reduzierung der Datenerfassung**: Systematische Reduzierung der Erfassung personenbezogener Daten in allen Verarbeitungsvorgängen.
  * **Reduzierung der Kenntnisnahme**: Systematische Reduzierung der Kenntnisnahme personenbezogener Daten in internen und externen Verarbeitungsvorgängen ("need to know" Prinzip).
  * **Löschkonzept**: Implementierung eines geeigneten technischen Löschkonzepts für alle an der Informationsverarbeitung beteiligte Systeme.

### BSI IT-Grundschutz

In den folgenden Abschnitten dokumentieren wir die für Privacy Engineering relevanten Aspkete des [BSI IT Grundschutz](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/it-grundschutz_node.html).