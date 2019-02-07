import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { CrudGraph, CrudJoiner } from './crud.joiner';
import { CrudModel } from './crud.model';

@Injectable({ providedIn: 'root' })
export class CrudResolver implements Resolve<CrudModel | CrudModel[]> {

  private resolving: CrudJoiner[] = [];

  public refine(input: CrudModel | CrudModel[], graph: CrudGraph):
    Observable<CrudModel | CrudModel[]> {

    return Array.isArray(input)
      ? forkJoin(input.map((i) => this.run(i, graph.nodes)))
      : this.run(input, graph.nodes);
  }

  public resolve(route: ActivatedRouteSnapshot):
    Observable<CrudModel | CrudModel[]> {

    const joiner = route.data[Object.keys(route.routeConfig.resolve)
      .filter((key) => route.routeConfig.resolve[key] === this.constructor)
      .filter((key) => route.data[key] instanceof CrudJoiner)
      .find((key) => !this.resolving.includes(route.data[key]))];

    this.resolving.push(joiner);
    joiner.graph.params.embeddings = CrudJoiner.to(joiner.graph);

    const request = joiner.graph.params.filter !== null && route.params.uuid
      ? joiner.graph.provider.readOne(route.params.uuid)
      : joiner.graph.provider.readAll(joiner.graph.params);

    return request.pipe(
      mergeMap((response) => this.refine(response as any, joiner.graph)),
      catchError((e) => e.status === 404 ? of(undefined) : throwError(e)),
      tap(() => this.resolving.splice(this.resolving.indexOf(joiner), 1))
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
            catchError((e) => e.status === 404 ? of(undefined) : throwError(e)),
            map((response) => Object.assign(item, { [link.field]: response }))
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

}
