"use strict";
exports.__esModule = true;
exports.apiClient = void 0;
var axios_1 = require("axios");
var secret = process.env.JWT_SECRET;
function apiClient(ctx) {
    // const { 'next-auth.session-token': token } = parseCookies(ctx)
    var api = axios_1["default"].create({
        baseURL: 'http://localhost:3333'
    });
    api.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        console.log(error);
        var status = error.response.status;
        if (status === 401) {
            console.log(error.response);
            return location.href = '/';
        }
        return Promise.reject(error);
    });
    // if (token) {
    //     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // }
    return api;
}
exports.apiClient = apiClient;
