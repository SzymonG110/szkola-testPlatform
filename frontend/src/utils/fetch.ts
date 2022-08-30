interface FetchType {
    method: 'get' | 'post'
    body?: {
        token?: string,
        [x: string]: any
    }
}

const fetchUtil = async (endpoint: string, options: FetchType) => {

    let res: Response | undefined
    if (options.method !== 'get')
        res = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
            method: options.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...options.body
            })
        })
    else
        res = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
            method: options.method
        })

    return {
        status: res.status,
        json: await res.json()
    }

}

export default fetchUtil