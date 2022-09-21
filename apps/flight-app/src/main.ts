import { loadRemoteEntry, loadManifest } from '@angular-architects/module-federation';

// fetch('config.json')

loadManifest('assets/manifest.json')
.catch(err => console.error(err))
.then(() => import('./bootstrap'))
.catch(err => console.error(err));
