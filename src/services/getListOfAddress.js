import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default { getListOfWhitelistedAddress, addWhitelistedAddress, deleteWhitelistedAddress, editWhitelistedAddress, loginapi, logoutapi, resetpassword, changepassword }
async function getListOfWhitelistedAddress(data) {
    let url = process.env.REACT_APP_GET_LIST_OF_WHITELISTED_ADDRESS;
    // +`?skip=${skip}&limit=${limit}`;
    return httpService(httpConstants.METHOD_TYPE.POST, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON },data, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                    return Promise.reject();
                console.log("lisofdata",response.responseData) 
                return Promise.resolve(response.responseData);

            }
        ).catch(function (err) {
            return Promise.reject(err);
        });
}
async function addWhitelistedAddress(reqObj) {
    let url = process.env.REACT_APP_ADD_WHITELISTED_ADDRESS;
    return httpService(httpConstants.METHOD_TYPE.POST, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, reqObj, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                    return Promise.reject();
                return Promise.resolve(response.responseData);

            }
           
        ).catch(function (err) {
            return Promise.reject(err);
        },
        // console.log("respposne",response);
        );
}
async function deleteWhitelistedAddress(id) {
    let url = process.env.REACT_APP_DELETE_WHITELISTED_ADDRESS;
    return httpService(httpConstants.METHOD_TYPE.POST, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, id, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                    return Promise.reject();
                return Promise.resolve(response.responseData);

            }
           
        ).catch(function (err) {
            return Promise.reject(err);
        },
        // console.log("respposne",response);
        );
}
async function editWhitelistedAddress(id) {
    let url = process.env.REACT_APP_EDIT_WHITELISTED_ADDRESS;
    return httpService(httpConstants.METHOD_TYPE.POST, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, id, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                    return Promise.reject();
                return Promise.resolve(response.responseData);

            }
           
        ).catch(function (err) {
            return Promise.reject(err);
        },
        // console.log("respposne",response);
        );
}

async function loginapi(reqObj) {
    let url = process.env.REACT_APP_AUTH0_LOGIN_API;
    return httpService(httpConstants.METHOD_TYPE.POST, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, reqObj, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                    return Promise.reject();
                return Promise.resolve(response.responseData);

            }
           
        ).catch(function (err) {
            return Promise.reject(err);
        },
        // console.log("respposne",response);
        );
}

async function logoutapi(reqObj) {
    let url = process.env.REACT_APP_AUTH0_LOGOUT_API;
    return httpService(httpConstants.METHOD_TYPE.POST, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, reqObj, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                    return Promise.reject();
                return Promise.resolve(response.responseData);

            }
           
        ).catch(function (err) {
            return Promise.reject(err);
        },
        // console.log("respposne",response);
        );
}

async function resetpassword(reqObj) {
    let url = process.env.REACT_APP_AUTH_SERVICE_BASE_URL + "reset-password";
    return httpService(httpConstants.METHOD_TYPE.POST, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, reqObj, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                    return Promise.reject();
                return Promise.resolve(response.responseData);

            }
           
        ).catch(function (err) {
            return Promise.reject(err);
        },
        // console.log("respposne",response);
        );
}
async function changepassword(reqObj) {
    let url = process.env.REACT_APP_AUTH0_CHANGE_PASSWORD_API;
    return httpService(httpConstants.METHOD_TYPE.POST, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, reqObj, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                    return Promise.reject();
                return Promise.resolve(response.responseData);

            }
           
        ).catch(function (err) {
            return Promise.reject(err);
        },
        // console.log("respposne",response);
        );
}