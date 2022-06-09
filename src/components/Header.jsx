import React from 'react'
import { ControlPresupuesto } from './ControlPresupuesto'
import { NuevoPresupuesto } from './NuevoPresupuesto'

export const Header = ({
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
  gastos,
  setGastos
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {/* Verificamos si el presupuesto es valido con 
      isValidPresupuesto true or false */}
      {isValidPresupuesto ? (
        <ControlPresupuesto
          gastos={gastos}
          setGastos={setGastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      )}



    </header>
  )
}
