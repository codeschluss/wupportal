import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map } from 'rxjs/operators';
import { CrudGraph, CrudJoiner } from './crud.joiner';
import { CrudModel } from './crud.model';

@Injectable({ providedIn: 'root' })
export class CrudResolver implements Resolve<CrudModel | CrudModel[]> {

  private resolving: CrudJoiner[] = [];

  public constructor(
    private injector: Injector
  ) { }

  public async resolve(route: ActivatedRouteSnapshot):
    Promise<CrudModel | CrudModel[]> {

    const joiner = route.data[Object.keys(route.routeConfig.resolve)
      .filter((key) => route.routeConfig.resolve[key] === this.constructor)
      .filter((key) => route.data[key] instanceof CrudJoiner)
      .find((key) => !this.resolving.includes(route.data[key]))];

    this.resolving.push(joiner);
    const provider = this.injector.get(joiner.graph.model['provider']);
    const response = joiner.graph.root && route.params.uuid
      ? await provider.findOne(route.params.uuid)
      : await provider.findAll();

    Array.isArray(response)
      ? await response.map((model) => this.resolver(model, joiner.graph.nodes))
      : await this.resolver(response, joiner.graph.nodes);

    this.resolving.splice(this.resolving.indexOf(joiner), 1);
    return response;
  }

  private async resolver(model: CrudModel, nodes: CrudGraph[]): Promise<any> {
    if (model.constructor['provider']) {
      const provider = this.injector.get(model.constructor['provider']).system;

      for (const node of nodes) {
        const link = provider.linked.find((lnk) => lnk.model === node.model);

        let value; try {
          value = (model._embedded || { })[link.field]
            ? Object.assign(new link.model(), model._embedded[link.field])
            : await provider.call(link.method, model.id).pipe(map(
              (response) => provider.cast(response, link.model))).toPromise();
        } catch (error) { }

        if (value) {
          if (node.nodes.length) { await this.resolver(value, node.nodes); }
          provider.purge(value);
        }

        Object.defineProperty(model, link.field, { value: value });
      }
    }
  }

}
