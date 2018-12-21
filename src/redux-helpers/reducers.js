import {
  LOAD_APP_CONFIGURATIONS
} from './actions';

function reducers(state = {}, action) {

  switch (action.type) {

    case LOAD_APP_CONFIGURATIONS:
      return Object.assign({}, state, {
        appConfigs: action.appConfigs
      });

    default:
      return state;
  }

}

export default reducers;