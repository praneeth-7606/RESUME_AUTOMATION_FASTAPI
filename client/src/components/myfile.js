// import React, { useState } from 'react';
// import { 
//   Container, 
//   Grid, 
//   Card, 
//   CardMedia, 
//   CardContent, 
//   Typography, 
//   Button, 
//   Chip, 
//   Modal, 
//   Box 
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { Download, Visibility } from '@mui/icons-material';

// // Sample resume template data
// const resumeTemplates = [
//   {
//     id: 1,
//     title: "Professional Classic",
//     photoUrl: "/api/placeholder/300/400",
//     description: "Clean and elegant design for corporate professionals",
//     tags: ["Corporate", "Traditional"]
//   },
//   {
//     id: 2,
//     title: "Modern Minimalist",
//     photoUrl: "/api/placeholder/300/400",
//     description: "Sleek, simple design for creative industries",
//     tags: ["Creative", "Minimalist"]
//   },
//   {
//     id: 3,
//     title: "Tech Innovator",
//     photoUrl: "/api/placeholder/300/400",
//     description: "Dynamic layout for tech and startup professionals",
//     tags: ["Tech", "Startup"]
//   },
//   {
//     id: 4,
//     title: "Academic Scholar",
//     photoUrl: "/api/placeholder/300/400",
//     description: "Refined template for academic and research positions",
//     tags: ["Academic", "Research"]
//   }
// ];

// // Styled components
// const StyledCard = styled(Card)(({ theme }) => ({
//   transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
//   '&:hover': {
//     transform: 'scale(1.03)',
//     boxShadow: theme.shadows[8]
//   }
// }));

// const ModalBox = styled(Box)(({ theme }) => ({
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   backgroundColor: theme.palette.background.paper,
//   border: '2px solid #000',
//   boxShadow: theme.shadows[24],
//   padding: theme.spacing(4),
//   borderRadius: theme.spacing(2)
// }));

// const ResumeTemplatesGallery = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState(null);

//   const handleTemplateSelect = (template) => {
//     setSelectedTemplate(template);
//   };

//   const handleCloseModal = () => {
//     setSelectedTemplate(null);
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography 
//         variant="h3" 
//         component="h1" 
//         gutterBottom 
//         align="center" 
//         sx={{ mb: 4 }}
//       >
//         Resume Templates
//       </Typography>

