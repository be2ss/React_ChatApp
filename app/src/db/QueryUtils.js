import axios from 'axios';
import * as constant from '../const/ConstantDB';

class QueryUtils {
    static URL_DB = constant.URL_DB;

    static getAllUsers() {
        var allUsers = [];
        var responseArray = [];
        return axios
            .get(QueryUtils.URL_DB + 'users', {})
            .then((response) => {
                response.data.forEach(function (user) {
                    const userToAdd = user;
                    // requete sur l'avatar
                    responseArray.push(
                        axios
                            .get(
                                constant.URL_DB + `avatar/${userToAdd.user_id}`,
                                {}
                            )
                            .then((resAvatar) => {
                                if (resAvatar.data.length > 0) {
                                    userToAdd.avatar_url =
                                        resAvatar.data[0].avatar_url;
                                }
                                return userToAdd;
                            })
                    );
                });

                return responseArray;
            })
            .catch((error) => {
                // do something when request was unsuccessful
            })
            .then(async function (responseArray) {
                // responsearray should have all the promises by now
                return Promise.all(responseArray)
                    .then((results) => {
                        for (let user of results) {
                            allUsers.push(user);
                        }

                        return allUsers;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
    }

    static getUserFromId(ownerUserId) {
        var responseArray = [];
        return axios
            .get(QueryUtils.URL_DB + `user/${ownerUserId}`, {})
            .then((response) => {
                response.data.forEach(function (user) {
                    const userToAdd = user;
                    // requete sur l'avatar
                    responseArray.push(
                        axios
                            .get(
                                constant.URL_DB + `avatar/${userToAdd.user_id}`,
                                {}
                            )
                            .then((resAvatar) => {
                                if (resAvatar.data.length > 0) {
                                    userToAdd.avatar_url =
                                        resAvatar.data[0].avatar_url;
                                }
                                return userToAdd;
                            })
                    );
                });

                return responseArray;
            })
            .catch((error) => {
                // do something when request was unsuccessful
            })
            .then(async function (responseArray) {
                // responsearray should have all the promises by now
                return Promise.all(responseArray)
                    .then((results) => {
                        return results;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
    }
}

export default QueryUtils;
