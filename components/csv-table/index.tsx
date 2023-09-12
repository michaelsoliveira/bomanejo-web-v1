import React, {useCallback, useContext, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import { AuthContext } from "contexts/AuthContext";

type CSVTableTypes = {
    data: any,
    rowsPerPage?: number;
}

const CSVTable = ({ data, rowsPerPage = 5 }: CSVTableTypes) => {

    const [state, setState] = useState<any>({
        content: data,
        headers: data[0],
        viewableContent: data,
        filterText: "",
        selectValue: 0,
        realPage: 0,
        elementsPerPage: rowsPerPage,
        startIndex: 0,
        endIndex: rowsPerPage,
        pages: 0
    })

    const { viewableContent, elementsPerPage, selectValue, headers, filterText, realPage, startIndex, endIndex } = state

    let pages = [];
    
    const getFileContent = useCallback(async () => {

            // Parse CSV now
            // let rows = text.split(/\r?\n/);
            let csv = [];

            for (let i = 0; i < data.length; i++) {
                if (data[i] === "") continue;
                    if (i > 0) {
                     
                        let csvRow = [];
                    // Check field type so we can sort by real type
                    if (!isNaN(data[i]))
                        data[i] = Number(data[i]);
                        csvRow.push(data[i]);
                        csv.push(csvRow);
                    }  
                
            }

            setState({
                content: csv,
                headers: data[0],
                viewableContent: csv,
                elementsPerPage: data?.length
            });

       
    }, [data, setState])

    useEffect (() => {

        // getFileContent()
    }, [getFileContent, data, state])

    function orderRowsWrapper (index: any, asc=true) {
        // Return comparator asc/desc by column index
        return function (a: any, b: any) {
            if (a[index] === b[index]) {
                return 0;
            }
            else {
                if (asc)
                    return (a[index] < b[index]) ? -1 : 1;
                else
                    return (a[index] > b[index]) ? -1 : 1;
            }
        }
    }

    function orderRowsByField (index: any, asc: any) {
        const { viewableContent } = state
        let newContent = viewableContent.slice();
        newContent.sort(orderRowsWrapper(index, asc));
        setState({viewableContent: newContent.slice()});
    }

    function changeFilterText (event: any) {
        const { selectValue } = state
        // Propagate reactivity to state and filter rows again
        let text = event.target.value;
        setState({ filterText: text });
        filterRowsByText(text, selectValue);
    }

    function filterRowsByText (text: any, index: any) {
        const { content, realPage, elementsPerPage } = state
        // Update rows by field and text
        let rows = content.slice();
        let viewableRows = []
        for (let row of rows) {
            let typeChange = false;
            // Convert Int to string to allow better searching function on string
            if (typeof(row[index]) === "number") {
                typeChange = true;
                row[index] = row[index].toString();
            }
            if (row[index].toLowerCase().includes(text.toLowerCase())) {
                // Return to number type
                if (typeChange)
                    row[index] = Number(row[index]);
                viewableRows.push(row);   
            }     
        }
        let page = realPage;
        if (realPage >= viewableRows.length / elementsPerPage)
            page = 0;
        let start = page * elementsPerPage;
        let end = start + parseInt(elementsPerPage);
        setState({ viewableContent: viewableRows, realPage: page, startIndex: start, endIndex: end });
    }

    function changePage (event: any) {
        const { viewableContent, elementsPerPage } = state
        let page = event.target.value;
        if (page >= 0 && page < viewableContent.length)
            updateIndexes(elementsPerPage, event.target.value);
    }

    function updateIndexes (elements: any, page: any) {
        const { viewableContent } = state
        if (page >= viewableContent.length / elements)
            page = 0;
        let start = page * elements;
        let end = start + parseInt(elements);
        setState({ realPage: page, elementsPerPage: elements, startIndex: start, endIndex: end })
    }

    function changeElementsPerPage (event: any) {
        const { viewableContent, realPage } = state
        let elements = event.target.value;
        if (elements > 0 && elements <= viewableContent.length)
            updateIndexes(elements, realPage);
    }

    function changeSelectValue (event: any) {
        const { filterText } = state
        // Propagate reactivity to state and filter rows again
        let value = event.target.value;
        setState({ selectValue: value });
        filterRowsByText(filterText, value); 
    }

    function renderRow (row: any, index: any, header=false) {
        return (
            <tr key={index}>
                {row.map((content: any, index: any) => {
                    return (
                        <td key={index}>
                            {content}
                            {header ? 
                                // Displaying buttons for ordering rows by columns
                                <div>
                                    <button type="button" className="btn" onClick={() => orderRowsByField(index, true)}>&#8593;</button>
                                    <button type="button" className="btn" onClick={() => orderRowsByField(index, false)}>&#8595;</button>
                                </div>
                            : null}
                        </td>
                    );
                })}
            </tr>
        );
    }

    return (
        viewableContent !== null ? (
        <div className="CSVTable__outer">
            <div className="form-inline">
                <label>Filter</label>
                {/* <select className="form-control" value={selectValue} onChange={changeSelectValue.bind}>
                    {headers.map(function (value: any, index: any) {
                        return (
                            <option key={index} value={index}>
                                {value}
                            </option>
                        );
                    })}
                </select> */}
                    by 
                <input type="text" className="form-control" value={filterText} onChange={changeFilterText}/>
            </div>

            <div className="form-inline">
                Page: 
                <input type="number" className="form-control" value={realPage} onChange={changePage}/>
                    / {pages.length}
            </div>
            <div className="form-inline">
                per page: 
                <input type="number" className="form-control" value={elementsPerPage} onChange={changeElementsPerPage}/>
            </div>
            <div className="CSVTable__overflowx">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th>UT</th>
                            <th>Faixa</th>
                            <th>Nº Arvore</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            // Paginate results
                            data.slice(startIndex, endIndex).map((item: any, index: any) => (
                                (index > 0) && (
                                    <tr key={index}>
                                        <td>{item.ut}</td>
                                        <td>{item.faixa}</td>
                                        <td>{item.numero_arvore}</td>
                                    </tr>
                                )
                                
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>) : ( <div className="CSVTable__outer">Loading data...</div>)
    )
    
}

export default CSVTable