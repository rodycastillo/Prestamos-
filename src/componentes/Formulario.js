import React, {useState, Fragment} from 'react';
import {calcularTotal} from '../helpers.js'

const Formulario = (props) => {
    const {cantidad, guardarCantidad, plazo, guardarPlazo, guardarTotal, guardarCargando}= props;
    //definir stare
    const[error, guardarError]=useState(false);

    //cuando el usuario hace submit
    const calcularPrestamo= e=>{
        e.preventDefault();

        //validar
        if(cantidad === 0|| plazo === 0){
            guardarError(true);
            return;
        }
        //eliminar el error previo
        guardarError(false);

        //habilitar el spinner
        guardarCargando(false);

        setTimeout(() => {
            //realizar la cotizacion:
        const total= calcularTotal(cantidad, plazo);

        //una vez calculado guardar total:
        guardarTotal(total);
            //desabilitar el spinner
            guardarCargando(false);

        }, 3000);
        
        
    }

    return (
        <Fragment>
<form onSubmit={calcularPrestamo}>
          <div className="row">
              <div>
                  <label>Cantidad Prestamo</label>
                  <input 
                      className="u-full-width" 
                      type="number" 
                      placeholder="Ejemplo: 3000"
                       onChange={e=> guardarCantidad(parseInt(e.target.value))}
                  />
              </div>
              <div>
                  <label>Plazo para Pagar</label>
                  <select 
                      className="u-full-width"
                      onChange={e=> guardarPlazo(parseInt(e.target.value))}
                  >
                      <option value="">Seleccionar</option>
                      <option value="3">3 meses</option>
                      <option value="6">6 meses</option>
                      <option value="12">12 meses</option>
                      <option value="24">24 meses</option>
                  </select>
              </div>
              <div>
                  <input 
                      type="submit" 
                      value="Calcular" 
                      className="button-primary u-full-width" 
                  />
              </div>
          </div>
  </form>
  {(error)? <p className="error">Todos los campos son obligatorios</p> : null}
  </Fragment>
    );
}

export default Formulario;

