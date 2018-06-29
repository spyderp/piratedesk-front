

export class Calendar {
	id: number;
	descripcion: string;
	dias:string;
	hora_inicio:string;
	hora_final:string;
	fulltime:number;
	festives=[];
}

export class Client {
	id:           number;
	nombre:  string;
	direccion:string;
	telefono:  string;
	celular:    string;
	email:     string;
	calendar_id:number;
	calendars = [];
}

export class Department {
	id:number;
	descripcion:string;
}

export class Estate {
	id:number;
	descripcion: string;
}

export class Faq {
	id:number;
	title: string;
	content: string;
	orden:number;
	creado:string;
	modificado:string;
	category_id:number;
}

export class CategoryFaq {
	id:number;
	name: string;
	descripcion: string;
}

export class Festive {
	id:number;
	descripcion:string;
	fecha:string;
}

export class Priority {
	id:number;
	descripcion:string;
	respuesta: number;
	resuelto: number;
	escalable:number;
}
export class Rol {
	id:               number;
	descripcion: string;
	privileges:    any;
}
export class Template {
	id:number;
	descripcion:string;
	body:string;
	creado:string;
	modificado:string;
}

export class Trophy {
	id:number;
	descripcion:string;
	puntos:number;
	creado:string;
	modificado:string;
	file_id:number=1;
}

export class User {
	id:            number;
	username:      string;
	password:      string;
	nombre:        string;
	apellido:      string;
	email:         string;
	activo:        boolean;
	creado:        string;
	modificado:    Date;
	ultimo_acceso: Date;
	puntaje:       number;
	rol_id:		   number;
	file_id:	   number=1;
	rol:			any;
	departments: 	 any[]=[];
}

