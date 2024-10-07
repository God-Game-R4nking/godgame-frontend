import React from "react";

const LocalStorageManager = (acessToken) => {
    localStorage.setItem('acessToken', JSON.stringify(acessToken))

    useEffect(() => {
        localStorage.setItem('my-data', JSON.stringify(data))
    })
}

export default LocalStorageManager;
