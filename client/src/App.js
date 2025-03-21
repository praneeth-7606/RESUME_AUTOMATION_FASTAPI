


// import React, { useState, useEffect } from 'react';
// import './App.css';
// import ResumeTemplatesGallery from './components/upload_template';
// import UploadSkillMatrix from './components/uploadskillmatrix';
// import UploadResume from './components/uploadresume';
// import GenerateResume from './components/generate_resume';
// import EmployeeList from './components/search_employee';
// // import EmployeeList from './components/EmployeeList'; // Import the new component
// import { Container, Row, Col, Card } from 'react-bootstrap';

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

//   // State for the selected employee
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
  
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

//   // Auto-update active step based on filled information
//   useEffect(() => {
//     if (filePaths.template) {
//       setActiveStep(1);
//     }
//     if (filePaths.template && filePaths.skillMatrix) {
//       setActiveStep(2);
//     }
//     if (filePaths.template && filePaths.skillMatrix && (filePaths.resume || selectedEmployee)) {
//       setActiveStep(3);
//     }
//     if (filePaths.template && filePaths.skillMatrix && filePaths.resume && selectedEmployee) {
//       setActiveStep(4);
//     }
//     if (showResult) {
//       setActiveStep(5);
//     }
//   }, [filePaths, selectedEmployee, showResult]);

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
//                 {['Select Template', 'Upload Skills', 'Upload Resume', 'Generate'].map((step, index) => (
//                   <Col key={index} xs="auto" className="text-center">
//                     <div className={`progress-step ${activeStep >= index ? 'active' : ''}`}>
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

//         {/* Main Content */}
//         <Row>
//           <Col lg={12}>
//             <div className="content-section mb-4">
//               <ResumeTemplatesGallery
//                 setFilePaths={setFilePaths}
//                 setFileInfo={setFileInfo}
//               />
//             </div>

//             <div className="content-section mb-4">
//               <UploadSkillMatrix
//                 setFilePaths={setFilePaths}
//                 setFileInfo={setFileInfo}
//                 fileInfo={fileInfo}
//               />
//             </div>

//             {/* Only show employee list if skill matrix is uploaded */}
//             {filePaths.skillMatrix && (
//               <div className="content-section mb-4">
//                 <EmployeeList
//                   selectedEmployee={selectedEmployee}
//                   setSelectedEmployee={setSelectedEmployee}
//                 />
//               </div>
//             )}

//             <div className="content-section mb-4">
//               <UploadResume
//                 setFilePaths={setFilePaths}
//                 setFileInfo={setFileInfo}
//               />
//             </div>

//             <div className="content-section mb-4">
//               <GenerateResume
//                 filePaths={filePaths}
//                 fileInfo={fileInfo}
//                 selectedEmployee={selectedEmployee}
//                 setResult={setResult}
//                 setShowResult={setShowResult}
//                 isGenerating={isGenerating}
//                 setIsGenerating={setIsGenerating}
//               />
//             </div>

//             {/* Results Section */}
//             {showResult && (
//               <Card className="mb-4 shadow border-0">
//                 <Card.Body>
//                   <h3 className="mb-3">Generated Resume</h3>
//                   <div className="result-container">
//                     <div className="resume-preview p-4 bg-light border rounded">
//                       <div dangerouslySetInnerHTML={{ __html: result }} />
//                     </div>
//                     <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
//                       <button className="btn btn-primary me-md-2" onClick={() => {
//                         const blob = new Blob([result], { type: 'text/html' });
//                         const url = URL.createObjectURL(blob);
//                         const a = document.createElement('a');
//                         a.href = url;
//                         a.download = 'generated_resume.html';
//                         document.body.appendChild(a);
//                         a.click();
//                         document.body.removeChild(a);
//                       }}>
//                         Download HTML
//                       </button>
//                       <button className="btn btn-secondary" onClick={() => {
//                         // Print functionality
//                         const printWindow = window.open('', '_blank');
//                         printWindow.document.write(result);
//                         printWindow.document.close();
//                         printWindow.focus();
//                         printWindow.print();
//                       }}>
//                         Print Resume
//                       </button>
//                     </div>
//                   </div>
//                 </Card.Body>
//               </Card>
//             )}
//           </Col>
//         </Row>
        
//         {/* Footer */}
//         <footer className="text-center py-4 mt-5">
//           <p className="text-muted mb-0">© 2023 Resume Automation Tool</p>
//         </footer>
//       </Container>
//     </div>
//   );
// }

// export default App;
// import React, { useState, useEffect } from 'react';
// import './App.css';
// import ResumeTemplatesGallery from './components/upload_template';
// import UploadSkillMatrix from './components/uploadskillmatrix';
// import UploadResume from './components/uploadresume';
// import GenerateResume from './components/generate_resume';
// import EmployeeList from './components/search_employee';
// import { Container, Row, Col, Card } from 'react-bootstrap';

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