//       <Grid container spacing={3}>
//         {resumeTemplates.map((template) => (
//           <Grid item xs={12} sm={6} md={3} key={template.id}>
//             <StyledCard>
//               <CardMedia
//                 component="img"
//                 height="250"
//                 image={template.photoUrl}
//                 alt={template.title}
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   {template.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                   {template.description}
//                 </Typography>
                
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
//                   {template.tags.map((tag) => (
//                     <Chip 
//                       key={tag} 
//                       label={tag} 
//                       size="small" 
//                       color="primary" 
//                       variant="outlined" 
//                     />
//                   ))}
//                 </Box>

//                 <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <Button 
//                     variant="outlined" 
//                     startIcon={<Visibility />}
//                     onClick={() => handleTemplateSelect(template)}
//                   >
//                     Preview
//                   </Button>
//                   <Button 
//                     variant="contained" 
//                     startIcon={<Download />}
//                   >
//                     Download
//                   </Button>
//                 </Box>
//               </CardContent>
//             </StyledCard>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Template Details Modal */}
//       <Modal
//         open={!!selectedTemplate}
//         onClose={handleCloseModal}
//         aria-labelledby="template-modal-title"
//         aria-describedby="template-modal-description"
//       >
//         <ModalBox>
//           {selectedTemplate && (
//             <>
//               <CardMedia
//                 component="img"
//                 height="400"
//                 image={selectedTemplate.photoUrl}
//                 alt={selectedTemplate.title}
//                 sx={{ mb: 3, borderRadius: 2 }}
//               />
//               <Typography id="template-modal-title" variant="h6" component="h2">
//                 {selectedTemplate.title}
//               </Typography>
//               <Typography id="template-modal-description" sx={{ mt: 2 }}>
//                 {selectedTemplate.description}
//               </Typography>
//               <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
//                 <Button 
//                   onClick={handleCloseModal} 
//                   variant="outlined" 
//                   sx={{ mr: 2 }}
//                 >
//                   Close
//                 </Button>
//                 <Button variant="contained" startIcon={<Download />}>
//                   Download Template
//                 </Button>
//               </Box>
//             </>
//           )}
//         </ModalBox>
//       </Modal>
//     </Container>
//   );
// };

// export default ResumeTemplatesGallery;



// import React, { useState } from 'react';
// import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
// import { 
//   DownloadOutlined, 
//   EyeOutlined, 
//   CloseOutlined 
// } from '@ant-design/icons';
// import { Tag, Typography } from 'antd';

// const { Title, Text } = Typography;

// // Sample resume template data
// const resumeTemplates = [
//   {
//     id: 1,
//     title: "Professional Classic",
//     photoUrl: "https://d.novoresume.com/images/doc/skill-based-resume-template.png",
//     description: "Clean and elegant design for corporate professionals",
//     tags: ["Corporate", "Traditional"]
//   },
//   {
//     id: 2,
//     title: "Modern Minimalist",
//     photoUrl: "https://cdn.enhancv.com/images/648/i/aHR0cHM6Ly9jZG4uZW5oYW5jdi5jb20vcHJlZGVmaW5lZC1leGFtcGxlcy9ZeXd6OVBpQWhBa29zVGlFN0F3ZnZOUHlQbk9zOGJTOHpETlA2cVF2L2ltYWdlLnBuZw~~.png",
//     description: "Sleek, simple design for creative industries",
//     tags: ["Creative", "Minimalist"]
//   },
//   {
//     id: 3,
//     title: "Tech Innovator",
//     photoUrl: "https://cdn-blog.novoresume.com/articles/resume-formats/Reverse-Chronological-Resume-Format.png",
//     description: "Dynamic layout for tech and startup professionals",
//     tags: ["Tech", "Startup"]
//   },
//   {
//     id: 4,
//     title: "Academic Scholar",
//     photoUrl: "https://www.resume-now.com/sapp/uploads/2024/02/resume-template-paralegals.svg",
//     description: "Refined template for academic and research positions",
//     tags: ["Academic", "Research"]
//   }
// ];

// const ResumeTemplatesGallery = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState(null);

//   const handleTemplateSelect = (template) => {
//     setSelectedTemplate(template);
//   };

//   const handleCloseModal = () => {
//     setSelectedTemplate(null);
//   };

//   return (
//     <Container className="py-4">
//       <Title level={2} className="text-center mb-4">
//         Resume Templates
//       </Title>

//       <Row>
//         {resumeTemplates.map((template) => (
//           <Col key={template.id} xs={12} sm={6} md={3} className="mb-4">
//             <Card className="h-100 shadow-sm hover-lift">
//               <Card.Img 
//                 variant="top" 
//                 src={template.photoUrl} 
//                 className="card-img-top" 
//                 style={{ height: '250px', objectFit: 'cover' }}
//               />
//               <Card.Body className="d-flex flex-column">
//                 <Card.Title>{template.title}</Card.Title>
//                 <Card.Text className="text-muted mb-2">
//                   {template.description}
//                 </Card.Text>

//                 <div className="mb-3">
//                   {template.tags.map((tag) => (
//                     <Tag key={tag} color="blue" className="mb-1">
//                       {tag}
//                     </Tag>
//                   ))}
//                 </div>

//                 <div className="mt-auto d-flex justify-content-between">
//                   <Button 
//                     variant="outline-primary" 
//                     onClick={() => handleTemplateSelect(template)}
//                   >
//                     <EyeOutlined className="mr-2" /> Preview
//                   </Button>
//                   <Button variant="primary">
//                     <DownloadOutlined className="mr-2" /> Download
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Template Details Modal */}
//       {selectedTemplate && (
//         <Modal 
//           show={!!selectedTemplate} 
//           onHide={handleCloseModal} 
//           centered
//           size="lg"
//         >
//           <Modal.Header closeButton>
//             <Modal.Title>{selectedTemplate.title}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <img 
//               src={selectedTemplate.photoUrl} 
//               alt={selectedTemplate.title} 
//               className="img-fluid mb-3 rounded" 
//             />
//             <Text>{selectedTemplate.description}</Text>
            
//             <div className="mt-3">
//               {selectedTemplate.tags.map((tag) => (
//                 <Tag key={tag} color="blue" className="mb-2">
//                   {tag}
//                 </Tag>
//               ))}
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleCloseModal}>
//               <CloseOutlined className="mr-2" /> Close
//             </Button>
//             <Button variant="primary">
//               <DownloadOutlined className="mr-2" /> Download Template
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       )}
//     </Container>
//   );
// };

// export default ResumeTemplatesGallery;






// v-3




// import React, { useState } from 'react';
// import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
// import { DownloadOutlined, EyeOutlined, CloseOutlined } from '@ant-design/icons';
// import { Tag, Typography } from 'antd';
// // import './ResumeTemplatesGallery.css'; // Import CSS for rotation effect

