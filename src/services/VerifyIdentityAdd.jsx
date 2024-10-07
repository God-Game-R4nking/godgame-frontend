import axios from "axios";

const sendPostIdentityVerifySecond = async (params) => {
    try {
        const response = await axios.post('http://localhost:8080/api/identity/add-verify', null, {
            params: {
                name: params.name,
                phoneNo: params.phoneNo,
                identity: params.identity,
                telecom: params.telecom
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during identity verification:', error);
        throw error;
    }
};

export default sendPostIdentityVerifySecond;