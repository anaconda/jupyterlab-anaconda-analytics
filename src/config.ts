export interface ScriptMetadata {
  id: string;
  secret: string;
}

export interface Settings {
  analytics: ScriptMetadata[];
}

export const settings: Settings = {
  analytics: [
    { id: 'ga', secret: '123456789' },
    { id: 'heap', secret: '123456789' }
  ]
};
