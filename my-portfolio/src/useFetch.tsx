import { useEffect, useState } from "react";

function useFetch<T>(url: string) {
    
    const [data, setData] = useState<T[]|[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(()=>{
        setIsLoading(true);
        fetch(url)
        .then((res)=>{
            if(!res.ok){
                throw new Error("failed to fetch check useFetch");
            }
            return res.json()
        })
        .then((data)=>{
            setData(data);
            setIsLoading(false);
            
        })
        .catch((err)=>{
            setError(err.message);
            setIsLoading(false);
        })
    },[url]);
    
    return ({data, isLoading, error} );
}

export default useFetch;