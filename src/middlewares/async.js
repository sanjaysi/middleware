export default function({dispatch}) {
    return function(next) {
        return function(action) {
            // if the action does not have payload or
            // does not have a payload.then i.e. promise 
            if (!action.payload || !action.payload.then) {
                return next(action);
            }

            //console.log('We have a promise: ', action);

            // make sure that the action promise resolve
            action.payload
                .then(function(response) {
                    // create a new action with old type, but
                    // replace the promise with the response data
                    const newAction = {...action, payload: response};
                    dispatch(newAction);
                });
        };
    }
}

// ES6
// export default function({dispatch}) {
//     return next => action => {
//         console.log(action);

//         next(action);
//     };
// }
