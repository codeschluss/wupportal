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
    const merger = (nodes, node) => nodes.filter((nd) => nd.name !== node.name)
      .concat(nodes.filter((nd) => nd.name === node.name).reduce((a, b) =>
        Object.assign(a, { nodes: a.nodes.concat(b.nodes) }), node));

    const grapher = (graph: CrudGraph) => {
      graph.nodes = graph.nodes.map((node) => grapher(node));
      graph.nodes = graph.nodes.reduce((nodes, node) => {

      return nodes.some((nd) => nd.name === node.name)
        ? merger(nodes, node)
        : nodes.concat(node);
      }, []);

      return graph;
    };

    return grapher(this.joinGraph);
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
    const yielder = (graph: CrudGraph) => Object.assign(graph, {
      nodes: graph.nodes.length
        ? graph.nodes.map((child) => yielder(child))
        : [{ name: field, nodes: [], params: params || { } }]
    });

    this.joinGraph.nodes.push(yielder(this.joinGraph.nodes.pop()));
    return this;
  }

  private constructor() { }

}
