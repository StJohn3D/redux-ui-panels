import { combineReducers } from 'redux';
import { SELECTION } from '../constants/action-types'
import { repanelReducer } from 'repanel'

const initialData = {
    things: {
        list: ['Thing 1', 'Thing 2', 'Thing 3'],
        selectedIndex: 0
    }
}

const rootReducer = combineReducers({
    repanel: repanelReducer,
    data: function(state = initialData, action) {
        switch (action.type) {
            case SELECTION.CHANGED:
                return Object.assign({}, state, {
                    things: {
                        ...state.things,
                        selectedIndex: action.payload.index
                    }
                })
            default:
                return state
        }
    }
});

export default rootReducer;
