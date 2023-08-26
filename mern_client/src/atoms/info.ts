import { atomWithReset } from 'jotai/utils';
import { Info } from '../types/info';

export const infoListAtom = atomWithReset<Info[]>([]);
export const selectedInfoAtom = atomWithReset<Info | null>(null);
