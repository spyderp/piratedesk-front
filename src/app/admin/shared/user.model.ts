
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
	rol:			any;
	departments: 	 any[]=[];
}
