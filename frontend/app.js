document.addEventListener("DOMContentLoaded", function () {
  getUsers(); 
  document.getElementById("simpan").addEventListener("click", simpanTask); // FIX 1: "Simpan" → "simpan"
  document.getElementById("deleteById").addEventListener("click", deleteTask);
});

async function getUsers() {
    
    const response = await fetch("http://127.0.0.1:8000/tasks");

    if (!response.ok){
        alert(`Error: ${response.status}`); // FIX 4: alert hanya 1 argumen
        return;
    }

    const data = await response.json();

    tampilkanData(data);
}

function tampilkanData(data) {
    
    const hasil = document.getElementById("hasil");

    hasil.innerHTML = "";

    data.forEach(user => {
        
        const baris = document.createElement("tr"); // FIX 2: hapus <tr> duplikat di dalam innerHTML

        baris.innerHTML = `
            <td>${user.id}</td>
            <td>${user.matkul}</td>
            <td>${user.tugas}</td>
            <td>${user.deadline}</td>
            <td>${user.deskripsi}</td>  <!-- FIX 3: "description" → "deskripsi" -->
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
        alert(`Gagal tambah task: ${JSON.stringify(error)}`); // FIX 4: alert 1 argumen + typo "tanmbah"
        return;
    }

    console.log("Task berhasil ditambah");
    getUsers();
    resetForm();
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

    createtasks(matkul, tugas, deadline, deskripsi);
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
        alert("Masukkan ID terlebih dahulu");
        return;
    }

    const response = await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        alert(`Gagal hapus task: ${response.status}`); // FIX 4: alert 1 argumen
        return;
    }

    alert("Task berhasil dihapus");
    document.getElementById("Id").value = "";

    getUsers();
}