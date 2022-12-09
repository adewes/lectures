# Privacy Engineering Richtlinie

In diesem Abschnitt beschreiben wir die basierend auf unserer [Anforderungsanalyse]({{'pe.case-study.requirements'|href}}) entwickelten Richtlinie / Policy. Diese soll anderen Teams (Produktentwicklung, Software, Design) konkrete Handlungsvorgaben und Umsetzungshilfen bei der Gestaltung des Produkts liefern und die Arbeit des Privacy Engineering Teams vereinfachen.

## Geltungsbereich

Diese Richtlinie gilt für die Entwicklung des Kiebitz 2.0 Softwaresystems und umfasst alle relevanten Systemkomponenten und verbundene Entwicklungs- & Geschäftsprozesse. Sie betrifft nicht die Verarbeitung personenbezogener Daten im Rahmen interner Kundenprozesse, z.B. der Rechnungsstellung.

## Grundlegende Prinzipien der Datenverarbeitung

Diese Policy orientiert sich an der Datenschutzgrundverordnung (DSGVO) und dem Standard-Datenschutzmodell (SDM). In Sinne von Privacy By Design (PbD) unterliegt die Datenverarbeitung folgenden grundlegenden Prinzipien:

* **Datenschutzfreundliche Voreinstellungen (Privacy By Default)**: Wenn mehrere Auswahlmöglichkeiten bestehen, sollte die Auswahl so voreingestellt sein, dass die datenschutzfreundliche Alternative gewählt wird.
* **Transparenz und Kontrolle**: Betroffene müssen in der Lage sein, die Verarbeitung ihrer Daten einfach und robust nachvollziehen und steuern zu können, d.h. insbesondere auch die Verarbeitung einschränken zu lassen oder die Löschung der Daten zu beantragen.
* **Respekt vor Privatsphäre der Nutzer**: Bei der Gestaltung des Gesamtsystems und einzelner Komponenten sollten immer die Interessen der Nutzer im Vordergrund stehen, insbesondere das Bedürfnis der Nutzer für Privatsphäre.

## Produktdesign

## Benutzerobfläche (UI) / Frontend

* Betroffene müssen über die Benutzeroberfläche einfach in der Lage sein, ihre Rechte auszuüben, d.h. die eigenen Daten einzusehen, zu korrigieren, ihre Verarbeitung einzuschränken und ihre Löschung zu beantragen.

## Infrastruktur / Backend / Datenhaltung

* Alle personenbezogenen Daten sollen im System nur verschlüsselt oder pseudonymisiert gespeichert werden. Wo möglich und sinnvoll, soll Ende-zu-Ende Verschlüsselung eingesetzt werden, so dass eine Entschlüsselung von Daten nur auf Endgeräten berechtigter Nutzer erfolgt.
* Datenstrukturen und Datenhaltung müssen so gestaltet werden, dass personenbezogene Daten korrigier- und löschbar sind und die Verarbeitung der Daten durch Betroffene einfach gesteuert werden kann.