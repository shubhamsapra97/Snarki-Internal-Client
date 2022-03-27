import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_REGISTER_REQUESTS } from "./queries/getRequests";
import { TailSpin } from "react-loader-spinner";

import "./AddRequests.css";

const AddRequests = () => {
    const navigate = useNavigate();
    const { loading, error, data: requests } = useQuery(GET_REGISTER_REQUESTS, {
        fetchPolicy: 'network-only'
    });
    if (error) console.log("failed to fetch me data");

    return (
        <div className="add-requests-container">
            <div className="add-title">Active Registeration Requests</div>
            {   
                loading ? <div className="add-request-loading">
                    {"Fetching Registration Requests ..."}
                    <TailSpin ariaLabel="loading-indicator" width={50} />
                </div> :
                requests.getRegisterRequests.requests ?
                    <div className="add-table-container">
                        <table className="add-requests">
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>User Email</th>
                                    <th>Restaurant Name</th>
                                    <th>Restaurant Address</th>
                                    <th>Restaurant Registeration Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    requests.getRegisterRequests.requests.map((request, index) => (
                                        <tr key={index} onClick={() => {
                                            navigate(`/dashboard/requests/add/${request._id}`);
                                        }}>
                                            <td>{index+1}</td>
                                            <td>{request.user.email}</td>
                                            <td>{request.restaurant.name}</td>
                                            <td>{request.restaurant.address}, {request.restaurant.city}, {request.restaurant.state}</td>
                                            <td>{request.restaurant.status === "registered" ? "registered" : "unregistered"}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    : <div className="no-add-requests">"No Registration Requests!!"</div>
            }
        </div>
    );
};

export default AddRequests;
