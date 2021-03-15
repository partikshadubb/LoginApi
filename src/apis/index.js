import * as auth from './auth';
import * as home from './home';
import * as common from './common';

export default {
    ...auth,
     ...home,
     ...common,
};
