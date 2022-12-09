# Requirements analysis

## Lapwing - functions

Kiebitz is intended as general software for secure communication between users and providers of
services (e.g. in public authorities or companies) can be used.
In addition, the software should be able to automate various typical workflows, e.g.
booking appointments and filling out forms.

### User Stories

The product team identified the following user stories for Kiebitz:

#### User: Registration

Users should be able to register independently on the system. To do this, they should create one or more
Provide contact options, typically an email address.

#### User: Appointment booking

#### User: Data acquisition

#### Provider: Registration

#### Provider: Appointment provision

#### Provider: Form creation

## Privacy engineering requirements

In order to develop concrete requirements from a privacy engineering perspective, appropriate frameworks
and define policies, we first need to be clear about where and how we can
the software is to be used. For this we ask the following questions:

* In which countries will the software be offered/used? <u>**In Europe, especially in Germany**</u>.
* In which areas should the software process data? <u>**General administration, health**</u>.
* Are there any special categories of personal data to be processed? <u>**Yes**</u>.

In general, the fact that XY GmbH is domiciled in Germany results in the need for the
Compliance with the General Data Protection Regulation (GDPR) and other guidelines such as ePrivacy.
In view of this requirement and the answers to the above questions, we decide to
for a German framework that is compatible with the requirements of the GDPR, the
**Standard Data Protection Model (SDM)**. As a framework for technical requirements we decide
us for the **BSI basic protection model**.


