import classNames from "classnames"
import { useRouter } from "next/router";

export const Pagination = function Pagination({ perPage, totalItems, orderBy, order, currentPage, onPageChanged, pageNeighbours }: any) {
    
    // const [currentPage, setCurrentPage] = useState(1)
    const lastItem = currentPage * perPage;
    const firstItem = lastItem - perPage
    const router = useRouter()
    const totalPages = Math.ceil(totalItems / perPage)

    pageNeighbours = typeof pageNeighbours === 'number'
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0
    

    const gotoPage = (page: any) => {
        const currentPage = Math.max(0, Math.min(page, totalPages));
        const paginationData = {
            name: router.pathname,
            currentPage,
            orderBy,
            order,
            totalPages: totalPages,
            perPage: perPage,
            totalItems: totalItems
        };
        
        onPageChanged(paginationData)
    }

  const handleClick = (page: any) => {
    gotoPage(page);
  }

    const handleMoveLeft = () => {
        const goTo = currentPage - (pageNeighbours * 3) - 1
        gotoPage(goTo > 0 ? goTo : 1);
    }

  const handleMoveRight = () => {
    gotoPage(currentPage + (pageNeighbours * 3) + 1);
  }

    const LEFT_PAGE: string = 'LEFT';
    const RIGHT_PAGE: string = 'RIGHT';

    /**
     * Helper method for creating a range of numbers
     * range(1, 5) => [1, 2, 3, 4, 5]
     */
    const range = (from: any, to: any, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
            i += step;
        }

        return range;
    }

    const fetchPageNumbers = () => {

        /**
         * totalNumbers: the total page numbers to show on the control
         * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
         */
        const totalNumbers = (pageNeighbours * 2) + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {
        const startPage = Math.max(1, currentPage - pageNeighbours);
        const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
        let pages = range(startPage, endPage);

        /**
         * hasLeftSpill: has hidden pages to the left
         * hasRightSpill: has hidden pages to the right
         * spillOffset: number of hidden pages either to the left or to the right
         */
        const hasLeftSpill = startPage > 2;
        const hasRightSpill = (totalPages - endPage) > 1;
        const spillOffset = totalNumbers - (pages.length + 1);

        switch (true) {
            // handle: (1) < {5 6} [7] {8 9} (10)
            case (hasLeftSpill && !hasRightSpill): {
                const extraPages = range(startPage - spillOffset, startPage - 1);
                pages = [LEFT_PAGE, ...extraPages, ...pages];
                break;
            }

            // handle: (1) {2 3} [4] {5 6} > (10)
            case (!hasLeftSpill && hasRightSpill): {
                const extraPages = range(endPage + 1, endPage + spillOffset);
                pages = [...pages, ...extraPages, RIGHT_PAGE];
                break;
            }

            // handle: (1) < {4 5} [6] {7 8} > (10)
            case (hasLeftSpill && hasRightSpill):
            default: {
                pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                break;
            }
        }

        return [...pages, totalPages];
        }

        return range(1, totalPages);
    }

    const pages = fetchPageNumbers()

    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
                <a href="#"
                    onClick={(evt: any) => {
                        evt.preventDefault()
                        if (currentPage > 1) gotoPage(currentPage - 1)
                    }}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Anterior
                </a>
                <a href="#"
                    onClick={(evt: any) => {
                        evt.preventDefault()
                        if (currentPage < totalPages) gotoPage(currentPage + 1)
                    }}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Próxima
                </a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                <p className="text-sm text-gray-700">
                    Exibindo de&nbsp;
                    <span className="font-medium">{ firstItem }</span>
                    &nbsp;a&nbsp;
                    <span className="font-medium">{ lastItem }</span>
                    &nbsp;de&nbsp;
                    <span className="font-medium">{ totalItems }</span>
                    &nbsp;resultados
                </p>
                </div>
                <div>
                    
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <a href="#" onClick={(event) => {
                            event.preventDefault()
                            if (currentPage > 1) gotoPage(currentPage - 1)
                        }} className={classNames("relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
                            currentPage === 1 && "cursor-default")}
                        >
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                        {pages.map((page: any) => {
                            if (page === 'LEFT') return (
                                <a
                                    href="#"
                                    key={page}
                                    className={classNames("bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
                                        "hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium")}
                                    onClick={(evt: any) => {
                                        evt.preventDefault()
                                        handleMoveLeft()
                                    }}>
                                    <span className="sr-only">Previous</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                    </svg>
                                </a>   ) 
                            
                            if (page === 'RIGHT') return (
                                <a
                                    href="#"
                                    key={page}
                                    className={classNames("bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
                                        "hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium")}
                                    onClick={(evt: any) => {
                                        evt.preventDefault()
                                        handleMoveRight()
                                    }}>
                                    <span className="sr-only">Next</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </a>)  
                            return (<a
                                href="#"
                                key={page}
                                className={classNames(
                                    (currentPage === page)
                                        ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium")}
                                onClick={(evt: any) => {
                                    evt.preventDefault()
                                    handleClick(page)
                                }}>
                                { page }
                            </a>)}
                            ) 
                        }
                    <a href="#" onClick={(event) => {
                        event.preventDefault()
                        if (currentPage < totalPages) gotoPage(currentPage + 1)
                    }} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    </a>
                </nav>
                </div>
            </div>
        </div>
    )
}