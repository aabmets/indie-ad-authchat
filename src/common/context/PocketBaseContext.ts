import { createGenericContext } from 'src/common/context/_exports';
import PocketBase from 'pocketbase';
import appConfig from 'app.config';

const pb = new PocketBase(appConfig.pocketBase.serverAddress);
const product = createGenericContext<PocketBase>(pb);

export const PocketBaseContext = product.Context;
export const PocketBaseProvider = product.ContextProvider;
export const usePocketBaseContext = product.useContext;