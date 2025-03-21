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







// import React, { useState, useEffect, useRef } from 'react';
// import { Card, Button, Alert, Form, Spinner } from 'react-bootstrap';

// const GenerateResume = ({ 
//   filePaths, 
//   fileInfo, 
//   selectedEmployee, 
//   setResult, 
//   setShowResult,
//   isGenerating,
//   setIsGenerating,
//   selectedTemplateId,
//   setSelectedTemplateId
// }) => {
//   // Add a ref for the YouTube player
//   const youtubePlayerRef = useRef(null);
//   // State to control video visibility
//   const [showVideo, setShowVideo] = useState(false);
  
//   // Load YouTube API when component mounts
//   useEffect(() => {
//     // Load YouTube API script
//     const tag = document.createElement('script');
//     tag.src = 'https://www.youtube.com/iframe_api';
//     const firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//     // Define the onYouTubeIframeAPIReady function
//     window.onYouTubeIframeAPIReady = () => {
//       // YouTube API is loaded and ready to use
//       console.log('YouTube API Ready');
//     };

//     return () => {
//       // Cleanup if needed
//       window.onYouTubeIframeAPIReady = null;
//     };
//   }, []);

//   // Function to initialize YouTube player
//   const initYouTubePlayer = () => {
//     if (window.YT && window.YT.Player) {
//       youtubePlayerRef.current = new window.YT.Player('youtubePlayer', {
//         height: '315',
//         width: '100%',
//         videoId: 'zOqsqZig82M', // You can change this to any YouTube video ID you prefer
//         playerVars: {
//           autoplay: 1,
//           controls: 0,
//           rel: 0,
//           modestbranding: 1
//         },
//         events: {
//           'onReady': onPlayerReady
//         }
//       });
//     } else {
//       // If YouTube API isn't loaded yet, try again after a short delay
//       setTimeout(initYouTubePlayer, 100);
//     }
//   };

//   // When player is ready, play video
//   const onPlayerReady = (event) => {
//     event.target.playVideo();
//   };

//   // Function to stop and hide video
//   const stopAndHideVideo = () => {
//     if (youtubePlayerRef.current && typeof youtubePlayerRef.current.stopVideo === 'function') {
//       youtubePlayerRef.current.stopVideo();
//     }
//     setShowVideo(false);
//   };

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
    
//     // Show and start the YouTube video
//     setShowVideo(true);
//     setTimeout(initYouTubePlayer, 100);

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
//         // Stop and hide video before showing results
//         stopAndHideVideo();
        
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
//         // Stop and hide video on error too
//         stopAndHideVideo();
        
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
//       // Stop and hide video on error
//       stopAndHideVideo();
      
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
        
//         {/* YouTube player container - hidden by default */}
//         {showVideo && (
//           <div className="youtube-container mb-4">
//             <div className="ratio ratio-16x9">
//               <div id="youtubePlayer"></div>
//             </div>
//             <p className="text-center mt-2">
//               <em>Generating your resume and cover letter...</em>
//             </p>
//           </div>
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


// import React, { useState, useEffect, useRef } from 'react';
// import { Card, Button, Alert, Form, Spinner } from 'react-bootstrap';

// const GenerateResume = ({ 
//   filePaths, 
//   fileInfo, 
//   selectedEmployee, 
//   setResult, 
//   setShowResult,
//   isGenerating,
//   setIsGenerating,
//   selectedTemplateId,
//   setSelectedTemplateId
// }) => {
//   // Add a ref for the YouTube player
//   const youtubePlayerRef = useRef(null);
//   // State to control video visibility
//   const [showVideo, setShowVideo] = useState(false);
//   // State for skip button
//   const [showSkipButton, setShowSkipButton] = useState(false);
//   // Timer reference for skip button
//   const skipButtonTimerRef = useRef(null);
  
//   // Load YouTube API when component mounts
//   useEffect(() => {
//     // Load YouTube API script
//     const tag = document.createElement('script');
//     tag.src = 'https://www.youtube.com/iframe_api';
//     const firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//     // Define the onYouTubeIframeAPIReady function
//     window.onYouTubeIframeAPIReady = () => {
//       // YouTube API is loaded and ready to use
//       console.log('YouTube API Ready');
//     };

//     return () => {
//       // Cleanup if needed
//       window.onYouTubeIframeAPIReady = null;
      
//       // Clear any timers when component unmounts
//       if (skipButtonTimerRef.current) {
//         clearTimeout(skipButtonTimerRef.current);
//       }
//     };
//   }, []);

//   // Function to initialize YouTube player
//   const initYouTubePlayer = () => {
//     if (window.YT && window.YT.Player) {
//       youtubePlayerRef.current = new window.YT.Player('youtubePlayer', {
//         height: '315',
//         width: '100%',
//         videoId: 'zOqsqZig82M', // You can change this to any YouTube video ID you prefer
//         playerVars: {
//           autoplay: 1,
//           controls: 0,
//           rel: 0,
//           modestbranding: 1
//         },
//         events: {
//           'onReady': onPlayerReady
//         }
//       });
//     } else {
//       // If YouTube API isn't loaded yet, try again after a short delay
//       setTimeout(initYouTubePlayer, 100);
//     }
//   };

