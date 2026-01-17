import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './types';

/**
 * Pre-typed dispatch hook
 * Use this hook instead of importing useDispatch in components
 * @returns Typed dispatch function with all your actions
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Pre-typed selector hook
 * Use this hook instead of importing useSelector in components
 * Provides auto-complete for state shape
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
