import { Gasto } from "./Gasto"

export const ListadoGastos = ({
    gastos,
    setGastoEditar,
    eliminarGasto,
    filtro,
    gastosFiltrados
}) => {
    console.log(gastos);
    return (
        <div className="listado-gastos contenedor">
            {/* Si existe un filtrado itera gastosFiltradosl, sino itera gastos */}
            {filtro ? (
                <>
                    <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos en esta categoría'}</h2>
                    {
                        gastosFiltrados.map(gasto => (
                            <Gasto
                                key={gasto.id}
                                gasto={gasto}
                                setGastoEditar={setGastoEditar}
                                eliminarGasto={eliminarGasto}
                            />
                        ))
                    }
                </>
            ) :
                (
                    <>
                        <h2>{gastos.length ? 'Gastos' : 'No hay gastos aún'}</h2>
                        {
                            gastos.map(gasto => (
                                <Gasto
                                    key={gasto.id}
                                    gasto={gasto}
                                    setGastoEditar={setGastoEditar}
                                    eliminarGasto={eliminarGasto}
                                />
                            ))
                        }
                    </>
                )
            }
        </div>
    )
}
