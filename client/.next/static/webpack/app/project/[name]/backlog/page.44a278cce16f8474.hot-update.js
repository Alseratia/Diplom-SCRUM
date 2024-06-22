"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/project/[name]/backlog/page",{

/***/ "(app-pages-browser)/./src/components/task-card.tsx":
/*!**************************************!*\
  !*** ./src/components/task-card.tsx ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TaskCard: function() { return /* binding */ TaskCard; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/.pnpm/next@14.2.1_react-dom@18.3.0_react@18.3.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! framer-motion */ \"(app-pages-browser)/./node_modules/.pnpm/framer-motion@11.2.9_react-dom@18.3.0_react@18.3.0/node_modules/framer-motion/dist/es/render/dom/motion.mjs\");\n/* harmony import */ var _components_ui_drop_indicator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/ui/drop-indicator */ \"(app-pages-browser)/./src/components/ui/drop-indicator.tsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/.pnpm/next@14.2.1_react-dom@18.3.0_react@18.3.0/node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _ui_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui/dialog */ \"(app-pages-browser)/./src/components/ui/dialog.tsx\");\n/* harmony import */ var _barrel_optimize_names_Settings_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! __barrel_optimize__?names=Settings,X!=!lucide-react */ \"(app-pages-browser)/./node_modules/.pnpm/lucide-react@0.379.0_react@18.3.0/node_modules/lucide-react/dist/esm/icons/settings.js\");\n/* harmony import */ var _barrel_optimize_names_Settings_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! __barrel_optimize__?names=Settings,X!=!lucide-react */ \"(app-pages-browser)/./node_modules/.pnpm/lucide-react@0.379.0_react@18.3.0/node_modules/lucide-react/dist/esm/icons/x.js\");\n/* harmony import */ var _ui_checkbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui/checkbox */ \"(app-pages-browser)/./src/components/ui/checkbox.tsx\");\n/* harmony import */ var _ui_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui/input */ \"(app-pages-browser)/./src/components/ui/input.tsx\");\n/* harmony import */ var _ui_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui/button */ \"(app-pages-browser)/./src/components/ui/button.tsx\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @tanstack/react-query */ \"(app-pages-browser)/./node_modules/.pnpm/@tanstack+react-query@5.40.1_react@18.3.0/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tanstack/react-query */ \"(app-pages-browser)/./node_modules/.pnpm/@tanstack+react-query@5.40.1_react@18.3.0/node_modules/@tanstack/react-query/build/modern/useMutation.js\");\n/* harmony import */ var _app_project_name_backlog_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/app/project/[name]/backlog/actions */ \"(app-pages-browser)/./src/app/project/[name]/backlog/actions.ts\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/.pnpm/next@14.2.1_react-dom@18.3.0_react@18.3.0/node_modules/next/dist/api/navigation.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\n\nconst TaskCard = (param)=>{\n    let { token, title, column, id, handleDragStart, tasks } = param;\n    _s();\n    const { name } = (0,next_navigation__WEBPACK_IMPORTED_MODULE_8__.useParams)();\n    const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    const [input, setInput] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(\"\");\n    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__.useQueryClient)();\n    const { mutate: addTask } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_10__.useMutation)({\n        mutationFn: _app_project_name_backlog_actions__WEBPACK_IMPORTED_MODULE_7__.handleCreateStoryTask,\n        onSuccess: ()=>{\n            void queryClient.invalidateQueries({\n                queryKey: [\n                    \"user-stories\"\n                ]\n            });\n            void queryClient.invalidateQueries({\n                queryKey: [\n                    \"sprint-user-stories\"\n                ]\n            });\n            setInput(\"\");\n        }\n    });\n    const { mutate: deleteTask } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_10__.useMutation)({\n        mutationFn: _app_project_name_backlog_actions__WEBPACK_IMPORTED_MODULE_7__.handleDeleteStoryTask,\n        onSuccess: ()=>{\n            void queryClient.invalidateQueries({\n                queryKey: [\n                    \"user-stories\"\n                ]\n            });\n            void queryClient.invalidateQueries({\n                queryKey: [\n                    \"sprint-user-stories\"\n                ]\n            });\n            setInput(\"\");\n        }\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_drop_indicator__WEBPACK_IMPORTED_MODULE_1__.DropIndicator, {\n                beforeId: id,\n                column: column\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Divided_One\\\\Desktop\\\\prog\\\\diplom-client\\\\src\\\\components\\\\task-card.tsx\",\n                lineNumber: 75,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_11__.motion.div, {\n                draggable: \"true\",\n                layout: true,\n                layoutId: id,\n                //@ts-expect-error\n                onDragStart: (e)=>handleDragStart({\n                        e,\n                        card: {\n                            title,\n                            column,\n                            id\n                        }\n                    }),\n                className: \"flex cursor-grab items-center justify-between rounded-xl border border-neutral-800/60 bg-neutral-900/30 p-3 active:cursor-grabbing\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"text-sm text-neutral-300\",\n                        children: title\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Divided_One\\\\Desktop\\\\prog\\\\diplom-client\\\\src\\\\components\\\\task-card.tsx\",\n                        lineNumber: 84,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ui_dialog__WEBPACK_IMPORTED_MODULE_3__.Dialog, {\n                        open: isOpen,\n                        onOpenChange: setIsOpen,\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ui_dialog__WEBPACK_IMPORTED_MODULE_3__.DialogTrigger, {\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Settings_X_lucide_react__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n                                    color: \"#cacaca\",\n                                    size: 20\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Divided_One\\\\Desktop\\\\prog\\\\diplom-client\\\\src\\\\components\\\\task-card.tsx\",\n                                    lineNumber: 87,\n                                    columnNumber: 13\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Divided_One\\\\Desktop\\\\prog\\\\diplom-client\\\\src\\\\components\\\\task-card.tsx\",\n                                lineNumber: 86,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ui_dialog__WEBPACK_IMPORTED_MODULE_3__.DialogContent, {\n                                className: \"flex flex-col gap-10 border border-neutral-800/60 bg-neutral-950 px-8 py-6\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                        className: \"text-xl font-semibold text-neutral-300\",\n                                        children: [\n                                            \"Ивенты задачи \",\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                                className: \"text-neutral-200\",\n                                                children: title\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\Divided_One\\\\Desktop\\\\prog\\\\diplom-client\\\\src\\\\components\\\\task-card.tsx\",\n                                                lineNumber: 91,\n                                                columnNumber: 29\n                                            }, undefined)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"C:\\\\Users\\\\Divided_One\\\\Desktop\\\\prog\\\\diplom-client\\\\src\\\\components\\\\task-card.tsx\",\n                                        lineNumber: 90,\n                                        columnNumber: 13\n                                    }, undefined),\n                                    tasks.map((task)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                                            className: \"flex items-center gap-2\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                                className: \"flex w-full items-center justify-between gap-4 text-neutral-300\",\n                                                children: [\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                        className: \"flex items-center justify-center gap-2\",\n                                                        children: [\n                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ui_checkbox__WEBPACK_IMPORTED_MODULE_4__.Checkbox, {}, void 0, false, {\n                                                                fileName: \"C:\\\\Users\\\\Divided_One\\\\Desktop\\\\prog\\\\diplom-client\\\\src\\\\components\\\\task-card.tsx\",\n                                                                lineNumber: 97,\n                                                                columnNumber: 21\n                                                            }, undefined),\n                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                                                children: task.title\n                                                            }, void 0, false, {\n                                                                fileName: \"C:\\\\Users\\\\Divided_One\\\\Desktop\\\\prog\\\\diplom-client\\\\src\\\\components\\\\task-card.tsx\",\n                                                                lineNumber: 98,\n                                                                columnNumber: 21\n                                                            }, undefined)\n                                                        ]\n                                                    }, void 0, true, {\n                                                        fileName: \"C:\\\\Users\\\\Divided_One\\\\Desktop\\\\prog\\\\diplom-client\\\\src\\\\components\\\\task-card.tsx\",\n                                                        lineNumber: 96,\n                                                        columnNumber: 19\n                                                    }, undefined),\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Settings_X_lucide_react__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n                                                            color: \"#FF0000\"\n                                                        }, void 0, false, {\n                                                            fileName: \"C:\\\\Users\\\\Divided_One\\\\Desktop\\\\prog\\\\diplom-client\\\\src\\\\components\\\\task-card.tsx\",\n                                                            lineNumber: 101,\n                                                            columnNumber: 21\n                                                        }, undefined)\n                                                    }, void 0, false, {\n                                                        fileName: \"C:\\\\Users\\\\Divided_One\\\\Desktop\\\\prog\\\\diplom-client\\\\src\\\\components\\\\task-card.tsx\",\n                                                        lineNumber: 100,\n                                                        columnNumber: 19\n                                                    }, undefined)\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"C:\\\\Users\\\\Divided_One\\\\Desktop\\\\prog\\\\diplom-client\\\\src\\\\components\\\\task-card.tsx\",\n                                                lineNumber: 95,\n                                                columnNumber: 17\n                                            }, undefined)\n                                        }, task.id, false, {\n                                            fileName: \"C:\\\\Users\\\\Divided_One\\\\Desktop\\\\prog\\\\diplom-client\\\\src\\\\components\\\\task-card.tsx\",\n                                            lineNumber: 94,\n                                            columnNumber: 15\n                                        }, undefined)),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"flex w-full gap-4 border-t border-neutral-800/60 p-6\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ui_input__WEBPACK_IMPORTED_MODULE_5__.Input, {\n                                                placeholder: \"Название задачи\",\n                                                value: input,\n                                                onChange: (e)=>setInput(e.currentTarget.value),\n                                                className: \"text-neutral-950\"\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\Divided_One\\\\Desktop\\\\prog\\\\diplom-client\\\\src\\\\components\\\\task-card.tsx\",\n                                                lineNumber: 107,\n                                                columnNumber: 15\n                                            }, undefined),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ui_button__WEBPACK_IMPORTED_MODULE_6__.Button, {\n                                                onClick: ()=>{\n                                                    void addTask({\n                                                        title: input,\n                                                        storyId: id,\n                                                        projectName: name,\n                                                        token\n                                                    });\n                                                },\n                                                children: \"Добавить\"\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\Divided_One\\\\Desktop\\\\prog\\\\diplom-client\\\\src\\\\components\\\\task-card.tsx\",\n                                                lineNumber: 113,\n                                                columnNumber: 15\n                                            }, undefined)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"C:\\\\Users\\\\Divided_One\\\\Desktop\\\\prog\\\\diplom-client\\\\src\\\\components\\\\task-card.tsx\",\n                                        lineNumber: 106,\n                                        columnNumber: 13\n                                    }, undefined)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"C:\\\\Users\\\\Divided_One\\\\Desktop\\\\prog\\\\diplom-client\\\\src\\\\components\\\\task-card.tsx\",\n                                lineNumber: 89,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Divided_One\\\\Desktop\\\\prog\\\\diplom-client\\\\src\\\\components\\\\task-card.tsx\",\n                        lineNumber: 85,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Divided_One\\\\Desktop\\\\prog\\\\diplom-client\\\\src\\\\components\\\\task-card.tsx\",\n                lineNumber: 76,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true);\n};\n_s(TaskCard, \"K1zNxq7BwuI7l6W9eU8O9yR243U=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_8__.useParams,\n        _tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__.useQueryClient,\n        _tanstack_react_query__WEBPACK_IMPORTED_MODULE_10__.useMutation,\n        _tanstack_react_query__WEBPACK_IMPORTED_MODULE_10__.useMutation\n    ];\n});\n_c = TaskCard;\nvar _c;\n$RefreshReg$(_c, \"TaskCard\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL3Rhc2stY2FyZC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVDO0FBQ3dCO0FBQ2Q7QUFFa0I7QUFDeEI7QUFDRjtBQUNOO0FBQ0U7QUFDK0I7QUFJdEI7QUFDRjtBQWlCckMsTUFBTWdCLFdBQVc7UUFBQyxFQUN2QkMsS0FBSyxFQUNMQyxLQUFLLEVBQ0xDLE1BQU0sRUFDTkMsRUFBRSxFQUNGQyxlQUFlLEVBQ2ZDLEtBQUssRUFDSzs7SUFDVixNQUFNLEVBQUVDLElBQUksRUFBRSxHQUFHUiwwREFBU0E7SUFFMUIsTUFBTSxDQUFDUyxRQUFRQyxVQUFVLEdBQUd2QiwrQ0FBUUEsQ0FBQztJQUNyQyxNQUFNLENBQUN3QixPQUFPQyxTQUFTLEdBQUd6QiwrQ0FBUUEsQ0FBQztJQUVuQyxNQUFNMEIsY0FBY2hCLHFFQUFjQTtJQUVsQyxNQUFNLEVBQUVpQixRQUFRQyxPQUFPLEVBQUUsR0FBR25CLG1FQUFXQSxDQUFDO1FBQ3RDb0IsWUFBWWxCLG9GQUFxQkE7UUFDakNtQixXQUFXO1lBQ1QsS0FBS0osWUFBWUssaUJBQWlCLENBQUM7Z0JBQ2pDQyxVQUFVO29CQUFDO2lCQUFlO1lBQzVCO1lBQ0EsS0FBS04sWUFBWUssaUJBQWlCLENBQUM7Z0JBQ2pDQyxVQUFVO29CQUFDO2lCQUFzQjtZQUNuQztZQUNBUCxTQUFTO1FBQ1g7SUFDRjtJQUVBLE1BQU0sRUFBRUUsUUFBUU0sVUFBVSxFQUFFLEdBQUd4QixtRUFBV0EsQ0FBQztRQUN6Q29CLFlBQVlqQixvRkFBcUJBO1FBQ2pDa0IsV0FBVztZQUNULEtBQUtKLFlBQVlLLGlCQUFpQixDQUFDO2dCQUNqQ0MsVUFBVTtvQkFBQztpQkFBZTtZQUM1QjtZQUNBLEtBQUtOLFlBQVlLLGlCQUFpQixDQUFDO2dCQUNqQ0MsVUFBVTtvQkFBQztpQkFBc0I7WUFDbkM7WUFDQVAsU0FBUztRQUNYO0lBQ0Y7SUFFQSxxQkFDRTs7MEJBQ0UsOERBQUMxQix3RUFBYUE7Z0JBQUNtQyxVQUFVaEI7Z0JBQUlELFFBQVFBOzs7Ozs7MEJBQ3JDLDhEQUFDbkIsa0RBQU1BLENBQUNxQyxHQUFHO2dCQUNUQyxXQUFVO2dCQUNWQyxNQUFNO2dCQUNOQyxVQUFVcEI7Z0JBQ1Ysa0JBQWtCO2dCQUNsQnFCLGFBQWEsQ0FBQ0MsSUFBTXJCLGdCQUFnQjt3QkFBRXFCO3dCQUFHQyxNQUFNOzRCQUFFekI7NEJBQU9DOzRCQUFRQzt3QkFBRztvQkFBRTtnQkFDckV3QixXQUFVOztrQ0FFViw4REFBQ0M7d0JBQUVELFdBQVU7a0NBQTRCMUI7Ozs7OztrQ0FDekMsOERBQUNmLDhDQUFNQTt3QkFBQzJDLE1BQU10Qjt3QkFBUXVCLGNBQWN0Qjs7MENBQ2xDLDhEQUFDcEIscURBQWFBOzBDQUNaLDRFQUFDQyx1RkFBUUE7b0NBQUMwQyxPQUFNO29DQUFVQyxNQUFNOzs7Ozs7Ozs7OzswQ0FFbEMsOERBQUM3QyxxREFBYUE7Z0NBQUN3QyxXQUFVOztrREFDdkIsOERBQUNNO3dDQUFHTixXQUFVOzs0Q0FBeUM7MERBQ3ZDLDhEQUFDTztnREFBS1AsV0FBVTswREFBb0IxQjs7Ozs7Ozs7Ozs7O29DQUVuREksTUFBTThCLEdBQUcsQ0FBQyxDQUFDQyxxQkFDViw4REFBQ0M7NENBQWlCVixXQUFVO3NEQUMxQiw0RUFBQ1c7Z0RBQUdYLFdBQVU7O2tFQUNaLDhEQUFDUDt3REFBSU8sV0FBVTs7MEVBQ2IsOERBQUNwQyxrREFBUUE7Ozs7OzBFQUNULDhEQUFDMkM7MEVBQU1FLEtBQUtuQyxLQUFLOzs7Ozs7Ozs7Ozs7a0VBRW5CLDhEQUFDc0M7a0VBQ0MsNEVBQUNqRCx1RkFBQ0E7NERBQUN5QyxPQUFNOzs7Ozs7Ozs7Ozs7Ozs7OzsyQ0FQTkssS0FBS2pDLEVBQUU7Ozs7O2tEQVlsQiw4REFBQ2lCO3dDQUFJTyxXQUFVOzswREFDYiw4REFBQ25DLDRDQUFLQTtnREFDSmdELGFBQVk7Z0RBQ1pDLE9BQU9oQztnREFDUGlDLFVBQVUsQ0FBQ2pCLElBQU1mLFNBQVNlLEVBQUVrQixhQUFhLENBQUNGLEtBQUs7Z0RBQy9DZCxXQUFVOzs7Ozs7MERBRVosOERBQUNsQyw4Q0FBTUE7Z0RBQ0xtRCxTQUFTO29EQUNQLEtBQUsvQixRQUFRO3dEQUNYWixPQUFPUTt3REFDUG9DLFNBQVMxQzt3REFDVDJDLGFBQWF4Qzt3REFDYk47b0RBQ0Y7Z0RBQ0Y7MERBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU2YsRUFBRTtHQW5HV0Q7O1FBUU1ELHNEQUFTQTtRQUtOSCxpRUFBY0E7UUFFTkQsK0RBQVdBO1FBYVJBLCtEQUFXQTs7O0tBNUIvQksiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvdGFzay1jYXJkLnRzeD9jMDFlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1vdGlvbiB9IGZyb20gXCJmcmFtZXItbW90aW9uXCI7XHJcbmltcG9ydCB7IERyb3BJbmRpY2F0b3IgfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2Ryb3AtaW5kaWNhdG9yXCI7XHJcbmltcG9ydCB7IHVzZVN0YXRlLCB0eXBlIERyYWdFdmVudCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IFN0b3J5VGFzaywgVXNlclN0b3J5IH0gZnJvbSBcIkAvbGliL3R5cGVzXCI7XHJcbmltcG9ydCB7IERpYWxvZywgRGlhbG9nQ29udGVudCwgRGlhbG9nVHJpZ2dlciB9IGZyb20gXCIuL3VpL2RpYWxvZ1wiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncywgWCB9IGZyb20gXCJsdWNpZGUtcmVhY3RcIjtcclxuaW1wb3J0IHsgQ2hlY2tib3ggfSBmcm9tIFwiLi91aS9jaGVja2JveFwiO1xyXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuL3VpL2lucHV0XCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCIuL3VpL2J1dHRvblwiO1xyXG5pbXBvcnQgeyB1c2VNdXRhdGlvbiwgdXNlUXVlcnlDbGllbnQgfSBmcm9tIFwiQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5XCI7XHJcbmltcG9ydCB7XHJcbiAgaGFuZGxlQ3JlYXRlU3RvcnlUYXNrLFxyXG4gIGhhbmRsZURlbGV0ZVN0b3J5VGFzayxcclxufSBmcm9tIFwiQC9hcHAvcHJvamVjdC9bbmFtZV0vYmFja2xvZy9hY3Rpb25zXCI7XHJcbmltcG9ydCB7IHVzZVBhcmFtcyB9IGZyb20gXCJuZXh0L25hdmlnYXRpb25cIjtcclxuXHJcbnR5cGUgQ2FyZFByb3BzID0ge1xyXG4gIHRva2VuOiBzdHJpbmc7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBjb2x1bW46IHN0cmluZztcclxuICBpZDogc3RyaW5nO1xyXG4gIHRhc2tzOiBTdG9yeVRhc2tbXTtcclxuICBoYW5kbGVEcmFnU3RhcnQ6ICh7XHJcbiAgICBjYXJkLFxyXG4gICAgZSxcclxuICB9OiB7XHJcbiAgICBjYXJkOiBVc2VyU3Rvcnk7XHJcbiAgICBlOiBEcmFnRXZlbnQ8SFRNTERpdkVsZW1lbnQ+O1xyXG4gIH0pID0+IHZvaWQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgVGFza0NhcmQgPSAoe1xyXG4gIHRva2VuLFxyXG4gIHRpdGxlLFxyXG4gIGNvbHVtbixcclxuICBpZCxcclxuICBoYW5kbGVEcmFnU3RhcnQsXHJcbiAgdGFza3MsXHJcbn06IENhcmRQcm9wcykgPT4ge1xyXG4gIGNvbnN0IHsgbmFtZSB9ID0gdXNlUGFyYW1zKCk7XHJcblxyXG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2lucHV0LCBzZXRJbnB1dF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgY29uc3QgcXVlcnlDbGllbnQgPSB1c2VRdWVyeUNsaWVudCgpO1xyXG5cclxuICBjb25zdCB7IG11dGF0ZTogYWRkVGFzayB9ID0gdXNlTXV0YXRpb24oe1xyXG4gICAgbXV0YXRpb25GbjogaGFuZGxlQ3JlYXRlU3RvcnlUYXNrLFxyXG4gICAgb25TdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgIHZvaWQgcXVlcnlDbGllbnQuaW52YWxpZGF0ZVF1ZXJpZXMoe1xyXG4gICAgICAgIHF1ZXJ5S2V5OiBbXCJ1c2VyLXN0b3JpZXNcIl0sXHJcbiAgICAgIH0pO1xyXG4gICAgICB2b2lkIHF1ZXJ5Q2xpZW50LmludmFsaWRhdGVRdWVyaWVzKHtcclxuICAgICAgICBxdWVyeUtleTogW1wic3ByaW50LXVzZXItc3Rvcmllc1wiXSxcclxuICAgICAgfSk7XHJcbiAgICAgIHNldElucHV0KFwiXCIpO1xyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBtdXRhdGU6IGRlbGV0ZVRhc2sgfSA9IHVzZU11dGF0aW9uKHtcclxuICAgIG11dGF0aW9uRm46IGhhbmRsZURlbGV0ZVN0b3J5VGFzayxcclxuICAgIG9uU3VjY2VzczogKCkgPT4ge1xyXG4gICAgICB2b2lkIHF1ZXJ5Q2xpZW50LmludmFsaWRhdGVRdWVyaWVzKHtcclxuICAgICAgICBxdWVyeUtleTogW1widXNlci1zdG9yaWVzXCJdLFxyXG4gICAgICB9KTtcclxuICAgICAgdm9pZCBxdWVyeUNsaWVudC5pbnZhbGlkYXRlUXVlcmllcyh7XHJcbiAgICAgICAgcXVlcnlLZXk6IFtcInNwcmludC11c2VyLXN0b3JpZXNcIl0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBzZXRJbnB1dChcIlwiKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8RHJvcEluZGljYXRvciBiZWZvcmVJZD17aWR9IGNvbHVtbj17Y29sdW1ufSAvPlxyXG4gICAgICA8bW90aW9uLmRpdlxyXG4gICAgICAgIGRyYWdnYWJsZT1cInRydWVcIlxyXG4gICAgICAgIGxheW91dFxyXG4gICAgICAgIGxheW91dElkPXtpZH1cclxuICAgICAgICAvL0B0cy1leHBlY3QtZXJyb3JcclxuICAgICAgICBvbkRyYWdTdGFydD17KGUpID0+IGhhbmRsZURyYWdTdGFydCh7IGUsIGNhcmQ6IHsgdGl0bGUsIGNvbHVtbiwgaWQgfSB9KX1cclxuICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGN1cnNvci1ncmFiIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLW5ldXRyYWwtODAwLzYwIGJnLW5ldXRyYWwtOTAwLzMwIHAtMyBhY3RpdmU6Y3Vyc29yLWdyYWJiaW5nXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1uZXV0cmFsLTMwMFwiPnt0aXRsZX08L3A+XHJcbiAgICAgICAgPERpYWxvZyBvcGVuPXtpc09wZW59IG9uT3BlbkNoYW5nZT17c2V0SXNPcGVufT5cclxuICAgICAgICAgIDxEaWFsb2dUcmlnZ2VyPlxyXG4gICAgICAgICAgICA8U2V0dGluZ3MgY29sb3I9XCIjY2FjYWNhXCIgc2l6ZT17MjB9IC8+XHJcbiAgICAgICAgICA8L0RpYWxvZ1RyaWdnZXI+XHJcbiAgICAgICAgICA8RGlhbG9nQ29udGVudCBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0xMCBib3JkZXIgYm9yZGVyLW5ldXRyYWwtODAwLzYwIGJnLW5ldXRyYWwtOTUwIHB4LTggcHktNlwiPlxyXG4gICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LXNlbWlib2xkIHRleHQtbmV1dHJhbC0zMDBcIj5cclxuICAgICAgICAgICAgICDQmNCy0LXQvdGC0Ysg0LfQsNC00LDRh9C4IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtbmV1dHJhbC0yMDBcIj57dGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2gyPlxyXG4gICAgICAgICAgICB7dGFza3MubWFwKCh0YXNrKSA9PiAoXHJcbiAgICAgICAgICAgICAgPHVsIGtleT17dGFzay5pZH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJmbGV4IHctZnVsbCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHRleHQtbmV1dHJhbC0zMDBcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxDaGVja2JveCAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnt0YXNrLnRpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPFggY29sb3I9XCIjRkYwMDAwXCIgLz5cclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggdy1mdWxsIGdhcC00IGJvcmRlci10IGJvcmRlci1uZXV0cmFsLTgwMC82MCBwLTZcIj5cclxuICAgICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi0J3QsNC30LLQsNC90LjQtSDQt9Cw0LTQsNGH0LhcIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e2lucHV0fVxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRJbnB1dChlLmN1cnJlbnRUYXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1uZXV0cmFsLTk1MFwiXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZvaWQgYWRkVGFzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGlucHV0LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0b3J5SWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3ROYW1lOiBuYW1lIGFzIHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbixcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgINCU0L7QsdCw0LLQuNGC0YxcclxuICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L0RpYWxvZ0NvbnRlbnQ+XHJcbiAgICAgICAgPC9EaWFsb2c+XHJcbiAgICAgIDwvbW90aW9uLmRpdj5cclxuICAgIDwvPlxyXG4gICk7XHJcbn07XHJcbiJdLCJuYW1lcyI6WyJtb3Rpb24iLCJEcm9wSW5kaWNhdG9yIiwidXNlU3RhdGUiLCJEaWFsb2ciLCJEaWFsb2dDb250ZW50IiwiRGlhbG9nVHJpZ2dlciIsIlNldHRpbmdzIiwiWCIsIkNoZWNrYm94IiwiSW5wdXQiLCJCdXR0b24iLCJ1c2VNdXRhdGlvbiIsInVzZVF1ZXJ5Q2xpZW50IiwiaGFuZGxlQ3JlYXRlU3RvcnlUYXNrIiwiaGFuZGxlRGVsZXRlU3RvcnlUYXNrIiwidXNlUGFyYW1zIiwiVGFza0NhcmQiLCJ0b2tlbiIsInRpdGxlIiwiY29sdW1uIiwiaWQiLCJoYW5kbGVEcmFnU3RhcnQiLCJ0YXNrcyIsIm5hbWUiLCJpc09wZW4iLCJzZXRJc09wZW4iLCJpbnB1dCIsInNldElucHV0IiwicXVlcnlDbGllbnQiLCJtdXRhdGUiLCJhZGRUYXNrIiwibXV0YXRpb25GbiIsIm9uU3VjY2VzcyIsImludmFsaWRhdGVRdWVyaWVzIiwicXVlcnlLZXkiLCJkZWxldGVUYXNrIiwiYmVmb3JlSWQiLCJkaXYiLCJkcmFnZ2FibGUiLCJsYXlvdXQiLCJsYXlvdXRJZCIsIm9uRHJhZ1N0YXJ0IiwiZSIsImNhcmQiLCJjbGFzc05hbWUiLCJwIiwib3BlbiIsIm9uT3BlbkNoYW5nZSIsImNvbG9yIiwic2l6ZSIsImgyIiwic3BhbiIsIm1hcCIsInRhc2siLCJ1bCIsImxpIiwiYnV0dG9uIiwicGxhY2Vob2xkZXIiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwiY3VycmVudFRhcmdldCIsIm9uQ2xpY2siLCJzdG9yeUlkIiwicHJvamVjdE5hbWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/task-card.tsx\n"));

/***/ })

});