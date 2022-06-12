# Master Thesis 

# Heuristic detection of phishing attacks

This repository contains the source codes for the master thesis. 

Directory logic/ contains the source code for 1st
version of extension for web browser Google Chrome.
There are proper .crx file and private key in .pem.

Directory Package/ contains the source code for 2nd
version of extension for web browser Google Chrome. 
There are proper .crx file and private key in .pem.

Directory project/ contains the Java Spring Boot project
that enables testing where you can define to test 1 URL address 
or you can define more url addresses with variables and pass it to
Selenium Framework and you test it with two versions of web browser extensions
that was mentioned above.

Directory Automated/ contains the Java Spring Boot project 
that enables also testing but in this folder testing is testing with CSV file, 
where are stored phishing URL addresses and there is and 10s delay between 
testing URL address per URL address. 

## System requirements:
IntelliJ Idea Ultimate or any other IDE that supports Spring Boot \
Java JDK 17 \
Maven v3.8.5 \
Node JS 16.14.2 \
ChromeDriver

## Documentation:
Documentations for web browser extenstions is in every specific 
folder that was mentioned in text higher. 

Documentation for every web browser extension is in folder jsdoc/

## How to compile JS documentation: 


Open terminal and open Visual Studio Code for any
other text editor and then update some comments in source code.

`$ cd jsdoc/out/scripts/; code .`

Open second terminal and go to the proper directory:

`$ cd jsdoc/out/scripts/`

Regenerate HTML pages after some changes and choose file that
you have updated: 

for example: 

`$ jsdoc doc.json extenstionListener.js`

or

`$ jsdoc doc.json logic2.js`

## Documentation for every version of web browser extensions is in folder hierarchy: 

`jsdoc/out/scripts/out/`

In this folder are generated HTML pages with documentation. 

## Documentation for Java Spring Boot projects:

Documentation is in:

`project/target/site/apidocs/`

and

`Automateds/target/site/apidocs/`

## How to compile documentation for Java Spring Boot:

`$ cd Automated\`

or

`$ cd project\`

And then is needed to pass maven command to generate javadoc: 

`$ mvn javadoc:javadoc`

The documentation is then generated in `project/target/site/apidocs/`
