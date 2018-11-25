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

    const join = route.data[Object.keys(route.routeConfig.resolve)
      .find((key) => route.routeConfig.resolve[key] === this.constructor)];

    const provider = this.injector.get(join.graph.model['provider']);

    const response = route.params.uuid
      ? await provider.findOne(route.params.uuid)
      : await provider.findAll();

    if (Array.isArray(response)) {
      for (const model of response) {
        await this.resolver(model, join.graph.nodes);
      }
    } else {
      await this.resolver(response, join.graph.nodes);
    }

    return response;
  }

  private async resolver(model: CrudModel, nodes: CrudGraph[]): Promise<any> {
    const provider = this.injector.get(model.constructor['provider']);

    for (const node of nodes) {
      const reference = provider.system.linked
        .find((link) => link.model === node.model);

      let value = null; try {
        value = await provider.system.call(reference.method, model.id).pipe(
          map((response) => provider.system.cast(response, reference.model)),
          tap((response) => provider.system.purge(response))
        ).toPromise();
      } catch (error) {
        value = undefined;
      }

      if (value && node.nodes && node.nodes.length) {
        await this.resolver(value, node.nodes);
      }

      Object.defineProperty(model, reference.field, { value: value });
    }
  }

}
