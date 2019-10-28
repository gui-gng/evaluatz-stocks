export const loading = () => ({
    type: 'LOADING'
});

export const done = () => ({
    type: 'DONE'
});

export const filter = (str) => ({
    type: 'FILTER',
    str
});

export const updateHistoricData = (source, symbol) => {
    return dispatch => {
        if (!localStorage.getItem(source + "/" + symbol) && source == 'ASX' ) {
            fetch(process.env.REACT_APP_PATH_API + "/stocks/" + source + "/" + symbol + "?startDate=2019-01-01",
                {
                    method: "GET"
                })
                .then(res => res.json())
                .then(result => {
                    if (result.Error) {
                        dispatch(done());
                    } else {
                        localStorage.setItem(result.source + "/" + result.symbol, JSON.stringify(result.historic.map(h => ({date:h.date,close:h.close}))));
                        
                        dispatch(done());
                        dispatch(setAllStocks({ result }));
                    }

                }, error => {


                });
        }
    }
};


export const update = () => {
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
