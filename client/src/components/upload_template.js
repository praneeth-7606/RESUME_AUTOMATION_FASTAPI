
// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Button, Modal, Spinner } from 'react-bootstrap';
// import { DownloadOutlined, EyeOutlined, CloseOutlined, UploadOutlined, CheckCircleOutlined } from '@ant-design/icons';
// import { Tag, Typography, message } from 'antd';

// const { Title, Text } = Typography;

// // Resume template data with local file paths and template_id mapping
// const resumeTemplates = [
//   {
//     id: 1,
//     template_id: 1, // Standard template
//     title: "Professional Classic",
//     photoUrl: "https://d.novoresume.com/images/doc/skill-based-resume-template.png",
//     description: "Clean and elegant design for corporate professionals",
//     tags: ["Corporate", "Traditional"],
//     wordDocPath: "/templates/sample output.docx"
//   },
//   {
//     id: 2,
//     template_id: 2, // Professional template 
//     title: "Modern Minimalist",
//     photoUrl: "https://cdn.enhancv.com/images/648/i/aHR0cHM6Ly9jZG4uZW5oYW5jdi5jb20vcHJlZGVmaW5lZC1leGFtcGxlcy9ZeXd6OVBpQWhBa29zVGlFN0F3ZnZOUHlQbk9zOGJTOHpETlA2cVF2L2ltYWdlLnBuZw~~.png",
//     description: "Sleek, simple design for creative industries",
//     tags: ["Creative", "Minimalist"],
//     wordDocPath: "/templates/sample output.docx",
//     FileType: ".pdf"
//   },
//   {
//     id: 3,
//     template_id: 3, // Modern Blue template
//     title: "Tech Innovator",
//     photoUrl: "https://cdn-blog.novoresume.com/articles/resume-formats/Reverse-Chronological-Resume-Format.png",
//     description: "Dynamic layout for tech and startup professionals",
//     tags: ["Tech", "Startup"],
//     wordDocPath: "/templates/tech_innovator.docx"
//   },
//   // Other templates...
//   {
//     id: 4,
//     template_id: 1, // Using standard template
//     title: "Academic Scholar",
//     photoUrl: "https://www.resume-now.com/sapp/uploads/2024/02/resume-template-paralegals.svg",
//     description: "Refined template for academic and research positions",
//     tags: ["Academic", "Research"],
//     wordDocPath: "/templates/academic_scholar.docx"
//   },
//   {
//     id: 5,
//     template_id: 2, // Using professional template
//     title: "Executive Profile",
//     photoUrl: "https://cdn-blog.novoresume.com/articles/resume-formats/Reverse-Chronological-Resume-Format.png",
//     description: "Sophisticated design for senior management and executives",
//     tags: ["Executive", "Leadership"],
//     wordDocPath: "/templates/executive_profile.docx"
//   },
//   {
//     id: 6,
//     template_id: 3, // Using modern blue template
//     title: "Creative Portfolio",
//     photoUrl: "https://www.resume-now.com/sapp/uploads/2024/02/resume-template-paralegals.svg",
//     description: "Visual-focused template for designers and artists",
//     tags: ["Creative", "Portfolio"],
//     wordDocPath: "/templates/creative_portfolio.docx"
//   }
// ];

// const ResumeTemplatesGallery = ({ setFilePaths, setFileInfo, setSelectedTemplateId }) => {
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);

//   // Function to handle template download
//   const handleDownload = (template) => {
//     const link = document.createElement("a");
//     link.href = `${process.env.PUBLIC_URL || ''}${template.wordDocPath}`; 
//     link.setAttribute("download", `${template.title.replace(/\s+/g, "_").toLowerCase()}_template.docx`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };
  
//   // Function to handle template preview
//   const handlePreview = (template) => {
//     const previewUrl = `${process.env.PUBLIC_URL || ''}${template.wordDocPath}`;
//     window.open(previewUrl, "_blank");
//   };

//   // Function to handle template selection and upload to backend
//   const handleUploadTemplate = async (template) => {
//     setUploading(true);
//     setUploadSuccess(false);
    
//     try {
//       // Fetch the template file from public folder
//       const response = await fetch(`${process.env.PUBLIC_URL || ''}${template.wordDocPath}`);
//       const blob = await response.blob();
      