// const { Title, Text } = Typography;

// const resumeTemplates = [
//   {
//     id: 1,
//     title: "Professional Classic",
//     photoUrl: "https://d.novoresume.com/images/doc/skill-based-resume-template.png",
//     description: "Clean and elegant design for corporate professionals",
//     tags: ["Corporate", "Traditional"]
//   },
//   {
//     id: 2,
//     title: "Modern Minimalist",
//     photoUrl: "https://cdn.enhancv.com/images/648/i/aHR0cHM6Ly9jZG4uZW5oYW5jdi5jb20vcHJlZGVmaW5lZC1leGFtcGxlcy9ZeXd6OVBpQWhBa29zVGlFN0F3ZnZOUHlQbk9zOGJTOHpETlA2cVF2L2ltYWdlLnBuZw~~.png",
//     description: "Sleek, simple design for creative industries",
//     tags: ["Creative", "Minimalist"]
//   },
//   {
//     id: 3,
//     title: "Tech Innovator",
//     photoUrl: "https://cdn-blog.novoresume.com/articles/resume-formats/Reverse-Chronological-Resume-Format.png",
//     description: "Dynamic layout for tech and startup professionals",
//     tags: ["Tech", "Startup"]
//   },
//   {
//     id: 4,
//     title: "Academic Scholar",
//     photoUrl: "https://www.resume-now.com/sapp/uploads/2024/02/resume-template-paralegals.svg",
//     description: "Refined template for academic and research positions",
//     tags: ["Academic", "Research"]
//   },
//   {
//     id: 5,
//     title: "Academic Scholar",
//     photoUrl: "https://www.resume-now.com/sapp/uploads/2024/02/resume-template-paralegals.svg",
//     description: "Refined template for academic and research positions",
//     tags: ["Academic", "Research"]
//   },
//   {
//     id: 6,
//     title: "Academic Scholar",
//     photoUrl: "https://www.resume-now.com/sapp/uploads/2024/02/resume-template-paralegals.svg",
//     description: "Refined template for academic and research positions",
//     tags: ["Academic", "Research"]
//   }
// ];

// const ResumeTemplatesGallery = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [hoveredCard, setHoveredCard] = useState(null);

//   return (
//     <Container className="py-4">
//       <Title level={2} className="text-center mb-4">Resume Templates</Title>

//       <Row>
//         {resumeTemplates.map((template) => (
//           <Col key={template.id} xs={12} sm={4} md={4} gap={2} className="mb-4">
//             <div
//               className={`flip-card ${hoveredCard === template.id ? 'hover' : ''}`}
//               onMouseEnter={() => setHoveredCard(template.id)}
//               onMouseLeave={() => setHoveredCard(null)}
//             >
//               <Card className="h-100 shadow-sm">
//                 <Card.Img 
//                   variant="top" 
//                   src={template.photoUrl} 
//                   style={{ height: '250px', objectFit: 'cover' }}
//                 />
//                 <Card.Body className="d-flex flex-column">
//                   <Card.Title>{template.title}</Card.Title>
//                   <Card.Text className="text-muted mb-2">{template.description}</Card.Text>
//                   <div className="mb-3">
//                     {template.tags.map((tag) => (
//                       <Tag key={tag} color="blue" className="mb-1">{tag}</Tag>
//                     ))}
//                   </div>
//                   <div className="mt-auto d-flex justify-content-between">
//                     <Button variant="outline-primary" onClick={() => setSelectedTemplate(template)}>
//                       <EyeOutlined className="mr-2" /> Preview
//                     </Button>
//                     <Button variant="primary">
//                       <DownloadOutlined className="mr-2" /> Download
//                     </Button>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </div>
//           </Col>
//         ))}
//       </Row>

//       {selectedTemplate && (
//         <Modal show={!!selectedTemplate} onHide={() => setSelectedTemplate(null)} centered size="lg">
//           <Modal.Header closeButton>
//             <Modal.Title>{selectedTemplate.title}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <img src={selectedTemplate.photoUrl} alt={selectedTemplate.title} className="img-fluid mb-3 rounded" />
//             <Text>{selectedTemplate.description}</Text>
//             <div className="mt-3">
//               {selectedTemplate.tags.map((tag) => (
//                 <Tag key={tag} color="blue" className="mb-2">{tag}</Tag>
//               ))}
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setSelectedTemplate(null)}>
//               <CloseOutlined className="mr-2" /> Close
//             </Button>
//             <Button variant="primary">
//               <DownloadOutlined className="mr-2" /> Download Template
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       )}
//     </Container>
//   );
// };

// export default ResumeTemplatesGallery;

// good version not linked it with word documnts


