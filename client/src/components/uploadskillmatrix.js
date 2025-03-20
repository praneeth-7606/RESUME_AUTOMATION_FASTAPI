


// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { UploadOutlined, FileExcelOutlined, CheckCircleFilled, CloudUploadOutlined, DeleteOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
// import confetti from 'canvas-confetti';

// const UploadSkillMatrix = ({ setFilePaths, setFileInfo, fileInfo, setSelectedEmployee }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadState, setUploadState] = useState('idle'); // idle, dragging, uploading, success, error
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadError, setUploadError] = useState(null);
//   const [employees, setEmployees] = useState([]);
//   const [showEmployeeList, setShowEmployeeList] = useState(false);
//   const fileInputRef = useRef(null);
//   const uploadAreaRef = useRef(null);
//   const confettiCanvasRef = useRef(null);

//   // Theme colors
//   const colors = {
//     primary: '#4361ee',
//     secondary: '#3f37c9',
//     success: '#4cc9f0',
//     accent: '#f72585',
//     light: '#f8f9fa',
//     dark: '#212529',
//   };

//   // Trigger success animation
//   const triggerSuccessAnimation = () => {
//     if (confettiCanvasRef.current) {
//       const myConfetti = confetti.create(confettiCanvasRef.current, {
//         resize: true,
//         useWorker: true,
//       });
      
//       myConfetti({
//         particleCount: 100,
//         spread: 70,
//         origin: { y: 0.6 },
//         colors: [colors.primary, colors.success, colors.accent],
//       });
//     }
//   };

//   // Handle drag events
//   useEffect(() => {
//     const handleDragOver = (e) => {
//       e.preventDefault();
//       if (uploadState !== 'uploading') {
//         setUploadState('dragging');
//       }
//     };

//     const handleDragLeave = (e) => {
//       e.preventDefault();
//       if (uploadState !== 'uploading') {
//         setUploadState('idle');
//       }
//     };

//     const handleDrop = (e) => {
//       e.preventDefault();
//       if (uploadState !== 'uploading') {
//         const file = e.dataTransfer.files[0];
//         if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
//           setSelectedFile(file);
//           setUploadState('idle');
//           setUploadError(null);
//         } else {
//           setUploadError('Please select a valid Excel file (.xlsx or .xls)');
//         }
//       }
//     };

//     const dropArea = uploadAreaRef.current;
//     if (dropArea) {
//       dropArea.addEventListener('dragover', handleDragOver);
//       dropArea.addEventListener('dragleave', handleDragLeave);
//       dropArea.addEventListener('drop', handleDrop);
//     }

//     return () => {
//       if (dropArea) {
//         dropArea.removeEventListener('dragover', handleDragOver);
//         dropArea.removeEventListener('dragleave', handleDragLeave);
//         dropArea.removeEventListener('drop', handleDrop);
//       }
//     };
//   }, [uploadState]);

//   // Handler for file selection
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setUploadError(null);
//       setUploadState('idle');
//     }
//   };

//   // Simulate progress for better UX
//   const simulateProgress = () => {
//     let progress = 0;
//     const interval = setInterval(() => {
//       progress += Math.floor(Math.random() * 8) + 1;
//       if (progress > 95) {
//         clearInterval(interval);
//         progress = 95;
//       }
//       setUploadProgress(progress);
//     }, 200);
//     return interval;
//   };

//   // Handler for skill matrix upload
//   const handleSkillMatrixUpload = async (e) => {
//     e.preventDefault();
//     if (!selectedFile) return;

//     setUploadState('uploading');
//     setUploadError(null);
//     setUploadProgress(0);
    
//     const progressInterval = simulateProgress();
//     const formData = new FormData();
//     formData.append('skillMatrix', selectedFile);

//     try {
//       // First upload the file to the server
//       const response = await fetch('http://localhost:8000/upload/skill-matrix', {
//         method: 'POST',
//         body: formData
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setFilePaths(prev => ({ ...prev, skillMatrix: data.file_path }));
//         setFileInfo(prev => ({
//           ...prev,
//           skillMatrix: `File uploaded: ${data.filename}. Processed ${data.sheets_processed} sheets with ${data.total_records} records.`
//         }));
        
//         // Now extract employees from the same file
//         const employeeResponse = await fetch('http://localhost:8000/extract-employees', {
//           method: 'POST',
//           body: formData
//         });
        
//         if (employeeResponse.ok) {
//           const employeeData = await employeeResponse.json();
//           setEmployees(employeeData.employees);
//           setShowEmployeeList(true);
//         } else {
//           const errorData = await employeeResponse.json();
//           setUploadError('Error extracting employees: ' + errorData.detail);
//         }
        
//         clearInterval(progressInterval);
//         setUploadProgress(100);
//         setUploadState('success');
//         setTimeout(triggerSuccessAnimation, 300);
//       } else {
//         const errorData = await response.json();
//         setUploadError('Error: ' + errorData.detail);
//         setUploadState('error');
//         clearInterval(progressInterval);
//       }
//     } catch (error) {
//       clearInterval(progressInterval);
//       console.error('Error:', error);
//       setUploadError('Failed to upload file. Please try again.');
//       setUploadState('error');
//     }
//   };

//   // Handle employee selection
//   const handleEmployeeSelect = (employee) => {
//     setSelectedEmployee(employee);
//     // Optional: Hide the employee list after selection
//     setShowEmployeeList(false);
//   };

//   // Reset upload
//   const resetUpload = () => {
//     setSelectedFile(null);
//     setUploadState('idle');
//     setUploadProgress(0);
//     setUploadError(null);
//     setEmployees([]);
//     setShowEmployeeList(false);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   // Custom styles for employee list
//   const employeeListStyles = {
//     container: {
//       marginTop: '30px',
//       border: '1px solid #e0e0e0',
//       borderRadius: '8px',
//       padding: '20px',
//       backgroundColor: '#fff',
//       boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//     },
//     title: {
//       fontSize: '18px',
//       fontWeight: '600',
//       marginBottom: '15px',
//       color: colors.dark,
//       display: 'flex',
//       alignItems: 'center',
//     },
//     list: {
//       maxHeight: '300px',
//       overflowY: 'auto',
//       padding: '0',
//       margin: '0',
//       listStyle: 'none',
//     },
//     listItem: {
//       padding: '12px 15px',
//       borderBottom: '1px solid #f0f0f0',
//       display: 'flex',
//       alignItems: 'center',
//       cursor: 'pointer',
//       transition: 'background-color 0.2s ease',
//       borderRadius: '4px',
//     },
//     listItemHover: {
//       backgroundColor: '#f8f9fa',
//     },
//     avatar: {
//       width: '36px',
//       height: '36px',
//       borderRadius: '50%',
//       backgroundColor: colors.primary,
//       color: '#fff',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginRight: '15px',
//       fontSize: '16px',
//     },
//     employeeInfo: {
//       flexGrow: 1,
//     },
//     employeeName: {
//       margin: '0 0 3px 0',
//       fontWeight: '500',
//       fontSize: '16px',
//     },
//     employeeDetail: {
//       margin: '0',
//       fontSize: '14px',
//       color: '#6c757d',
//     },
//     searchBox: {
//       padding: '10px 15px',
//       border: '1px solid #ddd',
//       borderRadius: '6px',
//       width: '100%',
//       marginBottom: '15px',
//       fontSize: '14px',
//     },
//   };

//   // Styles
//   const styles = {
//     container: {
//       padding: '20px',
//     },
//     confettiCanvas: {
//       position: 'fixed',
//       pointerEvents: 'none',
//       width: '100%',
//       height: '100%',
//       top: 0,
//       left: 0,
//       zIndex: 100,
//     },
//     card: {
//       backgroundColor: '#fff',
//       borderRadius: '12px',
//       boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
//       overflow: 'hidden',
//       position: 'relative',
//     },
//     cardHeader: {
//       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
//       padding: '25px 30px',
//       position: 'relative',
//       overflow: 'hidden',
//     },
//     headerBubble: {
//       position: 'absolute',
//       borderRadius: '50%',
//       backgroundColor: '#ffffff',
//     },
//     headerTitle: {
//       color: '#fff',
//       margin: 0,
//       position: 'relative',
//       zIndex: 1,
//       fontSize: '22px',
//       fontWeight: '600',
//       display: 'flex',
//       alignItems: 'center',
//     },
//     cardBody: {
//       padding: '30px',
//     },
//     uploadArea: {
//       border: '2px dashed #d1d5db',
//       borderRadius: '10px',
//       padding: '40px 20px',
//       textAlign: 'center',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       backgroundColor: '#f9fafb',
//       minHeight: '200px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     uploadAreaDragging: {
//       backgroundColor: '#f1f5f9',
//       borderColor: colors.primary,
//     },
//     uploadIcon: {
//       fontSize: '48px',
//       color: colors.primary,
//       marginBottom: '15px',
//     },
//     uploadPrompt: {
//       fontSize: '18px',
//       fontWeight: '500',
//       margin: '0 0 8px 0',
//       color: '#333',
//     },
//     uploadHint: {
//       fontSize: '14px',
//       color: '#6b7280',
//       margin: 0,
//     },
//     fileInfo: {
//       display: 'flex',
//       alignItems: 'center',
//       padding: '15px',
//       backgroundColor: '#f1f5f9',
//       borderRadius: '8px',
//     },
//     fileIcon: {
//       fontSize: '24px',
//       color: '#10b981',
//       marginRight: '15px',
//     },
//     fileDetails: {
//       textAlign: 'left',
//       flexGrow: 1,
//     },
//     fileName: {
//       margin: '0 0 5px 0',
//       fontWeight: '500',
//       whiteSpace: 'nowrap',
//       overflow: 'hidden',
//       textOverflow: 'ellipsis',
//       maxWidth: '350px',
//     },
//     fileSize: {
//       margin: 0,
//       fontSize: '14px',
//       color: '#6b7280',
//     },
//     deleteButton: {
//       color: '#ef4444',
//       fontSize: '18px',
//       cursor: 'pointer',
//       padding: '8px',
//     },
//     progressContainer: {
//       marginTop: '20px',
//     },
//     progressText: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       marginBottom: '8px',
//       fontSize: '14px',
//       fontWeight: '500',
//     },
//     progressBarWrapper: {
//       height: '8px',
//       backgroundColor: '#e2e8f0',
//       borderRadius: '4px',
//       overflow: 'hidden',
//     },
//     progressBar: {
//       height: '100%',
//       backgroundColor: colors.primary,
//     },
//     button: {
//       padding: '12px 22px',
//       border: 'none',
//       borderRadius: '8px',
//       fontWeight: '500',
//       cursor: 'pointer',
//       transition: 'all 0.2s ease',
//       display: 'inline-flex',
//       alignItems: 'center',
//       marginRight: '10px',
//     },
//     primaryButton: {
//       backgroundColor: colors.primary,
//       color: '#fff',
//     },
//     secondaryButton: {
//       backgroundColor: '#f1f5f9',
//       color: '#475569',
//     },
//     errorAlert: {
//       backgroundColor: '#fef2f2',
//       color: '#b91c1c',
//       padding: '12px 16px',
//       borderRadius: '8px',
//       marginTop: '20px',
//       fontSize: '14px',
//       display: 'flex',
//       alignItems: 'center',
//     },
//     uploadComplete: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: '30px 20px',
//       textAlign: 'center',
//     },
//     infoCard: {
//       backgroundColor: '#f0f9ff',
//       borderLeft: `4px solid ${colors.primary}`,
//       padding: '15px 20px',
//       borderRadius: '6px',
//       marginTop: '20px',
//       width: '100%',
//       textAlign: 'left',
//     },
//   };

//   const bubbles = [];
//   for (let i = 0; i < 8; i++) {
//     const size = Math.floor(Math.random() * 100) + 50;
//     const left = Math.floor(Math.random() * 100);
//     const top = Math.floor(Math.random() * 100) - 50;
//     const opacity = Math.random() * 0.1;
    
//     bubbles.push(
//       <div 
//         key={i}
//         style={{
//           ...styles.headerBubble,
//           width: `${size}px`,
//           height: `${size}px`,
//           left: `${left}%`,
//           top: `${top}%`,
//           opacity,
//         }}
//       />
//     );
//   }

//   // State for filtering employees
//   const [searchQuery, setSearchQuery] = useState('');
//   const filteredEmployees = employees.filter(employee => 
//     `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div style={styles.container}>
//       <canvas ref={confettiCanvasRef} style={styles.confettiCanvas} />
      
//       <motion.div 
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//         style={styles.card}
//       >
//         <div style={styles.cardHeader}>
//           {bubbles}
//           <h2 style={styles.headerTitle}>
//             <span style={{ marginRight: '15px', fontSize: '28px' }}>1</span>
//             Upload Your Skill Matrix
//           </h2>
//         </div>
        
//         <div style={styles.cardBody}>
//           <form onSubmit={handleSkillMatrixUpload}>
//             <AnimatePresence mode="wait">
//               {uploadState === 'success' ? (
//                 <motion.div 
//                   key="success-view"
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   transition={{ duration: 0.4 }}
//                   style={styles.uploadComplete}
//                 >
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: [0, 1.2, 1] }}
//                     transition={{ duration: 0.6, times: [0, 0.6, 1] }}
//                   >
//                     <CheckCircleFilled style={{ fontSize: '80px', color: colors.success }} />
//                   </motion.div>
                  
