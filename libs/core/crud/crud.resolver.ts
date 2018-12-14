import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map } from 'rxjs/operators';
import { CrudGraph, CrudJoiner } from './crud.joiner';
import { CrudModel } from './crud.model';

@Injectable({ providedIn: 'root' })
export class CrudResolver implements Resolve<CrudModel | CrudModel[]> {

  private resolving: CrudJoiner[] = [];

  public async resolve(route: ActivatedRouteSnapshot):
    Promise<CrudModel | CrudModel[]> {

    const joiner = route.data[Object.keys(route.routeConfig.resolve)
      .filter((key) => route.routeConfig.resolve[key] === this.constructor)
      .filter((key) => route.data[key] instanceof CrudJoiner)
      .find((key) => !this.resolving.includes(route.data[key]))];

    this.resolving.push(joiner);
    joiner.graph.params.embeddings = this.embed(joiner.graph.nodes);
    const response = joiner.graph.params.filter !== null && route.params.uuid
      ? await joiner.graph.provider.readOne(route.params.uuid)
      : await joiner.graph.provider.readAll(joiner.graph.params);

    for (const item of Array.isArray(response) ? response : [response]) {
      await this.resolver(item, joiner.graph.nodes);
    }

    this.resolving.splice(this.resolving.indexOf(joiner), 1);
    return response;
  }

  private async resolver(item: CrudModel, nodes: CrudGraph[]): Promise<any> {
    if (item.constructor['provider']) {
      const provider = item.constructor['provider'].system;

      for (const node of nodes) {
        const link = provider.linked.find((lnk) => lnk.field === node.name);
        let value;

        if ((item._embedded || {})[link.field]) {
          value = Object.assign(new link.model(), item._embedded[link.field]);
        } else {
          const params = [
            item.id,
            node.params.sort,
            node.params.dir,
            this.embed(node.nodes)
          ];

          try {
            value = await provider.call(link.method, ...params).pipe(map(
              (response) => provider.cast(response, link.model))).toPromise();
          } catch (error) { }
        }

        if (value && node.nodes.length) {
          await this.resolver(value, node.nodes);
        }

        Object.defineProperty(item, link.field, { value: value });
      }
    }
  }

  private embed(tree: CrudGraph[]): string {
    const embed = (nodes) => nodes.map((node) => ({
      name: node.name,
      nodes: embed(node.nodes)
    }));

    return btoa(JSON.stringify(embed(tree)));
  }

}
