import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

// import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { settings, ScriptMetadata } from './config';
import { loadApp } from './utils';

/**
 * Initialization data for the jupyterlab-anaconda-analytics extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-anaconda-analytics:plugin',
  autoStart: true,
  // requires: [ISettingRegistry],
  activate: async (
    app: JupyterFrontEnd
    // settingRegistry: ISettingRegistry
  ): Promise<any> => {
    try {
      // TODO: get this to work
      // const settings = await settingRegistry.load(plugin.id);
      // const analytics = settings.get('analytics').composite as any[];

      // TODO: remove this
      const analytics = settings.analytics;

      analytics.forEach((app: ScriptMetadata) => {
        loadApp(app.id, app.secret);
      });
    } catch (err) {
      console.error(err);
    }
  }
};

export default plugin;