//                   <motion.h3
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3, duration: 0.4 }}
//                     style={{ marginTop: '20px', color: colors.dark }}
//                   >
//                     Upload Complete!
//                   </motion.h3>
                  
//                   <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.5, duration: 0.4 }}
//                     style={{ marginTop: '10px', color: '#6c757d' }}
//                   >
//                     Your skill matrix has been successfully uploaded and processed.
//                   </motion.p>
                  
//                   {fileInfo?.skillMatrix && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.7, duration: 0.4 }}
//                       style={styles.infoCard}
//                     >
//                       <p style={{ margin: 0, fontWeight: '500' }}>
//                         {fileInfo.skillMatrix}
//                       </p>
//                     </motion.div>
//                   )}
                  
//                   {showEmployeeList && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.9, duration: 0.4 }}
//                       style={employeeListStyles.container}
//                     >
//                       <div style={employeeListStyles.title}>
//                         <UserOutlined style={{ marginRight: '10px', color: colors.primary }} />
//                         Select an Employee
//                       </div>
                      
//                       <input
//                         type="text"
//                         placeholder="Search employees..."
//                         style={employeeListStyles.searchBox}
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                       />
                      
//                       <ul style={employeeListStyles.list}>
//                         {filteredEmployees.map((employee, index) => (
//                           <li
//                             key={employee.ID}
//                             style={employeeListStyles.listItem}
//                             onMouseEnter={(e) => {
//                               e.currentTarget.style.backgroundColor = '#f8f9fa';
//                             }}
//                             onMouseLeave={(e) => {
//                               e.currentTarget.style.backgroundColor = 'transparent';
//                             }}
//                             onClick={() => handleEmployeeSelect(employee)}
//                           >
//                             <div style={employeeListStyles.avatar}>
//                               {employee.first_name.charAt(0).toUpperCase()}
//                             </div>
//                             <div style={employeeListStyles.employeeInfo}>
//                               <p style={employeeListStyles.employeeName}>
//                                 {employee.first_name} {employee.last_name}
//                               </p>
//                               <p style={employeeListStyles.employeeDetail}>
//                                 ID: {employee.ID} | Sheet: {employee.sheet_name}
//                               </p>
//                             </div>
//                           </li>
//                         ))}
                        
//                         {filteredEmployees.length === 0 && (
//                           <li style={{...employeeListStyles.listItem, justifyContent: 'center', cursor: 'default'}}>
//                             No employees found matching your search.
//                           </li>
//                         )}
//                       </ul>
//                     </motion.div>
//                   )}
                  
//                   <motion.button
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 1.1, duration: 0.4 }}
//                     type="button"
//                     style={{ ...styles.button, ...styles.primaryButton, marginTop: '30px' }}
//                     onClick={resetUpload}
//                   >
//                     Upload Another File
//                   </motion.button>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="upload-view"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                 >
//                   <div 
//                     ref={uploadAreaRef}
//                     style={{
//                       ...styles.uploadArea,
//                       ...(uploadState === 'dragging' ? styles.uploadAreaDragging : {}),
//                     }}
//                     onClick={() => fileInputRef.current.click()}
//                   >
//                     {selectedFile ? (
//                       <div style={{ width: '100%' }}>
//                         <motion.div 
//                           initial={{ y: 10, opacity: 0 }}
//                           animate={{ y: 0, opacity: 1 }}
//                           style={styles.fileInfo}
//                         >
//                           <FileExcelOutlined style={styles.fileIcon} />
//                           <div style={styles.fileDetails}>
//                             <p style={styles.fileName} title={selectedFile.name}>
//                               {selectedFile.name}
//                             </p>
//                             <p style={styles.fileSize}>
//                               {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
//                             </p>
//                           </div>
//                           {uploadState !== 'uploading' && (
//                             <DeleteOutlined 
//                               style={styles.deleteButton}
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 resetUpload();
//                               }}
//                             />
//                           )}
//                         </motion.div>
                        
//                         {uploadState === 'uploading' && (
//                           <motion.div 
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             style={styles.progressContainer}
//                           >
//                             <div style={styles.progressText}>
//                               <span>Uploading...</span>
//                               <span>{uploadProgress}%</span>
//                             </div>
//                             <div style={styles.progressBarWrapper}>
//                               <motion.div 
//                                 style={styles.progressBar}
//                                 initial={{ width: '0%' }}
//                                 animate={{ width: `${uploadProgress}%` }}
//                               />
//                             </div>
//                             <p style={{ textAlign: 'center', marginTop: '15px', color: '#6c757d' }}>
//                               Please wait while we process your file
//                             </p>
//                           </motion.div>
//                         )}
//                       </div>
//                     ) : (
//                       <motion.div
//                         animate={{ 
//                           y: [0, -10, 0],
//                           transition: { 
//                             repeat: Infinity, 
//                             duration: 2,
//                             repeatType: "reverse"
//                           }
//                         }}
//                       >
//                         <CloudUploadOutlined style={styles.uploadIcon} />
//                         <p style={styles.uploadPrompt}>
//                           {uploadState === 'dragging' 
//                             ? 'Drop your Excel file here' 
//                             : 'Drag & Drop your Excel file here'}
//                         </p>
//                         <p style={styles.uploadHint}>
//                           or click to browse from your device
//                         </p>
//                       </motion.div>
//                     )}
//                   </div>
                  
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept=".xlsx,.xls"
//                     onChange={handleFileChange}
//                     style={{ display: 'none' }}
//                   />
                  
//                   {uploadError && (
//                     <motion.div 
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       style={styles.errorAlert}
//                     >
//                       <span style={{ marginRight: '10px', fontSize: '18px', color: colors.accent }}>⚠️</span>
//                       {uploadError}
//                     </motion.div>
//                   )}
                  
//                   <motion.div 
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }}
//                   >
//                     <button
//                       type="button"
//                       style={{
//                         ...styles.button,
//                         ...styles.secondaryButton,
//                       }}
//                       onClick={() => fileInputRef.current.click()}
//                       disabled={uploadState === 'uploading'}
//                     >
//                       <UploadOutlined style={{ marginRight: '8px' }} />
//                       Browse Files
//                     </button>
                    
//                     <button
//                       type="submit"
//                       style={{
//                         ...styles.button,
//                         ...styles.primaryButton,
//                         opacity: (!selectedFile || uploadState === 'uploading') ? 0.6 : 1,
//                       }}
//                       disabled={!selectedFile || uploadState === 'uploading'}
//                     >
//                       {uploadState === 'uploading' ? (
//                         <>
//                           <LoadingOutlined style={{ marginRight: '8px' }} spin />
//                           Processing...
//                         </>
//                       ) : (
//                         'Upload Skill Matrix'
//                       )}
//                     </button>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default UploadSkillMatrix;




import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadOutlined, FileExcelOutlined, CheckCircleFilled, CloudUploadOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import confetti from 'canvas-confetti';

