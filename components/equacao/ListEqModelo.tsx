export const ListEqModelo = ({ items, callback }: any) => {
    return (
        <div className="border border-gray-300 rounded-md w-full my-2 overflow-y-auto h-58">
            <ul role="list">
                {items?.map((eqModelo: any, key: number) => (
                    <li key={key} className="grid grid-flow-row lg:grid-cols-[220px_minmax(300px,_1fr)] items-center py-1 px-4 group/item hover:bg-slate-100 h-14 w-full hover:cursor-pointer" onClick={() => callback(eqModelo)}>
                            <span className="text-xs font-semibold">{eqModelo.nome}</span>
                            <span className="text-xs">{eqModelo.expressao}</span>
                        
                        {/* <a href="#" className="group/edit  hover:bg-slate-200 group-hover/item:visible">
                            <span className="group-hover/edit:text-gray-700">Selecionar</span>
                            <svg className="group-hover/edit:translate-x-0.5 group-hover/edit:text-slate-500" /> 
                        </a> */}
                    </li>
                ))
            }
            </ul>
        </div>
    )
}

export default ListEqModelo