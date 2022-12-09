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

### BSI IT basic protection

In the following sections, we document the [BSI IT Grundschutz](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/it-grundschutz_node.html) aspkete relevant for privacy engineering.
