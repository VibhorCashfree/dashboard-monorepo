import { createBrowserHistory } from 'history';

const basename = process.env.PUBLIC_PATH;

export default createBrowserHistory({
  basename,
});