//   // When player is ready, play video
//   const onPlayerReady = (event) => {
//     event.target.playVideo();
    
//     // Set timer to show skip button after 20 seconds
//     skipButtonTimerRef.current = setTimeout(() => {
//       setShowSkipButton(true);
//     }, 20000);
//   };

//   // Function to stop and hide video
//   const stopAndHideVideo = () => {
//     if (youtubePlayerRef.current && typeof youtubePlayerRef.current.stopVideo === 'function') {
//       youtubePlayerRef.current.stopVideo();
//     }
//     setShowVideo(false);
//     setShowSkipButton(false);
    
//     // Clear the timer if it exists
//     if (skipButtonTimerRef.current) {
//       clearTimeout(skipButtonTimerRef.current);
//       skipButtonTimerRef.current = null;
//     }
//   };
  
//   // Handle skip button click
//   const handleSkip = () => {
//     // Stop the video
//     if (youtubePlayerRef.current && typeof youtubePlayerRef.current.stopVideo === 'function') {
//       youtubePlayerRef.current.stopVideo();
//     }
    
//     // Hide video but keep showing loading spinner
//     setShowVideo(false);
//     setShowSkipButton(false);
    
//     // Clear the timer
//     if (skipButtonTimerRef.current) {
//       clearTimeout(skipButtonTimerRef.current);
//       skipButtonTimerRef.current = null;
//     }
//   };

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
    
//     // Show and start the YouTube video
//     setShowVideo(true);
//     setTimeout(initYouTubePlayer, 100);

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
//         // Stop and hide video before showing results
//         stopAndHideVideo();
        
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
//         // Stop and hide video on error too
//         stopAndHideVideo();
        
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
//       // Stop and hide video on error
//       stopAndHideVideo();
      
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
        
//         {/* YouTube player container - hidden by default */}
//         {showVideo && (
//           <div className="youtube-container mb-4">
//             <div className="ratio ratio-16x9">
//               <div id="youtubePlayer"></div>
//             </div>
//             <div className="d-flex justify-content-between align-items-center mt-2">
//               <p className="mb-0">
//                 <em>Generating your resume and cover letter...</em>
//               </p>
//               {showSkipButton && (
//                 <Button 
//                   variant="secondary" 
//                   size="sm" 
//                   onClick={handleSkip}
//                 >
//                   Skip Video
//                 </Button>
//               )}
//             </div>
//           </div>
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



import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Alert, Spinner, Modal } from 'react-bootstrap';

