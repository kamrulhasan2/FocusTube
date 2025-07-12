import { createStore } from 'easy-peasy'
import { playlistsModel } from './models';
import { createTypedHooks } from 'easy-peasy';

const storeModel = {
  app: playlistsModel,
};

export const store = createStore(storeModel);

const typedHooks = createTypedHooks(); 

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

