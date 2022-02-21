import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalyticsEntry } from 'src/api/models/analytics-entry';
import { AnalyticsDto } from '../../api/models/analytics-dto';
import { SearchAnalyticsDto } from '../../api/models/search-analytics-dto';
import { AppStatisticsControllerService } from '../../api/services/app-statistics-controller.service';
import { SearchConsoleControllerService } from '../../api/services/search-console-controller.service';

@Injectable({
  providedIn: 'root'
})

export class AnalyticsProvider {

  public constructor(
    private appStatistics: AppStatisticsControllerService,
    private searchConsole: SearchConsoleControllerService
  ) { }

  public appInstalls(
    start: string,
    end: string
  ): Observable<AnalyticsEntry[]> {
    return this.appStatistics
      .appStatisticsControllerAppStatisticsInstalls(start, end);
  }

  public appRatings(
    start: string,
    end: string
  ): Observable<AnalyticsEntry[]> {
    return this.appStatistics
      .appStatisticsControllerAppStatisticsRatings(start, end);
  }

  public searchDetails(
    start: string,
    end: string,
    dimension: 'COUNTRY' | 'DATE' | 'DEVICE' | 'PAGE' | 'QUERY'
  ): Observable<AnalyticsDto[]> {
    return this.searchConsole
      .searchConsoleControllerSearchConsoleDetails(start, end, dimension);
  }

  public searchOverview(
    start: string,
    end: string
  ): Observable<SearchAnalyticsDto> {
    return this.searchConsole
      .searchConsoleControllerSearchConsoleOverview(start, end);
  }

}
