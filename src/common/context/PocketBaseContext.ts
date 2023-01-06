import { createGenericContext } from './GenericContext';
import PocketBase from 'pocketbase';
import appConfig from 'app.config';

const pb = new PocketBase(appConfig.pocketBase.serverAddress);
const product = createGenericContext<PocketBase>(pb);

export const PocketBaseContext = product.Context;
export const PocketBaseProvider = product.ContextProvider;
export const usePocketBaseContext = product.useContext;