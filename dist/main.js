/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './areaChartRenderer'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './3dRenderer'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './dataFetcher'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\n\n\n\n// import \"./dataFetcher\";\n// renderAreaChart(appleData);\n\n// console.log(allData);\nasync function renderAllCharts() {\n  const allData = await Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './dataFetcher'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(\"./population.csv\");\n\n  for (let i = 0; i < allData.length; i++) {\n    await Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './areaChartRenderer'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(allData[i]);\n    // console.log(allData);\n  }\n\n  // await renderAreaChart(\"./ind.csv\");\n  // await renderAreaChart(\"./usa.csv\");\n  await Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './3dRenderer'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(allData);\n}\nrenderAllCharts();\n\n// svgDataUri.then((uri) => {\n//   render3dChart(uri);\n// });\n// render3dChart(\"a\");\n\n\n//# sourceURL=webpack://3d-vis-1/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;