const UploadSkillMatrix = ({ setFilePaths, setFileInfo, fileInfo }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadState, setUploadState] = useState('idle'); // idle, dragging, uploading, success, error
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);
  const uploadAreaRef = useRef(null);
  const confettiCanvasRef = useRef(null);

  // Theme colors
  const colors = {
    primary: '#4361ee',
    secondary: '#3f37c9',
    success: '#4cc9f0',
    accent: '#f72585',
    light: '#f8f9fa',
    dark: '#212529',
  };

  // Trigger success animation
  const triggerSuccessAnimation = () => {
    if (confettiCanvasRef.current) {
      const myConfetti = confetti.create(confettiCanvasRef.current, {
        resize: true,
        useWorker: true,
      });
      
      myConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: [colors.primary, colors.success, colors.accent],
      });
    }
  };

  // Handle drag events
  useEffect(() => {
    const handleDragOver = (e) => {
      e.preventDefault();
      if (uploadState !== 'uploading') {
        setUploadState('dragging');
      }
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      if (uploadState !== 'uploading') {
        setUploadState('idle');
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      if (uploadState !== 'uploading') {
        const file = e.dataTransfer.files[0];
        if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
          setSelectedFile(file);
          setUploadState('idle');
          setUploadError(null);
        } else {
          setUploadError('Please select a valid Excel file (.xlsx or .xls)');
        }
      }
    };

    const dropArea = uploadAreaRef.current;
    if (dropArea) {
      dropArea.addEventListener('dragover', handleDragOver);
      dropArea.addEventListener('dragleave', handleDragLeave);
      dropArea.addEventListener('drop', handleDrop);
    }

    return () => {
      if (dropArea) {
        dropArea.removeEventListener('dragover', handleDragOver);
        dropArea.removeEventListener('dragleave', handleDragLeave);
        dropArea.removeEventListener('drop', handleDrop);
      }
    };
  }, [uploadState]);

  // Handler for file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadError(null);
      setUploadState('idle');
    }
  };

  // Simulate progress for better UX
  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 1;
      if (progress > 95) {
        clearInterval(interval);
        progress = 95;
      }
      setUploadProgress(progress);
    }, 200);
    return interval;
  };

  // Handler for skill matrix upload
  const handleSkillMatrixUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploadState('uploading');
    setUploadError(null);
    setUploadProgress(0);
    
    const progressInterval = simulateProgress();
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/upload/skill-matrix', {
        method: 'POST',
        body: formData
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      
      const data = await response.json();
      if (response.ok) {
        setFilePaths(prev => ({ ...prev, skillMatrix: data.file_path }));
        setFileInfo(prev => ({
          ...prev,
          skillMatrix: `File uploaded: ${data.filename}. Processed ${data.sheets_processed} sheets with ${data.total_records} records.`
        }));
        setUploadState('success');
        setTimeout(triggerSuccessAnimation, 300);
      } else {
        setUploadError('Error: ' + data.detail);
        setUploadState('error');
      }
    } catch (error) {
      clearInterval(progressInterval);
      console.error('Error:', error);
      setUploadError('Failed to upload file. Please try again.');
      setUploadState('error');
    }
  };

  // Reset upload
  const resetUpload = () => {
    setSelectedFile(null);
    setUploadState('idle');
    setUploadProgress(0);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Custom styles
  const styles = {
    container: {
      position: 'relative',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: '"Poppins", sans-serif',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '16px',
      padding: '0',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.06)',
      border: 'none',
      transition: 'all 0.3s ease',
    },
    cardHeader: {
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      color: 'white',
      padding: '20px 30px',
      position: 'relative',
      overflow: 'hidden',
    },
    headerTitle: {
      margin: 0,
      fontSize: '24px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      zIndex: 2,
    },
    headerBubble: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
    },
    cardBody: {
      padding: '30px',
    },
    uploadArea: {
      border: `2px dashed ${colors.primary}`,
      borderRadius: '12px',
      padding: '40px 20px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      background: colors.light,
      position: 'relative',
      minHeight: '220px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    uploadAreaDragging: {
      backgroundColor: 'rgba(67, 97, 238, 0.05)',
      borderColor: colors.success,
      boxShadow: `0 0 20px rgba(67, 97, 238, 0.2)`,
    },
    uploadIcon: {
      fontSize: '80px',
      color: colors.primary,
      margin: '0 auto 15px',
      display: 'block',
      transition: 'all 0.3s ease',
    },
    uploadPrompt: {
      fontSize: '18px',
      fontWeight: '500',
      color: colors.dark,
      marginBottom: '8px',
    },
    uploadHint: {
      color: '#6c757d',
      marginBottom: '0',
    },
    button: {
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: '500',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryButton: {
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      color: 'white',
      marginLeft: '10px',
      boxShadow: '0 4px 14px rgba(67, 97, 238, 0.3)',
      minWidth: '180px',
    },
    secondaryButton: {
      backgroundColor: 'rgba(67, 97, 238, 0.1)',
      color: colors.primary,
    },
    infoCard: {
      marginTop: '20px',
      borderRadius: '12px',
      padding: '20px',
      backgroundColor: 'rgba(76, 201, 240, 0.1)',
      borderLeft: `5px solid ${colors.success}`,
    },
    fileInfo: {
      display: 'flex',
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '15px',
      alignItems: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    },
    fileIcon: {
      fontSize: '40px',
      color: '#217346', // Excel green
      marginRight: '15px',
    },
    fileDetails: {
      flex: 1,
    },
    fileName: {
      fontWeight: '600',
      fontSize: '16px',
      marginBottom: '2px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '250px',
    },
    fileSize: {
      color: '#6c757d',
      fontSize: '14px',
    },
    deleteButton: {
      color: colors.accent,
      fontSize: '18px',
      cursor: 'pointer',
    },
    progressContainer: {
      marginTop: '20px',
    },
    progressBarWrapper: {
      height: '8px',
      backgroundColor: 'rgba(67, 97, 238, 0.1)',
      borderRadius: '4px',
      margin: '10px 0',
      overflow: 'hidden',
      position: 'relative',
    },
    progressBar: {
      height: '100%',
      borderRadius: '4px',
      background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.success} 100%)`,
      transition: 'width 0.3s ease',
    },
    progressText: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: colors.dark,
    },
    successIcon: {
      fontSize: '40px',
      color: colors.success,
      marginRight: '15px',
    },
    errorAlert: {
      backgroundColor: 'rgba(247, 37, 133, 0.1)',
      color: colors.accent,
      borderRadius: '8px',
      padding: '15px',
      marginTop: '20px',
      display: 'flex',
      alignItems: 'center',
    },
    confettiCanvas: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 10,
    },
    uploadComplete: {
      padding: '20px',
      textAlign: 'center',
      maxWidth: '400px',
      margin: '0 auto',
    },
  };

  // Create bubble effects for header
  const bubbles = [];
  for (let i = 0; i < 8; i++) {
    const size = Math.floor(Math.random() * 100) + 50;
    const left = Math.floor(Math.random() * 100);
    const top = Math.floor(Math.random() * 100) - 50;
    const opacity = Math.random() * 0.1;
    
    bubbles.push(
      <div 
        key={i}
        style={{
          ...styles.headerBubble,
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          top: `${top}%`,
          opacity,
        }}
      />
    );
  }

  return (
    <div style={styles.container}>
      <canvas ref={confettiCanvasRef} style={styles.confettiCanvas} />
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={styles.card}
      >
        <div style={styles.cardHeader}>
          {bubbles}
          <h2 style={styles.headerTitle}>
            <span style={{ marginRight: '15px', fontSize: '28px' }}>1</span>
            Upload Your Skill Matrix
          </h2>
        </div>
        
        <div style={styles.cardBody}>
          <form onSubmit={handleSkillMatrixUpload}>
            <AnimatePresence mode="wait">
              {uploadState === 'success' ? (
                <motion.div 
                  key="success-view"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  style={styles.uploadComplete}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.6, times: [0, 0.6, 1] }}
                  >
                    <CheckCircleFilled style={{ fontSize: '80px', color: colors.success }} />
                  </motion.div>
                  
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    style={{ marginTop: '20px', color: colors.dark }}
                  >
                    Upload Complete!
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    style={{ marginTop: '10px', color: '#6c757d' }}
                  >
                    Your skill matrix has been successfully uploaded and processed.
                  </motion.p>
                  
                  {fileInfo?.skillMatrix && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.4 }}
                      style={styles.infoCard}
                    >
                      <p style={{ margin: 0, fontWeight: '500' }}>
                        {fileInfo.skillMatrix}
                      </p>
                    </motion.div>
                  )}
                  
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.4 }}
                    type="button"
                    style={{ ...styles.button, ...styles.primaryButton, marginTop: '30px' }}
                    onClick={resetUpload}
                  >
                    Upload Another File
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="upload-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div 
                    ref={uploadAreaRef}
                    style={{
                      ...styles.uploadArea,
                      ...(uploadState === 'dragging' ? styles.uploadAreaDragging : {}),
                    }}
                    onClick={() => fileInputRef.current.click()}
                  >
                    {selectedFile ? (
                      <div style={{ width: '100%' }}>
                        <motion.div 
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          style={styles.fileInfo}
                        >
                          <FileExcelOutlined style={styles.fileIcon} />
                          <div style={styles.fileDetails}>
                            <p style={styles.fileName} title={selectedFile.name}>
                              {selectedFile.name}
                            </p>
                            <p style={styles.fileSize}>
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          {uploadState !== 'uploading' && (
                            <DeleteOutlined 
                              style={styles.deleteButton}
                              onClick={(e) => {
                                e.stopPropagation();
                                resetUpload();
                              }}
                            />
                          )}
                        </motion.div>
                        
                        {uploadState === 'uploading' && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={styles.progressContainer}
                          >
                            <div style={styles.progressText}>
                              <span>Uploading...</span>
                              <span>{uploadProgress}%</span>
                            </div>
                            <div style={styles.progressBarWrapper}>
                              <motion.div 
                                style={styles.progressBar}
                                initial={{ width: '0%' }}
                                animate={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                            <p style={{ textAlign: 'center', marginTop: '15px', color: '#6c757d' }}>
                              Please wait while we process your file
                            </p>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                          transition: { 
                            repeat: Infinity, 
                            duration: 2,
                            repeatType: "reverse"
                          }
                        }}
                      >
                        <CloudUploadOutlined style={styles.uploadIcon} />
                        <p style={styles.uploadPrompt}>
                          {uploadState === 'dragging' 
                            ? 'Drop your Excel file here' 
                            : 'Drag & Drop your Excel file here'}
                        </p>
                        <p style={styles.uploadHint}>
                          or click to browse from your device
                        </p>
                      </motion.div>
                    )}
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  
                  {uploadError && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={styles.errorAlert}
                    >
                      <span style={{ marginRight: '10px', fontSize: '18px', color: colors.accent }}>⚠️</span>
                      {uploadError}
                    </motion.div>
                  )}
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }}
                  >
                    <button
                      type="button"
                      style={{
                        ...styles.button,
                        ...styles.secondaryButton,
                      }}
                      onClick={() => fileInputRef.current.click()}
                      disabled={uploadState === 'uploading'}
                    >
                      <UploadOutlined style={{ marginRight: '8px' }} />
                      Browse Files
                    </button>
                    
                    <button
                      type="submit"
                      style={{
                        ...styles.button,
                        ...styles.primaryButton,
                        opacity: (!selectedFile || uploadState === 'uploading') ? 0.6 : 1,
                      }}
                      disabled={!selectedFile || uploadState === 'uploading'}
                    >
                      {uploadState === 'uploading' ? (
                        <>
                          <LoadingOutlined style={{ marginRight: '8px' }} spin />
                          Processing...
                        </>
                      ) : (
                        'Upload Skill Matrix'
                      )}
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadSkillMatrix;



// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { UploadOutlined, FileExcelOutlined, CheckCircleFilled, CloudUploadOutlined, DeleteOutlined, LoadingOutlined, UserOutlined, TeamOutlined, SearchOutlined, FileTextOutlined, CheckOutlined } from '@ant-design/icons';
// import confetti from 'canvas-confetti';

// const UploadSkillMatrix = ({ setFilePaths, setFileInfo, fileInfo }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadState, setUploadState] = useState('idle'); // idle, dragging, uploading, success, error
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadError, setUploadError] = useState(null);
//   const [employees, setEmployees] = useState([]);
//   const [isLoadingEmployees, setIsLoadingEmployees] = useState(false);
//   const [employeeError, setEmployeeError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [generatingResume, setGeneratingResume] = useState(false);
//   const [resumeGenerated, setResumeGenerated] = useState(false);
//   const [resumeUrl, setResumeUrl] = useState(null);
//   const fileInputRef = useRef(null);
//   const uploadAreaRef = useRef(null);
//   const confettiCanvasRef = useRef(null);
//   const searchInputRef = useRef(null);

//   // Theme colors
//   const colors = {
//     primary: '#4361ee',
//     secondary: '#3f37c9',
//     success: '#4cc9f0',
//     accent: '#f72585',
//     light: '#f8f9fa',
//     dark: '#212529',
//   };

//   // Trigger success animation
//   const triggerSuccessAnimation = () => {
//     if (confettiCanvasRef.current) {
//       const myConfetti = confetti.create(confettiCanvasRef.current, {
//         resize: true,
//         useWorker: true,
//       });
      
//       myConfetti({
//         particleCount: 100,
//         spread: 70,
//         origin: { y: 0.6 },
//         colors: [colors.primary, colors.success, colors.accent],
//       });
//     }
//   };

//   // Fetch employees list after successful upload
//   const fetchEmployees = async () => {
//     setIsLoadingEmployees(true);
//     setEmployeeError(null);
    
//     try {
//       const response = await fetch('http://localhost:8000/employees/list');
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch employees');
//       }
      
//       const data = await response.json();
//       setEmployees(data);
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//       setEmployeeError('Failed to load employees list. Please try again.');
//     } finally {
//       setIsLoadingEmployees(false);
//     }
//   };

//   // Handle drag events
//   useEffect(() => {
//     const handleDragOver = (e) => {
//       e.preventDefault();
//       if (uploadState !== 'uploading') {
//         setUploadState('dragging');
//       }
//     };

//     const handleDragLeave = (e) => {
//       e.preventDefault();
//       if (uploadState !== 'uploading') {
//         setUploadState('idle');
//       }
//     };

//     const handleDrop = (e) => {
//       e.preventDefault();
//       if (uploadState !== 'uploading') {
//         const file = e.dataTransfer.files[0];
//         if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
//           setSelectedFile(file);
//           setUploadState('idle');
//           setUploadError(null);
//         } else {
//           setUploadError('Please select a valid Excel file (.xlsx or .xls)');
//         }
//       }
//     };

//     const dropArea = uploadAreaRef.current;
//     if (dropArea) {
//       dropArea.addEventListener('dragover', handleDragOver);
//       dropArea.addEventListener('dragleave', handleDragLeave);
//       dropArea.addEventListener('drop', handleDrop);
//     }

//     return () => {
//       if (dropArea) {
//         dropArea.removeEventListener('dragover', handleDragOver);
//         dropArea.removeEventListener('dragleave', handleDragLeave);
//         dropArea.removeEventListener('drop', handleDrop);
//       }
//     };
//   }, [uploadState]);

//   // Handler for file selection
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setUploadError(null);
//       setUploadState('idle');
//     }
//   };

//   // Simulate progress for better UX
//   const simulateProgress = () => {
//     let progress = 0;
//     const interval = setInterval(() => {
//       progress += Math.floor(Math.random() * 8) + 1;
//       if (progress > 95) {
//         clearInterval(interval);
//         progress = 95;
//       }
//       setUploadProgress(progress);
//     }, 200);
//     return interval;
//   };

//   // Handler for skill matrix upload
//   const handleSkillMatrixUpload = async (e) => {
//     e.preventDefault();
//     if (!selectedFile) return;

//     setUploadState('uploading');
//     setUploadError(null);
//     setUploadProgress(0);
    
//     const progressInterval = simulateProgress();
//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     try {
//       const response = await fetch('http://localhost:8000/upload/skill-matrix', {
//         method: 'POST',
//         body: formData
//       });

//       clearInterval(progressInterval);
//       setUploadProgress(100);
      
//       const data = await response.json();
//       if (response.ok) {
//         setFilePaths(prev => ({ ...prev, skillMatrix: data.file_path }));
//         setFileInfo(prev => ({
//           ...prev,
//           skillMatrix: `File uploaded: ${data.filename}. Processed ${data.sheets_processed} sheets with ${data.total_records} records.`
//         }));
//         setUploadState('success');
//         setTimeout(triggerSuccessAnimation, 300);
        
//         // Fetch employees list after successful upload
//         fetchEmployees();
//       } else {
//         setUploadError('Error: ' + data.detail);
//         setUploadState('error');
//       }
//     } catch (error) {
//       clearInterval(progressInterval);
//       console.error('Error:', error);
//       setUploadError('Failed to upload file. Please try again.');
//       setUploadState('error');
//     }
//   };

//   // Reset upload
//   const resetUpload = () => {
//     setSelectedFile(null);
//     setUploadState('idle');
//     setUploadProgress(0);
//     setUploadError(null);
//     setEmployees([]);
//     setSelectedEmployees([]);
//     setSearchQuery('');
//     setResumeGenerated(false);
//     setResumeUrl(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   // Handle employee selection
//   const toggleEmployeeSelection = (employeeId) => {
//     setSelectedEmployees(prev => {
//       if (prev.includes(employeeId)) {
//         return prev.filter(id => id !== employeeId);
//       } else {
//         return [...prev, employeeId];
//       }
//     });
//   };

//   // Handle select all employees
//   const handleSelectAllEmployees = () => {
//     if (selectedEmployees.length === filteredEmployees.length) {
//       // If all are selected, deselect all
//       setSelectedEmployees([]);
//     } else {
//       // Otherwise, select all filtered employees
//       setSelectedEmployees(filteredEmployees.map(emp => emp.ID));
//     }
//   };

//   // Generate resume for selected employees
//   const generateResume = async () => {
//     if (selectedEmployees.length === 0) return;
    
//     setGeneratingResume(true);
//     setResumeGenerated(false);
    
//     try {
//       const response = await fetch('http://localhost:8000/generate/resume', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ employee_ids: selectedEmployees })
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to generate resume');
//       }
      
//       const data = await response.json();
//       setResumeUrl(data.download_url);
//       setResumeGenerated(true);
//       setTimeout(triggerSuccessAnimation, 300);
//     } catch (error) {
//       console.error('Error generating resume:', error);
//       setEmployeeError('Failed to generate resume. Please try again.');
//     } finally {
//       setGeneratingResume(false);
//     }
//   };

//   // Filter employees based on search query
//   const filteredEmployees = employees.filter(emp => {
//     const fullName = `${emp.first_name} ${emp.last_name}`.toLowerCase();
//     return fullName.includes(searchQuery.toLowerCase());
//   });

//   // Custom styles
// const styles = {
//     container: {
//       position: 'relative',
//       maxWidth: '800px',
//       margin: '0 auto',
//       fontFamily: '"Poppins", sans-serif',
//     },
//     card: {
//       background: 'rgba(255, 255, 255, 0.95)',
//       borderRadius: '16px',
//       padding: '0',
//       overflow: 'hidden',
//       boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.06)',
//       border: 'none',
//       transition: 'all 0.3s ease',
//     },
//     cardHeader: {
//       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
//       color: 'white',
//       padding: '20px 30px',
//       position: 'relative',
//       overflow: 'hidden',
//     },
//     headerTitle: {
//       margin: 0,
//       fontSize: '24px',
//       fontWeight: '600',
//       display: 'flex',
//       alignItems: 'center',
//       position: 'relative',
//       zIndex: 2,
//     },
//     headerBubble: {
//       position: 'absolute',
//       borderRadius: '50%',
//       background: 'rgba(255, 255, 255, 0.1)',
//     },
//     cardBody: {
//       padding: '30px',
//     },
//     uploadArea: {
//       border: `2px dashed ${colors.primary}`,
//       borderRadius: '12px',
//       padding: '40px 20px',
//       textAlign: 'center',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       background: colors.light,
//       position: 'relative',
//       minHeight: '220px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     uploadAreaDragging: {
//       backgroundColor: 'rgba(67, 97, 238, 0.05)',
//       borderColor: colors.success,
//       boxShadow: `0 0 20px rgba(67, 97, 238, 0.2)`,
//     },
//     uploadIcon: {
//       fontSize: '80px',
//       color: colors.primary,
//       margin: '0 auto 15px',
//       display: 'block',
//       transition: 'all 0.3s ease',
//     },
//     uploadPrompt: {
//       fontSize: '18px',
//       fontWeight: '500',
//       color: colors.dark,
//       marginBottom: '8px',
//     },
//     uploadHint: {
//       color: '#6c757d',
//       marginBottom: '0',
//     },
//     button: {
//       padding: '12px 24px',
//       fontSize: '16px',
//       fontWeight: '500',
//       borderRadius: '8px',
//       border: 'none',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       display: 'inline-flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     primaryButton: {
//       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
//       color: 'white',
//       marginLeft: '10px',
//       boxShadow: '0 4px 14px rgba(67, 97, 238, 0.3)',
//       minWidth: '180px',
//     },
//     secondaryButton: {
//       backgroundColor: 'rgba(67, 97, 238, 0.1)',
//       color: colors.primary,
//     },
//     infoCard: {
//       marginTop: '20px',
//       borderRadius: '12px',
//       padding: '20px',
//       backgroundColor: 'rgba(76, 201, 240, 0.1)',
//       borderLeft: `5px solid ${colors.success}`,
//     },
//     fileInfo: {
//       display: 'flex',
//       backgroundColor: '#fff',
//       borderRadius: '8px',
//       padding: '15px',
//       alignItems: 'center',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//     },
//     fileIcon: {
//       fontSize: '40px',
//       color: '#217346', // Excel green
//       marginRight: '15px',
//     },
//     fileDetails: {
//       flex: 1,
//     },
//     fileName: {
//       fontWeight: '600',
//       fontSize: '16px',
//       marginBottom: '2px',
//       whiteSpace: 'nowrap',
//       overflow: 'hidden',
//       textOverflow: 'ellipsis',
//       maxWidth: '250px',
//     },
//     fileSize: {
//       color: '#6c757d',
//       fontSize: '14px',
//     },
//     deleteButton: {
//       color: colors.accent,
//       fontSize: '18px',
//       cursor: 'pointer',
//     },
//     progressContainer: {
//       marginTop: '20px',
//     },
//     progressBarWrapper: {
//       height: '8px',
//       backgroundColor: 'rgba(67, 97, 238, 0.1)',
//       borderRadius: '4px',
//       margin: '10px 0',
//       overflow: 'hidden',
//       position: 'relative',
//     },
//     progressBar: {
//       height: '100%',
//       borderRadius: '4px',
//       background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.success} 100%)`,
//       transition: 'width 0.3s ease',
//     },
//     progressText: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       fontSize: '14px',
//       color: colors.dark,
//     },
//     successIcon: {
//       fontSize: '40px',
//       color: colors.success,
//       marginRight: '15px',
//     },
//     errorAlert: {
//       backgroundColor: 'rgba(247, 37, 133, 0.1)',
//       color: colors.accent,
//       borderRadius: '8px',
//       padding: '15px',
//       marginTop: '20px',
//       display: 'flex',
//       alignItems: 'center',
//     },
//     confettiCanvas: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       pointerEvents: 'none',
//       zIndex: 10,
//     },
//     uploadComplete: {
//       padding: '20px',
//       textAlign: 'center',
//       maxWidth: '400px',
//       margin: '0 auto',
//     },
//     employeesCard: {
//       marginTop: '30px',
//       borderRadius: '16px',
//       padding: '0',
//       overflow: 'hidden',
//       boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.06)',
//       background: 'rgba(255, 255, 255, 0.95)',
//     },
//     employeesHeader: {
//       background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
//       color: 'white',
//       padding: '20px 30px',
//       position: 'relative',
//       overflow: 'hidden',
//     },
//     employeesTitle: {
//       margin: 0,
//       fontSize: '24px',
//       fontWeight: '600',
//       display: 'flex',
//       alignItems: 'center',
//       position: 'relative',
//       zIndex: 2,
//     },
//     employeesBody: {
//       padding: '20px 30px',
//       maxHeight: '400px',
//       overflowY: 'auto',
//     },
//     employeeItem: {
//       display: 'flex',
//       alignItems: 'center',
//       padding: '15px',
//       borderRadius: '8px',
//       backgroundColor: colors.light,
//       marginBottom: '10px',
//       transition: 'all 0.2s ease',
//       cursor: 'pointer',
//     },
//     employeeItemSelected: {
//       backgroundColor: 'rgba(67, 97, 238, 0.1)',
//       borderLeft: `4px solid ${colors.primary}`,
//     },
//     employeeIcon: {
//       fontSize: '24px',
//       color: colors.primary,
//       marginRight: '15px',
//       backgroundColor: 'rgba(67, 97, 238, 0.1)',
//       borderRadius: '50%',
//       padding: '10px',
//     },
//     employeeInfo: {
//       flex: 1,
//     },
//     employeeName: {
//       margin: '0 0 5px 0',
//       fontWeight: '600',
//       fontSize: '16px',
//     },
//     employeeSheet: {
//       margin: 0,
//       color: '#6c757d',
//       fontSize: '14px',
//     },
//     loadingWrapper: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: '40px 0',
//     },
//     employeeStats: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       padding: '15px 30px',
//       borderTop: '1px solid rgba(0,0,0,0.05)',
//       backgroundColor: 'rgba(67, 97, 238, 0.05)',
//     },
//     statItem: {
//       textAlign: 'center',
//     },
//     statLabel: {
//       fontSize: '14px',
//       color: '#6c757d',
//       margin: '0 0 5px 0',
//     },
//     statValue: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: colors.primary,
//       margin: 0,
//     },
//     searchBar: {
//       position: 'relative',
//       marginBottom: '20px',
//     },
//     searchInput: {
//       width: '100%',
//       padding: '12px 15px 12px 45px',
//       borderRadius: '8px',
//       border: '2px solid rgba(67, 97, 238, 0.2)',
//       fontSize: '16px',
//       transition: 'all 0.3s ease',
//       outline: 'none',
//     },
//     searchIcon: {
//       position: 'absolute',
//       left: '15px',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       color: colors.primary,
//       fontSize: '20px',
//     },
//     actionBar: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '20px',
//       padding: '10px 0',
//       borderBottom: '1px solid rgba(0,0,0,0.05)',
//     },
//     selectAllButton: {
//       background: 'none',
//       border: 'none',
//       color: colors.primary,
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       fontSize: '14px',
//       fontWeight: '500',
//     },
//     checkboxContainer: {
//       width: '24px',
//       height: '24px',
//       borderRadius: '4px',
//       border: `2px solid ${colors.primary}`,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginRight: '15px',
//       flexShrink: 0,
//     },
//     checkboxContainerSelected: {
//       backgroundColor: colors.primary,
//       color: 'white',
//     },
//     generateResumeBtn: {
//       position: 'sticky',
//       bottom: '20px',
//       left: '0',
//       width: '100%',
//       zIndex: 5,
//       backgroundColor: 'rgba(255, 255, 255, 0.95)',
//       padding: '15px 0',
//       boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)',
//       borderTop: '1px solid rgba(0, 0, 0, 0.05)',
//       display: 'flex',
//       justifyContent: 'center',
//     },
//     resumeSuccess: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: '30px 20px',
//       textAlign: 'center',
//     },
//     resumeDownloadBtn: {
//     //   ...styles.button,
//       backgroundColor: colors.success,
//       color: 'white',
//       marginTop: '20px',
//       padding: '12px 25px',
//       textDecoration: 'none',
//       display: 'inline-flex',
//       alignItems: 'center',
//     },
//   };

