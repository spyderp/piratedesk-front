export class Filter {
	estado:number[];
	descripcion:string;
	prioridad:number[] = [];
	departamento:number[];
	fecha_desde:Date;
	fecha_hasta:Date;
}

export class Ticket {
	id:number;
	titulo:string
	content:string
	keys:string
	email:string
	telefono:string
	celular:string
	creado:string
	modificado:string
	clients:any
	departments:any
	priorities:any
	states:any
	users:any
	client_id:number
	department_id:number
	state_id:number
	user_id:number
	priority_id:number
	assigments:any[]
	files:any[]
}

export enum Event {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    TYPING = 'typing'
}

export class Message {
	username:string
	message:string
}