const GenerateResume = ({ 
  filePaths, 
  fileInfo, 
  selectedEmployee, 
  setResult, 
  setShowResult,
  isGenerating,
  setIsGenerating,
  selectedTemplateId,
  setSelectedTemplateId
}) => {
  // Add a ref for the YouTube player
  const youtubePlayerRef = useRef(null);
  // State to control video modal
  const [showVideoModal, setShowVideoModal] = useState(false);
  // State for skip button
  const [showSkipButton, setShowSkipButton] = useState(false);
  // Timer reference for skip button
  const skipButtonTimerRef = useRef(null);
  // State for progress and status message
  const [generationProgress, setGenerationProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Initializing...');
  
  // Load YouTube API when component mounts
  useEffect(() => {
    // Load YouTube API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Add additional styles for modern UI
    const styles = document.createElement('style');
    styles.textContent = `
      .modern-card {
        border-radius: 12px;
        border: none;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        transition: all 0.3s ease;
      }
      .modern-card:hover {
        box-shadow: 0 8px 25px rgba(0,0,0,0.12);
      }
      .file-item {
        border-radius: 8px;
        background-color: #f8f9fa;
        padding: 15px;
        margin-bottom: 10px;
        border-left: 4px solid #dee2e6;
        transition: all 0.2s ease;
      }
      .file-item.success {
        border-left-color: #28a745;
        background-color: rgba(40, 167, 69, 0.05);
      }
      .file-item.danger {
        border-left-color: #dc3545;
        background-color: rgba(220, 53, 69, 0.05);
      }
      .generate-btn {
        position: relative;
        border-radius: 30px;
        font-weight: 500;
        padding: 12px 30px;
        transition: all 0.3s ease;
      }
      .generate-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(13, 110, 253, 0.15);
      }
      .header-gradient {
        background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
      }
      .pulse {
        animation: pulse-animation 2s infinite;
      }
      @keyframes pulse-animation {
        0% { box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.6); }
        70% { box-shadow: 0 0 0 10px rgba(13, 110, 253, 0); }
        100% { box-shadow: 0 0 0 0 rgba(13, 110, 253, 0); }
      }
    `;
    document.head.appendChild(styles);

    // Define the onYouTubeIframeAPIReady function
    window.onYouTubeIframeAPIReady = () => {
      // YouTube API is loaded and ready to use
      console.log('YouTube API Ready');
    };

    return () => {
      // Cleanup if needed
      window.onYouTubeIframeAPIReady = null;
      
      // Clear any timers when component unmounts
      if (skipButtonTimerRef.current) {
        clearTimeout(skipButtonTimerRef.current);
      }
    };
  }, []);

  // Function to initialize YouTube player
  const initYouTubePlayer = () => {
    if (window.YT && window.YT.Player) {
      youtubePlayerRef.current = new window.YT.Player('youtubePlayer', {
        height: '100%',
        width: '100%',
        videoId: '3Ujp-77kBvk', 
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          showinfo: 0,
          fs: 1, 
          playsinline: 0, 
          loop: 1, 
          playlist: '3Ujp-77kBvk', 
          vq: 'hd1080'
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    } else {
      // If YouTube API isn't loaded yet, try again after a short delay
      setTimeout(initYouTubePlayer, 100);
    }
  };
  
  // Handle player state changes
  const onPlayerStateChange = (event) => {
    // If video ends, loop it (as a backup in case loop param doesn't work)
    if (event.data === window.YT.PlayerState.ENDED) {
      event.target.playVideo();
    }
  };

  // When player is ready, play video
  const onPlayerReady = (event) => {
    event.target.playVideo();
    
    // Set timer to show skip button after 20 seconds
    skipButtonTimerRef.current = setTimeout(() => {
      setShowSkipButton(true);
    }, 20000);
  };

  // Function to stop and hide video modal
  const stopAndHideVideo = () => {
    if (youtubePlayerRef.current && typeof youtubePlayerRef.current.stopVideo === 'function') {
      youtubePlayerRef.current.stopVideo();
    }
    setShowVideoModal(false);
    setShowSkipButton(false);
    setGenerationProgress(0);
    
    // Clear the timer if it exists
    if (skipButtonTimerRef.current) {
      clearTimeout(skipButtonTimerRef.current);
      skipButtonTimerRef.current = null;
    }
  };
  
  // Handle skip button click
  const handleSkip = () => {
    // Stop the video
    if (youtubePlayerRef.current && typeof youtubePlayerRef.current.stopVideo === 'function') {
      youtubePlayerRef.current.stopVideo();
    }
    
    // Show just the progress in the modal without video
    document.getElementById('youtubePlayer').style.display = 'none';
    setShowSkipButton(false);
    
    // Clear the timer
    if (skipButtonTimerRef.current) {
      clearTimeout(skipButtonTimerRef.current);
      skipButtonTimerRef.current = null;
    }
  };
  
  // Simulated progress update
  useEffect(() => {
    let progressInterval;
    
    if (isGenerating) {
      // Start at 0 and increment to 90% over time (the last 10% will be when we receive the result)
      setGenerationProgress(0);
      const statusMessages = [
        'Analyzing resume data...',
        'Extracting skills and qualifications...',
        'Building professional profile...',
        'Formatting document...',
        'Applying template styling...',
        'Creating cover letter...',
        'Finalizing documents...'
      ];
      
      let step = 0;
      progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          // Don't go past 90% until we actually get the result
          return prev < 90 ? prev + 1 : prev;
        });
        
        // Update status message every ~14% (approx. every 5-7 seconds depending on total generation time)
        if (step < statusMessages.length && Math.random() > 0.9) {
          setStatusMessage(statusMessages[step]);
          step++;
        }
      }, 400); // adjust timing as needed
    } else {
      setGenerationProgress(0);
      setStatusMessage('Initializing...');
    }
    
    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isGenerating]);

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
    setStatusMessage('Initializing resume generation...');
    
    // Show modal and start YouTube video
    setShowVideoModal(true);
    setTimeout(initYouTubePlayer, 100);

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
        
        // Set progress to 100% before closing
        setGenerationProgress(100);
        setStatusMessage('Documents generated successfully!');
        
        // Create notification for documents generated
        const hasCoverLetter = data.cover_letter_status === 'Generated successfully';
        
        // Show notification toast
        const notification = document.createElement('div');
        notification.className = 'resume-notification';
        notification.innerHTML = `
          <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1070">
            <div class="toast show rounded shadow-sm" role="alert" aria-live="assertive" aria-atomic="true">
              <div class="toast-header bg-success text-white">
                <strong class="me-auto">Generation Complete</strong>
                <small>Just now</small>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>
              <div class="toast-body">
                <div class="mb-2">
                  <strong>Resume:</strong> Generated Successfully
                </div>
                <div>
                  <strong>Cover Letter:</strong> ${hasCoverLetter ? 'Generated Successfully' : 'Not Generated'}
                </div>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(notification);
        
        // Add confetti effect for successful generation
        const confettiScript = document.createElement('script');
        confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
        document.head.appendChild(confettiScript);
        
        confettiScript.onload = function() {
          window.confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        };
        
        // Remove notification after 5 seconds or when dismissed
        const closeButton = notification.querySelector('.btn-close');
        if (closeButton) {
          closeButton.addEventListener('click', () => {
            document.body.removeChild(notification);
          });
        }
        
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 5000);
        
        // Wait a moment to show 100% complete before hiding modal
        setTimeout(() => {
          // Stop and hide video before showing results
          stopAndHideVideo();
          
          // Create result HTML with enhanced styling
          setResult(`
            <div class="success-message p-4 rounded shadow-sm" style="background-color: #f8f9fa;">
              <div class="text-center mb-4">
                <div class="success-icon rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 80px; height: 80px; background-color: #198754; color: white;">
                  ✓
                </div>
                <h2 class="fw-bold">Resume Generated Successfully!</h2>
                <p class="text-muted">Your professional documents are ready to download</p>
              </div>
              
              <div class="row mb-4">
                <div class="col-md-6 mb-3">
                  <div class="card h-100 shadow-sm">
                    <div class="card-body d-flex flex-column">
                      <h4 class="card-title mb-3">Professional Resume</h4>
                      <p class="card-text text-muted mb-4">Your resume has been formatted according to professional standards.</p>
                      <a href="http://localhost:8000/generate/download/${data.resume_path.split('/').pop()}" target="_blank" rel="noopener noreferrer" class="mt-auto btn btn-primary">
                        Download Resume
                      </a>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-6 mb-3">
                  <div class="card h-100 shadow-sm">
                    <div class="card-body d-flex flex-column">
                      <h4 class="card-title mb-3">Cover Letter</h4>
                      <p class="card-text text-muted mb-4">
                        ${hasCoverLetter 
                          ? 'Your personalized cover letter has been created to complement your resume.' 
                          : 'No cover letter was generated with this resume.'}
                      </p>
                      ${hasCoverLetter 
                        ? `<a href="http://localhost:8000/generate/download/${data.resume_path.split('/').pop().replace('_Resume.pdf', '_Cover_Letter.pdf')}" target="_blank" rel="noopener noreferrer" class="mt-auto btn btn-success">
                            Download Cover Letter
                          </a>` 
                        : `<button disabled class="mt-auto btn btn-secondary">
                            Not Available
                          </button>`}
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="text-center">
                <button class="btn btn-outline-primary" onclick="window.location.reload()">
                  Generate Another Resume
                </button>
              </div>
            </div>
          `);
          setShowResult(true);
        }, 1000);
      } else {
        console.error('Error generating resume:', data);
        // Stop and hide video on error too
        stopAndHideVideo();
        
        setResult(`
          <div class="error-message alert alert-danger">
            <h3>Error Generating Resume</h3>
            <p>${data.detail || 'An unknown error occurred.'}</p>
          </div>
        `);
        setShowResult(true);
      }
    } catch (error) {
      console.error('Error:', error);
      // Stop and hide video on error
      stopAndHideVideo();
      
      setResult(`
        <div class="error-message alert alert-danger">
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

  // Check if generation is possible
  const canGenerate = filePaths.template && filePaths.skillMatrix && (filePaths.resume || selectedEmployee);

  return (
    <div className="modern-card mb-4">
      <div className="header-gradient text-white p-4">
        <h2 className="fw-bold mb-1">Resume Builder</h2>
        <p className="mb-0">Generate professional documents in minutes</p>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <h5 className="mb-3 border-bottom pb-2">Document Information</h5>
          
          <div className={`file-item ${fileInfo.template ? 'success' : 'danger'}`}>
            <div className="d-flex justify-content-between">
              <div>
                <h6 className="mb-0">Template</h6>
                <p className="mb-0 small text-muted">Required for document formatting</p>
              </div>
              <div className="text-end">
                {fileInfo.template ? (
                  <span className="badge bg-success">Uploaded</span>
                ) : (
                  <span className="badge bg-danger">Missing</span>
                )}
              </div>
            </div>
            {fileInfo.template && (
              <p className="mb-0 mt-1 small text-truncate">{fileInfo.template}</p>
            )}
          </div>
          
          <div className={`file-item ${fileInfo.skillMatrix ? 'success' : 'danger'}`}>
            <div className="d-flex justify-content-between">
              <div>
                <h6 className="mb-0">Skill Matrix</h6>
                <p className="mb-0 small text-muted">Required for skills assessment</p>
              </div>
              <div className="text-end">
                {fileInfo.skillMatrix ? (
                  <span className="badge bg-success">Uploaded</span>
                ) : (
                  <span className="badge bg-danger">Missing</span>
                )}
              </div>
            </div>
            {fileInfo.skillMatrix && (
              <p className="mb-0 mt-1 small text-truncate">{fileInfo.skillMatrix}</p>
            )}
          </div>
          
          <div className={`file-item ${fileInfo.resume || selectedEmployee ? 'success' : 'danger'}`}>
            <div className="d-flex justify-content-between">
              <div>
                <h6 className="mb-0">Resume Data</h6>
                <p className="mb-0 small text-muted">Required for content generation</p>
              </div>
              <div className="text-end">
                {fileInfo.resume || selectedEmployee ? (
                  <span className="badge bg-success">Available</span>
                ) : (
                  <span className="badge bg-danger">Missing</span>
                )}
              </div>
            </div>
            {fileInfo.resume ? (
              <p className="mb-0 mt-1 small text-truncate">{fileInfo.resume}</p>
            ) : selectedEmployee ? (
              <p className="mb-0 mt-1 small">Employee: {selectedEmployee.first_name} {selectedEmployee.last_name}</p>
            ) : null}
          </div>
        </div>
        
        <div className="text-center mt-5">
          {!canGenerate && (
            <div className="alert alert-warning mb-4">
              <strong>Please upload all required documents</strong> before generating your resume.
            </div>
          )}
          
          <div className="mb-3">
            <div className="progress mb-2" style={{ height: '8px' }}>
              <div 
                className="progress-bar bg-success" 
                role="progressbar" 
                style={{ 
                  width: `${canGenerate ? '100%' : '33%'}`,
                  transition: 'width 0.5s ease'
                }} 
                aria-valuenow={canGenerate ? 100 : 33} 
                aria-valuemin="0" 
                aria-valuemax="100"
              ></div>
            </div>
            <p className="text-muted small mb-4">
              {canGenerate 
                ? 'All documents uploaded and ready to process'
                : 'Upload all required documents to continue'
              }
            </p>
          </div>
          
          <Button 
            className={`generate-btn ${canGenerate ? 'pulse' : ''}`}
            variant={canGenerate ? "primary" : "secondary"}
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
                Processing Documents...
              </>
            ) : (
              "Generate Resume & Cover Letter"
            )}
          </Button>
          
          <p className="mt-2 small text-muted">
            Generation typically takes 30-45 seconds
          </p>
        </div>
      </div>
      
      <div className="bg-light p-3 text-center">
        <p className="mb-0 small">
          Your documents are processed securely and deleted after 30 days.
        </p>
      </div>
      
      {/* Video Modal */}
      <Modal 
        show={showVideoModal} 
        fullscreen 
        onHide={() => {}} 
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="header-gradient text-white">
          <Modal.Title>Creating Your Professional Documents</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white p-0">
          <div className="position-relative h-100 d-flex flex-column justify-content-center">
            {/* YouTube player */}
            <div className="youtube-container mb-4">
              <div id="youtubePlayer" className="w-100" style={{ 
                height: '70vh',
                margin: '0 auto',
                maxWidth: '95%'
              }}></div>
            </div>
            
            {/* Generation progress */}
            <div className="generation-progress px-4 py-3 mx-auto" style={{ maxWidth: '95%' }}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="mb-0">{statusMessage}</h4>
                {showSkipButton && (
                  <Button 
                    variant="light" 
                    onClick={handleSkip}
                  >
                    Skip Video
                  </Button>
                )}
              </div>
              
              <div className="progress" style={{ height: '25px', borderRadius: '25px', overflow: 'hidden' }}>
                <div 
                  className="progress-bar progress-bar-striped progress-bar-animated" 
                  role="progressbar" 
                  style={{ 
                    width: `${generationProgress}%`,
                    background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)'
                  }}
                  aria-valuenow={generationProgress} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                >
                  {generationProgress}%
                </div>
              </div>
              
              {/* Generation steps */}
              <div className="d-flex justify-content-between mt-3 text-white">
                <div className={`step ${generationProgress >= 20 ? 'text-white' : 'text-muted'}`}>
                  <span>Analysis</span>
                </div>
                <div className={`step ${generationProgress >= 40 ? 'text-white' : 'text-muted'}`}>
                  <span>Content</span>
                </div>
                <div className={`step ${generationProgress >= 60 ? 'text-white' : 'text-muted'}`}>
                  <span>Formatting</span>
                </div>
                <div className={`step ${generationProgress >= 80 ? 'text-white' : 'text-muted'}`}>
                  <span>Cover Letter</span>
                </div>
                <div className={`step ${generationProgress >= 100 ? 'text-white' : 'text-muted'}`}>
                  <span>Complete</span>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GenerateResume;

