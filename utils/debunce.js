function debunce(func, duration){
    let timeout = null;
     return function () {
        const call = () => func.apply(this, arguments);
         clearTimeout(timeout);
        setTimeout(call, duration);
     }
}

export default debunce;