//       // Create a File object from the blob
//       const file = new File([blob], `${template.title.replace(/\s+/g, "_").toLowerCase()}_template.docx`, {
//         type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//       });
      
//       // Create FormData to send to backend
//       const formData = new FormData();
//       formData.append('file', file);
      
//       // Send to backend API
//       const uploadResponse = await fetch('http://localhost:8000/upload/resume', {
//         method: 'POST',
//         body: formData
//       });
      
//       const data = await uploadResponse.json();
      
//       if (uploadResponse.ok) {
//         // Save the file path AND the template_id to use for generation
//         setFilePaths(prev => ({ ...prev, template: data.file_path }));
//         setFileInfo(prev => ({
//           ...prev,
//           template: `Template uploaded: ${data.filename}. Style: ${template.title}.`
//         }));
        
//         // Set the template_id to be used during generation
//         if (setSelectedTemplateId) {
//           setSelectedTemplateId(template.template_id || template.id);
//         }
        
//         setUploadSuccess(true);
//         message.success(`Template "${template.title}" uploaded successfully!`);
//       } else {
//         message.error('Error: ' + data.detail);
//       }
//     } catch (error) {
//       console.error('Error uploading template:', error);
//       message.error('Failed to upload template. Please try again.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   // CSS styles for the component
//   const styles = {
//     cardContainer: {
//       marginBottom: '30px',
//     },
//     flipCard: {
//         perspective: '1000px',
//         width: '100%',  // Ensure it fills the column
//         height: '400px', // Adjust height as needed
//       },
//     card: {
//       position: 'relative',
//       width: '100%',
//       height: '100%',
//       transition: 'transform 0.6s',
//       transformStyle: 'preserve-3d',
//     },
//     cardFlipped: {
//       transform: 'rotateY(180deg)',
//     },
//     cardFront: {
//       position: 'absolute',
//       width: '100%',
//       height: '100%',
//       backfaceVisibility: 'hidden',
//     },
//     tickMark: {
//         position: 'absolute',
//         top: '10px',
//         left: '10px',
//         backgroundColor: '#28a745',  // Green tick
//         color: 'white',
//         fontSize: '18px',
//         fontWeight: 'bold',
//         padding: '5px 10px',
//         borderRadius: '50%',
//         zIndex: 2
//       },
//     cardBack: {
      
//       width: '100%',
//       height: '100%',
//       backfaceVisibility: 'hidden',
//       transform: 'rotateY(180deg)',
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: '20px',
//       backgroundColor: '#f8f9fa',
//       borderRadius: '0.25rem',
//       boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
//     },
//     buttonContainer: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '15px',
//       width: '80%',
//     },
//     button: {
//       padding: '5px 15px',
//     //   width:"10%"
//     },
//     imageContainer: {
//       height: '320px',
//       overflow: 'hidden',
//     },
//     image: {
//       height: '100%',
//       width: '100%',
//       objectFit: 'cover',
//     },
//     modalImage: {
//       width: '100%',
//       maxHeight: '500px',
//       objectFit: 'contain',
//     }
//   };

//   return (
//     <Container className="py-4">
//       <Title level={2} className="text-center mb-4">Resume Templates</Title>
      
//       <Row className="g-4">
//   {resumeTemplates.map((template) => (
//     <Col key={template.id} xs={12} sm={6} md={4} style={styles.cardContainer}>
//       <div
//         style={styles.flipCard}
//         onMouseEnter={() => setHoveredCard(template.id)}
//         onMouseLeave={() => setHoveredCard(null)}
//       >
//         {/* Tick mark for selected template */}
//         {selectedTemplate?.id === template.id && (
//           <div style={styles.tickMark}>
//             ✔
//           </div>
//         )}
        
//         <div style={{
//           ...styles.card,
//           ...(hoveredCard === template.id ? styles.cardFlipped : {})
//         }}>
//           {/* Front of card */}
//           <div style={styles.cardFront}>
//             <Card className="h-100 shadow-sm">
//               <div style={styles.imageContainer}>
//                 <Card.Img 
//                   variant="top" 
//                   src={template.photoUrl} 
//                   style={styles.image}
//                 />
//               </div>
//               <Card.Body className="d-flex flex-column">
//                 <Card.Title>{template.title}</Card.Title>
//                 <Card.Text className="text-muted mb-2">{template.description}</Card.Text>
//                 <div className="mb-3">
//                   {template.tags.map((tag) => (
//                     <Tag key={tag} color="blue" className="me-1 mb-1">{tag}</Tag>
//                   ))}
//                 </div>
//               </Card.Body>
//             </Card>
//           </div>
          
