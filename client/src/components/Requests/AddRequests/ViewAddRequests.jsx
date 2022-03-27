import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import { useNavigate, useParams } from "react-router-dom";
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_REGISTER_REQUEST } from "./queries/getRequests";
import { GET_DOCUMENTS } from "./queries/getDocuments";
import { ADD_RESTAURANT_STATUS_UPDATE } from "./queries/addRestaurant";
import { GET_SIMILAR_RESTAURANTS } from "./queries/getSimilarRestaurants";
import { TailSpin } from "react-loader-spinner";
import PdfViewer from "../../PdfViewer/PdfViewer";
import { cleanData } from "../../../utils/DOMPurify";
import "./ViewAddRequests.css";

const ViewAddRequest = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [error, setErrorMessage] = useState("");
    const [requestData, setRequestData] = useState({});
    const [documents, setDocuments] = useState([]);
    const [images, setImages] = useState([]);
    const [fetchRequestData] = useLazyQuery(GET_REGISTER_REQUEST);
    const [fetchDocuments] = useLazyQuery(GET_DOCUMENTS);
    const [updateClaimStatus] = useMutation(ADD_RESTAURANT_STATUS_UPDATE);
    const [getSimilarRestaurants] = useLazyQuery(GET_SIMILAR_RESTAURANTS);

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
        onSubmit: () => {},
    });

    const fetchRequestDataFn = async () => {
        const {data} = await fetchRequestData({
            nextFetchPolicy: 'cache-and-network',
            variables: {
                _id: requestId
            }
        });

        const similarRestaurantsData = await getSimilarRestaurants({
            nextFetchPolicy: 'cache-and-network',
            variables: {
                _id: requestId
            }
        });

        setRequestData({
            similarRestaurants: similarRestaurantsData.data.getSimilarRestaurants,
            registerRestaurantData: data.getRegisterRequest
        });
    }

    useEffect(() => {
        if (requestId) {
            fetchRequestDataFn();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (requestData.error) console.log("failed to fetch me data");
    const requests = requestData?.registerRestaurantData?.requests || [];
    const similarRestaurants = requestData?.similarRestaurants?.restaurants || [];

    const getRegisterDocuments = async () => {

        const {data} = await fetchDocuments({
            nextFetchPolicy: 'cache-and-network',
            variables: {
                _id: requestId,
                type: "register"
            }
        });

        if (data.getDocuments.code === 200) {
            setDocuments(data.getDocuments.documentUrls);
            setImages(data.getDocuments.imageUrls);
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

            if (data.addRequestUpdate.code !== 200) {
                setErrorMessage(data.addRequestUpdate.message);
            } else {
                navigate("/dashboard/requests/add");
            }
        }

    }

    return (
        <div className="view-add-requests">
            {
                !Object.keys(requestData).length || requestData.loading ?
                    <div className="view-add-request-loading">
                        {"Fetching Registration Request ..."}
                        <TailSpin ariaLabel="loading-indicator" width={50} />
                    </div> :
                    requests.length ? (
                        <div className="view-add-request-data-container">
                            <div className="view-add-request-title">
                                Restaurant Details:
                            </div>
                            <div className="view-add-table-container">
                                <table className="view-add-requests-table">
                                    <thead>
                                        <tr>
                                            <th>Restaurant Name</th>
                                            <th>Address</th>
                                            <th>Contact</th>
                                            <th>Hours</th>
                                            <th>Cuisines</th>
                                            <th>Coordinates</th>
                                            <th>Status</th>
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
                                                    <td>{request.restaurant.status === "registered" ? "registered" : "unregistered"}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <div className="view-add-request-title">
                                User Details:
                            </div>
                            <div className="view-add-table-container">
                                <table className="view-add-requests-table">
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

                            {
                                similarRestaurants.length ? (
                                <>
                                    <div className="view-add-request-title">
                                        Similar Restaurant Details:
                                    </div>
                                    <div className="view-add-table-container">
                                        <table className="view-add-requests-table">
                                            <thead>
                                                <tr>
                                                    <th>Restaurant Name</th>
                                                    <th>Address</th>
                                                    <th>Contact</th>
                                                    <th>Hours</th>
                                                    <th>Cuisines</th>
                                                    <th>Coordinates</th>
                                                    <th>Status</th>
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
                                                            <td>{request.restaurant.status === "registered" ? "registered" : "unregistered"}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                                ) : null
                            }

                            <div className="view-add-request-title">
                                Documents:
                            </div>
                            <div>
                                Click on this button to request for documents from server {" "}
                                <button onClick={getRegisterDocuments}>Request Registration Docs</button>
                            </div>
                            {
                                documents.length ?
                                    <div className="add-document-container">
                                        {
                                            documents.map((url, index) => (
                                                <PdfViewer key={index} url={url} />
                                            ))
                                        }
                                    </div> : null
                            }
                            
                            {
                                images.length ?
                                    <div className="add-document-container">
                                        <div className="view-add-request-title">Restaurant Images</div>
                                        {
                                            images.map((url, index) => (
                                                <img
                                                    src={url}
                                                    alt={`register-${index}`}
                                                    className="register-restaurant-image"
                                                />
                                            ))
                                        }
                                    </div> : null
                            }

                            <form onSubmit={formik.handleSubmit}>
                                <div className="add-form-options">
                                    <div>
                                        <label htmlFor="reason">
                                            Approve/Reject Reason<span className="add-asterisk">*</span>
                                            {
                                                formik.touched['reason'] && formik.errors.reason ?
                                                    <span className="add-restaurant-error">{formik.errors.reason}</span>
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
                                <div className="add-controls-container">
                                    <button
                                        type="button"
                                        className="add-controls"
                                        onClick={() => updateStatusClick("rejected")}
                                    >
                                        Reject
                                    </button>
                                    <button
                                        type="button"
                                        className="add-controls"
                                        onClick={() => updateStatusClick("approved")}
                                    >
                                        Approve
                                    </button>
                                </div>
                            </form>

                            {
                                error ?
                                    <div className="add-restaurant-error-message">{error}</div>
                                    : null
                            }

                        </div>
                    ) : <div className="request-not-found">"Request Not Found!"</div>
            }
        </div>
    );
};

export default ViewAddRequest;
