import {CONST} from '@/src/const.ts';

export function make(keys: string[]) {
  return CONST.FORM.ITEMS.filter(item => keys.indexOf(item.id) >= 0);
}