//           {/* Back of card */}
//           <div style={styles.cardBack}>
//             <div style={styles.buttonContainer}>
//               <Button 
//                 variant="outline-primary" 
//                 style={styles.button}
//                 onClick={() => setSelectedTemplate(template)}
//               >
//                 <EyeOutlined className="me-2" /> Preview Template
//               </Button>
//               <Button 
//                 variant="primary"
//                 style={styles.button}
//                 onClick={() => handleDownload(template)}
//               >
//                 <DownloadOutlined className="me-2" /> Download Template
//               </Button>
//               <Button 
//                 variant="success"
//                 style={styles.button}
//                 onClick={() => handleUploadTemplate(template)}
//               >
//                 <UploadOutlined className="me-2" /> Use This Template
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Col>
//   ))}
// </Row>


//       {/* Preview Modal */}
//       {selectedTemplate && (
//         <Modal show={!!selectedTemplate} onHide={() => setSelectedTemplate(null)} centered size="lg">
//           <Modal.Header closeButton>
//             <Modal.Title>{selectedTemplate.title} <span style={{ fontSize: "1.2rem", color: "#007bff" }}>§</span></Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <img 
//               src={selectedTemplate.photoUrl} 
//               alt={selectedTemplate.title} 
//               className="img-fluid mb-3 rounded" 
//               style={styles.modalImage}
//             />
//             <Text>{selectedTemplate.description}</Text>
//             <div className="mt-3">
//               {selectedTemplate.tags.map((tag) => (
//                 <Tag key={tag} color="blue" className="me-2 mb-2">{tag}</Tag>
//               ))}
//             </div>
//           </Modal.Body>
//           <Modal.Footer className="d-flex justify-content-center">
//   <Button 
//     variant="secondary" 
//     className="w-50 text-center" 
//     onClick={() => setSelectedTemplate(null)}
//   >
//     <CloseOutlined className="me-2" /> Close
//   </Button>
//   <Button 
//     variant="primary" 
//     className="w-50 text-center" 
//     onClick={() => handleDownload(selectedTemplate)}
//   >
//     <DownloadOutlined className="me-2" /> Download
//   </Button>
//             <Button 
//               variant="success" 
//               onClick={() => handleUploadTemplate(selectedTemplate)}
//               disabled={uploading}
//               className="w-50 text-center" 
//             >
//               {uploading ? (
//                 <>
//                   <Spinner
//                     as="span"
//                     animation="border"
//                     size="sm"
//                     role="status"
//                     aria-hidden="true"
//                     className="me-2"
//                   />
//                   Uploading...
//                 </>
//               ) : uploadSuccess ? (
//                 <>
//                   <CheckCircleOutlined className="me-2" /> Template Uploaded
//                 </>
//               ) : (
//                 <>
//                   <UploadOutlined className="me-2" /> Use This Template
//                 </>
//               )}
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       )}
//     </Container>
//   );
// };

// export default ResumeTemplatesGallery;




// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Button, Modal, Spinner } from 'react-bootstrap';
// import { DownloadOutlined, EyeOutlined, CloseOutlined, UploadOutlined, CheckCircleOutlined } from '@ant-design/icons';
// import { Tag, Typography, message } from 'antd';

// const { Title, Text } = Typography;

