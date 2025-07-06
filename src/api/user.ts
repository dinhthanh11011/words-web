import axios from '@/lib/axios';

export async function getUserInfo() {
    const res = await axios.get('/users/information');
    return res.data;
}

export async function logout() {
    const res = await axios.get('/auth/logout');
    return res.data;
}

const userApis = {
    getUserInfo,
    logout
}
export default userApis;