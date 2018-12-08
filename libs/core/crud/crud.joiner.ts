import { Type } from '@angular/core';
import { CrudModel } from './crud.model';

export interface CrudGraph {
  model: Type<CrudModel>;
  nodes: CrudGraph[];
  root: boolean;
}

export class CrudJoiner {

  private joinGraph: CrudGraph;

  public static of(model: Type<CrudModel>, root?: boolean): CrudJoiner {
    const node = new this();
    node.joinGraph = {
      model: model,
      nodes: [],
      root: root !== false,
    };

    return node;
  }

  public get graph(): CrudGraph {
    return this.joinGraph;
  }

  public with(model: Type<CrudModel>): CrudJoiner {
    this.joinGraph.nodes.push({
      model: model,
      nodes: [],
      root: false
    });

    return this;
  }

  public yield(model: Type<CrudModel>): CrudJoiner {
    const filler = (node: CrudGraph) => Object.assign(node, {
      nodes: node.nodes.length
        ? node.nodes.map((child) => filler(child))
        : [{ model: model, nodes: [], root: false }]
    });

    this.joinGraph.nodes.push(filler(this.joinGraph.nodes.pop()));
    return this;
  }

  private constructor() { }

}