// // Resume template data with local file paths and template_id mapping
// const resumeTemplates = [
//   {
//     id: 1,
//     template_id: 1, // Standard template
//     title: "Professional Classic",
//     photoUrl: "https://d.novoresume.com/images/doc/skill-based-resume-template.png",
//     description: "Clean and elegant design for corporate professionals",
//     tags: ["Corporate", "Traditional"],
//     wordDocPath: "/templates/sample output.docx"
//   },
//   {
//     id: 2,
//     template_id: 2, // Professional template 
//     title: "Modern Minimalist",
//     photoUrl: "https://cdn.enhancv.com/images/648/i/aHR0cHM6Ly9jZG4uZW5oYW5jdi5jb20vcHJlZGVmaW5lZC1leGFtcGxlcy9ZeXd6OVBpQWhBa29zVGlFN0F3ZnZOUHlQbk9zOGJTOHpETlA2cVF2L2ltYWdlLnBuZw~~.png",
//     description: "Sleek, simple design for creative industries",
//     tags: ["Creative", "Minimalist"],
//     wordDocPath: "/templates/sample output.docx",
//     FileType: ".pdf"
//   },
//   {
//     id: 3,
//     template_id: 3, // Modern Blue template
//     title: "Tech Innovator",
//     photoUrl: "https://cdn-blog.novoresume.com/articles/resume-formats/Reverse-Chronological-Resume-Format.png",
//     description: "Dynamic layout for tech and startup professionals",
//     tags: ["Tech", "Startup"],
//     wordDocPath: "/templates/tech_innovator.docx"
//   },
//   // Other templates can go here...
// ];

// const ResumeTemplatesGallery = ({ setFilePaths, setFileInfo, setSelectedTemplateId }) => {
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [selectedCards, setSelectedCards] = useState({});

//   // Function to handle template download
//   const handleDownload = (template) => {
//     const link = document.createElement("a");
//     link.href = `${process.env.PUBLIC_URL || ''}${template.wordDocPath}`; 
//     link.setAttribute("download", `${template.title.replace(/\s+/g, "_").toLowerCase()}_template.docx`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };
  
//   // Function to handle template preview
//   const handlePreview = (template) => {
//     setSelectedTemplate(template);
//   };

//   // Function to handle template selection and upload to backend
//   const handleUploadTemplate = async (template) => {
//     setUploading(true);
//     setUploadSuccess(false);
    
//     try {
//       // Fetch the template file from public folder
//       const response = await fetch(`${process.env.PUBLIC_URL || ''}${template.wordDocPath}`);
//       const blob = await response.blob();
      
//       // Create a File object from the blob
//       const file = new File([blob], `${template.title.replace(/\s+/g, "_").toLowerCase()}_template.docx`, {
//         type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//       });
      
//       // Create FormData to send to backend
//       const formData = new FormData();
//       formData.append('file', file);
      
//       // Send to backend API
//       const uploadResponse = await fetch('http://localhost:8000/upload/resume', {
//         method: 'POST',
//         body: formData
//       });
      
//       const data = await uploadResponse.json();
      
//       if (uploadResponse.ok) {
//         // Mark this template as selected
//         setSelectedCards((prev) => {
//           // Create a new object with all values set to false
//           const newSelected = Object.keys(prev).reduce((obj, key) => {
//             obj[key] = false;
//             return obj;
//           }, {});
          
//           // Set only the current template to true
//           newSelected[template.id] = true;
//           return newSelected;
//         });
        
//         // Save the file path AND the template_id to use for generation
//         setFilePaths(prev => ({ ...prev, template: data.file_path }));
//         setFileInfo(prev => ({
//           ...prev,
//           template: `Template uploaded: ${data.filename}. Style: ${template.title}.`
//         }));
        
//         // Set the template_id to be used during generation
//         if (setSelectedTemplateId) {
//           // Use the template's specific template_id, or fall back to its id
//           const templateIdToUse = template.template_id || template.id;
//           console.log(`Setting template ID to: ${templateIdToUse}`);
//           setSelectedTemplateId(templateIdToUse);
//         }
        