// import React, { useState, useEffect, useRef } from 'react';
// import { Card, Button, Alert, Form, Spinner, Modal } from 'react-bootstrap';

// // Add CSS import for Bootstrap icons
// const GenerateResume = ({ 
//   filePaths, 
//   fileInfo, 
//   selectedEmployee, 
//   setResult, 
//   setShowResult,
//   isGenerating,
//   setIsGenerating,
//   selectedTemplateId,
//   setSelectedTemplateId
// }) => {
//   // Add a ref for the YouTube player
//   const youtubePlayerRef = useRef(null);
//   // State to control video modal
//   const [showVideoModal, setShowVideoModal] = useState(false);
//   // State for skip button
//   const [showSkipButton, setShowSkipButton] = useState(false);
//   // Timer reference for skip button
//   const skipButtonTimerRef = useRef(null);
//   // State for progress and status message
//   const [generationProgress, setGenerationProgress] = useState(0);
//   const [statusMessage, setStatusMessage] = useState('Initializing...');
  
//   // Load YouTube API when component mounts
//   useEffect(() => {
//     // Load YouTube API script
//     const tag = document.createElement('script');
//     tag.src = 'https://www.youtube.com/iframe_api';
//     const firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//     // Load Bootstrap icons CSS
//     const iconLink = document.createElement('link');
//     iconLink.rel = 'stylesheet';
//     iconLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css';
//     document.head.appendChild(iconLink);

