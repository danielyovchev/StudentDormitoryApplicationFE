import React, { useState, useEffect } from 'react';
import StudentRankingItem from './StudentRankingItem';
import styles from './StudentRanking.module.css';
import { API_BASE_URL } from '../../utils/routeConstants';

export default function StudentRanking() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch student rankings from the server
        fetch(API_BASE_URL + '/rank/ranking')
            .then(response => response.json())
            .then(data => {
                // Sort students by score in descending order
                //const sortedStudents = data.sort((a, b) => b.score - a.score);
                setStudents(data);
                console.log(data);
            })
            .catch(error => console.error('Error fetching student rankings:', error));
    }, []);

    return (
        <div className={styles.container}>
            <h2>Final Student Ranking</h2>
            <div className={styles.rankingRow}>
                <div className={styles.rankingColumn}><strong>Rank</strong></div>
                <div className={styles.rankingColumn}><strong>Name</strong></div>
                <div className={styles.rankingColumn}><strong>Score</strong></div>
            </div>
            {students.map((student, index) => (
                <StudentRankingItem
                    key={student.id}
                    rank={index + 1}
                    name={student.studentName}
                    score={student.score}
                />
            ))}
        </div>
    );
}
