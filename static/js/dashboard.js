document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('access_token');
    
    if (!token) { 
        window.location.href = '/'; 
        return; 
    }

    const headers = { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` 
    };

    try {
        //  CARGAR PRODUCTOS 
        const resProductos = await fetch('/api/productos/', { headers });
        if (resProductos.status === 401) { 
            cerrarSesion(); 
            return; 
        }
        
        const productos = await resProductos.json();
        
        const totalProdEl = document.getElementById('total-productos');
        if (totalProdEl) totalProdEl.innerText = productos.length;

        const tbodyProd = document.getElementById('tabla-productos');
        if (tbodyProd) {
            tbodyProd.innerHTML = ''; 
            productos.forEach(prod => {
                const estado = prod.estado ? '<span class="badge bg-success">Activo</span>' : '<span class="badge bg-secondary">Inactivo</span>';
                tbodyProd.innerHTML += `
                    <tr>
                        <td>${prod.id}</td>
                        <td>${prod.nombre}</td>
                        <td>${prod.categoria}</td>
                        <td>$${prod.precio}</td>
                        <td>${prod.stock}</td>
                        <td>${estado}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-warning text-dark"><i class="bi bi-pencil-square"></i> Editar</button>
                            <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash3"></i> Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        }

        // CARGAR USUARIOS Y VALIDAR ROLES
        const resUsuarios = await fetch('/api/usuarios/', { headers });
        if (resUsuarios.ok) {
            const usuarios = await resUsuarios.json();
            
            const totalUsrEl = document.getElementById('total-usuarios');
            if (totalUsrEl) totalUsrEl.innerText = usuarios.length;

            const payload = JSON.parse(window.atob(token.split('.')[1])); 
        
            const miUsuario = usuarios.find(u => u.id == payload.user_id);
            console.log("Mis datos de usuario:", miUsuario);

            const esAdmin = miUsuario ? miUsuario.is_superuser : false;

            const btnNuevoUsr = document.getElementById('btn-nuevo-usuario');
            if (esAdmin && btnNuevoUsr) {
                btnNuevoUsr.classList.remove('d-none');
            }

            const tbodyUsr = document.getElementById('tabla-usuarios');
            if (tbodyUsr) {
                tbodyUsr.innerHTML = '';
                usuarios.forEach(usr => {
                    const estado = usr.is_active ? '<span class="badge bg-success">Activo</span>' : '<span class="badge bg-danger">Inactivo</span>';
                    
                    let btnAcciones = '<span class="text-muted"><i class="bi bi-shield-lock"></i> Solo lectura</span>';
                    if (esAdmin) {
                        btnAcciones = `<button class="btn btn-sm btn-outline-danger" onclick="eliminarUsuario(${usr.id})"><i class="bi bi-trash3"></i> Eliminar</button>`;
                    }
                    
                    tbodyUsr.innerHTML += `
                        <tr>
                            <td>${usr.id}</td>
                            <td class="fw-bold">${usr.username}</td>
                            <td>${usr.email}</td>
                            <td>${estado}</td>
                            <td>${btnAcciones}</td>
                        </tr>
                    `;
                });
            }
        }
    } catch (error) { 
        console.error('Error al cargar datos:', error); 
    }
});

// FUNCIONES GLOBALES

function cerrarSesion() { 
    localStorage.removeItem('access_token'); 
    window.location.href = '/'; 
}

window.eliminarUsuario = async function(id) {
    if(!confirm('¿Estás seguro de eliminar este usuario permanentemente?')) return;
    
    const token = localStorage.getItem('access_token');
    try {
        const res = await fetch(`/api/usuarios/${id}/`, { 
            method: 'DELETE', 
            headers: { 'Authorization': `Bearer ${token}` } 
        });
        
        if(res.ok) {
            window.location.reload();
        } else {
            alert('Error al eliminar. Es posible que no tengas permisos.');
        }
    } catch (error) { 
        alert('Error de conexión con el servidor.'); 
    }
};

// EVENTOS DE FORMULARIOS

const formProd = document.getElementById('formProducto');
if (formProd) {
    formProd.addEventListener('submit', async function(e) {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        
        const nuevoProducto = {
            nombre: document.getElementById('prod-nombre').value,
            descripcion: document.getElementById('prod-desc').value,
            categoria: document.getElementById('prod-cat').value,
            precio: document.getElementById('prod-precio').value,
            stock: document.getElementById('prod-stock').value,
            estado: true 
        };
        
        try {
            const res = await fetch('/api/productos/', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, 
                body: JSON.stringify(nuevoProducto)
            });
            
            if(res.ok) {
                window.location.reload();
            } else {
                const errorData = await res.json();
                alert('Error de Django: \n' + JSON.stringify(errorData, null, 2));
            }
        } catch (error) { 
            alert('Error de conexión.'); 
        }
    });
}

const formUsr = document.getElementById('formUsuario');
if (formUsr) {
    formUsr.addEventListener('submit', async function(e) {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        
        const nuevoUsuario = {
            username: document.getElementById('usr-username').value,
            email: document.getElementById('usr-email').value,
            password: document.getElementById('usr-password').value,
            first_name: "",       
            last_name: "",        
            is_superuser: false,  
            is_active: true
        };

        try {
            const res = await fetch('/api/usuarios/', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, 
                body: JSON.stringify(nuevoUsuario)
            });
            
            if(res.ok) {
                window.location.reload();
            } else {
                const errorData = await res.json();
                alert('Error al crear usuario: \n' + JSON.stringify(errorData, null, 2));
            }
        } catch (error) { 
            alert('Error de conexión.'); 
        }
    });
}