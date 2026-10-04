let students = JSON.parse(localStorage.getItem('students')) || [];
let isEditing = false;

const studentForm = document.getElementById('student-form');
const studentIdInput = document.getElementById('student-id');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');
const courseInput = document.getElementById('course');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const studentList = document.getElementById('student-list');
const searchInput = document.getElementById('search-input');

function renderStudents(filteredStudents = students) {
    studentList.innerHTML = '';
    filteredStudents.forEach((student) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>
                <button class="btn-edit" onclick="editStudent('${student.id}')">Edit</button>
                <button class="btn-delete" onclick="deleteStudent('${student.id}')">Delete</button>
            </td>
        `;
        studentList.appendChild(row);
    });
}

studentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const studentData = {
        id: studentIdInput.value || Date.now().toString(),
        name: nameInput.value,
        age: ageInput.value,
        email: emailInput.value,
        course: courseInput.value
    };
    if (isEditing) {
        students = students.map(s => s.id === studentData.id ? studentData : s);
        isEditing = false;
        submitBtn.textContent = 'Add Student';
        cancelBtn.classList.add('hidden');
    } else {
        students.push(studentData);
    }
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();
    studentForm.reset();
});

renderStudents();

