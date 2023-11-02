import {Connection, Channel, connect, Message} from "amqplib"


export default class RabbitMQServer {

    private conn: Connection
    private channel: Channel

    constructor (private uri: string){

    }

    //cria a conexao
    async start(): Promise<void>{
        this.conn = await connect(this.uri)
        this.channel = await this.conn.createChannel()
    }

    //adiciona a msg na fila
    async publishInQueue(queue: string, message: string){
        return this.channel.sendToQueue(queue, Buffer.from(message))
    }

    async publishInExchange(exchange: string, routingKey: string, message: string): Promise<boolean>{
        return this.channel.publish(exchange, routingKey, Buffer.from(message))
    }

    //le a mensagem
    async consume(queue: string, callback: (message: Message) => void){
        return this.channel.consume(queue, (message) => {
            if(message){
                callback(message)
                this.channel.ack(message)
            }

        })
    }
}