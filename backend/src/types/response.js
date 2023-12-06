const response = (result, error, data) => {
    return {
        result: result || '',
        error: error || '',
        data: data || {}
    } 
}

export default response