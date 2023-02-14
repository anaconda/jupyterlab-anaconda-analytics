import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { Token } from '@lumino/coreutils';

import { ScriptMetadata } from './config';
import { loadApp } from './utils';

export interface IAnalytics {
  gtag: ((...args: any[]) => void) | null;
}

export const IAnalytics = new Token<IAnalytics>(
  'jupyterlab-anaconda-analytics:plugin:IAnalytics'
);

/**
 * Initialization data for the jupyterlab-anaconda-analytics extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-anaconda-analytics:plugin',
  provides: IAnalytics,
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

      // Push the tracking ids into the array
      scriptMetaData.push(
        { id: 'ga', secret: gaAnalytics },
        { id: 'heap', secret: heapAnalytics }
      );

      scriptMetaData.forEach((app: ScriptMetadata) => {
        loadApp(app.id, app.secret);
      });

      // Activate GA's global site tag
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      w.gtag = function () {
        w.dataLayer.push(arguments);
      };

      return { gtag: w.gtag };
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};

export default plugin;
