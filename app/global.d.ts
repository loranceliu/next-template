interface Msg {
    code: number,
    message: string
}

interface Page {
    page: number,
    pageSzie: number,
    total: number,
    data: any [],
}

interface User {
    id: number,
    name: string,
    email: string
}