//     // Define the onYouTubeIframeAPIReady function
//     window.onYouTubeIframeAPIReady = () => {
//       // YouTube API is loaded and ready to use
//       console.log('YouTube API Ready');
//     };

//     return () => {
//       // Cleanup if needed
//       window.onYouTubeIframeAPIReady = null;
      
//       // Clear any timers when component unmounts
//       if (skipButtonTimerRef.current) {
//         clearTimeout(skipButtonTimerRef.current);
//       }
//     };
//   }, []);

//   // Function to initialize YouTube player
//   const initYouTubePlayer = () => {
//     if (window.YT && window.YT.Player) {
//       youtubePlayerRef.current = new window.YT.Player('youtubePlayer', {
//         height: '100%',
//         width: '100%',
//         videoId: '3Ujp-77kBvk', // You can change this to any YouTube video ID you prefer
//         playerVars: {
//           autoplay: 1,
//           controls: 0,
//           rel: 0,
//           modestbranding: 1,
//           showinfo: 0,
//           fs: 1, // Enable fullscreen button
//           playsinline: 0, // Allow video to play fullscreen on mobile
//           loop: 1, // Loop the video
//           playlist: '3Ujp-77kBvk', // Required for looping to work
//           vq: 'hd1080' // Request HD quality
//         },
//         events: {
//           'onReady': onPlayerReady,
//           'onStateChange': onPlayerStateChange
//         }
//       });
//     } else {
//       // If YouTube API isn't loaded yet, try again after a short delay
//       setTimeout(initYouTubePlayer, 100);
//     }
//   };
  
