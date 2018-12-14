import { Type } from '@angular/core';
import { BaseService, ReadAllParams, ReadEmbeddedParams } from '../utils/api';
import { CrudModel } from './crud.model';
import { CrudProvider } from './crud.provider';

export interface CrudGraph {
  name: string;
  nodes: CrudGraph[];
  params?: ReadAllParams & ReadEmbeddedParams;
  provider?: CrudProvider<BaseService, CrudModel>;
}

export class CrudJoiner {

  private joinGraph: CrudGraph;

  public static of(model: Type<CrudModel>, params?: ReadAllParams): CrudJoiner {
    const node = new this();
    node.joinGraph = {
      name: null,
      nodes: [],
      params: params || { },
      provider: model['provider']
    };

    return node;
  }

  public get graph(): CrudGraph {
    return this.joinGraph;
  }

  public with(field: string, params?: ReadEmbeddedParams): CrudJoiner {
    this.joinGraph.nodes.push({
      name: field,
      nodes: [],
      params: params || { }
    });

    return this;
  }

  public yield(field: string, params?: ReadEmbeddedParams): CrudJoiner {
    const filler = (node: CrudGraph) => Object.assign(node, {
      nodes: node.nodes.length
        ? node.nodes.map((child) => filler(child))
        : [{ name: field, nodes: [], params: params || { } }]
    });

    this.joinGraph.nodes.push(filler(this.joinGraph.nodes.pop()));
    return this;
  }

  private constructor() { }

}
