# Zip Code Parser (Node/JS)

This is an sample project written to demonstrate a problem in which a user provides multiple ranges of zip codes. Our goal is to compact those zip codes for any redundancies over overlaps that may appear.

Example, the user provides [62864,62864] [95811,95816] [95812,95825]. The user is returned
[62864,62864] [95811,95825].


## How to use
This was written under Node v9.3.0. 

The commandline interface for this application was not fully developed out, as the original project specification was to be Java and this project was written as a prototype. As such, this implementation does not have a functional CLI. For this prototype, you may enter your data by modifying the zipCodeRanges variable at the top of app.js


## Special notes
- This project was written as a prototype for the Java based variant of this application. This particular verison of the application does not accept commandline arguments, and simply parses an array in the app.js file.
- The example project specification is not thorough in it's explanation regarding ranges. For example, it does not state if negative ranges (e.g. [94040,95825]) are invalid input. Reasonably speaking, the options here are either to error if negative ranges are found, or instead to reverse the inputs for the user. In our example, a very basic reverse sanity check is put in through the collapsing process. This collapse process works for our intention of a single-runthrough instance, but is not thorough in it's sanity checks. A proper implementation should ensure sanity checks more aggressively (such as the user modifying the ranges with setters )
- My language of preference with development is to use JavaScript and NodeJS. However, this project's original intent was to be written in Java, and as such, not all Node or JavaScript best practices may be used as some adapations or concepts intended on conforming to Java code implementations may be used.
