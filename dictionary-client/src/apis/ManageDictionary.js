import axios from "../axios";

export const apiGetAllDictionary = () =>
    axios({
        url: "/dictionaries",
        method: "get",
});

export const apiCreateDictionary = (data) =>
    axios({
        url: "/dictionaries/dictionary",
        method: "post",
        data,
});

export const apiUpdateDictionary = (data) =>
    axios({
        url: "/dictionaries/update",
        method: "put",
        data,
});


export const apiDeleteDictionary = (id) =>
    axios({
        url: `/dictionaries/${id}`,
        method: "delete",
});