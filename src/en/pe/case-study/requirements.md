# Requirements analysis

## Lapwing 2.0 - Functions

Kiebitz 2.0 should be able to be used as general software for secure communication between users and service providers (e.g. in public authorities or companies).
In addition, the software should be able to automate various typical workflows, such as booking appointments and filling out forms.

### Scope of functions

The product team has planned the following extended functionality for Kiebitz 2.0:

#### Advanced appointment booking

Users should be able to book appointments with providers as before. However, appointment booking is to be enhanced with additional functions, including the option for providers to request additional information from users for appointments (e.g., contact data).

#### Workflow automation

Users and providers should be able to collaborate in digital business processes. Users should be able to enter information relevant to the provider (e.g., a medical history) via a form and transmit it to the provider in encrypted form. The provider, in turn, should be able to enter further data in the given process and thus digitize a specific business process.

## Privacy engineering requirements

In order to work out concrete requirements from a privacy engineering point of view, select suitable frameworks and define policies, we first need to be clear about where and how the software is to be used. To do this, we ask the following questions:

* In which countries will the software be offered/used? <u>**In Europe, especially in Germany**</u>.
* In which areas should the software process data? <u>**General administration, health**</u>.
* Are there any special categories of personal data to be processed? <u>**Yes**</u>.

In general, the fact that XY GmbH is based in Germany means that it is necessary to comply with the General Data Protection Regulation (DSGVO) and other guidelines such as ePrivacy.
Given this requirement and the answers to the above questions, we decide to use a German framework that is compatible with the requirements of the GDPR, the **Standard Data Protection Model (SDM)**. As a framework for technical requirements, we choose the **BSI Basic Protection Model**.

### Standard data protection model

In the following sections, we document the implementation of the standard data protection model according to the [official documentation](https://www.datenschutz-mv.de/static/DS/Dateien/Datenschutzmodell/SDM-Methode_V3.pdf).

#### Initial requirements analysis questions: Appointment booking

* Are there concrete user stories or process descriptions for the planned functional scope?
* What specific personal data is to be collected?
  * In the appointment booking process, the user's e-mail
address, a mobile phone number if applicable, and the address if applicable are recorded.
* How and where should personal data be stored?
  * Unclear, to be determined by the software team in coordination
with the privacy engineering team.
* What additional metadata is captured for appointment booking?
  * The place (e.g. doctor's office), the time and, if necessary,
further information about the appointment e.g. the type (doctor's appointment, administrative appointment etc.)
* How is the user informed about the data collection?
  * To be developed by Privacy Engineering together with Legal
/ Data Protection Officer.
* Should the user data also be processed for other purposes?
  * For Analytics / Business Intelligence / Data Science,
Marketing.
* Which stakeholders should the data be made available to?
  * For the parties involved in the appointment booking process,
i.e. doctors or appointment providers in general, as well as the users and, if applicable, customer support.
* Should sub-processors be used to process the data?
  * A CRM is to be set up for appointment providers in which
their data is processed for sales purposes.
* How long should the data be stored in the system?
  * As long as necessary, must be coordinated with customers,
privacy engineering and software development.
* How should the technical infrastructure be designed? For example, should an external cloud provider be used for hosting?

#### Processing activities and requirements

An overview of the planned processing operations in Kiebitz 2.0 is given in the [software documentation](https://kiebitz.eu/doku/system/konzept).

##### Requirements according to SDM

The legal framework and the standard data protection model as the chosen framework result in requirements in the following areas:

* **Availability**
  * **Backup strategy** : Booking & user data must be backed
up regularly, ideally hourly or at least daily in an encrypted backup. Restoration of the data must be checked regularly.
  * **Configuration management / DevOps** : Infrastructure
& software components must be able to be created automatically on the basis of a declarative configuration, or the creation must at least be documented precisely in writing.
  * **Data model / audit logging / deletion strategy** : A
data dictionary must exist that describes all data types / model and their fields / attributes.
* **Integrity**
  * **Role management** : Definition of rights (write, read,
delete) based on assigned roles in the system via role-based access management (RBAC).
  * **Data integrity** : use of cryptographic and other mechanisms
to ensure the integrity of data in the system.
  * **Deletion & correction of data** : Possibility to exercise
data subject rights and, for example, have your own personal data deleted or corrected.
  * **Protection against external influences** : Ensuring
the scalability / resilience of the system, e.g., during load peaks or denial of service (DoS) attacks, for example, through the use of CAPTCHAs. Protection against hacking or theft of data through cryptographic measures, e.g. encryption.
  * **Data validation** : checking of all input data before
saving/processing in the system.
* **Confidentiality** :
* **Non-chaining** :
* **Transparency** :
* **Intervenability** :
* **Data minimization** :

### BSI IT basic protection

In the following sections, we document the [BSI IT Grundschutz](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/it-grundschutz_node.html) aspkete relevant for privacy engineering.
