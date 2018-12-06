import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, tap } from 'rxjs/operators';
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
    if (!model.constructor['provider']) { return; }
    const provider = this.injector.get(model.constructor['provider']);

    nodes.forEach(async (node) => {
      const crudLink = provider.system.linked
        .find((link) => link.model === node.model);

      let value; try {
        value = await provider.system.call(crudLink.method, model.id).pipe(
          map((response) => provider.system.cast(response, crudLink.model)),
          tap((response) => provider.system.purge(response))
        ).toPromise();
      } catch (error) { }

      if (value && node.nodes && node.nodes.length) {
        await this.resolver(value, node.nodes);
      }

      Object.defineProperty(model, crudLink.field, { value: value });
    });
  }

}
