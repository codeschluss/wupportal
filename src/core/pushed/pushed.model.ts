import { JSONSchema } from '@ngx-pwa/local-storage';

export class PushedModel {

  public static readonly schema: JSONSchema = {
    type: 'object',
    properties: {
      notifications: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            content: { type: 'string' },
            label: { type: 'string' },
            read: { type: 'boolean' },
            route: { type: 'string' }
          },
          required: [
            'content',
            'label'
          ]
        }
      }
    },
    required: [
      'notifications'
    ]
  };

  public notifications: {
    content: string;
    label: string;
    read?: boolean;
    route?: string;
    timestamp: number;
  }[] = [];

}
