sfdc-merge-driver
==============

Merge salesforce metadata with ease

[![Version](https://img.shields.io/npm/v/sfdc-merge-driver.svg)](https://npmjs.org/package/sfdc-merge-driver)
[![CircleCI](https://circleci.com/gh/leboff/sfdc-merge-driver/tree/master.svg?style=shield)](https://circleci.com/gh/leboff/sfdc-merge-driver/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/leboff/sfdc-merge-driver?branch=master&svg=true)](https://ci.appveyor.com/project/leboff/sfdc-merge-driver/branch/master)
[![Codecov](https://codecov.io/gh/leboff/sfdc-merge-driver/branch/master/graph/badge.svg)](https://codecov.io/gh/leboff/sfdc-merge-driver)
[![Downloads/week](https://img.shields.io/npm/dw/sfdc-merge-driver.svg)](https://npmjs.org/package/sfdc-merge-driver)
[![License](https://img.shields.io/npm/l/sfdc-merge-driver.svg)](https://github.com/leboff/sfdc-merge-driver/blob/master/package.json)

<!-- toc -->
# Usage
<!-- usage -->
### Add Driver to .gitconfig
Add the following lines to your ~/.gitconfig file

```
[merge "sfdcm"]
	name = Merge Driver for Salesforce Metadata
	driver = sfdcm %O %A %B %P
```

### Add merge driver for SFDC metadata types in git attributes
Add the following to your gitattributes file. This can be your `<project-root>/.gitattributes` or `<project-root>/.git/info/attributes` files

```
*.object merge=sfdcm
*.profile merge=sfdcm
*.assignmentRules merge=sfdcm
*.sharingRules merge=sfdcm
*.permissionset merge=sfdcm
*.workflow merge=sfdcm
*.objectTranslations merge=sfdcm
*.translations merge=sfdcm
*.labels merge=sfdcm
*.standardValueSet merge=sfdcm
*.globalValueSet merge=sfdcm
```

# Commands

Test your tool is installed
`sfdcm --version`