//   // Handle player state changes
//   const onPlayerStateChange = (event) => {
//     // If video ends, loop it (as a backup in case loop param doesn't work)
//     if (event.data === window.YT.PlayerState.ENDED) {
//       event.target.playVideo();
//     }
//   };

//   // When player is ready, play video
//   const onPlayerReady = (event) => {
//     event.target.playVideo();
    
//     // Set timer to show skip button after 20 seconds
//     skipButtonTimerRef.current = setTimeout(() => {
//       setShowSkipButton(true);
//     }, 20000);
//   };

//   // Function to stop and hide video modal
//   const stopAndHideVideo = () => {
//     if (youtubePlayerRef.current && typeof youtubePlayerRef.current.stopVideo === 'function') {
//       youtubePlayerRef.current.stopVideo();
//     }
//     setShowVideoModal(false);
//     setShowSkipButton(false);
//     setGenerationProgress(0);
    
//     // Clear the timer if it exists
//     if (skipButtonTimerRef.current) {
//       clearTimeout(skipButtonTimerRef.current);
//       skipButtonTimerRef.current = null;
//     }
//   };
  
//   // Handle skip button click
//   const handleSkip = () => {
//     // Stop the video
//     if (youtubePlayerRef.current && typeof youtubePlayerRef.current.stopVideo === 'function') {
//       youtubePlayerRef.current.stopVideo();
//     }
    
//     // Show just the progress in the modal without video
//     document.getElementById('youtubePlayer').style.display = 'none';
//     setShowSkipButton(false);
    
//     // Clear the timer
//     if (skipButtonTimerRef.current) {
//       clearTimeout(skipButtonTimerRef.current);
//       skipButtonTimerRef.current = null;
//     }
//   };
  
//   // Simulated progress update
//   useEffect(() => {
//     let progressInterval;
    
//     if (isGenerating) {
//       // Start at 0 and increment to 90% over time (the last 10% will be when we receive the result)
//       setGenerationProgress(0);
//       const statusMessages = [
//         'Analyzing resume data...',
//         'Extracting skills and qualifications...',
//         'Building professional profile...',
//         'Formatting document...',
//         'Applying template styling...',
//         'Creating cover letter...',
//         'Finalizing documents...'
//       ];
      
//       let step = 0;
//       progressInterval = setInterval(() => {
//         setGenerationProgress(prev => {
//           // Don't go past 90% until we actually get the result
//           return prev < 90 ? prev + 1 : prev;
//         });
        
//         // Update status message every ~14% (approx. every 5-7 seconds depending on total generation time)
//         if (step < statusMessages.length && Math.random() > 0.9) {
//           setStatusMessage(statusMessages[step]);
//           step++;
//         }
//       }, 400); // adjust timing as needed
//     } else {
//       setGenerationProgress(0);
//       setStatusMessage('Initializing...');
//     }
    
//     return () => {
//       if (progressInterval) clearInterval(progressInterval);
//     };
//   }, [isGenerating]);

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
//     setStatusMessage('Initializing resume generation...');
    
//     // Show modal and start YouTube video
//     setShowVideoModal(true);
//     setTimeout(initYouTubePlayer, 100);

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
        
//         // Set progress to 100% before closing
//         setGenerationProgress(100);
//         setStatusMessage('Documents generated successfully!');
        
//         // Create notification for documents generated
//         const hasCoverLetter = data.cover_letter_status === 'Generated successfully';
        
//         // Show notification toast
//         const notification = document.createElement('div');
//         notification.className = 'resume-notification';
//         notification.innerHTML = `
//           <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1070">
//             <div class="toast show rounded-3 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true">
//               <div class="toast-header" style="background: linear-gradient(135deg, #00b09b, #96c93d); color: white;">
//                 <i class="bi bi-check-circle-fill me-2"></i>
//                 <strong class="me-auto">Generation Complete</strong>
//                 <small>Just now</small>
//                 <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
//               </div>
//               <div class="toast-body">
//                 <div class="d-flex align-items-center mb-2">
//                   <div class="rounded-circle p-2 me-3" style="background: rgba(13, 110, 253, 0.1);">
//                     <i class="bi bi-file-earmark-text-fill text-primary fs-4"></i>
//                   </div>
//                   <span class="fw-semibold"><strong>Resume:</strong> Generated Successfully <i class="bi bi-check-circle-fill text-success ms-1"></i></span>
//                 </div>
//                 <div class="d-flex align-items-center">
//                   <div class="rounded-circle p-2 me-3" style="background: rgba(25, 135, 84, 0.1);">
//                     <i class="bi bi-envelope-paper-fill text-success fs-4"></i>
//                   </div>
//                   <span class="fw-semibold"><strong>Cover Letter:</strong> ${hasCoverLetter ? 'Generated Successfully <i class="bi bi-check-circle-fill text-success ms-1"></i>' : 'Not Generated <i class="bi bi-x-circle-fill text-danger ms-1"></i>'}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         `;
//         document.body.appendChild(notification);
        
