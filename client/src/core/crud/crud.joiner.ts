import { Type } from '@angular/core';
import { CrudModel } from './crud.model';

export interface CrudGraph {
  model: Type<CrudModel>;
  nodes: CrudGraph[];
}

export class CrudJoiner {

  private joinGraph: CrudGraph;

  public static of(model: Type<CrudModel>): CrudJoiner {
    const root = new this();
    root.joinGraph = {
      model: model,
      nodes: []
    };

    return root;
  }

  public get graph(): CrudGraph {
    return this.joinGraph;
  }

  public with(model: Type<CrudModel>): CrudJoiner {
    this.joinGraph.nodes.push({
      model: model,
      nodes: null
    });

    return this;
  }

  public yield(model: Type<CrudModel>): CrudJoiner {
    const filler = (node: CrudGraph) => Object.assign(node, {
      nodes: node.nodes
        ? node.nodes.map((child) => filler(child))
        : [{ model: model, nodes: null }]
    });

    this.joinGraph.nodes.push(filler(this.joinGraph.nodes.pop()));
    return this;
  }

  private constructor() { }

}
