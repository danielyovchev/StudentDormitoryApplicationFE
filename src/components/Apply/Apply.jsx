import React, { useState } from 'react';
import styles from './Apply.module.css';

export default function Apply() {
    const [formData, setFormData] = useState({
        educationForm: 'regular',
        faculty: '',
        specialty: '',
        city: '',
        municipality: '',
        street: '',
        streetNumber: '',
        buildingNumber: '18', // Default to building 18
        roomNumber: '',
        entrance: '',
        apartment: '',
        personalID: '',
        phoneNumber: '',
        grade: '',
        yearOfStudy: 'first', // Default to first year
        preserveRoom: false // Checkbox for preserving room
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted Data:', formData);
        // Implement your submission logic here, such as an API call
    };

    return (
        <>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} className={styles.applicationForm}>
                    <h2>Student Application Form</h2>
                    <label>
                        Year of Study:
                        <select name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange}>
                            <option value="first">First Year</option>
                            <option value="second">Second Year and Above</option>
                        </select>
                    </label>
                    {formData.yearOfStudy !== 'first' && (
                        <>
                            <label>
                                Preserve room from last year:
                                <input
                                    type="checkbox"
                                    name="preserveRoom"
                                    checked={formData.preserveRoom}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Number of exams to retake:
                                <input
                                    type="number"
                                    name="examsToRetake"
                                    value={formData.examsToRetake}
                                    onChange={handleChange}
                                    min="0"
                                />
                            </label>
                        </>
                    )}
                    <label>
                        Form of Education:
                        <select name="educationForm" value={formData.educationForm} onChange={handleChange}>
                            <option value="regular">Regular</option>
                            <option value="shortened">Shortened</option>
                        </select>
                    </label>
                    <label>
                        Faculty:
                        <input type="text" name="faculty" value={formData.faculty} onChange={handleChange} />
                    </label>
                    <label>
                        Specialty:
                        <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} />
                    </label>
                    <label>
                        City:
                        <input type="text" name="city" value={formData.city} onChange={handleChange} />
                    </label>
                    <label>
                        Municipality:
                        <input type="text" name="municipality" value={formData.municipality} onChange={handleChange} />
                    </label>
                    <label>
                        Street:
                        <input type="text" name="street" value={formData.street} onChange={handleChange} />
                    </label>
                    <label>
                        Street Number:
                        <input type="text" name="streetNumber" value={formData.streetNumber} onChange={handleChange} />
                    </label>
                    <label>
                        Building Number:
                        <select name="buildingNumber" value={formData.buildingNumber} onChange={handleChange}>
                            <option value="18">18</option>
                            <option value="20">20</option>
                        </select>
                    </label>
                    <label>
                        Room Number:
                        <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleChange} />
                    </label>
                    <label>
                        Entrance:
                        <input type="text" name="entrance" value={formData.entrance} onChange={handleChange} />
                    </label>
                    <label>
                        Apartment:
                        <input type="text" name="apartment" value={formData.apartment} onChange={handleChange} />
                    </label>
                    <label>
                        Personal Identification Number:
                        <input type="text" name="personalID" value={formData.personalID} onChange={handleChange} />
                    </label>
                    <label>
                        Phone Number:
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    </label>
                    <label>
                        {formData.yearOfStudy === 'first' ? "Grade from School:" : "Grade from Last Year:"}
                        <input type="text" name="grade" value={formData.grade} onChange={handleChange} />
                    </label>
                    {formData.yearOfStudy !== 'first' && (
                        <label>
                            Number of exams to retake:
                            <input
                                type="number"
                                name="retakeExams"
                                onChange={handleChange}
                            />
                        </label>
                    )}
                    <button type="submit">Submit Application</button>
                </form>
            </div>
        </>
    );
}