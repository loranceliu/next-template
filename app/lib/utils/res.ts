class Response {

    static ok(message: string): Msg {
        return {
                code: 200,
                message: message,
        }
    }

    static failed(message: string): Msg {
        return {
                code: 0,
                message: message,
        }
   }
}

export default Response;