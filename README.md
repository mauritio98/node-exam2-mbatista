## Introducció

En aquest exercici anem afegir el paquet framework express.

<br>

## Requisits

- Primer fer un _Fork_ d'aquest repositori https://github.com/rgarciamvm/node-express-exam.git
- Després clona __el teu__ repositori

## Lliurament

Una vegada finalitzat...:

```shell
$ git add .
$ git commit -m "done"
$ git push origin master
```
## Enviament

Per enviar l'exercici feu servir el classroom:

1. Heu d'enviar-me el link del vostre repositori github (exemple : https://github.com/usuari/node-express-exam.git)
2. Heu d'enviar-me els fitxers un ZIP amb **TOT** el codi.

## S'ha de codificar

- 1 Codificar **validar password**- 
- 2 Codificar **retornar UN** usuari GET http://localhost:3000/users/spyder@dominio.es

> Extenssió afegir privilegis

- 3 Codificar **afegir privilegis** a un usuari POST http://localhost:3000/users/grants
- 4 Codificar **eliminar UN o VARIS privilegis** a un usuari DELETE http://localhost:3000/users/grants
- 5 Codificar **afegir UN o VARIS nous privilegis** un usuari PUT http://localhost:3000/users/grants

> Extenssió renovar password

- 6 Codificar **nou password** PUT http://localhost:3000/users/newpass

> Extenssió acivar/desactivar usuari

- 7 Codificar **eliminar usuari** DELETE http://localhost:3000/users/user
- 8 Codificar **activar usuari** PUT http://localhost:3000/users/user


## Codificar **validar password** en un middleware ( +1 punt)

Has de codificar una política de regles pels passwords.

Una contrasenya que conté almenys 1 majúscula, 1 minúscula, 1 dígit, 1 caràcter especial i té una longitud d'almenys 10

L'expressió regular és : ^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$

```
POST http://localhost:3000/users/register
Content-Type: application/json

{
"username":"thor@dominio.es", "password":"Go1&567890"
}

{
  "username": "thor@dominio.es",
  "password": "$2b$10$KIar63PS0Ky522bEeLsOO.NtAwbYFErLp2CfuzsIQ5mv1EtLRbeIS",
  "timestamp": "2022-03-27T19:26:03.179Z",
}

``` 

En cas de no cumplir 

```
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 40
ETag: W/"28-bLjbmQNWmrg26zBf8Dztj4KyMSk"
Date: Sun, 27 Mar 2022 19:29:00 GMT
Connection: close

{
  "ERROR": "Error reglas para elpassword"
}
```


## Codificar **retornar UN** usuari (+1 punt)

Un usuari prèviament registrat, amb el missatge HTTP GET i passant l'usuari com a paràmetre, 

(**IMPORTANT!!, No pot retornar el password.**) 
Utilitzeu _JSON.parse(JSON.stringify(objecte))_ per realitzar una còpia d'un objecte, Si fos necessari fer una còpia d'un objecte per eliminar una propietat.
Recordeu que en Javascript els objectes són per "referència". _const Ob1 {};, const Obj2 = Obj1;..._ són el mateix objecte.

Ha de retonar. 

```
POST http://localhost:3000/users/register 
Content-Type: application/json

{
"username":"spyder@dominio.es", "password":"man$Super1"
}

GET http://localhost:3000/users/spyder@dominio.es

Retornar:

{
  "username": "spyder@dominio.es",
  "timestamp": "2022-03-27T19:15:12.950Z",
}
```

## Codificar **afegir privilegis** a un usuari (+1 punt)

Un usuari prèviament registrat, amb el missatge HTTP POST /grants afegir un array de privilegis a un usuari. Si ja existeixen privilegis per aquest usuari, se substitueix pel nou array.

```

POST http://localhost:3000/users/grants
Content-Type: application/json

{
"username":"aquaman@dominio.es", "grants":["create_database","create_role","create_table","create_view"]
}

```

## Codificar **eliminar UN o VARIS privilegis** a un usuari (+1 punt)

Un usuari prèviament registrat, amb el missatge HTTP DELETE /grants eliminar privilegis a un usuari.

```
DELETE http://localhost:3000/users/grants
Content-Type: application/json

{
"username":"aquaman@dominio.es", "grants":["create_database"]
}

```
Hauria de retornar:

