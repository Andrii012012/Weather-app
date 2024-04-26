//the gats all these name

async function getDataInName(name = '', url, key) {
    try {
        const data = await axios.get(`${url}${name}&limit=${100}&appid=${key}`);
        if (data.status === 200) {
            return data.data;
        } else {
            throw new Error();
        }
    } catch (err) {
        console.log(err);
    }
}

//the gets need object 

async function getDataInLon(N, W, url, key) {
    try {
        const data = await axios.get(`${url}${N}&lon=${W}&appid=${key}`);
        if (data.status === 200) {
            return data.data;
        } else {
            throw new Error();
        }
    } catch (err) {
        console.log(err);
    }
}

export {getDataInLon, getDataInName};