//   // Create bubble effects for header
//   const bubbles = [];
//   for (let i = 0; i < 8; i++) {
//     const size = Math.floor(Math.random() * 100) + 50;
//     const left = Math.floor(Math.random() * 100);
//     const top = Math.floor(Math.random() * 100) - 50;
//     const opacity = Math.random() * 0.1;
    
//     bubbles.push(
//       <div 
//         key={i}
//         style={{
//           ...styles.headerBubble,
//           width: `${size}px`,
//           height: `${size}px`,
//           left: `${left}%`,
//           top: `${top}%`,
//           opacity,
//         }}
//       />
//     );
//   }

//   // Group employees by department (sheet)
//   const getEmployeesBySheet = () => {
//     const sheetMap = {};
//     filteredEmployees.forEach(emp => {
//       if (!sheetMap[emp.sheet_name]) {
//         sheetMap[emp.sheet_name] = [];
//       }
//       sheetMap[emp.sheet_name].push(emp);
//     });
//     return sheetMap;
//   };

//   const employeesBySheet = getEmployeesBySheet();
//   const sheetCount = Object.keys(employeesBySheet).length;

//   return (
//     <div style={styles.container}>
//       <canvas ref={confettiCanvasRef} style={styles.confettiCanvas} />
      
//       <motion.div 
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//         style={styles.card}
//       >
//         <div style={styles.cardHeader}>
//           {bubbles}
//           <h2 style={styles.headerTitle}>
//             <span style={{ marginRight: '15px', fontSize: '28px' }}>1</span>
//             Upload Your Skill Matrix
//           </h2>
//         </div>
        
//         <div style={styles.cardBody}>
//           <form onSubmit={handleSkillMatrixUpload}>
//             <AnimatePresence mode="wait">
//               {uploadState === 'success' ? (
//                 <motion.div 
//                   key="success-view"
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   transition={{ duration: 0.4 }}
//                   style={styles.uploadComplete}
//                 >
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: [0, 1.2, 1] }}
//                     transition={{ duration: 0.6, times: [0, 0.6, 1] }}
//                   >
//                     <CheckCircleFilled style={{ fontSize: '80px', color: colors.success }} />
//                   </motion.div>
                  
//                   <motion.h3
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3, duration: 0.4 }}
//                     style={{ marginTop: '20px', color: colors.dark }}
//                   >
//                     Upload Complete!
//                   </motion.h3>
                  
//                   <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.5, duration: 0.4 }}
//                     style={{ marginTop: '10px', color: '#6c757d' }}
//                   >
//                     Your skill matrix has been successfully uploaded and processed.
//                   </motion.p>
                  
//                   {fileInfo?.skillMatrix && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.7, duration: 0.4 }}
//                       style={styles.infoCard}
//                     >
//                       <p style={{ margin: 0, fontWeight: '500' }}>
//                         {fileInfo.skillMatrix}
//                       </p>
//                     </motion.div>
//                   )}
                  
//                   <motion.button
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.9, duration: 0.4 }}
//                     type="button"
//                     style={{ ...styles.button, ...styles.primaryButton, marginTop: '30px' }}
//                     onClick={resetUpload}
//                   >
//                     Upload Another File
//                   </motion.button>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="upload-view"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                 >
//                   <div 
//                     ref={uploadAreaRef}
//                     style={{
//                       ...styles.uploadArea,
//                       ...(uploadState === 'dragging' ? styles.uploadAreaDragging : {}),
//                     }}
//                     onClick={() => fileInputRef.current.click()}
//                   >
//                     {selectedFile ? (
//                       <div style={{ width: '100%' }}>
//                         <motion.div 
//                           initial={{ y: 10, opacity: 0 }}
//                           animate={{ y: 0, opacity: 1 }}
//                           style={styles.fileInfo}
//                         >
//                           <FileExcelOutlined style={styles.fileIcon} />
//                           <div style={styles.fileDetails}>
//                             <p style={styles.fileName} title={selectedFile.name}>
//                               {selectedFile.name}
//                             </p>
//                             <p style={styles.fileSize}>
//                               {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
//                             </p>
//                           </div>
//                           {uploadState !== 'uploading' && (
//                             <DeleteOutlined 
//                               style={styles.deleteButton}
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 resetUpload();
//                               }}
//                             />
//                           )}
//                         </motion.div>
                        
//                         {uploadState === 'uploading' && (
//                           <motion.div 
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             style={styles.progressContainer}
//                           >
//                             <div style={styles.progressText}>
//                               <span>Uploading...</span>
//                               <span>{uploadProgress}%</span>
//                             </div>
//                             <div style={styles.progressBarWrapper}>
//                               <motion.div 
//                                 style={styles.progressBar}
//                                 initial={{ width: '0%' }}
//                                 animate={{ width: `${uploadProgress}%` }}
//                               />
//                             </div>
//                             <p style={{ textAlign: 'center', marginTop: '15px', color: '#6c757d' }}>
//                               Please wait while we process your file
//                             </p>
//                           </motion.div>
//                         )}
//                       </div>
//                     ) : (
//                       <motion.div
//                         animate={{ 
//                           y: [0, -10, 0],
//                           transition: { 
//                             repeat: Infinity, 
//                             duration: 2,
//                             repeatType: "reverse"
//                           }
//                         }}
//                       >
//                         <CloudUploadOutlined style={styles.uploadIcon} />
//                         <p style={styles.uploadPrompt}>
//                           {uploadState === 'dragging' 
//                             ? 'Drop your Excel file here' 
//                             : 'Drag & Drop your Excel file here'}
//                         </p>
//                         <p style={styles.uploadHint}>
//                           or click to browse from your device
//                         </p>
//                       </motion.div>
//                     )}
//                   </div>
                  
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept=".xlsx,.xls"
//                     onChange={handleFileChange}
//                     style={{ display: 'none' }}
//                   />
                  
