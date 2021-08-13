import { httpService } from "../managers/httpService";
import { httpConstants } from "../constants";

export default { getListOfWhitelistedAddress, addWhitelistedAddress, deleteWhitelistedAddress }
async function getListOfWhitelistedAddress() {
    let url = process.env.REACT_APP_GET_LIST_OF_WHITELISTED_ADDRESS;
    return httpService(httpConstants.METHOD_TYPE.GET, { 'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON }, {}, url)
        .then(
            response => {
                if (!response.success || response.responseCode !== 200 || !response.responseData || response.responseData.length === 0)
                    return Promise.reject();
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