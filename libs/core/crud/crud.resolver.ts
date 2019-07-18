import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, defaultIfEmpty, map, mergeMap } from 'rxjs/operators';
import { CrudGraph, CrudJoiner } from './crud.joiner';
import { CrudModel } from './crud.model';

@Injectable({ providedIn: 'root' })
export class CrudResolver implements Resolve<CrudModel | CrudModel[]> {

  public constructor(
    private router: Router
  ) { }

  public refine(input: CrudModel | CrudModel[], graph: CrudGraph):
    Observable<CrudModel | CrudModel[]> {

    const meta = Object.getOwnPropertyNames(input).filter((p) =>
      !Object.keys(input).includes(p) && !(p in Object.getPrototypeOf(input)))
      .reduce((o, p) => Object.assign(o, { [p]: { value: input[p] } }), { });

    const refined: Observable<CrudModel | CrudModel[]> = Array.isArray(input)
      ? forkJoin(input.map((i) => this.run(i, graph.nodes)))
      : this.run(input, graph.nodes);

    return refined.pipe(map((output) => Object.defineProperties(output, meta)));
  }

  public resolve(route: ActivatedRouteSnapshot):
    Observable<CrudModel | CrudModel[]> {

    const navigationId = (this.router as any).navigationId;
    const joiner = route.data.resolve[Object.keys(route.routeConfig.resolve)
      .filter((key) => route.routeConfig.resolve[key] === this.constructor)
      .filter((key) => route.data.resolve[key] instanceof CrudJoiner)
      .find((key) => route.data.resolve[key].navigate(navigationId))];

    joiner.graph.params.embeddings = CrudJoiner.to(joiner.graph);

    const request = joiner.graph.params.filter !== null && route.params.uuid
      ? joiner.graph.provider.readOne(route.params.uuid)
      : joiner.graph.provider.readAll(joiner.graph.params);

    return request.pipe(
      mergeMap((response) => this.refine(response as any, joiner.graph)),
      catchError((e) => this.unbound(e) ? of(undefined) : throwError(e))
    );
  }

  private run(input: CrudModel, nodes: CrudGraph[]): Observable<CrudModel> {
    const resolve = forkJoin(nodes.map((node) => {
      const provider = input.constructor['provider'].system;
      const link = provider.linked.find((l) => l.field === node.name);

      return of(input).pipe(mergeMap((item) => {
        if ((item._embedded || { })[link.field]) {
          const embedded = item._embedded[link.field];
          return of(Object.assign(item, {
            [link.field]: Array.isArray(embedded)
              ? embedded.map((e) => Object.assign(new link.model(), e))
              : Object.assign(new link.model(), embedded)
          }));
        } else {
          return provider.call(
            link.method,
            item.id,
            node.params.sort,
            node.params.dir,
            CrudJoiner.to(node)
          ).pipe(
            map((response) => provider.cast(response, link.model)),
            catchError((e) => this.unbound(e) ? of(undefined) : throwError(e)),
            map((response) => Object.assign(item, { [link.field]: response })),
            defaultIfEmpty(undefined)
          );
        }
      })).pipe(mergeMap((item) => {
        return item && item[link.field] && node.nodes.length
          ? this.refine(item[link.field], node)
          : of(item);
      }));
    })).pipe(map(() => input));

    return input.constructor['provider'] && nodes.length ? resolve : of(input);
  }

  private unbound(error: any): boolean {
    switch (error.status) {
      default:
        return false;

      case 403:
      case 404:
        return true;
    }
  }

}
