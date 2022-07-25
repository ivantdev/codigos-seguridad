import React from 'react';

const SECURITY_CODE = 'paradigm';

function UseReducer({ name }) {
    const [ state, dispatch ] = React.useReducer(myReducer, initialState);

    const onConfirm = () => dispatch({ type: actionTypes.confirm });
    const onError = () => dispatch({ type: actionTypes.error });
    const onCheck = () => dispatch({ type: actionTypes.check });
    const onDelete = () => dispatch({ type: actionTypes.delete});
    const onReset = () => dispatch({ type: actionTypes.reset});
    
    const onWrite = ({ target: { value }}) => {
        dispatch({ type: actionTypes.write , payload: value});
    };

    React.useEffect(() => {
        if(!!state.loading) {
            setTimeout(() => {
                if(state.value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError();
                }
            }, 1000);
        }

        console.log("Terminando el efecto");
    }, [state.loading]);
    

    if(!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
    
                <p>Por favor, escribe el código de seguridad.</p>
    
                {state.error && !state.loading &&(
                    <p>Error: el código es incorrecto</p>
                )}
    
                {state.loading && (
                    <p>Cargando...</p>
                )}
    
                <input 
                    placeholder="Código de seguridad"
                    value={state.value}
                    onChange={onWrite}
                />
                <button
                    onClick={onCheck}
                >Comprobar</button>
            </div>
        );
    } else if(!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Estas seguro de lo que haces?</p>
                <button
                    onClick={onDelete}
                >Sí, eliminar
                </button>

                <button
                    onClick={onReset}
                >No, me arrepentí
                </button>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>

                <button
                    onClick={onReset}
                >Reseteado, volver a atras
                </button>
            </React.Fragment>
        )
    }
}


const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirm: false,
};

const actionTypes = {
    confirm: "CONFIRM",
    error: "ERROR",
    delete: "DELETE",
    reset: "RESET",
    write: "WRITE",
    check: "CHECK",
}

const reducerObject = (state, payload) => ({
    [actionTypes.confirm]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.write]: {
        ...state,
        value: payload
    },
    [actionTypes.check]: {
        ...state,
        loading: true,
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true,
    },
    [actionTypes.reset]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: "",
    },
});

const myReducer = (state, action) => {
    const { [action.type]: result } = reducerObject(state, action.payload);
    return result || state;
};

export { UseReducer };