//         setUploadSuccess(true);
//         message.success(`Template "${template.title}" uploaded successfully!`);
//       } else {
//         message.error('Error: ' + data.detail);
//       }
//     } catch (error) {
//       console.error('Error uploading template:', error);
//       message.error('Failed to upload template. Please try again.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   // CSS styles for the component
//   const styles = {
//     cardContainer: {
//       marginBottom: '30px',
//     },
//     flipCard: {
//       perspective: '1000px',
//       width: '100%',  // Ensure it fills the column
//       height: '400px', // Adjust height as needed
//     },
//     card: {
//       position: 'relative',
//       width: '100%',
//       height: '100%',
//       transition: 'transform 0.6s',
//       transformStyle: 'preserve-3d',
//     },
//     cardFlipped: {
//       transform: 'rotateY(180deg)',
//     },
//     cardFront: {
//       position: 'absolute',
//       width: '100%',
//       height: '100%',
//       backfaceVisibility: 'hidden',
//     },
//     tickMark: {
//       position: 'absolute',
//       top: '10px',
//       left: '10px',
//       backgroundColor: '#28a745',  // Green tick
//       color: 'white',
//       fontSize: '18px',
//       fontWeight: 'bold',
//       padding: '5px 10px',
//       borderRadius: '50%',
//       zIndex: 2
//     },
//     cardBack: {
//       width: '100%',
//       height: '100%',
//       backfaceVisibility: 'hidden',
//       transform: 'rotateY(180deg)',
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: '20px',
//       backgroundColor: '#f8f9fa',
//       borderRadius: '0.25rem',
//       boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
//     },
//     buttonContainer: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '15px',
//       width: '80%',
//     },
//     button: {
//       padding: '5px 15px',
//     },
//     imageContainer: {
//       height: '320px',
//       overflow: 'hidden',
//     },
//     image: {
//       height: '100%',
//       width: '100%',
//       objectFit: 'cover',
//     },
//     modalImage: {
//       width: '100%',
//       maxHeight: '500px',
//       objectFit: 'contain',
//     }
//   };

//   return (
//     <Container className="py-4">
//       <Title level={2} className="text-center mb-4">Resume Templates</Title>
      
//       <Row className="g-4">
//         {resumeTemplates.map((template) => (
//           <Col key={template.id} xs={12} sm={6} md={4} style={styles.cardContainer}>
//             <div
//               style={styles.flipCard}
//               onMouseEnter={() => setHoveredCard(template.id)}
//               onMouseLeave={() => setHoveredCard(null)}
//             >
//               {/* Tick mark for selected template */}
//               {selectedCards[template.id] && (
//                 <div style={styles.tickMark}>
//                   ✔
//                 </div>
//               )}
              
//               <div style={{
//                 ...styles.card,
//                 ...(hoveredCard === template.id ? styles.cardFlipped : {})
//               }}>
//                 {/* Front of card */}
//                 <div style={styles.cardFront}>
//                   <Card className={`h-100 shadow-sm ${selectedCards[template.id] ? 'border-success' : ''}`}>
//                     <div style={styles.imageContainer}>
//                       <Card.Img 
//                         variant="top" 
//                         src={template.photoUrl} 
//                         style={styles.image}
//                       />
//                     </div>
//                     <Card.Body className="d-flex flex-column">
//                       <Card.Title>{template.title}</Card.Title>
//                       <Card.Text className="text-muted mb-2">{template.description}</Card.Text>
//                       <div className="mb-3">
//                         {template.tags.map((tag) => (
//                           <Tag key={tag} color="blue" className="me-1 mb-1">{tag}</Tag>
//                         ))}
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </div>
                
//                 {/* Back of card */}
//                 <div style={styles.cardBack}>
//                   <div style={styles.buttonContainer}>
//                     <Button 
//                       variant="outline-primary" 
//                       style={styles.button}
//                       onClick={() => handlePreview(template)}
//                     >
//                       <EyeOutlined className="me-2" /> Preview Template
//                     </Button>
//                     <Button 
//                       variant="primary"
//                       style={styles.button}
//                       onClick={() => handleDownload(template)}
//                     >
//                       <DownloadOutlined className="me-2" /> Download Template
//                     </Button>
//                     <Button 
//                       variant={selectedCards[template.id] ? "success" : "primary"}
//                       style={styles.button}
//                       onClick={() => handleUploadTemplate(template)}
//                       disabled={uploading}
//                     >
//                       {uploading ? (
//                         <>
//                           <Spinner
//                             as="span"
//                             animation="border"
//                             size="sm"
//                             role="status"
//                             aria-hidden="true"
//                             className="me-2"
//                           />
//                           Uploading...
//                         </>
//                       ) : selectedCards[template.id] ? (
//                         <>
//                           <CheckCircleOutlined className="me-2" /> Selected
//                         </>
//                       ) : (
//                         <>
//                           <UploadOutlined className="me-2" /> Use This Template
//                         </>
//                       )}
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Col>
//         ))}
//       </Row>

