import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { CrudGraph } from './crud.joiner';
import { CrudModel } from './crud.model';

@Injectable({ providedIn: 'root' })
export class CrudResolver implements Resolve<CrudModel | CrudModel[]> {

  public constructor(
    private injector: Injector
  ) { }

  public async resolve(route: ActivatedRouteSnapshot):
    Promise<CrudModel | CrudModel[]> {

    const crudJoin = route.data[Object.keys(route.routeConfig.resolve)
      .find((key) => route.routeConfig.resolve[key] === this.constructor)];
    const provider = this.injector.get(crudJoin.graph.model['provider']);
    const response = route.params.uuid
      ? await provider.findOne(route.params.uuid)
      : await provider.findAll();

    if (Array.isArray(response)) {
      for (const model of response) {
        await this.resolver(model, crudJoin.graph.nodes);
      }
    } else {
      await this.resolver(response, crudJoin.graph.nodes);
    }

    return response;
  }

  private async resolver(model: CrudModel, nodes: CrudGraph[]): Promise<any> {
    if (!model.constructor['provider']) { return; }
    const provider = this.injector.get(model.constructor['provider']);

    for (const node of nodes) {
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
    }
  }

}
