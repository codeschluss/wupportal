import { CrudModel } from '@wooportal/core';

export function Translatable() {
  return function(model: CrudModel, field: string): void {
    Object.defineProperty(model.constructor, 'translatable', {
      value: (model.constructor['translatable'] || []).concat(field),
      configurable: true
    });
  };
}
