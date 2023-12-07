const response = (result: string, error: string, data: {}) => {
    return {
        result: result || '',
        error: error || '',
        data: data || {}
    } 
}

export default response