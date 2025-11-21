document.getElementById('generate-btn').addEventListener('click', async () => {
    const patientNotes = document.getElementById('patient-notes').value;

    if (!patientNotes.trim()) {
        alert('Please enter patient notes.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ notes: patientNotes })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch diagnosis.');
        }

        const data = await response.json();

        // Display diagnoses
        const diagnosesList = document.getElementById('diagnoses-list');
        diagnosesList.innerHTML = '';
        data.diagnoses.forEach(diagnosis => {
            const li = document.createElement('li');
            li.textContent = diagnosis;
            diagnosesList.appendChild(li);
        });

        // Display steps
        const stepsList = document.getElementById('steps-list');
        stepsList.innerHTML = '';
        data.steps.forEach(step => {
            const li = document.createElement('li');
            li.textContent = step;
            stepsList.appendChild(li);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while generating the diagnosis.');
    }
});