// horizantal app 



// import React, { useState, useEffect } from 'react';
// import './App.css';
// import ResumeTemplatesGallery from './components/upload_template';
// import UploadSkillMatrix from './components/uploadskillmatrix';
// import UploadResume from './components/uploadresume';
// import GenerateResume from './components/generate_resume';
// import SearchEmployee from './components/search_employee';
// import { Container, Row, Col, Card, Button } from 'react-bootstrap';

// function App() {
//   // State for file paths
//   const [filePaths, setFilePaths] = useState({
//     skillMatrix: '',
//     resume: '',
//     template: ''
//   });

//   // State for file info display
//   const [fileInfo, setFileInfo] = useState({
//     skillMatrix: '',
//     resume: '',
//     template: ''
//   });

//   // State for search inputs and results
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [showSearchResults, setShowSearchResults] = useState(false);

//   // State for generation results
//   const [result, setResult] = useState('');
//   const [showResult, setShowResult] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);

//   // State for UI animation
//   const [fadeIn, setFadeIn] = useState(false);
//   const [activeStep, setActiveStep] = useState(0);

//   // Trigger fade-in animation on component mount
//   useEffect(() => {
//     setFadeIn(true);
//   }, []);

//   // Function to handle next step navigation
//   const goToNextStep = () => {
//     if (activeStep < 4) {
//       setActiveStep(activeStep + 1);
//     }
//   };

//   // Function to handle previous step navigation
//   const goToPreviousStep = () => {
//     if (activeStep > 0) {
//       setActiveStep(activeStep - 1);
//     }
//   };

//   // Conditionally render the current step component
//   const renderStepContent = () => {
//     switch (activeStep) {
//       case 0:
//         return (
//           <div className="content-section slide-in-right">
//             <ResumeTemplatesGallery
//               setFilePaths={setFilePaths}
//               setFileInfo={setFileInfo}
//             />
//             <div className="navigation-buttons mt-4">
//               <Button 
//                 className="btn-primary" 
//                 onClick={goToNextStep} 
//                 disabled={!filePaths.template}
//               >
//                 Next: Upload Documents
//               </Button>
//             </div>
//           </div>
//         );
//       case 1:
//         return (
//           <div className="content-section slide-in-right">
//             <h2 className="mb-4">Upload Documents</h2>
//             <Row>
//               <Col md={6}>
//                 <UploadSkillMatrix
//                   setFilePaths={setFilePaths}
//                   setFileInfo={setFileInfo}
//                   fileInfo={fileInfo.skillMatrix}
//                 />
//               </Col>
//               <Col md={6}>
//                 <UploadResume
//                   setFilePaths={setFilePaths}
//                   setFileInfo={setFileInfo}
//                   fileInfo={fileInfo.resume}
//                 />
//               </Col>
//             </Row>
//             <div className="navigation-buttons mt-4 d-flex justify-content-between">
//               <Button className="btn-warning" onClick={goToPreviousStep}>
//                 Back: Choose Template
//               </Button>
//               <Button 
//                 className="btn-primary" 
//                 onClick={goToNextStep} 
//                 disabled={!filePaths.skillMatrix || !filePaths.resume}
//               >
//                 Next: Find Employee
//               </Button>
//             </div>
//           </div>
//         );
//       case 2:
//         return (
//           <div className="content-section slide-in-right">
//             <SearchEmployee
//               firstName={firstName}
//               setFirstName={setFirstName}
//               lastName={lastName}
//               setLastName={setLastName}
//               searchResults={searchResults}
//               setSearchResults={setSearchResults}
//               showSearchResults={showSearchResults}
//               setShowSearchResults={setShowSearchResults}
//             />
//             <div className="navigation-buttons mt-4 d-flex justify-content-between">
//               <Button className="btn-warning" onClick={goToPreviousStep}>
//                 Back: Upload Documents
//               </Button>
//               <Button 
//                 className="btn-primary" 
//                 onClick={goToNextStep} 
//                 disabled={!firstName && !lastName}
//               >
//                 Next: Generate Resume
//               </Button>
//             </div>
//           </div>
//         );
//       case 3:
//         return (
//           <div className="content-section slide-in-right">
//             <GenerateResume
//               filePaths={filePaths}
//               firstName={firstName}
//               lastName={lastName}
//               isGenerating={isGenerating}
//               setIsGenerating={setIsGenerating}
//               result={result}
//               setResult={setResult}
//               showResult={showResult}
//               setShowResult={setShowResult}
//             />
//             <div className="navigation-buttons mt-4">
//               <Button className="btn-warning" onClick={goToPreviousStep}>
//                 Back: Find Employee
//               </Button>
//             </div>
//           </div>
//         );
//       default:
//         return <div>Unknown step</div>;
//     }
//   };

//   return (
//     <div className={`app-container ${fadeIn ? 'fade-in' : ''}`} style={{ 
//       background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
//       minHeight: '100vh',
//       padding: '2rem 0',
//     }}>
//       <Container>
//         {/* Header */}
//         <Card className="mb-5 shadow border-0 text-center">
//           <Card.Body>
//             <h1 className="display-4 fw-bold mb-0" style={{ 
//               background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)', 
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent'
//             }}>
//               Resume Automation Tool
//             </h1>
//             <p className="lead text-muted mt-2">Create professional resumes in minutes</p>
            
//             {/* Progress Tracker */}
//             <div className="progress-tracker mt-4">
//               <Row className="justify-content-center">
//                 {['Select Template', 'Upload Documents', 'Find Employee', 'Generate Resume'].map((step, index) => (
//                   <Col key={index} xs="auto" className="text-center">
//                     <div className={`progress-step ${activeStep >= index ? 'active' : ''}`} 
//                          onClick={() => {
//                            // Allow navigation to previous completed steps
//                            if (index < activeStep) {
//                              setActiveStep(index);
//                            }
//                          }}
//                          style={{ cursor: index < activeStep ? 'pointer' : 'default' }}>
//                       <div className="step-number">{index + 1}</div>
//                       <div className="step-label">{step}</div>
//                     </div>
//                     {index < 3 && (
//                       <div className={`connector ${activeStep > index ? 'active' : ''}`}></div>
//                     )}
//                   </Col>
//                 ))}
//               </Row>
//             </div>
//           </Card.Body>
//         </Card>

//         {/* Dynamic Content Area */}
//         {renderStepContent()}
        
//       </Container>
//     </div>
//   );
// }

// export default App;



