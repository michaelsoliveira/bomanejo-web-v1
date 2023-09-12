import { forwardRef, useContext, useEffect, useState } from "react";
import EditableTable from "../utils/EditableTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useModalContext } from "contexts/ModalContext";
import { AuthContext } from "contexts/AuthContext";
import { useAppSelector } from "store/hooks";
import { RootState } from "store";
import alertService from '../../services/alert';

const AddAuto = forwardRef<any, any>(
  function AddAuto(
    { maxNumUt, loadUts }, 
    ref
  ) {
    const { hideModal } = useModalContext()
    const { client } = useContext(AuthContext)
    const upa = useAppSelector((state: RootState) => state.upa)

    
    const saveUt = async () => {
      await client.post(`/ut/create-auto?upaId=${upa?.id}`, data).then(({ error, message }: any) => {
        if (!error) {
          alertService.success(message)
          loadUts()
          hideModal()
        } else {
          alertService.error(message)
        }
      })
    }

    const columns = [
        {
          Header: "ID",
          accessor: "id",
        },
        {
          Header: "Número UT",
          accessor: "numero_ut",
          editEnable: true,
        },
        {
          Header: "Área Util",
          accessor: "area_util",
          editEnable: true,
        },
        {
          Header: "Área Total",
          accessor: "area_total",
          editEnable: true,
        },
        {
          Header: "Opções",
          id: "actions",
          disableSortBy: true,
          Cell: ({ row, column, cell }: any) =>
            row.original.isEditing ? (
              <>
                <button onClick={() => handleButtonClick("save", row.original)} className="px-2">
                  Salvar
                </button>
                <button onClick={() => handleButtonClick("cancel", row.original)}>
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleButtonClick("edit", row.original)} className="px-2">
                  Editar
                </button>
                  <button onClick={() => {
                    const dataCopy = [...data];
                    // It should not matter what you name tableProps. It made the most sense to me.
                    dataCopy.splice(row.index, 1);
                    setData(dataCopy);
                  }}>
                  Excluir
                </button>
              </>
            ),
        },
      ];
    
      const [data, setData] = useState<any>([]);

      const newUt = () => {
        setData([...data, { id: data.length + 1, numero_ut: maxNumUt + data.length + 1, area_util: 100, area_total: 100 }])
      }
    
      const handleButtonClick = (action: any, row: any) => {
        const newData = data.map((rowData: any) => {
          if (rowData.id === row.id) {
            if (action === "edit") {
              return { ...rowData, isEditing: true, prevData: { ...rowData } };
            } else if (action === "cancel") {
              return { ...rowData, isEditing: false, ...rowData.prevData };
            } else if (action === "save") {
              const { prevData, ...updatedRowData }: any = rowData;
              return { ...updatedRowData, isEditing: false };
            }
          }
          return rowData;
        });
        setData(newData);
      };
    
      return (
        <div className="flex flex-col items-center h-full">
          <div
              onClick={newUt}
              className="py-4"
          >
              <button className="flex flex-row w-36 px-4 py-2 justify-around w-full space-x-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer">
                  <span>
                      <FontAwesomeIcon icon={faPlus} />
                  </span>
                  
                      Add Auto
                  
              </button>
          </div>

          <EditableTable
            columns={columns}
            data={data}
            setData={setData}
            handleButtonClick={handleButtonClick}
          />

          <span
                className="hidden"
                ref={ref}
                onClick={saveUt}
            >
                Importar
            </span>
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </div>
      );
})

export default AddAuto