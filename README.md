Learn Redux by testing (zoo)
============================

You can learn Redux by running tests on this repository
and creating the source required for solving tests one by one.


Setup
-----

1. Clone this repository

2. Install dependencies
   ```bash
   $ npm install
   ```

3. Start Project
   ```bash
   $ npm start
   ```


Firsts steps
-------------

Once opened you will see tens of tests failing.
Your task is make them pass.

Tests are inside spec/ directory. 

It consist in a small project that you have to code.
All tests are provided, you should make them pass
by providing code into the src folder. 
You should not modify any spec under any circumstance.

Specs are numbered, you should solve them in order starting at 0.


Jest
----

Jest is the test runner used here. 
It is really simple and fast.

If you start the project you will see a large number of
tests failing. You will solve them, but so many errors
may distract you. 

To focus in a test you can:

1. Ask to filter by filename regex pattern: 
   for example, use the number of the current test that you are solving.

2. Use force test: replace `it(...)` by `fit(...)` 
  (just and f before the test) to the test that you want to solve,
  it will ignore all other tests and you will focus on that.

