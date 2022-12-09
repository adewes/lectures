# Anforderungsanalyse

## Kiebitz - Funktionen

Kiebitz soll als generelle Software zur sicheren Kommunikation zwischen Nutzern und Anbietern von
Dienstleistungen (z.B. in Behörden oder Unternehmen) eingesetzt werden können.
Darüber hinaus soll die Software verschiedene typische Arbeitsabläufe automatisieren können, z.B.
die Buchung von Terminen sowie das Ausfüllen von Formularen.

### User Stories

Das Produktteam hat für Kiebitz die folgenden User Stories identifiziert:

#### Nutzer: Registrierung

Nutzer sollen sich selbständig am System registrieren können. Sie sollen hierzu eine oder mehrere
Kontaktmöglichkeiten bereitstellen, typischerweise eine E-Mail Adresse.

#### Nutzer: Terminbuchung

#### Nutzer: Datenerfassung

#### Anbieter: Registrierung

#### Anbieter: Terminbereitstellung

#### Anbieter: Formularerstellung

## Privacy Engineering Anforderungen

Um konkrete Anforderungen aus Privacy Engineering Sicht zu erarbeiten, geeignete Frameworks
auszuwählen und Policies zu definieren, müssen wir uns zunächst darüber klar werden, wo und wie
die Software eingesetzt werden soll. Hierzu stellen wir folgende Fragen:

* In welchen Ländern soll die Software angeboten/genutzt werden? <u>**In Europa, insbesondere in Deutschland**</u>.
* In welchen Bereichen soll die Software Daten verarbeiten? <u>**Verwaltung allgemein, Gesundheit**</u>.
* Sollen spezielle Kategorien personenbezogener Daten verarbeitet werden? <u>**Ja**</u>.

Generell ergibt sich aus der Ansässigkeit der XY GmbH in Deutschland die Notwendigkeit der
Beachtung der Datenschutzgrundverordnung (DSGVO) sowie weiterer Richtlinien wie ePrivacy.
In Anbetracht dieser Anforderung und der Antworten auf die obigen Fragen entscheiden wir uns
für ein deutsches Framework, das mit den Anforderungen der DSGVO kompatibel ist, dem
**Standard-Datenschutzmodell (SDM)**. Als Framework für technische Anforderungen entscheiden wir
uns für das **BSI Grundschutz-Modell**.

