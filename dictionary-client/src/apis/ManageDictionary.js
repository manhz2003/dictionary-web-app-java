import axios from "../axios";

export const apiGetAllDictionary = () =>
    axios({
        url: "/dictionaries",
        method: "get",
});

export const apiCreateDictionary = (data) =>
    axios({
        url: "/dictionaries",
        method: "post",
        data,
});

export const apiUpdateDictionary = (data) =>
    axios({
        url: "/dictionaries",
        method: "put",
        data,
});


export const apiDeleteDictionary = (id) =>
    axios({
        url: `/dictionaries/${id}`,
        method: "delete",
});