import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudJoiner, CrudResolver } from '@portal/core';
import { ActivityModel } from 'src/realm/activity/activity.model';
import { BlogModel } from 'src/realm/blog/blog.model';
import { CategoryModel } from 'src/realm/category/category.model';
import { ConfigurationModel } from 'src/realm/configuration/configuration.model';
import { OrganisationModel } from 'src/realm/organisation/organisation.model';
import { PageModel } from 'src/realm/page/page.model';
import { SuburbModel } from 'src/realm/suburb/suburb.model';
import { TargetGroupModel } from 'src/realm/target-group/target-group.model';
import { TopicModel } from 'src/realm/topic/topic.model';
import { AboutComponent } from './about/about.component';
import { ActivityListComponent } from './activity/activity.list.component';
import { ActivityViewComponent } from './activity/activity.view.component';
import { BlogListComponent } from './blog/blog.list.component';
import { BlogViewComponent } from './blog/blog.view.component';
import { MappingComponent } from './mapping/mapping.component';
import { OrganisationListComponent } from './organisation/organisation.list.component';
import { OrganisationViewComponent } from './organisation/organisation.view.component';
import { PublicComponent } from './public.component';
import { SearchComponent } from './search/search.component';
import { PageViewComponent } from './worthKnowing/page.view.component';
import { TopicViewComponent } from './worthKnowing/topic.view.component';
import { TopicsListComponent } from './worthKnowing/topics.list.component';

const PublicRoutes = [
  {
    path: 'home',
    component: AboutComponent,
    resolve: {
      activities: CrudResolver,
      configurations: CrudResolver
    },
    data: {
      activities: CrudJoiner.of(ActivityModel, {
        size: 15,
        dir: 'asc',
        page: 0,
        sort: 'schedules.startDate'
      })
        .with('category')
        .with('address').yield('suburb')
        .with('schedules'),
      configurations: CrudJoiner.of(ConfigurationModel)
    }
  },
  {
    path: 'list/activities',
    children: [
      {
        path: '',
        component: ActivityListComponent,
        resolve: {
          targetGroups: CrudResolver,
          categories: CrudResolver,
          suburbs: CrudResolver,
          configurations: CrudResolver
        },
        data: {
          targetGroups: CrudJoiner.of(TargetGroupModel),
          categories: CrudJoiner.of(CategoryModel),
          suburbs: CrudJoiner.of(SuburbModel),
          configurations: CrudJoiner.of(ConfigurationModel)
        }
      }
    ]
  },
  {
    path: 'list/activities/map',
    component: MappingComponent,
    resolve: {
      activities: CrudResolver,
      configurations: CrudResolver
    },
    data: {
      activities: CrudJoiner.of(ActivityModel)
        .with('category')
        .with('address').yield('suburb')
        .with('schedules'),
      configurations: CrudJoiner.of(ConfigurationModel)
    }
  },
  {
    path: 'view/activities/:uuid',
    component: ActivityViewComponent,
    resolve: {
      activity: CrudResolver,
    },
    data: {
      activity: CrudJoiner.of(ActivityModel)
        .with('category')
        .with('organisation')
        .with('targetGroups')
        .with('schedules')
        .with('address').yield('suburb'),
    }
  },
  {
    path: 'map/activities/:uuid',
    component: MappingComponent,
    resolve: {
      activities: CrudResolver,
    },
    data: {
      activities: CrudJoiner.of(ActivityModel)
        .with('category')
        .with('organisation')
        .with('targetGroups')
        .with('schedules')
        .with('address').yield('suburb'),
    }
  },
  {
    path: 'list/organisations',
    component: OrganisationListComponent,
  },
  {
    path: 'view/organisations/:uuid',
    component: OrganisationViewComponent,
    resolve: {
      organisation: CrudResolver
    },
    data: {
      organisation: CrudJoiner.of(OrganisationModel)
        .with('address').yield('suburb')
        .with('activities')
        .with('images')
    }
  },
  {
    path: 'list/blogs',
    component: BlogListComponent,
  },
  {
    path: 'view/blogs/:uuid',
    component: BlogViewComponent,
    resolve: {
      blog: CrudResolver
    },
    data: {
      blog: CrudJoiner.of(BlogModel).with('activity')
    }
  },
  {
    path: 'list/topics',
    component: TopicsListComponent,
    resolve: {
      topics: CrudResolver,
    },
    data: {
      topics: CrudJoiner.of(TopicModel),
    }
  },
  {
      path: 'view/topic/:uuid',
      component: TopicViewComponent,
      resolve: {
        topic: CrudResolver,
      },
      data: {
        topic: CrudJoiner.of(TopicModel).with('pages'),
      }
    },
  {
  path: 'view/page/:uuid',
  component: PageViewComponent,
    resolve: {
      page: CrudResolver,
    },
    data: {
      page: CrudJoiner.of(PageModel),
    }
  },
  {
  path: 'search',
  children: [
    {
      path: ':query',
      component: SearchComponent,
    },
    {
      path: '',
      component: SearchComponent
    }]
  }
  ,
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([
  {
    path: '',
    children: PublicRoutes,
    component: PublicComponent,
  }
])]
})

export class PublicRouter { }
