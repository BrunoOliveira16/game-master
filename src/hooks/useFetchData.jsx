import { useState, useEffect } from 'react';

// Data
import { fetchData } from "data/data";

const useFetchData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchData().then(data => {
            setData(data);
            setLoading(false);
        }).catch(error => {
            setError(error.message);
            setLoading(false)
        })
    }, []);
    
    //console.log(data)

    return { data, loading, error }
}

export default useFetchData;