

export class Client {
	id:           number;
	nombre:  string;
	direccion: string;
	telefono:  string;
	celular:    string;
	email:     string;
}

export class Department {
	id: number;
	descripcion: string;
}

export class Estate {
	id: number;
	descripcion: string;
}

export class Priority {
	id: number;
	descripcion: string;
	respuesta: number;
	resuelto: number;
	escalable: number;
}
export class Rol {
	id:               number;
	descripcion: string;
	privileges:    any;
}
export class Template {
	id: number;
	descripcion: string;
	body: string;
	creado: string;
	modificado: string;
}



export class User {
	id:            number;
	username: string;
	password: string;
	nombre: string;
	apellido: string;
	email: string;
	activo: boolean;
	creado: string;
	modificado: Date;
	ultimo_acceso: Date;
	puntaje: number;
	rol_id: number;
	file_id: number = 1;
	rol: any;
	clients: 	 any[]=[];
	departments: 	 any[]=[];
}


