# test-task-qa  
This is completed QA test task. All original 9 test cases are automated + created and automated additional 5 test cases (marked as "Bonus" ones).  
**Original test cases list:** [TestCases](https://testluxequality.sharepoint.com/:x:/s/Mentors/EdKKAdQM7uRGgdG-zFoeXdEBYSo3Gg_YRlAX6WaC1imLuQ?rtime=v2Tp0-6120g)  
**Tested website:** [saucedemo.com](https://www.saucedemo.com/)  
**Test execution states (original + bonus):** [drive.google.com](https://drive.google.com/drive/folders/18cHhHZqm-bD0AMXwOfM7cnaKUiEoJ366)  
## Setup:  
1. Clone this repo;  
2. Execute `npm install` in terminal;  
3. In terminal, enter `npm run wdio` to launch all test cases, or `npm run wdio -- --spec test-caseX.js`/`npm run wdio -- --spec test-case-bonusX.js` to launch specific ones.  
## Known issues:  
As it stated in the test execution states, `test-case9.js` and `test-case-bonus4.js` will fail. For details, refer to execution states.  
It's recommended to launch specific tests on low-end PCs/laptops instead of all at once, because some of them may not pass correctly due to timeouts/pauses and CPU/RAM load.  