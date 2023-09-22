
![logo-mdLinks](logo-mdLinks.png)
## Índice

* [1. Preámbulo](#1-Preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Instalación](#3-instalación)
* [4. Funcionamiento](#4-consideraciones-generales)


***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en
muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, etc.) y
es muy común encontrar varios archivos en ese formato en cualquier tipo de
repositorio (empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.


## 2. Resumen del proyecto

`md-Links` es una librería en Node.js que funcionará como herramienta para analizar links dentro de archivos Markdown, para verificar los links que contengan y reportar
algunas estadísticas. 

Esta librería estará disponible de dos formas: 
* Módulo publicado en GitHub, que las usuarias podrán instalar e importar en otros proyectos.
* Interfaz de línea de comandos (CLI) que permitirá utilizar la librería directamente
desde el terminal.



## 3. Instalación
Para la instalación de la librería se deberá ejecutar este comando en la terminal :
```
npm install AivyAguiPo/mdLinks
```

## 4. Funcionalidad

Al completarse la instalación , ya se podrán utilizar los siguientes comandos :
```
mdLinks path-file-or-dictory
```
Este comando mostrará en la terminal los enlaces con las características que se muestran en el ejemplo.
Ejemplo:

```
🔎 Enlaces encontrados: [
  {
    href: 'https://markdown.es/',
    text: 'Qué es Markdown',
    filePath: 'pruebas\\directorio\\archivoDos.md'
  },
  {
    href: 'https://www.google.com/',
    text: 'Google',
    filePath: 'pruebas\\directorio\\archivoDos.md'
  }
   ]
```

  ### `--validate`

```
mdLinks path-file-or-dictory --validate
```
Este comando mostrará en la terminal si los enlaces encontrados funcionan correctamente o se encuentran rotos.

Ejemplo:

```
🔎 Enlaces encontrados: [
  {
    filePath: 'pruebas\\directorio\\archivoDos.md',
    href: 'https://markdown.es/',
    text: 'Qué es Markdown',
    status: 200,
    ok: 'OK'
  },
   {
    filePath: 'pruebas\\directorio\\archivoDos.md',
    href: 'https://www.ejemplo-no-existente.com/',
    text: 'Enlace Inexistente',
    status: 404,
    ok: 'Fail'
  }
   ]
```

 ### `--stats`

```
mdLinks path-file-or-dictory --stats
```
Este comando mostrará en la terminal el total de enlaces encontrados y la cantidad de enlaces únicos , no repetidos.

Ejemplo:
 ```
✅ Total de enlaces: 23
🔖 Enlaces únicos: 22
```

 ### `--validate --stats`

```
mdLinks path-file-or-dictory --validate--stats
```
Este comando mostrará en la terminal ,además de las estadisticas anteriores , la cantidad de enlaces rotos.

Ejemplo
 ```
✅ Total de enlaces: 23
🔖 Enlaces únicos: 22
❌ Enlaces rotos: 8
```

