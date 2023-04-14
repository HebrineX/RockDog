window.addEventListener('load', function() {
  const formProd = document.querySelector('#formularioProductos');
  if (formProd) {
    formProd.nombreProducto.focus();
    // --------------VALIDACIONES PRODUCTOS CREAR Y EDITAR-----------
    formProd.addEventListener('submit', async (e) => {
      e.preventDefault();
      const errors = [];
      const nombre_producto = document.querySelector('#nombre-producto');

      
      const descripcion = document.querySelector('#descripcion');
      const detalle = document.querySelector('#detalle');
      const precio = document.querySelector('#precio');
      const stock = document.querySelector('#stock');
      const categorias = document.querySelector('#categorias');
      const marca = document.querySelector('#marca');
      const img = document.querySelector('#file-input');
      const botonImg = document.getElementById('boton-file-input');
      const oldImagen = document.getElementById('oldImagen');
      // ------VALIDACION nombre_producto-------
      if (nombre_producto.value.length < 5) {
        errors.push('El campo titulo tiene que ser mayor a 5 caracteres!');
        nombre_producto.classList.add('is-invalid');
      } else {
        nombre_producto.classList.add('is-valid');
        nombre_producto.classList.remove('is-invalid');
      }

      // ------ VALIDACION DESCRIPCION -------

      if (descripcion.value.length > 20 ) {
        if (descripcion.value.length < 360) {
          descripcion.classList.add('is-valid');
          descripcion.classList.remove('is-invalid');
        } else {
          errors.push('¡La descripción No puede tener más de 360 carácteres!');
          descripcion.classList.add('is-invalid');
        }
      } else {
        errors.push('¡La descripción tiene que tener más de 20 carácteres!');
        descripcion.classList.add('is-invalid');
      }

      // ------ VALIDACION DETALLE -------
      if (detalle.value == '') {
        errors.push('¡El detalle no puede estar vacio!');
        detalle.classList.add('is-invalid');
      } else {
        detalle.classList.add('is-valid');
        detalle.classList.remove('is-invalid');
      }


      // ------ VALIDACION PRECIO -------
      if (precio.value < 1) {
        errors.push('¡El precio tiene que ser al menos a 1!');
        precio.classList.add('is-invalid');
      } else {
        precio.classList.add('is-valid');
        precio.classList.remove('is-invalid');
      }


      // ------ VALIDACION STOCK -------

      if (stock.value < 1) {
        errors.push('¡El stock tiene que ser al menos a 1!');
        stock.classList.add('is-invalid');
      } else {
        stock.classList.add('is-valid');
        stock.classList.remove('is-invalid');
      }


      // ------ VALIDACION CATEGORIA -------


      if (categorias.value == '#') {
        errors.push('¡Tiene que tener categoría, salamín!');
        categorias.classList.add('is-invalid');
      } else {
        categorias.classList.add('is-valid');
        categorias.classList.remove('is-invalid');
      }


      // ----- VALIDACION MARCA -------

      if (marca.value == '#') {
        errors.push('la marca compa falta la marca!');
        marca.classList.add('is-invalid');
      } else {
        marca.classList.add('is-valid');
        marca.classList.remove('is-invalid');
      }
      // - ---VALIDACION IMAGEN -------

      const allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
      const existeImg= img.value;
      if (oldImagen && existeImg == '') {
        botonImg.classList.add('is-valid');
        botonImg.classList.remove('is-invalid-button');
      } else {
        if (existeImg) {
          if (!allowedExtensions.exec(img.value)) {
            errors.push('Extensión no permitida. Utiliza: .jpeg/.jpg/.png/.gif.');
            botonImg.classList.add('is-invalid-button');
          } else {
            botonImg.classList.add('is-valid');
            botonImg.classList.remove('is-invalid-button');
          }
        } else {
          errors.push('Tenes que subir una Imagen!');
          botonImg.classList.add('is-invalid-button');
        }
      }

      // - ---DEVOLVIENDO LOS ERRORES O CONTINUANDO TODO OK!----
      const ulErrors = document.querySelector('.errores');

      ulErrors.innerHTML = '';
      if (errors.length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Revise los errores!',
        });
        ulErrors.classList.add('alert-warning');
        for (let i = 0; i < errors.length; i++) {
          ulErrors.innerHTML += `<li > ${errors[i]} </li>`;
        }
      } else {
        ulErrors.classList.remove('alert-warning');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Creaste el producto correctamente!!',
          showConfirmButton: false,
          timer: 1500,
        })
            .then(()=>{
              formProd.submit();
            });
      }
      // - ------FIN VALIDACIONES PRODUCTOS
    });
  }


  // --------------VALIDACIONES REGISTRO-----------

  const formReg = document.querySelector('.form-registro');
  if (formReg) {
    formReg.nombre.focus();
    formReg.addEventListener('submit', async (e) => {
      e.preventDefault();

      const errors = [];

      const nombre = document.getElementById('nombreReg');
      const apellido = document.getElementById('apellidoReg');
      const email = document.getElementById('emailReg');
      const pass=document.getElementById('passwordReg');
      const passValid = document.getElementById('passwordValidReg');
      const img = document.getElementById('foto-perfil');
      const botonImg = document.getElementById('boton-file-input');
      const oldImagen = document.getElementById('oldImagen');


      // -----VALIDACION NOMBRE -------

      if (nombre.value.length < 2) {
        errors.push('El nombre tiene que tener al menos 2 caracteres!');
        nombre.classList.add('is-invalid');
      } else {
        nombre.classList.add('is-valid');
        nombre.classList.remove('is-invalid');
      }

      // -----VALIDACION APELLIDO -------

      if (apellido.value.length < 2) {
        errors.push('El apellido tiene que tener al menos 2 caracteres!');
        apellido.classList.add('is-invalid');
      } else {
        apellido.classList.add('is-valid');
        apellido.classList.remove('is-invalid');
      }


      // -----VALIDACION EMAIL -------
      emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
      const existeEmail = email.value;
      if (existeEmail) {
        if (!emailRegex.test(existeEmail)) {
          errors.push('Tenes que poner un email valido!');
          email.classList.add('is-invalid');
        } else {
          email.classList.add('is-valid');
          email.classList.remove('is-invalid');
        }
      } else {
        errors.push('Tenes que completar el campo de email!');
        email.classList.add('is-invalid');
      }


      // - ---VALIDACION PASSWORD -------
      const regExPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/i;


      if ((pass.value || passValid.value)) {
        if (pass.value == passValid.value) {
          if (!regExPass.test(pass.value)) {
            errors.push('La contraseña debe tener al entre 8 y 16 caracteres,debe tener un numero, al menos una minúscula, una mayúscula y no puede tener simbolos!');
            pass.classList.add('is-invalid');
            passValid.classList.add('is-invalid');
          } else {
            pass.classList.add('is-valid');
            passValid.classList.add('is-valid');
            pass.classList.remove('is-invalid');
            passValid.classList.remove('is-invalid');
          }
        } else {
          errors.push('Tenes que poner la misma contraseña!');
          pass.classList.add('is-invalid');
          passValid.classList.add('is-invalid');
        }
      } else {
        errors.push('Tenes que completar los campos de la contraseña!');
        pass.classList.add('is-invalid');
        passValid.classList.add('is-invalid');
      }


      // - ---VALIDACION IMAGEN -------

      const allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
      const existeImg = img.value;
      if (oldImagen && existeImg == '') {
        botonImg.classList.add('is-valid');
        botonImg.classList.remove('is-invalid-button');
      } else {
        if (existeImg) {
          if (!allowedExtensions.exec(img.value)) {
            errors.push('Extensión no permitida. Utiliza: .jpeg/.jpg/.png/.gif.');
            botonImg.classList.add('is-invalid-button');
          } else {
            botonImg.classList.add('is-invalid-button');
            botonImg.classList.remove('is-invalid-button');
          }
        } else {
          errors.push('Tenes que subir una foto!');
          botonImg.classList.add('is-invalid-button');
        }
      }
      // - ---DEVOLVIENDO LOS ERRORES O CONTINUANDO TODO OK!----
      const ulErrors = document.querySelector('.errores');

      ulErrors.innerHTML = '';
      if (errors.length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Revise los errores!',
        });
        ulErrors.classList.add('alert-warning');
        for (let i = 0; i < errors.length; i++) {
          ulErrors.innerHTML += `<li > ${errors[i]} </li>`;
        }
      } else {
        ulErrors.classList.remove('alert-warning');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Te registraste Correctamente!',
          showConfirmButton: false,
          timer: 1500,
        })
            .then(()=>{
              formReg.submit();
            });
      }
    });
  }

  // -----------------------VALIDACIONES Editar usuario-----------------------------------
  const formEditUser = document.querySelector('.form-edit-user');
  if (formEditUser) {
    formEditUser.nombre.focus();
    formEditUser.addEventListener('submit', async (e) => {
      e.preventDefault();

      const errors = [];

      const nombre = document.getElementById('nombreReg');
      const apellido = document.getElementById('apellidoReg');
      const email = document.getElementById('emailReg');
      const pass=document.getElementById('passwordReg');
      const passValid = document.getElementById('passwordValidReg');
      const img = document.getElementById('foto-perfil');
      const botonImg = document.getElementById('boton-file-input');
      const oldImagen = document.getElementById('oldImagen');
      const oldPass = document.getElementById('oldPass');

      // -----VALIDACION NOMBRE -------

      if (nombre.value.length < 2) {
        errors.push('El nombre tiene que tener al menos 2 caracteres!');
        nombre.classList.add('is-invalid');
      } else {
        nombre.classList.add('is-valid');
        nombre.classList.remove('is-invalid');
      }

      // -----VALIDACION APELLIDO -------

      if (apellido.value.length < 2) {
        errors.push('El apellido tiene que tener al menos 2 caracteres!');
        apellido.classList.add('is-invalid');
      } else {
        apellido.classList.add('is-valid');
        apellido.classList.remove('is-invalid');
      }


      // -----VALIDACION EMAIL -------
      emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
      const existeEmail = email.value;
      if (existeEmail) {
        if (!emailRegex.test(existeEmail)) {
          errors.push('Tenes que poner un email valido!');
          email.classList.add('is-invalid');
        } else {
          email.classList.add('is-valid');
          email.classList.remove('is-invalid');
        }
      } else {
        errors.push('Tenes que completar el campo de email!');
        email.classList.add('is-invalid');
      }


      // - ---VALIDACION PASSWORD -------
      const regExPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/i;
      if (oldPass.value) {

      } else {
        errors.push('La contraseña anterior no puede estar vacia!');
        oldPass.classList.add('is-invalid');
      }

      if ((pass.value || passValid.value ||oldPass.value)) {
        if (pass.value == passValid.value) {
          if (!regExPass.test(pass.value)) {
            errors.push('La contraseña debe tener al entre 8 y 16 caracteres,debe tener un numero, al menos una minúscula, una mayúscula y no puede tener simbolos!');
            pass.classList.add('is-invalid');
            passValid.classList.add('is-invalid');
          } else {
            pass.classList.add('is-valid');
            passValid.classList.add('is-valid');
            pass.classList.remove('is-invalid');
            passValid.classList.remove('is-invalid');
          }
        } else {
          errors.push('Tenes que poner la misma contraseña!');
          pass.classList.add('is-invalid');
          passValid.classList.add('is-invalid');
        }
      } else {
        errors.push('Tenes que completar los campos de la contraseña!');
        pass.classList.add('is-invalid');
        passValid.classList.add('is-invalid');
      }


      // - ---VALIDACION IMAGEN -------

      const allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
      const existeImg = img.value;
      if (oldImagen && existeImg == '') {
        botonImg.classList.add('is-valid');
        botonImg.classList.remove('is-invalid-button');
      } else {
        if (existeImg) {
          if (!allowedExtensions.exec(img.value)) {
            errors.push('Extensión no permitida. Utiliza: .jpeg/.jpg/.png/.gif.');
            botonImg.classList.add('is-invalid-button');
          } else {
            botonImg.classList.add('is-invalid-button');
            botonImg.classList.remove('is-invalid-button');
          }
        } else {
          errors.push('Tenes que subir una foto!');
          botonImg.classList.add('is-invalid-button');
        }
      }
      // - ---DEVOLVIENDO LOS ERRORES O CONTINUANDO TODO OK!----
      const ulErrors = document.querySelector('.errores');

      ulErrors.innerHTML = '';
      if (errors.length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Revise los errores!',
        });
        ulErrors.classList.add('alert-warning');
        for (let i = 0; i < errors.length; i++) {
          ulErrors.innerHTML += `<li > ${errors[i]} </li>`;
        }
      } else {
        ulErrors.classList.remove('alert-warning');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Editaste correctamente el usuario!',
          showConfirmButton: false,
          timer: 1500,
        })
            .then(()=>{
              formEditUser.submit();
            });
      }
    });
  }

  // --------------VALIDACIONES LOGIN-----------

  const formLog = document.querySelector('.login');
  if (formLog) {
    formLog.addEventListener('submit', async (e) => {
      e.preventDefault();

      const errors = [];

      const email = document.getElementById('emailLog');
      const pass =document.getElementById('passwordLog');


      // -----VALIDACION EMAIL -------
      emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
      const existeEmail = email.value;
      if (existeEmail) {
        if (!emailRegex.test(existeEmail)) {
          errors.push('Tenes que poner un email valido!');
          email.classList.add('is-invalid');
        } else {
          email.classList.add('is-valid');
          email.classList.remove('is-invalid');
        }
      } else {
        errors.push('Tenes que completar el campo de email!');
        email.classList.add('is-invalid');
      }


      // - ---VALIDACION PASSWORD -------
      const regExPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/i;

      if (pass.value) {
        if (!regExPass.test(pass.value)) {
          errors.push('La contraseña debe tener al entre 8 y 16 caracteres,debe tener un numero, al menos una minúscula, una mayúscula y no puede tener simbolos!');
          pass.classList.add('is-invalid');
        } else {
          pass.classList.remove('is-invalid');
          pass.classList.add('is-valid');
        }
      } else {
        errors.push('La contraseña no puede estar vacia!!');
        pass.classList.add('is-invalid');
      }


      // - ---DEVOLVIENDO LOS ERRORES O CONTINUANDO TODO OK!----
      const ulErrors = document.querySelector('.errores');

      ulErrors.innerHTML = '';
      if (errors.length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Revise los errores!',
        });
        ulErrors.classList.add('alert-warning');
        for (let i = 0; i < errors.length; i++) {
          ulErrors.innerHTML += `<li > ${errors[i]} </li>`;
        }
      } else {
        ulErrors.classList.remove('alert-warning');
        formLog.submit();
      }
    });
  }
});

