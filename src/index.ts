import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { ScriptMetadata } from './config';
import { loadApp } from './utils';

/**
 * Initialization data for the jupyterlab-anaconda-analytics extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-anaconda-analytics:plugin',
  autoStart: true,
  requires: [ISettingRegistry],
  activate: async (
    app: JupyterFrontEnd,
    settingRegistry: ISettingRegistry
  ): Promise<any> => {
    try {
      const scriptMetaData: ScriptMetadata[] = [];
      // Load plugin into the settings registry.
      const settings = await settingRegistry.load(plugin.id);

      // Get google analytics tracking id
      const gaAnalytics = settings.get('ga').composite as string;
      // Get heap analytics tracking id
      const heapAnalytics = settings.get('heap').composite as string;

      // push the tracking id's into the array
      scriptMetaData.push(
        { id: 'ga', secret: gaAnalytics },
        { id: 'heap', secret: heapAnalytics }
      );

      scriptMetaData.forEach((app: ScriptMetadata) => {
        loadApp(app.id, app.secret);
      });
    } catch (err) {
      console.error(err);
    }
  }
};

export default plugin;
