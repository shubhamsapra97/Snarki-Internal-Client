import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_CLAIM_REQUESTS } from "./queries/getRequests";
import { TailSpin } from "react-loader-spinner";

import "./ClaimRequests.css";

const ClaimRequests = () => {
    const navigate = useNavigate();
    const { loading, error, data: requests } = useQuery(GET_CLAIM_REQUESTS, {
        fetchPolicy: 'network-only'
    });
    if (error) console.log("failed to fetch me data");

    return (
        <div className="claim-requests-container">
            <div className="claim-table-container">
                <div className="claim-title">Active Claim Requests</div>
                {   
                    loading ? <div className="claim-request-loading">
                        {"Fetching Claim Requests ..."}
                        <TailSpin ariaLabel="loading-indicator" width={50} />
                    </div> :
                    requests.getClaimRequests.requests ?
                        <table className="claim-requests">
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>User Email</th>
                                    <th>Restaurant Name</th>
                                    <th>Restaurant Address</th>
                                    <th>Restaurant Claim Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    requests.getClaimRequests.requests.map((request, index) => (
                                        <tr key={index} onClick={() => {
                                            navigate(`/dashboard/requests/claim/${request._id}`);
                                        }}>
                                            <td>{index+1}</td>
                                            <td>{request.user.email}</td>
                                            <td>{request.restaurant.name}</td>
                                            <td>{request.restaurant.address}, {request.restaurant.city}, {request.restaurant.state}</td>
                                            <td>{request.restaurant.claimed === "true" ? "claimed" : "unclaimed"}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        : <div className="no-claim-requests">"No Claim Requests!!"</div>
                }
            </div>
        </div>
    );
};

export default ClaimRequests;
