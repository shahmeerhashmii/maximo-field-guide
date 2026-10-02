---
title: '4. From Maximo 7.6 to MAS'
pathName: '4. From Maximo 7.6 to MAS'
pathSlug: '4-from-maximo-7-6-to-mas'
stepCount: 15
steps:
  - step: 1
    term: 'Maximo Asset Management 7.6 (Legacy Maximo)'
    slug: 'maximo-asset-management-7-6-legacy-maximo'
    definition: 'The previous generation of Maximo, run as a single application on traditional application servers. It is the version most long-time users learned on.'
  - step: 2
    term: 'Maximo Application Suite (MAS)'
    slug: 'maximo-application-suite-mas'
    definition: 'IBM''s current platform for Maximo. It brings Manage (the classic Maximo EAM) together with monitoring, health, prediction, visual inspection, mobile and more, under one login and one licensing model.'
  - step: 3
    term: 'Maximo Manage'
    slug: 'maximo-manage'
    definition: 'The core application in MAS for asset, work, inventory, purchasing and service management. Most of what people mean by ''Maximo'' lives here.'
  - step: 4
    term: 'Upgrade (7.6 to MAS)'
    slug: 'upgrade-7-6-to-mas'
    definition: 'Moving an existing Maximo 7.6 system and its data and customizations onto MAS. It involves new infrastructure, a database upgrade, reviewing customizations and retraining users.'
  - step: 5
    term: 'Red Hat OpenShift'
    slug: 'red-hat-openshift'
    definition: 'The Kubernetes-based container platform MAS runs on. It lets MAS run the same way on-premises or in any major cloud.'
  - step: 6
    term: 'Container / Microservices'
    slug: 'container-microservices'
    definition: 'MAS is broken into many smaller services running in containers instead of one large application. This makes updates and scaling more flexible.'
  - step: 7
    term: 'Operator'
    slug: 'operator'
    definition: 'A piece of software on OpenShift that installs, configures and updates an application automatically. MAS and each of its apps are managed by operators.'
  - step: 8
    term: 'MAS Core / Suite Administration'
    slug: 'mas-core-suite-administration'
    definition: 'The central part of MAS that handles users, workspaces, application entitlement, configuration and the suite navigator.'
  - step: 9
    term: 'Workspace'
    slug: 'workspace'
    definition: 'A space inside a MAS instance where applications are deployed and used together. Applications in the same workspace share data and users.'
  - step: 10
    term: 'AppPoints'
    slug: 'apppoints'
    definition: 'MAS''s licensing currency. Customers buy a pool of AppPoints and spend them on users and some applications, instead of buying separate licenses for each product.'
  - step: 11
    term: 'User Entitlement Type (Limited / Base / Premium)'
    slug: 'user-entitlement-type-limited-base-premium'
    definition: 'Each MAS user is assigned an access level that sets what they can use and how many AppPoints they consume. Limited covers narrower roles, Base covers most Manage use, and Premium covers industry solutions and add-ons.'
  - step: 12
    term: 'Authorized vs Concurrent User'
    slug: 'authorized-vs-concurrent-user'
    definition: 'Authorized users have dedicated access and always reserve AppPoints. Concurrent users share a pool and only use AppPoints while logged in, at a higher rate.'
  - step: 13
    term: 'Maximo Mobile'
    slug: 'maximo-mobile'
    definition: 'IBM''s mobile app for MAS that lets field workers view and complete work, inspections and other tasks on phones and tablets, online or offline.'
  - step: 14
    term: 'Role-based Application'
    slug: 'role-based-application'
    definition: 'Modern, task-focused apps for specific jobs like technician, supervisor or inspector, built on MAF and usable in browser or on mobile.'
  - step: 15
    term: 'Unified Navigation'
    slug: 'unified-navigation'
    definition: 'A newer MAS navigation bar that brings apps from across the suite into one consistent menu.'
template: doc
---
