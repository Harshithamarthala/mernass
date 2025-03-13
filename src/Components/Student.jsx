import React, { useEffect, useState } from 'react'; 
import styled from 'styled-components'; 
import axios from 'axios'; 

 
const Container = styled.div` 
  display: flex; 
  flex-wrap: wrap; 
  justify-content: space-between; 
  padding: 20px; 
`; 
 
const Card = styled.div` 
  background-color: #f8f9fa; 
  border: 1px solid #dee2e6; 
  border-radius: 5px; 
  padding: 20px; 
  width: calc(33.33% - 20px); /* Calculate width for 3 cards per row with 20px 
gap */ 
  margin-bottom: 20px; /* Add some margin between the rows */ 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  transition: transform 0.2s; 
 
  &:hover { 
    transform: scale(1.05); 
  } 
`; 
 
const CardTitle = styled.h2` 
  font-size: 1.5em; 
  margin-bottom: 10px; 
`; 
 
const CardText = styled.p` 
  font-size: 1em; 
  margin-bottom: 5px; 
`; 
 
const fetchStudents = async () => { 
  // Replace the URL with your actual API endpoint 
  const response = await axios.get('http://localhost:5000/students'); 
  return response.data; 
}; 
 
const StudentCardLayout = () => { 
  const [students, setStudents] = useState([]); 
 
  useEffect(() => { 
    const getData = async () => { 
      const data = await fetchStudents(); 
      setStudents(data); 
    }; 
 
    getData(); 
  }, []); 
 
  return ( 
    <Container> 
      {students.map(student => ( 
        <Card key={student.RollNo}> 
          <CardTitle>{student.Name}</CardTitle> 
          <CardText><strong>Roll No:</strong> {student.RollNo}</CardText> 
          <CardText><strong>Email ID:</strong> {student.EmailID}</CardText> 
        </Card> 
      ))} 
    </Container> 
  ); 
}; 
 
export default StudentCardLayout;