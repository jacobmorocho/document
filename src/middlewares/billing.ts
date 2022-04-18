import axios from "axios";

const Billing = () => {
    const Token = async () => {
        return await (await axios.post("https://facturacion.apisperu.com/api/v1/auth/login", {
            "username": "Eliasmorocho", "password": "1@@eliasmorochoA"
        })).data
    }
    const Invoice = () => {
        const Send = async (token, body) => {
            const headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }
            return await (await axios.post("https://facturacion.apisperu.com/api/v1/invoice/send", body, headers)).data
        }
        const Xml = async (token, body) => {
            const headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }
            return await (await axios.post("https://facturacion.apisperu.com/api/v1/invoice/xml", body, headers)).data
        }
        return {
            Send,
            Xml
        }
    }
    const Note = () => {
        const Send = async (token, body) => {
            const headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }
            return await (await axios.post("https://facturacion.apisperu.com/api/v1/note/send", body, headers)).data
        }
        return {
            Send
        }
    }
    const Voided = () => {
        const Send = async (token, body) => {
            const headers = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }
            return await (await axios.post("https://facturacion.apisperu.com/api/v1/voided/send", body, headers)).data
        }
        const Ticket = async (body) => {
            return await (await axios.post(" https://facturacion.apisperu.com/api/v1/voided/status", body)).data

        }
        return {
            Send,
            Ticket
        }

    }
    return {
        token: Token,
        invoice: Invoice,
        note: Note,
        voided: Voided,

    }
}

export { Billing }