//   // State for the selected employee
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
  
//   // State for the selected template ID
//   const [selectedTemplateId, setSelectedTemplateId] = useState(1); // Default to template 1
  
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

//   // Auto-update active step based on filled information
//   useEffect(() => {
//     if (filePaths.template) {
//       setActiveStep(1);
//     }
//     if (filePaths.template && filePaths.skillMatrix) {
//       setActiveStep(2);
//     }
//     if (filePaths.template && filePaths.skillMatrix && (filePaths.resume || selectedEmployee)) {
//       setActiveStep(3);
//     }
//     if (filePaths.template && filePaths.skillMatrix && filePaths.resume && selectedEmployee) {
//       setActiveStep(4);
//     }
//     if (showResult) {
//       setActiveStep(5);
//     }
//   }, [filePaths, selectedEmployee, showResult]);

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
//                 {['Select Template', 'Upload Skills', 'Upload Resume', 'Generate'].map((step, index) => (
//                   <Col key={index} xs="auto" className="text-center">
//                     <div className={`progress-step ${activeStep >= index ? 'active' : ''}`}>
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

//         {/* Main Content */}
//         <Row>
//           <Col lg={12}>
//             <div className="content-section mb-4">
//               <ResumeTemplatesGallery
//                 setFilePaths={setFilePaths}
//                 setFileInfo={setFileInfo}
//                 setSelectedTemplateId={setSelectedTemplateId} // Pass the setter for template ID
//               />
//             </div>

//             <div className="content-section mb-4">
//               <UploadSkillMatrix
//                 setFilePaths={setFilePaths}
//                 setFileInfo={setFileInfo}
//                 fileInfo={fileInfo}
//               />
//             </div>

//             {/* Only show employee list if skill matrix is uploaded */}
//             {filePaths.skillMatrix && (
//               <div className="content-section mb-4">
//                 <EmployeeList
//                   selectedEmployee={selectedEmployee}
//                   setSelectedEmployee={setSelectedEmployee}
//                 />
//               </div>
//             )}

//             <div className="content-section mb-4">
//               <UploadResume
//                 setFilePaths={setFilePaths}
//                 setFileInfo={setFileInfo}
//               />
//             </div>

//             <div className="content-section mb-4">
//               <GenerateResume
//                 filePaths={filePaths}
//                 fileInfo={fileInfo}
//                 selectedEmployee={selectedEmployee}
//                 setResult={setResult}
//                 setShowResult={setShowResult}
//                 isGenerating={isGenerating}
//                 setIsGenerating={setIsGenerating}
//                 selectedTemplateId={selectedTemplateId} // Pass the selected template ID
//                 setSelectedTemplateId={setSelectedTemplateId} // Allow changing template in generation step
//               />
//             </div>

//             {/* Results Section */}
//             {showResult && (
//               <Card className="mb-4 shadow border-0">
//                 <Card.Body>
//                   <h3 className="mb-3">Generated Resume</h3>
//                   <div className="result-container">
//                     <div className="resume-preview p-4 bg-light border rounded">
//                       <div dangerouslySetInnerHTML={{ __html: result }} />
//                     </div>
//                     <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
//                       <button className="btn btn-primary me-md-2" onClick={() => {
//                         const blob = new Blob([result], { type: 'text/html' });
//                         const url = URL.createObjectURL(blob);
//                         const a = document.createElement('a');
//                         a.href = url;
//                         a.download = 'generated_resume.html';
//                         document.body.appendChild(a);
//                         a.click();
//                         document.body.removeChild(a);
//                       }}>
//                         Download HTML
//                       </button>
//                       <button className="btn btn-secondary" onClick={() => {
//                         // Print functionality
//                         const printWindow = window.open('', '_blank');
//                         printWindow.document.write(result);
//                         printWindow.document.close();
//                         printWindow.focus();
//                         printWindow.print();
//                       }}>
//                         Print Resume
//                       </button>
//                     </div>
//                   </div>
//                 </Card.Body>
//               </Card>
//             )}
//           </Col>
//         </Row>
        
//         {/* Footer */}
//         <footer className="text-center py-4 mt-5">
//           <p className="text-muted mb-0">© 2023 Resume Automation Tool</p>
//         </footer>
//       </Container>
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import './App.css';
import ResumeTemplatesGallery from './components/upload_template';
import UploadSkillMatrix from './components/uploadskillmatrix';
import UploadResume from './components/uploadresume';
import GenerateResume from './components/generate_resume';
import EmployeeList from './components/search_employee';
import { Container, Row, Col, Card } from 'react-bootstrap';

