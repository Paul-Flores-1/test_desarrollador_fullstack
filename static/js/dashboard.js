// 1. LÓGICA AL CARGAR LA PÁGINA (LLENAR LA TABLA)
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
        const resProductos = await fetch('/api/productos/', { headers });
        if (resProductos.status === 401) {
            cerrarSesion();
            return;
        }
        const productos = await resProductos.json();
        
        const resUsuarios = await fetch('/api/usuarios/', { headers });
        const usuarios = await resUsuarios.json();

        document.getElementById('total-productos').innerText = productos.length;
        document.getElementById('total-usuarios').innerText = usuarios.length;

        const tbody = document.getElementById('tabla-productos');
        tbody.innerHTML = ''; 

        productos.forEach(prod => {
            const estado = prod.estado ? '<span class="badge bg-success">Activo</span>' : '<span class="badge bg-secondary">Inactivo</span>';
            
            tbody.innerHTML += `
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

    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
});

// 2. FUNCIÓN PARA CERRAR SESIÓN
function cerrarSesion() {
    localStorage.removeItem('access_token');
    window.location.href = '/';
}

// 3. LÓGICA AL GUARDAR UN NUEVO PRODUCTO
document.getElementById('formProducto').addEventListener('submit', async function(e) {
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
        const response = await fetch('/api/productos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(nuevoProducto)
        });

        if (response.ok) {
            window.location.reload();
        } else {
            const errorData = await response.json();
            alert('Error de Django: \n' + JSON.stringify(errorData, null, 2));
            console.log("Error detallado:", errorData);
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        alert('Error en la conexión con el servidor.');
    }
});