//       {/* Preview Modal */}
//       {selectedTemplate && (
//         <Modal show={!!selectedTemplate} onHide={() => setSelectedTemplate(null)} centered size="lg">
//           <Modal.Header closeButton>
//             <Modal.Title>{selectedTemplate.title}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <img 
//               src={selectedTemplate.photoUrl} 
//               alt={selectedTemplate.title} 
//               className="img-fluid mb-3 rounded" 
//               style={styles.modalImage}
//             />
//             <Text>{selectedTemplate.description}</Text>
//             <div className="mt-3">
//               {selectedTemplate.tags.map((tag) => (
//                 <Tag key={tag} color="blue" className="me-2 mb-2">{tag}</Tag>
//               ))}
//             </div>
//           </Modal.Body>
//           <Modal.Footer className="d-flex justify-content-center">
//             <Button 
//               variant="secondary" 
//               className="w-50 text-center" 
//               onClick={() => setSelectedTemplate(null)}
//             >
//               <CloseOutlined className="me-2" /> Close
//             </Button>
//             <Button 
//               variant="primary" 
//               className="w-50 text-center" 
//               onClick={() => handleDownload(selectedTemplate)}
//             >
//               <DownloadOutlined className="me-2" /> Download
//             </Button>
//             <Button 
//               variant={selectedCards[selectedTemplate.id] ? "success" : "primary"}
//               onClick={() => handleUploadTemplate(selectedTemplate)}
//               disabled={uploading}
//               className="w-50 text-center"
//             >
//               {uploading ? (
//                 <>
//                   <Spinner
//                     as="span"
//                     animation="border"
//                     size="sm"
//                     role="status"
//                     aria-hidden="true"
//                     className="me-2"
//                   />
//                   Uploading...
//                 </>
//               ) : selectedCards[selectedTemplate.id] ? (
//                 <>
//                   <CheckCircleOutlined className="me-2" /> Selected
//                 </>
//               ) : (
//                 <>
//                   <UploadOutlined className="me-2" /> Use This Template
//                 </>
//               )}
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       )}
//     </Container>
//   );
// };

// export default ResumeTemplatesGallery;



import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Spinner } from 'react-bootstrap';
import { DownloadOutlined, EyeOutlined, CloseOutlined, UploadOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Tag, Typography, message } from 'antd';

const { Title, Text } = Typography;

// Resume template data with local file paths and template_id mapping
const resumeTemplates = [
  {
    id: 1,
    template_id: 1, // Standard template
    title: "Professional Classic",
    photoUrl: "https://d.novoresume.com/images/doc/skill-based-resume-template.png",
    description: "Clean and elegant design for corporate professionals",
    tags: ["Corporate", "Traditional"],
    wordDocPath: "/templates/sample output.docx"
  },
  {
    id: 2,
    template_id: 2, // Professional template 
    title: "Modern Minimalist",
    photoUrl: "https://cdn.enhancv.com/images/648/i/aHR0cHM6Ly9jZG4uZW5oYW5jdi5jb20vcHJlZGVmaW5lZC1leGFtcGxlcy9ZeXd6OVBpQWhBa29zVGlFN0F3ZnZOUHlQbk9zOGJTOHpETlA2cVF2L2ltYWdlLnBuZw~~.png",
    description: "Sleek, simple design for creative industries",
    tags: ["Creative", "Minimalist"],
    wordDocPath: "/templates/sample output.docx",
    FileType: ".pdf"
  },
  {
    id: 3,
    template_id: 3, // Modern Blue template
    title: "Tech Innovator",
    photoUrl: "https://cdn-blog.novoresume.com/articles/resume-formats/Reverse-Chronological-Resume-Format.png",
    description: "Dynamic layout for tech and startup professionals",
    tags: ["Tech", "Startup"],
    wordDocPath: "/templates/tech_innovator.docx"
  },
  // New Creative Portfolio template
  {
    id: 4,
    template_id: 4, // Creative Portfolio template
    title: "Creative Portfolio",
    photoUrl: "https://www.resume-now.com/sapp/uploads/2024/02/resume-template-paralegals.svg",
    description: "Colorful template with visual emphasis for creative professionals",
    tags: ["Creative", "Portfolio", "Colorful"],
    wordDocPath: "/templates/creative_portfolio.docx"
  },
  // Other templates...
  {
    id: 5,
    template_id: 1, // Using standard template
    title: "Academic Scholar",
    photoUrl: "https://www.resume-now.com/sapp/uploads/2024/02/resume-template-paralegals.svg",
    description: "Refined template for academic and research positions",
    tags: ["Academic", "Research"],
    wordDocPath: "/templates/academic_scholar.docx"
  },
  {
    id: 6,
    template_id: 2, // Using professional template
    title: "Executive Profile",
    photoUrl: "https://cdn-blog.novoresume.com/articles/resume-formats/Reverse-Chronological-Resume-Format.png",
    description: "Sophisticated design for senior management and executives",
    tags: ["Executive", "Leadership"],
    wordDocPath: "/templates/executive_profile.docx"
  }
];

