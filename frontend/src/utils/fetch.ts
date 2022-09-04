interface FetchType {
    method: 'get' | 'post' | 'delete'
    token?: string,
    body?: {
        [x: string]: any
    }
}

const fetchUtil = async (endpoint: string, options: FetchType) => {

    let headers: any = {}
    let body: any

    if (options.token)
        headers['token'] = options.token

    if (options.method !== 'get' && options.body && options.body) {
        headers['Content-Type'] = 'application/json'
        body = JSON.stringify({
            ...options.body
        })
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
        method: options.method,
        headers,
        body
    })

    return {
        status: res.status,
        json: await res.json()
    }

}

export default fetchUtil