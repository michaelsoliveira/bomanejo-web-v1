import Table from "@/components/Table";

const SelectFileStep = ({columns, data}: any) => {

    return (
        <div className="border border-gray-200 p-4 rounded-md col-span-6 relative w-full mt-10">
            <span className="text-gray-700 absolute -top-3 bg-white px-2 text-sm">Planilha</span>
          <div className="mt-6">
            <Table columns={columns} data={data} />
          </div>
        </div>
    );
  };

  export default SelectFileStep