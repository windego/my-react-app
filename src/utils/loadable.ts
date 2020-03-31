import { lazy, ComponentType } from 'react';
import { ReducersMapObject } from 'redux';
// import { injectReducer } from '@store/index';
import Module from 'module';
import { CreateSliceOptions, Slice, SliceCaseReducers } from '@reduxjs/toolkit';

const modulesFiles = require.context('@src/pages', true, /module.ts$/);
const paths = modulesFiles.keys();
function capture<T>(fn: () => Promise<{ default: T }>) {
  const promise = fn();
  return promise;
}

const moduleDefaultExport = (module: any) => module.default || module;

// function loadable(str: string) {
//   // console.log(str);
//   const name = str;
//   const path = `./${str}/module.ts`;
//   if (paths.includes(path)) {
//     capture(() => import(`@src/pages/${str}/module.ts`)).then(mod => {
//       // console.log(mod);

//       const reducers = moduleDefaultExport(mod);
//       // const module = modulesFiles(path);
//       // const obj: ReducersMapObject = {};
//       // obj[name] = module.default;
//       injectReducer(name, reducers);
//       // const reducers = moduleDefaultExport(mod);
//       // console.log(reducers);
//       // injectReducer(mod.default.reducer, reducers);
//     });
//   }

//   return lazy(() => import(`@src/pages/${str}`));
// }

// export default loadable;

// function loadable(str: string) {
//   // console.log(str);
//   const name = str;
//   const path = `./${str}/module.ts`;
//   try {
//     const module = modulesFiles(path);
//     const obj: ReducersMapObject = {};
//     obj[name] = module.default;
//     injectReducer(obj);
//   } catch (e) {
//     console.log('没有');
//   }
//   return lazy(() => import(`@src/pages/${str}`));
// }

// export default loadable;
