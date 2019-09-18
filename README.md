# PiratedeskFrontend

Mesa de ayuda de software libre.  (FRONTEND)
Debido a la necesidad de tener una opción de sofware libre que use las nuevas tendencia se ha desarrollado este proyecto. 

Si deseas colaborar solo revisa los issue. 

## Caracteisticas

 - Administración de usuarios.
 - Manejo calendario de trabajo.
 - Adminsitración de clientes.
 - Admkinsitración de Departamento
 - Manejo de caso por estados.
 - Configurar días festivos.
 - Gamificación
 - Creación de plantilla para maenejo de casos. 
 - Base de Datos de conocimiento (Knowledges DB)
 - Bandeja de Entrada
 - Seguimiento de caso, chat en tiempo real  
 - Creación y administración de FAQ
 - Configuración

## Caracteristicas técnicas

 - Creado en Angular
 - Uso de SASS 
 - CORS 
 - Uso webtoken
 - Configuración  Para acceso a **backend** RESTFULL

## Configuración 

 1. Acceder al archivo **enviroment.ts** dentro de la carpeta *src/enviroments* y cambiar la ruta de su  **ApiServer**

```ts
export const environment = {
  production: false,
  apiServer: 'http://1.1.1.1:5000', #modificar
};
```
**Nota:** El archivo *enviroment.prod.ts* es la configuración del archivo para puesta en producción

 2. Inicia el servidor.

```bash
ng serve --open
```