```

GET http://localhost:3000/users/aquaman@dominio.es

{
  "username": "aquaman@dominio.es",
  "password": "$2b$10$oLWPEurAeqzq/KTBFBlKceUJvg9ET9J0Bml3pk2VqH0P.LqAibJey",
  "timestamp": "2022-03-27T19:36:46.526Z",
  "grants": [
    "create_role",
    "create_table",
    "create_view"
  ]
}

```

## Codificar **afegir UN o VARIS nous privilegis** un usuari (+1 punt)

Un usuari prèviament registrat, amb el missatge HTTP PUT /grants afegir privilegis a un usuari que ja té un array de privilegis.
(**IMPORTANT!!, No es poden repetir els privilegis, han de ser únics. És a dir, si afegeixo un altra vegada els mateixos, no s'haurien d'afegir a la array "grants"**)

```
PUT http://localhost:3000/users/grants
Content-Type: application/json

{
"username":"aquaman@dominio.es", "grants":["create_user","alter_table"]
}

```
Hauria de retornar:

```
{
  "username": "aquaman@dominio.es",
  "password": "$2b$10$oLWPEurAeqzq/KTBFBlKceUJvg9ET9J0Bml3pk2VqH0P.LqAibJey",
  "timestamp": "2022-03-27T19:36:46.526Z",
  "grants": [
    "create_role",
    "create_table",
    "create_view",
    "create_user",
    "alter_table"
  ]
}

```

## Codificar **nou password** (+2 punts)

Un usuari prèviament registrat, amb el missatge HTTP PUT /newpass s'ha de poder canviar el password, és a dir, donat un nou paswword substituir-lo per l'actual.
**IMPORTANT!!!, he de tenir en compte l'encriptació.**

```
///-------------new Password-------------------
####
POST http://localhost:3000/users/register
Content-Type: application/json

{
"username":"iron@dominio.es", "password":"man$Super1"
}

####
PUT http://localhost:3000/users/newpass
Content-Type: application/json

{
"username":"iron@dominio.es", "password":"man$Super1", "newpassword":"man$Super2"
}

####
POST http://localhost:3000/users/login
Content-Type: application/json

{
"username":"iron@dominio.es", "password":"man$Super2"
}

```

## Codificar **eliminar usuari** (2 PUNT)

Un usuari prèviament registrat, amb el missatge HTTP DELETE /user s'ha de poder marcar l'usuari com a eliminat. Ho marcarem afegint la propietat active = 0.

**IMPORTANT!!! No eliminem físicament l'usuari només i posem el camp active a 0.**

**IMPORTANT!!! Heu de modificar l'acció de login, ja que si l'usuari no està actiu, no pot iniciar sessió i per tant no pot fer cap acció**

```
///-------------delete user-------------------
####
POST http://localhost:3000/users/register
Content-Type: application/json

{
"username":"hulk@dominio.es", "password":"man$Super6"
}

####
DELETE http://localhost:3000/users/user
Content-Type: application/json

{
"username":"hulk@dominio.es"
}
```
Hauria de retornar: 
Fixeu-vos en el camp **"active"**

```
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 154
ETag: W/"9a-lvxluBw+M6JQNbCqZ/5a/mjaxaM"
Date: Sun, 27 Mar 2022 19:53:58 GMT
Connection: close

{
  "username": "hulk@dominio.es",
  "password": "$2b$10$DW3wJ.9uBuJtO56ues.rtuVCtj0rcCdnNUpzidl8ueaqjXOmskLI6",
  "timestamp": "2022-03-27T19:53:58.118Z",
  "active": 1
}


HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 154
ETag: W/"9a-9sJcJ6zBp6ieVdjG6G6e63GU8Go"
Date: Sun, 27 Mar 2022 19:54:52 GMT
Connection: close

{
  "username": "hulk@dominio.es",
  "password": "$2b$10$DW3wJ.9uBuJtO56ues.rtuVCtj0rcCdnNUpzidl8ueaqjXOmskLI6",
  "timestamp": "2022-03-27T19:53:58.118Z",
  "active": 0
}

```
## Codificar **activar usuari** (+1 punts)

Un usuari prèviament registrat, amb el missatge HTTP PUT /user s'ha de poder marcar l'usuari com a **actiu**. Ho marcarem afegint la propietat active = 1.

```
///-------------active user-------------------
####
PUT http://localhost:3000/users/user
Content-Type: application/json

{
"username":"hulk@dominio.es"
}

####
POST http://localhost:3000/users/login
Content-Type: application/json

{
"username":"hulk@dominio.es", "password":"man$Super6"
}

```