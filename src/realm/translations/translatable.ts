import { CrudModel } from '@wooportal/core';

export function Translatable(): (model: CrudModel, field: string) => void {
  return (model: CrudModel, field: string) => {
    Object.defineProperty(model.constructor, 'translatable', {
      value: ((model.constructor as any).translatable || []).concat(field),
      configurable: true
    });
  };
}
