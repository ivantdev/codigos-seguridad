import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";
import React from "react";
import { Loading } from './Loading';

const SECURITY_CODE = 'paradigm';

class ClassState extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            error: false,
            loading: false,
        };
    }

    // UNSAFE_componentWillMount () {
    //     console.log("componentWillMount");
    // }

    // componentDidMount() {
    //     console.log("componentDidMount");
    // }

    componentDidUpdate() {
        console.log("actualización");
        if(!!this.state.loading) {
            setTimeout(() => {
                console.log("Haciendo la validación");
    
                if(this.state.value !== SECURITY_CODE) {
                    this.setState({ error: true, loading : false });
                } else {
                    this.setState({ error: false, loading : false });
                }
                
                console.log("Terminando la validación");
            }, 3000);
        }
    }

    render () {
        const { loading } = this.state;
        return (
            <div>
                <h2>Eliminar ClassState</h2>

                <p>Por favor, escribe el código de seguridad.</p>
                {this.state.error && !loading && (
                    <p>Error: el código es incorrecto</p>
                )}

                {this.state.loading && (
                    <Loading />
                )}

                <input 
                    placeholder="Código de seguridad" 
                    value={ this.state.value } 
                    onChange={(event) => {
                        this.setState({value: event.target.value });
                    }}
                />
                <button 
                    onClick={() => 
                        this.setState(prevState => ({ loading: true }))
                    }
                >Comprobar</button>
            </div>
        );
    }
}

export { ClassState };