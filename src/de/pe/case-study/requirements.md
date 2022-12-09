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

### BSI IT-Grundschutz

In den folgenden Abschnitten dokumentieren wir die für Privacy Engineering relevanten Aspkete des [BSI IT Grundschutz](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/it-grundschutz_node.html).