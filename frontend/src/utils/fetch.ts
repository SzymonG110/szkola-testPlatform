interface FetchType {
    method: 'get' | 'post'
    token?: string,
    body?: {
        [x: string]: any
    }
}

const fetchUtil = async (endpoint: string, options: FetchType) => {

    let res: Response | undefined
    if (options.method !== 'get')
        res = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
            method: options.method,
            headers: {
                'Content-Type': 'application/json',
                'token': options?.token as string
            },
            body: JSON.stringify({
                ...options.body
            })
        })
    else
        res = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
            method: options.method,
            headers: {
                'token': options?.token as string
            }
        })

    return {
        status: res.status,
        json: await res.json()
    }

}

export default fetchUtil