function App() {
  // State for file paths
  const [filePaths, setFilePaths] = useState({
    skillMatrix: '',
    resume: '',
    template: ''
  });

  // State for file info display
  const [fileInfo, setFileInfo] = useState({
    skillMatrix: '',
    resume: '',
    template: ''
  });

  // State for the selected employee
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  // State for the selected template ID
  const [selectedTemplateId, setSelectedTemplateId] = useState(1); // Default to template 1
  
  // State for generation results
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // State for UI animation
  const [fadeIn, setFadeIn] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Trigger fade-in animation on component mount
  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Auto-update active step based on filled information
  useEffect(() => {
    if (filePaths.template) {
      setActiveStep(1);
    }
    if (filePaths.template && filePaths.skillMatrix) {
      setActiveStep(2);
    }
    if (filePaths.template && filePaths.skillMatrix && (filePaths.resume || selectedEmployee)) {
      setActiveStep(3);
    }
    if (filePaths.template && filePaths.skillMatrix && filePaths.resume && selectedEmployee) {
      setActiveStep(4);
    }
    if (showResult) {
      setActiveStep(5);
    }
  }, [filePaths, selectedEmployee, showResult]);

  return (
    <div className={`app-container ${fadeIn ? 'fade-in' : ''}`}>
      <Container>
        {/* Header */}
        <Card className="mb-5 shadow border-0 text-center">
          <Card.Body>
            <h1 className="display-4 fw-bold mb-0">
              Resume Automation Tool
            </h1>
            <p className="lead mt-2">Create professional resumes in minutes</p>
            
            {/* Progress Tracker */}
            <div className="progress-tracker mt-4">
              <Row className="justify-content-center">
                {['Select Template', 'Upload Skills', 'Upload Resume', 'Generate'].map((step, index) => (
                  <Col key={index} xs="auto" className="text-center">
                    <div className={`progress-step ${activeStep >= index ? 'active' : ''}`}>
                      <div className="step-number">{index + 1}</div>
                      <div className="step-label">{step}</div>
                    </div>
                    {index < 3 && (
                      <div className={`connector ${activeStep > index ? 'active' : ''}`}></div>
                    )}
                  </Col>
                ))}
              </Row>
            </div>
          </Card.Body>
        </Card>

        {/* Main Content */}
        <Row>
          <Col lg={12}>
            <div className="content-section mb-4">
              <ResumeTemplatesGallery
                setFilePaths={setFilePaths}
                setFileInfo={setFileInfo}
                setSelectedTemplateId={setSelectedTemplateId}
              />
            </div>

            <div className="content-section mb-4">
              <UploadSkillMatrix
                setFilePaths={setFilePaths}
                setFileInfo={setFileInfo}
                fileInfo={fileInfo}
              />
            </div>

            {/* Only show employee list if skill matrix is uploaded */}
            {filePaths.skillMatrix && (
              <div className="content-section mb-4">
                <EmployeeList
                  selectedEmployee={selectedEmployee}
                  setSelectedEmployee={setSelectedEmployee}
                />
              </div>
            )}

            <div className="content-section mb-4">
              <UploadResume
                setFilePaths={setFilePaths}
                setFileInfo={setFileInfo}
              />
            </div>

            <div className="content-section mb-4">
              <GenerateResume
                filePaths={filePaths}
                fileInfo={fileInfo}
                selectedEmployee={selectedEmployee}
                setResult={setResult}
                setShowResult={setShowResult}
                isGenerating={isGenerating}
                setIsGenerating={setIsGenerating}
                selectedTemplateId={selectedTemplateId}
                setSelectedTemplateId={setSelectedTemplateId}
              />
            </div>

            {/* Results Section */}
            {showResult && (
              <Card className="mb-4 shadow border-0">
                <Card.Body>
                  <h3 className="mb-3">Generated Resume</h3>
                  <div className="result-container">
                    <div className="resume-preview p-4 border rounded">
                      <div dangerouslySetInnerHTML={{ __html: result }} />
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                      {/* <button className="btn btn-primary me-md-2" onClick={() => {
                        const blob = new Blob([result], { type: 'text/html' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'generated_resume.html';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }}>
                        Download HTML
                      </button> */}
                      {/* <button className="btn btn-secondary" onClick={() => {
                        // Print functionality
                        const printWindow = window.open('', '_blank');
                        printWindow.document.write(result);
                        printWindow.document.close();
                        printWindow.focus();
                        printWindow.print();
                      }}>
                        Print Resume
                      </button> */}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
        
        {/* Footer */}
        <footer className="text-center py-4 mt-5">
          {/* <p className="text-muted mb-0">   </p> */}
          <p className="text-muted mb-0">
  <img src="/footer-logo-1.png" alt="Description" className="img-fluid" />
</p>

        </footer>
      </Container>
    </div>
  );
}

export default App;