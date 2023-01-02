import { createGenericContext } from 'src/common/context/_exports';
import { FormState } from './types';

const product = createGenericContext<FormState>();

export const FormStateContext = product.Context;
export const FormStateProvider = product.ContextProvider;
export const useFormStateContext = product.useContext;