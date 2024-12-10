import axios from 'axios';

import { useEffect,useState } from 'react';
const useAxios = (url)=>{
    const [columns, setColumns] = useState([]);
    const [records, setRecords] = useState([]);    
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(url).then((response) => {
            setColumns(Object.keys(response.data[0]));
            setRecords(response.data);
        }).catch((error) => {
            setErrorMessage(error.message);
        }).finally(()=>{
            setLoading(false);
        })
        
      }, [url]); 

    return {columns, records, setColumns,setRecords, errorMessage, loading,setLoading };

}

export default useAxios
