"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@radix-ui+react-use-escape-keydown@1.0.3_@types+react@18.2.57_react@18.3.0";
exports.ids = ["vendor-chunks/@radix-ui+react-use-escape-keydown@1.0.3_@types+react@18.2.57_react@18.3.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@radix-ui+react-use-escape-keydown@1.0.3_@types+react@18.2.57_react@18.3.0/node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@radix-ui+react-use-escape-keydown@1.0.3_@types+react@18.2.57_react@18.3.0/node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs ***!
  \**********************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useEscapeKeydown: () => (/* binding */ $addc16e1bbe58fd0$export$3a72a57244d6e765)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/.pnpm/next@14.2.1_react-dom@18.3.0_react@18.3.0/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-use-callback-ref */ \"(ssr)/./node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.0.1_@types+react@18.2.57_react@18.3.0/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs\");\n\n\n\n\n\n/**\n * Listens for when the escape key is down\n */ function $addc16e1bbe58fd0$export$3a72a57244d6e765(onEscapeKeyDownProp, ownerDocument = globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) {\n    const onEscapeKeyDown = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__.useCallbackRef)(onEscapeKeyDownProp);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        const handleKeyDown = (event)=>{\n            if (event.key === 'Escape') onEscapeKeyDown(event);\n        };\n        ownerDocument.addEventListener('keydown', handleKeyDown);\n        return ()=>ownerDocument.removeEventListener('keydown', handleKeyDown)\n        ;\n    }, [\n        onEscapeKeyDown,\n        ownerDocument\n    ]);\n}\n\n\n\n\n\n//# sourceMappingURL=index.mjs.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJhZGl4LXVpK3JlYWN0LXVzZS1lc2NhcGUta2V5ZG93bkAxLjAuM19AdHlwZXMrcmVhY3RAMTguMi41N19yZWFjdEAxOC4zLjAvbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC11c2UtZXNjYXBlLWtleWRvd24vZGlzdC9pbmRleC5tanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQW9EO0FBQ3FDOzs7O0FBSXpGO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixnRkFBcUI7QUFDakQsSUFBSSxnREFBZ0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUt1RTtBQUN2RSIsInNvdXJjZXMiOlsid2VicGFjazovL2RpcGxvbS1jbGllbnQvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJhZGl4LXVpK3JlYWN0LXVzZS1lc2NhcGUta2V5ZG93bkAxLjAuM19AdHlwZXMrcmVhY3RAMTguMi41N19yZWFjdEAxOC4zLjAvbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC11c2UtZXNjYXBlLWtleWRvd24vZGlzdC9pbmRleC5tanM/ZDAyZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3VzZUVmZmVjdCBhcyAkaFBTUTUkdXNlRWZmZWN0fSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7dXNlQ2FsbGJhY2tSZWYgYXMgJGhQU1E1JHVzZUNhbGxiYWNrUmVmfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1jYWxsYmFjay1yZWZcIjtcblxuXG5cbi8qKlxuICogTGlzdGVucyBmb3Igd2hlbiB0aGUgZXNjYXBlIGtleSBpcyBkb3duXG4gKi8gZnVuY3Rpb24gJGFkZGMxNmUxYmJlNThmZDAkZXhwb3J0JDNhNzJhNTcyNDRkNmU3NjUob25Fc2NhcGVLZXlEb3duUHJvcCwgb3duZXJEb2N1bWVudCA9IGdsb2JhbFRoaXMgPT09IG51bGwgfHwgZ2xvYmFsVGhpcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZ2xvYmFsVGhpcy5kb2N1bWVudCkge1xuICAgIGNvbnN0IG9uRXNjYXBlS2V5RG93biA9ICRoUFNRNSR1c2VDYWxsYmFja1JlZihvbkVzY2FwZUtleURvd25Qcm9wKTtcbiAgICAkaFBTUTUkdXNlRWZmZWN0KCgpPT57XG4gICAgICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXZlbnQpPT57XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJykgb25Fc2NhcGVLZXlEb3duKGV2ZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgb3duZXJEb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5RG93bik7XG4gICAgICAgIHJldHVybiAoKT0+b3duZXJEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5RG93bilcbiAgICAgICAgO1xuICAgIH0sIFtcbiAgICAgICAgb25Fc2NhcGVLZXlEb3duLFxuICAgICAgICBvd25lckRvY3VtZW50XG4gICAgXSk7XG59XG5cblxuXG5cbmV4cG9ydCB7JGFkZGMxNmUxYmJlNThmZDAkZXhwb3J0JDNhNzJhNTcyNDRkNmU3NjUgYXMgdXNlRXNjYXBlS2V5ZG93bn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@radix-ui+react-use-escape-keydown@1.0.3_@types+react@18.2.57_react@18.3.0/node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs\n");

/***/ })

};
;