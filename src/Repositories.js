import './App.css';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";


function User() {
    const { user } = useParams();
    return (
        <div className="col-12"><h3>Repositories of {user}</h3></div>
    )
}

function Repositories() {
    const { user } = useParams();
    const [repos, setRepos] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            const response = await fetch("https://api.github.com/users/" + user + "/repos?per_page=100&access_token=36b99a4bb527758a516be8cbb69d421bfb66ec93");
            const repos = await response.json();
            setRepos(repos);
        };
        loadData()
    }, [])
    return repos.map(function (repo) {
        return (
            <div key={repo.id} className="col-3 my-1">
                <div className="card" >
                    <div className="card-header">
                        <h5 className="h5"><strong>{repo.name}</strong></h5>
                    </div>
                    <div className="card-body">
                        <div className="card-text"><a href={repo.html_url} target="_blank" rel="noreferrer">{repo.html_url}</a></div>
                        <div className="card-text"><strong>Description: </strong><p >{repo.description}</p></div>
                        <div className="card-text"><strong>Open Issues: </strong>{repo.open_issues_count}</div>
                        <div className="card-text"><strong>Forks:</strong>  {repo.forks} </div>
                    </div>
                </div>
            </div>
        );
    });
}


export {Repositories, User};
