import React from 'react';
import './css/index.css';

//Components
import Chart from '../components/chartSample';



const pageInfo = (

    <div className="evaluatz_index container shadow-lg mt-2">
        <div className="evaluatz_index_container jumbotron jumbotron-fluid bg-secondary text-white pt-3 pb-3 mb-0 ">
            <h1 className="display-4">Find your forecast for the stocks</h1>
            <p className="lead">Develop your own way to predict the future values for the stocks</p>
            <Chart />
        </div>
    </div>

);

const pageDashboard = (
    <div>
        <div className="evaluatz_menu ">
            <ul className="list-group list-group-flush">
                <li className="list-group-item" >Dashboard</li>
                <li className="list-group-item" >Wallet</li>
                <li className="list-group-item" >Discover</li>
            </ul>
        </div>
        <div className="evaluatz_menu_content">
            <div className="evaluatz_menu_content_pg dashboard">
                <h1 className="evaluatz_menu_content_dashboard_value ">
                    $50,000.00
                </h1>
            </div>
            <div className="evaluatz_menu_content_pg wallet">
               
            </div>
            <div className="evaluatz_menu_content_pg discover">
               
               </div>
        </div>
    </div>
);



function Index(props) {
    console.log("Rendering Index");
    return props.isAuthed ? pageDashboard : pageInfo;
}



export default Index;



