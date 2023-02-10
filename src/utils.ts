const scripts: any = {
  ga: (secret: string): HTMLScriptElement[] => {
    const GMScript = document.createElement('script');
    GMScript.async = true;
    GMScript.src = `https://www.googletagmanager.com/gtag/js?id=${secret}`;

    const DLScript = document.createElement('script');
    DLScript.type = 'text/javascript';
    DLScript.text = `
        dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', '${secret}');
      `;

    return [GMScript, DLScript];
  },
  heap: (secret: string): HTMLElement[] => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = `
        window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
        heap.load("${secret}");
      `;

    return [script];
  }
};

export const loadApp = (app: string, secret: string): void => {
  if (!(app in scripts)) {
    return;
  }

  const runnableScripts = scripts[app](secret);

  runnableScripts.forEach((script: HTMLElement) => {
    const firstScriptElement = document.getElementsByTagName('script')[0];
    firstScriptElement.parentNode?.insertBefore(script, firstScriptElement);
  });
};
