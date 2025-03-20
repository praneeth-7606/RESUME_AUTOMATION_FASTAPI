// import React, { useState, useEffect } from 'react';
// import { Card, Button, Alert, Form, Spinner } from 'react-bootstrap';

// const GenerateResume = ({ 
//   filePaths, 
//   fileInfo, 
//   selectedEmployee, 
//   setResult, 
//   setShowResult,
//   isGenerating,
//   setIsGenerating,
//   selectedTemplateId, // Get the template ID from props
//   setSelectedTemplateId  // Allow changing template ID
// }) => {
//   // No local state for template - use the prop directly to avoid flickering
  
//   const handleTemplateChange = (e) => {
//     // Update the parent state directly
//     if (setSelectedTemplateId) {
//       setSelectedTemplateId(parseInt(e.target.value));
//     }
//   };

//   const handleGenerateResume = async () => {
//     if (!filePaths.template) {
//       alert('Please upload a template first.');
//       return;
//     }

//     if (!filePaths.skillMatrix) {
//       alert('Please upload a skill matrix first.');
//       return;
//     }

//     if (!filePaths.resume && !selectedEmployee) {
//       alert('Please either upload a resume or select an employee from the skill matrix.');
//       return;
//     }

//     setIsGenerating(true);
//     setShowResult(false);

//     try {
//       // Create request body with template_id
//       const requestBody = {
//         template_path: filePaths.template,
//         skill_matrix_path: filePaths.skillMatrix,
//         template_id: parseInt(selectedTemplateId || 1) // Use the prop directly
//       };

//       console.log("Sending request with template_id:", requestBody.template_id);

//       // Add either resume path or employee info
//       if (filePaths.resume) {
//         requestBody.old_resume_path = filePaths.resume;
//       }

//       // Add employee info if available
//       if (selectedEmployee) {
//         requestBody.first_name = selectedEmployee.first_name;
//         requestBody.last_name = selectedEmployee.last_name;
//       }

//       // Send request to backend
//       const response = await fetch('http://localhost:8000/generate/resume', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(requestBody)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log('Resume generated:', data);
//         // Create result HTML
//         setResult(`
//           <div class="success-message">
//             <h3>Resume Generated Successfully!</h3>
//             <p>Template Used: ${getTemplateNameById(data.template_used || selectedTemplateId || 1)}</p>
//             <p><a href="http://localhost:8000/generate/download/${data.resume_path.split('/').pop()}" target="_blank" rel="noopener noreferrer" class="download-link btn btn-primary">Download Resume</a></p>
//             ${data.cover_letter_status === 'Generated successfully' 
//               ? `<p><a href="http://localhost:8000/generate/download/${data.resume_path.split('/').pop().replace('_Resume.pdf', '_Cover_Letter.pdf')}" target="_blank" rel="noopener noreferrer" class="download-link btn btn-success">Download Cover Letter</a></p>` 
//               : `<p>Cover Letter Status: ${data.cover_letter_status}</p>`
//             }
//           </div>
//         `);
//         setShowResult(true);
//       } else {
//         console.error('Error generating resume:', data);
//         setResult(`
//           <div class="error-message">
//             <h3>Error Generating Resume</h3>
//             <p>${data.detail || 'An unknown error occurred.'}</p>
//           </div>
//         `);
//         setShowResult(true);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setResult(`
//         <div class="error-message">
//           <h3>Error</h3>
//           <p>Failed to communicate with the server. Please try again.</p>
//           <p>Details: ${error.message}</p>
//         </div>
//       `);
//       setShowResult(true);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // Helper function to get template name by ID
//   const getTemplateNameById = (id) => {
//     const templateNames = {
//       1: "Standard Template",
//       2: "Professional Template",
//       3: "Modern Blue Template"
//     };
//     return templateNames[id] || `Template ${id}`;
//   };

//   // Check if generation is possible
//   const canGenerate = filePaths.template && filePaths.skillMatrix && (filePaths.resume || selectedEmployee);

//   // Display current template name
//   const currentTemplateName = getTemplateNameById(selectedTemplateId || 1);