//         // Add confetti effect for successful generation
//         const confettiScript = document.createElement('script');
//         confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
//         document.head.appendChild(confettiScript);
        
//         confettiScript.onload = function() {
//           window.confetti({
//             particleCount: 100,
//             spread: 70,
//             origin: { y: 0.6 }
//           });
//         };
        
//         // Remove notification after 5 seconds or when dismissed
//         const closeButton = notification.querySelector('.btn-close');
//         if (closeButton) {
//           closeButton.addEventListener('click', () => {
//             document.body.removeChild(notification);
//           });
//         }
        
//         setTimeout(() => {
//           if (document.body.contains(notification)) {
//             document.body.removeChild(notification);
//           }
//         }, 5000);
        
//         // Wait a moment to show 100% complete before hiding modal
//         setTimeout(() => {
//           // Stop and hide video before showing results
//           stopAndHideVideo();
          
//           // Create result HTML with enhanced styling
//           setResult(`
//             <div class="success-message p-4 rounded-4 shadow-lg" style="background: linear-gradient(to right, #f8f9fa, #e9ecef);">
//               <div class="text-center mb-4">
//                 <div class="success-icon rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 80px; height: 80px; background: linear-gradient(45deg, #00b09b, #96c93d);">
//                   <i class="bi bi-check-lg text-white fs-1"></i>
//                 </div>
//                 <h2 class="fw-bold">Resume Generated Successfully!</h2>
//                 <p class="text-muted">Your professional documents are ready to download</p>
//               </div>
              
//               <div class="row g-4 mb-4">
//                 <div class="col-md-6">
//                   <div class="card h-100 border-0 shadow-sm hover-shadow transition-all">
//                     <div class="card-body d-flex flex-column">
//                       <div class="d-flex align-items-center mb-3">
//                         <div class="rounded-circle p-2 me-3" style="background: rgba(13, 110, 253, 0.1);">
//                           <i class="bi bi-file-earmark-text-fill text-primary fs-3"></i>
//                         </div>
//                         <h4 class="card-title mb-0">Professional Resume</h4>
//                       </div>
//                       <p class="card-text text-muted mb-4">Your resume has been formatted using the ${getTemplateNameById(data.template_used || selectedTemplateId || 1)}.</p>
//                       <a href="http://localhost:8000/generate/download/${data.resume_path.split('/').pop()}" target="_blank" rel="noopener noreferrer" class="mt-auto btn btn-primary btn-lg d-flex align-items-center justify-content-center" style="border-radius: 50px;">
//                         <i class="bi bi-download me-2"></i> Download Resume
//                       </a>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div class="col-md-6">
//                   <div class="card h-100 border-0 shadow-sm hover-shadow transition-all">
//                     <div class="card-body d-flex flex-column">
//                       <div class="d-flex align-items-center mb-3">
//                         <div class="rounded-circle p-2 me-3" style="background: rgba(25, 135, 84, 0.1);">
//                           <i class="bi bi-envelope-paper-fill text-success fs-3"></i>
//                         </div>
//                         <h4 class="card-title mb-0">Cover Letter</h4>
//                       </div>
//                       <p class="card-text text-muted mb-4">
//                         ${hasCoverLetter 
//                           ? 'Your personalized cover letter has been created to complement your resume.' 
//                           : 'No cover letter was generated with this resume.'}
//                       </p>
//                       ${hasCoverLetter 
//                         ? `<a href="http://localhost:8000/generate/download/${data.resume_path.split('/').pop().replace('_Resume.pdf', '_Cover_Letter.pdf')}" target="_blank" rel="noopener noreferrer" class="mt-auto btn btn-success btn-lg d-flex align-items-center justify-content-center" style="border-radius: 50px;">
//                             <i class="bi bi-download me-2"></i> Download Cover Letter
//                           </a>` 
//                         : `<button disabled class="mt-auto btn btn-secondary btn-lg d-flex align-items-center justify-content-center" style="border-radius: 50px;">
//                             <i class="bi bi-x-circle me-2"></i> Not Available
//                           </button>`}
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div class="text-center">
//                 <button class="btn btn-outline-primary px-4" onclick="window.location.reload()">
//                   <i class="bi bi-arrow-repeat me-2"></i> Generate Another Resume
//                 </button>
//               </div>
//             </div>
//           `);
//           setShowResult(true);
//         }, 1000);
//       } else {
//         console.error('Error generating resume:', data);
//         // Stop and hide video on error too
//         stopAndHideVideo();
        
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
//       // Stop and hide video on error
//       stopAndHideVideo();
      
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
        