//                   {uploadError && (
//                     <motion.div 
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       style={styles.errorAlert}
//                     >
//                       <span style={{ marginRight: '10px', fontSize: '18px', color: colors.accent }}>⚠️</span>
//                       {uploadError}
//                     </motion.div>
//                   )}
                  
//                   <motion.div 
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }}
//                   >
//                     <button
//                       type="button"
//                       style={{
//                         ...styles.button,
//                         ...styles.secondaryButton,
//                       }}
//                       onClick={() => fileInputRef.current.click()}
//                       >
//                       <UploadOutlined style={{ marginRight: '8px' }} />
//                       Browse Files
//                     </button>
//                     <button
//                       type="submit"
//                       style={{
//                         ...styles.button,
//                         ...styles.primaryButton,
//                         opacity: selectedFile ? 1 : 0.6,
//                       }}
//                       disabled={!selectedFile || uploadState === 'uploading'}
//                     >
//                       {uploadState === 'uploading' ? (
//                         <>
//                           <LoadingOutlined style={{ marginRight: '8px' }} />
//                           Uploading...
//                         </>
//                       ) : (
//                         'Upload Skill Matrix'
//                       )}
//                     </button>
//                   </motion.div>
                  
//                   <motion.div 
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.4 }}
//                     style={styles.infoCard}
//                   >
//                     <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', display: 'flex', alignItems: 'center' }}>
//                       <FileTextOutlined style={{ marginRight: '10px', color: colors.success }} />
//                       Supported File Formats
//                     </h4>
//                     <p style={{ margin: '0', fontSize: '14px', color: '#6c757d' }}>
//                       Please upload an Excel file (.xlsx or .xls) containing your skill matrix data. The file should have employees in rows and skills in columns with ratings.
//                     </p>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </form>
//         </div>
//       </motion.div>
      
//       {/* Employees Section */}
//       {(employees.length > 0 && uploadState === 'success') && (
//         <motion.div 
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
//           style={styles.employeesCard}
//         >
//           <div style={styles.employeesHeader}>
//             {bubbles}
//             <h2 style={styles.employeesTitle}>
//               <span style={{ marginRight: '15px', fontSize: '28px' }}>2</span>
//               Select Employees
//             </h2>
//           </div>
          
//           <div style={{ padding: '30px 30px 0' }}>
//             <div style={styles.searchBar}>
//               <SearchOutlined style={styles.searchIcon} />
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder="Search employees by name..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 style={styles.searchInput}
//               />
//             </div>
            
//             <div style={styles.actionBar}>
//               <button 
//                 style={styles.selectAllButton}
//                 onClick={handleSelectAllEmployees}
//               >
//                 {selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0
//                   ? 'Deselect All'
//                   : 'Select All'}
//               </button>
//               <div>
//                 <span style={{ color: colors.primary, fontWeight: '600' }}>
//                   {selectedEmployees.length}
//                 </span>
//                 <span style={{ color: '#6c757d', marginLeft: '5px' }}>
//                   selected
//                 </span>
//               </div>
//             </div>
//           </div>
          
//           <div style={styles.employeesBody}>
//             {isLoadingEmployees ? (
//               <div style={styles.loadingWrapper}>
//                 <LoadingOutlined style={{ fontSize: '40px', color: colors.primary }} />
//                 <p style={{ marginLeft: '15px', color: '#6c757d' }}>Loading employees...</p>
//               </div>
//             ) : employeeError ? (
//               <div style={styles.errorAlert}>
//                 <span style={{ marginRight: '10px', fontSize: '18px', color: colors.accent }}>⚠️</span>
//                 {employeeError}
//               </div>
//             ) : filteredEmployees.length === 0 ? (
//               <div style={{ textAlign: 'center', padding: '30px 0', color: '#6c757d' }}>
//                 <SearchOutlined style={{ fontSize: '40px', marginBottom: '15px', color: colors.primary }} />
//                 <p>No employees found matching your search criteria.</p>
//               </div>
//             ) : (
//               Object.entries(employeesBySheet).map(([sheetName, emps]) => (
//                 <div key={sheetName} style={{ marginBottom: '25px' }}>
//                   <h3 style={{ 
//                     padding: '8px 15px', 
//                     backgroundColor: 'rgba(67, 97, 238, 0.05)', 
//                     borderRadius: '8px',
//                     margin: '0 0 15px 0',
//                     fontSize: '16px',
//                     display: 'flex',
//                     alignItems: 'center',
//                   }}>
//                     <TeamOutlined style={{ marginRight: '10px', color: colors.primary }} />
//                     {sheetName}
//                     <span style={{ 
//                       marginLeft: '10px', 
//                       fontSize: '14px',
//                       backgroundColor: colors.primary,
//                       color: 'white',
//                       borderRadius: '20px',
//                       padding: '2px 8px',
//                     }}>
//                       {emps.length}
//                     </span>
//                   </h3>
                  
//                   {emps.map(employee => {
//                     const isSelected = selectedEmployees.includes(employee.ID);
                    
//                     return (
//                       <motion.div
//                         key={employee.ID}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.3 }}
//                         style={{
//                           ...styles.employeeItem,
//                           ...(isSelected ? styles.employeeItemSelected : {}),
//                         }}
//                         onClick={() => toggleEmployeeSelection(employee.ID)}
//                       >
//                         <div 
//                           style={{
//                             ...styles.checkboxContainer,
//                             ...(isSelected ? styles.checkboxContainerSelected : {}),
//                           }}
//                         >
//                           {isSelected && <CheckOutlined style={{ fontSize: '16px' }} />}
//                         </div>
                        
//                         <UserOutlined style={styles.employeeIcon} />
                        
//                         <div style={styles.employeeInfo}>
//                           <h4 style={styles.employeeName}>
//                             {employee.first_name} {employee.last_name}
//                           </h4>
//                           <p style={styles.employeeSheet}>
//                             {employee.skills_count} skills documented
//                           </p>
//                         </div>
//                       </motion.div>
//                     );
//                   })}
//                 </div>
//               ))
//             )}
//           </div>
          
//           <div style={styles.employeeStats}>
//             <div style={styles.statItem}>
//               <p style={styles.statLabel}>Total Employees</p>
//               <p style={styles.statValue}>{filteredEmployees.length}</p>
//             </div>
//             <div style={styles.statItem}>
//               <p style={styles.statLabel}>Departments</p>
//               <p style={styles.statValue}>{sheetCount}</p>
//             </div>
//             <div style={styles.statItem}>
//               <p style={styles.statLabel}>Selected</p>
//               <p style={styles.statValue}>{selectedEmployees.length}</p>
//             </div>
//           </div>
          
          
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default UploadSkillMatrix;


// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { UploadOutlined, FileExcelOutlined, CheckCircleFilled, CloudUploadOutlined, DeleteOutlined, LoadingOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
// import confetti from 'canvas-confetti';

// const UploadSkillMatrix = ({ setFilePaths, setFileInfo, fileInfo }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadState, setUploadState] = useState('idle'); // idle, dragging, uploading, success, error
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadError, setUploadError] = useState(null);
//   const [employees, setEmployees] = useState([]);
//   const [isLoadingEmployees, setIsLoadingEmployees] = useState(false);
//   const [employeeError, setEmployeeError] = useState(null);
//   const fileInputRef = useRef(null);
//   const uploadAreaRef = useRef(null);
//   const confettiCanvasRef = useRef(null);

//   // Theme colors
//   const colors = {
//     primary: '#4361ee',
//     secondary: '#3f37c9',
//     success: '#4cc9f0',
//     accent: '#f72585',
//     light: '#f8f9fa',
//     dark: '#212529',
//   };

//   // Trigger success animation
//   const triggerSuccessAnimation = () => {
//     if (confettiCanvasRef.current) {
//       const myConfetti = confetti.create(confettiCanvasRef.current, {
//         resize: true,
//         useWorker: true,
//       });
      
//       myConfetti({
//         particleCount: 100,
//         spread: 70,
//         origin: { y: 0.6 },
//         colors: [colors.primary, colors.success, colors.accent],
//       });
//     }
//   };

//   // Fetch employees list after successful upload
//   const fetchEmployees = async () => {
//     setIsLoadingEmployees(true);
//     setEmployeeError(null);
    
//     try {
//       const response = await fetch('http://localhost:8000/employees/list');
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch employees');
//       }
      
//       const data = await response.json();
//       setEmployees(data);
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//       setEmployeeError('Failed to load employees list. Please try again.');
//     } finally {
//       setIsLoadingEmployees(false);
//     }
//   };

//   // Handle drag events
//   useEffect(() => {
//     const handleDragOver = (e) => {
//       e.preventDefault();
//       if (uploadState !== 'uploading') {
//         setUploadState('dragging');
//       }
//     };

//     const handleDragLeave = (e) => {
//       e.preventDefault();
//       if (uploadState !== 'uploading') {
//         setUploadState('idle');
//       }
//     };

//     const handleDrop = (e) => {
//       e.preventDefault();
//       if (uploadState !== 'uploading') {
//         const file = e.dataTransfer.files[0];
//         if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
//           setSelectedFile(file);
//           setUploadState('idle');
//           setUploadError(null);
//         } else {
//           setUploadError('Please select a valid Excel file (.xlsx or .xls)');
//         }
//       }
//     };

//     const dropArea = uploadAreaRef.current;
//     if (dropArea) {
//       dropArea.addEventListener('dragover', handleDragOver);
//       dropArea.addEventListener('dragleave', handleDragLeave);
//       dropArea.addEventListener('drop', handleDrop);
//     }

//     return () => {
//       if (dropArea) {
//         dropArea.removeEventListener('dragover', handleDragOver);
//         dropArea.removeEventListener('dragleave', handleDragLeave);
//         dropArea.removeEventListener('drop', handleDrop);
//       }
//     };
//   }, [uploadState]);

//   // Handler for file selection
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setUploadError(null);
//       setUploadState('idle');
//     }
//   };

//   // Simulate progress for better UX
//   const simulateProgress = () => {
//     let progress = 0;
//     const interval = setInterval(() => {
//       progress += Math.floor(Math.random() * 8) + 1;
//       if (progress > 95) {
//         clearInterval(interval);
//         progress = 95;
//       }
//       setUploadProgress(progress);
//     }, 200);
//     return interval;
//   };

//   // Handler for skill matrix upload
//   const handleSkillMatrixUpload = async (e) => {
//     e.preventDefault();
//     if (!selectedFile) return;

//     setUploadState('uploading');
//     setUploadError(null);
//     setUploadProgress(0);
    
//     const progressInterval = simulateProgress();
//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     try {
//       const response = await fetch('http://localhost:8000/upload/skill-matrix', {
//         method: 'POST',
//         body: formData
//       });

//       clearInterval(progressInterval);
//       setUploadProgress(100);
      
//       const data = await response.json();
//       if (response.ok) {
//         setFilePaths(prev => ({ ...prev, skillMatrix: data.file_path }));
//         setFileInfo(prev => ({
//           ...prev,
//           skillMatrix: `File uploaded: ${data.filename}. Processed ${data.sheets_processed} sheets with ${data.total_records} records.`
//         }));
//         setUploadState('success');
//         setTimeout(triggerSuccessAnimation, 300);
        
//         // Fetch employees list after successful upload
//         fetchEmployees();
//       } else {
//         setUploadError('Error: ' + data.detail);
//         setUploadState('error');
//       }
//     } catch (error) {
//       clearInterval(progressInterval);
//       console.error('Error:', error);
//       setUploadError('Failed to upload file. Please try again.');
//       setUploadState('error');
//     }
//   };

