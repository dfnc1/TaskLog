document.addEventListener("DOMContentLoaded", function () {
  getUsers(); 
  document.getElementById("Simpan").addEventListener("click", simpanTask);
  document.getElementById("Batal").addEventListener("click", resetForm);
  document.getElementById("deleteById").addEventListener("click", deleteTask);
});

async function getUsers() {
    
    const response = await fetch("http://127.0.0.1:8000/tasks");

    if (!response.ok){
        alert("error :", response.status);
        return;
    }

    const data = await response.json();

    tampilkanData(data);
}

function tampilkanData(data) {
    
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

async function createtasks(matkul, tugas, deadline, deskripsi){
    const response = await fetch("http://127.0.0.1:8000/task", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({matkul, tugas, deadline, deskripsi})
    });

    if (!response.ok){
        const error = await response.json();
        alert("Gagal tanmbah task :" , error);
        return;
    }

    console.log("Task berhasil ditambah")

    getUsers()
}

function simpanTask(){
    const matkul = document.getElementById("MataKuliah").value;
    const tugas = document.getElementById("Tugas").value;
    const deadline = document.getElementById("Deadline").value;
    const deskripsi = document.getElementById("Deskripsi").value;

    if (!matkul || !tugas || !deadline || !deskripsi){
        alert("Semua field harus diisi!");
        return;
    }

    createtasks(matkul, tugas, deadline, deskripsi)
}


function isiForm(matkul, tugas, deadline, deskripsi){
    document.getElementById("MataKuliah").value = matkul;
    document.getElementById("Tugas").value  = tugas;
    document.getElementById("Deadline").value = deadline;
    document.getElementById("Deskripsi").value  = deskripsi;
}

function resetForm(){
    document.getElementById("MataKuliah").value = "";
    document.getElementById("Tugas").value  = "";
    document.getElementById("Deadline").value = "";
    document.getElementById("Deskripsi").value  = "";
}

async function deleteTask() {
    const id = document.getElementById("Id").value;
    if(!id){
        alert("masukkan id");
        return;
    }

    const response = await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        console.log("Gagal hapus task:", response.status);
        return;
    }

    alert("Task berhasil dihapus");
    document.getElementById("Id").value = "";

    getUsers();
}