// import React, { useState } from 'react';
// import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
// import { DownloadOutlined, EyeOutlined, CloseOutlined } from '@ant-design/icons';
// import { Tag, Typography } from 'antd';

// const { Title, Text } = Typography;

// const resumeTemplates = [
//   {
//     id: 1,
//     title: "Professional Classic",
//     photoUrl: "https://d.novoresume.com/images/doc/skill-based-resume-template.png",
//     description: "Clean and elegant design for corporate professionals",
//     tags: ["Corporate", "Traditional"]
//   },
//   {
//     id: 2,
//     title: "Modern Minimalist",
//     photoUrl: "https://cdn.enhancv.com/images/648/i/aHR0cHM6Ly9jZG4uZW5oYW5jdi5jb20vcHJlZGVmaW5lZC1leGFtcGxlcy9ZeXd6OVBpQWhBa29zVGlFN0F3ZnZOUHlQbk9zOGJTOHpETlA2cVF2L2ltYWdlLnBuZw~~.png",
//     description: "Sleek, simple design for creative industries",
//     tags: ["Creative", "Minimalist"]
//   },
//   {
//     id: 3,
//     title: "Tech Innovator",
//     photoUrl: "https://cdn-blog.novoresume.com/articles/resume-formats/Reverse-Chronological-Resume-Format.png",
//     description: "Dynamic layout for tech and startup professionals",
//     tags: ["Tech", "Startup"]
//   },
//   {
//     id: 4,
//     title: "Academic Scholar",
//     photoUrl: "https://www.resume-now.com/sapp/uploads/2024/02/resume-template-paralegals.svg",
//     description: "Refined template for academic and research positions",
//     tags: ["Academic", "Research"]
//   },
//   {
//     id: 5,
//     title: "Executive Profile",
//     photoUrl: "https://www.resume-now.com/sapp/uploads/2024/02/resume-template-paralegals.svg",
//     description: "Sophisticated design for senior management and executives",
//     tags: ["Executive", "Leadership"]
//   },
//   {
//     id: 6,
//     title: "Creative Portfolio",
//     photoUrl: "https://www.resume-now.com/sapp/uploads/2024/02/resume-template-paralegals.svg",
//     description: "Visual-focused template for designers and artists",
//     tags: ["Creative", "Portfolio"]
//   }
// ];

// const ResumeTemplatesGallery = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [hoveredCard, setHoveredCard] = useState(null);

//   // CSS styles for the component
//   const styles = {
//     cardContainer: {
//       marginBottom: '30px', // Add vertical gap between cards
//     },
//     flipCard: {
//       perspective: '1000px',
//       height: '480px', // Increased height to accommodate larger image
//       width: '100%',
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
//     cardBack: {
//       position: 'absolute',
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
//       padding: '10px 15px',
//     },
//     imageContainer: {
//       height: '320px', // Increased from 250px to 320px
//       overflow: 'hidden',
//     },
//     image: {
//       height: '100%',
//       width: '100%',
//       objectFit: 'cover',
//     },
//     modalImage: {
//       width: '100%',
//       maxHeight: '500px', // Also increased the modal image size
//       objectFit: 'contain',
//     }
//   };

//   return (
//     <Container className="py-4">
//       <Title level={2} className="text-center mb-4">Resume Templates</Title>

//       <Row className="g-5">
//         {resumeTemplates.map((template) => (
//           <Col key={template.id} xs={12} sm={6} md={4} style={styles.cardContainer}>
//             <div
//               style={styles.flipCard}
//               onMouseEnter={() => setHoveredCard(template.id)}
//               onMouseLeave={() => setHoveredCard(null)}
//             >
//               <div style={{
//                 ...styles.card,
//                 ...(hoveredCard === template.id ? styles.cardFlipped : {})
//               }}>
//                 {/* Front of card */}
//                 <div style={styles.cardFront}>
//                   <Card className="h-100 shadow-sm">
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
                
//                 {/* Back of card - only shows buttons */}
//                 <div style={styles.cardBack}>
//                   <div style={styles.buttonContainer}>
//                     <Button 
//                       variant="outline-primary" 
//                       style={styles.button}
//                       onClick={() => setSelectedTemplate(template)}
//                     >
//                       <EyeOutlined className="me-2" /> Preview Template
//                     </Button>
//                     <Button 
//                       variant="primary"
//                       style={styles.button}
//                     >
//                       <DownloadOutlined className="me-2" /> Download Template
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
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setSelectedTemplate(null)}>
//               <CloseOutlined className="me-2" /> Close
//             </Button>
//             <Button variant="primary">
//               <DownloadOutlined className="me-2" /> Download Template
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       )}
//     </Container>
//   );
// };