//   return (
//     <Card className="shadow border-0 mb-4">
//       <Card.Body>
//         <Card.Title>Generate Resume</Card.Title>
        
//         <div className="mb-4">
//           <h5>Selected Files:</h5>
//           <ul className="list-group">
//             <li className="list-group-item">
//               <strong>Template:</strong> {fileInfo.template || 'No template selected'}
//             </li>
//             <li className="list-group-item">
//               <strong>Template Style:</strong> {currentTemplateName}
//             </li>
//             <li className="list-group-item">
//               <strong>Skill Matrix:</strong> {fileInfo.skillMatrix || 'No skill matrix uploaded'}
//             </li>
//             <li className="list-group-item">
//               <strong>Resume:</strong> {fileInfo.resume || 'No resume uploaded'}
//             </li>
//             <li className="list-group-item">
//               <strong>Selected Employee:</strong> {selectedEmployee 
//                 ? `${selectedEmployee.first_name} ${selectedEmployee.last_name}` 
//                 : 'No employee selected'}
//             </li>
//           </ul>
//         </div>

//         {/* Template selection dropdown */}
//         <Form.Group className="mb-4">
//           <Form.Label><strong>Select Template Style:</strong></Form.Label>
//           <Form.Select 
//             value={selectedTemplateId || 1}
//             onChange={handleTemplateChange}
//           >
//             <option value={1}>Standard Template</option>
//             <option value={2}>Professional Template</option>
//             <option value={3}>Modern Blue Template</option>
//           </Form.Select>
//           <Form.Text className="text-muted">
//             Choose the visual style for your resume and cover letter.
//           </Form.Text>
//         </Form.Group>
        
//         {!canGenerate && (
//           <Alert variant="warning">
//             <strong>Missing required information.</strong> Please ensure you have uploaded a template, 
//             skill matrix, and either uploaded a resume or selected an employee.
//           </Alert>
//         )}
        
//         <div className="d-grid gap-2">
//           <Button 
//             variant="primary" 
//             size="lg"
//             onClick={handleGenerateResume}
//             disabled={!canGenerate || isGenerating}
//           >
//             {isGenerating ? (
//               <>
//                 <Spinner
//                   as="span"
//                   animation="border"
//                   size="sm"
//                   role="status"
//                   aria-hidden="true"
//                   className="me-2"
//                 />
//                 Generating...
//               </>
//             ) : (
//               'Generate Resume'
//             )}
//           </Button>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// };

// export default GenerateResume;




import React from 'react';
import { Card, Button, Alert, Form, Spinner } from 'react-bootstrap';