//   // Reset upload
//   const resetUpload = () => {
//     setSelectedFile(null);
//     setUploadState('idle');
//     setUploadProgress(0);
//     setUploadError(null);
//     setEmployees([]);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   // Custom styles
//   const styles = {
//     container: {
//       position: 'relative',
//       maxWidth: '800px',
//       margin: '0 auto',
//       fontFamily: '"Poppins", sans-serif',
//     },
//     card: {
//       background: 'rgba(255, 255, 255, 0.95)',
//       borderRadius: '16px',
//       padding: '0',
//       overflow: 'hidden',
//       boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.06)',
//       border: 'none',
//       transition: 'all 0.3s ease',
//     },
//     cardHeader: {
//       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
//       color: 'white',
//       padding: '20px 30px',
//       position: 'relative',
//       overflow: 'hidden',
//     },
//     headerTitle: {
//       margin: 0,
//       fontSize: '24px',
//       fontWeight: '600',
//       display: 'flex',
//       alignItems: 'center',
//       position: 'relative',
//       zIndex: 2,
//     },
//     headerBubble: {
//       position: 'absolute',
//       borderRadius: '50%',
//       background: 'rgba(255, 255, 255, 0.1)',
//     },
//     cardBody: {
//       padding: '30px',
//     },
//     uploadArea: {
//       border: `2px dashed ${colors.primary}`,
//       borderRadius: '12px',
//       padding: '40px 20px',
//       textAlign: 'center',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       background: colors.light,
//       position: 'relative',
//       minHeight: '220px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     uploadAreaDragging: {
//       backgroundColor: 'rgba(67, 97, 238, 0.05)',
//       borderColor: colors.success,
//       boxShadow: `0 0 20px rgba(67, 97, 238, 0.2)`,
//     },
//     uploadIcon: {
//       fontSize: '80px',
//       color: colors.primary,
//       margin: '0 auto 15px',
//       display: 'block',
//       transition: 'all 0.3s ease',
//     },
//     uploadPrompt: {
//       fontSize: '18px',
//       fontWeight: '500',
//       color: colors.dark,
//       marginBottom: '8px',
//     },
//     uploadHint: {
//       color: '#6c757d',
//       marginBottom: '0',
//     },
//     button: {
//       padding: '12px 24px',
//       fontSize: '16px',
//       fontWeight: '500',
//       borderRadius: '8px',
//       border: 'none',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       display: 'inline-flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     primaryButton: {
//       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
//       color: 'white',
//       marginLeft: '10px',
//       boxShadow: '0 4px 14px rgba(67, 97, 238, 0.3)',
//       minWidth: '180px',
//     },
//     secondaryButton: {
//       backgroundColor: 'rgba(67, 97, 238, 0.1)',
//       color: colors.primary,
//     },
//     infoCard: {
//       marginTop: '20px',
//       borderRadius: '12px',
//       padding: '20px',
//       backgroundColor: 'rgba(76, 201, 240, 0.1)',
//       borderLeft: `5px solid ${colors.success}`,
//     },
//     fileInfo: {
//       display: 'flex',
//       backgroundColor: '#fff',
//       borderRadius: '8px',
//       padding: '15px',
//       alignItems: 'center',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//     },
//     fileIcon: {
//       fontSize: '40px',
//       color: '#217346', // Excel green
//       marginRight: '15px',
//     },
//     fileDetails: {
//       flex: 1,
//     },
//     fileName: {
//       fontWeight: '600',
//       fontSize: '16px',
//       marginBottom: '2px',
//       whiteSpace: 'nowrap',
//       overflow: 'hidden',
//       textOverflow: 'ellipsis',
//       maxWidth: '250px',
//     },
//     fileSize: {
//       color: '#6c757d',
//       fontSize: '14px',
//     },
//     deleteButton: {
//       color: colors.accent,
//       fontSize: '18px',
//       cursor: 'pointer',
//     },
//     progressContainer: {
//       marginTop: '20px',
//     },
//     progressBarWrapper: {
//       height: '8px',
//       backgroundColor: 'rgba(67, 97, 238, 0.1)',
//       borderRadius: '4px',
//       margin: '10px 0',
//       overflow: 'hidden',
//       position: 'relative',
//     },
//     progressBar: {
//       height: '100%',
//       borderRadius: '4px',
//       background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.success} 100%)`,
//       transition: 'width 0.3s ease',
//     },
//     progressText: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       fontSize: '14px',
//       color: colors.dark,
//     },
//     successIcon: {
//       fontSize: '40px',
//       color: colors.success,
//       marginRight: '15px',
//     },
//     errorAlert: {
//       backgroundColor: 'rgba(247, 37, 133, 0.1)',
//       color: colors.accent,
//       borderRadius: '8px',
//       padding: '15px',
//       marginTop: '20px',
//       display: 'flex',
//       alignItems: 'center',
//     },
//     confettiCanvas: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       pointerEvents: 'none',
//       zIndex: 10,
//     },
//     uploadComplete: {
//       padding: '20px',
//       textAlign: 'center',
//       maxWidth: '400px',
//       margin: '0 auto',
//     },
//     employeesCard: {
//       marginTop: '30px',
//       borderRadius: '16px',
//       padding: '0',
//       overflow: 'hidden',
//       boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.06)',
//       background: 'rgba(255, 255, 255, 0.95)',
//     },
//     employeesHeader: {
//       background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
//       color: 'white',
//       padding: '20px 30px',
//       position: 'relative',
//       overflow: 'hidden',
//     },
//     employeesTitle: {
//       margin: 0,
//       fontSize: '24px',
//       fontWeight: '600',
//       display: 'flex',
//       alignItems: 'center',
//       position: 'relative',
//       zIndex: 2,
//     },
//     employeesBody: {
//       padding: '20px 30px',
//       maxHeight: '400px',
//       overflowY: 'auto',
//     },
//     employeeItem: {
//       display: 'flex',
//       alignItems: 'center',
//       padding: '15px',
//       borderRadius: '8px',
//       backgroundColor: colors.light,
//       marginBottom: '10px',
//       transition: 'all 0.2s ease',
//     },
//     employeeIcon: {
//       fontSize: '24px',
//       color: colors.primary,
//       marginRight: '15px',
//       backgroundColor: 'rgba(67, 97, 238, 0.1)',
//       borderRadius: '50%',
//       padding: '10px',
//     },
//     employeeInfo: {
//       flex: 1,
//     },
//     employeeName: {
//       margin: '0 0 5px 0',
//       fontWeight: '600',
//       fontSize: '16px',
//     },
//     employeeSheet: {
//       margin: 0,
//       color: '#6c757d',
//       fontSize: '14px',
//     },
//     loadingWrapper: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: '40px 0',
//     },
//     employeeStats: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       padding: '15px 30px',
//       borderTop: '1px solid rgba(0,0,0,0.05)',
//       backgroundColor: 'rgba(67, 97, 238, 0.05)',
//     },
//     statItem: {
//       textAlign: 'center',
//     },
//     statLabel: {
//       fontSize: '14px',
//       color: '#6c757d',
//       margin: '0 0 5px 0',
//     },
//     statValue: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: colors.primary,
//       margin: 0,
//     },
//   };

//   // Create bubble effects for header
//   const bubbles = [];
//   for (let i = 0; i < 8; i++) {
//     const size = Math.floor(Math.random() * 100) + 50;
//     const left = Math.floor(Math.random() * 100);
//     const top = Math.floor(Math.random() * 100) - 50;
//     const opacity = Math.random() * 0.1;
    
//     bubbles.push(
//       <div 
//         key={i}
//         style={{
//           ...styles.headerBubble,
//           width: `${size}px`,
//           height: `${size}px`,
//           left: `${left}%`,
//           top: `${top}%`,
//           opacity,
//         }}
//       />
//     );
//   }

//   // Group employees by department (sheet)
//   const getEmployeesBySheet = () => {
//     const sheetMap = {};
//     employees.forEach(emp => {
//       if (!sheetMap[emp.sheet_name]) {
//         sheetMap[emp.sheet_name] = [];
//       }
//       sheetMap[emp.sheet_name].push(emp);
//     });
//     return sheetMap;
//   };

//   const employeesBySheet = getEmployeesBySheet();
//   const sheetCount = Object.keys(employeesBySheet).length;

//   return (
//     <div style={styles.container}>
//       <canvas ref={confettiCanvasRef} style={styles.confettiCanvas} />
      
//       <motion.div 
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//         style={styles.card}
//       >
//         <div style={styles.cardHeader}>
//           {bubbles}
//           <h2 style={styles.headerTitle}>
//             <span style={{ marginRight: '15px', fontSize: '28px' }}>1</span>
//             Upload Your Skill Matrix
//           </h2>
//         </div>
        
//         <div style={styles.cardBody}>
//           <form onSubmit={handleSkillMatrixUpload}>
//             <AnimatePresence mode="wait">
//               {uploadState === 'success' ? (
//                 <motion.div 
//                   key="success-view"
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   transition={{ duration: 0.4 }}
//                   style={styles.uploadComplete}
//                 >
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: [0, 1.2, 1] }}
//                     transition={{ duration: 0.6, times: [0, 0.6, 1] }}
//                   >
//                     <CheckCircleFilled style={{ fontSize: '80px', color: colors.success }} />
//                   </motion.div>
                  
//                   <motion.h3
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3, duration: 0.4 }}
//                     style={{ marginTop: '20px', color: colors.dark }}
//                   >
//                     Upload Complete!
//                   </motion.h3>
                  
//                   <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.5, duration: 0.4 }}
//                     style={{ marginTop: '10px', color: '#6c757d' }}
//                   >
//                     Your skill matrix has been successfully uploaded and processed.
//                   </motion.p>
                  
//                   {fileInfo?.skillMatrix && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.7, duration: 0.4 }}
//                       style={styles.infoCard}
//                     >
//                       <p style={{ margin: 0, fontWeight: '500' }}>
//                         {fileInfo.skillMatrix}
//                       </p>
//                     </motion.div>
//                   )}
                  
//                   <motion.button
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.9, duration: 0.4 }}
//                     type="button"
//                     style={{ ...styles.button, ...styles.primaryButton, marginTop: '30px' }}
//                     onClick={resetUpload}
//                   >
//                     Upload Another File
//                   </motion.button>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="upload-view"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                 >
//                   <div 
//                     ref={uploadAreaRef}
//                     style={{
//                       ...styles.uploadArea,
//                       ...(uploadState === 'dragging' ? styles.uploadAreaDragging : {}),
//                     }}
//                     onClick={() => fileInputRef.current.click()}
//                   >
//                     {selectedFile ? (
//                       <div style={{ width: '100%' }}>
//                         <motion.div 
//                           initial={{ y: 10, opacity: 0 }}
//                           animate={{ y: 0, opacity: 1 }}
//                           style={styles.fileInfo}
//                         >
//                           <FileExcelOutlined style={styles.fileIcon} />
//                           <div style={styles.fileDetails}>
//                             <p style={styles.fileName} title={selectedFile.name}>
//                               {selectedFile.name}
//                             </p>
//                             <p style={styles.fileSize}>
//                               {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
//                             </p>
//                           </div>
//                           {uploadState !== 'uploading' && (
//                             <DeleteOutlined 
//                               style={styles.deleteButton}
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 resetUpload();
//                               }}
//                             />
//                           )}
//                         </motion.div>
                        
//                         {uploadState === 'uploading' && (
//                           <motion.div 
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             style={styles.progressContainer}
//                           >
//                             <div style={styles.progressText}>
//                               <span>Uploading...</span>
//                               <span>{uploadProgress}%</span>
//                             </div>
//                             <div style={styles.progressBarWrapper}>
//                               <motion.div 
//                                 style={styles.progressBar}
//                                 initial={{ width: '0%' }}
//                                 animate={{ width: `${uploadProgress}%` }}
//                               />
//                             </div>
//                             <p style={{ textAlign: 'center', marginTop: '15px', color: '#6c757d' }}>
//                               Please wait while we process your file
//                             </p>
//                           </motion.div>
//                         )}
//                       </div>
//                     ) : (
//                       <motion.div
//                         animate={{ 
//                           y: [0, -10, 0],
//                           transition: { 
//                             repeat: Infinity, 
//                             duration: 2,
//                             repeatType: "reverse"
//                           }
//                         }}
//                       >
//                         <CloudUploadOutlined style={styles.uploadIcon} />
//                         <p style={styles.uploadPrompt}>
//                           {uploadState === 'dragging' 
//                             ? 'Drop your Excel file here' 
//                             : 'Drag & Drop your Excel file here'}
//                         </p>
//                         <p style={styles.uploadHint}>
//                           or click to browse from your device
//                         </p>
//                       </motion.div>
//                     )}
//                   </div>
                  
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept=".xlsx,.xls"
//                     onChange={handleFileChange}
//                     style={{ display: 'none' }}
//                   />
                  
//                   {uploadError && (
//                     <motion.div 
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       style={styles.errorAlert}
//                     >
//                       <span style={{ marginRight: '10px', fontSize: '18px', color: colors.accent }}>⚠️</span>
//                       {uploadError}
//                     </motion.div>
//                   )}
                  
//                   <motion.div 
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }}
//                   >
//                     <button
//                       type="button"
//                       style={{
//                         ...styles.button,
//                         ...styles.secondaryButton,
//                       }}
//                       onClick={() => fileInputRef.current.click()}
//                       disabled={uploadState === 'uploading'}
//                     >
//                       <UploadOutlined style={{ marginRight: '8px' }} />
//                       Browse Files
//                     </button>
                    
//                     <button
//                       type="submit"
//                       style={{
//                         ...styles.button,
//                         ...styles.primaryButton,
//                         opacity: (!selectedFile || uploadState === 'uploading') ? 0.6 : 1,
//                       }}
//                       disabled={!selectedFile || uploadState === 'uploading'}
//                     >
//                       {uploadState === 'uploading' ? (
//                         <>
//                           <LoadingOutlined style={{ marginRight: '8px' }} spin />
//                           Processing...
//                         </>
//                       ) : (
//                         'Upload Skill Matrix'
//                       )}
//                     </button>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </form>
//         </div>
//       </motion.div>

//       {/* Employee List Section */}
//       {uploadState === 'success' && (
//         <motion.div 
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
//           style={styles.employeesCard}
//         >
//           <div style={styles.employeesHeader}>
//             {bubbles}
//             <h2 style={styles.employeesTitle}>
//               <TeamOutlined style={{ marginRight: '15px' }} />
//               Employee List
//             </h2>
//           </div>
          