// export default ResumeTemplatesGallery;




import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { DownloadOutlined, EyeOutlined, CloseOutlined } from '@ant-design/icons';
import { Tag, Typography } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';


const { Title, Text } = Typography;

// Updated resumeTemplates array with wordDocPath property
const resumeTemplates = [
  {
    id: 1,
    title: "Professional Classic",
    photoUrl: "https://d.novoresume.com/images/doc/skill-based-resume-template.png",
    description: "Clean and elegant design for corporate professionals",
    tags: ["Corporate", "Traditional"],
    wordDocPath: "/templates/sample output.docx" // Path to your Word document
  },
  {
    id: 2,
    title: "Modern Minimalist",
    photoUrl: "https://cdn.enhancv.com/images/648/i/aHR0cHM6Ly9jZG4uZW5oYW5jdi5jb20vcHJlZGVmaW5lZC1leGFtcGxlcy9ZeXd6OVBpQWhBa29zVGlFN0F3ZnZOUHlQbk9zOGJTOHpETlA2cVF2L2ltYWdlLnBuZw~~.png",
    description: "Sleek, simple design for creative industries",
    tags: ["Creative", "Minimalist"],
    wordDocPath: "/templates/modern_minimalist.docx"
  },
  {
    id: 3,
    title: "Tech Innovator",
    photoUrl: "https://cdn-blog.novoresume.com/articles/resume-formats/Reverse-Chronological-Resume-Format.png",
    description: "Dynamic layout for tech and startup professionals",
    tags: ["Tech", "Startup"],
    wordDocPath: "/templates/tech_innovator.docx"
  },
  {
    id: 4,
    title: "Academic Scholar",
    photoUrl: "https://www.resume-now.com/sapp/uploads/2024/02/resume-template-paralegals.svg",
    description: "Refined template for academic and research positions",
    tags: ["Academic", "Research"],
    wordDocPath: "/templates/academic_scholar.docx"
  },
  {
    id: 5,
    title: "Executive Profile",
    photoUrl: "https://cdn-blog.novoresume.com/articles/resume-formats/Reverse-Chronological-Resume-Format.png",
    description: "Sophisticated design for senior management and executives",
    tags: ["Executive", "Leadership"],
    wordDocPath: "/templates/executive_profile.docx"
  },
  {
    id: 6,
    title: "Creative Portfolio",
    photoUrl: "https://www.resume-now.com/sapp/uploads/2024/02/resume-template-paralegals.svg",
    description: "Visual-focused template for designers and artists",
    tags: ["Creative", "Portfolio"],
    wordDocPath: "/templates/creative_portfolio.docx"
  }
];

const ResumeTemplatesGallery = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Function to handle document download
  const handleDownload = (template) => {
    const link = document.createElement("a");
    link.href = `${process.env.PUBLIC_URL}${template.wordDocPath}`; // Ensure the file is in `public/`
    link.setAttribute("download", `${template.title.replace(/\s+/g, "_").toLowerCase()}_template.docx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handlePreview = (template) => {
    const previewUrl = `${process.env.PUBLIC_URL}${template.wordDocPath}`;
    window.open(previewUrl, "_blank"); // Open in new tab for preview
  };
  

  // CSS styles for the component
  const styles = {
    cardContainer: {
      marginBottom: '30px',
    },
    flipCard: {
      perspective: '1000px',
      height: '480px',
      width: '100%',
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
    cardBack: {
      position: 'absolute',
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
      padding: '10px 15px',
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



  const handleOpenTemplate = (template) => {
    window.open(template.wordDocPath, '_blank');
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
              <div style={{
                ...styles.card,
                ...(hoveredCard === template.id ? styles.cardFlipped : {})
              }}>
                {/* Front of card */}
                <div style={styles.cardFront}>
                  <Card className="h-100 shadow-sm">
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
                
                {/* Back of card - only shows buttons */}
                <div style={styles.cardBack}>
                  <div style={styles.buttonContainer}>
                    <Button 
                      variant="outline-primary" 
                      style={styles.button}
                      onClick={() => setSelectedTemplate(template)}
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
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedTemplate(null)}>
              <CloseOutlined className="me-2" /> Close
            </Button>
            <Button variant="primary" onClick={() => handleDownload(selectedTemplate)}>
              <DownloadOutlined className="me-2" /> Download Template
            </Button>
            <Button variant="outline-success" onClick={() => handleOpenTemplate(selectedTemplate)}>
              <FolderOpenOutlined className="me-2" /> Open Template
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default ResumeTemplatesGallery;