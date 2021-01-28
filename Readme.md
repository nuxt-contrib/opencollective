@ nuxtjs / opencollective 🤝 ¡Estadísticas bastante abiertas en postinstall!
versión npm descargas npm estado

Escaparate

📖 Notas de lanzamiento

Caracteristicas
Mostrar estadísticas de opencollective y una URL de donación después de que los usuarios instalen un paquete es importante para muchos creadores. Después de los problemas con los paquetes actuales que ofrecen características similares, decidimos crear uno propio. Nuestros objetivos clave son:

Sin interferencias / problemas al instalar paquetes. Nunca rompa la instalación debido al paquete
Bonita salida para toda la información.
Configurabilidad decente
Integración perfecta para soluciones comunes
Preparar
Agregue @nuxtjs/opencollectivedependencia usando yarn o npm a su proyecto
Agregue el script postinstallen su package.json
{ 
  // ... 
  "scripts" : { 
    "postinstall" : "opencollective || salida 0" 
  } , 
  " Collective " : { 
    "url" : "https://opencollective.com/nuxtjs" 
  } 
  // ... 
}
Configurarlo
Configuración
La configuración se aplica a través de su proyecto package.json.

Una configuración completa se ve así:

{
   " Colectiva " : {
     " url " : " https://opencollective.com/nuxtjs " ,
     " logoUrl " : " https://opencollective.com/nuxtjs/logo.txt?reverse=true&variant=variant2 " ,
     " donación " : {
       " slug " : " / order / 591 " ,
       " amount " : " 50 " ,
       "texto " : "Por favor done: "
    }
  }
}
Atributo	Opcional	Defecto	Comentario
url	❌	-	La URL de su página colectiva abierta
logo	✅	-	LEGADO : La URL del logotipo que se debe mostrar. Utilice en su logoUrllugar.
logoUrl	✅	-	La URL del logotipo ASCII que se debe mostrar.
donation.slug	✅	'/donar'	La babosa a la que debería añadirse url. Se puede utilizar para configurar un pedido específico.
Monto de donación	✅	-	La cantidad predeterminada que se debe seleccionar en la página de opencollective.
donación de texto	✅	'Donar:'	El texto que se mostrará antes de la URL de tu donación.
Deshabilitar mensaje
Sabemos que los mensajes posteriores a la instalación pueden ser molestos cuando se implementan en producción o se ejecuta una canalización de CI. Es por eso que el mensaje está deshabilitado en esos entornos de forma predeterminada.

Habilitado cuando se establece una de las siguientes variables de entorno:

NODE_ENV=dev
NODE_ENV=development
OPENCOLLECTIVE_FORCE
Estrictamente inhabilitado cuando se establece una de las siguientes variables de entorno:

OC_POSTINSTALL_TEST
OPENCOLLECTIVE_HIDE
CI
CONTINUOUS_INTEGRATION
NODE_ENV(establecer y no dev o development)
DISABLE_OPENCOLLECTIVE(establecido en cualquier valor de cadena que no sea 'false'o '0', para compatibilidad con opencollective-postinatall )
Desarrollo
Clonar este repositorio
Instalar dependencias usando yarn installonpm install
Ejecutarlo manualmente path/to/project/root/src/index.js path/to/package/you/want/to/try
Ejecutar pruebas con npm toyarn test
Inspiración
Este proyecto está fuertemente inspirado en opencollective-cli .

Licencia
Licencia MIT MIT. Hecho con💖
