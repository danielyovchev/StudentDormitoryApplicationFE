import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../utils/routeConstants';
import styles from './DocumentsReview.module.css';

export default function DocumentsReview() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch unverified documents from the server
        fetch(`${API_BASE_URL}/get/student/2/documents`)
            .then(response => response.json())
            .then(data => {
                setDocuments(data.documents || []); // Ensure documents is always an array
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching documents:', error);
                setError('Error fetching documents');
                setLoading(false);
            });
    }, []);

    const handleValidate = (documentId) => {
        fetch(`${API_BASE_URL}/documents/validate/${documentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Remove the validated document from the list
                    setDocuments(prevDocuments => prevDocuments.filter(doc => doc.id !== documentId));
                } else {
                    console.error('Validation failed:', data.message);
                }
            })
            .catch(error => {
                console.error('Error validating document:', error);
            });
    };

    const renderFile = (file, fileName) => {
        const fileType = fileName.split('.').pop().toLowerCase();
        const blob = new Blob([new Uint8Array(file)], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);

        if (fileType === 'pdf') {
            return <embed src={url} width="100%" height="500px" type="application/pdf" />;
        } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
            return <img src={url} alt={fileName} className={styles.documentImage} />;
        } else {
            return <a href={url} download={fileName}>{fileName}</a>;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h2>Documents Review</h2>
            {documents.length === 0 ? (
                <div>No unverified documents.</div>
            ) : (
                <ul className={styles.documentList}>
                    {documents.map(document => (
                        <li key={document.id} className={styles.documentItem}>
                            <div className={styles.documentInfo}>
                            <p><strong>Document ID:</strong> {document.id}</p>
                                <p><strong>Student Name:</strong> {document.studentName}</p>
                                <p><strong>Student Number:</strong> {document.studentNumber}</p>
                                <p><strong>Category:</strong> {document.documentType}</p>
                                <p><strong>File:</strong></p>
                                {renderFile(document.file, document.fileName)}
                            </div>
                            <button onClick={() => handleValidate(document.id)} className={styles.validateButton}>Validate</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