//         {/* Video Modal */}
//         <Modal 
//           show={showVideoModal} 
//           fullscreen 
//           onHide={() => {}} // Disable closing by clicking outside
//           backdrop="static"
//           keyboard={false}
//           className="resume-generation-modal"
//         >
//           <Modal.Header className="border-0 bg-gradient-dark text-white py-4" style={{
//             background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
//           }}>
//             <Modal.Title className="d-flex align-items-center">
//               <i className="bi bi-file-earmark-text-fill me-3 fs-2"></i>
//               <div>
//                 <h3 className="mb-0 fw-bold">Creating Your Professional Portfolio</h3>
//                 <p className="mb-0 opacity-75 fs-6">Transforming your experience into opportunity</p>
//               </div>
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body className="p-0" style={{ 
//             background: 'linear-gradient(180deg, #1e3c72 0%, #2c3e50 100%)'
//           }}>
//             <div className="position-relative h-100 d-flex flex-column justify-content-center">
//               {/* YouTube player */}
//               <div className="youtube-container mb-4 position-relative">
//                 <div id="youtubePlayer" className="w-100 shadow-lg" style={{ 
//                   height: '70vh',
//                   borderRadius: '8px',
//                   overflow: 'hidden',
//                   boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
//                   margin: '0 auto',
//                   maxWidth: '95%'
//                 }}></div>
                
//                 {/* Custom video player controls overlay */}
//                 <div className="video-controls-overlay position-absolute bottom-0 start-0 end-0 p-3 text-white" style={{
//                   background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
//                   borderBottomLeftRadius: '8px',
//                   borderBottomRightRadius: '8px',
//                   pointerEvents: 'none'
//                 }}>
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div className="d-flex align-items-center">
//                       <i className="bi bi-play-circle-fill me-2 fs-4"></i>
//                       <span>Resume Builder Pro</span>
//                     </div>
//                     <div className="time-display">
//                       <i className="bi bi-clock me-1"></i>
//                       <span>Processing</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Generation progress */}
//               <div className="generation-progress px-4 py-4 mx-auto" style={{ 
//                 maxWidth: '95%', 
//                 backgroundColor: 'rgba(0,0,0,0.2)',
//                 borderRadius: '12px',
//                 backdropFilter: 'blur(10px)',
//                 boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
//               }}>
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <h4 className="mb-0 text-white d-flex align-items-center">
//                     <i className="bi bi-lightning-charge-fill me-2 text-warning"></i>
//                     {statusMessage}
//                   </h4>
//                   {showSkipButton && (
//                     <Button 
//                       variant="light" 
//                       onClick={handleSkip}
//                       className="btn-skip-video fw-bold d-flex align-items-center"
//                       style={{
//                         borderRadius: '50px',
//                         padding: '10px 20px',
//                         boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
//                         transition: 'all 0.3s ease'
//                       }}
//                     >
//                       <i className="bi bi-skip-forward-fill me-2"></i>
//                       Skip Video
//                     </Button>
//                   )}
//                 </div>
                
//                 <div className="progress" style={{ height: '30px', borderRadius: '50px', backgroundColor: 'rgba(255,255,255,0.2)' }}>
//                   <div 
//                     className="progress-bar" 
//                     role="progressbar" 
//                     style={{ 
//                       width: `${generationProgress}%`,
//                       background: 'linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)',
//                       borderRadius: '50px',
//                       transition: 'width 0.5s ease'
//                     }}
//                     aria-valuenow={generationProgress} 
//                     aria-valuemin="0" 
//                     aria-valuemax="100"
//                   >
//                     <span className="fw-bold">{generationProgress}%</span>
//                   </div>
//                 </div>
                
//                 {/* Generation steps */}
//                 <div className="generation-steps d-flex justify-content-between mt-4 text-white">
//                   <div className={`step ${generationProgress >= 20 ? 'text-white' : 'text-muted'}`}>
//                     <i className={`bi bi-1-circle${generationProgress >= 20 ? '-fill text-primary' : ''} fs-5`}></i>
//                     <span className="ms-1 d-none d-md-inline">Analysis</span>
//                   </div>
//                   <div className={`step ${generationProgress >= 40 ? 'text-white' : 'text-muted'}`}>
//                     <i className={`bi bi-2-circle${generationProgress >= 40 ? '-fill text-info' : ''} fs-5`}></i>
//                     <span className="ms-1 d-none d-md-inline">Content</span>
//                   </div>
//                   <div className={`step ${generationProgress >= 60 ? 'text-white' : 'text-muted'}`}>
//                     <i className={`bi bi-3-circle${generationProgress >= 60 ? '-fill text-success' : ''} fs-5`}></i>
//                     <span className="ms-1 d-none d-md-inline">Formatting</span>
//                   </div>
//                   <div className={`step ${generationProgress >= 80 ? 'text-white' : 'text-muted'}`}>
//                     <i className={`bi bi-4-circle${generationProgress >= 80 ? '-fill text-warning' : ''} fs-5`}></i>
//                     <span className="ms-1 d-none d-md-inline">Cover Letter</span>
//                   </div>
//                   <div className={`step ${generationProgress >= 100 ? 'text-white' : 'text-muted'}`}>
//                     <i className={`bi bi-5-circle${generationProgress >= 100 ? '-fill text-danger' : ''} fs-5`}></i>
//                     <span className="ms-1 d-none d-md-inline">Complete</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Modal.Body>
//         </Modal>
        
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
