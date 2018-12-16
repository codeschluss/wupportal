import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { forkJoin, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CrudGraph, CrudJoiner } from './crud.joiner';
import { CrudModel } from './crud.model';

@Injectable({ providedIn: 'root' })
export class CrudResolver implements Resolve<CrudModel | CrudModel[]> {

  private resolving: CrudJoiner[] = [];

  public refine(input: CrudModel | CrudModel[], graph: CrudGraph):
    Observable<CrudModel | CrudModel[]> {

    return Array.isArray(input)
      ? forkJoin(...input.map((item) => from(this.run(item, graph.nodes))))
      : from(this.run(input, graph.nodes));
  }

  public async resolve(route: ActivatedRouteSnapshot):
    Promise<CrudModel | CrudModel[]> {

    const joiner = route.data[Object.keys(route.routeConfig.resolve)
      .filter((key) => route.routeConfig.resolve[key] === this.constructor)
      .filter((key) => route.data[key] instanceof CrudJoiner)
      .find((key) => !this.resolving.includes(route.data[key]))];
    this.resolving.push(joiner);

    joiner.graph.params.embeddings = CrudJoiner.to(joiner.graph);
    const response = joiner.graph.params.filter !== null && route.params.uuid
      ? await joiner.graph.provider.readOne(route.params.uuid).toPromise()
      : await joiner.graph.provider.readAll(joiner.graph.params).toPromise();

    for (const item of Array.isArray(response) ? response : [response]) {
      await this.run(item, joiner.graph.nodes);
    }

    this.resolving.splice(this.resolving.indexOf(joiner), 1);
    return response;
  }

  private async run(item: CrudModel, nodes: CrudGraph[]): Promise<CrudModel> {
    if (item.constructor['provider']) {
      const provider = item.constructor['provider'].system;

      for (const node of nodes) {
        const link = provider.linked.find((lnk) => lnk.field === node.name);

        if (link) {
          let value = null;

          if ((item._embedded || {})[link.field]) {
            value = Object.assign(new link.model(), item._embedded[link.field]);
          } else {
            const params = [
              item.id,
              node.params.sort,
              node.params.dir,
              CrudJoiner.to(node)
            ];

            try {
              value = await provider.call(link.method, ...params).pipe(map(
                (response) => provider.cast(response, link.model))).toPromise();
            } catch (error) { }
          }

          if (value && node.nodes.length) {
            for (const itm of Array.isArray(value) ? value : [value]) {
              await this.run(itm, node.nodes);
            }
          }

          Object.defineProperty(item, link.field, { value: value });
        }
      }
    }

    return item;
  }

}