const GenerateResume = ({ 
  filePaths, 
  fileInfo, 
  selectedEmployee, 
  setResult, 
  setShowResult,
  isGenerating,
  setIsGenerating,
  selectedTemplateId, // Get the template ID from props
  setSelectedTemplateId  // Allow changing template ID
}) => {
  
  const handleTemplateChange = (e) => {
    // Update the parent state directly
    if (setSelectedTemplateId) {
      setSelectedTemplateId(parseInt(e.target.value));
    }
  };

  const handleGenerateResume = async () => {
    if (!filePaths.template) {
      alert('Please upload a template first.');
      return;
    }

    if (!filePaths.skillMatrix) {
      alert('Please upload a skill matrix first.');
      return;
    }

    if (!filePaths.resume && !selectedEmployee) {
      alert('Please either upload a resume or select an employee from the skill matrix.');
      return;
    }

    setIsGenerating(true);
    setShowResult(false);

    try {
      // Create request body with template_id
      const requestBody = {
        template_path: filePaths.template,
        skill_matrix_path: filePaths.skillMatrix,
        template_id: parseInt(selectedTemplateId || 1) // Use the prop directly
      };

      console.log("Sending request with template_id:", requestBody.template_id);

      // Add either resume path or employee info
      if (filePaths.resume) {
        requestBody.old_resume_path = filePaths.resume;
      }

      // Add employee info if available
      if (selectedEmployee) {
        requestBody.first_name = selectedEmployee.first_name;
        requestBody.last_name = selectedEmployee.last_name;
      }

      // Send request to backend
      const response = await fetch('http://localhost:8000/generate/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Resume generated:', data);
        // Create result HTML
        setResult(`
          <div class="success-message">
            <h3>Resume Generated Successfully!</h3>
            <p>Template Used: ${getTemplateNameById(data.template_used || selectedTemplateId || 1)}</p>
            <p><a href="http://localhost:8000/generate/download/${data.resume_path.split('/').pop()}" target="_blank" rel="noopener noreferrer" class="download-link btn btn-primary">Download Resume</a></p>
            ${data.cover_letter_status === 'Generated successfully' 
              ? `<p><a href="http://localhost:8000/generate/download/${data.resume_path.split('/').pop().replace('_Resume.pdf', '_Cover_Letter.pdf')}" target="_blank" rel="noopener noreferrer" class="download-link btn btn-success">Download Cover Letter</a></p>` 
              : `<p>Cover Letter Status: ${data.cover_letter_status}</p>`
            }
          </div>
        `);
        setShowResult(true);
      } else {
        console.error('Error generating resume:', data);
        setResult(`
          <div class="error-message">
            <h3>Error Generating Resume</h3>
            <p>${data.detail || 'An unknown error occurred.'}</p>
          </div>
        `);
        setShowResult(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setResult(`
        <div class="error-message">
          <h3>Error</h3>
          <p>Failed to communicate with the server. Please try again.</p>
          <p>Details: ${error.message}</p>
        </div>
      `);
      setShowResult(true);
    } finally {
      setIsGenerating(false);
    }
  };

  // Helper function to get template name by ID
  const getTemplateNameById = (id) => {
    const templateNames = {
      1: "Standard Template",
      2: "Professional Template",
      3: "Creative Resume Template", 
      4: "Creative Portfolio Template"
    };
    return templateNames[id] || `Template ${id}`;
  };

  // Check if generation is possible
  const canGenerate = filePaths.template && filePaths.skillMatrix && (filePaths.resume || selectedEmployee);

  // Display current template name
  const currentTemplateName = getTemplateNameById(selectedTemplateId || 1);

  return (
    <Card className="shadow border-0 mb-4">
      <Card.Body>
        <Card.Title>Generate Resume</Card.Title>
        
        <div className="mb-4">
          <h5>Selected Files:</h5>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Template:</strong> {fileInfo.template || 'No template selected'}
            </li>
            <li className="list-group-item">
              <strong>Template Style:</strong> {currentTemplateName}
            </li>
            <li className="list-group-item">
              <strong>Skill Matrix:</strong> {fileInfo.skillMatrix || 'No skill matrix uploaded'}
            </li>
            <li className="list-group-item">
              <strong>Resume:</strong> {fileInfo.resume || 'No resume uploaded'}
            </li>
            <li className="list-group-item">
              <strong>Selected Employee:</strong> {selectedEmployee 
                ? `${selectedEmployee.first_name} ${selectedEmployee.last_name}` 
                : 'No employee selected'}
            </li>
          </ul>
        </div>

        {/* Template selection dropdown */}
        <Form.Group className="mb-4">
          <Form.Label><strong>Select Template Style:</strong></Form.Label>
          <Form.Select 
            value={selectedTemplateId || 1}
            onChange={handleTemplateChange}
          >
            <option value={1}>Standard Template</option>
            <option value={2}>Professional Template</option>
            <option value={3}>Creative Resume Template</option>
            <option value={4}>Creative Portfolio Template</option>
          </Form.Select>
          <Form.Text className="text-muted">
            Choose the visual style for your resume and cover letter.
          </Form.Text>
        </Form.Group>
        
        {!canGenerate && (
          <Alert variant="warning">
            <strong>Missing required information.</strong> Please ensure you have uploaded a template, 
            skill matrix, and either uploaded a resume or selected an employee.
          </Alert>
        )}
        
        <div className="d-grid gap-2">
          <Button 
            variant="primary" 
            size="lg"
            onClick={handleGenerateResume}
            disabled={!canGenerate || isGenerating}
          >
            {isGenerating ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Generating...
              </>
            ) : (
              'Generate Resume'
            )}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GenerateResume;