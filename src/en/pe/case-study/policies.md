# Privacy Engineering Policy

In this section we describe the guideline / policy developed based on our [requirements analysis]({{'pe.case-study.requirements'|href}}). This is intended to provide other teams (product development, software, design) with concrete guidelines and implementation aids for the design of the product and to simplify the work of the privacy engineering team.

## Scope

This policy applies to the development of the Kiebitz 2.0 software system and covers all relevant system components and related development & business processes. It does not apply to the processing of personal data in the context of internal customer processes, e.g. invoicing.

## Basic principles of data processing

This Policy is guided by the General Data Protection Regulation (GDPR) and the Standard Data Protection Model (SDM). In terms of Privacy By Design (PbD), data processing is subject to the following fundamental principles:

* **Privacy-friendly default settings (Privacy By Default)** : If multiple choices exist, the selection should default to the privacy-friendly alternative.
* **Transparency and control** : Data subjects must be able to easily and robustly understand and control the processing of their data, i.e. in particular also to have the processing restricted or to request the deletion of the data.
* **Respect for user privacy** : The design of the overall system and individual components should always focus on the interests of the users, especially the users' need for privacy.

## Product Design

* Features must be designed to comply with the above data processing principles, i.e., in particular, they must be designed to minimize the personal data to be processed and provide users with simple and effective control options.

## User interface (UI) / front end

* Data subjects must be able to easily exercise their rights via the user interface, i.e., to view their own data, correct it, restrict its processing, and request its deletion.
* Settings that affect privacy must be kept clear and simple. **Dark patterns** must not be used, e.g. to pressure users into consent (e.g. selection of a newsletter directly below confirmation of the terms and conditions).

## Infrastructure / Backend / Data management

* All personal data should only be stored in the system in encrypted or pseudonymized form. Where possible and appropriate, end-to-end encryption should be used so that data can only be decrypted on end devices of authorized users.
* Data structures and data storage must be designed in such a way that personal data can be corrected and deleted and the processing of data by data subjects can be easily controlled.

## Analytics & Data Science

Analytics & Data Science are important components of product development, as they enable us to understand and optimize the use of our products. However, the data collection required for this also entails data protection risks, which is why we take various measures to minimize these risks.

## Third-party supplier

