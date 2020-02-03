import { Type } from '@angular/core';
import { BaseService, ReadParams } from '../tools/api';
import { Base64 } from '../tools/base64';
import { CrudModel } from './crud.model';
import { CrudProvider } from './crud.provider';

export interface CrudGraph {
  name: string;
  nodes: CrudGraph[];
  params?: ReadParams;
  provider?: CrudProvider<BaseService, CrudModel>;
}

export class CrudJoiner {

  private joinGraph: CrudGraph;

  public static of(model: Type<CrudModel>, params?: ReadParams): CrudJoiner {
    return Object.assign(new this(), {
      joinGraph: {
        name: null,
        nodes: [],
        params: params || { },
        provider: (model as any).provider
      }
    });
  }

  public static to(tree: CrudGraph): string {
    const builder = (nodes) => nodes.map((node) => ({
      name: node.name,
      nodes: builder(node.nodes)
    }));

    return tree.nodes.length
      ? Base64.encode(JSON.stringify(builder(tree.nodes)))
      : null;
  }

  public get graph(): CrudGraph {
    const merger = (nodes, node) => nodes.filter((n) => n.name !== node.name)
      .concat(nodes.filter((n) => n.name === node.name).reduce((a, b) =>
        Object.assign(a, { nodes: a.nodes.concat(b.nodes) }), node));

    const grapher = (graph: CrudGraph) => {
      graph.nodes = graph.nodes.map((node) => grapher(node));
      graph.nodes = graph.nodes.reduce((nodes, node) => {
        return nodes.some((n) => n.name === node.name)
          ? merger(nodes, node)
          : nodes.concat(node);
      }, []);

      return graph;
    };

    return grapher(this.joinGraph);
  }

  public with(field: string, params?: ReadParams): CrudJoiner {
    this.joinGraph.nodes.push({
      name: field,
      nodes: [],
      params: params || { }
    });

    return this;
  }

  public yield(field: string, params?: ReadParams): CrudJoiner {
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
