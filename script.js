document.getElementById('numStudents').addEventListener('input', function () {
    let numStudents = this.value;
    let studentInputs = document.getElementById('studentInputs');
    studentInputs.innerHTML = '';
    for (let i = 0; i < numStudents; i++) {
        studentInputs.innerHTML += `
            <h3>Student ${i + 1}</h3>
            <label>Exam Score (0-70):</label>
            <input type="number" name="examScore${i}" min="0" max="70" required>
            <label>Assessment Score (0-30):</label>
            <input type="number" name="assessmentScore${i}" min="0" max="30" required>
            <label>Fees Paid:</label>
            <input type="number" name="fees${i}" min="0" required>
        `;
    }
});

document.getElementById('studentForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let numStudents = document.getElementById('numStudents').value;
    let resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    for (let i = 0; i < numStudents; i++) {
        let examScore = parseInt(document.querySelector(`input[name="examScore${i}"]`).value);
        let assessmentScore = parseInt(document.querySelector(`input[name="assessmentScore${i}"]`).value);
        let fees = parseInt(document.querySelector(`input[name="fees${i}"]`).value);

        let passed = false, condoned = false;
        let result = `<label>Student ${i + 1}:</label> You have `;

        if (examScore >= 25 && assessmentScore >= 15) {
            passed = true;
            result += "<b>Passed</b>";
        } else if ((examScore + assessmentScore) === 39 && (examScore === 24 || assessmentScore === 14)) {
            condoned = true;
            result += "been <b>Condoned</b>";
        } else {
            result += "<b>Failed</b>";
        }

        if ((fees >= 100) && (passed || condoned)) {
            result += " - You also have your certificate <b>Granted</b>";
        } else if((fees >= 100) && !(passed && condoned)) {
            result += " - You also have your certificate <b>Not Granted</b> owing to the fact that you have failed the course";
        } else if (fees < 100) {
            result += " - You also have your certificate <b>Not Granted</b> owing to the fact that you have not paid the fees";
        }

        resultsDiv.innerHTML += `<p>${result}</p>`;
    }
});