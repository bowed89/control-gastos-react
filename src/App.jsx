import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Modal } from './components/Modal';
import { Filtros } from './components/Filtros';
import { ListadoGastos } from './components/ListadoGastos';
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generarId } from './helpers'

function App() {

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [])

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);


  // Detecta si gastoEditar tiene algun cambio
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  }, [gastoEditar])
  // Almacena en localStorage presupuesto
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  // Filtros
  useEffect(() => {
    if (filtro) {
      const filtrarCambios = gastos.filter(gasto => gasto.categoria === filtro)
      console.log(filtrarCambios)
      setGastosFiltrados(filtrarCambios)
    }
  }, [filtro])

  // Almacena en localStorage gastos
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? 0)
  }, [gastos])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {
    if (gasto.id) {
      // tiene id, actualizamos
      const gastosActualizados = gastos.map(gastoState =>
        gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
    } else {
      // no tiene id, agregamos nuevo registro
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
    // Cerrar modal y animacion
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const eliminarGasto = (id) => {
    const eliminarGastos = gastos.filter(gastoState => gastoState.id !== id)
    setGastos(eliminarGastos)
  }

  return (
    /* modal && 'fijar' es una clase para mostrar solo el modal y tapar de atras */
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {/* si isValidPresupuesto es true muestra el btn de la 
      esquina derecha y el listado de gastos */}
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt="Icono Nuevo Gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
      {/* Si modal es true muestra el componente */}
      {modal &&
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      }


    </div>
  )
}

export default App
