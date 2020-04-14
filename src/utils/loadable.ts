import { lazy } from 'react';
import { injectReducer } from '@store/index';
import { CreateSliceOptions, Slice, SliceCaseReducers } from '@reduxjs/toolkit';

const modulesFiles = require.context('@src/pages', true, /module.ts$/);
const paths = modulesFiles.keys();

function capture<T>(fn: () => Promise<{ default: T }>) {
  const promise = fn();
  return promise;
}

const moduleDefaultExport = (module: any) => module.default || module;

function loadable(str: string) {
  return lazy(() => {
    const path = `./${str}/module.ts`;
    if (paths.includes(path)) {
      capture(() => import(`@src/pages/${str}/module.ts`)).then(mod => {
        const slice = moduleDefaultExport(mod);
        const { reducer, name } = slice;
        injectReducer(name, reducer);
      });
    }
    return import(`@src/pages/${str}`);
  });
}

export default loadable;
