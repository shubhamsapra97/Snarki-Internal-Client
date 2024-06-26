import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import { useNavigate, useParams } from "react-router-dom";
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_CLAIM_REQUEST } from "./queries/getRequests";
import { GET_DOCUMENTS } from "./queries/getDocuments";
import { CLAIM_RESTAURANT_STATUS_UPDATE } from "./queries/claimRestaurant";
import { TailSpin } from "react-loader-spinner";
import PdfViewer from "../PdfViewer/PdfViewer";
import { cleanData } from "../../utils/DOMPurify";
import "./ViewClaimRequests.css";

const ViewClaimRequest = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [error, setErrorMessage] = useState("");
    const [requestData, setRequestData] = useState({});
    const [documents, setDocuments] = useState([]);
    const [fetchRequestData] = useLazyQuery(GET_CLAIM_REQUEST);
    const [fetchDocuments] = useLazyQuery(GET_DOCUMENTS);
    const [updateClaimStatus] = useMutation(CLAIM_RESTAURANT_STATUS_UPDATE);
    const requestId = params.requestId;

    const validate = values => {
        const errors = {};
      
        if (!values.reason) {
          errors.reason = 'is required';
        }
      
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            reason: ''
        },
        validate,
        onSubmit: () => {return null},
    });

    const fetchRequestDataFn = async () => {
        const {data} = await fetchRequestData({
            nextFetchPolicy: 'cache-and-network',
            variables: {
                _id: requestId
            }
        });

        setRequestData(data);
    }

    useEffect(() => {
        if (requestId) {
            fetchRequestDataFn();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (requestData.error) console.log("failed to fetch me data");
    const requests = requestData?.getClaimRequest?.requests || [];

    const getClaimDocuments = async () => {

        const {data} = await fetchDocuments({
            nextFetchPolicy: 'cache-and-network',
            variables: {
                _id: requestId,
                type: "claim"
            }
        });

        if (data.getDocuments.code === 200) {
            setDocuments(data.getDocuments.documentUrls);
        }

    }

    const updateStatusClick = async (status) => {
        setErrorMessage("");

        if (formik.values.reason) {
            const {data} = await updateClaimStatus({
                variables: {
                    status,
                    _id: requestId,
                    reason: formik.values.reason
                }
            });

            if (data.claimRequestUpdate.code !== 200) {
                setErrorMessage(data.claimRequestUpdate.message);
            } else {
                navigate("/");
            }
        }

    }

    return (
        <div className="view-claim-requests">
            {
                !Object.keys(requestData).length || requestData.loading ?
                    <div className="view-claim-request-loading">
                        {"Fetching Claim Request ..."}
                        <TailSpin ariaLabel="loading-indicator" width={50} />
                    </div> :
                    requests.length ? (
                        <div className="view-claim-request-data-container">
                            <div className="view-claim-request-title">
                                Restaurant Details:
                            </div>
                            <div className="view-claim-table-container">
                                <table className="view-claim-requests-table">
                                    <thead>
                                        <tr>
                                            <th>Restaurant Name</th>
                                            <th>Address</th>
                                            <th>Contact</th>
                                            <th>Hours</th>
                                            <th>Cuisines</th>
                                            <th>Coordinates</th>
                                            <th>Claimed</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            requests.map((request, index) => (
                                                <tr key={index}>
                                                    <td>{request.restaurant.name}</td>
                                                    <td>
                                                        {request.restaurant.address},
                                                        {request.restaurant.city},
                                                        {request.restaurant.state},
                                                        {request.restaurant.postalCode}
                                                    </td>
                                                    <td>{request.restaurant.contact}</td>
                                                    <td>{request.restaurant.hours}</td>
                                                    <td>{request.restaurant.cuisines.join(", ")}</td>
                                                    <td>{request.restaurant.location.coordinates.join(", ")}</td>
                                                    <td>{request.restaurant.claimed === "true" ? "claimed" : "unclaimed"}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <div className="view-claim-request-title">
                                User Details:
                            </div>
                            <div className="view-claim-table-container">
                                <table className="view-claim-requests-table">
                                    <thead>
                                        <tr>
                                            <th>User Email</th>
                                            <th>Role</th>
                                            <th>Verified</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            requests.map((request, index) => (
                                                <tr key={index}>
                                                    <td>{request.user.email}</td>
                                                    <td>{request.user.role}</td>
                                                    <td>{request.user.verified === "true" ? "verified" : "unverified"}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <div className="view-claim-request-title">
                                Documents:
                            </div>
                            <div>
                                Click on this button to request for documents from server {" "}
                                <button onClick={getClaimDocuments}>Request Claim Docs</button>
                            </div>
                            {
                                documents.length ?
                                    <div className="claim-document-container">
                                        {
                                            documents.map((url, index) => (
                                                <PdfViewer key={index} url={url} />
                                            ))
                                        }
                                    </div> : null
                            }

                            <form onSubmit={formik.handleSubmit}>
                                <div className="claim-form-options">
                                    <div>
                                        <label htmlFor="reason">
                                            Approve/Reject Reason<span className="claim-asterisk">*</span>
                                            {
                                                formik.touched['reason'] && formik.errors.reason ?
                                                    <span className="claim-restaurant-error">{formik.errors.reason}</span>
                                                    : null
                                            }
                                        </label>
                                        <input
                                            id="reason"
                                            name="reason"
                                            checked={formik.values.reason}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                </div>
                                <div className="claim-controls-container">
                                    <button
                                        type="button"
                                        className="claim-controls"
                                        onClick={() => updateStatusClick("rejected")}
                                    >
                                        Reject
                                    </button>
                                    <button
                                        type="button"
                                        className="claim-controls"
                                        onClick={() => updateStatusClick("approved")}
                                    >
                                        Approve
                                    </button>
                                </div>
                            </form>

                            {
                                error ?
                                    <div className="claim-restaurant-error-message">{error}</div>
                                    : null
                            }

                        </div>
                    ) : <div className="request-not-found">"Request Not Found!"</div>
            }
        </div>
    );
};

export default ViewClaimRequest;