//           <div style={styles.employeesBody}>
//             {isLoadingEmployees ? (
//               <div style={styles.loadingWrapper}>
//                 <LoadingOutlined style={{ fontSize: '40px', color: colors.primary }} spin />
//                 <p style={{ marginLeft: '15px', color: '#6c757d' }}>Loading employees...</p>
//               </div>
//             ) : employeeError ? (
//               <div style={styles.errorAlert}>
//                 <span style={{ marginRight: '10px', fontSize: '18px', color: colors.accent }}>⚠️</span>
//                 {employeeError}
//               </div>
//             ) : employees.length === 0 ? (
//               <p style={{ textAlign: 'center', color: '#6c757d' }}>No employees found in the uploaded file.</p>
//             ) : (
//               <>
//                 {Object.entries(employeesBySheet).map(([sheetName, emps]) => (
//                   <div key={sheetName} style={{ marginBottom: '20px' }}>
//                     <h3 style={{ 
//                       color: colors.primary, 
//                       borderBottom: `2px solid ${colors.primary}`, 
//                       paddingBottom: '10px',
//                       marginTop: '20px'
//                     }}>
//                       {sheetName}
//                     </h3>
//                     {emps.map((emp) => (
//                       <motion.div 
//                         key={emp.ID}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         whileHover={{ 
//                           backgroundColor: 'rgba(67, 97, 238, 0.05)',
//                           boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
//                         }}
//                         style={styles.employeeItem}
//                       >
//                         <UserOutlined style={styles.employeeIcon} />
//                         <div style={styles.employeeInfo}>
//                           <h4 style={styles.employeeName}>
//                             {emp.first_name} {emp.last_name}
//                           </h4>
//                           <p style={styles.employeeSheet}>
//                             ID: {emp.ID}
//                           </p>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 ))}
//               </>
//             )}
//           </div>
          
//           {employees.length > 0 && (
//             <div style={styles.employeeStats}>
//               <div style={styles.statItem}>
//                 <p style={styles.statLabel}>Total Employees</p>
//                 <p style={styles.statValue}>{employees.length}</p>
//               </div>
//               <div style={styles.statItem}>
//                 <p style={styles.statLabel}>Departments</p>
//                 <p style={styles.statValue}>{sheetCount}</p>
//               </div>
//             </div>
//           )}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default UploadSkillMatrix;



// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   UploadOutlined, 
//   FileExcelOutlined, 
//   CheckCircleFilled, 
//   CloudUploadOutlined, 
//   DeleteOutlined, 
//   LoadingOutlined,
//   SearchOutlined,
//   UserOutlined
// } from '@ant-design/icons';
// import confetti from 'canvas-confetti';

// const UploadSkillMatrix = ({ setFilePaths, setFileInfo, fileInfo }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadState, setUploadState] = useState('idle'); // idle, dragging, uploading, success, error
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadError, setUploadError] = useState(null);
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
  
//   const fileInputRef = useRef(null);
//   const uploadAreaRef = useRef(null);
//   const confettiCanvasRef = useRef(null);
//   const dropdownRef = useRef(null);

//   // Theme colors
//   const colors = {
//     primary: '#4361ee',
//     secondary: '#3f37c9',
//     success: '#4cc9f0',
//     accent: '#f72585',
//     light: '#f8f9fa',
//     dark: '#212529',
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     }
    
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Filter employees when search term changes
//   useEffect(() => {
//     if (employees.length) {
//       const filtered = employees.filter(emp => {
//         const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
//         return fullName.includes(searchTerm.toLowerCase()) || 
//                emp.id.toString().includes(searchTerm);
//       });
//       setFilteredEmployees(filtered);
//     }
//   }, [searchTerm, employees]);

//   // Trigger success animation
//   const triggerSuccessAnimation = () => {
//     if (confettiCanvasRef.current) {
//       const myConfetti = confetti.create(confettiCanvasRef.current, {
//         resize: true,
//         useWorker: true,
//       });
      
//       myConfetti({
//         particleCount: 100,
//         spread: 70,
//         origin: { y: 0.6 },
//         colors: [colors.primary, colors.success, colors.accent],
//       });
//     }
//   };

//   // Handle drag events
//   useEffect(() => {
//     const handleDragOver = (e) => {
//       e.preventDefault();
//       if (uploadState !== 'uploading') {
//         setUploadState('dragging');
//       }
//     };

//     const handleDragLeave = (e) => {
//       e.preventDefault();
//       if (uploadState !== 'uploading') {
//         setUploadState('idle');
//       }
//     };

//     const handleDrop = (e) => {
//       e.preventDefault();
//       if (uploadState !== 'uploading') {
//         const file = e.dataTransfer.files[0];
//         if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
//           setSelectedFile(file);
//           setUploadState('idle');
//           setUploadError(null);
//         } else {
//           setUploadError('Please select a valid Excel file (.xlsx or .xls)');
//         }
//       }
//     };

//     const dropArea = uploadAreaRef.current;
//     if (dropArea) {
//       dropArea.addEventListener('dragover', handleDragOver);
//       dropArea.addEventListener('dragleave', handleDragLeave);
//       dropArea.addEventListener('drop', handleDrop);
//     }

//     return () => {
//       if (dropArea) {
//         dropArea.removeEventListener('dragover', handleDragOver);
//         dropArea.removeEventListener('dragleave', handleDragLeave);
//         dropArea.removeEventListener('drop', handleDrop);
//       }
//     };
//   }, [uploadState]);

//   // Handler for file selection
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setUploadError(null);
//       setUploadState('idle');
//     }
//   };

//   // Simulate progress for better UX
//   const simulateProgress = () => {
//     let progress = 0;
//     const interval = setInterval(() => {
//       progress += Math.floor(Math.random() * 8) + 1;
//       if (progress > 95) {
//         clearInterval(interval);
//         progress = 95;
//       }
//       setUploadProgress(progress);
//     }, 200);
//     return interval;
//   };

//   // Fetch employees after successful upload
//   const fetchEmployees = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/get/employees', {
//         method: 'GET',
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         // Transform data into a more usable format
//         const formattedEmployees = data.map(emp => ({
//           id: emp.ID || emp.Id || '',
//           firstName: emp.First_Name || emp["First Name"] || '',
//           lastName: emp.Last_Name || emp["Last Name"] || '',
//           experience: emp.Experience || '',
//           sheetName: emp["Sheet Name"] || ''
//         }));
        
//         setEmployees(formattedEmployees);
//         setFilteredEmployees(formattedEmployees);
//       } else {
//         console.error('Failed to fetch employees');
//       }
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };

//   // Handler for skill matrix upload
//   const handleSkillMatrixUpload = async (e) => {
//     e.preventDefault();
//     if (!selectedFile) return;

//     setUploadState('uploading');
//     setUploadError(null);
//     setUploadProgress(0);
    
//     const progressInterval = simulateProgress();
//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     try {
//       const response = await fetch('http://localhost:8000/upload/skill-matrix', {
//         method: 'POST',
//         body: formData
//       });

//       clearInterval(progressInterval);
//       setUploadProgress(100);
      
//       const data = await response.json();
//       if (response.ok) {
//         setFilePaths(prev => ({ ...prev, skillMatrix: data.file_path }));
//         setFileInfo(prev => ({
//           ...prev,
//           skillMatrix: `File uploaded: ${data.filename}. Processed ${data.sheets_processed} sheets with ${data.total_records} records.`
//         }));
//         setUploadState('success');
//         setTimeout(triggerSuccessAnimation, 300);
        
//         // After successful upload, fetch the employees list
//         await fetchEmployees();
//       } else {
//         setUploadError('Error: ' + data.detail);
//         setUploadState('error');
//       }
//     } catch (error) {
//       clearInterval(progressInterval);
//       console.error('Error:', error);
//       setUploadError('Failed to upload file. Please try again.');
//       setUploadState('error');
//     }
//   };

//   // Reset upload
//   const resetUpload = () => {
//     setSelectedFile(null);
//     setUploadState('idle');
//     setUploadProgress(0);
//     setUploadError(null);
//     setSelectedEmployee(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   // Handle employee selection
//   const handleEmployeeSelect = (employee) => {
//     setSelectedEmployee(employee);
//     setIsDropdownOpen(false);
//     setSearchTerm('');
//     // Here you can add additional functionality when an employee is selected
//     // For example, redirect to employee details page or load their skills
//   };

//   // Custom styles
//   const styles = {
//     container: {
//       position: 'relative',
//       maxWidth: '800px',
//       margin: '0 auto',
//       fontFamily: '"Poppins", sans-serif',
//     },
//     card: {
//       background: 'rgba(255, 255, 255, 0.95)',
//       borderRadius: '16px',
//       padding: '0',
//       overflow: 'hidden',
//       boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.06)',
//       border: 'none',
//       transition: 'all 0.3s ease',
//     },
//     cardHeader: {
//       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
//       color: 'white',
//       padding: '20px 30px',
//       position: 'relative',
//       overflow: 'hidden',
//     },
//     headerTitle: {
//       margin: 0,
//       fontSize: '24px',
//       fontWeight: '600',
//       display: 'flex',
//       alignItems: 'center',
//       position: 'relative',
//       zIndex: 2,
//     },
//     headerBubble: {
//       position: 'absolute',
//       borderRadius: '50%',
//       background: 'rgba(255, 255, 255, 0.1)',
//     },
//     cardBody: {
//       padding: '30px',
//     },
//     uploadArea: {
//       border: `2px dashed ${colors.primary}`,
//       borderRadius: '12px',
//       padding: '40px 20px',
//       textAlign: 'center',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       background: colors.light,
//       position: 'relative',
//       minHeight: '220px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     uploadAreaDragging: {
//       backgroundColor: 'rgba(67, 97, 238, 0.05)',
//       borderColor: colors.success,
//       boxShadow: `0 0 20px rgba(67, 97, 238, 0.2)`,
//     },
//     uploadIcon: {
//       fontSize: '80px',
//       color: colors.primary,
//       margin: '0 auto 15px',
//       display: 'block',
//       transition: 'all 0.3s ease',
//     },
//     uploadPrompt: {
//       fontSize: '18px',
//       fontWeight: '500',
//       color: colors.dark,
//       marginBottom: '8px',
//     },
//     uploadHint: {
//       color: '#6c757d',
//       marginBottom: '0',
//     },
//     button: {
//       padding: '12px 24px',
//       fontSize: '16px',
//       fontWeight: '500',
//       borderRadius: '8px',
//       border: 'none',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       display: 'inline-flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     primaryButton: {
//       background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
//       color: 'white',
//       marginLeft: '10px',
//       boxShadow: '0 4px 14px rgba(67, 97, 238, 0.3)',
//       minWidth: '180px',
//     },
//     secondaryButton: {
//       backgroundColor: 'rgba(67, 97, 238, 0.1)',
//       color: colors.primary,
//     },
//     infoCard: {
//       marginTop: '20px',
//       borderRadius: '12px',
//       padding: '20px',
//       backgroundColor: 'rgba(76, 201, 240, 0.1)',
//       borderLeft: `5px solid ${colors.success}`,
//     },
//     fileInfo: {
//       display: 'flex',
//       backgroundColor: '#fff',
//       borderRadius: '8px',
//       padding: '15px',
//       alignItems: 'center',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//     },
//     fileIcon: {
//       fontSize: '40px',
//       color: '#217346', // Excel green
//       marginRight: '15px',
//     },
//     fileDetails: {
//       flex: 1,
//     },
//     fileName: {
//       fontWeight: '600',
//       fontSize: '16px',
//       marginBottom: '2px',
//       whiteSpace: 'nowrap',
//       overflow: 'hidden',
//       textOverflow: 'ellipsis',
//       maxWidth: '250px',
//     },
//     fileSize: {
//       color: '#6c757d',
//       fontSize: '14px',
//     },
//     deleteButton: {
//       color: colors.accent,
//       fontSize: '18px',
//       cursor: 'pointer',
//     },
//     progressContainer: {
//       marginTop: '20px',
//     },
//     progressBarWrapper: {
//       height: '8px',
//       backgroundColor: 'rgba(67, 97, 238, 0.1)',
//       borderRadius: '4px',
//       margin: '10px 0',
//       overflow: 'hidden',
//       position: 'relative',
//     },
//     progressBar: {
//       height: '100%',
//       borderRadius: '4px',
//       background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.success} 100%)`,
//       transition: 'width 0.3s ease',
//     },
//     progressText: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       fontSize: '14px',
//       color: colors.dark,
//     },
//     successIcon: {
//       fontSize: '40px',
//       color: colors.success,
//       marginRight: '15px',
//     },
//     errorAlert: {
//       backgroundColor: 'rgba(247, 37, 133, 0.1)',
//       color: colors.accent,
//       borderRadius: '8px',
//       padding: '15px',
//       marginTop: '20px',
//       display: 'flex',
//       alignItems: 'center',
//     },
//     confettiCanvas: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       pointerEvents: 'none',
//       zIndex: 10,
//     },
//     uploadComplete: {
//       padding: '20px',
//       textAlign: 'center',
//       maxWidth: '400px',
//       margin: '0 auto',
//     },
//     employeeSelectionContainer: {
//       marginTop: '30px',
//       width: '100%',
//     },
//     employeeSelectionTitle: {
//       fontSize: '20px',
//       fontWeight: '600',
//       marginBottom: '15px',
//       color: colors.dark,
//     },
//     searchContainer: {
//       position: 'relative',
//       marginBottom: '20px',
//     },
//     searchInput: {
//       width: '100%',
//       padding: '12px 20px 12px 45px',
//       fontSize: '16px',
//       borderRadius: '8px',
//       border: '2px solid rgba(67, 97, 238, 0.2)',
//       transition: 'all 0.3s ease',
//       outline: 'none',
//     },
//     searchIcon: {
//       position: 'absolute',
//       left: '15px',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       color: colors.primary,
//       fontSize: '20px',
//     },
//     dropdownContainer: {
//       position: 'relative',
//       marginTop: '10px',
//       zIndex: 5,
//     },
//     dropdownTrigger: {
//       width: '100%',
//       padding: '12px 20px',
//       fontSize: '16px',
//       borderRadius: '8px',
//       border: '2px solid rgba(67, 97, 238, 0.2)',
//       backgroundColor: 'white',
//       cursor: 'pointer',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       transition: 'all 0.3s ease',
//     },
//     dropdownTriggerActive: {
//       borderColor: colors.primary,
//       boxShadow: '0 0 0 3px rgba(67, 97, 238, 0.1)',
//     },
//     dropdownMenu: {
//       position: 'absolute',
//       top: 'calc(100% + 5px)',
//       left: 0,
//       width: '100%',
//       maxHeight: '300px',
//       overflowY: 'auto',
//       backgroundColor: 'white',
//       borderRadius: '8px',
//       boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
//       border: '1px solid rgba(0, 0, 0, 0.1)',
//       zIndex: 10,
//     },
//     dropdownItem: {
//       padding: '12px 20px',
//       borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
//       cursor: 'pointer',
//       transition: 'background-color 0.2s',
//     },
//     dropdownItemHover: {
//       backgroundColor: 'rgba(67, 97, 238, 0.05)',
//     },
//     selectedEmployeeContainer: {
//       marginTop: '20px',
//       padding: '20px',
//       borderRadius: '12px',
//       backgroundColor: 'rgba(67, 97, 238, 0.05)',
//       border: '1px solid rgba(67, 97, 238, 0.1)',
//     },
//     selectedEmployeeTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       marginBottom: '10px',
//       color: colors.primary,
//     },
//     selectedEmployeeInfo: {
//       display: 'grid',
//       gridTemplateColumns: 'auto 1fr',
//       gap: '10px 15px',
//     },
//     selectedEmployeeLabel: {
//       fontWeight: '600',
//       color: colors.dark,
//     },
//     selectedEmployeeValue: {
//       color: '#6c757d',
//     },
//     emptyState: {
//       padding: '30px',
//       textAlign: 'center',
//       color: '#6c757d',
//     },
//     userIcon: {
//       fontSize: '16px',
//       marginRight: '8px',
//       color: colors.primary,
//     },
//   };

