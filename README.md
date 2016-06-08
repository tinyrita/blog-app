# Intro

## About
项目地址
- blog-app https://github.com/tinyrita/blog-app

后端API项目地址
- blog-api https://github.com/tinyrita/blog-api

API文档地址
- blog-doc http://localhost:80/doc/index.html

该项目是tinyrita的博客作业。

基于angular 2实现诸多控件、模块、组件的集中仓库，便于APP项目复用，以及APP开发规范的统一性。

采用swagger标准及RESTful规范构建博客通用API SDK。

采用ECMAScript2015规范构建博客客户端应用。


## Table of Contents
 - [Getting Started](#getting-started)
 - [Contributing](#contributing)
 - [Use Cases](#use-cases)
 - [File Structure of App](#file-structure-of-app)


# Getting Started
## Installation

``` sh
git clone https://git.oschina.net/anasit/anas_app

cd anas_app

npm install

ionic serve -l
```

# Tech Tree
General Language:
- ES6/ECMAScript2015
- HTML5
- CSS3

Framework:
- Angularjs 2
- Ionic 2
- Cordova


## File Structure of App

```
ionic-conference-app/
├── .github/                           * GitHub files
│   ├── CONTRIBUTING.md                * Documentation on contributing to this repo
│   └── ISSUE_TEMPLATE.md              * Template used to populate issues in this repo
|
├── app/                               * Working directory
│   ├── pages/                         * Contains all of our pages
│   │   ├── about/                     * About tab page
│   │   │    ├── about.html            * AboutPage template
│   │   │    └── about.js              * AboutPage code
│   │   │    └── about.scss            * AboutPage stylesheet
│   │   │
│   │   │── login/                     * Login page
│   │   │    ├── login.html            * LoginPage template
│   │   │    └── login.js              * LoginPage code
│   │   │    └── login.scss            * LoginPage stylesheet
│   │   │
│   │   │── map/                       * Map tab page
│   │   │    ├── map.html              * MapPage template
│   │   │    └── map.js                * MapPage code
│   │   │    └── map.scss              * MapPage stylesheet
│   │   │
│   │   │── signup/                    * Signup page
│   │   │    ├── signup.html           * SignupPage template
│   │   │    └── signup.js             * SignupPage code
│   │   │
│   │   │── tabs/                      * Tabs page
│   │   │    ├── tabs.html             * TabsPage template
│   │   │    └── tabs.js               * TabsPage code
│   │   │
│   │   └── tutorial/                  * Tutorial Intro page
│   │        ├── tutorial.html         * TutorialPage template
│   │        └── tutorial.js           * TutorialPage code
│   │        └── tutorial.scss         * TutorialPage stylesheet
│   │
│   ├── providers/                     * Contains all Injectables
│   │   ├── conference-data.js         * ConferenceData code
│   │   └── user-data.js               * UserData code
│   │
│   ├── theme/                         * App theme files
│   │   ├── app.core.scss              * App Shared Sass Imports
│   │   ├── app.ios.scss               * iOS Sass Imports & Variables
│   │   ├── app.md.scss                * Material Design Sass Imports & Variables
│   │   ├── app.variables.scss         * App Shared Sass Variables
│   │   └── app.wp.scss                * Windows Sass Imports & Variables
│   │
│   ├── app.html                       * Application template
│   └── app.js                         * Main Application configuration
│
├── node_modules/                      * Node dependencies
|
├── platforms/                         * Cordova generated native platform code
|
├── plugins/                           * Cordova native plugins go
|
├── resources/                         * Images for splash screens and icons
|
├── www/                               * Folder that is copied over to platforms www directory
│   │   
│   ├── build/                         * Contains auto-generated compiled content
│   │     ├── css/                     * Compiled CSS
│   │     ├── fonts/                   * Copied Fonts
│   │     ├── js/                      * ES5 compiled JavaScript
│   │     ├── pages/                   * Copied html pages
│   │     └── app.html                 * Copied app entry point
│   │
│   ├── data/                          * Contains data used for the app
│   │     └── data.json                * App data
│   │
│   ├── img/                           * App images
│   │
│   └── index.html                     * Main entry point
|
├── .editorconfig                      * Defines coding styles between editors
├── .gitignore                         * Example git ignore file
├── config.xml                         * Cordova configuration file
├── ionic.config.json                  * Ionic configuration file
├── LICENSE                            * Apache License
├── package.json                       * Our javascript dependencies
└── README.md                          * This file
```


# Contributor

- [tinyrita](https://github.com/tinyrita), Frontend Engineer .
- CIO [ryanemax](https://ryanamax.github.io/), The Founder.

# Copyright

http://www.anasit.com

Copyright © 2015 ANAS IT Inc. All Rights Reserved
