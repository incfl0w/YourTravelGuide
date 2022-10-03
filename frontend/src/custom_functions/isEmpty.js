function isEmpty(obj) {
    try{
        return Object.keys(obj).length === 0;
    }
    catch{
        return null
    }
    
}

export default isEmpty;