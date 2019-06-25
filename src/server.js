import                      'babel-polyfill';
import express         from 'express';
import { matchRoutes } from 'react-router-config';
import proxy           from 'express-http-proxy';

import renderer    from './helpers/renderer';
import createStore from './helpers/createStore';
import routes      from './client/routes';

const app = express();

app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
  proxyReqOptDecorator(opts) {
    opts.headers['x-forwarded-host'] = 'localhost:3000';
    return opts;
  }
}));

app.use(express.static('public'));

app.get('*', async (req, res) => {
  const store = createStore(req);

  const promises = matchRoutes(routes, req.path)
    .map(({ route }) => {
      return route.loadData
        ? route.loadData(store)
        : null;
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  await Promise.all(promises);

  const context = {};
  const content = renderer(req, store, context);

  if (context.notFound) {
    res.status(404);
  }

  if (context.url) {
    return res.redirect(303, context.url);
  }

  res.send(content);
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});