const ResumeTemplatesGallery = ({ setFilePaths, setFileInfo, setSelectedTemplateId }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedCards, setSelectedCards] = useState({});

  // Function to handle template download
  const handleDownload = (template) => {
    const link = document.createElement("a");
    link.href = `${process.env.PUBLIC_URL || ''}${template.wordDocPath}`; 
    link.setAttribute("download", `${template.title.replace(/\s+/g, "_").toLowerCase()}_template.docx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Function to handle template preview
  const handlePreview = (template) => {
    setSelectedTemplate(template);
  };

  // Function to handle template selection and upload to backend
  const handleUploadTemplate = async (template) => {
    setUploading(true);
    setUploadSuccess(false);
    
    try {
      // Fetch the template file from public folder
      const response = await fetch(`${process.env.PUBLIC_URL || ''}${template.wordDocPath}`);
      const blob = await response.blob();
      
      // Create a File object from the blob
      const file = new File([blob], `${template.title.replace(/\s+/g, "_").toLowerCase()}_template.docx`, {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });
      
      // Create FormData to send to backend
      const formData = new FormData();
      formData.append('file', file);
      
      // Send to backend API
      const uploadResponse = await fetch('http://localhost:8000/upload/resume', {
        method: 'POST',
        body: formData
      });
      
      const data = await uploadResponse.json();
      
      if (uploadResponse.ok) {
        // Mark this template as selected
        setSelectedCards((prev) => {
          // Create a new object with all values set to false
          const newSelected = Object.keys(prev).reduce((obj, key) => {
            obj[key] = false;
            return obj;
          }, {});
          
          // Set only the current template to true
          newSelected[template.id] = true;
          return newSelected;
        });
        
        // Save the file path AND the template_id to use for generation
        setFilePaths(prev => ({ ...prev, template: data.file_path }));
        setFileInfo(prev => ({
          ...prev,
          template: `Template uploaded: ${data.filename}. Style: ${template.title}.`
        }));
        
        // Set the template_id to be used during generation
        if (setSelectedTemplateId) {
          // Use the template's specific template_id, or fall back to its id
          const templateIdToUse = template.template_id || template.id;
          console.log(`Setting template ID to: ${templateIdToUse}`);
          setSelectedTemplateId(templateIdToUse);
        }
        
        setUploadSuccess(true);
        message.success(`Template "${template.title}" uploaded successfully!`);
      } else {
        message.error('Error: ' + data.detail);
      }
    } catch (error) {
      console.error('Error uploading template:', error);
      message.error('Failed to upload template. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // CSS styles for the component
  const styles = {
    cardContainer: {
      marginBottom: '30px',
    },
    flipCard: {
      perspective: '1000px',
      width: '100%',  // Ensure it fills the column
      height: '400px', // Adjust height as needed
    },
    card: {
      position: 'relative',
      width: '100%',
      height: '100%',
      transition: 'transform 0.6s',
      transformStyle: 'preserve-3d',
    },
    cardFlipped: {
      transform: 'rotateY(180deg)',
    },
    cardFront: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
    },
    tickMark: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      backgroundColor: '#28a745',  // Green tick
      color: 'white',
      fontSize: '18px',
      fontWeight: 'bold',
      padding: '5px 10px',
      borderRadius: '50%',
      zIndex: 2
    },
    cardBack: {
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      transform: 'rotateY(180deg)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '0.25rem',
      boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      width: '80%',
    },
    button: {
      padding: '5px 15px',
    },
    imageContainer: {
      height: '320px',
      overflow: 'hidden',
    },
    image: {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
    modalImage: {
      width: '100%',
      maxHeight: '500px',
      objectFit: 'contain',
    }
  };

  return (
    <Container className="py-4">
      <Title level={2} className="text-center mb-4">Resume Templates</Title>
      
      <Row className="g-4">
        {resumeTemplates.map((template) => (
          <Col key={template.id} xs={12} sm={6} md={4} style={styles.cardContainer}>
            <div
              style={styles.flipCard}
              onMouseEnter={() => setHoveredCard(template.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Tick mark for selected template */}
              {selectedCards[template.id] && (
                <div style={styles.tickMark}>
                  ✔
                </div>
              )}
              
              <div style={{
                ...styles.card,
                ...(hoveredCard === template.id ? styles.cardFlipped : {})
              }}>
                {/* Front of card */}
                <div style={styles.cardFront}>
                  <Card className={`h-100 shadow-sm ${selectedCards[template.id] ? 'border-success' : ''}`}>
                    <div style={styles.imageContainer}>
                      <Card.Img 
                        variant="top" 
                        src={template.photoUrl} 
                        style={styles.image}
                        />
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{template.title}</Card.Title>
                      <Card.Text className="text-muted mb-2">{template.description}</Card.Text>
                      <div className="mb-3">
                        {template.tags.map((tag) => (
                          <Tag key={tag} color="blue" className="me-1 mb-1">{tag}</Tag>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </div>
                
                {/* Back of card */}
                <div style={styles.cardBack}>
                  <div style={styles.buttonContainer}>
                    <Button 
                      variant="outline-primary" 
                      style={styles.button}
                      onClick={() => handlePreview(template)}
                    >
                      <EyeOutlined className="me-2" /> Preview Template
                    </Button>
                    <Button 
                      variant="primary"
                      style={styles.button}
                      onClick={() => handleDownload(template)}
                    >
                      <DownloadOutlined className="me-2" /> Download Template
                    </Button>
                    <Button 
                      variant={selectedCards[template.id] ? "success" : "primary"}
                      style={styles.button}
                      onClick={() => handleUploadTemplate(template)}
                      disabled={uploading}
                    >
                      {uploading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Uploading...
                        </>
                      ) : selectedCards[template.id] ? (
                        <>
                          <CheckCircleOutlined className="me-2" /> Selected
                        </>
                      ) : (
                        <>
                          <UploadOutlined className="me-2" /> Use This Template
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Preview Modal */}
      {selectedTemplate && (
        <Modal show={!!selectedTemplate} onHide={() => setSelectedTemplate(null)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedTemplate.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img 
              src={selectedTemplate.photoUrl} 
              alt={selectedTemplate.title} 
              className="img-fluid mb-3 rounded" 
              style={styles.modalImage}
            />
            <Text>{selectedTemplate.description}</Text>
            <div className="mt-3">
              {selectedTemplate.tags.map((tag) => (
                <Tag key={tag} color="blue" className="me-2 mb-2">{tag}</Tag>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button 
              variant="secondary" 
              className="w-50 text-center" 
              onClick={() => setSelectedTemplate(null)}
            >
              <CloseOutlined className="me-2" /> Close
            </Button>
            <Button 
              variant="primary" 
              className="w-50 text-center" 
              onClick={() => handleDownload(selectedTemplate)}
            >
              <DownloadOutlined className="me-2" /> Download
            </Button>
            <Button 
              variant={selectedCards[selectedTemplate.id] ? "success" : "primary"}
              onClick={() => handleUploadTemplate(selectedTemplate)}
              disabled={uploading}
              className="w-50 text-center"
            >
              {uploading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Uploading...
                </>
              ) : selectedCards[selectedTemplate.id] ? (
                <>
                  <CheckCircleOutlined className="me-2" /> Selected
                </>
              ) : (
                <>
                  <UploadOutlined className="me-2" /> Use This Template
                </>
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default ResumeTemplatesGallery;