//   // Create bubble effects for header
//   const bubbles = [];
//   for (let i = 0; i < 8; i++) {
//     const size = Math.floor(Math.random() * 100) + 50;
//     const left = Math.floor(Math.random() * 100);
//     const top = Math.floor(Math.random() * 100) - 50;
//     const opacity = Math.random() * 0.1;
    
//     bubbles.push(
//       <div 
//         key={i}
//         style={{
//           ...styles.headerBubble,
//           width: `${size}px`,
//           height: `${size}px`,
//           left: `${left}%`,
//           top: `${top}%`,
//           opacity,
//         }}
//       />
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <canvas ref={confettiCanvasRef} style={styles.confettiCanvas} />
      
//       <motion.div 
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//         style={styles.card}
//       >
//         <div style={styles.cardHeader}>
//           {bubbles}
//           <h2 style={styles.headerTitle}>
//             <span style={{ marginRight: '15px', fontSize: '28px' }}>1</span>
//             Upload Your Skill Matrix
//           </h2>
//         </div>
        
//         <div style={styles.cardBody}>
//           <form onSubmit={handleSkillMatrixUpload}>
//             <AnimatePresence mode="wait">
//               {uploadState === 'success' ? (
//                 <motion.div 
//                   key="success-view"
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   transition={{ duration: 0.4 }}
//                 >
//                   <div style={styles.uploadComplete}>
//                     <motion.div
//                       initial={{ scale: 0 }}
//                       animate={{ scale: [0, 1.2, 1] }}
//                       transition={{ duration: 0.6, times: [0, 0.6, 1] }}
//                     >
//                       <CheckCircleFilled style={{ fontSize: '80px', color: colors.success }} />
//                     </motion.div>
                    
//                     <motion.h3
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.3, duration: 0.4 }}
//                       style={{ marginTop: '20px', color: colors.dark }}
//                     >
//                       Upload Complete!
//                     </motion.h3>
                    
//                     <motion.p
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.5, duration: 0.4 }}
//                       style={{ marginTop: '10px', color: '#6c757d' }}
//                     >
//                       Your skill matrix has been successfully uploaded and processed.
//                     </motion.p>
                    
//                     {fileInfo?.skillMatrix && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.7, duration: 0.4 }}
//                         style={styles.infoCard}
//                       >
//                         <p style={{ margin: 0, fontWeight: '500' }}>
//                           {fileInfo.skillMatrix}
//                         </p>
//                       </motion.div>
//                     )}
//                   </div>
                  
//                   {/* Employee Selection Section */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.8, duration: 0.4 }}
//                     style={styles.employeeSelectionContainer}
//                   >
//                     <h3 style={styles.employeeSelectionTitle}>Select an Employee</h3>
                    
//                     <div style={styles.searchContainer}>
//                       <SearchOutlined style={styles.searchIcon} />
//                       <input
//                         type="text"
//                         placeholder="Search by name or ID..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         style={styles.searchInput}
//                         onClick={() => setIsDropdownOpen(true)}
//                       />
//                     </div>
                    
//                     <div style={styles.dropdownContainer} ref={dropdownRef}>
//                       <div 
//                         style={{
//                           ...styles.dropdownTrigger,
//                           ...(isDropdownOpen ? styles.dropdownTriggerActive : {})
//                         }}
//                         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                       >
//                         <span>
//                           <UserOutlined style={styles.userIcon} />
//                           {selectedEmployee 
//                             ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}`
//                             : 'Select an employee'}
//                         </span>
//                         <span>{isDropdownOpen ? '▲' : '▼'}</span>
//                       </div>
                      
//                       {isDropdownOpen && (
//                         <motion.div 
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -10 }}
//                           style={styles.dropdownMenu}
//                         >
//                           {filteredEmployees.length > 0 ? (
//                             filteredEmployees.map((employee) => (
//                               <div
//                                 key={`${employee.id}-${employee.firstName}-${employee.lastName}`}
//                                 style={styles.dropdownItem}
//                                 className="dropdown-item"
//                                 onClick={() => handleEmployeeSelect(employee)}
//                                 onMouseEnter={(e) => {
//                                   e.currentTarget.style.backgroundColor = 'rgba(67, 97, 238, 0.05)';
//                                 }}
//                                 onMouseLeave={(e) => {
//                                   e.currentTarget.style.backgroundColor = '';
//                                 }}
//                               >
//                                 <strong>{employee.firstName} {employee.lastName}</strong>
//                                 <div style={{ fontSize: '14px', color: '#6c757d' }}>
//                                   ID: {employee.id}, Experience: {employee.experience || 'N/A'}
//                                 </div>
//                               </div>
//                             ))
//                           ) : (
//                             <div style={styles.emptyState}>
//                               {searchTerm 
//                                 ? 'No employees match your search'
//                                 : employees.length === 0 
//                                   ? 'No employees found in the skill matrix'
//                                   : 'Loading employees...'}
//                             </div>
//                           )}
//                         </motion.div>
//                       )}
//                     </div>
                    
//                     {selectedEmployee && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.3 }}
//                         style={styles.selectedEmployeeContainer}
//                       >
//                         <h4 style={styles.selectedEmployeeTitle}>Selected Employee Details</h4>
//                         <div style={styles.selectedEmployeeInfo}>
//                           <span style={styles.selectedEmployeeLabel}>ID:</span>
//                           <span style={styles.selectedEmployeeValue}>{selectedEmployee.id}</span>
                          
//                           <span style={styles.selectedEmployeeLabel}>First Name:</span>
//                           <span style={styles.selectedEmployeeValue}>{selectedEmployee.firstName}</span>
                          
//                           <span style={styles.selectedEmployeeLabel}>Last Name:</span>
//                           <span style={styles.selectedEmployeeValue}>{selectedEmployee.lastName}</span>
                          
//                           <span style={styles.selectedEmployeeLabel}>Experience:</span>
//                           <span style={styles.selectedEmployeeValue}>{selectedEmployee.experience || 'N/A'}</span>
                          
//                           <span style={styles.selectedEmployeeLabel}>Sheet:</span>
//                           <span style={styles.selectedEmployeeValue}>{selectedEmployee.sheetName || 'N/A'}</span>
//                         </div>
//                       </motion.div>
//                     )}
//                   </motion.div>
                  
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 1.1, duration: 0.4 }}
//                     style={{ textAlign: 'center', marginTop: '30px' }}
//                   >
//                     <button
//                       type="button"
//                       style={{ ...styles.button, ...styles.primaryButton }}
//                       onClick={resetUpload}
//                     >
//                       Upload Another File
//                     </button>
//                   </motion.div>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="upload-view"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                 >
//                   <div 
//                     ref={uploadAreaRef}
//                     style={{
//                       ...styles.uploadArea,
//                       ...(uploadState === 'dragging' ? styles.uploadAreaDragging : {}),
//                     }}
//                     onClick={() => fileInputRef.current.click()}
//                   >
//                     {selectedFile ? (
//                       <div style={{ width: '100%' }}>
//                         <motion.div 
//                           initial={{ y: 10, opacity: 0 }}
//                           animate={{ y: 0, opacity: 1 }}
//                           style={styles.fileInfo}
//                         >
//                           <FileExcelOutlined style={styles.fileIcon} />
//                           <div style={styles.fileDetails}>
//                             <p style={styles.fileName} title={selectedFile.name}>
//                               {selectedFile.name}
//                             </p>
//                             <p style={styles.fileSize}>
//                               {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
//                             </p>
//                           </div>
//                           {uploadState !== 'uploading' && (
//                             <DeleteOutlined 
//                               style={styles.deleteButton}
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 resetUpload();
//                               }}
//                             />
//                           )}
//                         </motion.div>
                        
//                         {uploadState === 'uploading' && (
//                           <motion.div 
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             style={styles.progressContainer}
//                           >
//                             <div style={styles.progressText}>
//                               <span>Uploading...</span>
//                               <span>{uploadProgress}%</span>
//                             </div>
//                             <div style={styles.progressBarWrapper}>
//                               <motion.div 
//                                 style={styles.progressBar}
//                                 initial={{ width: '0%' }}
//                                 animate={{ width: `${uploadProgress}%` }}
//                               />
//                             </div>
//                             <p style={{ textAlign: 'center', marginTop: '15px', color: '#6c757d' }}>
//                               Please wait while we process your file
//                             </p>
//                           </motion.div>
//                         )}
//                       </div>
//                     ) : (
//                       <motion.div
//                         animate={{ 
//                           y: [0, -10, 0],
//                           transition: { 
//                             repeat: Infinity, 
//                             duration: 2,
//                             repeatType: "reverse"
//                           }
//                         }}
//                       >
//                         <CloudUploadOutlined style={styles.uploadIcon} />
//                         <p style={styles.uploadPrompt}>
//                           {uploadState === 'dragging' 
//                             ? 'Drop your Excel file here' 
//                             : 'Drag & Drop your Excel file here'}
//                         </p>
//                         <p style={styles.uploadHint}>
//                           or click to browse from your device
//                         </p>
//                       </motion.div>
//                     )}
//                   </div>
                  
//             <input
//                     ref={fileInputRef}
                    
                    
                    
//     type="file"
//     accept=".xlsx,.xls"
//     onChange={handleFileChange}
//     style={{ display: 'none' }}
//   />
  
//   {uploadError && (
//     <motion.div 
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       style={styles.errorAlert}
//     >
//       <span style={{ marginRight: '10px', color: colors.accent }}>⚠️</span>
//       {uploadError}
//     </motion.div>
//   )}
  
//   <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
//     <button
//       type="button"
//       style={{ ...styles.button, ...styles.secondaryButton }}
//       onClick={() => fileInputRef.current.click()}
//     >
//       <UploadOutlined style={{ marginRight: '8px' }} />
//       Browse Files
//     </button>
    
//     <button
//       type="submit"
//       style={{ ...styles.button, ...styles.primaryButton }}
//       disabled={!selectedFile || uploadState === 'uploading'}
//     >
//       {uploadState === 'uploading' ? (
//         <>
//           <LoadingOutlined style={{ marginRight: '8px' }} />
//           Uploading...
//         </>
//       ) : (
//         <>
//           <CloudUploadOutlined style={{ marginRight: '8px' }} />
//           Upload File
//         </>
//       )}
//     </button>
//   </div>
  
//   {fileInfo?.skillMatrix && uploadState !== 'success' && (
//     <div style={styles.infoCard}>
//       <p style={{ margin: 0, fontWeight: '500' }}>
//         {fileInfo.skillMatrix}
//       </p>
//     </div>
//   )}
// </motion.div>
//               )}
//             </AnimatePresence>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default UploadSkillMatrix;