export const loading = () => ({
    type: 'LOADING_STOCKS'
});

export const done = () => ({
    type: 'DONE_STOCKS'
});

export const filter = (str) => ({
    type: 'FILTER',
    str
});





export const updateSelectedStock = (source, symbol) => {

    return dispatch => {
        dispatch(setSelectedStock({ source, symbol }));
        dispatch(loading());
        fetch(process.env.REACT_APP_PATH_API + "/stocks/" + source + "/" + symbol + "?startDate=2019-01-01",
            {
                method: "GET"
            })
            .then(res => res.json())
            .then(result => {
                if (result.Error) {
                    dispatch(done());
                } else {
                    dispatch(done());
                    dispatch(setSelectedStock(result));
                }

            }, error => {


            });
    }

};


export const setSelectedStock = (stock) => ({
    type: 'SET_SELECTED_STOCK',
    stock
});



export const updateStockList = () => {
    return dispatch => {
        dispatch(loading());
        fetch(process.env.REACT_APP_PATH_API + "/stocks/list",
            {
                method: "GET"
            })
            .then(res => res.json())
            .then(result => {
                if (result.Error) {
                    dispatch(done());
                } else {
                    console.log(result);
                    dispatch(done());
                    dispatch(setAllStocks({ result }));
                }

            }, error => {


            });
    }
};

export const setAllStocks = (listAllStocks) => ({
    type: 'SET_ALL_STOCKS',
    listAllStocks
});
