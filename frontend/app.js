document.addEventListener("DOMContentLoaded", getUsers);

async function getUsers() {
    
    const response = await fetch("http://127.0.0.1:8000/tasks");

    if (!response.ok){
        console.log("error :", response.status);
        return;
    }

    const data = await response.json();

    tampilkan(data);
}

function tampilkan(data) {
    
    const hasil = document.getElementById("hasil");

    hasil.innerHTML = "";

    data.forEach(user => {
        
        const baris = document.createElement("tr");

        baris.innerHTML = `
            <td>${user.id}</td>
            <td>${user.matkul}</td>
            <td>${user.tugas}</td>
            <td>${user.deadline}</td>
            <td>${user.description}</td>
        `;

        hasil.appendChild(baris);

    });

}