import React from 'react';

class ListProjects extends React.Component {
    constructor(props) {
        super(props);
        this.projects = props.projects;
    }

    componentDidMount() {
    
    }

    componentDidUpdate() {

    }
    render() {
        return (
            <div className="evaluatz_list_project">
            <table className="table table-dark mb-0 rounded">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Project</th>
                        <th scope="col">%</th>
                        <th scope="col">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.projects.map((project, i) =>
                        <tr>
                            <th scope="row">{i}</th>
                            <td>{project.name}</td>
                            <td>{project.profit}</td>
                            <td>{project.balance}</td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </div>
            );
    }
}




export default ListProjects
// export default connect(mapStateToProps)(Dashboard);